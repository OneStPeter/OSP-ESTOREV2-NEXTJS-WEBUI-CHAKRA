"use client";

import { useRouter } from "next/navigation";
import Page from "@/components/layout/page/Page";
import PaymentError from "@/components/payment/payment-error";

const PaymentErrorPage = () => {
  const router = useRouter();

  return (
    <Page.Root title="" description="" hideBackButton>
      <Page.MainContent>
        <Page.Row>
          <PaymentError onRetry={() => router.push("/lifeplan-application")} />
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default PaymentErrorPage;
