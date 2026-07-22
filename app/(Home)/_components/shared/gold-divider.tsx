import { Box } from "@chakra-ui/react";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { STANDARD_RADIUS } from "@/lib/theme/standard-design-tokens";

/* Signature gold divider motif — the through-line for every section heading. */
export default function GoldDivider({ mx = "0" }: { mx?: string }) {
  return (
    <Box
      h="4px"
      w="72px"
      mx={mx}
      borderRadius={STANDARD_RADIUS.full}
      bg={`linear-gradient(90deg, ${BRAND_COLORS.gold}, ${BRAND_COLORS.brightGold})`}
    />
  );
}
