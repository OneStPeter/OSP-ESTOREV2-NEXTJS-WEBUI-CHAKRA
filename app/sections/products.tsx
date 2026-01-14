"use client";

import ProductCard from "@/components/ui/card";
import ComparisonBanner from "@/components/ui/comparison-banner";
import { IPlans } from "@/types/product";
import { Box, Flex } from "@chakra-ui/react";
import Error from "@/components/ui/error";
import { useEffect, useRef, useState } from "react";
import { Body, H2 } from "st-peter-ui";

const Products = () => {
  const [plans, setPlans] = useState<IPlans[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  const toggleCompare = (planDesc: string) => {
    setCompareList((prev) => {
      if (prev.includes(planDesc)) {
        return prev.filter((p) => p !== planDesc);
      }
      return [...prev, planDesc];
    });
  };
  useEffect(() => {
    if (showAlert) {
      alertRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/get-plans-card");
        const data = await res.json();
        setPlans(data.result);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);
  return (
    <section>
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
      <Box>
        <Box bg="gray.50" p="8">
          <Flex textAlign="center" flexDirection="column" gap={4}>
            <H2>Popular Plans</H2>
            <Body>
              Choose a plan that fits your needs. Flexible terms and affordable
              prices.
            </Body>
          </Flex>
          {/* Plan Cards */}
          <Flex
            mt="8"
            gap={{ base: 8, lg: 16 }}
            w="full"
            overflowX={{ base: "auto", lg: "visible" }}
            scrollBehavior="smooth"
            justifyContent={{ base: "start", lg: "center" }}
          >
            {(() => {
              const map = new Map<string, any>();
              plans.forEach((p) => {
                const key = p.planDesc;
                if (!map.has(key)) {
                  map.set(key, {
                    planDesc: p.planDesc,
                    casketDesc: p.casketDesc,
                    img: `/images/plan-images/${p.planDesc}.jpg`,
                    terms: [{ planTerm: p.planTerm, price: p.ipInstAmt }],
                  });
                } else {
                  const entry = map.get(key);
                  const exists = entry.terms.some(
                    (t: any) =>
                      t.planTerm === p.planTerm && t.price === p.ipInstAmt
                  );
                  if (!exists)
                    entry.terms.push({
                      planTerm: p.planTerm,
                      price: p.ipInstAmt,
                    });
                }
              });

              const grouped = Array.from(map.values()).slice(0, 3);

              return grouped.map((g, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 hover:-translate-y-2"
                >
                  <ProductCard
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    variant="plan"
                    image={g.img}
                    title={g.planDesc}
                    description={g.casketDesc}
                    terms={g.terms}
                    onCompare={() => toggleCompare(g.planDesc)}
                  />
                </div>
              ));
            })()}
          </Flex>
        </Box>

        {/* Memorial Park Cards */}
        <Box bg="gray.50" p="8" mt={8}>
          <Flex textAlign="center" flexDirection="column" gap={4}>
            <H2>Memorial Parks</H2>
            <Body>Beautiful locations for lasting memories.</Body>
          </Flex>

          <Flex
            mt="8"
            gap={{ base: 8, lg: 16 }}
            w="full"
            overflowX={{ base: "auto", lg: "visible" }}
            scrollBehavior="smooth"
            justifyContent={{ base: "start", lg: "center" }}
          >
            <ProductCard
              variant="memorial"
              title="Guiguinto, Bulacan"
              image="/images/memorial-park/memorial-park-1.jpg"
              address="Guiguinto Memorial Gardens - St. Peter Memorial Gardens, Ilang-Ilang, Guiguinto, Bulacan"
            />
            <ProductCard
              variant="memorial"
              title="Legaspi City, Albay"
              image="/images/memorial-park/memorial-park-2.jpg"
              address="Taysan Hills, Brgy. 56-Taysan, Legaspi City, 4500 Taysan Hills, Brgy. 56-Taysan, Legaspi City"
            />
          </Flex>
        </Box>
        <ComparisonBanner
          compareList={compareList}
          setCompareList={setCompareList}
          setShowAlert={setShowAlert}
        />
      </Box>
    </section>
  );
};

export default Products;
