"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { IPlans } from "@/types/product";
import Error from "@/components/ui/error";
import { Box, Flex, Grid, GridItem, HStack, Tabs } from "@chakra-ui/react";
import Section from "@/components/ui/section";
import ComparisonBanner from "@/components/ui/comparison-banner";
import { Body, H2 } from "st-peter-ui";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";

const formatCurrency = (value: number | string) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const groupPlansByProduct = (plans: IPlans[], productCode: string) => {
  const filtered = plans.filter((p) => p.productCode === productCode);
  const map = new Map<string, any>();

  filtered.forEach((p) => {
    const key = p.planDesc;

    if (!map.has(key)) {
      map.set(key, {
        planDesc: p.planDesc,
        casketDesc: p.casketDesc,
        img: `/images/plan-images/${p.planDesc}.jpg`,
        terms: [] as { mode: string; planTerm: number; price: string }[],
        contractPrice: formatCurrency(p.contractPrice),
      });
    }

    const entry = map.get(key);

    const exists = entry.terms.some(
      (t: any) => t.planTerm === p.planTerm && t.mode === p.mode
    );

    if (!exists) {
      entry.terms.push({
        mode: p.mode,
        planTerm: p.planTerm,
        price: formatCurrency(p.ipInstAmt),
      });
    }
  });

  return Array.from(map.values());
};

const Products = () => {
  const router = useRouter();

  const [plans, setPlans] = useState<IPlans[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/get-plans-sections");
        const data = await res.json();
        setPlans(data.result);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (showAlert) {
      alertRef.current?.scrollIntoView({ behavior: "smooth" });
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const traditionalGroups = useMemo(
    () => groupPlansByProduct(plans, "LP"),
    [plans]
  );

  const cremationGroups = useMemo(
    () => groupPlansByProduct(plans, "CP"),
    [plans]
  );

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((desc) => desc !== planDesc)
        : [...prev, planDesc]
    );
  };
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Plans",
      href: "/plans",
    },
  ];

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="stretch"
      w="full"
      mb={8}
      px={{ base: 0, md: 0 }}
    >
      {showAlert && (
        <Box
          ref={alertRef}
          position="fixed"
          top={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          w={{ base: "90%", md: "50%" }}
        >
          <Error title="Please select at least 2 plans to compare" />
        </Box>
      )}

      <Box
        p={{ base: 4, md: 8 }}
        gap={4}
        w={{ base: "full", md: "full" }}
        position="relative"
      >
        <Tabs.Root defaultValue="traditional" variant="enclosed">
          <Box mt={{ base: 12, md: 16 }}>
            <Box
              // backgroundColor="gray.50"
              w="100vw"
              px={{ base: 4, md: 8 }}
              py={{ base: 6, md: 8 }}
              mb={{ base: 6, md: 8 }}
              height="auto"
              ml="calc(50% - 50vw)"
            >
              <Box maxW="7xl" mx="auto">
                <Breadcrumb items={breadcrumbItems} />

                <Grid
                  templateColumns={{ base: "1fr", md: "1fr auto" }}
                  gap={4}
                  alignItems="center"
                >
                  <GridItem>
                    <Box textAlign={{ base: "center", md: "left" }}>
                      <H2>Our Life Plans</H2>
                      <Body>
                        Secure your family's future with peace of mind
                      </Body>
                    </Box>
                  </GridItem>
                  <GridItem justifySelf={{ base: "center", md: "end" }}>
                    <Tabs.List
                      gap={3}
                      display="flex"
                      flexWrap="wrap"
                      justifyContent={{ base: "center", md: "flex-end" }}
                    >
                      <Tabs.Trigger
                        value="traditional"
                        px={{ base: 3, md: 4 }}
                        py={{ base: 2 }}
                        fontWeight="semibold"
                        borderRadius="full"
                        color="gray.600"
                        fontSize={{ base: "sm", md: "md" }}
                        _selected={{ color: "white", bg: "green.600" }}
                      >
                        Traditional
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="cremation"
                        px={{ base: 3, md: 4 }}
                        py={{ base: 2 }}
                        fontWeight="semibold"
                        borderRadius="full"
                        color="gray.600"
                        fontSize={{ base: "sm", md: "md" }}
                        _selected={{ color: "white", bg: "green.600" }}
                      >
                        Cremation
                      </Tabs.Trigger>
                    </Tabs.List>
                  </GridItem>
                </Grid>
              </Box>
            </Box>
          </Box>

          {/* Traditional Tab */}
          <Tabs.Content value="traditional">
            {plans.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <HStack key={idx} mt={8} w="full" justify="center">
                    <Box
                      mb={8}
                      w={{ base: "100%", sm: "90%", md: "500px" }}
                      h="12rem"
                      bg="gray.200"
                      borderRadius="lg"
                      flexShrink={0}
                      animation="pulse 1.5s infinite"
                    />
                  </HStack>
                ))
              : traditionalGroups.map((g, index) => (
                  <Section
                    key={index}
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    image={g.img}
                    planDesc={g.planDesc}
                    description={g.casketDesc}
                    contractPrice={g.contractPrice}
                    planTerm={g.terms?.[0]?.planTerm ?? 0}
                    terms={g.terms}
                    reverse={index % 2 === 1}
                  />
                ))}
          </Tabs.Content>

          {/* Cremation Tab */}
          <Tabs.Content value="cremation">
            {plans.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <HStack key={idx} mt={8} w="full" justify="center">
                    <Box
                      mb={8}
                      w={{ base: "100%", sm: "90%", md: "500px" }}
                      h="12rem"
                      bg="gray.200"
                      borderRadius="lg"
                      flexShrink={0}
                      animation="pulse 1.5s infinite"
                    />
                  </HStack>
                ))
              : cremationGroups.map((g, index) => (
                  <Section
                    key={index}
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    image={g.img}
                    planDesc={g.planDesc}
                    description={g.casketDesc}
                    contractPrice={g.contractPrice}
                    planTerm={g.terms?.[0]?.planTerm ?? 0}
                    terms={g.terms}
                    reverse={index % 2 === 1}
                  />
                ))}
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      <ComparisonBanner
        compareList={compareList}
        setCompareList={setCompareList}
        setShowAlert={setShowAlert}
      />
    </Flex>
  );
};

export default Products;
