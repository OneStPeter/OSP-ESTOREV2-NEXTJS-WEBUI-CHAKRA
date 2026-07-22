"use client";

import { useRouter } from "next/navigation";
import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  FiCreditCard,
  FiCalendar,
  FiFileText,
  FiRepeat,
  FiRefreshCw,
  FiDollarSign,
} from "react-icons/fi";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";

import Reveal from "../shared/reveal";
import SectionHead from "../shared/section-head";
import { SECTION_PX } from "../shared/section-tokens";
import ServiceCard from "./service-card";

/* Online self-service shortcuts — each routes to its own eServices page. */
const eServices = [
  {
    icon: FiCreditCard,
    title: "Pay My Plan",
    description: "Settle your monthly premiums online, anytime.",
    href: "/pay-my-plan",
  },
  {
    icon: FiCalendar,
    title: "Book a Service",
    description: "Arrange a memorial service for a loved one.",
    href: "/booking",
  },
  {
    icon: FiFileText,
    title: "File a Claim",
    description: "Submit and track a plan benefit claim.",
    href: "/claims",
  },
  {
    icon: FiRepeat,
    title: "Change Mode",
    description: "Update your payment mode or schedule.",
    href: "/change-mode",
  },
  {
    icon: FiRefreshCw,
    title: "Reinstatement",
    description: "Reactivate a lapsed plan and stay covered.",
    href: "/reinstatement",
  },
  {
    icon: FiDollarSign,
    title: "Return of Premium",
    description: "Request the return of your paid premiums.",
    href: "/rop",
  },
];

/* -----------------------------------------------------------------------------
 * EServices — online self-service shortcuts (lifted high on the page because
 * most visitors come for services).
 * -------------------------------------------------------------------------- */
export default function EServices() {
  const router = useRouter();

  return (
    <Box as="section" aria-label="Online services" bg={BRAND_COLORS.white}>
      <Box
        maxW="7xl"
        mx="auto"
        px={SECTION_PX}
        py={{ base: "48px", md: "80px" }}
      >
        <Reveal>
          <SectionHead
            eyebrow="eServices"
            title="Manage your plan online, anytime"
            intro="Handle payments, bookings, claims, and more quick, secure self-service whenever you need it."
            maxW="640px"
          />
        </Reveal>

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gap={{ base: 4, md: 6 }}
          mt={{ base: "32px", md: "48px" }}
        >
          {eServices.map((service, index) => (
            <Reveal key={service.href} delay={index * 70}>
              <ServiceCard
                {...service}
                onSelect={() => router.push(service.href)}
              />
            </Reveal>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
