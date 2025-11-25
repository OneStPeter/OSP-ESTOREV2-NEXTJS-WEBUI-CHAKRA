"use client";

import { Box } from "@chakra-ui/react";
import { LoginPage } from "osp-chakra-reusable-components";
import React from "react";
import { LoginButton } from "st-peter-ui";

const page = () => {
  return (
    <Box p={8} mt={8}>
      <LoginPage
        onLogin={function (email: string, password: string): void {
          throw new Error("Function not implemented.");
        }}
        onSignUp={function (
          email: string,
          password: string,
          firstname: string,
          lastname: string,
          middlename: string,
          contactnumber: string
        ): void {
          throw new Error("Function not implemented.");
        }}
      ></LoginPage>
    </Box>
  );
};

export default page;
