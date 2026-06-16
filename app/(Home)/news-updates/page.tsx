"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FeaturedNews } from "@/components/featured-news";
import { NewsCard } from "@/components/news-card";
import { PrimaryMdButton } from "st-peter-ui";
import { BookOpen, MapPin, ArrowRight } from "lucide-react";

const NewsUpdates = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("news");

  // Featured story — highlights the new online store experience
  const featuredNews = {
    image: "/images/memorial-park/memorial-park-1.jpg",
    title:
      "St. Peter Life Plan Launches Online Store: Compare and Buy Plans in Minutes",
    excerpt:
      "Securing your family's future is now easier than ever. Browse traditional and cremation life plans, compare terms side by side, and complete your application entirely online — no branch visit required.",
    date: "June 2026",
    readingTime: "4 min read",
    category: "Announcement",
  };

  // App-relevant news, guides, and product updates
  const newsItems = [
    {
      id: "1",
      image: "/images/plan-benefits/cash.jpg",
      title: "How a Life Plan Shields Your Family from Rising Funeral Costs",
      excerpt:
        "Funeral expenses keep climbing year after year. Locking in today's price with a life plan protects your loved ones from shouldering the burden later.",
      date: "1 week ago",
      readingTime: "4 min read",
      author: "By St. Peter Team",
      category: "Guide",
    },
    {
      id: "2",
      image: "/images/plan-images/ST. BERNADETTE.jpg",
      title: "New: Compare Traditional and Cremation Plans Side by Side",
      excerpt:
        "Our updated comparison tool lets you line up casket options, coverage, and payment terms across plans so you can decide with confidence.",
      date: "2 weeks ago",
      readingTime: "3 min read",
      author: "By St. Peter Team",
      category: "Product Update",
    },
    {
      id: "3",
      image: "/images/plan-images/ST. CLAIRE.jpg",
      title: "Traditional vs. Cremation: Choosing the Right Plan for You",
      excerpt:
        "Both honor your loved ones with dignity. We break down the differences in service, cost, and customs to help your family choose what fits best.",
      date: "3 weeks ago",
      readingTime: "6 min read",
      author: "By St. Peter Team",
      category: "Guide",
    },
    {
      id: "4",
      image: "/images/chapels/Guiguinto.jpg",
      title: "St. Peter Opens New Memorial Chapels in Luzon and Visayas",
      excerpt:
        "Expanding our nationwide network, the newest St. Peter chapels bring compassionate, professional memorial care closer to more families.",
      date: "1 month ago",
      readingTime: "3 min read",
      author: "By St. Peter Team",
      category: "Company News",
    },
    {
      id: "5",
      image: "/images/services/claim-benefits.jpg",
      title: "Flexible Monthly Payment Terms Now Available at Checkout",
      excerpt:
        "Choose the payment schedule that fits your budget — monthly, quarterly, or spot cash — and manage everything from your account dashboard.",
      date: "1 month ago",
      readingTime: "2 min read",
      author: "By St. Peter Team",
      category: "Product Update",
    },
    {
      id: "6",
      image: "/images/memorial-park/memorial-park-2.jpg",
      title: "Pre-Planning with Peace of Mind: A Family's Step-by-Step Guide",
      excerpt:
        "Pre-planning spares your family difficult decisions during grief. Here is how to start the conversation and put a plan in place today.",
      date: "2 months ago",
      readingTime: "5 min read",
      author: "By St. Peter Team",
      category: "Family Support",
    },
  ];

  // Sidebar: popular plan guides (desktop)
  const planGuides = [
    "Choosing between traditional and cremation",
    "What's covered in a St. Peter life plan",
    "Understanding payment terms and modes",
    "How to transfer or upgrade your plan",
  ];

  // Sidebar: find a chapel (desktop)
  const chapels = [
    { id: "1", name: "St. Peter Chapels — Quezon City", area: "Metro Manila" },
    { id: "2", name: "St. Peter Chapels — Cebu", area: "Visayas" },
    { id: "3", name: "St. Peter Chapels — Davao", area: "Mindanao" },
  ];

  const tabs = [
    { id: "news", label: "News" },
    { id: "guides", label: "Plan Guides" },
    { id: "events", label: "Events" },
    { id: "announcements", label: "Announcements" },
  ];

  return (
    <Box bg="white" minH="100vh">
      {/* ===== Header (responsive across all breakpoints) ===== */}
      {/* lg gets extra top padding to clear the fixed floating navbar pill. */}
      <Box
        bg="green.600"
        pt={{ base: "8", md: "10", lg: "140px" }}
        pb={{ base: "8", md: "10", lg: "12" }}
        color="white"
      >
        <Container maxW="container.xl">
          <VStack align="start" gap={{ base: "2", md: "3" }}>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="600"
              letterSpacing="0.5px"
              textTransform="uppercase"
              opacity="0.9"
            >
              News &amp; Updates
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="700"
              lineHeight="1.2"
            >
              Stay Informed on Life Plans &amp; Memorial Care
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              opacity="0.95"
              maxW={{ base: "100%", md: "640px" }}
            >
              The latest product updates, planning guides, and announcements
              from St. Peter Life Plan — helping you secure your family&apos;s
              future with peace of mind.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* ===== Main Content ===== */}
      <Container maxW="container.xl" py={{ base: "8", md: "10", lg: "12" }}>
        {/* Featured story */}
        <FeaturedNews {...featuredNews} />

        {/* Tabs */}
        <Box
          mb={{ base: "6", md: "8", lg: "10" }}
          borderBottom="2px solid"
          borderColor="gray.200"
        >
          <HStack
            gap={{ base: "2", md: "4", lg: "6" }}
            overflowX="auto"
            css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size={{ base: "md", md: "lg" }}
                  onClick={() => setActiveTab(tab.id)}
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  fontWeight="600"
                  color={isActive ? "green.700" : "gray.600"}
                  px={{ base: "3", md: "5", lg: "6" }}
                  py="3"
                  borderBottomWidth="3px"
                  borderBottomColor={isActive ? "green.600" : "transparent"}
                  borderRadius="0"
                  _hover={{ color: "green.600", borderBottomColor: "green.200" }}
                  whiteSpace="nowrap"
                >
                  {tab.label}
                </Button>
              );
            })}
          </HStack>
        </Box>

        {/* Content + sidebar:
            - mobile (base): single column
            - tablet (md): single column, 2-col news grid
            - desktop (lg): main column + 320px sidebar */}
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 320px" }}
          gap={{ base: "8", lg: "10" }}
          alignItems="start"
        >
          {/* Main column */}
          <GridItem minW={0}>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
              gap={{ base: "6", md: "6", lg: "8" }}
            >
              {newsItems.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </Grid>

            <HStack justify="center" pt={{ base: "8", md: "10" }}>
              <PrimaryMdButton
                fontSize={{ base: "md", md: "lg" }}
                px={{ base: "6", md: "8" }}
                py={{ base: "2", md: "3" }}
                _hover={{ bg: "green.50" }}
              >
                View More Updates
              </PrimaryMdButton>
            </HStack>
          </GridItem>

          {/* Sidebar — desktop only */}
          <GridItem display={{ base: "none", lg: "block" }}>
            <VStack align="stretch" gap="6" position="sticky" top="24px">
              {/* Popular guides */}
              <Box
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                p="5"
              >
                <HStack gap="2" mb="4">
                  <BookOpen size={18} color="#006838" />
                  <Text fontSize="md" fontWeight="700" color="gray.900">
                    Popular Plan Guides
                  </Text>
                </HStack>
                <VStack align="stretch" gap="3">
                  {planGuides.map((guide) => (
                    <HStack
                      key={guide}
                      as="button"
                      gap="2"
                      align="start"
                      textAlign="left"
                      color="gray.700"
                      _hover={{ color: "green.700" }}
                      onClick={() => router.push("/plans")}
                    >
                      <Box color="green.600" pt="1">
                        <ArrowRight size={14} />
                      </Box>
                      <Text fontSize="sm" lineHeight="1.4">
                        {guide}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Find a chapel */}
              <Box
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                p="5"
              >
                <HStack gap="2" mb="4">
                  <MapPin size={18} color="#006838" />
                  <Text fontSize="md" fontWeight="700" color="gray.900">
                    Find a St. Peter Chapel
                  </Text>
                </HStack>
                <VStack align="stretch" gap="3">
                  {chapels.map((chapel) => (
                    <Box
                      key={chapel.id}
                      borderBottomWidth="1px"
                      borderColor="gray.100"
                      pb="3"
                      _last={{ borderBottomWidth: "0", pb: "0" }}
                    >
                      <Text fontSize="sm" fontWeight="600" color="gray.900">
                        {chapel.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {chapel.area}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* CTA card */}
              <Box bg="green.600" borderRadius="xl" p="6" color="white">
                <Text fontSize="lg" fontWeight="700" lineHeight="1.3" mb="2">
                  Ready to secure your family&apos;s future?
                </Text>
                <Text fontSize="sm" opacity="0.95" mb="4">
                  Explore traditional and cremation life plans and apply online
                  in minutes.
                </Text>
                <Button
                  size="md"
                  bg="white"
                  color="green.700"
                  fontWeight="700"
                  w="full"
                  gap="2"
                  _hover={{ bg: "green.50" }}
                  onClick={() => router.push("/plans")}
                >
                  Browse Life Plans
                  <ArrowRight size={18} />
                </Button>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsUpdates;
