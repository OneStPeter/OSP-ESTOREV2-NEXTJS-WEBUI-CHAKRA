"use client"

import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        bg: { value: "#ffffff" }, 
        fg: { value: "#000000" },
      },
    },
  },
})