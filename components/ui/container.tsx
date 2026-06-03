import React from "react";
import { Box } from "st-peter-ui";
interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return (
    <Box
      px={{ base: 8, md: 0 }}
      mt={{ base: 16, md: 40 }}
      mb={{ base: 32, md: 16 }}
      maxW={"7xl"}
      mx={"auto"}
    >
      {children}
    </Box>
  );
};

export default Container;
