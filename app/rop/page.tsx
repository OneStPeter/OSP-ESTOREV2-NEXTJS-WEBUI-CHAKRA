"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";

import { RopPage } from "osp-chakra-reusable-components";
import React from "react";

const page = () => {
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Return of Premium",
      href: "/rop",
    },
  ];
  const router = useRouter();
  return (
    <Flex p={8} mt={24} alignItems="center" justifyContent="center">
      <RopPage onClick={() => router.push("/rop-payout")} />
    </Flex>
  );
};

export default page;
