"use client";

import { ReactNode } from "react";
import { AppLayout } from "./app-layout";
import { NavItem } from "./app-layout.type";
import { IoLeafOutline, IoNewspaperOutline } from "react-icons/io5";
import { FiCreditCard, FiFileText, FiInfo } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: RiHome4Line },
  { label: "Products", href: "/plans", icon: IoLeafOutline },
  {
    label: "Pay My Plan",
    href: "/pay-my-plan",
    icon: FiCreditCard,
    displayName: "Pay",
  },
  { label: "Claim", href: "/claims", icon: FiFileText },
  { label: "News & Blog", href: "/news-updates", icon: IoNewspaperOutline },
  { label: "About Us", href: "/about-us", icon: FiInfo },
  { label: "Contact Us", href: "/contact-us", icon: MdOutlineMessage },
];

export function AppLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <AppLayout
      navItems={navItems}
      appName="E-Store"
      appSubtitle="St. Peter Life Plan"
      font="Open Sans"
    >
      {children}
    </AppLayout>
  );
}
