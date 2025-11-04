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
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ open, onClose }) => {
  // Mock cart state for demonstration
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "/images/plan-images/ST. ANNE.jpg",
      title: "ST .ANNE",
      mode: "Annually",
      qty: 1,
      price: 31500,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [removeIdx, setRemoveIdx] = useState<number | null>(null);

  if (!open) return null; // hide when not open

  const handleRemove = (idx: number) => {
    setRemoveIdx(idx);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (removeIdx !== null) {
      setCartItems((items) => items.filter((_, idx) => idx !== removeIdx));
      setShowModal(false);
      setRemoveIdx(null);
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
    setRemoveIdx(null);
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.400"
      display="flex"
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
                key={item.id}
                borderBottom={idx < cartItems.length - 1 ? "1px" : "none"}
                borderColor="gray.200"
              >
                <HStack gap={4} mt={8}>
                  <Image
                    src={item.image}
                    alt="Product"
                    boxSize="64px"
                    objectFit="cover"
                    rounded="md"
                  />
                  <Box ml={4} flex={1}>
                    <Text fontWeight="semibold">{item.title}</Text>
                    <Text color="gray.500" fontSize="sm">
                      Mode: {item.mode}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      Qty: {item.qty}
                    </Text>
                  </Box>
                  <Text fontWeight="bold" mr={2}>
                    ₱{" "}
                    {item.price
                      .toLocaleString("en-PH", { minimumFractionDigits: 2 })
                      .replace(/\.00$/, "")}
                  </Text>
                  <Button
                    color="white"
                    bg="red.500"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove
                  </Button>
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
            {cartItems
              .reduce((sum, item) => sum + item.price * item.qty, 0)
              .toLocaleString("en-PH", { minimumFractionDigits: 2 })
              .replace(/\.00$/, "")}
          </Text>
        </HStack>

        <Button
          bg="green.600"
          color="white"
          mt={8}
          w="full"
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>

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
      </Box>
    </Box>
  );
};

export default ShoppingCart;
