"use client";

import { useState } from "react";
import {
  Flex,
  Button,
  Text,
  PinInput,
  Group,
  Span,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import MessageDialog from "@/components/ui/message-box";
//import MessageDialog from "@/components/message-box/message-box";

interface OTPVerificationProps {
  successLink?: string;
}

export default function OTPVerification({
  successLink = "",
}: OTPVerificationProps) {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendSuccessNotification = async () => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (!("serviceWorker" in navigator)) return;

    const registration = await navigator.serviceWorker.ready;
    registration.showNotification("Request Submitted", {
      body: "Your booking request has been successfully verified and submitted. We'll be in touch shortly.",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      tag: "otp-success",
      data: { url: successLink },
    });
  };

  const handleVerify = () => {
    setIsLoading(true);

    const otpValue = otp.join("");

    setTimeout(() => {
      if (otpValue === "123456") {
        setIsSuccess(true);
        setDialogOpen(true);
        sendSuccessNotification();
      } else {
        setIsSuccess(false);
        setDialogOpen(true);
        setOtp(Array(6).fill(""));
      }

      setIsLoading(false);
    }, 400);
  };

  const handleConfirm = () => {
    if (isSuccess) {
      setIsLoading(true);
      router.push(successLink);
    }
  };

  return (
    <>
      {isLoading && (
        <Flex
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          zIndex={9999}
          align="center"
          justify="center"
          direction="column"
          gap={3}
        >
          <Spinner size="xl" color="white" />
          <Text color="white" fontSize="sm">
            Processing...
          </Text>
        </Flex>
      )}

      <Flex direction="column" align="center" gap={6} p={6}>
        <Text fontSize="lg" fontWeight="semibold" color="#109448">
          Enter the OTP sent to your mobile/email
        </Text>

        <Text fontSize="sm" color="gray.600" textAlign="center" maxW="400px">
          Almost there! Just a quick step to confirm your contact details.
        </Text>

        <PinInput.Root
          count={6}
          otp
          value={otp}
          onValueChange={(details) => setOtp(details.value)}
          onValueComplete={() => handleVerify()}
          disabled={isLoading}
        >
          <PinInput.HiddenInput />

          <PinInput.Control alignItems="center" gap={2}>
            <Group attached>
              {Array.from({ length: 3 }).map((_, index) => (
                <PinInput.Input
                  key={index}
                  index={index}
                  w="40px"
                  h="40px"
                  textAlign="center"
                  fontSize="md"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "#109448",
                    boxShadow: "0 0 0 2px rgba(16,148,72,.4)",
                  }}
                />
              ))}
            </Group>

            <Span color="gray.400" fontSize="lg">
              -
            </Span>

            <Group attached>
              {Array.from({ length: 3 }).map((_, index) => (
                <PinInput.Input
                  key={index + 3}
                  index={index + 3}
                  w="40px"
                  h="40px"
                  textAlign="center"
                  fontSize="md"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "#109448",
                    boxShadow: "0 0 0 2px rgba(16,148,72,.4)",
                  }}
                />
              ))}
            </Group>
          </PinInput.Control>
        </PinInput.Root>

        <Text fontSize="xs" color="gray.500" textAlign="center" maxW="400px">
          Disclaimer: This OTP is used solely to validate your contact
          information.
        </Text>

        <Flex gap={4}>
          <Button
            variant="ghost"
            color="#109448"
            onClick={() => setOtp(Array(6).fill(""))}
            disabled={isLoading}
          >
            Resend OTP
          </Button>
        </Flex>
      </Flex>

      <MessageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        variant={isSuccess ? "success" : "error"}
        title={isSuccess ? "Verification Successful" : "Verification Failed"}
        message={
          isSuccess
            ? "OTP verified successfully. You may now continue."
            : "The OTP you entered is incorrect. Please try again."
        }
        confirmText={isSuccess ? "Continue" : "Try Again"}
        showCancel={false}
        onConfirm={handleConfirm}
      />
    </>
  );
}
