"use client";

import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import Page from "@/components/layout/page/Page";
import ProfileHeaderCard from "@/components/ui/ProfileHeaderCard";
import { InfoCardAccordion } from "@/components/ui/info-card-accordion";
import { RowItem } from "@/components/ui/row-item";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";
import { FaRegAddressCard, FaRegUser } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { useRouter } from "next/navigation";
import PlanAccountCardCarousel from "@/components/ui/plan-account-card-carousel";
import { activePlans } from "@/types/activeplan";

export default function AccountSummaryPage() {
  const router = useRouter();

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
            <ProfileHeaderCard
              name="Michelle De Dosa"
              personId="P10529"
              homeAddress="Quezon City, Metro Manila"
              contactNo="0917 123 4567"
              email="joyce.basilio-ramos@example.com"
              isInsured={true}
            />
            <PlanAccountCardCarousel
              plans={activePlans}
              onPlanClick={goToPayMyPlan}
              onPay={goToPayMyPlan}
            />
            <VStack align="stretch" gap={3}>
              <InfoCardAccordion
                icon={<Icon as={FaRegUser} boxSize="18px" />}
                title="Personal Information"
                subtitle="Identification and full name"
                defaultOpen
              >
                <VStack align="stretch" gap={1}>
                  {/* <RowItem label="Person ID" value="PI10529" /> */}
                  <RowItem label="Last Name" value="DE SOSA" />
                  <RowItem label="First Name" value="MICHELLE" />
                  <RowItem label="Date of Birth" value="August 2, 1990" />
                  <RowItem label="Gender" value="Female" />
                  <RowItem label="Civil Status" value="Married" />
                  <RowItem label="Nationality" value="Filipino" />
                </VStack>
              </InfoCardAccordion>

              <InfoCardAccordion
                icon={<Icon as={LuPhone} boxSize="18px" />}
                title="Contact Information"
                subtitle="How to reach you"
              >
                <VStack align="stretch" gap={1}>
                  <RowItem label="Mobile Number" value="+63 996-936-3882" />
                  <RowItem label="Email" value="michelle.desosa@gmail.com" />
                  <RowItem label="Landline" value="(082) 123-4567" />
                </VStack>
              </InfoCardAccordion>

              <InfoCardAccordion
                icon={<Icon as={FaRegAddressCard} boxSize="18px" />}
                title="Address"
                subtitle="Where you currently live"
              >
                <VStack align="stretch" gap={1}>
                  <RowItem label="Street" value="Luyahan" />
                  <RowItem label="Barangay" value="Pasonanca" />
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
}
