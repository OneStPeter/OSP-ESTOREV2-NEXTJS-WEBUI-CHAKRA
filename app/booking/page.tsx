import React from "react";
import { BookingForm } from "osp.cis.nextjs.components";
import { Box } from "@chakra-ui/react/";

const page = () => {
  return <BookingForm homeLink="/" trackMyRequestLink="/transaction/" />;
};

export default page;
