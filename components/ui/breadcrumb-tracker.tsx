"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "st-peter-ui";

export const BreadcrumbTracker = () => {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });

  if (items.length === 0) {
    items.push({ label: "Home", href: "/" });
  }

  return <Breadcrumb items={items} maxItems={5} />;
};
