"use client";

import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import Page from "@/components/layout/page/Page";
import { useDemoAuth } from "@/components/ui/demo-auth";
import PlanAccountCardCarousel from "@/components/ui/plan-account-card-carousel";
import UserWelcomeBanner from "@/components/ui/user-welcome-banner";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";
import { useRouter } from "next/navigation";

type AccountPlan = {
  contractNo: string;
  plan: string;
  mode: string;
  amountDue: string;
  effectiveDate: string;
  dueDate: string;
  balance: string;
};

const activePlans: AccountPlan[] = [
  {
    contractNo: "LOS001111C",
    plan: "ST. ANNE",
    mode: "Monthly",
    amountDue: "3,000.00",
    effectiveDate: "02/09/2026",
    dueDate: "04/09/2026",
    balance: "174,000.00",
  },
  {
    contractNo: "LOS001112C",
    plan: "ST. GREGORY",
    mode: "Annual",
    amountDue: "11,400.00",
    effectiveDate: "02/20/2026",
    dueDate: "02/20/2027",
    balance: "45,600.00",
  },
  {
    contractNo: "LOS001113C",
    plan: "ST. CLAIRE",
    mode: "Annual",
    amountDue: "19,700.00",
    effectiveDate: "03/09/2026",
    dueDate: "03/09/2027",
    balance: "78,800.00",
  },
];

const Account = () => {
  const { login } = useDemoAuth();
  const router = useRouter();

  useEffect(() => {
    login();
  }, [login]);

  const goToPayMyPlan = () => {
    router.push("/account/pay-my-plan");
  };

  return (
    <Page.Root title="" description="" hideBackButton={true}>
      <Page.MainContent>
        <Page.Row>
          <VStack
            align="stretch"
            gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <UserWelcomeBanner firstName="Joyce" branch="Zamboanga West" />

            <PlanAccountCardCarousel
              plans={activePlans}
              onPlanClick={goToPayMyPlan}
              onPay={goToPayMyPlan}
            />
          </VStack>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default Account;
