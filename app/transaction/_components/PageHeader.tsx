"use client";

import { Box, Text } from "@chakra-ui/react";

type PageHeaderProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  description,
}: PageHeaderProps) {
  if (!title && !subtitle && !description) return null;

  return (
    <Box mb={4}>
      <Box
        as="h1"
        m="0"
        fontFamily="var(--font-dm-sans), system-ui, sans-serif"
        fontWeight={description ? 600 : 500}
        color="gray.900"
        lineHeight="1"
        letterSpacing={description ? "-0.025em" : "-0.015em"}
        fontSize={{
          base: description ? "22px" : "24px",
          lg: description ? "28px" : "32px",
        }}>
        {title}
      </Box>

      <Text fontSize="sm" color="gray.600" mt={1}>
        {description}
      </Text>
    </Box>
  );
}
