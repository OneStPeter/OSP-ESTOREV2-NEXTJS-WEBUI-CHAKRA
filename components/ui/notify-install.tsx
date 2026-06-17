"use client";

import { useEffect, useState } from "react";
import { useNotifyInstall } from "@/hooks/useNotifyInstall";
import { Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { FiDownload, FiPlusSquare, FiShare, FiX } from "react-icons/fi";

const STEPS = [
  { icon: FiShare, label: "Tap the browser menu or Share button" },
  { icon: FiPlusSquare, label: 'Choose "Add to Home Screen"' },
];

const DISMISSED_KEY = "estore-install-dialog-dismissed";

export default function NotifyInstall({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInstalled, isMobile, canInstall, install } = useNotifyInstall();

  // Start as true so the sheet never flashes before we know the stored state
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY) !== "true") {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setIsDismissed(true);
  };

  const showPrompt = isMobile && !isInstalled && !isDismissed;

  return (
    <>
      {children}

      <AnimatePresence>
        {showPrompt && (
          <>
            {/* ── Backdrop ─────────────────────────────────────────────── */}
            <motion.div
              key="install-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleDismiss}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1300,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            />

            {/* ── Bottom sheet ─────────────────────────────────────────── */}
            <motion.div
              key="install-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1400,
                background: "white",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.14)",
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              {/* Close button */}
              <button
                aria-label="Dismiss install prompt"
                onClick={handleDismiss}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9ca3af",
                }}
              >
                <FiX size={18} />
              </button>

              {/* Content */}
              <VStack gap={6} textAlign="center" px={6} py={8}>
                {/* Icon badge */}
                <Flex
                  boxSize={16}
                  align="center"
                  justify="center"
                  rounded="2xl"
                  bg="green.50"
                  color="green.600"
                  shadow="sm"
                >
                  <Icon as={FiDownload} boxSize={8} />
                </Flex>

                <VStack gap={2}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="gray.900"
                    lineHeight="short"
                  >
                    Install St. Peter eStore
                  </Text>
                  <Text fontSize="sm" color="gray.500" lineHeight="tall">
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
                  <VStack
                    w="full"
                    bg="gray.50"
                    borderWidth="1px"
                    borderColor="gray.100"
                    rounded="xl"
                    p={4}
                    gap={4}
                    align="stretch"
                  >
                    {STEPS.map((step, i) => (
                      <HStack key={i} gap={3} align="center">
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
                        <Text fontSize="sm" color="gray.700" textAlign="left">
                          {step.label}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                )}
              </VStack>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
