"use client";

import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import Page from "@/components/layout/page/Page";
import { useDemoAuth } from "@/components/ui/demo-auth";
import PlanAccountCardCarousel from "@/components/ui/plan-account-card-carousel";
import UserWelcomeBanner from "@/components/ui/user-welcome-banner";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";
import { useRouter } from "next/navigation";
import { InfoCardAccordion } from "@/components/ui/info-card-accordion";
import { RowItem } from "@/components/ui/row-item";
import { FaRegUser, FaRegAddressCard } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import ProfileHeaderCard from "@/components/ui/ProfileHeaderCard";

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
            <ProfileHeaderCard
              name="Joyce Dela Rosa"
              personId="1234567890"
              homeAddress="12 Magsaysay Avenue, Sta. Maria, Zamboanga City, Zamboanga del Sur, 7000"
              contactNo="0917 123 4567"
              email=" test@gmail.com"
              isInsured={true}
            />
            <PlanAccountCardCarousel
              plans={activePlans}
              onPlanClick={goToPayMyPlan}
              onPay={goToPayMyPlan}
            />

            {/* ── Account information display ─────────────────────────── */}
            <VStack align="stretch" gap={3}>
              <InfoCardAccordion
                icon={<Icon as={FaRegUser} boxSize="18px" />}
                title="Personal Information"
                subtitle="Identification and full name"
              >
                <VStack align="stretch" gap={1}>
                  <RowItem label="Last Name" value="DELA ROSA" />
                  <RowItem label="First Name" value="JOYCE" />
                  <RowItem label="Middle Name" value="SANTOS" />
                  <RowItem label="Date of Birth" value="November 2, 1990" />
                  <RowItem label="Gender" value="Female" />
                  <RowItem label="Civil Status" value="Single" />
                  <RowItem label="Nationality" value="Filipino" />
                </VStack>
              </InfoCardAccordion>

              <InfoCardAccordion
                icon={<Icon as={LuPhone} boxSize="18px" />}
                title="Contact Information"
                subtitle="How to reach you"
              >
                <VStack align="stretch" gap={1}>
                  <RowItem label="Mobile Number" value="0917 123 4567" />
                  <RowItem label="Email" value="joyce.delarosa@example.com" />
                  <RowItem label="Landline" value="(082) 123-4567" />
                </VStack>
              </InfoCardAccordion>

              <InfoCardAccordion
                icon={<Icon as={FaRegAddressCard} boxSize="18px" />}
                title="Address"
                subtitle="Where you currently live"
              >
                <VStack align="stretch" gap={1}>
                  <RowItem label="Lot #" value="12" />
                  <RowItem label="Street" value="Magsaysay Avenue" />
                  <RowItem label="Barangay" value="Sta. Maria" />
                  <RowItem label="City" value="Zamboanga City" />
                  <RowItem label="Province" value="Zamboanga del Sur" />
                  <RowItem label="Zip Code" value="7000" />
                </VStack>
              </InfoCardAccordion>

              <InfoCardAccordion
                icon={
                  <Icon as={IoIosInformationCircleOutline} boxSize="18px" />
                }
                title="Employment"
                subtitle="Work and income details"
              >
                <VStack align="stretch" gap={1}>
                  <RowItem label="Occupation" value="Private Employee" />
                  <RowItem label="Employer Name" value="ABC Corporation" />
                  <RowItem label="Employment Status" value="Employed" />
                  <RowItem label="TIN" value="123-456-789-000" />
                  <RowItem label="SSS/GSIS" value="12-3456789-0" />
                  <RowItem label="Source of Fund" value="Salary" />
                </VStack>
              </InfoCardAccordion>

              <InfoCardAccordion
                icon={<Icon as={FaRegUser} boxSize="18px" />}
                title="Beneficiaries"
                subtitle="2 listed"
              >
                <VStack align="stretch" gap={4}>
                  <Box>
                    <Text fontWeight="semibold" fontSize="sm" mb={1}>
                      Roland C. Dela Rosa
                    </Text>
                    <VStack align="stretch" gap={1}>
                      <RowItem label="Relationship" value="Son" />
                      <RowItem label="Date of Birth" value="March 15, 1998" />
                      <RowItem label="Address" value="Caloocan City" />
                    </VStack>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" fontSize="sm" mb={1}>
                      Maria L. Dela Rosa
                    </Text>
                    <VStack align="stretch" gap={1}>
                      <RowItem label="Relationship" value="Daughter" />
                      <RowItem label="Date of Birth" value="July 8, 2000" />
                      <RowItem label="Address" value="Zamboanga City" />
                    </VStack>
                  </Box>
                </VStack>
              </InfoCardAccordion>
            </VStack>
          </VStack>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default Account;
