"use client";
import React, { useState } from "react";
import {
  Box,
  Field,
  Select,
  Portal,
  defineStyle,
  useControllableState,
  type ListCollection,
  createListCollection,
  type HTMLChakraProps,
} from "@chakra-ui/react";

interface ItemOption {
  label: string;
  value: string;
}

interface FloatingLabelSelectProps
  extends Omit<HTMLChakraProps<"div">, "onChange"> {
  label: React.ReactNode;
  items?: ItemOption[];
  collection?: ListCollection<ItemOption>;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  selectProps?: Omit<
    React.ComponentProps<typeof Select.Root>,
    "collection" | "value" | "onValueChange" | "children"
  >;
  id?: string;
}

export const FloatingLabelSelect = (props: FloatingLabelSelectProps) => {
  const {
    label,
    items,
    collection: externalCollection,
    placeholder = "Select option",
    value,
    defaultValue = "",
    onValueChange,
    selectProps,
    id,
    ...rest
  } = props;

  // manage controlled/uncontrolled state
  const [internalValue, setInternalValue] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value,
  });

  const [focused, setFocused] = useState(false);
  const shouldFloat = !!internalValue || focused;

  const collection =
    externalCollection ||
    createListCollection<ItemOption>({
      items: items || [],
    });

  return (
    <Box pos="relative" w="full" {...rest}>
      <Select.Root
        collection={collection}
        value={internalValue || undefined}
        onValueChange={(val) => setInternalValue(val)}
        {...selectProps}
      >
        <Select.HiddenSelect id={id} />
        <Select.Control
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <Select.Trigger data-float={shouldFloat || undefined}>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Field.Label
        css={floatingStyles}
        data-float={shouldFloat || undefined}
        htmlFor={id}
      >
        {label}
      </Field.Label>
    </Box>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "2.5",
  insetStart: "3",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  color: "fg.muted",
  "&[data-float]": {
    top: "-3",
    insetStart: "2",
    color: "fg",
  },
});

export default FloatingLabelSelect;
