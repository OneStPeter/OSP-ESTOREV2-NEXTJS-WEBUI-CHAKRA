"use client";

import {
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
  Image,
  Separator,
  Span,
  Badge,
  Heading,
} from "@chakra-ui/react/";
import { useRouter } from "next/navigation";
import { IPlans } from "@/types/product";
import { Breadcrumb, PrimaryMdButton } from "st-peter-ui";
import { MdCheck, MdClose } from "react-icons/md";
import { parseCasketDescription } from "@/lib/utils/plan";
import { useMemo } from "react";
import { BreadcrumbTracker } from "./ui/breadcrumb-tracker";
import { usePathname } from "next/navigation";

interface ComparisonProps {
  compareList: string[];
  plans: IPlans[];
  removeItem: (itemToRemove: string) => void;
}

const Comparison = ({ compareList, plans, removeItem }: ComparisonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const descByPlanDesc = useMemo(() => {
    const map = new Map<string, ReturnType<typeof parseCasketDescription>>();
    for (const p of plans) {
      map.set(p.planDesc, parseCasketDescription(p.casketDesc));
    }
    return map;
  }, [plans]);

  const selectedDescs = useMemo(
    () =>
      compareList.map((pd) => descByPlanDesc.get(pd)).filter(Boolean) as Array<
        Record<string, any>
      >,
    [compareList, descByPlanDesc]
  );

  const isMaterialDifferent = useMemo(
    () => new Set(selectedDescs.map((d) => d.material)).size > 1,
    [selectedDescs]
  );
  const isGlassDifferent = useMemo(
    () => new Set(selectedDescs.map((d) => d.glass)).size > 1,
    [selectedDescs]
  );
  const isLidCoverDifferent = useMemo(
    () => new Set(selectedDescs.map((d) => d.lidCover)).size > 1,
    [selectedDescs]
  );
  const isTopTypeDifferent = useMemo(
    () => new Set(selectedDescs.map((d) => d.topType)).size > 1,
    [selectedDescs]
  );
  const isUrnDifferent = useMemo(
    () => new Set(selectedDescs.map((d) => d.urn)).size > 1,
    [selectedDescs]
  );

  return (
    <Box mt={24} mb={16} w={{ base: "full", md: "7xl" }} mx="auto" p={8}>
      <Flex justify="center" align="start" flexDirection="column" gap={4}>
        {/* <BreadcrumbTracker /> */}
        <Breadcrumb
          pathname={pathname}
          items={[
            { label: "Home", href: "/" },
            { label: "Plans", href: "/plans" },
            { label: "Plan Comparison" },
          ]}
        />
        <Heading fontWeight="semibold" textTransform="uppercase">
          Plan Comparison
        </Heading>

        <Text>
          Compare our memorial plans and choose the one that best suits your
          needs
        </Text>
        <Box shadow="sm" borderRadius="md" p={8} w="full">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: `repeat(${compareList.length}, 1fr)`,
            }}
            gap={8}
          >
            {compareList.map((planDesc, index) => {
              const plan = plans.find((p) => p.planDesc === planDesc);
              const desc = descByPlanDesc.get(planDesc);

              return (
                <GridItem
                  key={planDesc}
                  textAlign="center"
                  px={8}
                  position="relative"
                  borderRight={{
                    base: "none",
                    md:
                      index < compareList.length - 1
                        ? "1px solid #E2E8F0"
                        : "none",
                  }}
                  borderBottom={{
                    base:
                      index < compareList.length - 1
                        ? "1px solid #E2E8F0"
                        : "none",
                    md: "none",
                  }}
                >
                  {compareList.length > 2 && (
                    <MdClose
                      onClick={() => removeItem(planDesc)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    />
                  )}
                  <Image
                    src={`/images/casket-images/${planDesc}/${planDesc}1.png`}
                    alt={planDesc}
                    width="100%"
                    height="auto"
                  />
                  <Text textAlign="start">{plan?.planTerm} years</Text>
                  <Text fontWeight="semibold" textAlign="start">
                    {planDesc}
                  </Text>

                  <Box w="full" textAlign="start">
                    <Badge
                      variant="solid"
                      colorPalette="green"
                      color="white"
                      mt={4}
                      mb={4}
                      size="lg"
                    >
                      ₱{plan?.contractPrice?.toLocaleString?.()}
                    </Badge>
                  </Box>
                  <Separator mb={4} />

                  {planDesc == "ST. JAMES" ? (
                    <Span fontWeight="bold" color="red.500">
                      Note: St. James plan does not include casket.
                    </Span>
                  ) : (
                    <>
                      {desc?.material && (
                        <Flex
                          justify="space-between"
                          mb={4}
                          fontWeight={
                            isMaterialDifferent ? "semibold" : "normal"
                          }
                        >
                          <Span>Material</Span>
                          <Span ml={2}>{desc.material}</Span>
                        </Flex>
                      )}
                      <Separator mb={4} />

                      {desc?.glass && (
                        <Flex
                          justify="space-between"
                          mb={4}
                          fontWeight={isGlassDifferent ? "semibold" : "normal"}
                        >
                          <Span>Glass</Span>
                          <Span ml={2}>{desc.glass}</Span>
                        </Flex>
                      )}
                      <Separator mb={4} />

                      {desc?.lidCover && (
                        <Flex
                          justify="space-between"
                          fontWeight={
                            isLidCoverDifferent ? "semibold" : "normal"
                          }
                          mb={4}
                        >
                          <Span>Lid Cover</Span>
                          <Span ml={2}>{desc.lidCover}</Span>
                        </Flex>
                      )}
                      <Separator mb={4} />

                      {desc?.topType && (
                        <Flex
                          justify="space-between"
                          fontWeight={
                            isTopTypeDifferent ? "semibold" : "normal"
                          }
                          mb={4}
                        >
                          <Span>Top Type</Span>
                          <Span ml={2}>{desc.topType}</Span>
                        </Flex>
                      )}
                      <Separator mb={4} />

                      {desc?.urn && (
                        <Flex
                          justify="space-between"
                          fontWeight={
                            isLidCoverDifferent ? "semibold" : "normal"
                          }
                          mb={4}
                        >
                          <Span>Includes</Span>
                          <Span ml={2}>{desc.urn}</Span>
                        </Flex>
                      )}
                    </>
                  )}
                  <PrimaryMdButton
                    mt={4}
                    mb={4}
                    w="100%"
                    onClick={() => router.push(`/plan-details/${planDesc}`)}
                  >
                    BUY NOW
                  </PrimaryMdButton>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
        <Box shadow="sm" borderRadius="md" p={8} w="full">
          <Heading fontWeight="semibold" textTransform="uppercase">
            Both plans include
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={4}
            mt={4}
          >
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2} whiteSpace="pre-line">
                  Chapel Viewing Benefit{"\n"} Up to 4 days viewing in an
                  accredited mortuary{"\n"} Up to 9 days viewing outside the
                  mortuary
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  30-Day Waiting Period before benefits can be used
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Casket Included (type depends on chosen plan)
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Cash Assistance Benefit for covered death within benefit
                  period
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Payment of Remaining Balance in case of covered death during
                  paying period
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Waiver of Installments for long-term disability (6 months or
                  more)
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Accidental Death & Dismemberment Benefit (age-eligible)
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>Cash Benefit if Service Is Not Used</Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Cash Surrender Value if the plan is surrendered while active
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>Transferability (to another living person)</Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>
                  Assignability (may be assigned to a deceased person)
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <MdCheck size="24px" />
                <Text ml={2}>15-Day Free Look Period with full refund</Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default Comparison;
