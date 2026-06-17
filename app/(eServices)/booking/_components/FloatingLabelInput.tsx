"use client";

import type { InputProps } from "@chakra-ui/react";
import {
  Box,
  Field,
  Input,
  defineStyle,
  useControllableState,
} from "@chakra-ui/react";
import { useState } from "react";

export interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
}

export const FloatingLabelInput = (props: FloatingLabelInputProps) => {
  const { label, onValueChange, value, defaultValue = "", ...rest } = props;

  const [inputState, setInputState] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value,
  });

  const [focused, setFocused] = useState(false);
  const shouldFloat = inputState.length > 0 || focused;

  return (
    <Box pos="relative" w="full">
      <Input
        {...rest}
        h="12"
        pt={shouldFloat ? "5" : "2"}
        pb="1"
        fontSize="sm"
        fontWeight="semibold"
        borderWidth="1.5px"
        borderRadius="lg"
        /* hide native placeholder — the label acts as one */
        _placeholder={{ color: "transparent" }}
        onFocus={(e) => {
          props.onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          setFocused(false);
        }}
        onChange={(e) => {
          props.onChange?.(e);
          setInputState(e.target.value);
        }}
        value={inputState}
        data-float={shouldFloat || undefined}
      />

      <Field.Label css={floatingStyles} data-float={shouldFloat || undefined}>
        {label}
      </Field.Label>
    </Box>
  );
};

const floatingStyles = defineStyle({
  /* placeholder state — vertically centred inside the input */
  pos: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  insetStart: "3",
  fontSize: "sm",
  fontWeight: "normal",
  color: "gray.400",
  bg: "bg",
  px: "0.5",
  pointerEvents: "none",
  transition:
    "top 0.15s ease, font-size 0.15s ease, color 0.15s ease, transform 0.15s ease",

  /* floated state — sits above the border, clearly a label */
  "&[data-float]": {
    top: "-2",
    transform: "translateY(0)",
    fontSize: "xs",
    fontWeight: "medium",
    color: "gray.400",
    insetStart: "2.5",
  },
});
