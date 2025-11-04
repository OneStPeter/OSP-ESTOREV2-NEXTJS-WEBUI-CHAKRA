import React from "react";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { PrimaryMdButton } from "st-peter-ui";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  planTerm?: number;
  address?: string;
  variant: "plan" | "memorial";
}
const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
  address,
  planTerm,
  variant,
}) => {
  const router = useRouter();

  return (
    <>
      <Card.Root
        cursor="pointer"
        border="none"
        maxW="sm"
        overflow="hidden"
        position="relative"
        height={{ base: "72", sm: "80", md: "96" }}
        flexShrink={0}
        width={{ base: "90vw", sm: "sm", md: "md", lg: "lg" }}
        transition="all 0.3s"
        _hover={{ transform: "scale(1.05)", shadow: "xl" }}
      >
        <Image
          src={image}
          alt={title}
          position="absolute"
          inset="0"
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center 40%"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        />

        <Card.Body
          position="relative"
          zIndex={10}
          color="white"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          gap="2"
        >
          <Card.Title
            fontSize={{ base: "base", sm: "lg", md: "xl" }}
            lineClamp={1}
          >
            {title}
          </Card.Title>
          {description ? (
            <Card.Description
              color="white"
              fontSize={{ base: "xs", sm: "sm", md: "base" }}
              lineClamp={2}
            >
              {description}
            </Card.Description>
          ) : null}

          {variant === "plan" && Number.isFinite(price as number) ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Text fontSize={{ base: "xs", sm: "sm" }}>Installments:</Text>
              <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="semibold">
                ₱
                {(price as number).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                / month
              </Text>
            </div>
          ) : variant === "memorial" && address ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="semibold">
                {address}
              </Text>
            </div>
          ) : null}
        </Card.Body>

        <Card.Footer
          position="relative"
          zIndex={10}
          gap={{ base: "2", sm: "4" }}
          display="flex"
          justifyContent={variant === "plan" ? "space-between" : "end"}
        >
          {variant === "plan" ? (
            <>
              <PrimaryMdButton>
                <div className="flex justify-center items-center md:gap-2 ">
                  <IoMdAdd />
                  <span className="text-xs sm:text-sm">Compare</span>
                </div>
              </PrimaryMdButton>
              <PrimaryMdButton
                cursor="pointer"
                onClick={() => router.push(`/plan-details/${title}`)}
              >
                Buy Now
              </PrimaryMdButton>
            </>
          ) : (
            <PrimaryMdButton>Reserve Now</PrimaryMdButton>
          )}
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default ProductCard;
