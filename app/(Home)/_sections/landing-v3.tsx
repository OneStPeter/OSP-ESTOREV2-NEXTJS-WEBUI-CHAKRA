"use client";

/* =============================================================================
 * UPDATED LANDING PAGE (V3)
 * A redesign of landing-v2.tsx — same content, data flow, and reused components,
 * but a new section rhythm and heading system for a more dignified, editorial feel.
 *
 * This file is now only the COMPOSITION ROOT: it owns the cross-section compare
 * state and stitches the sections together. Each section lives in its own folder
 * under `app/(Home)/_components/<section>/`, and shared primitives (Reveal,
 * SectionHead, GoldDivider, section tokens) live under `_components/shared/`.
 *
 * Data: `groupedPlans` is passed in from the server route (unchanged contract).
 * Stats and testimonials remain PLACEHOLDERS — replace with verified values
 * inside their respective section components.
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";

import ComparisonBanner from "@/components/ui/comparison-banner";
import Error from "@/components/ui/error";

import Hero from "../_components/hero/hero";
import EServices from "../_components/eservices/eservices";
import PlansShowcase, {
  type GroupedPlan,
} from "../_components/plans/plans-showcase";
import About from "../_components/about/about";
import TestimonialsSection from "../_components/testimonials/testimonials-section";
import ClosingCta from "../_components/cta/closing-cta";

/* Re-exported so existing importers (e.g. home-route.tsx) keep working. */
export type { GroupedPlan };

export default function LandingV3({
  groupedPlans,
}: {
  groupedPlans: GroupedPlan[];
}) {
  // Compare flow (subtle entry point) — mirrors the product landing behavior.
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((p) => p !== planDesc)
        : [...prev, planDesc],
    );
  };

  useEffect(() => {
    if (!showAlert) return;
    alertRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <Box as="main" bg={BRAND_COLORS.white} overflowX="hidden">
      {showAlert && (
        <Box
          ref={alertRef}
          position="fixed"
          top={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          w={{ base: "90%", md: "50%" }}
        >
          <Error title="Please select at least 2 plans to compare" />
        </Box>
      )}

      {/* 1 · HERO (editorial split + anchored stat ribbon) */}
      <Hero />

      {/* 2 · eSERVICES (lifted high — most visitors come for services) */}
      <EServices />

      {/* 3 · PLANS SHOWCASE */}
      <PlansShowcase
        groupedPlans={groupedPlans}
        compareList={compareList}
        toggleCompare={toggleCompare}
      />

      {/* 4 · ABOUT (asymmetric two-column editorial band) */}
      <About />

      {/* 5 · TESTIMONIALS */}
      <TestimonialsSection />

      {/* 6 · CLOSING CTA BAND (arched top — signature shape) */}
      <ClosingCta />

      {/* Compare banner (appears when plans are selected above). */}
      <ComparisonBanner
        compareList={compareList}
        setCompareList={setCompareList}
        setShowAlert={setShowAlert}
      />
    </Box>
  );
}
