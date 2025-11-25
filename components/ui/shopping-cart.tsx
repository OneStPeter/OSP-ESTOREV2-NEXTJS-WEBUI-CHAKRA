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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { PrimaryMdButton, DeleteButton } from "st-peter-ui";

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
        sessionStorage.setItem("Cart", JSON.stringify(updated)); // sync to session
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
      justifyContent="end"
      zIndex={50}
      opacity={open ? 1 : 0}
      pointerEvents={open ? "auto" : "none"}
      transition="opacity 0.3s"
      onClick={onClose}
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        shadow="lg"
        roundedLeft="lg"
        p={6}
        position="relative"
        transform={open ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.3s"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confirmation Modal */}
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
          top={2}
          right={2}
          color="gray.500"
          _hover={{ color: "black" }}
          onClick={onClose}
          cursor="pointer"
        />

        <Heading textAlign="center">Shopping Cart</Heading>

        {/* Cart Items */}
        <Flex direction="column">
          {cartItems.length === 0 ? (
            <Box py={8} textAlign="center" color="gray.500">
              Your cart is empty.
            </Box>
          ) : (
            cartItems.map((item, idx) => (
              <Box
                key={idx}
                borderBottom={cartItems.length > 1 ? "1px" : "none"}
                borderColor="gray.200"
              >
                <HStack gap={4} mt={8}>
                  <Image
                    src={`/images/plan-images/${item.planDesc}.jpg`}
                    alt={item.planDesc}
                    boxSize="128px"
                    objectFit="cover"
                    rounded="md"
                  />
                  <VStack flex={1} ml={4} alignItems="start">
                    <Text fontWeight="semibold">{item.planDesc}</Text>
                    <Text color="gray.500" fontSize="sm">
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
                    <Text color="gray.500" fontSize="sm">
                      Quantity: {item.quantity}
                    </Text>
                    <Text fontSize="sm" color="gray.500" mr={2}>
                      Price: ₱{" "}
                      {item.price
                        .toLocaleString("en-PH", { minimumFractionDigits: 2 })
                        .replace(/\.00$/, "")}
                    </Text>
                  </VStack>

                  <DeleteButton
                    colorPalette="red"
                    onClick={() => handleRemove(idx)}
                  />
                </HStack>
              </Box>
            ))
          )}
        </Flex>

        {/* Cart Summary */}
        <HStack justifyContent="space-between" mt={8}>
          <Text fontSize="lg" fontWeight="semibold">
            Total:
          </Text>
          <Text>
            ₱{" "}
            {grandTotal
              .toLocaleString("en-PH", { minimumFractionDigits: 2 })
              .replace(/\.00$/, "")}
          </Text>
        </HStack>
        <PrimaryMdButton
          mt={8}
          w="full"
          disabled={cartItems.length === 0}
          onClick={() =>
            router.push(
              `/order-summary/${cartItems[0]?.planDesc}/${cartItems[0]?.mode}`
            )
          }
        >
          Checkout
        </PrimaryMdButton>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
