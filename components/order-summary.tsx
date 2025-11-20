import React from "react";
import { IPlans } from "@/types/product";
import { Text, Grid, GridItem, Image, Flex, Box } from "@chakra-ui/react";

const OrderSummary = ({
  planDesc,
  mode,
  contractPrice,
  ipInstAmt,
}: {
  planDesc: string;
  mode: string;
  contractPrice: number;
  ipInstAmt: number;
}) => {
  console.log("Selected Plan:", planDesc);
  console.log("Selected Mode:", mode);
  return (
    <>
      <Text fontWeight="semibold" fontSize="2xl">
        Order Summary
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={8}
        mt={8}
      >
        <GridItem>
          <Image
            src={`/images/plan-images/${planDesc}.jpg`}
            alt={planDesc}
            w="full"
            h="48"
            objectFit="cover"
            borderRadius="lg"
          />
        </GridItem>
        <GridItem>
          <Flex flexDirection="column" w="full" gap={4} justify="center">
            <Flex justify="space-between" w="full">
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  {planDesc}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  {mode === "M"
                    ? "Monthly"
                    : mode === "Q"
                    ? "Quarterly"
                    : mode === "S"
                    ? "Semi-Annual"
                    : mode === "A"
                    ? "Annual"
                    : mode === "C"
                    ? "Cash"
                    : mode}
                </Text>
              </Box>
            </Flex>

            {mode === "C" ? (
              <Flex justify="space-between" w="full">
                <Text>Contract Price</Text>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  ₱
                  {contractPrice.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </Flex>
            ) : ["M", "Q", "S", "A"].includes(mode) ? (
              <Flex justify="space-between" w="full">
                <Text>Installment Amount</Text>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  ₱
                  {typeof ipInstAmt === "number"
                    ? ipInstAmt.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                </Text>
              </Flex>
            ) : null}
          </Flex>
        </GridItem>
      </Grid>

      <Box height="1px" backgroundColor="gray.200" mt={8} />

      <Flex justify="space-between" align="center" mt={8}>
        <Text fontSize="lg" fontWeight="semibold">
          Total Amount Payable
        </Text>
        <Text fontSize="lg" fontWeight="semibold">
          ₱
          {typeof ipInstAmt === "number"
            ? ipInstAmt.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}
        </Text>
      </Flex>
    </>
  );
};

export default OrderSummary;
