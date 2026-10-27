"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Page from "@/components/layout/page/Page";
import PaymentSuccess from "@/components/payment/payment-success";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") ?? undefined;

  return (
    <PaymentSuccess
      transactionId={requestId}
      primaryActionLabel="Back to Home"
      onPrimaryAction={() => router.push("/")}
      secondaryActionLabel="Go to My Account"
      onSecondaryAction={() => router.push("/account")}
    />
  );
};

const PaymentSuccessPage = () => {
  return (
    <Page.Root title="" description="" hideBackButton>
      <Page.MainContent>
        <Page.Row>
          <Suspense fallback={null}>
            <PaymentSuccessContent />
          </Suspense>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default PaymentSuccessPage;
