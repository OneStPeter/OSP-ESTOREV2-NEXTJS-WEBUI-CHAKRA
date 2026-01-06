"use client";

import { useState, useEffect, useMemo } from "react";
import { IPlans } from "@/types/product";
import { Breadcrumb } from "st-peter-ui";

import {
  Text,
  VStack,
  Image,
  Box,
  Grid,
  GridItem,
  Container,
  HStack,
  Select,
  Portal,
  createListCollection,
  Stack,
  Flex,
} from "@chakra-ui/react";
import {
  ProductCarousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/product-carousel";
import {
  Body,
  H3,
  H4,
  PrimaryMdButton,
  SecondaryMdButton,
  Small,
} from "st-peter-ui";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/utils/cart";

const ProductView = ({ plans }: { plans: IPlans[] }) => {
  const router = useRouter();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const hasPlans = plans && plans.length > 0;
  const plan = hasPlans ? plans[0] : null;
  const total = Number(plan?.contractPrice ?? 0) - Number(plan?.discount ?? 0);

  const carouselImages = plan
    ? [
        `/images/casket-images/${plan.planDesc}/${plan.planDesc}1.png`,
        `/images/casket-images/${plan.planDesc}/${plan.planDesc}2.png`,
      ]
    : [];

  useEffect(() => {
    if (!carouselApi) {
      setSlideCount(carouselImages.length);
      setCurrentSlide(0);
      return;
    }

    const update = () => {
      try {
        const snaps = carouselApi.scrollSnapList?.();
        const count = Array.isArray(snaps)
          ? snaps.length
          : carouselImages.length;
        setSlideCount(count);
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
      new Set(plans.map((p) => p.planTerm).filter((t) => t != null))
    ).sort((a, b) => Number(a) - Number(b));
  }, [plans]);

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
      })),
    });
  }, []);

  useEffect(() => {
    if (terms.length > 0 && selectedTerm == null) {
      setSelectedTerm(plan?.planTerm ?? terms[0]);
    }
  }, [terms, plan, selectedTerm]);

  const paymentOptions = useMemo(() => {
    if (!plans || selectedTerm == null) return [] as any[];

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
        : mode ?? "Plan";

    const formatAmount = (amt: any) =>
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
          amountValue = Number(total);
        } else {
          const paymentsPerYear =
            p.mode === "A"
              ? 1
              : p.mode === "S"
              ? 2
              : p.mode === "Q"
              ? 4
              : p.mode === "M"
              ? 12
              : 1;
          amountValue = Number(p.ipInstAmt);
        }

        return {
          mode: p.mode,
          term: p.planTerm,
          label: mapModeLabel(p.mode),
          amount: formatAmount(amountValue),
        };
      });
  }, [plans, selectedTerm]);

  useEffect(() => {
    if (paymentOptions.length === 0) {
      setSelected(null);
      return;
    }

    if (selected && paymentOptions.some((opt) => opt.mode === selected)) {
      return;
    }

    setSelected(null);
  }, [paymentOptions, selected]);

  const [quantity, setQuantity] = useState<number | null>(null);
  useEffect(() => {
    if (quantity == null) {
      setQuantity(1);
    }
  }, [quantity]);
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Plans",
      href: `/plans`,
    },
    {
      label: "Plan Details",
      href: `/plan-details/${plan?.planDesc}`,
    },
  ];

  return (
    <>
      {!hasPlans ? (
        <section className="h-screen flex items-center justify-center">
          <Body>No product data found.</Body>
        </section>
      ) : (
        <>
          {/* Product Header */}
          <Box id="productHeader" w="7xl" mx="auto" mt={{ base: 24, md: 32 }}>
            <Breadcrumb items={breadcrumbItems} />

            <VStack
              // w="7xl"
              mx="auto"
              // textAlign="center"
              // alignItems="center"
              gap={{ base: 8, md: 4 }}
              justifyContent="center"
              minH="100vh"
            >
              <H3>{plan?.planDesc}</H3>
              <Body>{plan?.casketDesc}</Body>
              <H4>
                Contract Price: ₱
                {Number(plan?.contractPrice).toLocaleString("en-PH")}
              </H4>

              {/* Carousel */}
              <Container maxW="5xl" mx="auto" px={6} mb={24}>
                <ProductCarousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {carouselImages.map((src, index) => (
                      <CarouselItem key={index}>
                        <Box
                          position="relative"
                          pb="56.25%"
                          borderRadius="2xl"
                          overflow="hidden"
                          bg="gray.100"
                        >
                          <Image
                            alt={`${plan?.planDesc} ${index + 1}`}
                            src={src}
                            position="absolute"
                            top={0}
                            left={0}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                          />
                        </Box>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
                  <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
                </ProductCarousel>

                {/* Carousel Indicators */}
                <Box display="flex" justifyContent="center" gap={2} mt={6}>
                  {Array.from({ length: slideCount }).map((_, index) => (
                    <Box
                      as="button"
                      key={index}
                      onClick={() => carouselApi?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      width={index === currentSlide ? "2rem" : "0.375rem"}
                      height="0.375rem"
                      borderRadius="full"
                      bg={index === currentSlide ? "#21bc27" : "gray.300"}
                      transition="all 0.2s"
                      _hover={
                        index === currentSlide ? undefined : { bg: "gray.400" }
                      }
                    />
                  ))}
                </Box>
              </Container>
            </VStack>
          </Box>

          {/* Payment Section */}
          <section id="paymentDetails" className="bg-gray-50">
            <Box padding="8" textAlign="center">
              <Box mb={4}>
                <H3>Choose your payment plan</H3>
              </Box>
              <Box
                mb={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Select.Root collection={termCollection} w="200px" mb={8}>
                  <Select.HiddenSelect required />
                  <Select.Label>Plan term</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select term" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {termCollection.items.map((item: any) => (
                          <Select.Item
                            item={item}
                            key={item.value}
                            onClick={() => setSelectedTerm(Number(item.value))}
                          >
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>

                <Select.Root collection={quantityCollection} w="200px">
                  <Select.HiddenSelect required />
                  <Select.Label>Quantity</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Quantity" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {quantityCollection.items.map((item: any) => (
                          <Select.Item
                            item={item}
                            key={item.value}
                            onClick={() => {
                              setQuantity(Number(item.value));
                            }}
                          >
                            {item.value}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Box>

              <Grid
                p="8"
                w={{ base: "full", md: "3xl" }}
                margin="0 auto"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={6}
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
                        m={{ base: "auto", md: "0" }}
                        w={{ base: "xs", md: "full" }}
                        textAlign="left"
                        borderRadius="xl"
                        p={6}
                        bg={isSelected ? "green.600" : "gray.50"}
                        color={isSelected ? "white" : "black"}
                        _hover={{
                          bg: isSelected ? "green.500" : "gray.100",
                        }}
                        aria-pressed={isSelected}
                      >
                        <Small color={isSelected ? "white" : "black"}>
                          {opt.label}
                        </Small>

                        <Body color={isSelected ? "white" : "black"}>
                          {opt.amount}
                        </Body>
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
              <HStack justify="center" gap={8}>
                <SecondaryMdButton
                  disabled={!selectedPlan}
                  onClick={() =>
                    addToCart(
                      plan!.planDesc,
                      selectedPlan!,
                      plan!.planTerm.toString(),
                      quantity!,
                      paymentOptions
                        .find((opt) => opt.mode === selectedPlan)!
                        .amount.replace(/[^0-9.-]+/g, ""),
                      total
                    )
                  }
                >
                  ADD TO CART
                </SecondaryMdButton>
                <PrimaryMdButton
                  disabled={!selectedPlan}
                  onClick={() =>
                    router.push(
                      `/order-summary/${plan?.planDesc}/${selectedPlan}`
                    )
                  }
                >
                  BUY NOW
                </PrimaryMdButton>
              </HStack>
            </Box>
          </section>

          {/* Product Benefits */}
          <section id="productBenefits">
            <Box padding="8" textAlign="center">
              <VStack mb={6} gap={4}>
                <H3>Plan Benefits</H3>
                <Body>
                  If you avail of this plan, you or your beneficiaries will be
                  entitled to:
                </Body>
              </VStack>

              <VStack gap={8} maxW="6xl" mx="auto" align="stretch">
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
                    borderRadius="xl"
                    boxShadow="sm"
                    p={{ base: 4, md: 6 }}
                  >
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        md: "220px 1fr",
                      }}
                      gap={6}
                      alignItems="start"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={{ base: "center", md: "flex-start" }}
                      >
                        <Box
                          w={{ base: "full", md: "220px" }}
                          h="140px"
                          overflow="hidden"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="md"
                        >
                          <Image
                            src={card.icon}
                            alt={`${card.title} icon`}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                          />
                        </Box>
                      </Box>

                      <VStack align="start" gap={4}>
                        <H4>{card.title}</H4>

                        {card.subtitle && <Small>{card.subtitle}</Small>}

                        {card.desc && (
                          <Box textAlign="start">
                            <Small>{card.desc}</Small>
                          </Box>
                        )}

                        {card.details && (
                          <Stack
                            direction={{ base: "column", md: "row" }}
                            gap={8}
                            align="stretch"
                            pt={2}
                          >
                            {card.details.map((d) => (
                              <Grid key={d.title} textAlign="start" gap={4}>
                                <Small>{d.title}</Small>
                                <Small>{d.desc}</Small>
                              </Grid>
                            ))}
                          </Stack>
                        )}
                      </VStack>
                    </Grid>
                  </Box>
                ))}
              </VStack>
            </Box>
          </section>

          {/* Product Features */}
          <section id="productFeatures" className="bg-gray-50">
            <Box padding="8" textAlign="center">
              <VStack mb={8} gap={4}>
                <H3>Plan Features</H3>
                <Body>The following features are available for this plan:</Body>
              </VStack>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={8}
                maxW="6xl"
                mx="auto"
                alignItems="start"
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
                    h="md"
                    bg="white"
                    borderRadius="xl"
                    boxShadow="sm"
                    p={{ base: 4, md: 6 }}
                  >
                    <VStack align="start" gap={4}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Image
                          src={card.icon}
                          alt={`${card.title} icon`}
                          w="400px"
                          h="180px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Box>

                      <Box>
                        <Flex textAlign="start" flexDirection="column" gap={4}>
                          <H4>{card.title}</H4>
                          <Body>{card.desc}</Body>
                        </Flex>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            </Box>
          </section>
        </>
      )}
    </>
  );
};

export default ProductView;
