"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import { SuccessPage } from "osp-chakra-reusable-components";
import { useRouter } from "next/navigation";

interface SuccessProps {
  id: string;
}

const page = ({ id }: SuccessProps) => {
  const router = useRouter();
  return (
    <Box mt={8} mb={10}>
      <SuccessPage
        variant="payment"
        title="Payment Success"
        description=" A confirmation email has also been sent, and you can view or track this anytime in your account."
        transactionId={id}
        totalAmount="₱3,000.00"
        dateTime="Nov 25, 2025, 2:30 PM"
        onClickHome={() => {
          router.push("/");
        }}
        onClickProceed={() => {
          router.push(`/transaction/${id}`);
        }}
      ></SuccessPage>
    </Box>
  );
};

export default page;
