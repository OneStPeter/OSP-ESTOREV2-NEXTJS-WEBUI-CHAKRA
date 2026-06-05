// Author: Jimwell Ocsio
"use client";

import { Box, Flex, type BoxProps } from "@chakra-ui/react";
import React from "react";
import Caption from "../../texts/Caption";
import BackButton from "./BackButton";

type PageScrollShellProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  toolContent?: React.ReactNode;
  mainContent?: React.ReactNode;
  boxProps?: BoxProps;
};

const PageScrollShell = ({
  title,
  subtitle,
  description,
  toolContent,
  mainContent,
  boxProps,
}: PageScrollShellProps) => {
  return (
    // lg: "36px 44px 56px"
    <Box
      w={{ base: "100vw", lg: "7xl" }}
      p={{ base: "0px 16px 96px", lg: "80px 0px 56px" }}
      {...boxProps}
      mx="auto"
      // h="100%"
      // maxH="100%"
      // overflowY="auto"
      // overflowX="hidden"
      // scrollBehavior="smooth"
      bg={"#fff"}
    >
      <Box
        mx={{ base: "-16px", lg: "-44px" }}
        px={{ base: "16px", lg: "0" }}
        pt={{ base: "20px", lg: "36px" }}
        mb="0px"
      >
        <Flex
          direction="column"
          align="start"
          w={{ base: "calc(100vw - 32px)", lg: "7xl" }}
          mx="auto"
          gap={{ base: "10px", lg: "24px" }}
          pb="24px"
        >
          <Box minW={0} flex="1">
            <BackButton />
            {subtitle && (
              <Box
                fontFamily="var(--font-dm-sans), system-ui, sans-serif"
                color="#7B8079"
                fontSize="10px"
                fontWeight={700}
                lineHeight="1"
                letterSpacing="0.06em"
                textTransform="uppercase"
                mb="2px"
              >
                {subtitle}
              </Box>
            )}
            <Box
              as="h1"
              m="0"
              fontFamily="var(--font-dm-sans), system-ui, sans-serif"
              fontWeight={subtitle ? 600 : 500}
              color="gray.900"
              lineHeight="1"
              letterSpacing={subtitle ? "-0.025em" : "-0.015em"}
              fontSize={{
                base: subtitle ? "22px" : "24px",
                lg: subtitle ? "28px" : "32px",
              }}
            >
              {title}
            </Box>
            {description && (
              <Caption
                fontFamily="var(--font-dm-sans), system-ui, sans-serif"
                mt="6px"
              >
                {description}
              </Caption>
            )}
          </Box>
          {toolContent}
        </Flex>
      </Box>
      {mainContent}
    </Box>
  );
};

export default PageScrollShell;
