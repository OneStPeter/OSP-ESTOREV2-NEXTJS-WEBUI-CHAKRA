"use client";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  Body,
  Breadcrumb,
  H4,
  PrimaryMdButton,
  SecondaryMdButton,
  Small,
} from "st-peter-ui";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { BreadcrumbItemType } from "st-peter-ui";
import Container from "@/components/ui/container";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaExchangeAlt,
  FaFileAlt,
  FaRegCreditCard,
  FaMoneyBillWave,
  FaRedoAlt,
} from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  ProductCarousel,
} from "@/components/ui/product-carousel";

type AccountPlan = {
  contractNo: string;
  plan: string;
  mode: string;
  amountDue: string;
  effectiveDate: string;
  dueDate: string;
  balance: string;
};

type EService = {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
};

const eServices: EService[] = [
  {
    title: "File a Claim",
    description:
      "Submit a claim request and check your policy details for the next steps.",
    icon: FaFileAlt,
    href: "/claims",
  },
  {
    title: "Pay My Plan",
    description: "Review your active plans and prepare payments in one place.",
    icon: FaRegCreditCard,
    href: "/account/pay-my-plan",
  },
  {
    title: "Return of Premium",
    description: "Review premium return details and available payout options.",
    icon: FaMoneyBillWave,
    href: "/rop",
  },
  {
    title: "Transfer My Plan",
    description: "Request a transfer and manage your plan ownership details.",
    icon: FaExchangeAlt,
    href: "/account/manage-plan/transfer",
  },
  {
    title: "Change Mode",
    description: "Submit a request to change your plan payment mode.",
    icon: FaRedoAlt,
    href: "/change-mode",
  },
];

const accountPlans: AccountPlan[] = [
  {
    contractNo: "LOS001111C",
    plan: "ST. ANNE",
    mode: "Monthly",
    amountDue: "3,000.00",
    effectiveDate: "02/09/2026",
    dueDate: "04/09/2026",
    balance: "174,000.00",
  },
  {
    contractNo: "LOS001112C",
    plan: "ST. GREGORY",
    mode: "Annual",
    amountDue: "11,400.00",
    effectiveDate: "02/20/2026",
    dueDate: "02/20/2027",
    balance: "45,600.00",
  },
  {
    contractNo: "LOS001113C",
    plan: "ST. CLAIRE",
    mode: "Annual",
    amountDue: "19,700.00",
    effectiveDate: "03/09/2026",
    dueDate: "03/09/2027",
    balance: "78,800.00",
  },
];

const parseAmount = (value: string) => Number(value.replace(/,/g, ""));

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Account = () => {
  const { login } = useDemoAuth();
  const router = useRouter();
  const [planCarouselApi, setPlanCarouselApi] = useState<CarouselApi>();
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const pageBg = useColorModeValue("white", "gray.950");
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");
  const softBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Account",
      href: "/account",
    },
  ];

  const summaryStats = useMemo(() => {
    const totalAmountDue = accountPlans.reduce(
      (total, plan) => total + parseAmount(plan.amountDue),
      0,
    );
    const totalBalance = accountPlans.reduce(
      (total, plan) => total + parseAmount(plan.balance),
      0,
    );

    return {
      totalPlans: accountPlans.length,
      totalAmountDue,
      totalBalance,
    };
  }, []);

  useEffect(() => {
    // Demo behavior: treat visiting /account as an authenticated entry.
    login();
  }, [login]);

  useEffect(() => {
    if (!planCarouselApi) {
      return;
    }

    const updateCurrentPlan = () => {
      setCurrentPlanIndex(planCarouselApi.selectedScrollSnap());
    };

    updateCurrentPlan();
    planCarouselApi.on("select", updateCurrentPlan);
    planCarouselApi.on("reInit", updateCurrentPlan);

    return () => {
      planCarouselApi.off("select", updateCurrentPlan);
      planCarouselApi.off("reInit", updateCurrentPlan);
    };
  }, [planCarouselApi]);

  const renderPlanCard = (plan: AccountPlan) => (
    <Box position="relative" pb="5" h="full">
      <Box
        bg="#159B50"
        color="white"
        borderRadius="lg"
        minH={{ base: "188px", md: "204px" }}
        h="full"
        p={{ base: 4, sm: 5 }}
        position="relative"
        overflow="hidden"
        cursor="pointer"
        role="button"
        tabIndex={0}
        onClick={() => router.push("/account/pay-my-plan")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            router.push("/account/pay-my-plan");
          }
        }}
      >
        <Box
          position="absolute"
          top="-54px"
          right="-20px"
          w="122px"
          h="122px"
          borderRadius="full"
          bg="whiteAlpha.100"
        />
        <Box
          position="absolute"
          top="-28px"
          right="-56px"
          w="120px"
          h="120px"
          borderRadius="full"
          bg="whiteAlpha.100"
        />

        <Flex
          justify="space-between"
          align="start"
          gap="3"
          position="relative"
          zIndex={1}
        >
          <Box minW={0}>
            <Small color="whiteAlpha.800" fontWeight="800">
              LPA NUMBER
            </Small>
            <Text fontSize="sm" fontWeight="900" lineHeight="1">
              {plan.contractNo}
            </Text>
          </Box>

          <Badge
            bg="whiteAlpha.200"
            color="white"
            px="3"
            py="1"
            rounded="full"
            fontSize="xs"
            fontWeight="900"
          >
            ACTIVE
          </Badge>
        </Flex>

        <Box position="relative" zIndex={1} mt="5">
          <Text
            fontSize={{ base: "lg", sm: "xl" }}
            fontWeight="900"
            lineHeight="1"
          >
            {plan.plan}
          </Text>
          <Text mt="1" fontSize="xs" fontWeight="800" lineHeight="1.2">
            {plan.mode.toUpperCase()} - 5 years - ZAMBOANGA WEST
          </Text>
        </Box>

        <Box position="relative" zIndex={1} mt="4">
          <Flex justify="space-between" align="end" gap="3">
            <Box>
              <Small color="white" fontWeight="900">
                PAID P {plan.amountDue}
              </Small>
            </Box>
            <Small color="white" fontWeight="900">
              20%
            </Small>
          </Flex>
          <Box
            mt="1"
            h="3px"
            bg="whiteAlpha.400"
            borderRadius="full"
            overflow="hidden"
          >
            <Box h="full" w="20%" bg="white" />
          </Box>
        </Box>

        <Flex
          justify="space-between"
          align="end"
          gap="4"
          position="relative"
          zIndex={1}
          mt="4"
        >
          <Box>
            <Small color="whiteAlpha.800" fontWeight="900">
              NEXT DUE {plan.dueDate}
            </Small>
            <Text fontSize="lg" fontWeight="900" lineHeight="1">
              P{plan.amountDue}
            </Text>
          </Box>
          <Button
            bg="white"
            color="#159B50"
            size="sm"
            minW="64px"
            h="30px"
            borderRadius="md"
            fontSize="xs"
            fontWeight="900"
            _hover={{ bg: "green.50" }}
            onClick={(event) => {
              event.stopPropagation();
              router.push("/account/pay-my-plan");
            }}
          >
            PAY
          </Button>
        </Flex>
      </Box>

      {/* <Button
          position="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          bg="white"
          color="#159B50"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="0 8px 18px rgba(15, 23, 42, 0.18)"
          borderRadius="full"
          h="32px"
          minW="130px"
          px="4"
          fontSize="xs"
          fontWeight="900"
          _hover={{ bg: "green.50" }}
          onClick={() => router.push("/account/pay-my-plan")}
        >
          VIEW DETAILS
        </Button> */}
    </Box>
  );

  return (
    <Container>
      <Box display={{ base: "none", md: "block" }}>
        <Breadcrumb items={breadcrumbItems} />
      </Box>
      <Box display={{ base: "block", md: "none" }} mb={{ base: 4, md: 0 }}>
        <Button variant="ghost" size="md" onClick={() => router.back()} px={0}>
          <FaArrowLeft color="#177D54" />
          Back
        </Button>
      </Box>

      <VStack align="stretch" gap={{ base: 4, md: 8 }}>
        <Box
          bg={pageBg}
          // borderWidth="1px"
          // borderColor={borderColor}
          borderRadius="2xl"
          // p={{ base: 4, md: 6 }}
        >
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            <Box>
              {/* <Badge
                bg="green.100"
                color="#177D54"
                px="3"
                py="1"
                rounded="full"
                fontWeight="700"
              >
                Quick Glance
              </Badge> */}

              <H4 mt="4">Life Plans</H4>
              <Body color={labelColor} mt="2" maxW="2xl">
                A compact view of the life plan products available.
              </Body>

              {/* <HStack gap={3} mt={5} flexWrap="wrap">
                <PrimaryMdButton onClick={() => router.push("/plans")}>
                  EXPLORE PLANS
                </PrimaryMdButton>
                <SecondaryMdButton
                  onClick={() => router.push("/account/pay-my-plan")}
                >
                  MANAGE PAYMENTS
                </SecondaryMdButton>
              </HStack> */}
            </Box>

            {/* <Box
              bg={softBg}
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="lg"
              p={{ base: 4, md: 5 }}
            >
              <Small color="#177D54" fontWeight="700">
                Highlights
              </Small>
              <VStack align="stretch" gap={3} mt={3}>
                <Flex justify="space-between" align="center">
                  <Text color={labelColor} fontSize="sm">
                    Active Plans
                  </Text>
                  <Text color={valueColor} fontWeight="700">
                    {summaryStats.totalPlans}
                  </Text>
                </Flex>
                <Separator borderColor={borderColor} />
                <Flex justify="space-between" align="center">
                  <Text color={labelColor} fontSize="sm">
                    Total amount due
                  </Text>
                  <Text color={valueColor} fontWeight="700">
                    P {formatCurrency(summaryStats.totalAmountDue)}
                  </Text>
                </Flex>
                <Separator borderColor={borderColor} />
                <Flex justify="space-between" align="center">
                  <Text color={labelColor} fontSize="sm">
                    Total balance
                  </Text>
                  <Text color={valueColor} fontWeight="700">
                    P {formatCurrency(summaryStats.totalBalance)}
                  </Text>
                </Flex>
              </VStack>
            </Box> */}
          </Grid>
        </Box>

        <Box
          bg={cardBg}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="0 14px 28px rgba(15, 23, 42, 0.12)"
          p={{ base: 3, sm: 4 }}
          maxW={{ base: "440px", md: "full" }}
          w="full"
        >
          <Text color="#0F8E49" fontSize="sm" fontWeight="700">
            List of Plan(s)
          </Text>
          <Separator borderColor={borderColor} my="2" />

          <Box display={{ base: "block", md: "none" }}>
            <ProductCarousel
              setApi={setPlanCarouselApi}
              opts={{
                align: "center",
                loop: false,
                dragFree: false,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent>
                {accountPlans.map((plan) => (
                  <CarouselItem key={plan.contractNo}>
                    {renderPlanCard(plan)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                display="flex"
                top="50%"
                left="0"
                w="30px"
                h="30px"
                minW="30px"
                bg="#E4F7EC"
                color="#159B50"
                borderColor="#BFE9D0"
                transform="translate(-50%, -50%)"
                _hover={{ bg: "#D5F2E2" }}
              />
              <CarouselNext
                display="flex"
                top="50%"
                right="0"
                w="30px"
                h="30px"
                minW="30px"
                bg="white"
                color="#159B50"
                borderColor="#159B50"
                transform="translate(50%, -50%)"
                _hover={{ bg: "green.50" }}
              />
            </ProductCarousel>

            <HStack justify="center" gap="2" mt="-1">
              {accountPlans.map((plan, index) => (
                <Box
                  key={plan.contractNo}
                  w={index === currentPlanIndex ? "34px" : "7px"}
                  h="6px"
                  borderRadius="full"
                  bg={index === currentPlanIndex ? "gray.200" : "gray.100"}
                  transition="all 0.2s ease"
                />
              ))}
            </HStack>
          </Box>

          <Grid
            display={{ base: "none", md: "grid" }}
            templateColumns={{
              md: "repeat(2, minmax(0, 1fr))",
              xl: "repeat(3, minmax(0, 1fr))",
            }}
            gap={4}
          >
            {accountPlans.map((plan) => (
              <Box key={plan.contractNo} minW={0}>
                {renderPlanCard(plan)}
              </Box>
            ))}
          </Grid>
        </Box>

        <Box
          bg={pageBg}
          // borderWidth="1px"
          // borderColor={borderColor}
          borderRadius="2xl"
          // p={{ base: 4, md: 6 }}
        >
          <H4>eServices</H4>
          <Body color={labelColor} mt="2" maxW="2xl">
            Manage your plan requests in one place, from filing a claim and
            paying your plan to transferring ownership or changing your mode.
          </Body>

          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
            gap={4}
            mt={5}
          >
            {eServices.map((service) => (
              <Box
                key={service.title}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="2xl"
                p={{ base: 4, md: 5 }}
                cursor="pointer"
                role="button"
                tabIndex={0}
                onClick={() => router.push(service.href)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(service.href);
                  }
                }}
                transition="transform 0.2s ease, box-shadow 0.2s ease"
                _hover={{ transform: "translateY(-2px)" }}
              >
                <HStack justify="space-between" align="start">
                  {/* <Badge bg="green.100" color="#177D54" rounded="full">
                    E-SERVICE
                  </Badge> */}
                  <Box
                    boxSize="10"
                    rounded="full"
                    bg={softBg}
                    borderWidth="1px"
                    borderColor={borderColor}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#177D54"
                  >
                    <Box as={service.icon} />
                  </Box>
                </HStack>
                <Text fontWeight="700" color={valueColor} mt="3" fontSize="lg">
                  {service.title}
                </Text>
                <Text color={labelColor} fontSize="sm" mt="2">
                  {service.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>
    </Container>
  );
};

export default Account;
