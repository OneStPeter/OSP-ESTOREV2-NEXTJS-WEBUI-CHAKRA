"use client";

import type { ComponentProps } from "react";
import { ErrorStateCard } from "osp-ui-kit";

export type PaymentErrorProps = ComponentProps<typeof ErrorStateCard>;

const PaymentError = ({
  title = "Payment Failed",
  description = "Your payment was not completed. Please try again.",
  retryLabel = "Try Again",
  ...props
}: PaymentErrorProps) => {
  return (
    <ErrorStateCard
      title={title}
      description={description}
      retryLabel={retryLabel}
      {...props}
    />
  );
};

export default PaymentError;
