"use client";
import { Box } from "@chakra-ui/react";
import { ReinstatementPage } from "osp-chakra-reusable-components";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";

export default function Reinstatement() {
  const router = useRouter();

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Reinstatement",
      href: "/reinstatement",
    },
  ];

  return (
    <Box pt={"120px"} maxW={"7xl"} margin={"auto"} px={0}>
      <Breadcrumb items={breadcrumbItems} />
      <ReinstatementPage
        onSuccess={(transactionId, transactionAmt) => {
          alert(
            "Reinstatement Application Submitted Successfully! \n Transaction No: " +
              transactionId +
              "\n Transaction Amount: ₱ " +
              transactionAmt.toLocaleString()
          );
          router.push("/success");
        }}
      />
    </Box>
  );
}
