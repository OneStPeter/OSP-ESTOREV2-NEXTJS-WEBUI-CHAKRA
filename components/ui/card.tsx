import React from "react";
import { Button, Card, Text, Image } from "@chakra-ui/react";
import NextImage from "next/image";
import { IoMdAdd } from "react-icons/io";
import { PrimaryMdButton } from "st-peter-ui";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";

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
}) => {
  const router = useRouter();
  const isInCompare = compareList.includes(title || "");

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
        {image ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <NextImage
              src={image}
              alt={title || "plan image"}
              fill
              sizes="(max-width: 768px) 90vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              priority={!!priority}
              unoptimized
            />
            {/* <Image
              src={image}
              alt={title || "plan image"}
              sizes="(max-width: 768px) 90vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
            /> */}
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
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
            color="white"
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

          {variant === "plan" &&
          (Array.isArray(terms)
            ? terms.length > 0
            : Number.isFinite(ipInstAmt as number)) ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                marginTop: "0.5rem",
              }}
            >
              <Text fontSize={{ base: "xs", sm: "sm" }}>Installments:</Text>
              {Array.isArray(terms) && terms.length > 0 ? (
                terms.map((t, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text fontSize={{ base: "xs", sm: "sm" }}>
                      ₱
                      {(t.price as number).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      / month
                    </Text>
                    <Text
                      fontSize={{ base: "xs", sm: "sm" }}
                      fontWeight="semibold"
                    >
                      ({t.planTerm} years)
                    </Text>
                  </div>
                ))
              ) : (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Text
                    fontSize={{ base: "xs", sm: "sm" }}
                    fontWeight="semibold"
                  >
                    ₱
                    {(ipInstAmt as number).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    / month
                  </Text>
                  <Text
                    fontSize={{ base: "xs", sm: "sm" }}
                    fontWeight="semibold"
                  >
                    ({planTerm} years)
                  </Text>
                </div>
              )}
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
              {isInCompare ? (
                <PrimaryMdButton onClick={() => toggleCompare?.(title || "")}>
                  <FaCheck />
                  <span>ADDED TO COMPARE</span>
                </PrimaryMdButton>
              ) : (
                <PrimaryMdButton
                  onClick={() => toggleCompare?.(title || "")}
                  disabled={compareList.length >= 3}
                >
                  <IoMdAdd />
                  <span>COMPARE PLAN</span>
                </PrimaryMdButton>
              )}
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
