"use client";
import React, { useEffect, useState } from "react";
import { Body, Box, Breadcrumb, H3, PrimaryMdFlexButton } from "st-peter-ui";
import {
  VStack,
  Grid,
  Separator,
  Input,
  Field,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import FloatingLabelInput from "@/components/ui/floating-label-input";
import { ISearchedPlanholder } from "@/types/planholder";
import { PayMongoService } from "@/services/API/PayMongoService";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cartItem";
import Container from "@/components/ui/container";
import { FaArrowLeft } from "react-icons/fa6";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

const DetailsPayMyPlan = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pay My Plan", href: "/pay-my-plan" },
  ];
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    contractNo: "",
    planType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    lotNo: "",
    street: "",
    province: "",
    city: "",
    district: "",
    zipCode: "",
    barangay: "",
    email: "",
    mobileNo: "",
    installmentNumber: "",
    paymentType: "",
    deceasedLastName: "",
    deceasedFirstName: "",
    installmentAmount: 0,
    balance: 0,
  });

  const toSafeNumber = (value: unknown) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(toSafeNumber(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceed = async () => {
    setIsCheckingOut(true);

    try {
      const selectedAmount =
        formData.paymentType === "installment"
          ? toSafeNumber(formData.installmentAmount)
          : formData.paymentType === "activePlan"
            ? toSafeNumber(formData.balance)
            : 0;

      const myPlanPayload = {
        LPANo: formData.contractNo,
        planDesc: formData.planType,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        ...(formData.paymentType === "installment"
          ? { ipInstAmt: selectedAmount }
          : { balance: selectedAmount }),
      };

      sessionStorage.setItem("PayMyPlan", JSON.stringify(myPlanPayload));

      const storedMyPlan = sessionStorage.getItem("PayMyPlan");

      const parsedMyPlan = storedMyPlan
        ? (JSON.parse(storedMyPlan) as CartItem)
        : null;

      if (!parsedMyPlan) {
        throw new Error("My Plan data is missing");
      }

      const checkoutPayload = [
        {
          planDesc: parsedMyPlan.planDesc,
          ipInstAmt: Number(
            parsedMyPlan.ipInstAmt ?? parsedMyPlan.balance ?? 0,
          ),
          quantity: 1,
        },
      ];

      const { checkoutUrl } =
        await PayMongoService.createCheckout(checkoutPayload);

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Failed to proceed to payment");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const selectedDisplayAmount =
    formData.paymentType === "installment"
      ? toSafeNumber(formData.installmentAmount)
      : formData.paymentType === "activePlan"
        ? toSafeNumber(formData.balance)
        : 0;

  const router = useRouter();

  useEffect(() => {
    const serializedData = sessionStorage.getItem("payMyPlanDetails");
    if (!serializedData) {
      return;
    }

    try {
      const searchedPlanholder = JSON.parse(
        serializedData,
      ) as ISearchedPlanholder & {
        amountPayable?: number;
        planDetails?: {
          amount?: number;
          amountPayable?: number;
          balance?: number;
        };
      };

      const resolvedInstallmentAmount = toSafeNumber(
        searchedPlanholder.installmentAmount ??
          searchedPlanholder.planDetails?.amount,
      );
      const resolvedBalance = toSafeNumber(
        searchedPlanholder.balance ??
          searchedPlanholder.amountPayable ??
          searchedPlanholder.planDetails?.balance ??
          searchedPlanholder.planDetails?.amountPayable,
      );

      setFormData((prev) => ({
        ...prev,
        contractNo: searchedPlanholder.contractNo,
        planType: searchedPlanholder.planType,
        firstName: searchedPlanholder.personalInfo.firstName,
        middleName: searchedPlanholder.personalInfo.middleName,
        lastName: searchedPlanholder.personalInfo.lastName,
        lotNo: searchedPlanholder.address.lot,
        street: searchedPlanholder.address.street,
        province: searchedPlanholder.address.province,
        city: searchedPlanholder.address.city,
        district: searchedPlanholder.address.district,
        zipCode: searchedPlanholder.address.zipCode,
        barangay: searchedPlanholder.address.barangay,
        email: searchedPlanholder.personalInfo.emailAddress,
        mobileNo: searchedPlanholder.personalInfo.mobileNumber,
        installmentAmount: resolvedInstallmentAmount,
        balance: resolvedBalance,
      }));
    } catch {
      sessionStorage.removeItem("payMyPlanDetails");
    }
  }, []);

  return (
    <Container>
      <Box display={{ base: "block", md: "none" }} mb={{ base: 4, md: 0 }}>
        <Button variant="ghost" size="md" onClick={() => router.back()} px={0}>
          <FaArrowLeft color="#177D54" />
          Back
        </Button>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Breadcrumb items={breadcrumbItems} />
      </Box>
      <Box maxW="760px">
        <H3>Pay My Plan</H3>
        <Body>
          Review the details of your plan and proceed to payment. Please ensure
          that all information is correct before proceeding.
        </Body>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "minmax(0, 760px) 360px" }}
        gap={{ base: STANDARD_SPACING.md, lg: STANDARD_SPACING.lg }}
        alignItems="start"
        mt={8}
        w="full"
      >
        <VStack gap={STANDARD_SPACING.md} align="stretch" w="full" maxW="760px">
          <Box
            bg={BRAND_COLORS.white}
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.lg}
            boxShadow={STANDARD_SHADOWS.level1}
            p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <VStack gap={STANDARD_SPACING.formFieldGap} align="stretch">
              <Body fontWeight="bold">Plan Details</Body>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="contractNo"
                    name="contractNo"
                    type="text"
                    label="Contract No."
                    value={formData.contractNo}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="planType"
                    name="planType"
                    type="text"
                    label="Plan Type"
                    value={formData.planType}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="middleName"
                    name="middleName"
                    type="text"
                    label="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
              <Grid templateColumns="1fr" gap={STANDARD_SPACING.formFieldGap}>
                <Field.Root>
                  <FloatingLabelInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
            </VStack>
          </Box>

          <Box
            bg={BRAND_COLORS.white}
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.lg}
            boxShadow={STANDARD_SHADOWS.level1}
            p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <VStack gap={STANDARD_SPACING.formFieldGap} align="stretch">
              <Body fontWeight="bold">Address</Body>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="lotNo"
                    name="lotNo"
                    type="text"
                    label="Lot #"
                    value={formData.lotNo}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="street"
                    name="street"
                    type="text"
                    label="Street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="province"
                    name="province"
                    type="text"
                    label="Province"
                    value={formData.province}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="city"
                    name="city"
                    type="text"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="district"
                    name="district"
                    type="text"
                    label="District"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    label="ZipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="barangay"
                    name="barangay"
                    type="text"
                    label="Barangay"
                    value={formData.barangay}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
            </VStack>
          </Box>

          <Box
            bg={BRAND_COLORS.white}
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.lg}
            boxShadow={STANDARD_SHADOWS.level1}
            p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <VStack gap={STANDARD_SPACING.formFieldGap} align="stretch">
              <Body fontWeight="bold">Contact Details</Body>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={STANDARD_SPACING.formFieldGap}
              >
                <Field.Root>
                  <FloatingLabelInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Field.Root>
                <Field.Root>
                  <FloatingLabelInput
                    id="mobileNo"
                    name="mobileNo"
                    type="text"
                    label="Mobile No."
                    value={formData.mobileNo}
                    onChange={handleChange}
                  />
                </Field.Root>
              </Grid>
            </VStack>
          </Box>

          <Box
            bg={BRAND_COLORS.white}
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.lg}
            boxShadow={STANDARD_SHADOWS.level1}
            p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <VStack gap={STANDARD_SPACING.formFieldGap} align="stretch">
              <Body>Select your desired payment type.</Body>
              <Field.Root>
                <RadioGroup.Root
                  value={formData.paymentType}
                  onValueChange={(e: unknown) =>
                    setFormData((prev) => {
                      const paymentType =
                        typeof e === "string"
                          ? e
                          : typeof e === "object" &&
                              e !== null &&
                              "value" in e &&
                              typeof e.value === "string"
                            ? e.value
                            : "";

                      return {
                        ...prev,
                        paymentType,
                      };
                    })
                  }
                >
                  <VStack gap={6} w="full" align="stretch">
                    <VStack align="stretch" gap={4} w="full">
                      <Body fontWeight="bold" color="gray.600">
                        INSTALLMENT
                      </Body>
                      <RadioGroup.Item value="installment">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemControl />
                        <RadioGroup.ItemText>
                          Installment Number To Be Paid
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <Field.Root>
                        <Input
                          type="number"
                          placeholder="1"
                          value={formData.installmentNumber}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              installmentNumber: e.target.value,
                            }))
                          }
                          w="120px"
                        />
                      </Field.Root>
                    </VStack>
                    <Separator />
                    <VStack align="stretch" gap={4} w="full">
                      <Body fontWeight="bold" color="gray.600">
                        PAY THE BALANCE
                      </Body>
                      <RadioGroup.Item value="activePlan">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemControl />
                        <RadioGroup.ItemText>For Active Plan</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="memorialService">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemControl />
                        <RadioGroup.ItemText>
                          For Memorial Service
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <Body fontSize="sm" color="gray.500">
                        Enter the name of the deceased
                      </Body>
                      <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap={STANDARD_SPACING.formFieldGap}
                      >
                        <Field.Root>
                          <FloatingLabelInput
                            id="deceasedLastName"
                            name="deceasedLastName"
                            type="text"
                            label="Last Name"
                            value={formData.deceasedLastName}
                            onChange={handleChange}
                          />
                        </Field.Root>
                        <Field.Root>
                          <FloatingLabelInput
                            id="deceasedFirstName"
                            name="deceasedFirstName"
                            type="text"
                            label="First Name"
                            value={formData.deceasedFirstName}
                            onChange={handleChange}
                          />
                        </Field.Root>
                      </Grid>
                    </VStack>
                  </VStack>
                </RadioGroup.Root>
              </Field.Root>
            </VStack>
          </Box>
        </VStack>

        <Box
          w="full"
          maxW={{ base: "full", lg: "360px" }}
          bg={BRAND_COLORS.subtleBg}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          borderRadius={STANDARD_RADIUS.lg}
          boxShadow={STANDARD_SHADOWS.level1}
          p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          position={{ base: "static", lg: "sticky" }}
          top="112px"
        >
          <VStack gap={STANDARD_SPACING.md} align="stretch">
            <Body fontWeight="bold" color={BRAND_COLORS.darkGreen}>
              TOTAL AMOUNT
            </Body>
            <Body fontWeight="bold" fontSize="lg">
              <span>{formatCurrency(selectedDisplayAmount)}</span>
            </Body>
            <Separator />
            <PrimaryMdFlexButton
              onClick={handleProceed}
              disabled={isCheckingOut}
            >
              Proceed
            </PrimaryMdFlexButton>
          </VStack>
        </Box>
      </Grid>
    </Container>
  );
};

export default DetailsPayMyPlan;
