import { useColorMode } from "@/components/ui/color-mode";
import { Box, Input, Text } from "@chakra-ui/react";

const FloatingInputField = ({
  id,
  label,
  error,
  type = "text",
  defaultValue = "",
  maxLength = 150,
  placeholder = "",
  disabled = false,
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
  defaultValue?: string;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const { colorMode } = useColorMode(); // Get color mode

  return (
    <Box position="relative" w="100%" mt={4}>
      {/* Label */}
      <Text
        as="label"
        position="absolute"
        top="-8px"
        left="12px"
        fontSize="xs"
        fontWeight="medium"
        color={
          disabled
            ? "gray.500"
            : colorMode === "dark"
              ? "green.300"
              : "green.500"
        } // Adjust label color for dark mode
        bg={colorMode === "dark" ? "gray.800" : "white"}
        px={1}
        zIndex={1}
        pointerEvents="none"
      >
        {label}
      </Text>

      {/* Input */}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        focusRingColor="green.500"
        borderWidth={1}
        borderColor={
          disabled
            ? "gray.500"
            : colorMode === "dark"
              ? "green.600"
              : "green.300"
        } // Border color adapts to dark mode
        bg={disabled ? "gray.700" : colorMode === "dark" ? "gray.900" : "white"}
        color={colorMode === "dark" ? "white" : "black"}
        _placeholder={{
          color: colorMode === "dark" ? "gray.400" : "gray.600",
        }}
        defaultValue={defaultValue}
        maxLength={maxLength}
        width="100%"
        readOnly={disabled}
      />

      {/* Error Message */}
      {error && (
        <Text color="red.400" mt={1} fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default FloatingInputField;
