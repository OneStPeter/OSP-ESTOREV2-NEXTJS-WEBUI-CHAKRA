"use client";

import { useRouter } from "next/navigation";
import { Box, CloseButton } from "@chakra-ui/react";
import { LoginForm } from "osp-ui-kit";

interface LoginPageProps {
  onLogin?: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps = {}) {
  const router = useRouter();

  // Login is a full-screen route (not a modal), so closing just returns the
  // user where they came from.
  const handleClose = () => {
    router.back();
  };

  // A successful login navigates to the account page (and notifies any parent
  // via the optional onLogin callback).
  const completeLogin = (email: string, password: string) => {
    onLogin?.(email, password);
    router.replace("/account");
  };

  return (
    // The login route renders inside the app shell (navbar / footer / bottom
    // nav / chatbot FAB), so it covers them with a full-screen overlay —
    // zIndex sits above the highest shell element (the FAB at 1200).
    <Box
      position="fixed"
      inset={0}
      zIndex={2000}
      w="100vw"
      h="100dvh"
      overflow="auto"
      bgImage="linear-gradient(170deg, var(--chakra-colors-heading) 0%, var(--chakra-colors-primary-hover) 35%, var(--chakra-colors-primary-tint) 60%, var(--chakra-colors-surface) 100%)"
    >
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

      <LoginForm onLogin={completeLogin} />
    </Box>
  );
}

export default LoginPage;
