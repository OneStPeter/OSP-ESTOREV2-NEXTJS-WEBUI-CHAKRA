"use client";

import { Box, Flex } from "@chakra-ui/react";
import { RopStepPage } from "osp-chakra-reusable-components";
import React from "react";

const page = () => {
  return (
    <Flex p={8} mt={40} alignItems="center" justifyContent="center">
      <RopStepPage
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Flex>
  );
};

export default page;
