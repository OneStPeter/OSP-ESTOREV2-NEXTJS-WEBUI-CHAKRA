import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

interface ComparisonBannerProps {
  compareList: string[];
  setShowAlert: (show: boolean) => void;
  setCompareList: (list: string[]) => void;
}

const ComparisonBanner = ({
  compareList,
  setShowAlert,
  setCompareList,
}: ComparisonBannerProps) => {
  const router = useRouter();

  const handleCompare = () => {
    if (compareList.length < 2) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    router.push(`/plan-comparison/${compareList.join(",")}`);
  };

  if (compareList.length === 0) {
    return null;
  }

  return (
    <Box
      position="fixed"
      left="50%"
      bottom={{
        base: "calc(5.5rem + env(safe-area-inset-bottom))",
        md: STANDARD_SPACING.md,
      }}
      transform="translateX(-50%)"
      w={{ base: "calc(100% - 32px)", md: "min(760px, calc(100% - 64px))" }}
      maxW="760px"
      bg={BRAND_COLORS.darkGreen}
      color={BRAND_COLORS.white}
      borderWidth="1px"
      borderColor={BRAND_COLORS.primaryGreen}
      borderRadius={{ base: STANDARD_RADIUS.lg, md: STANDARD_RADIUS.xl }}
      px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
      py={{ base: STANDARD_SPACING.sm, md: "14px" }}
      boxShadow={STANDARD_SHADOWS.level3}
      zIndex={40}
    >
      <Flex
        align={{ base: "stretch", sm: "center" }}
        justify="space-between"
        direction={{ base: "column", sm: "row" }}
        gap={STANDARD_SPACING.sm}
      >
        <Box minW={0}>
          <Text
            fontSize={{ base: "15px", md: "16px" }}
            fontWeight="800"
            lineHeight="1.3"
          >
            {compareList.length} {compareList.length === 1 ? "plan" : "plans"}{" "}
            selected for comparison
          </Text>
          <Text
            display={{ base: "none", md: "block" }}
            mt="2px"
            color="#D8F5E5"
            fontSize="13px"
            lineClamp={1}
          >
            {compareList.join(", ")}
          </Text>
        </Box>

        <HStack gap={STANDARD_SPACING.xs} w={{ base: "full", sm: "auto" }}>
          <Button
            h="40px"
            flex={{ base: "1", sm: "initial" }}
            minW={{ base: 0, sm: "116px" }}
            px={STANDARD_SPACING.sm}
            borderWidth="1px"
            borderColor="#BFE8D0"
            borderRadius={STANDARD_RADIUS.md}
            bg="transparent"
            color={BRAND_COLORS.white}
            fontSize="13px"
            fontWeight="800"
            onClick={() => setCompareList([])}
            _hover={{ bg: "rgba(255,255,255,0.12)" }}
          >
            CLEAR ALL
          </Button>

          <Button
            h="40px"
            flex={{ base: "1", sm: "initial" }}
            minW={{ base: 0, sm: "140px" }}
            px={STANDARD_SPACING.sm}
            borderRadius={STANDARD_RADIUS.md}
            bg={BRAND_COLORS.white}
            color={BRAND_COLORS.darkGreen}
            fontSize="13px"
            fontWeight="800"
            disabled={compareList.length > 3}
            onClick={handleCompare}
            _hover={{ bg: BRAND_COLORS.successBg }}
          >
            COMPARE PLAN
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ComparisonBanner;
