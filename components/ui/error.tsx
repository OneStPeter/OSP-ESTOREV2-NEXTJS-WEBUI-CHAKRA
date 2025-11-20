import { Alert } from "@chakra-ui/react";
import React from "react";

const Error = ({ title }: { title: string }) => {
  return (
    <div>
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>{title}</Alert.Title>
      </Alert.Root>
    </div>
  );
};

export default Error;
