"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import Page from "@/components/layout/page/Page";
import { useDemoAuth } from "@/components/ui/demo-auth";
import AdBannerCarousel from "@/components/ui/ad-banner-carousel";
import AccountQuickActions from "@/components/ui/account-quick-actions";
import AccountServicesList from "@/components/ui/account-services-list";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";
import { useRouter } from "next/navigation";
import ProfileHeaderCard from "@/components/ui/ProfileHeaderCard";

const Account = () => {
  const { login } = useDemoAuth();
  const router = useRouter();

  useEffect(() => {
    login();
  }, [login]);

  const goToPayMyPlan = () => {
    router.push("/account/pay-my-plan");
  };
  const goToFileClaim = () => {
    router.push("/claims");
  };
  const goToRop = () => {
    router.push("/rop");
  };
  const goToBookVisit = () => {
    router.push("/booking");
  };
  const goToAccountSummary = () => {
    router.push("/account/summary");
  };

  return (
    <Page.Root title="" description="" hideBackButton={true}>
      <Page.MainContent>
        <Page.Row>
          <VStack
            align="stretch"
            gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <ProfileHeaderCard
              name="Michelle De Dosa"
              personId="P10529"
              // homeAddress="Quezon City, Metro Manila"
              // contactNo="0917 123 4567"
              // email="joyce.basilio-ramos@example.com"
              isInsured={true}
              actions={
                <Button
                  size="sm"
                  w="full"
                  variant="outline"
                  colorPalette="green"
                  onClick={goToAccountSummary}
                >
                  View account summary
                </Button>
              }
            />

            <Box>
              <Text fontSize="14px" fontWeight="700" color="gray.900" mb={2}>
                Common actions
              </Text>
              <AccountQuickActions
                onPayPlan={goToPayMyPlan}
                onFileClaim={goToFileClaim}
                onRop={goToRop}
                onBookVisit={goToBookVisit}
              />
            </Box>

            <AdBannerCarousel />

            <AccountServicesList
              title="Manage your plan"
              onUpdateInfo={goToAccountSummary}
            />
          </VStack>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default Account;
