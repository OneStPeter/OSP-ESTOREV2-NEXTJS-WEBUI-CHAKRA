"use client";

import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  HStack,
  Image,
  Input,
  Link,
  Separator,
  Text,
  VStack,
  type InputProps,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_BUTTON_STYLES,
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

type AuthView = "login" | "signup";

type AuthInputProps = InputProps & {
  placeholder: string;
  type?: string;
};

const AuthInput = ({
  placeholder,
  type = "text",
  ...props
}: AuthInputProps) => (
  <Input
    type={type}
    placeholder={placeholder}
    h="40px"
    borderColor={BRAND_COLORS.neutralBorder}
    borderRadius={STANDARD_RADIUS.sm}
    color={BRAND_COLORS.neutralText}
    fontSize="14px"
    _placeholder={{ color: "#4A5568" }}
    _focusVisible={{
      borderColor: BRAND_COLORS.primaryGreen,
      boxShadow: `0 0 0 1px ${BRAND_COLORS.primaryGreen}`,
    }}
    {...props}
  />
);

const RequiredInput = ({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) => <RequiredInputField label={label} type={type} />;

const RequiredInputField = ({
  label,
  type,
}: {
  label: string;
  type: string;
}) => {
  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const showLabel = !value && !isFocused;

  return (
    <Box position="relative">
      <AuthInput
        placeholder=""
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showLabel && (
        <Text
          as="span"
          position="absolute"
          left="14px"
          top="50%"
          transform="translateY(-50%)"
          color="#4A5568"
          fontSize="14px"
          pointerEvents="none"
        >
          {label}{" "}
          <Text as="span" color={BRAND_COLORS.errorRed}>
            *
          </Text>
        </Text>
      )}
    </Box>
  );
};

const SocialButton = ({ src, alt }: { src: string; alt: string }) => (
  <Button
    type="button"
    variant="outline"
    h="38px"
    minW="0"
    w="100%"
    borderColor={BRAND_COLORS.neutralBorder}
    borderRadius={STANDARD_RADIUS.sm}
    bg={BRAND_COLORS.white}
    _hover={{ bg: BRAND_COLORS.subtleBg }}
  >
    <Image src={src} alt={alt} boxSize="22px" objectFit="contain" />
  </Button>
);

const Agreement = ({ children }: { children: React.ReactNode }) => (
  <HStack align="center" gap="10px">
    <chakra.input
      type="checkbox"
      w="20px"
      h="20px"
      border={`1px solid ${BRAND_COLORS.neutralText}`}
      borderRadius={STANDARD_RADIUS.sm}
      accentColor={BRAND_COLORS.primaryGreen}
      flexShrink={0}
    />
    <Text
      color={BRAND_COLORS.neutralText}
      fontSize={{ base: "14px", md: "15px" }}
    >
      {children}
    </Text>
  </HStack>
);

const Login = () => {
  const router = useRouter();
  const [view, setView] = React.useState<AuthView>("login");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/account");
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Flex
      position="fixed"
      inset={0}
      zIndex={2000}
      minH="100dvh"
      overflowY="auto"
      align="center"
      justify="center"
      px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.lg }}
      py={{ base: 0, md: STANDARD_SPACING.lg }}
      bg={{
        base: BRAND_COLORS.white,
        md: `linear-gradient(rgba(0, 0, 0, 0.66), rgba(0, 0, 0, 0.66)), url("/images/chapels/Guiguinto.jpg") center / cover no-repeat`,
      }}
    >
      <Box
        w="100%"
        maxW={
          view === "login"
            ? { base: "320px", md: "450px" }
            : { base: "100%", md: "650px" }
        }
        minH={
          view === "login"
            ? { base: "auto", md: "650px" }
            : { base: "100dvh", md: "645px" }
        }
        bg={BRAND_COLORS.white}
        borderRadius={{
          base: 0,
          md: view === "login" ? STANDARD_RADIUS.md : 0,
        }}
        boxShadow={{
          base: "none",
          md: view === "login" ? STANDARD_SHADOWS.level4 : "none",
        }}
        px={
          view === "login" ? { base: 0, md: "96px" } : { base: 0, md: "65px" }
        }
        py={
          view === "login"
            ? { base: 0, md: "82px" }
            : { base: "56px", md: "84px" }
        }
        transition="all 180ms ease-out"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 48 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ width: "100%" }}
          >
            {view === "login" ? (
              <chakra.form onSubmit={handleLogin} w="100%">
            <VStack gap="0" align="stretch">
              <Image
                src="/images/osp-chakra-reusable-components/stpeter-logo.png"
                alt="St. Peter Life Plan Chapels"
                w={{ base: "238px", md: "260px" }}
                mx="auto"
                mb="18px"
              />
              <Text
                as="h1"
                color={BRAND_COLORS.neutralText}
                fontSize="22px"
                fontWeight="400"
                lineHeight="1.2"
                textAlign="center"
                mb="18px"
              >
                Log In
              </Text>
              <VStack gap="26px" align="stretch">
                <RequiredInput label="Email" type="email" />
                <RequiredInput label="Password" type="password" />
              </VStack>
              <Link
                href="#"
                color="#2563FF"
                fontSize="14px"
                mt="28px"
                textDecoration="none"
                _hover={{ textDecoration: "underline" }}
              >
                Forgot your password?
              </Link>
              <Button
                type="submit"
                mt="18px"
                w="100%"
                bg={BRAND_COLORS.primaryGreen}
                color={BRAND_COLORS.white}
                textTransform="uppercase"
                {...STANDARD_BUTTON_STYLES.md}
                _hover={{ bg: BRAND_COLORS.darkGreen }}
              >
                Login
              </Button>
              <HStack gap="10px" my="26px">
                <Separator flex="1" borderColor={BRAND_COLORS.neutralBorder} />
                <Text color={BRAND_COLORS.neutralText} fontSize="15px">
                  or
                </Text>
                <Separator flex="1" borderColor={BRAND_COLORS.neutralBorder} />
              </HStack>
              <Grid templateColumns="repeat(3, 1fr)" gap="6px" mb="18px">
                <SocialButton
                  src="/images/osp-chakra-reusable-components/icons8-google-48.png"
                  alt="Continue with Google"
                />
                <SocialButton
                  src="/images/osp-chakra-reusable-components/icons8-meta-48.png"
                  alt="Continue with Facebook"
                />
                <SocialButton
                  src="/images/osp-chakra-reusable-components/icons8-x-48.png"
                  alt="Continue with X"
                />
              </Grid>
              <Text color="#4A5568" fontSize="14px" textAlign="center">
                Don&apos;t have an account?{" "}
                <chakra.button
                  type="button"
                  color={BRAND_COLORS.primaryGreen}
                  fontWeight="700"
                  onClick={() => setView("signup")}
                >
                  Create Account
                </chakra.button>
              </Text>
            </VStack>
          </chakra.form>
        ) : (
          <chakra.form onSubmit={handleSignUp} w="100%">
            <Text
              as="h1"
              color={BRAND_COLORS.neutralText}
              fontSize="24px"
              fontWeight="600"
              lineHeight="1.2"
              mb="10px"
            >
              Create Account
            </Text>
            <Text color="#4A5568" fontSize="16px" mb="10px">
              Join us and secure your future.
            </Text>
            <Separator borderColor={BRAND_COLORS.neutralBorder} mb="18px" />
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: "20px", md: "20px 16px" }}
              mb="28px"
            >
              <RequiredInput label="Last Name" />
              <RequiredInput label="First Name" />
              <RequiredInput label="Middle Name" />
              <RequiredInput label="Email" type="email" />
              <RequiredInput label="Contact No." />
              <RequiredInput label="Password" type="password" />
              <RequiredInput label="Confirm Password" type="password" />
            </Grid>
            <VStack align="stretch" gap="8px" mb="18px">
              <Agreement>
                I agree to the{" "}
                <Link color={BRAND_COLORS.primaryGreen} fontWeight="700">
                  Terms and Conditions
                </Link>
              </Agreement>
              <Agreement>
                I agree to the{" "}
                <Link color={BRAND_COLORS.primaryGreen} fontWeight="700">
                  Data Privacy Policy
                </Link>
              </Agreement>
            </VStack>
            <Button
              type="submit"
              w="100%"
              bg={BRAND_COLORS.primaryGreen}
              color={BRAND_COLORS.white}
              textTransform="uppercase"
              {...STANDARD_BUTTON_STYLES.md}
              _hover={{ bg: BRAND_COLORS.darkGreen }}
            >
              Sign Up
            </Button>
            <Text color="#4A5568" fontSize="15px" textAlign="center" mt="18px">
              Already have an account?{" "}
              <chakra.button
                type="button"
                color={BRAND_COLORS.primaryGreen}
                fontWeight="700"
                onClick={() => setView("login")}
              >
                Log In
              </chakra.button>
            </Text>
          </chakra.form>
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  );
};

export default Login;
