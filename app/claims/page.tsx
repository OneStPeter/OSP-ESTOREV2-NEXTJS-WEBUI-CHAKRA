"use client";

import React from "react";
import { FileClaimPage } from "osp-chakra-reusable-components";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";
const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Claims",
    href: "/claims",
  },
];
const page = () => {
  const router = useRouter();
  return (
    <Box p={8} mt={24} maxW={"7xl"} mx={"auto"} px={0}>
      <Breadcrumb items={breadcrumbItems} />
      <FileClaimPage
        onClickHome={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClickTrack={() => {
          router.push("/transaction/PY-9183982");
        }}
      />
    </Box>
  );
};

export default page;
