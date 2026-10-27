"use client";

import { SuccessPage, type SuccessPageProps } from "osp-ui-kit";

export type PaymentSuccessProps = Partial<SuccessPageProps>;

const PaymentSuccess = ({
  title = "Payment Successful",
  description = "Thank you! Your payment has been received. A notification will be sent to your email and mobile number.",
  referenceDetailsTitle = "Payment Details",
  transactionIdLabel = "Reference No.",
  ...props
}: PaymentSuccessProps) => {
  return (
    <SuccessPage
      title={title}
      description={description}
      referenceDetailsTitle={referenceDetailsTitle}
      transactionIdLabel={transactionIdLabel}
      {...props}
    />
  );
};

export default PaymentSuccess;
