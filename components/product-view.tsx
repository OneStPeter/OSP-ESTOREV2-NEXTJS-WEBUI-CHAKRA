"use client";

import { useState, useEffect, useMemo } from "react";
import { IPlans } from "@/types/product";
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
} from "@chakra-ui/react";
import {
  ProductCarousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/product-carousel";
import { PrimaryMdButton } from "st-peter-ui";

const ProductView = ({ plans }: { plans: IPlans[] }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

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
        const amountValue = isSpotCash
          ? Number(total)
          : p.ipInstAmt ?? p.contractPrice;

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

    // preserve current selection if it still exists for the selected term
    if (selected && paymentOptions.some((opt) => opt.mode === selected)) {
      return;
    }

    setSelected(paymentOptions[0].mode ?? null);
  }, [paymentOptions, selected]);

  return (
    <>
      {!hasPlans ? (
        <section className="h-screen flex items-center justify-center">
          <Text fontSize="xl" color="gray.500">
            No product data found.
          </Text>
        </section>
      ) : (
        <>
          {/* Product Header */}
          <section id="productHeader" className="h-screen">
            <VStack textAlign="center" mt="48">
              <Text fontSize="2xl">{plan?.planDesc}</Text>
              <Text>{plan?.casketDesc}</Text>
              <Text>
                Contract Price: ₱
                {Number(plan?.contractPrice).toLocaleString("en-PH")}
              </Text>

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
          </section>

          {/* Payment Section */}
          <section id="paymentDetails" className="bg-gray-50">
            <Box padding="8" textAlign="center">
              <Text fontSize="2xl">Choose your payment plan</Text>
              <Box
                mb={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Text fontSize="sm" opacity={0.7} mb={2} textAlign="center">
                  Plan term
                </Text>

                <Select.Root collection={termCollection} size="sm" w="200px">
                  <Select.HiddenSelect />
                  {/* <Select.Label>Plan term</Select.Label> */}
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
              </Box>

              <Grid
                p="8"
                w="xl"
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
                        onClick={() => setSelected(opt.mode ?? null)}
                        w="full"
                        textAlign="left"
                        borderRadius="xl"
                        p={6}
                        bg={isSelected ? "green.600" : "gray.50"}
                        color={isSelected ? "white" : "black"}
                        _hover={{ bg: isSelected ? "green.500" : "gray.100" }}
                        aria-pressed={isSelected}
                      >
                        <Text fontSize="sm" opacity={0.7} mb={1}>
                          {opt.label}
                        </Text>
                        <Text fontSize="lg" fontWeight="semibold">
                          {opt.amount}
                        </Text>
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
              <HStack justify="center" gap={8}>
                <PrimaryMdButton>BUY NOW</PrimaryMdButton>
                <PrimaryMdButton>ADD TO CART</PrimaryMdButton>
              </HStack>
            </Box>
          </section>

          {/* Product Benefits */}
          <section id="productBenefits">
            <Box padding="8" textAlign="center">
              <VStack mb={6} gap={4}>
                <Text fontSize="2xl">Plan Benefits</Text>
                <Text fontSize="sm" opacity={0.7}>
                  If you avail of this plan, you or your beneficiaries will be
                  entitled to:
                </Text>
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
                          w="220px"
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
                        <Text fontSize="lg" fontWeight="semibold">
                          {card.title}
                        </Text>

                        {card.subtitle && (
                          <Text
                            textAlign="start"
                            fontSize="sm"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            {card.subtitle}
                          </Text>
                        )}

                        {card.desc && (
                          <Text
                            textAlign="start"
                            fontSize="sm"
                            color="gray.600"
                            lineHeight="tall"
                          >
                            {card.desc}
                          </Text>
                        )}

                        {card.details && (
                          <HStack gap={8} align="stretch" pt={2}>
                            {card.details.map((d) => (
                              <Grid key={d.title} textAlign="start">
                                <Text
                                  fontSize="sm"
                                  fontWeight="semibold"
                                  mb={1}
                                >
                                  {d.title}
                                </Text>
                                <Text
                                  fontSize="sm"
                                  color="gray.600"
                                  lineHeight="tall"
                                >
                                  {d.desc}
                                </Text>
                              </Grid>
                            ))}
                          </HStack>
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
              <VStack mb={6} gap={4}>
                <Text fontSize="2xl">Plan Features</Text>
                <Text fontSize="sm" opacity={0.7}>
                  The following features are available for this plan:
                </Text>
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
                          maxW="xs"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Box>

                      <Box>
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          textAlign="start"
                        >
                          {card.title}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          mt={2}
                          textAlign="start"
                          lineHeight="tall"
                        >
                          {card.desc}
                        </Text>
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
