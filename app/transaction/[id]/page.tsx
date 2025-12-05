import { Box, Text } from "@chakra-ui/react";
import { TrackMyRequest } from "osp.cis.nextjs.components";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  console.log("Transaction ID:", resolvedParams.id);
  return (
    <Box mt="24" p="8" w="full" maxW="7xl" mx="auto">
      <TrackMyRequest requestId={resolvedParams.id} />
      {/* <Text>{resolvedParams.id} </Text> */}
    </Box>
  );
};

export default page;
