"use client";

import { ReactNode } from "react";
import {
  Accordion as ChakraAccordion,
  Box,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Body, Small } from "st-peter-ui";

export type DetailAccordionItem = {
  value?: string;
  title: string;
  description?: ReactNode;
  subtitle?: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  details?: {
    title: string;
    description: ReactNode;
  }[];
  content?: ReactNode;
};

type DetailAccordionProps = {
  title?: string;
  items: DetailAccordionItem[];
  defaultValue?: string[];
  multiple?: boolean;
  collapsible?: boolean;
};

export function DetailAccordion({
  title,
  items,
  defaultValue,
  multiple = true,
  collapsible = true,
}: DetailAccordionProps) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      boxShadow="sm"
      overflow="hidden"
    >
      {title ? (
        <Box px={4} py={3} borderBottomWidth="1px" borderColor="gray.100">
          <Text color="#0F8E49" fontSize="sm" fontWeight="700">
            {title}
          </Text>
        </Box>
      ) : null}

      <ChakraAccordion.Root
        collapsible={collapsible}
        defaultValue={defaultValue}
        multiple={multiple}
      >
        {items.map((item) => {
          const value = item.value ?? item.title;

          return (
            <ChakraAccordion.Item key={value} value={value}>
              <ChakraAccordion.ItemTrigger px={4} py={3}>
                <HStack justify="space-between" w="full" gap={3}>
                  <Text fontSize="14px" fontWeight="700" textAlign="left">
                    {item.title}
                  </Text>
                  <ChakraAccordion.ItemIndicator />
                </HStack>
              </ChakraAccordion.ItemTrigger>
              <ChakraAccordion.ItemContent>
                <ChakraAccordion.ItemBody px={4} pb={4}>
                  {item.content ?? (
                    <VStack align="stretch" gap={3}>
                      {item.image ? (
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          w="100%"
                          h="140px"
                          objectFit="cover"
                          rounded="xl"
                        />
                      ) : null}
                      {item.subtitle ? (
                        <Small color="gray.700">{item.subtitle}</Small>
                      ) : null}
                      {item.description ? (
                        <Body color="gray.700">{item.description}</Body>
                      ) : null}
                      {item.details ? (
                        <VStack align="stretch" gap={2}>
                          {item.details.map((detail) => (
                            <Box
                              key={detail.title}
                              rounded="lg"
                              p={3}
                              borderWidth="1px"
                              borderColor="gray.200"
                              bg="gray.50"
                            >
                              <Text fontWeight="700" fontSize="14px" mb={1}>
                                {detail.title}
                              </Text>
                              <Text fontSize="13px" color="gray.600">
                                {detail.description}
                              </Text>
                            </Box>
                          ))}
                        </VStack>
                      ) : null}
                    </VStack>
                  )}
                </ChakraAccordion.ItemBody>
              </ChakraAccordion.ItemContent>
            </ChakraAccordion.Item>
          );
        })}
      </ChakraAccordion.Root>
    </Box>
  );
}
