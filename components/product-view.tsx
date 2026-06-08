"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IPlans } from "@/types/product";
import {
  AddToCartButton,
  BaseText,
  Breadcrumb,
  BuyNowButton,
} from "st-peter-ui";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Portal,
  Select,
  Separator,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import {
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ProductCarousel,
} from "./ui/product-carousel";
import { Body, H3, H4, Small } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa6";
import { FiCalendar, FiRepeat } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/utils/cart";
import Container from "./ui/container";
import { DetailAccordion } from "./ui/accordion";
import Page from "@/components/layout/page/Page";

type PaymentOption = {
  mode?: string;
  term: number;
  label: string;
  amount: string;
  amountValue: number;
  cadence: string;
};

type SelectOptionItem = {
  value: string;
  label: string;
};

type DetailCard = {
  title: string;
  desc?: string;
  subtitle?: string;
  icon: string;
  details?: {
    title: string;
    desc: string;
  }[];
};

const planBenefitCards: DetailCard[] = [
  {
    title: "Memorial Service",
    desc: `A memorial service from our accredited mortuary for a chapel viewing of four (4) days or for viewing outside of our accredited mortuary, at your or your beneficiary's expense, for nine (9) days. The memorial service may only be availed 30 days after the date of effectivity of the plan.`,
    icon: "/images/plan-benefits/memorial-service.jpg",
  },
  {
    title: "Casket Provision",
    desc: "A provision for a casket depending on the purchased plan.",
    icon: "/images/plan-benefits/casket-provision.jpg",
  },
  {
    title: "Insurance Coverages",
    icon: "/images/plan-benefits/insurance.jpg",
    subtitle:
      "You can buy the plan if youâ€™re healthy and between 18 and 60 years old (before your 60th birthday).",
    details: [
      {
        title: "Cash Assistance",
        desc: "Your beneficiaries shall receive an amount equivalent to the Gross Contract Price if you die within 10 years from the date of effectivity of the plan and you have not reached the age of 65 upon death.",
      },
      {
        title: "Payment of Unpaid Balance",
        desc: "The unpaid balance of your plan will be considered fully paid if you die while paying for this plan and you have not reached the age of 65 upon death.",
      },
      {
        title: "Waiver of Installment",
        desc: "You will be exempted from paying the balance of your plan if you suffer from an uninterrupted disability of at least six (6) months during the paying period and you have not reached the age of 60 at the start of your disability.",
      },
    ],
  },
  {
    title: "Accidental Death & Dismemberment",
    icon: "/images/plan-benefits/accidental-death.jpg",
    desc: "Coverage applies if you are in good health and between the insurable ages of 18 to 55 years at time of purchase. You or your beneficiaries shall be entitled to cash, based on a schedule, if you die or become dismembered due to an accident during the paying period and you have not reached the age of 60 upon death/accident.",
  },
  {
    title: "Alternative Cash / Memorial Option",
    icon: "/images/plan-benefits/cash.jpg",
    desc: "Cash according to a schedule will be provided if the memorial service is not performed. One of your heirs, successors or assigns will be entitled to a memorial service only if they opt to retain the plan.",
  },
  {
    title: "Surrender Benefit",
    icon: "/images/plan-benefits/surrender.jpg",
    desc: "Cash if you surrender your plan while in-force. You will no longer be entitled to any benefit upon surrender of your plan.",
  },
];

const planFeatureCards: DetailCard[] = [
  {
    title: "Transferability",
    desc: "You may transfer your plan to another living person.",
    icon: "/images/plan-features/transfer.jpg",
  },
  {
    title: "Assignability",
    desc: "You may assign the plan to any deceased person, however, any insurance coverage provided to the transferor shall automatically terminate, provided that the balance, if any, is paid before the service is rendered.",
    icon: "/images/plan-features/assignability.jpg",
  },
  {
    title: "Free Look Period",
    desc: "You may cancel the plan within 15 days from the date of effectivity of the plan and you will receive a refund of your payment in full.",
    icon: "/images/plan-features/free-look.jpg",
  },
];

const ProductView = ({ plans }: { plans: IPlans[] }) => {
  const router = useRouter();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const hasPlans = plans && plans.length > 0;
  const plan = hasPlans ? plans[0] : null;
  const discountValue = Number(plan?.discount ?? 0);
  const contractPrice = Number(plan?.contractPrice ?? 0) - discountValue;

  const carouselImages = plan
    ? [
        `/images/casket-images/${plan.planDesc}/${plan.planDesc}1.png`,
        `/images/casket-images/${plan.planDesc}/${plan.planDesc}2.png`,
      ]
    : [];

  useEffect(() => {
    if (!carouselApi) {
      setCurrentSlide(0);
      return;
    }

    const update = () => {
      try {
        const selected =
          typeof carouselApi.selectedScrollSnap === "function"
            ? carouselApi.selectedScrollSnap()
            : 0;
        setCurrentSlide(typeof selected === "number" ? selected : 0);
      } catch {}
    };

    update();
    carouselApi.on?.("reInit", update);
    carouselApi.on?.("select", update);

    return () => {
      carouselApi.off?.("reInit", update);
      carouselApi.off?.("select", update);
    };
  }, [carouselApi, carouselImages.length]);

  const terms = useMemo(() => {
    if (!plans) return [] as number[];
    return Array.from(
      new Set(plans.map((p) => p.planTerm).filter((t) => t != null)),
    ).sort((a, b) => Number(a) - Number(b));
  }, [plans]);

  const defaultSelectedTerm = useMemo(() => {
    if (terms.length === 0) return null;
    return plan?.planTerm ?? terms[0];
  }, [terms, plan?.planTerm]);

  const termCollection = useMemo(() => {
    return createListCollection({
      items: terms.map((t) => ({
        value: String(t),
        label: `${t} ${Number(t) === 1 ? "year" : "years"}`,
      })),
    });
  }, [terms]);

  const quantityCollection = useMemo(() => {
    return createListCollection({
      items: [1, 2, 3].map((q) => ({
        value: String(q),
        label: `${q}`,
      })),
    });
  }, []);

  useEffect(() => {
    if (defaultSelectedTerm == null) return;
    setSelectedTerm((current) => current ?? defaultSelectedTerm);
  }, [defaultSelectedTerm]);

  const paymentOptions = useMemo(() => {
    if (!plans || selectedTerm == null) return [] as PaymentOption[];

    const mapModeLabel = (mode?: string) =>
      mode === "C"
        ? "Spot Cash"
        : mode === "A"
          ? "Annual"
          : mode === "S"
            ? "Semi-Annual"
            : mode === "Q"
              ? "Quarterly"
              : mode === "M"
                ? "Monthly"
                : (mode ?? "Plan");

    const cadence = (mode?: string) =>
      mode === "C"
        ? "One-time payment"
        : mode === "A"
          ? "1 payment per year"
          : mode === "S"
            ? "2 payments per year"
            : mode === "Q"
              ? "4 payments per year"
              : mode === "M"
                ? "12 payments per year"
                : "Flexible payment";

    const formatAmount = (amt: unknown) =>
      amt == null
        ? "N/A"
        : `₱${Number(amt).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

    return plans
      .filter((p) => Number(p.planTerm) === Number(selectedTerm))
      .map((p) => {
        const isSpotCash = p.mode === "C";
        let amountValue;
        if (isSpotCash) {
          amountValue = Number(contractPrice);
        } else {
          amountValue = Number(p.ipInstAmt);
        }

        return {
          mode: p.mode,
          term: p.planTerm,
          label: mapModeLabel(p.mode),
          amount: formatAmount(amountValue),
          amountValue,
          cadence: cadence(p.mode),
        };
      });
  }, [plans, selectedTerm, contractPrice]);

  useEffect(() => {
    if (paymentOptions.length === 0) {
      setSelected(null);
      return;
    }

    if (selected && paymentOptions.some((opt) => opt.mode === selected)) {
      return;
    }

    setSelected(null);
  }, [paymentOptions, selected, selectedTerm]);

  const selectedPayment = useMemo(
    () => paymentOptions.find((opt) => opt.mode === selectedPlan),
    [paymentOptions, selectedPlan],
  );

  const selectedTotal =
    selectedPayment && quantity ? selectedPayment.amountValue * quantity : "";

  const handleAddToCart = useCallback(() => {
    const active = selectedPayment;
    if (!plan || !active || quantity == null || !selectedPlan) return;

    try {
      setIsAddingToCart(true);
      const pricePerUnit = Number(active.amountValue);
      const totalAmount = pricePerUnit * quantity;
      addToCart(
        plan.planDesc,
        selectedPlan,
        plan.planTerm.toString(),
        quantity,
        pricePerUnit,
        totalAmount,
        contractPrice,
      );
    } finally {
      setIsAddingToCart(false);
    }
  }, [selectedPayment, plan, quantity, selectedPlan, contractPrice]);

  const handleBuyNow = useCallback(() => {
    const active = selectedPayment;
    if (!plan || !active || quantity == null || !selectedPlan) {
      alert(
        "Please select a payment option, plan term, and quantity to continue.",
      );
      return;
    }

    try {
      setIsBuyingNow(true);
      const pricePerUnit = Number(active.amountValue);
      const totalAmount = pricePerUnit * quantity;

      const checkoutItem = {
        planDesc: plan.planDesc,
        mode: selectedPlan,
        planTerm: plan.planTerm.toString(),
        quantity,
        price: pricePerUnit,
        total: totalAmount,
        contractPrice,
      };

      sessionStorage.setItem("CheckoutCart", JSON.stringify(checkoutItem));
      router.push(`/order-summary/`);
    } finally {
      setIsBuyingNow(false);
    }
  }, [selectedPayment, plan, quantity, selectedPlan, contractPrice, router]);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Life Plans", href: "/plans" },
    { label: plan?.planDesc ?? "Product Details", href: "#" },
  ];
  // ===== ORIGINAL SHELL (replaced by the Page component below) =====
  // return (
  //   <Box bgGradient="linear(to-b, #f7faf8 0%, white 24%)" minH="100vh">
  //     <Container>
  //       ...page body...
  //     </Container>
  //   </Box>
  // );

  return (
    <Page.Root
      title={plan?.planDesc ?? "Product Details"}
      subtitle="Life Plans"
    >
      <Page.MainContent>
        <Page.Row>
          {!hasPlans ? (
            <VStack align="stretch" gap={{ base: 6, md: 8 }}>
              <Skeleton height={{ base: "38px", md: "24px" }} w="220px" />
              <Grid templateColumns={{ base: "1fr", lg: "1.4fr 1fr" }} gap={8}>
                <Skeleton rounded="2xl" h={{ base: "360px", md: "520px" }} />
                <VStack align="stretch" gap={4}>
                  <SkeletonText noOfLines={3} gap="4" />
                  <Skeleton h="130px" rounded="xl" />
                  <Skeleton h="260px" rounded="xl" />
                </VStack>
              </Grid>
              <Flex align="center" justify="center" py={8} gap={3}>
                <Spinner size="md" color="#21bc27" />
                <Text color="gray.600">Loading product details...</Text>
              </Flex>
            </VStack>
          ) : (
            <>
              {/* Original mobile Back button + desktop Breadcrumb — the Page
                component now provides its own BackButton and title header.
            <Box display={{ base: "block", md: "none" }} mb={{ base: 4, md: 0 }}>
              <Button variant="ghost" size="md" onClick={() => router.back()} px={0}>
                <FaArrowLeft color="#177D54" />
                Back
              </Button>
            </Box>
            <Box display={{ base: "none", md: "block" }} mb={{ base: 0, md: 4 }}>
              <Breadcrumb items={breadcrumbItems} />
            </Box>
            */}

              <Grid
                templateColumns={{ base: "1fr", lg: "1.45fr 1fr" }}
                gap={{ base: 6, lg: 10 }}
              >
                <GridItem>
                  <Box
                    rounded="2xl"
                    borderWidth="1px"
                    borderColor="gray.200"
                    p={{ base: 3, md: 4 }}
                    bg="white"
                    shadow="sm"
                  >
                    <ProductCarousel setApi={setCarouselApi} className="w-full">
                      <CarouselContent>
                        {carouselImages.map((src, index) => (
                          <CarouselItem key={index}>
                            <Box
                              role="group"
                              position="relative"
                              w="full"
                              h={{ base: "220px", md: "520px" }}
                              bgGradient="linear(to-br, gray.50, white)"
                              rounded="2xl"
                              overflow="hidden"
                              // borderWidth="1px"
                              // borderColor="gray.100"
                              touchAction="pinch-zoom"
                            >
                              <Image
                                alt={`${plan?.planDesc} view ${index + 1}`}
                                src={src}
                                position="absolute"
                                inset={0}
                                w="100%"
                                h="100%"
                                objectFit="contain"
                                objectPosition="center"
                                transition="transform 0.35s ease"
                                _groupHover={{
                                  transform: {
                                    md: "scale(1.08)",
                                    base: "none",
                                  },
                                }}
                              />
                            </Box>
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <CarouselPrevious className="left-4 bg-white/95 hover:bg-white border border-gray-200 shadow-lg" />
                      <CarouselNext className="right-4 bg-white/95 hover:bg-white border border-gray-200 shadow-lg" />
                    </ProductCarousel>

                    <HStack
                      mt={{ base: 2, md: 4 }}
                      gap={2}
                      overflowX="auto"
                      pb={1}
                    >
                      {carouselImages.map((src, index) => {
                        const isActive = index === currentSlide;
                        return (
                          <Box
                            key={`${src}-${index}`}
                            as="button"
                            onClick={() => carouselApi?.scrollTo(index)}
                            aria-label={`View image ${index + 1}`}
                            borderWidth="2px"
                            borderColor={isActive ? "green.500" : "gray.200"}
                            rounded="md"
                            overflow="hidden"
                            minW={{ base: "56px", md: "72px" }}
                            h={{ base: "56px", md: "72px" }}
                            bg="white"
                            transition="all .2s ease"
                            _hover={{
                              borderColor: "green.400",
                              transform: "translateY(-1px)",
                            }}
                          >
                            <Image
                              src={src}
                              alt={`Thumbnail ${index + 1}`}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                            />
                          </Box>
                        );
                      })}
                    </HStack>
                  </Box>

                  {/* Desktop: show Plan Features under the product images */}
                  <Box display={{ base: "none", lg: "block" }} mt={8}>
                    <VStack align="start" gap={4} mb={8}>
                      <H3>Plan Features</H3>
                      <Body color="gray.600">
                        The following features are available for this plan:
                      </Body>
                    </VStack>

                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
                      gap={6}
                    >
                      {planFeatureCards.map((card) => (
                        <Box
                          key={card.title}
                          bg="white"
                          borderRadius="2xl"
                          borderWidth="1px"
                          borderColor="gray.200"
                          boxShadow="sm"
                          p={{ base: 4, md: 5 }}
                          transition="all 0.2s ease"
                          _hover={{
                            shadow: "md",
                            transform: "translateY(-2px)",
                          }}
                          h="100%"
                        >
                          <VStack align="stretch" gap={4} h="100%">
                            <Image
                              src={card.icon}
                              alt={`${card.title} image`}
                              w="100%"
                              h="180px"
                              objectFit="cover"
                              rounded="xl"
                            />
                            <Separator />
                            <H4>{card.title}</H4>
                            <Body color="gray.700">{card.desc}</Body>
                          </VStack>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </GridItem>

                <GridItem>
                  <VStack
                    align="stretch"
                    gap={{ base: 3, md: 5 }}
                    position={{ base: "static", lg: "sticky" }}
                    top={{ lg: "110px" }}
                  >
                    <Box
                      order={{ base: 1, md: 1 }}
                      rounded="2xl"
                      borderWidth="1px"
                      borderColor="gray.200"
                      bg="white"
                      p={{ base: 3, md: 5 }}
                      shadow="sm"
                    >
                      <VStack align="stretch" gap={{ base: 3, md: 4 }}>
                        <BaseText
                          fontSize={{ base: "xl", md: "3xl" }}
                          fontWeight="700"
                        >
                          {plan?.planDesc}
                        </BaseText>
                        <Body
                          color="gray.700"
                          fontSize={{ base: "sm", md: "md" }}
                          lineClamp={{ base: 2, md: "unset" }}
                        >
                          {plan?.casketDesc}
                        </Body>

                        <HStack
                          align="end"
                          justify="space-between"
                          wrap="wrap"
                          gap={3}
                        >
                          <VStack align="start" gap={0}>
                            <Text
                              fontSize="xs"
                              color="gray.500"
                              textTransform="uppercase"
                            >
                              Contract Price
                            </Text>
                            <Text
                              fontSize={{ base: "2xl", md: "3xl" }}
                              fontWeight="700"
                              color="green.700"
                            >
                              ₱{contractPrice.toLocaleString("en-PH")}
                            </Text>
                            {/* {discountValue > 0 ? (
                            <Text
                              fontSize="sm"
                              color="green.700"
                              fontWeight="semibold"
                            >
                              Save ₱{discountValue.toLocaleString("en-PH")}
                            </Text>
                          ) : null} */}
                          </VStack>
                          {/* 
                        {discountValue > 0 ? (
                          <Badge
                            colorPalette="green"
                            variant="solid"
                            rounded="full"
                            px={3}
                            py={1}
                          >
                            Discount Applied
                          </Badge>
                        ) : null} */}
                        </HStack>

                        <HStack gap={2} wrap="wrap">
                          <Badge
                            rounded="full"
                            variant="subtle"
                            colorPalette="green"
                            px={3}
                            py={1}
                          >
                            <HStack gap={1}>
                              <FiRepeat />
                              <Text>Transferable</Text>
                            </HStack>
                          </Badge>
                          {/* <Badge
                          rounded="full"
                          variant="subtle"
                          colorPalette="green"
                          px={3}
                          py={1}
                        >
                          <HStack gap={1}>
                            <FiShield />
                            <Text>Insurance Included</Text>
                          </HStack>
                        </Badge> */}
                          <Badge
                            rounded="full"
                            variant="subtle"
                            colorPalette="green"
                            px={3}
                            py={1}
                          >
                            <HStack gap={1}>
                              <FiCalendar />
                              <Text>Flexible Payment Terms</Text>
                            </HStack>
                          </Badge>
                        </HStack>
                      </VStack>
                    </Box>

                    <Box
                      order={{ base: 2, md: 2 }}
                      rounded="2xl"
                      borderWidth="1px"
                      borderColor="gray.200"
                      bg="white"
                      p={{ base: 3, md: 5 }}
                      shadow="sm"
                    >
                      <VStack align="stretch" gap={{ base: 3, md: 4 }}>
                        <H4>Choose Your Payment Plan</H4>
                        <Grid
                          templateColumns={{
                            base: "repeat(2, minmax(0, 1fr))",
                            md: "1fr 1fr",
                            lg: "1fr",
                          }}
                          gap={3}
                        >
                          <Select.Root collection={termCollection} w="full">
                            <Select.HiddenSelect required />
                            <Select.Label fontWeight="medium">
                              Plan Term
                            </Select.Label>
                            <Select.Control>
                              <Select.Trigger
                                rounded="lg"
                                borderWidth="1px"
                                borderColor="gray.300"
                                minH={{ base: "40px", md: "44px" }}
                              >
                                <Select.ValueText placeholder="Select term" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {termCollection.items.map(
                                    (item: SelectOptionItem) => (
                                      <Select.Item
                                        item={item}
                                        key={item.value}
                                        onClick={() =>
                                          setSelectedTerm(Number(item.value))
                                        }
                                      >
                                        {item.label}
                                        <Select.ItemIndicator />
                                      </Select.Item>
                                    ),
                                  )}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>

                          <Select.Root collection={quantityCollection} w="full">
                            <Select.HiddenSelect required />
                            <Select.Label fontWeight="medium">
                              Quantity
                            </Select.Label>
                            <Select.Control>
                              <Select.Trigger
                                rounded="lg"
                                borderWidth="1px"
                                borderColor="gray.300"
                                minH={{ base: "40px", md: "44px" }}
                              >
                                <Select.ValueText placeholder="Select quantity" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {quantityCollection.items.map(
                                    (item: SelectOptionItem) => (
                                      <Select.Item
                                        item={item}
                                        key={item.value}
                                        onClick={() =>
                                          setQuantity(Number(item.value))
                                        }
                                      >
                                        {item.label}
                                        <Select.ItemIndicator />
                                      </Select.Item>
                                    ),
                                  )}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        </Grid>

                        <Grid
                          templateColumns={{
                            base: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(2,1fr)",
                            lg: "repeat(2,1fr)",
                          }}
                          gap={{ base: 2, md: 3 }}
                        >
                          {paymentOptions.map((opt) => {
                            const isSelected = selected === opt.mode;
                            const key = `${opt.mode ?? "mode"}-${opt.term ?? "term"}`;
                            return (
                              <GridItem key={key} colSpan={1}>
                                <Box
                                  as="button"
                                  onClick={() => {
                                    setSelected(opt.mode ?? null);
                                    setSelectedPlan(opt.mode ?? null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      setSelected(opt.mode ?? null);
                                      setSelectedPlan(opt.mode ?? null);
                                    }
                                  }}
                                  w="full"
                                  minH={{ base: "92px", md: "auto" }}
                                  textAlign="left"
                                  borderRadius="xl"
                                  p={{ base: 2.5, md: 4 }}
                                  borderWidth="1px"
                                  borderColor={
                                    isSelected ? "green.500" : "gray.200"
                                  }
                                  bg={isSelected ? "green.50" : "white"}
                                  color="gray.900"
                                  transition="all 0.2s ease"
                                  _hover={{
                                    borderColor: isSelected
                                      ? "green.500"
                                      : "green.300",
                                    transform: "translateY(-1px)",
                                    shadow: "md",
                                  }}
                                  _active={{ transform: "translateY(0)" }}
                                  aria-pressed={isSelected}
                                  aria-label={`${opt.label} payment option`}
                                >
                                  <VStack
                                    align="stretch"
                                    gap={{ base: 1, md: 2 }}
                                  >
                                    <HStack
                                      justify="space-between"
                                      align="center"
                                    >
                                      <Text
                                        fontWeight="semibold"
                                        fontSize={{ base: "12px", md: "md" }}
                                        lineHeight="1.2"
                                      >
                                        {opt.label}
                                      </Text>
                                      {isSelected ? (
                                        <Badge
                                          colorPalette="green"
                                          variant="solid"
                                          rounded="full"
                                          px={{ base: 1.5, md: 2 }}
                                          py={{ base: 0.5, md: 2 }}
                                          color="white"
                                          fontSize={{ base: "10px", md: "xs" }}
                                          fontWeight={"semibold"}
                                        >
                                          Selected
                                        </Badge>
                                      ) : null}
                                    </HStack>
                                    <Text
                                      fontSize={{ base: "16px", md: "2xl" }}
                                      fontWeight="bold"
                                      color="green.700"
                                      lineHeight="1.2"
                                    >
                                      {opt.amount}
                                    </Text>
                                    <Text
                                      fontSize={{ base: "11px", md: "sm" }}
                                      color="gray.600"
                                      lineHeight="1.25"
                                    >
                                      Term: {opt.term}{" "}
                                      {opt.term === 1 ? "year" : "years"}
                                    </Text>
                                    {/* <Text
                                    fontSize={{ base: "11px", md: "sm" }}
                                    color="gray.600"
                                    lineHeight="1.25"
                                    lineClamp={1}
                                  >
                                    {opt.cadence}
                                  </Text> */}
                                  </VStack>
                                </Box>
                              </GridItem>
                            );
                          })}
                        </Grid>

                        <Box
                          rounded="xl"
                          bg="gray.50"
                          p={4}
                          display={{ base: "none", md: "block" }}
                          borderWidth="1px"
                          borderColor="gray.200"
                        >
                          <HStack justify="space-between" align="center">
                            <Text fontSize="sm" color="gray.600">
                              Total
                            </Text>
                            <Text
                              fontWeight="bold"
                              fontSize="xl"
                              color="green.700"
                            >
                              {selectedTotal != null
                                ? `₱${selectedTotal.toLocaleString("en-PH", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}`
                                : "-"}
                            </Text>
                          </HStack>
                        </Box>

                        <Stack
                          direction={{ base: "row" }}
                          display={{ base: "none", md: "flex" }}
                          justifyContent="space-between"
                        >
                          <AddToCartButton
                            loading={isAddingToCart}
                            onClick={handleAddToCart}
                            disabled={!selectedPlan || isBuyingNow}
                          />
                          <BuyNowButton
                            disabled={!selectedPlan || isAddingToCart}
                            loading={isBuyingNow}
                            onClick={handleBuyNow}
                          />
                        </Stack>
                      </VStack>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>

              <Box
                as="section"
                id="productBenefits"
                display={{ base: "none", md: "block" }}
                mt={{ base: 8, md: 14 }}
              >
                <VStack align="start" gap={4} mb={8} p={{ base: 2, md: 0 }}>
                  <H3>Plan Benefits</H3>
                  <Body color="gray.600">
                    If you avail of this plan, you or your beneficiaries will be
                    entitled to:
                  </Body>
                </VStack>

                <VStack gap={6} align="stretch">
                  {[
                    {
                      title: "Memorial Service",
                      desc: `A memorial service from our accredited mortuary for a chapel viewing of four (4) days or for viewing outside of our accredited mortuary, at your or your beneficiary's expense, for nine (9) days. The memorial service may only be availed 30 days after the date of effectivity of the plan.`,
                      icon: "/images/plan-benefits/memorial-service.jpg",
                    },
                    {
                      title: "Casket Provision",
                      desc: "A provision for a casket depending on the purchased plan.",
                      icon: "/images/plan-benefits/casket-provision.jpg",
                    },
                    {
                      title: "Insurance Coverages",
                      icon: "/images/plan-benefits/insurance.jpg",
                      subtitle:
                        "You can buy the plan if you’re healthy and between 18 and 60 years old (before your 60th birthday).",
                      details: [
                        {
                          title: "Cash Assistance",
                          desc: "Your beneficiaries shall receive an amount equivalent to the Gross Contract Price if you die within 10 years from the date of effectivity of the plan and you have not reached the age of 65 upon death.",
                        },
                        {
                          title: "Payment of Unpaid Balance",
                          desc: "The unpaid balance of your plan will be considered fully paid if you die while paying for this plan and you have not reached the age of 65 upon death.",
                        },
                        {
                          title: "Waiver of Installment",
                          desc: "You will be exempted from paying the balance of your plan if you suffer from an uninterrupted disability of at least six (6) months during the paying period and you have not reached the age of 60 at the start of your disability.",
                        },
                      ],
                    },
                    {
                      title: "Accidental Death & Dismemberment",
                      icon: "/images/plan-benefits/accidental-death.jpg",
                      desc: "Coverage applies if you are in good health and between the insurable ages of 18 to 55 years at time of purchase. You or your beneficiaries shall be entitled to cash, based on a schedule, if you die or become dismembered due to an accident during the paying period and you have not reached the age of 60 upon death/accident.",
                    },
                    {
                      title: "Alternative Cash / Memorial Option",
                      icon: "/images/plan-benefits/cash.jpg",
                      desc: "Cash according to a schedule will be provided if the memorial service is not performed. One of your heirs, successors or assigns will be entitled to a memorial service only if they opt to retain the plan.",
                    },
                    {
                      title: "Surrender Benefit",
                      icon: "/images/plan-benefits/surrender.jpg",
                      desc: "Cash if you surrender your plan while in-force. You will no longer be entitled to any benefit upon surrender of your plan.",
                    },
                  ].map((card) => (
                    <Box
                      key={card.title}
                      bg="white"
                      borderRadius="2xl"
                      borderWidth="1px"
                      borderColor="gray.200"
                      boxShadow="sm"
                      p={{ base: 4, md: 6 }}
                      transition="all 0.2s ease"
                      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                    >
                      <Grid
                        templateColumns={{ base: "1fr", md: "240px 1fr" }}
                        gap={6}
                        alignItems="stretch"
                      >
                        <Box>
                          <Image
                            src={card.icon}
                            alt={`${card.title} image`}
                            w="100%"
                            h="160px"
                            objectFit="cover"
                            rounded="xl"
                          />
                        </Box>

                        <VStack align="stretch" gap={3}>
                          <H4>{card.title}</H4>
                          {card.subtitle ? (
                            <Small color="gray.700">{card.subtitle}</Small>
                          ) : null}
                          {card.desc ? (
                            <Body color="gray.700">{card.desc}</Body>
                          ) : null}

                          {card.details ? (
                            <Grid
                              templateColumns={{
                                base: "1fr",
                                lg: "repeat(3,1fr)",
                              }}
                              gap={3}
                              pt={1}
                            >
                              {card.details.map((d) => (
                                <Box
                                  key={d.title}
                                  rounded="lg"
                                  p={3}
                                  borderWidth="1px"
                                  borderColor="gray.200"
                                >
                                  <Text fontWeight="semibold" mb={1}>
                                    {d.title}
                                  </Text>
                                  <Text fontSize="sm" color="gray.600">
                                    {d.desc}
                                  </Text>
                                </Box>
                              ))}
                            </Grid>
                          ) : null}
                        </VStack>
                      </Grid>
                    </Box>
                  ))}
                </VStack>
              </Box>

              <Box display={{ base: "block", md: "none" }} mt={8}>
                <VStack align="stretch" gap={4}>
                  <Box px={2}>
                    <H3>Plan Details</H3>
                    <Body color="gray.600">
                      Expand a section to review benefits and features.
                    </Body>
                  </Box>

                  <VStack align="stretch" gap={4}>
                    <DetailAccordion
                      title="Plan Benefits"
                      items={planBenefitCards.map((item) => ({
                        title: item.title,
                        description: item.desc,
                        subtitle: item.subtitle,
                        image: {
                          src: item.icon,
                          alt: `${item.title} image`,
                        },
                        details: item.details?.map((detail) => ({
                          title: detail.title,
                          description: detail.desc,
                        })),
                      }))}
                    />
                    <DetailAccordion
                      title="Plan Features"
                      items={planFeatureCards.map((item) => ({
                        title: item.title,
                        description: item.desc,
                        image: {
                          src: item.icon,
                          alt: `${item.title} image`,
                        },
                      }))}
                    />
                  </VStack>
                </VStack>
              </Box>

              <Box
                as="section"
                id="productFeatures"
                display={{ base: "none", md: "block", lg: "none" }}
                mt={{ base: 10, md: 14 }}
              >
                <VStack align="start" gap={2} mb={6}>
                  <H3>Plan Features</H3>
                  <Body color="gray.600">
                    The following features are available for this plan:
                  </Body>
                </VStack>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  gap={6}
                >
                  {[
                    {
                      title: "Transferability",
                      desc: "You may transfer your plan to another living person.",
                      icon: "/images/plan-features/transfer.jpg",
                    },
                    {
                      title: "Assignability",
                      desc: "You may assign the plan to any deceased person, however, any insurance coverage provided to the transferor shall automatically terminate, provided that the balance, if any, is paid before the service is rendered.",
                      icon: "/images/plan-features/assignability.jpg",
                    },
                    {
                      title: "Free Look Period",
                      desc: "You may cancel the plan within 15 days from the date of effectivity of the plan and you will receive a refund of your payment in full.",
                      icon: "/images/plan-features/free-look.jpg",
                    },
                  ].map((card) => (
                    <Box
                      key={card.title}
                      bg="white"
                      borderRadius="2xl"
                      // borderWidth="1px"
                      // borderColor="gray.200"
                      boxShadow="sm"
                      p={{ base: 4, md: 5 }}
                      transition="all 0.2s ease"
                      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                      h="100%"
                    >
                      <VStack align="stretch" gap={4} h="100%">
                        <Image
                          src={card.icon}
                          alt={`${card.title} image`}
                          w="100%"
                          h="180px"
                          objectFit="cover"
                          rounded="xl"
                        />
                        <Separator />
                        <H4>{card.title}</H4>
                        <Body color="gray.700">{card.desc}</Body>
                      </VStack>
                    </Box>
                  ))}
                </Grid>
              </Box>

              <Box
                display={{
                  base:
                    selectedPlan && selectedTerm && quantity ? "block" : "none",
                  lg: "none",
                }}
                position="fixed"
                bottom={0}
                left={0}
                right={0}
                zIndex={20}
                borderTopWidth="1px"
                borderColor="gray.200"
                bg="whiteAlpha.960"
                backdropFilter="blur(8px)"
                px={4}
                py={3}
                pb="calc(env(safe-area-inset-bottom) + 40px)"
                shadow="0 -8px 24px rgba(0,0,0,0.08)"
              >
                <VStack align="stretch" gap={2} mb={20}>
                  <Text fontSize="lg" color="gray.700" fontWeight="bold" mb={4}>
                    {selectedTotal != null
                      ? `Total: ₱${selectedTotal.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "Select a payment plan to continue"}
                  </Text>
                  <HStack gap={2}>
                    <AddToCartButton
                      loading={isAddingToCart}
                      onClick={handleAddToCart}
                      disabled={
                        !selectedPlan ||
                        !selectedTerm ||
                        !quantity ||
                        isBuyingNow
                      }
                    />
                    <BuyNowButton
                      disabled={
                        !selectedPlan ||
                        !selectedTerm ||
                        !quantity ||
                        isAddingToCart
                      }
                      loading={isBuyingNow}
                      onClick={handleBuyNow}
                    />
                  </HStack>
                </VStack>
              </Box>
            </>
          )}
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default ProductView;
