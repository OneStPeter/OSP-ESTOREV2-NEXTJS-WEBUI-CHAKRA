// "use client";

// import {
//   Box,
//   Button,
//   chakra,
//   Flex,
//   Grid,
//   HStack,
//   Image,
//   Input,
//   Link,
//   Separator,
//   Text,
//   VStack,
//   type InputProps,
// } from "@chakra-ui/react";
// import { AnimatePresence, motion } from "motion/react";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { BRAND_COLORS } from "@/lib/theme/brand-colors";
// import {
//   STANDARD_BUTTON_STYLES,
//   STANDARD_RADIUS,
//   STANDARD_SHADOWS,
//   STANDARD_SPACING,
// } from "@/lib/theme/standard-design-tokens";

// type AuthView = "login" | "signup";

// type AuthInputProps = InputProps & {
//   placeholder: string;
//   type?: string;
// };

// const AuthInput = ({
//   placeholder,
//   type = "text",
//   ...props
// }: AuthInputProps) => (
//   <Input
//     type={type}
//     placeholder={placeholder}
//     h="40px"
//     borderColor={BRAND_COLORS.neutralBorder}
//     borderRadius={STANDARD_RADIUS.sm}
//     color={BRAND_COLORS.neutralText}
//     // 16px on mobile prevents iOS Safari from auto-zooming on focus.
//     fontSize={{ base: "16px", md: "14px" }}
//     _placeholder={{ color: "#4A5568" }}
//     _focusVisible={{
//       borderColor: BRAND_COLORS.primaryGreen,
//       boxShadow: `0 0 0 1px ${BRAND_COLORS.primaryGreen}`,
//     }}
//     {...props}
//   />
// );

// const RequiredInput = ({
//   label,
//   type = "text",
// }: {
//   label: string;
//   type?: string;
// }) => <RequiredInputField label={label} type={type} />;

// const RequiredInputField = ({
//   label,
//   type,
// }: {
//   label: string;
//   type: string;
// }) => {
//   const [value, setValue] = React.useState("");
//   const [isFocused, setIsFocused] = React.useState(false);
//   const showLabel = !value && !isFocused;

//   return (
//     <Box position="relative">
//       <AuthInput
//         placeholder=""
//         type={type}
//         value={value}
//         onChange={(event) => setValue(event.target.value)}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//       />
//       {showLabel && (
//         <Text
//           as="span"
//           position="absolute"
//           left="14px"
//           top="50%"
//           transform="translateY(-50%)"
//           color="#4A5568"
//           // Match the input font-size so the floating label aligns 1:1.
//           fontSize={{ base: "16px", md: "14px" }}
//           pointerEvents="none"
//         >
//           {label}{" "}
//           <Text as="span" color={BRAND_COLORS.errorRed}>
//             *
//           </Text>
//         </Text>
//       )}
//     </Box>
//   );
// };

// const SocialButton = ({ src, alt }: { src: string; alt: string }) => (
//   <Button
//     type="button"
//     variant="outline"
//     h="38px"
//     minW="0"
//     w="100%"
//     borderColor={BRAND_COLORS.neutralBorder}
//     borderRadius={STANDARD_RADIUS.sm}
//     bg={BRAND_COLORS.white}
//     _hover={{ bg: BRAND_COLORS.subtleBg }}
//   >
//     <Image src={src} alt={alt} boxSize="22px" objectFit="contain" />
//   </Button>
// );

// const Agreement = ({ children }: { children: React.ReactNode }) => (
//   <HStack align="center" gap="10px">
//     <chakra.input
//       type="checkbox"
//       w="20px"
//       h="20px"
//       border={`1px solid ${BRAND_COLORS.neutralText}`}
//       borderRadius={STANDARD_RADIUS.sm}
//       accentColor={BRAND_COLORS.primaryGreen}
//       flexShrink={0}
//     />
//     <Text
//       color={BRAND_COLORS.neutralText}
//       fontSize={{ base: "14px", md: "15px" }}
//     >
//       {children}
//     </Text>
//   </HStack>
// );

// const Login = () => {
//   const router = useRouter();
//   const [view, setView] = React.useState<AuthView>("login");

//   const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     router.push("/account");
//   };

//   const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <Flex
//       position="fixed"
//       inset={0}
//       zIndex={2000}
//       minH="100dvh"
//       overflowY="auto"
//       align="center"
//       justify="center"
//       px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.lg }}
//       py={{ base: 0, md: STANDARD_SPACING.lg }}
//       bg={{
//         base: BRAND_COLORS.white,
//         md: `linear-gradient(rgba(0, 0, 0, 0.66), rgba(0, 0, 0, 0.66)), url("/images/chapels/Guiguinto.jpg") center / cover no-repeat`,
//       }}
//     >
//       <Box
//         w="100%"
//         maxW={
//           view === "login"
//             ? { base: "320px", md: "450px" }
//             : { base: "100%", md: "650px" }
//         }
//         minH={
//           view === "login"
//             ? { base: "auto", md: "650px" }
//             : { base: "100dvh", md: "645px" }
//         }
//         bg={BRAND_COLORS.white}
//         borderRadius={{
//           base: 0,
//           md: view === "login" ? STANDARD_RADIUS.md : 0,
//         }}
//         boxShadow={{
//           base: "none",
//           md: view === "login" ? STANDARD_SHADOWS.level4 : "none",
//         }}
//         px={
//           view === "login" ? { base: 0, md: "96px" } : { base: 0, md: "65px" }
//         }
//         py={
//           view === "login"
//             ? { base: 0, md: "82px" }
//             : { base: "56px", md: "84px" }
//         }
//         transition="all 180ms ease-out"
//       >
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={view}
//             initial={{ opacity: 0, x: 48 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 48 }}
//             transition={{ duration: 0.28, ease: "easeOut" }}
//             style={{ width: "100%" }}
//           >
//             {view === "login" ? (
//               <chakra.form onSubmit={handleLogin} w="100%">
//             <VStack gap="0" align="stretch">
//               <Image
//                 src="/images/osp-chakra-reusable-components/stpeter-logo.png"
//                 alt="St. Peter Life Plan Chapels"
//                 w={{ base: "238px", md: "260px" }}
//                 mx="auto"
//                 mb="18px"
//               />
//               <Text
//                 as="h1"
//                 color={BRAND_COLORS.neutralText}
//                 fontSize="22px"
//                 fontWeight="400"
//                 lineHeight="1.2"
//                 textAlign="center"
//                 mb="18px"
//               >
//                 Log In
//               </Text>
//               <VStack gap="26px" align="stretch">
//                 <RequiredInput label="Email" type="email" />
//                 <RequiredInput label="Password" type="password" />
//               </VStack>
//               <Link
//                 href="#"
//                 color="#2563FF"
//                 fontSize="14px"
//                 mt="28px"
//                 textDecoration="none"
//                 _hover={{ textDecoration: "underline" }}
//               >
//                 Forgot your password?
//               </Link>
//               <Button
//                 type="submit"
//                 mt="18px"
//                 w="100%"
//                 bg={BRAND_COLORS.primaryGreen}
//                 color={BRAND_COLORS.white}
//                 textTransform="uppercase"
//                 {...STANDARD_BUTTON_STYLES.md}
//                 _hover={{ bg: BRAND_COLORS.darkGreen }}
//               >
//                 Login
//               </Button>
//               <HStack gap="10px" my="26px">
//                 <Separator flex="1" borderColor={BRAND_COLORS.neutralBorder} />
//                 <Text color={BRAND_COLORS.neutralText} fontSize="15px">
//                   or
//                 </Text>
//                 <Separator flex="1" borderColor={BRAND_COLORS.neutralBorder} />
//               </HStack>
//               <Grid templateColumns="repeat(3, 1fr)" gap="6px" mb="18px">
//                 <SocialButton
//                   src="/images/osp-chakra-reusable-components/icons8-google-48.png"
//                   alt="Continue with Google"
//                 />
//                 <SocialButton
//                   src="/images/osp-chakra-reusable-components/icons8-meta-48.png"
//                   alt="Continue with Facebook"
//                 />
//                 <SocialButton
//                   src="/images/osp-chakra-reusable-components/icons8-x-48.png"
//                   alt="Continue with X"
//                 />
//               </Grid>
//               <Text color="#4A5568" fontSize="14px" textAlign="center">
//                 Don&apos;t have an account?{" "}
//                 <chakra.button
//                   type="button"
//                   color={BRAND_COLORS.primaryGreen}
//                   fontWeight="700"
//                   onClick={() => setView("signup")}
//                 >
//                   Create Account
//                 </chakra.button>
//               </Text>
//             </VStack>
//           </chakra.form>
//         ) : (
//           <chakra.form onSubmit={handleSignUp} w="100%">
//             <Text
//               as="h1"
//               color={BRAND_COLORS.neutralText}
//               fontSize="24px"
//               fontWeight="600"
//               lineHeight="1.2"
//               mb="10px"
//             >
//               Create Account
//             </Text>
//             <Text color="#4A5568" fontSize="16px" mb="10px">
//               Join us and secure your future.
//             </Text>
//             <Separator borderColor={BRAND_COLORS.neutralBorder} mb="18px" />
//             <Grid
//               templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
//               gap={{ base: "20px", md: "20px 16px" }}
//               mb="28px"
//             >
//               <RequiredInput label="Last Name" />
//               <RequiredInput label="First Name" />
//               <RequiredInput label="Middle Name" />
//               <RequiredInput label="Email" type="email" />
//               <RequiredInput label="Contact No." />
//               <RequiredInput label="Password" type="password" />
//               <RequiredInput label="Confirm Password" type="password" />
//             </Grid>
//             <VStack align="stretch" gap="8px" mb="18px">
//               <Agreement>
//                 I agree to the{" "}
//                 <Link color={BRAND_COLORS.primaryGreen} fontWeight="700">
//                   Terms and Conditions
//                 </Link>
//               </Agreement>
//               <Agreement>
//                 I agree to the{" "}
//                 <Link color={BRAND_COLORS.primaryGreen} fontWeight="700">
//                   Data Privacy Policy
//                 </Link>
//               </Agreement>
//             </VStack>
//             <Button
//               type="submit"
//               w="100%"
//               bg={BRAND_COLORS.primaryGreen}
//               color={BRAND_COLORS.white}
//               textTransform="uppercase"
//               {...STANDARD_BUTTON_STYLES.md}
//               _hover={{ bg: BRAND_COLORS.darkGreen }}
//             >
//               Sign Up
//             </Button>
//             <Text color="#4A5568" fontSize="15px" textAlign="center" mt="18px">
//               Already have an account?{" "}
//               <chakra.button
//                 type="button"
//                 color={BRAND_COLORS.primaryGreen}
//                 fontWeight="700"
//                 onClick={() => setView("login")}
//               >
//                 Log In
//               </chakra.button>
//             </Text>
//           </chakra.form>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </Box>
//     </Flex>
//   );
// };

// export default Login;

"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Button,
  Checkbox,
  Field,
  Separator,
  Link,
  IconButton,
  InputGroup,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import logoIcon from "@/public/login-logo.png";

const ease = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.45, ease },
  };
}

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Closing the full-screen login dialog returns the user where they came from.
  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    await new Promise((r) => setTimeout(r, 1200));
    setSocialLoading(null);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   await new Promise((r) => setTimeout(r, 1000));
  //   router.replace("/");
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("emailInput");
    const password = form.get("passwordInput");
    if (typeof email === "string" && typeof password === "string")
      //onLogin(email, password);
      router.replace("/account");
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) handleClose();
      }}
      size="full"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            w="100vw"
            h="100dvh"
            maxW="100vw"
            m={0}
            rounded={0}
            overflow="auto"
            bg="white"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton
                position="absolute"
                top={4}
                right={4}
                zIndex={30}
                size="md"
                rounded="full"
                bg="whiteAlpha.800"
                _hover={{ bg: "white" }}
                onClick={handleClose}
                aria-label="Close login"
              />
            </Dialog.CloseTrigger>

            <Flex minH="100%" bg="white" overflow="hidden">
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              {/* ── Left brand panel (desktop only) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        style={{ display: "none" }}
        className="lg:flex lg:w-[52%]"
      >
        <Box
          display={{ base: "none", lg: "flex" }}
          w="52%"
          position="relative"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          flexShrink={0}
          style={{
            background:
              "linear-gradient(145deg, #022c22 0%, #064e3b 40%, #065f46 70%, #047857 100%)",
          }}
        >
          {/* decorative rings */}
          <Box
            position="absolute"
            top="-8rem"
            left="-8rem"
            w="28rem"
            h="28rem"
            rounded="full"
            borderWidth="1px"
            borderColor="rgba(6,95,70,0.3)"
          />
          <Box
            position="absolute"
            top="-5rem"
            left="-5rem"
            w="20rem"
            h="20rem"
            rounded="full"
            borderWidth="1px"
            borderColor="rgba(16,185,129,0.15)"
          />
          <Box
            position="absolute"
            bottom="-10rem"
            right="-10rem"
            w="36rem"
            h="36rem"
            rounded="full"
            borderWidth="1px"
            borderColor="rgba(6,95,70,0.2)"
          />
          <Box
            position="absolute"
            bottom="2.5rem"
            right="2.5rem"
            w="18rem"
            h="18rem"
            rounded="full"
            borderWidth="1px"
            borderColor="rgba(16,185,129,0.12)"
          />

          {/* dot grid */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.1}
            style={{
              backgroundImage:
                "radial-gradient(circle, #6ee7b7 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* glow orb */}
          <Box
            position="absolute"
            top="25%"
            left="50%"
            w="20rem"
            h="20rem"
            rounded="full"
            pointerEvents="none"
            style={{
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
            }}
          />

          {/* brand content */}
          <VStack
            position="relative"
            zIndex={10}
            gap={8}
            textAlign="center"
            px={16}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Flex
                w="7rem"
                h="7rem"
                rounded="3xl"
                bg="rgba(255,255,255,0.1)"
                backdropFilter="blur(8px)"
                borderWidth="1px"
                borderColor="rgba(255,255,255,0.2)"
                alignItems="center"
                justifyContent="center"
                boxShadow="2xl"
              >
                <Image
                  src={logoIcon.src}
                  alt="St. Peter Logo"
                  width={84}
                  height={84}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <VStack gap={3}>
                <Heading
                  as="h1"
                  fontSize="4xl"
                  fontWeight="bold"
                  color="white"
                  letterSpacing="tight"
                  lineHeight="tight"
                >
                  St. Peter
                </Heading>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="#6ee7b7"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  Online Store
                </Text>
                <Box h="1px" w="4rem" bg="rgba(16,185,129,0.6)" my={1} />
                <Text
                  fontSize="sm"
                  color="rgba(236,253,245,0.7)"
                  lineHeight="tall"
                  maxW="xs"
                >
                  Manage life plan operations, reservations, fleet dispatch, and
                  service records — all in one place.
                </Text>
              </VStack>
            </motion.div>
          </VStack>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            style={{ position: "absolute", bottom: "2rem" }}
          >
            <Text fontSize="xs" color="rgba(6,95,70,0.8)">
              © 2026 St. Peter Memorial Chapels. All rights reserved.
            </Text>
          </motion.div>
        </Box>
      </motion.div>

      {/* ── Right form panel ── */}
      <Flex
        flex={1}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        px={{ base: 6, sm: 12, lg: 16 }}
        position="relative"
      >
        {/* mobile gradient */}
        <Box
          display={{ base: "block", lg: "none" }}
          position="absolute"
          inset={0}
          style={{
            background:
              "linear-gradient(170deg, #022c22 0%, #064e3b 35%, #f0fdf4 60%, #ffffff 100%)",
          }}
        />

        {/* mobile logo */}
        <motion.div {...fadeUp(0)}>
          <VStack
            display={{ base: "flex", lg: "none" }}
            position="relative"
            zIndex={10}
            mb={8}
            gap={1}
          >
            <Flex
              w="5rem"
              h="5rem"
              rounded="2xl"
              bg="rgba(255,255,255,0.15)"
              backdropFilter="blur(8px)"
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.25)"
              alignItems="center"
              justifyContent="center"
              boxShadow="xl"
              mb={3}
            >
              <Image
                src={logoIcon.src}
                alt="St. Peter Logo"
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
                priority
              />
            </Flex>
            <Heading as="h1" fontSize="2xl" fontWeight="bold" color="white">
              St. Peter
            </Heading>
            <Text
              fontSize="xs"
              color="#6ee7b7"
              letterSpacing="0.18em"
              textTransform="uppercase"
            >
              Online Store
            </Text>
          </VStack>
        </motion.div>

        {/* form card */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "28rem",
          }}
        >
          <Box
            bg="white"
            rounded="3xl"
            boxShadow="2xl"
            p={{ base: 8, sm: 10 }}
            borderWidth="1px"
            borderColor="rgba(243,244,246,0.8)"
          >
            {/* card header */}
            <motion.div {...fadeUp(0.18)}>
              <Box mb={8}>
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="gray.900"
                >
                  Welcome back
                </Heading>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Sign in to your account to continue
                </Text>
              </Box>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <VStack gap={5}>
                {/* email */}
                <motion.div {...fadeUp(0.24)} style={{ width: "100%" }}>
                  <Field.Root>
                    <Field.Label
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Email address
                    </Field.Label>
                    <InputGroup
                      width="full"
                      startElement={
                        <Box color="gray.400">
                          <Mail size={16} />
                        </Box>
                      }
                    >
                      <Input
                        type="email"
                        required
                        name="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@stpeter.com.ph"
                        bg="gray.50"
                        borderColor="gray.200"
                        rounded="xl"
                        fontSize="sm"
                        _focus={{
                          borderColor: "green.500",
                          bg: "white",
                          boxShadow: "0 0 0 4px rgba(16,185,129,0.1)",
                        }}
                      />
                    </InputGroup>
                  </Field.Root>
                </motion.div>

                {/* password */}
                <motion.div {...fadeUp(0.3)} style={{ width: "100%" }}>
                  <Field.Root>
                    <Field.Label
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Password
                    </Field.Label>
                    <InputGroup
                      width="full"
                      startElement={
                        <Box color="gray.400">
                          <Lock size={16} />
                        </Box>
                      }
                      endElement={
                        <IconButton
                          variant="ghost"
                          size="xs"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          color="gray.400"
                          _hover={{ color: "gray.600" }}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </IconButton>
                      }
                      endElementProps={{ pointerEvents: "auto" }}
                    >
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        name="passwordInput"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        bg="gray.50"
                        borderColor="gray.200"
                        rounded="xl"
                        fontSize="sm"
                        _focus={{
                          borderColor: "green.500",
                          bg: "white",
                          boxShadow: "0 0 0 4px rgba(16,185,129,0.1)",
                        }}
                      />
                    </InputGroup>
                  </Field.Root>
                </motion.div>

                {/* remember me + forgot password */}
                <motion.div {...fadeUp(0.36)} style={{ width: "100%" }}>
                  <HStack justifyContent="space-between">
                    <Checkbox.Root
                      colorPalette="green"
                      checked={remember}
                      onCheckedChange={(e) => setRemember(!!e.checked)}
                      cursor="pointer"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control rounded="sm" />
                      <Checkbox.Label fontSize="sm" color="gray.600">
                        Remember me
                      </Checkbox.Label>
                    </Checkbox.Root>
                    <Link
                      href="#"
                      fontSize="sm"
                      fontWeight="medium"
                      color="green.700"
                      _hover={{ color: "green.600" }}
                    >
                      Forgot password?
                    </Link>
                  </HStack>
                </motion.div>

                {/* submit */}
                <motion.div
                  {...fadeUp(0.42)}
                  style={{ width: "100%" }}
                  whileHover={{ scale: loading ? 1 : 1.015 }}
                  whileTap={{ scale: loading ? 1 : 0.985 }}
                >
                  <Button
                    type="submit"
                    width="full"
                    loading={loading}
                    loadingText="Signing in…"
                    rounded="xl"
                    py={6}
                    fontWeight="semibold"
                    fontSize="sm"
                    color="white"
                    style={{
                      background:
                        "linear-gradient(135deg, #059669 0%, #065f46 100%)",
                      boxShadow: "0 4px 22px rgba(5,150,105,0.35)",
                    }}
                    _hover={{}}
                    _active={{}}
                  >
                    Sign in
                    <ArrowRight size={16} />
                  </Button>
                </motion.div>
              </VStack>
            </form>

            {/* divider */}
            <motion.div {...fadeUp(0.48)}>
              <HStack my={6}>
                <Separator flex="1" borderColor="gray.100" />
                <Text
                  fontSize="10px"
                  letterSpacing="widest"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Or continue with
                </Text>
                <Separator flex="1" borderColor="gray.100" />
              </HStack>
            </motion.div>

            {/* social login buttons */}
            <motion.div {...fadeUp(0.52)}>
              <HStack gap={3}>
                {[
                  {
                    id: "google",
                    label: "Google",
                    src: "/images/osp-chakra-reusable-components/icons8-google-48.png",
                    hoverBg: "#fff8f8",
                    hoverBorder: "#fca5a5",
                  },
                  {
                    id: "facebook",
                    label: "Facebook",
                    src: "/images/osp-chakra-reusable-components/icons8-meta-48.png",
                    hoverBg: "#f0f4ff",
                    hoverBorder: "#93c5fd",
                  },
                  {
                    id: "twitter",
                    label: "X",
                    src: "/images/osp-chakra-reusable-components/icons8-x-48.png",
                    hoverBg: "#f5f5f5",
                    hoverBorder: "#d1d5db",
                  },
                ].map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => handleSocialLogin(p.id)}
                    disabled={!!socialLoading}
                    whileHover={socialLoading ? {} : { y: -2 }}
                    whileTap={socialLoading ? {} : { scale: 0.96 }}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "12px 8px",
                      borderRadius: "14px",
                      border: "1.5px solid #f0f0f0",
                      background: "white",
                      cursor: socialLoading ? "not-allowed" : "pointer",
                      opacity:
                        socialLoading && socialLoading !== p.id ? 0.45 : 1,
                      transition:
                        "border-color 0.15s, background 0.15s, box-shadow 0.15s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      if (socialLoading) return;
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = p.hoverBg;
                      el.style.borderColor = p.hoverBorder;
                      el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = "white";
                      el.style.borderColor = "#f0f0f0";
                      el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                    }}
                  >
                    {socialLoading === p.id ? (
                      <Loader2
                        size={20}
                        style={{
                          animation: "spin 1s linear infinite",
                          color: "#6b7280",
                        }}
                      />
                    ) : (
                      <Image
                        src={p.src}
                        alt={p.label}
                        width={22}
                        height={22}
                        style={{ objectFit: "contain" }}
                      />
                    )}
                    <Text
                      fontSize="11px"
                      fontWeight="semibold"
                      color="gray.500"
                    >
                      {p.label}
                    </Text>
                  </motion.button>
                ))}
              </HStack>
            </motion.div>

            {/* footer note */}
            {/* <motion.div {...fadeUp(0.58)}>
              <Text
                textAlign="center"
                fontSize="xs"
                color="gray.400"
                lineHeight="tall"
                mt={5}
              >
                This system is for authorized St. Peter personnel only.
                <br />
                Unauthorized access is prohibited.
              </Text>
            </motion.div> */}
          </Box>

          <motion.div {...fadeUp(0.56)}>
            <Text textAlign="center" fontSize="xs" color="gray.400" mt={5}>
              © 2026 St. Peter Life Plans
            </Text>
          </motion.div>
        </motion.div>
      </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default LoginPage;
