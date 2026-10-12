"use client";

import { forwardRef, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationProvider,
  type NavigationAdapter,
  type NavLinkProps,
} from "osp-ui-kit";

/* -----------------------------------------------------------------------------
 * NextNavigationProvider — osp-ui-kit's navigation adapter for Next.js.
 *
 * osp-ui-kit components (Breadcrumb, BackButton, Page, Sidebar, …) call
 * useNavigation() and throw without a NavigationProvider above them.
 * osp-ui-kit's ReactRouterNavigationProvider is for react-router apps only,
 * so this app builds its own adapter from next/navigation + next/link.
 * -------------------------------------------------------------------------- */

// osp-ui-kit passes `to`; next/link expects `href`.
const NextNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NextNavLink({ to, ...rest }, ref) {
    return <Link ref={ref} href={to} {...rest} />;
  },
);

export function NextNavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const adapter = useMemo<NavigationAdapter>(
    () => ({
      pathname: pathname ?? "/",
      navigate: (to, options) => {
        // A number means "move through history" (e.g. -1 = go back).
        if (typeof to === "number") {
          window.history.go(to);
          return;
        }
        if (options?.replace) router.replace(to);
        else router.push(to);
      },
      Link: NextNavLink,
    }),
    [pathname, router],
  );

  return <NavigationProvider value={adapter}>{children}</NavigationProvider>;
}
