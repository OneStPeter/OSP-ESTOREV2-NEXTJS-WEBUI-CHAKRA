import React from "react";
import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";

interface ProductCardProps {
  image?: string;
  title?: string;
  description?: string;
  ipInstAmt?: number;
  planTerm?: number;
  terms?: { planTerm?: number; price?: number }[];
  address?: string;
  variant: "plan" | "memorial";
  priority?: boolean;
  onCompare?: () => void;
  compareList?: string[];
  toggleCompare?: (title: string) => void;
  accentBg?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  ipInstAmt,
  address,
  planTerm,
  terms,
  variant,
  priority,
  onCompare,
  compareList = [],
  toggleCompare,
  accentBg = "#F7EFE5",
}) => {
  const router = useRouter();
  const isInCompare = compareList.includes(title || "");

  const firstTerm = Array.isArray(terms) && terms.length > 0 ? terms[0] : null;

  const displayPrice = firstTerm?.price ?? ipInstAmt;
  const displayTerm = firstTerm?.planTerm ?? planTerm;

  const handleCompare = () => {
    if (onCompare) {
      onCompare();
      return;
    }

    toggleCompare?.(title || "");
  };

  return (
    <Box
      w="full"
      h="full"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      // boxShadow="0 10px 28px rgba(15, 23, 42, 0.08)"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 10px 20px rgba(15, 23, 42, 0.14)",
        borderColor: "green.600",
      }}
    >
      <Box
        position="relative"
        h={{ base: "170px", sm: "190px", md: "210px" }}
        // bg={accentBg}
        overflow="hidden"
      >
        {image ? (
          <NextImage
            src={image}
            alt={title || "product image"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority={!!priority}
            unoptimized
          />
        ) : null}

        {variant === "plan" && isInCompare ? (
          <Badge
            position="absolute"
            top={3}
            left={3}
            px={3}
            py={1}
            borderRadius="full"
            bg="green.600"
            color="white"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="wide"
          >
            SELECTED
          </Badge>
        ) : null}
      </Box>

      <Flex
        direction="column"
        align="center"
        textAlign="center"
        px={{ base: 4, md: 5 }}
        py={{ base: 4, md: 5 }}
        minH={{ base: "230px", md: "250px" }}
      >
        <Text
          as="h3"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="800"
          color="gray.900"
          lineHeight="1.2"
          lineClamp={2}
        >
          {title}
        </Text>

        {variant === "plan" ? (
          <>
            {description ? (
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                lineHeight="1.45"
                lineClamp={2}
              >
                {description}
              </Text>
            ) : null}

            {displayPrice ? (
              <Text
                mt={3}
                fontSize="sm"
                fontWeight="800"
                color="gray.900"
                lineHeight="1.2"
              >
                ₱
                {displayPrice.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                / month
              </Text>
            ) : null}

            {displayTerm ? (
              <Text mt={1} fontSize="xs" fontWeight="600" color="gray.500">
                {displayTerm} years
              </Text>
            ) : null}

            <Flex
              mt="auto"
              pt={5}
              w="full"
              gap={3}
              direction={{ base: "row", sm: "row", md: "column", lg: "row" }}
            >
              <SecondaryMdButton
                flex="1"
                h="42px"
                borderRadius="full"
                border="1px solid"
                borderColor="green.700"
                bg="white"
                color="green.800"
                fontSize="xs"
                fontWeight="800"
                letterSpacing="wide"
                disabled={!isInCompare && compareList.length >= 3}
                onClick={handleCompare}
                _hover={{
                  bg: "green.50",
                }}
              >
                {isInCompare ? <FaCheck /> : <IoMdAdd />}
                <span>{isInCompare ? "ADDED" : "COMPARE"}</span>
              </SecondaryMdButton>

              <PrimaryMdButton
                flex="1"
                h="42px"
                borderRadius="full"
                border="1px solid"
                borderColor="green.700"
                bg="white"
                color="green.800"
                fontSize="xs"
                fontWeight="800"
                letterSpacing="wide"
                onClick={() =>
                  router.push(`/plan-details/${encodeURIComponent(title)}`)
                }
                _hover={{
                  bg: "green.700",
                  color: "white",
                }}
              >
                BUY NOW
              </PrimaryMdButton>
            </Flex>
          </>
        ) : (
          <>
            {address ? (
              <Text
                mt={2}
                fontSize="sm"
                color="gray.600"
                lineHeight="1.5"
                lineClamp={3}
              >
                {address}
              </Text>
            ) : null}

            <SecondaryMdButton
              mt="auto"
              pt={5}
              w="full"
              h="42px"
              borderRadius="full"
              border="1px solid"
              borderColor="green.700"
              bg="white"
              color="green.800"
              fontSize="xs"
              fontWeight="800"
              letterSpacing="wide"
              _hover={{
                bg: "green.700",
                color: "white",
              }}
            >
              RESERVE NOW
            </SecondaryMdButton>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ProductCard;
