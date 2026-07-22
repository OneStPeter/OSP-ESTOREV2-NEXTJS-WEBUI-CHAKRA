import { Box } from "@chakra-ui/react";
import { H2, Body, Small } from "st-peter-ui";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";

import GoldDivider from "./gold-divider";

/* -----------------------------------------------------------------------------
 * SectionHead — one reusable, left-aligned heading unit (eyebrow stacked ABOVE
 * the title, same column) used across every section for a consistent rhythm.
 * -------------------------------------------------------------------------- */
export default function SectionHead({
  eyebrow,
  title,
  intro,
  maxW = "720px",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  maxW?: string;
}) {
  return (
    <Box maxW={maxW}>
      <Small
        fontWeight="800"
        letterSpacing="0.08em"
        textTransform="uppercase"
        color={BRAND_COLORS.darkGreen}
      >
        {eyebrow}
      </Small>
      <H2
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="800"
        lineHeight="1.15"
        color={BRAND_COLORS.neutralText}
        mt="8px"
      >
        {title}
      </H2>
      <Box mt="14px">
        <GoldDivider />
      </Box>
      {intro ? (
        <Body
          color={BRAND_COLORS.grey}
          fontSize={{ base: "md", md: "lg" }}
          mt="16px"
        >
          {intro}
        </Body>
      ) : null}
    </Box>
  );
}
