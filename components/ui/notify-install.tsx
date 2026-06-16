"use client";

import { useEffect, useState } from "react";
import { useNotifyInstall } from "@/hooks/useNotifyInstall";
import {
  Dialog,
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Flex,
  Heading,
  Icon,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { FiDownload, FiPlusSquare, FiShare } from "react-icons/fi";

const STEPS = [
  {
    icon: FiShare,
    label: "Tap the browser menu or Share button",
  },
  {
    icon: FiPlusSquare,
    label: 'Choose "Add to Home Screen"',
  },
];

const INSTALL_DIALOG_DISMISSED_KEY = "estore-install-dialog-dismissed";

export default function NotifyInstall({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInstalled, isMobile, canInstall, install } = useNotifyInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(INSTALL_DIALOG_DISMISSED_KEY);
    setIsDismissed(wasDismissed === "true");
  }, []);

  const handleClose = () => {
    localStorage.setItem(INSTALL_DIALOG_DISMISSED_KEY, "true");
    setIsDismissed(true);
  };

  const isOpen = !isInstalled && isMobile && !isDismissed;

  // Desktop users bypass it
  if (!isOpen) {
    return children;
  }

  return (
    <>
      {children}

      <Dialog.Root
        open={isOpen}
        onOpenChange={(details) => {
          if (!details.open) {
            handleClose();
          }
        }}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(2px)" />

          <Dialog.Positioner
            p={{ base: 0, sm: 4 }}
            alignItems={{ base: "flex-end", sm: "center" }}
          >
            <Dialog.Content
              w="xl"
              maxW={{ base: "full", sm: "sm" }}
              borderRadius={{ base: "2xl 2xl 0 0", sm: "2xl" }}
              overflow="hidden"
              boxShadow="2xl"
              m={0}
            >
              <Dialog.Body px={{ base: 6, sm: 8 }} py={{ base: 8, sm: 10 }}>
                <VStack gap={6} textAlign="center">
                  {/* App icon badge */}
                  <Flex
                    boxSize={{ base: 16, sm: 20 }}
                    align="center"
                    justify="center"
                    rounded="2xl"
                    bg="green.50"
                    color="green.600"
                    shadow="sm"
                  >
                    <Icon as={FiDownload} boxSize={{ base: 8, sm: 9 }} />
                  </Flex>

                  <VStack gap={2}>
                    <Heading
                      fontSize={{ base: "lg", sm: "xl" }}
                      fontWeight="bold"
                      color="gray.900"
                    >
                      Install St. Peter eStore
                    </Heading>
                    <Text
                      fontSize={{ base: "sm", sm: "md" }}
                      color="gray.600"
                      lineHeight="tall"
                    >
                      Add the app to your home screen for a faster, app-like
                      experience before continuing.
                    </Text>
                  </VStack>

                  {canInstall ? (
                    <Button
                      onClick={install}
                      colorPalette="green"
                      size="lg"
                      w="full"
                      rounded="xl"
                    >
                      <Icon as={FiDownload} />
                      Add to Home Screen
                    </Button>
                  ) : (
                    <Box
                      w="full"
                      bg="gray.50"
                      borderWidth="1px"
                      borderColor="gray.100"
                      rounded="xl"
                      p={4}
                    >
                      <VStack gap={4} align="stretch">
                        {STEPS.map((step, index) => (
                          <HStack key={index} gap={3} align="center">
                            <Flex
                              boxSize={9}
                              flexShrink={0}
                              align="center"
                              justify="center"
                              rounded="lg"
                              bg="white"
                              borderWidth="1px"
                              borderColor="gray.200"
                              color="green.600"
                            >
                              <Icon as={step.icon} boxSize={4} />
                            </Flex>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              textAlign="left"
                            >
                              {step.label}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={handleClose} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
