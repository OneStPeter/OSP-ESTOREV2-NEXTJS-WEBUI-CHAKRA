"use client";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./app-sidebar";
import AppHeader from "./app-header";
import { ReactNode, useEffect, useRef, useState } from "react";
import { NavItem, NotificationDataProps } from "./app-layout.type";
import { StickyNavbarContext } from "./app-navbar/sticky-navbar-context";
import { AppBottomNavBar } from "./app-navbar/app-bottom-navbar";

interface AppLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  notifications?: NotificationDataProps[];
  appName?: string;
  appSubtitle?: string;
  font?: string;
  display?: any;
}

export function AppLayout({
  children,
  navItems,
  notifications = [],
  appName = "App",
  appSubtitle,
  font,
  display,
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);
  const closeSidebar = () => setIsSidebarOpen(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fontSizeMap: Record<string, string> = {
      sm: "14px",
      md: "16px",
      lg: "18px",
    };
    const fontPref = localStorage.getItem("font-size-pref") ?? "md";
    document.documentElement.style.fontSize = fontSizeMap[fontPref] ?? "16px";
  }, []);

  return (
    <Flex
      h="100vh"
      fontFamily={font ? `'${font}', sans-serif` : undefined}
      bg={"white"}
      overflow="hidden"
      display={display ?? "flex"}
    >
      {/* LEFT: Sidebar — mobile/tablet only (desktop uses navbar.tsx floating pill) */}
      <Box display={{ base: "block", lg: "none" }}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          navItems={navItems}
          appName={appName}
          appSubtitle={appSubtitle}
        />
      </Box>

      {/* RIGHT: Navbar + content */}
      <Flex flex="1" direction="column" minW={0}>
        {/* Top Navbar */}
        <AppHeader
          onToggleSidebar={toggleSidebar}
          notifications={notifications}
          onOpenProfile={() => setProfileOpen(true)}
          appName={appName}
          appSubtitle={appSubtitle}
        />

        {/* Page content */}
        <Box
          flex="1"
          minW={0}
          bg="bg"
          p={0}
          overflow="auto"
          ref={scrollRef}
          px={0}
          pb={"100px"}
          pt={0}
        >
          <StickyNavbarContext refParent={scrollRef}>
            {children}
            <AppBottomNavBar
              onToggleSidebar={toggleSidebar}
              notifications={notifications}
              profileOpen={profileOpen}
              onProfileOpenChange={setProfileOpen}
              navItems={navItems}
            />
          </StickyNavbarContext>
        </Box>
      </Flex>
    </Flex>
  );
}
