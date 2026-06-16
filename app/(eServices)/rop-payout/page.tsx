"use client";

import { Box, Flex } from "@chakra-ui/react";
import { RopStepPage } from "osp-chakra-reusable-components";
import React from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <Flex p={8} mt={16} alignItems="center" justifyContent="center">
      <RopStepPage
        onClickHome={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClickTrack={() => router.push("/transaction/PY-02910910")}
      />
    </Flex>
  );
};

export default page;
