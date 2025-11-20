"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { IPlans } from "@/types/product";
import Error from "@/components/ui/error";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  HStack,
  Tabs,
  Heading,
} from "@chakra-ui/react";
import Section from "@/components/ui/section";
import ComparisonBanner from "@/components/ui/comparison-banner";

const Products = () => {
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
      alertRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const traditionalGroups = useMemo(() => {
    const lp = plans.filter((plan) => plan.productCode === "LP");
    const map = new Map<string, any>();
    lp.forEach((p) => {
      const key = p.planDesc;
      if (!map.has(key)) {
        map.set(key, {
          planDesc: p.planDesc,
          casketDesc: p.casketDesc,
          img: `/images/plan-images/${p.planDesc}.jpg`,
          terms: [
            {
              mode: p.mode,
              planTerm: p.planTerm,
              price: new Intl.NumberFormat("en-PH", {
                currency: "PHP",
                maximumFractionDigits: 0,
              }).format(Number(p.ipInstAmt)),
            },
          ],
          contractPrice: new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            maximumFractionDigits: 0,
          }).format(Number(p.contractPrice)),
        });
      } else {
        const entry = map.get(key);
        const exists = entry.terms.some(
          (t: any) =>
            t.planTerm === p.planTerm &&
            t.price === p.ipInstAmt &&
            t.mode === p.mode
        );
        if (!exists)
          entry.terms.push({
            planTerm: p.planTerm,
            price: p.ipInstAmt,
            mode: p.mode,
          });
      }
    });

    return Array.from(map.values());
  }, [plans]);

  const cremationGroups = useMemo(() => {
    const cp = plans.filter((plan) => plan.productCode === "CP");
    const map = new Map<string, any>();
    cp.forEach((p) => {
      const key = p.planDesc;
      if (!map.has(key)) {
        map.set(key, {
          planDesc: p.planDesc,
          casketDesc: p.casketDesc,
          img: `/images/plan-images/${p.planDesc}.jpg`,
          terms: [{ planTerm: p.planTerm, price: p.ipInstAmt, mode: p.mode }],
          contractPrice: new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
            maximumFractionDigits: 0,
          }).format(Number(p.contractPrice)),
        });
      } else {
        const entry = map.get(key);
        const exists = entry.terms.some(
          (t: any) =>
            t.planTerm === p.planTerm &&
            t.price === p.ipInstAmt &&
            t.mode === p.mode
        );
        if (!exists)
          entry.terms.push({
            planTerm: p.planTerm,
            price: p.ipInstAmt,
            mode: p.mode,
          });
      }
    });

    return Array.from(map.values());
  }, [plans]);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) =>
      prev.includes(planDesc)
        ? prev.filter((desc) => desc !== planDesc)
        : [...prev, planDesc]
    );
  };
  return (
    <Flex justify="center" align="center" w="screen" mb={8}>
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
        w={{ base: "full", md: "80%" }}
        position="relative"
      >
        <Tabs.Root defaultValue="traditional" variant="enclosed" color="green">
          <Box mt="32">
            <Box
              backgroundColor="gray.50"
              w="100vw"
              p="8"
              mb="8"
              height="auto"
              ml="calc(50% - 50vw)"
            >
              <Grid
                templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(1fr)" }}
                gap={4}
                mx="auto"
                w="75%"
                h="100%"
                position="relative"
              >
                <GridItem
                  rowStart={{ base: 2, md: 1 }}
                  colSpan={{ base: 2, md: 1 }}
                >
                  <Box textAlign={{ base: "center", md: "left" }}>
                    <Heading
                      fontWeight="semibold"
                      textTransform="uppercase"
                      size="2xl"
                      color="green.700"
                    >
                      Our Life Plans
                    </Heading>
                    <Text color="gray.800" mt={1}>
                      Secure your family's future with peace of mind
                    </Text>
                  </Box>
                </GridItem>

                <GridItem rowStart={1} textAlign="end" colSpan={2}>
                  <Tabs.List gap={3}>
                    <Tabs.Trigger
                      value="traditional"
                      px={4}
                      py={2}
                      borderRadius="full"
                      color="gray.600"
                      _selected={{
                        color: "white",
                        bg: "green.600",
                      }}
                    >
                      Traditional
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="cremation"
                      px={4}
                      py={2}
                      borderRadius="full"
                      color="gray.600"
                      _selected={{
                        color: "white",
                        bg: "green.600",
                      }}
                    >
                      Cremation
                    </Tabs.Trigger>
                  </Tabs.List>
                </GridItem>
              </Grid>
            </Box>
          </Box>

          <Tabs.Content value="traditional">
            {plans.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <HStack key={idx} mt={8}>
                    <Box
                      mb={8}
                      w="500px"
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
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    key={index}
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

          <Tabs.Content value="cremation">
            {plans.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <HStack key={idx} mt={8}>
                    <Box
                      mb={8}
                      w="500px"
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
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    key={index}
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
