"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeModePage } from "osp-chakra-reusable-components";

export default function Page() {
  const router = useRouter();
  return (
    <Box mt={"170px"}>
      <ChangeModePage
        onSuccess={(transactionId: string, transactionAmt: number) => {
          alert(
            "Change Mode Application Submitted Successfully! \n Transaction No: " +
              transactionId +
              "\n Transaction Amount: ₱ " +
              transactionAmt.toLocaleString()
          );
          router.push("/");
        }}
      />
    </Box>
  );
}
