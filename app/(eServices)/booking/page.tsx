import React from "react";
import { Box, Flex } from "@chakra-ui/react/";
import { RopPage } from "osp-chakra-reusable-components";
import BookingForm from "./_components/BookingForm";
import Container from "@/components/ui/container";

const Booking = () => {
  return (
    <Box
    //
    >
      <BookingForm successLink="/success" />
    </Box>
  );
};

export default Booking;
