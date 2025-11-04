"use client";

import ProductCard from "@/components/ui/card";
import { IPlans } from "@/types/product";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [plans, setPlans] = useState<IPlans[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/get-plans");
        const data = await res.json();
        setPlans(data.result);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);
  return (
    <section className="bg-gray-50">
      <Box padding="8">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">
          Popular Plans
        </Text>
        <Text fontSize="md" textAlign="center">
          Choose a plan that fits your needs. Flexible terms and affordable
          prices.
        </Text>

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
                  variant="plan"
                  image={g.img}
                  title={g.planDesc}
                  description={g.casketDesc}
                  terms={g.terms}
                />
              </div>
            ));
          })()}
        </Flex>

        {/* Memorial Park Cards */}
        <Text fontSize="3xl" mt="8" fontWeight="bold" textAlign="center">
          Memorial Parks
        </Text>
        <Text fontSize="md" textAlign="center">
          Beautiful locations for lasting memories.
        </Text>
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
    </section>
  );
};

export default Products;
