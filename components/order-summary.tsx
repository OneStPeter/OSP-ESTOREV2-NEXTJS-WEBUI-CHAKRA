import React from "react";
import { IPlans } from "@/types/product";
import { Text, Grid, GridItem, Image, Flex, Box } from "@chakra-ui/react";
import { Body, H3, H4 } from "st-peter-ui";

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
  return (
    <>
      <H3>Order Summary</H3>
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
                <H4>{planDesc}</H4>
              </Box>
              <Box>
                <H4>
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
                </H4>
              </Box>
            </Flex>

            {mode === "C" ? (
              <Flex justify="space-between" w="full">
                <Body>Contract Price</Body>
                <Body>
                  ₱
                  {contractPrice.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Body>
              </Flex>
            ) : ["M", "Q", "S", "A"].includes(mode) ? (
              <Flex justify="space-between" w="full">
                <Body>Installment Amount</Body>
                <Body>
                  ₱
                  {typeof ipInstAmt === "number"
                    ? ipInstAmt.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}
                </Body>
              </Flex>
            ) : null}
          </Flex>
        </GridItem>
      </Grid>

      <Box height="1px" backgroundColor="gray.200" mt={8} />

      <Flex justify="space-between" align="center" mt={8}>
        <Body>Total Amount Payable</Body>
        <Body>
          ₱
          {typeof ipInstAmt === "number"
            ? ipInstAmt.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "0.00"}
        </Body>
      </Flex>
    </>
  );
};

export default OrderSummary;
