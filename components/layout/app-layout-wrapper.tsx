"use client";

import { ReactNode } from "react";
import { AppLayout } from "./app-layout";
import { NavItem } from "./app-layout.type";
import {
  IoLeafOutline,
  IoLeaf,
  IoNewspaperOutline,
  IoNewspaper,
} from "react-icons/io5";
import { FiCreditCard, FiFileText, FiInfo } from "react-icons/fi";
import { MdOutlineMessage, MdMessage } from "react-icons/md";
import {
  RiHome4Line,
  RiHome4Fill,
  RiBankCardFill,
  RiFileTextFill,
  RiInformationFill,
} from "react-icons/ri";

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: RiHome4Line, activeIcon: RiHome4Fill },
  { label: "Products", href: "/plans", icon: IoLeafOutline, activeIcon: IoLeaf },
  {
    label: "Pay My Plan",
    href: "/pay-my-plan",
    icon: FiCreditCard,
    activeIcon: RiBankCardFill,
    displayName: "Pay",
  },
  {
    label: "Claim",
    href: "/claims",
    icon: FiFileText,
    activeIcon: RiFileTextFill,
  },
  {
    label: "News & Blog",
    href: "/news-updates",
    icon: IoNewspaperOutline,
    activeIcon: IoNewspaper,
  },
  { label: "About Us", href: "/about-us", icon: FiInfo, activeIcon: RiInformationFill },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: MdOutlineMessage,
    activeIcon: MdMessage,
  },
];

export function AppLayoutWrapper({
  children,
  display,
}: {
  children: ReactNode;
  display?: any;
}) {
  return (
    <AppLayout
      navItems={navItems}
      appName="One St. Peter"
      appSubtitle="Online Store"
      font="Open Sans"
      display={display}
    >
      {children}
    </AppLayout>
  );
}
