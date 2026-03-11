"use client";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Image,
  Icon,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  Heading,
  Flex,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { PrimaryMdButton, DeleteButton } from "st-peter-ui";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
}

interface CartItem {
  planDesc?: string;
  image?: string;
  mode?: string;
  quantity: number;
  price: number;
  total: number;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [removeIdx, setRemoveIdx] = useState<number | null>(null);

  // Responsive values
  const maxWidth = useBreakpointValue({ base: "100%", md: "md" });
  const imageSize = useBreakpointValue({ base: "100px", md: "128px" });
  const padding = useBreakpointValue({ base: 4, md: 6 });
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (open) {
      const stored = sessionStorage.getItem("Cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    }
  }, [open]);

  const handleRemove = (idx: number) => {
    setRemoveIdx(idx);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (removeIdx !== null) {
      setCartItems((items) => {
        const updated = items.filter((_, idx) => idx !== removeIdx);
        sessionStorage.setItem("Cart", JSON.stringify(updated));
        return updated;
      });
      setShowModal(false);
      setRemoveIdx(null);
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
    setRemoveIdx(null);
  };

  const updateQuantity = (idx: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) => {
      const updated = [...items];
      updated[idx].quantity = newQuantity;
      updated[idx].total = updated[idx].price * newQuantity;
      sessionStorage.setItem("Cart", JSON.stringify(updated));
      return updated;
    });
  };

  const router = useRouter();
  const grandTotal = cartItems.reduce((s, item) => s + Number(item.total), 0);

  return (
    <Box
      display={open ? "flex" : "none"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.400"
      justifyContent={{ base: "center", md: "end" }}
      zIndex={50}
      opacity={open ? 1 : 0}
      pointerEvents={open ? "auto" : "none"}
      transition="opacity 0.3s"
      onClick={onClose}
      // p={{ base: 4, md: 0 }}
    >
      <Box
        w={maxWidth}
        maxH={{ base: "90vh", md: "100vh" }}
        bg="white"
        shadow="lg"
        roundedLeft={{ base: "lg", md: "lg" }}
        roundedRight={{ base: "lg", md: 0 }}
        p={padding}
        position="relative"
        transform={
          open
            ? "translateX(0)"
            : isMobile
              ? "translateY(100%)"
              : "translateX(100%)"
        }
        transition="transform 0.3s"
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
        overflowY="auto"
      >
        <DialogRoot
          open={showModal}
          onOpenChange={(details) => setShowModal(details.open)}
        >
          <DialogContent>
            <DialogHeader>Remove item from cart?</DialogHeader>
            <DialogBody>
              Are you sure you want to remove this item from your cart?
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={cancelRemove}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button colorScheme="red" onClick={confirmRemove}>
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>

        {/* Close button */}
        <Icon
          as={IoClose}
          position="absolute"
          top={padding}
          right={padding}
          boxSize={6}
          color="gray.500"
          _hover={{ color: "black" }}
          onClick={onClose}
          cursor="pointer"
        />

        <Heading textAlign="center" mb={isMobile ? 4 : 6}>
          Shopping Cart
        </Heading>

        {/* Cart Items */}
        <Flex direction="column" flex={1} gap={4} mb={6}>
          {cartItems.length === 0 ? (
            <Box py={8} textAlign="center" color="gray.500">
              Your cart is empty.
            </Box>
          ) : (
            cartItems.map((item, idx) => (
              <Box
                key={idx}
                borderBottom="1px"
                borderColor="gray.200"
                pb={4}
                _last={{ borderBottom: "none" }}
              >
                <Stack direction={{ base: "row" }} gap={4} align="start">
                  <Image
                    src={`/images/plan-images/${item.planDesc}.jpg`}
                    alt={item.planDesc}
                    boxSize={imageSize}
                    objectFit="cover"
                    rounded="md"
                    flexShrink={0}
                  />

                  <VStack flex={1} alignItems="start" gap={2} w="full">
                    <Text
                      fontWeight="semibold"
                      fontSize={{ base: "sm", md: "base" }}
                    >
                      {item.planDesc}
                    </Text>
                    <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                      Mode:{" "}
                      {item.mode == "C"
                        ? "Cash"
                        : item.mode == "M"
                          ? "Monthly"
                          : item.mode == "Q"
                            ? "Quarterly"
                            : item.mode == "S"
                              ? "Semi-Annual"
                              : item.mode == "A"
                                ? "Annual"
                                : ""}
                    </Text>

                    {/* Quantity Controls */}
                    <HStack
                      gap={2}
                      wrap="wrap"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Text color="gray.500">Qty:</Text>
                      <Button
                        size={{ base: "xs", md: "sm" }}
                        variant="ghost"
                        p={1}
                        minW="unset"
                        onClick={() => updateQuantity(idx, item.quantity - 1)}
                        _hover={{ bg: "gray.100" }}
                      >
                        <FaCircleMinus size={16} />
                      </Button>
                      <Text
                        fontWeight="semibold"
                        minW="32px"
                        textAlign="center"
                      >
                        {item.quantity}
                      </Text>
                      <Button
                        size={{ base: "xs", md: "sm" }}
                        variant="ghost"
                        p={1}
                        minW="unset"
                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                        _hover={{ bg: "gray.100" }}
                      >
                        <MdOutlineAddCircle />
                      </Button>
                    </HStack>

                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      Price: ₱{" "}
                      {item.price
                        .toLocaleString("en-PH", { minimumFractionDigits: 2 })
                        .replace(/\.00$/, "")}
                    </Text>

                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      fontWeight="semibold"
                    >
                      Subtotal: ₱{" "}
                      {item.total
                        .toLocaleString("en-PH", { minimumFractionDigits: 2 })
                        .replace(/\.00$/, "")}
                    </Text>
                  </VStack>

                  <Icon
                    as={IoCloseCircle}
                    boxSize={{ base: 5, md: 6 }}
                    onClick={() => handleRemove(idx)}
                    color="red.500"
                    cursor="pointer"
                    _hover={{ color: "red.700" }}
                    flexShrink={0}
                  />
                </Stack>
              </Box>
            ))
          )}
        </Flex>

        {/* Summary and Button */}
        <VStack gap={4} mt="auto" w="full">
          <HStack
            justifyContent="space-between"
            w="full"
            pt={4}
            borderTopWidth={2}
            borderColor="gray.200"
          >
            <Text fontSize={{ base: "base", md: "lg" }} fontWeight="semibold">
              Total:
            </Text>
            <Text
              fontSize={{ base: "base", md: "lg" }}
              fontWeight="bold"
              color="#109448"
            >
              ₱{" "}
              {grandTotal
                .toLocaleString("en-PH", { minimumFractionDigits: 2 })
                .replace(/\.00$/, "")}
            </Text>
          </HStack>
          <PrimaryMdButton
            w="full"
            disabled={cartItems.length === 0}
            onClick={() =>
              router.push(
                `/order-summary/${cartItems[0]?.planDesc}/${cartItems[0]?.mode}`,
              )
            }
          >
            Proceed to Checkout
          </PrimaryMdButton>
        </VStack>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
