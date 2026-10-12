"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Switch,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiDashboardFill,
  RiCheckboxCircleLine,
  RiCheckboxCircleFill,
  RiBookShelfLine,
  RiBookShelfFill,
  RiMoneyDollarCircleLine,
  RiMoneyDollarCircleFill,
  RiUser2Line,
  RiUser2Fill,
} from "react-icons/ri";
import {
  LuArrowLeftRight,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
  LuCreditCard,
  LuExternalLink,
  LuEye,
  LuEyeOff,
  LuFileText,
  LuHouse,
  LuIdCard,
  LuLayoutGrid,
  LuLock,
  LuLogOut,
  LuMail,
  LuMoon,
  LuPlus,
  LuShield,
  LuSmartphone,
  LuSun,
  LuUser,
  LuX,
} from "react-icons/lu";
import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import {
  BsFileEarmarkSpreadsheet,
  BsFileEarmarkSpreadsheetFill,
  BsFileEarmarkExcel,
  BsFileEarmarkExcelFill,
} from "react-icons/bs";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdOutlineManageAccounts, MdManageAccounts } from "react-icons/md";
import { IoLeaf, IoLeafOutline } from "react-icons/io5";
import type { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { useColorMode } from "@/components/ui/color-mode";
import { useDemoAuth } from "@/components/ui/demo-auth";

const toast = {
  error: (_message: string) => undefined,
  success: (_message: string) => undefined,
};

/*
 * Features that were switched off (commented out) in the previous version of
 * this page. They stay off here so nothing changes for users — flip a flag to
 * `true` to show that feature again.
 */
const SHOW_DISPLAY_NAME_EDIT = false;
const SHOW_TEXT_SIZE = false;
const SHOW_QUICK_NAV = false;

/**
 * The panes this screen can show. `"overview"` is the root: on a narrow screen
 * it is the menu itself, on a wide one it is what the detail column shows
 * while nothing is selected.
 */
type ProfileSection =
  | "overview"
  | "personal"
  | "password"
  | "security"
  | "appearance"
  | "quick-nav";

interface NavOptionDef {
  key: string;
  title: string;
  href: string;
  Icon: IconType;
  activeIcon: IconType;
  match: (p: string) => boolean;
  roles: string[];
}

const NAVBAR_STORAGE_KEY = "navbar-quick-items";
const DEFAULT_NAV_HREFS = ["/", "/plans", "/pay-my-plan", "/claims"];
const MAX_QUICK_NAV_ITEMS = 4;

const ALL_NAV_OPTIONS: NavOptionDef[] = [
  {
    key: "/",
    title: "Home",
    href: "/",
    Icon: LuHouse,
    activeIcon: LuHouse,
    match: (p) => p === "/",
    roles: ["branch", "bmstl", "sales-agent"],
  },
  {
    key: "/plans",
    title: "Plans",
    href: "/plans",
    Icon: IoLeafOutline,
    activeIcon: IoLeaf,
    match: (p) =>
      p.startsWith("/plans") ||
      p.startsWith("/plan-details") ||
      p.startsWith("/plan-comparison"),
    roles: ["branch", "bmstl", "sales-agent"],
  },
  {
    key: "/pay-my-plan",
    title: "Pay",
    href: "/pay-my-plan",
    Icon: LuCreditCard,
    activeIcon: LuCreditCard,
    match: (p) =>
      p.startsWith("/pay-my-plan") ||
      p.startsWith("/account/pay-my-plan") ||
      p.startsWith("/order-summary"),
    roles: ["branch", "bmstl", "sales-agent"],
  },
  {
    key: "/claims",
    title: "Claim",
    href: "/claims",
    Icon: LuFileText,
    activeIcon: LuFileText,
    match: (p) => p.startsWith("/claims"),
    roles: ["branch", "bmstl", "sales-agent"],
  },
  {
    key: "/",
    title: "Dashboard",
    href: "/",
    Icon: RiDashboardLine,
    activeIcon: RiDashboardFill,
    match: (p) => p === "/" || p.startsWith("/dashboard"),
    roles: ["branch", "bmstl", "sales-agent"],
  },
  {
    key: "/approvals",
    title: "Approvals",
    href: "/approvals",
    Icon: RiCheckboxCircleLine,
    activeIcon: RiCheckboxCircleFill,
    match: (p) => p.startsWith("/approvals"),
    roles: ["branch", "bmstl"],
  },
  {
    key: "/document-management",
    title: "Documents",
    href: "/document-management",
    Icon: RiBookShelfLine,
    activeIcon: RiBookShelfFill,
    match: (p) => p.startsWith("/document-management"),
    roles: ["branch"],
  },
  {
    key: "/payment/encode-payment",
    title: "Encode Payment",
    href: "/payment/encode-payment",
    Icon: RiMoneyDollarCircleLine,
    activeIcon: RiMoneyDollarCircleFill,
    match: (p) => p === "/payment/encode-payment",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/payment/view-drs",
    title: "View DRS",
    href: "/payment/view-drs",
    Icon: RiMoneyDollarCircleLine,
    activeIcon: RiMoneyDollarCircleFill,
    match: (p) => p === "/payment/view-drs",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/payment/encodevalidated-deposit",
    title: "Encode Deposit Slip",
    href: "/payment/encodevalidated-deposit",
    Icon: RiMoneyDollarCircleLine,
    activeIcon: RiMoneyDollarCircleFill,
    match: (p) => p === "/payment/encodevalidated-deposit",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/payment/viewvalidated-deposit",
    title: "View Deposit Slips",
    href: "/payment/viewvalidated-deposit",
    Icon: RiMoneyDollarCircleLine,
    activeIcon: RiMoneyDollarCircleFill,
    match: (p) => p === "/payment/viewvalidated-deposit",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/payment/credit-memo",
    title: "Credit Memo",
    href: "/payment/credit-memo",
    Icon: RiMoneyDollarCircleLine,
    activeIcon: RiMoneyDollarCircleFill,
    match: (p) => p === "/payment/credit-memo",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/sales-force/profile",
    title: "Agent Profile",
    href: "/sales-force/profile",
    Icon: RiUser2Line,
    activeIcon: RiUser2Fill,
    match: (p) => p === "/sales-force/profile",
    roles: ["branch"],
  },
  {
    key: "/sales-force/re-assign",
    title: "Re-Organization",
    href: "/sales-force/re-assign",
    Icon: RiUser2Line,
    activeIcon: RiUser2Fill,
    match: (p) => p === "/sales-force/re-assign",
    roles: ["branch"],
  },
  {
    key: "/sales-force/new",
    title: "Add New Agent",
    href: "/sales-force/new",
    Icon: RiUser2Line,
    activeIcon: RiUser2Fill,
    match: (p) => p === "/sales-force/new",
    roles: ["branch"],
  },
  {
    key: "/plan-management/new",
    title: "Add New Sale",
    href: "/plan-management/new",
    Icon: HiOutlineUsers,
    activeIcon: HiUsers,
    match: (p) => p === "/plan-management/new",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/plan-management/planholder",
    title: "Account Summary",
    href: "/plan-management/planholder",
    Icon: HiOutlineUsers,
    activeIcon: HiUsers,
    match: (p) => p.startsWith("/plan-management/planholder"),
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/plan-management/change-of-mode",
    title: "Change of Mode",
    href: "/plan-management/change-of-mode",
    Icon: HiOutlineUsers,
    activeIcon: HiUsers,
    match: (p) => p === "/plan-management/change-of-mode",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/disbursement/comte",
    title: "COM/TE",
    href: "/disbursement/comte",
    Icon: BsFileEarmarkSpreadsheet,
    activeIcon: BsFileEarmarkSpreadsheetFill,
    match: (p) => p === "/disbursement/comte",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/disbursement/rfexpense",
    title: "Revolving Fund",
    href: "/disbursement/rfexpense",
    Icon: BsFileEarmarkSpreadsheet,
    activeIcon: BsFileEarmarkSpreadsheetFill,
    match: (p) => p === "/disbursement/rfexpense",
    roles: ["branch"],
  },
  {
    key: "/loan",
    title: "Loan",
    href: "/loan",
    Icon: LiaHandHoldingUsdSolid,
    activeIcon: FaHandHoldingUsd,
    match: (p) => p.startsWith("/loan"),
    roles: ["branch"],
  },
  {
    key: "/accounts-maintenance/mcpr",
    title: "MCPR",
    href: "/accounts-maintenance/mcpr",
    Icon: MdOutlineManageAccounts,
    activeIcon: MdManageAccounts,
    match: (p) => p === "/accounts-maintenance/mcpr",
    roles: ["branch", "sales-agent"],
  },
  {
    key: "/accounts-maintenance/next-month-loading",
    title: "Next Month Loading",
    href: "/accounts-maintenance/next-month-loading",
    Icon: MdOutlineManageAccounts,
    activeIcon: MdManageAccounts,
    match: (p) => p === "/accounts-maintenance/next-month-loading",
    roles: ["branch"],
  },
  {
    key: "/accounts-maintenance/floating-accounts",
    title: "Floating Accounts",
    href: "/accounts-maintenance/floating-accounts",
    Icon: MdOutlineManageAccounts,
    activeIcon: MdManageAccounts,
    match: (p) => p === "/accounts-maintenance/floating-accounts",
    roles: ["branch"],
  },
  {
    key: "/accounts-maintenance/accounts-transfer",
    title: "Transfer of Accounts",
    href: "/accounts-maintenance/accounts-transfer",
    Icon: MdOutlineManageAccounts,
    activeIcon: MdManageAccounts,
    match: (p) => p === "/accounts-maintenance/accounts-transfer",
    roles: ["branch"],
  },
  {
    key: "/dc",
    title: "Doc Cancellation",
    href: "/dc",
    Icon: BsFileEarmarkExcel,
    activeIcon: BsFileEarmarkExcelFill,
    match: (p) => p === "/dc",
    roles: ["sales-agent"],
  },
];

const FONT_SIZES = [
  { value: "sm", px: "14px", title: "Small", scale: 0.82 },
  { value: "md", px: "16px", title: "Normal", scale: 1 },
  { value: "lg", px: "18px", title: "Large", scale: 1.18 },
] as const;

const FONT_SIZE_LABELS: Record<string, string> = {
  sm: "Small",
  md: "Normal",
  lg: "Large",
};

/** This app's color mode is light/dark only (no "follow device" option). */
const COLOR_MODES: {
  value: "light" | "dark";
  title: string;
  hint: string;
  Icon: IconType;
}[] = [
  { value: "light", title: "Light", hint: "Always light", Icon: LuSun },
  { value: "dark", title: "Dark", hint: "Always dark", Icon: LuMoon },
];

const ROLE_LABELS: Record<string, string> = {
  branch: "Branch",
  bmstl: "BM / STL",
  "sales-agent": "Sales Agent",
};

/** Five steps that stay distinguishable in both colour modes. */
const PW_STRENGTH_META = [
  { label: "", color: "hairline" },
  { label: "Very Weak", color: "danger" },
  { label: "Weak", color: "orange.solid" },
  { label: "Fair", color: "warning" },
  { label: "Strong", color: "success" },
  { label: "Very Strong", color: "successFg" },
] as const;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop()!.split(";").shift() ?? "");
  return null;
}

function parseSessionEmail(token: string | null): string {
  if (!token) return "";
  try {
    const json = token.split(".")[0];
    const padded = json.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (padded.length % 4)) % 4;
    const decoded = atob(padded + "=".repeat(padding));
    const payload = JSON.parse(decoded) as { email?: string };
    return payload.email ?? "";
  } catch {
    return "";
  }
}

function emailToDisplayName(email: string): string {
  const prefix = email.split("@")[0] ?? "";
  return prefix
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function calcPwStrength(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const AVATAR_PALETTES = ["red", "blue", "green", "yellow", "purple", "orange"];

function pickPalette(name: string) {
  return AVATAR_PALETTES[name.charCodeAt(0) % AVATAR_PALETTES.length];
}

/* ------------------------------------------------------------------ *
 * Shared pieces
 * ------------------------------------------------------------------ */

/** The rounded glyph tile every row in this screen leads with. */
function RowIcon({
  Icon,
  active,
  size = 38,
}: {
  Icon: IconType;
  active?: boolean;
  size?: number;
}) {
  return (
    <Flex
      w={`${size}px`}
      h={`${size}px`}
      flexShrink={0}
      align="center"
      justify="center"
      borderRadius="control"
      bg={active ? "surfaceRaised" : "primaryTint"}
      color={active ? "primary" : "mutedStrong"}
      transition="background-color 0.15s, color 0.15s"
    >
      <Icon size={16} />
    </Flex>
  );
}

/** One entry in the left rail. */
function NavRow({
  Icon,
  title,
  hint,
  active,
  onClick,
}: {
  Icon: IconType;
  title: string;
  hint: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <chakra.button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      display="flex"
      alignItems="center"
      gap={3}
      w="full"
      textAlign="start"
      px={2.5}
      py={2.5}
      borderRadius="control"
      cursor="pointer"
      bg={active ? "primaryTint" : "transparent"}
      transition="background-color 0.15s"
      _hover={{ bg: active ? "primaryTint" : "rowHover" }}
      _focusVisible={{ outline: "none", boxShadow: "focusRing" }}
    >
      <RowIcon Icon={Icon} active={active} />
      <Box flex={1} minW={0}>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={active ? "heading" : "foreground"}
          lineHeight="1.35"
          truncate
        >
          {title}
        </Text>
        <Text fontSize="xs" color="mutedStrong" lineHeight="1.4" truncate>
          {hint}
        </Text>
      </Box>
      <Box color={active ? "primary" : "muted"} flexShrink={0}>
        <LuChevronRight size={16} />
      </Box>
    </chakra.button>
  );
}

/** Small uppercase rule above a group of rail entries. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      px={2.5}
      pt={3}
      pb={1.5}
      fontSize="2xs"
      fontWeight="bold"
      letterSpacing="0.08em"
      textTransform="uppercase"
      color="mutedStrong"
    >
      {children}
    </Text>
  );
}

/**
 * Top of the detail column. The back arrow is the mobile drill-out and is
 * hidden from `lg` up, where the rail it would return to is already on screen.
 */
function DetailHeader({
  title,
  description,
  onBack,
}: {
  title: string;
  description?: string;
  onBack: () => void;
}) {
  return (
    <Flex
      align="center"
      gap={2}
      px={{ base: 3, lg: 6 }}
      py={{ base: 2.5, lg: 4 }}
      borderBottomWidth="1px"
      borderColor="hairlineSubtle"
      flexShrink={0}
    >
      <IconButton
        display={{ base: "inline-flex", lg: "none" }}
        size="sm"
        variant="ghost"
        color="mutedStrong"
        aria-label="Back"
        flexShrink={0}
        onClick={onBack}
      >
        <LuChevronLeft />
      </IconButton>
      <Box minW={0}>
        <Text fontSize="md" fontWeight="bold" color="heading" truncate>
          {title}
        </Text>
        {description && (
          <Text fontSize="xs" color="mutedStrong" lineHeight="1.4">
            {description}
          </Text>
        )}
      </Box>
    </Flex>
  );
}

/** Label + control + optional helper line. */
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <Box w="full">
      <Text fontSize="xs" fontWeight="semibold" color="mutedStrong" mb={1.5}>
        {label}
      </Text>
      {children}
      {hint && (
        <Text fontSize="xs" color="mutedStrong" mt={1.5}>
          {hint}
        </Text>
      )}
    </Box>
  );
}

/** A read-only fact on the overview pane. */
function FactTile({
  Icon,
  label,
  value,
  empty,
}: {
  Icon: IconType;
  label: string;
  value?: string;
  empty: string;
}) {
  return (
    <Flex
      gap={3}
      align="flex-start"
      bg="canvas"
      borderRadius="card"
      px={4}
      py={3.5}
    >
      <Box color="mutedStrong" flexShrink={0} pt="2px">
        <Icon size={16} />
      </Box>
      <Box minW={0}>
        <Text
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="0.08em"
          textTransform="uppercase"
          color="mutedStrong"
        >
          {label}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={value ? "foreground" : "muted"}
          mt={0.5}
          truncate
        >
          {value || empty}
        </Text>
      </Box>
    </Flex>
  );
}

/** Selectable card used by the appearance pane. */
function ChoiceCard({
  Icon,
  title,
  hint,
  active,
  onClick,
}: {
  Icon: IconType;
  title: string;
  hint: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <chakra.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={2}
      px={3}
      py={3}
      borderRadius="card"
      borderWidth="1px"
      borderColor={active ? "primary" : "hairline"}
      bg={active ? "primaryTint" : "transparent"}
      cursor="pointer"
      textAlign="start"
      transition="border-color 0.15s, background-color 0.15s"
      _hover={{ borderColor: active ? "primary" : "mutedStrong" }}
      _focusVisible={{ outline: "none", boxShadow: "focusRing" }}
    >
      <Box color={active ? "primary" : "mutedStrong"}>
        <Icon size={18} />
      </Box>
      <Box>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={active ? "heading" : "foreground"}
        >
          {title}
        </Text>
        <Text fontSize="xs" color="mutedStrong">
          {hint}
        </Text>
      </Box>
    </chakra.button>
  );
}

/** Password field + visibility toggle. */
function PasswordInput({
  value,
  onChange,
  placeholder,
  shown,
  onToggle,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  shown: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <InputGroup
      endElement={
        <IconButton
          size="xs"
          variant="ghost"
          color="mutedStrong"
          aria-label={shown ? `Hide ${label}` : `Show ${label}`}
          onClick={onToggle}
        >
          {shown ? <LuEyeOff size={15} /> : <LuEye size={15} />}
        </IconButton>
      }
    >
      <Input
        type={shown ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        size="md"
      />
    </InputGroup>
  );
}

/* ------------------------------------------------------------------ *
 * Profile
 * ------------------------------------------------------------------ */

/**
 * Account settings — one component for every viewport.
 *
 * A master/detail pair in a two-column grid. On a narrow screen only one
 * column shows at a time (menu, then pane, then back); from `lg` up both show
 * side by side. Same markup, same state — only the `display` value changes.
 *
 * Used both as the `/account/profile` page and inside the bottom navbar's
 * full-screen profile dialog (which passes `onClose`).
 */
const Profile = ({ onClose }: { onClose?: () => void } = {}) => {
  const router = useRouter();
  const { logout, isLoggedIn } = useDemoAuth();

  const [section, setSection] = useState<ProfileSection>("overview");
  const atRoot = section === "overview";

  // User info
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // Preferences
  const { colorMode, setColorMode } = useColorMode();
  const [fontSize, setFontSizeLocal] = useState("md");

  // Quick nav customization
  const [quickNavHrefs, setQuickNavHrefs] =
    useState<string[]>(DEFAULT_NAV_HREFS);
  const [replacingIdx, setReplacingIdx] = useState<number | null>(null);

  // Personal details
  const [editName, setEditName] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    setFontSizeLocal(localStorage.getItem("font-size-pref") ?? "md");
    const session = readCookie("osp_session");
    const parsedEmail = parseSessionEmail(session);
    setEmail(parsedEmail);
    const userRole = readCookie("osp_user") ?? "";
    setRole(userRole);
    const storedName = localStorage.getItem("user-display-name");
    setEditName(storedName || emailToDisplayName(parsedEmail));

    try {
      const stored = localStorage.getItem(NAVBAR_STORAGE_KEY);
      if (stored) setQuickNavHrefs(JSON.parse(stored) as string[]);
    } catch {
      // keep defaults
    }
  }, []);

  // Options available to the current role
  const availableOptions = useMemo(
    () => ALL_NAV_OPTIONS.filter((o) => !role || o.roles.includes(role)),
    [role],
  );

  const displayName = "Joyce Basilio-Ramos";
  const avatarUrl = "/images/profile.jpg";
  const roleLabel = role ? (ROLE_LABELS[role] ?? role) : "";

  const resetPasswordForm = () => {
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setShowCurrentPw(false);
    setShowNewPw(false);
    setShowConfirmPw(false);
  };

  const openSection = (next: ProfileSection) => {
    if (next === "password") resetPasswordForm();
    if (next !== "quick-nav") setReplacingIdx(null);
    setSection(next);
  };

  const handleFontSize = (size: string) => {
    const opt = FONT_SIZES.find((f) => f.value === size);
    if (!opt) return;
    localStorage.setItem("font-size-pref", size);
    document.documentElement.style.setProperty("font-size", opt.px);
    setFontSizeLocal(size);
  };

  const saveQuickNav = (hrefs: string[]) => {
    setQuickNavHrefs(hrefs);
    localStorage.setItem(NAVBAR_STORAGE_KEY, JSON.stringify(hrefs));
  };

  const addNavItem = (href: string) => {
    if (quickNavHrefs.length >= MAX_QUICK_NAV_ITEMS) return;
    if (quickNavHrefs.includes(href)) return;
    saveQuickNav([...quickNavHrefs, href]);
  };

  const removeNavItem = (href: string) => {
    saveQuickNav(quickNavHrefs.filter((h) => h !== href));
  };

  const moveNavItem = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= quickNavHrefs.length) return;
    const updated = [...quickNavHrefs];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    saveQuickNav(updated);
  };

  const replaceNavItem = (idx: number, newHref: string) => {
    const updated = [...quickNavHrefs];
    updated[idx] = newHref;
    saveQuickNav(updated);
    setReplacingIdx(null);
  };

  const handleSaveAccount = async () => {
    const trimmed = editName.trim();
    if (!trimmed) {
      toast.error("Display name cannot be empty");
      return;
    }
    setEditLoading(true);
    try {
      localStorage.setItem("user-display-name", trimmed);
      toast.success("Account updated");
      setSection("overview");
    } finally {
      setEditLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New passwords do not match");
      return;
    }
    if (pwStrength < 2) {
      toast.error("Password is too weak");
      return;
    }
    setPwLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPw,
          newPassword: newPw,
        }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error ?? "Failed to change password");
        return;
      }
      toast.success("Password changed successfully");
      resetPasswordForm();
      setSection("overview");
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setPwLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore network errors on demo logout
    }
    logout();
    router.push("/login");
  };

  const goToMyAccount = () => {
    onClose?.();
    router.push("/account");
  };

  const pwStrength = calcPwStrength(newPw);
  const pwMeta = PW_STRENGTH_META[pwStrength] ?? PW_STRENGTH_META[0];
  const colorModeLabel = colorMode === "dark" ? "Dark" : "Light";
  const unpinnedOptions = availableOptions.filter(
    (o) => !quickNavHrefs.includes(o.key),
  );

  type RailItem = {
    key: string;
    title: string;
    hint: string;
    Icon: IconType;
    /** Pane this entry opens. Entries without one run `onSelect` instead. */
    section?: ProfileSection;
    onSelect?: () => void;
  };

  const NAV_GROUPS: { label: string; items: RailItem[] }[] = [
    {
      label: "Account",
      items: [
        // My Account — only shown when logged in (same as before)
        ...(isLoggedIn
          ? [
              {
                key: "my-account",
                title: "My Account",
                hint: "View your account dashboard",
                Icon: LuExternalLink,
                onSelect: goToMyAccount,
              },
            ]
          : []),
        {
          key: "personal",
          section: "personal",
          title: "Edit Account",
          hint: "Update your email, and mobile number",
          Icon: LuUser,
        },
        {
          key: "password",
          section: "password",
          title: "Change Password",
          hint: "Update your login password",
          Icon: LuLock,
        },
        {
          key: "security",
          section: "security",
          title: "Two Factor Authentication",
          hint: twoFactorEnabled ? "Enabled" : "Disabled",
          Icon: LuShield,
        },
      ],
    },
    {
      label: "Preferences",
      items: [
        {
          key: "appearance",
          section: "appearance",
          title: "Appearance",
          hint: SHOW_TEXT_SIZE
            ? `${colorModeLabel} · ${FONT_SIZE_LABELS[fontSize] ?? "Normal"} text`
            : `${colorModeLabel} mode`,
          Icon: colorMode === "dark" ? LuMoon : LuSun,
        },
        ...(SHOW_QUICK_NAV
          ? [
              {
                key: "quick-nav",
                section: "quick-nav" as const,
                title: "Quick Navigation",
                hint: `${quickNavHrefs.length} of ${MAX_QUICK_NAV_ITEMS} items pinned`,
                Icon: LuLayoutGrid,
              },
            ]
          : []),
      ],
    },
  ];

  const SECTION_META: Record<
    ProfileSection,
    { title: string; description?: string }
  > = {
    overview: {
      title: "Overview",
      description: "Your account at a glance",
    },
    personal: {
      title: "Edit Account",
      description: "Your account details",
    },
    password: {
      title: "Change Password",
      description: "Choose something you do not use elsewhere",
    },
    security: {
      title: "Two Factor Authentication",
      description: "A second step when signing in",
    },
    appearance: {
      title: "Appearance",
      description: "How the site looks on this device",
    },
    "quick-nav": {
      title: "Quick Navigation",
      description: `Up to ${MAX_QUICK_NAV_ITEMS} shortcuts in the bottom bar`,
    },
  };

  /* ---------------------------------------------------------------- *
   * Panes
   * ---------------------------------------------------------------- */

  const overviewPane = (
    <VStack gap={5} align="stretch">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
        <FactTile Icon={LuMail} label="Email" value={email} empty="Not set" />
        <FactTile
          Icon={LuSmartphone}
          label="Mobile"
          value={undefined}
          empty="Not set"
        />
        <FactTile
          Icon={LuIdCard}
          label="Role"
          value={roleLabel}
          empty="Not assigned"
        />
        <FactTile
          Icon={LuShield}
          label="Two-factor"
          value={twoFactorEnabled ? "Enabled" : "Disabled"}
          empty="Disabled"
        />
      </Grid>

      <Flex
        gap={3}
        align="flex-start"
        bg="infoTint"
        borderRadius="card"
        px={4}
        py={3.5}
      >
        <Box color="infoFg" flexShrink={0} pt="2px">
          <LuUser size={16} />
        </Box>
        <Text fontSize="xs" color="infoFg" lineHeight="1.6">
          Email and mobile number are read-only here. Pick a section from the
          menu to change what you can.
        </Text>
      </Flex>
    </VStack>
  );

  const personalPane = (
    <VStack gap={5} align="stretch" maxW="480px">
      <Flex align="center" gap={4}>
        <Avatar.Root size="xl" colorPalette={pickPalette(displayName || "U")}>
          <Avatar.Image src={avatarUrl} alt={displayName} />
          <Avatar.Fallback name={displayName} />
        </Avatar.Root>
        <Box minW={0}>
          <Text fontSize="sm" fontWeight="semibold" color="heading">
            Profile photo
          </Text>
          <Text fontSize="xs" color="mutedStrong" lineHeight="1.5">
            Initials are used when there is no photo on file.
          </Text>
        </Box>
      </Flex>

      {SHOW_DISPLAY_NAME_EDIT && (
        <Field label="Display name">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Your name"
            size="md"
          />
        </Field>
      )}

      <Field label="Email" hint="Contact your administrator to change this.">
        <Input value={email} readOnly disabled size="md" />
      </Field>

      <Field
        label="Mobile number"
        hint="Contact your administrator to change this."
      >
        <Input value="" readOnly disabled size="md" />
      </Field>

      <Button
        alignSelf="flex-start"
        bg="primary"
        color="primaryForeground"
        _hover={{ bg: "primaryHover" }}
        loading={editLoading}
        onClick={handleSaveAccount}
      >
        Save Changes
      </Button>
    </VStack>
  );

  const passwordPane = (
    <VStack gap={5} align="stretch" maxW="480px">
      <Field label="Current password">
        <PasswordInput
          label="current password"
          value={currentPw}
          onChange={setCurrentPw}
          placeholder="Enter current password"
          shown={showCurrentPw}
          onToggle={() => setShowCurrentPw((v) => !v)}
        />
      </Field>

      <Field label="New password">
        <PasswordInput
          label="new password"
          value={newPw}
          onChange={setNewPw}
          placeholder="Enter new password"
          shown={showNewPw}
          onToggle={() => setShowNewPw((v) => !v)}
        />
        {newPw && (
          <Flex align="center" gap={3} mt={2}>
            <Flex gap={1} flex={1}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Box
                  key={i}
                  flex={1}
                  h="3px"
                  borderRadius="full"
                  bg={i <= pwStrength ? pwMeta.color : "hairline"}
                  transition="background 0.2s"
                />
              ))}
            </Flex>
            <Text
              fontSize="xs"
              color={pwMeta.color}
              fontWeight="medium"
              flexShrink={0}
            >
              {pwMeta.label}
            </Text>
          </Flex>
        )}
      </Field>

      <Field label="Confirm new password">
        <PasswordInput
          label="password confirmation"
          value={confirmPw}
          onChange={setConfirmPw}
          placeholder="Confirm new password"
          shown={showConfirmPw}
          onToggle={() => setShowConfirmPw((v) => !v)}
        />
        {confirmPw && confirmPw !== newPw && (
          <Text fontSize="xs" color="dangerFg" mt={1.5}>
            Passwords do not match
          </Text>
        )}
      </Field>

      <Button
        alignSelf="flex-start"
        bg="primary"
        color="primaryForeground"
        _hover={{ bg: "primaryHover" }}
        disabled={
          !currentPw ||
          !newPw ||
          !confirmPw ||
          newPw !== confirmPw ||
          pwStrength < 2
        }
        loading={pwLoading}
        onClick={handleChangePassword}
      >
        Update Password
      </Button>
    </VStack>
  );

  const securityPane = (
    <VStack gap={5} align="stretch" maxW="520px">
      <Flex
        align="center"
        gap={4}
        borderWidth="1px"
        borderColor={twoFactorEnabled ? "primary" : "hairline"}
        bg={twoFactorEnabled ? "primaryTint" : "transparent"}
        borderRadius="card"
        px={4}
        py={4}
        transition="border-color 0.15s, background-color 0.15s"
      >
        <RowIcon Icon={LuShield} active={twoFactorEnabled} />
        <Box flex={1} minW={0}>
          <Text fontSize="sm" fontWeight="semibold" color="heading">
            Two Factor Authentication
          </Text>
          <Text fontSize="xs" color="mutedStrong" lineHeight="1.5">
            {twoFactorEnabled
              ? "A one-time code is required each time you sign in."
              : "Sign-in only asks for your password."}
          </Text>
        </Box>
        <Switch.Root
          checked={twoFactorEnabled}
          onCheckedChange={(e) => setTwoFactorEnabled(e.checked)}
          flexShrink={0}
        >
          <Switch.HiddenInput aria-label="Toggle two-factor authentication" />
          {/* The knob stays white against its track in both colour modes. */}
          <Switch.Control
            bg="muted"
            _checked={{ bg: "primary" }}
            _focusVisible={{ boxShadow: "focusRing" }}
          >
            <Switch.Thumb bg="white" />
          </Switch.Control>
        </Switch.Root>
      </Flex>

      <Flex
        gap={3}
        align="flex-start"
        bg={twoFactorEnabled ? "successTint" : "warningTint"}
        borderRadius="card"
        px={4}
        py={3.5}
      >
        <Box
          color={twoFactorEnabled ? "successFg" : "warningFg"}
          flexShrink={0}
          pt="2px"
        >
          <LuShield size={16} />
        </Box>
        <Text
          fontSize="xs"
          color={twoFactorEnabled ? "successFg" : "warningFg"}
          lineHeight="1.6"
        >
          {twoFactorEnabled
            ? "Your account is protected. Keep a recovery method on file in case you lose your device."
            : "Turning this on is the single biggest thing you can do to protect your account."}
        </Text>
      </Flex>
    </VStack>
  );

  const appearancePane = (
    <VStack gap={6} align="stretch" maxW="520px">
      <Box>
        <Text fontSize="sm" fontWeight="semibold" color="heading" mb={1}>
          Colour mode
        </Text>
        <Text fontSize="xs" color="mutedStrong" mb={3}>
          Applies to this browser only.
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={2.5}>
          {COLOR_MODES.map((mode) => (
            <ChoiceCard
              key={mode.value}
              Icon={mode.Icon}
              title={mode.title}
              hint={mode.hint}
              active={colorMode === mode.value}
              onClick={() => setColorMode(mode.value)}
            />
          ))}
        </Grid>
      </Box>

      {SHOW_TEXT_SIZE && (
        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="heading" mb={1}>
            Text size
          </Text>
          <Text fontSize="xs" color="mutedStrong" mb={3}>
            Scales every page on the site.
          </Text>
          <HStack gap={2}>
            {FONT_SIZES.map((opt) => {
              const isActive = fontSize === opt.value;
              return (
                <chakra.button
                  type="button"
                  key={opt.value}
                  onClick={() => handleFontSize(opt.value)}
                  aria-pressed={isActive}
                  title={opt.title}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={0.5}
                  flex={1}
                  py={2.5}
                  borderRadius="control"
                  borderWidth="1px"
                  borderColor={isActive ? "primary" : "hairline"}
                  bg={isActive ? "primaryTint" : "transparent"}
                  color={isActive ? "heading" : "mutedStrong"}
                  cursor="pointer"
                  transition="border-color 0.15s, background-color 0.15s"
                  _hover={{ borderColor: isActive ? "primary" : "mutedStrong" }}
                  _focusVisible={{ outline: "none", boxShadow: "focusRing" }}
                >
                  <Text
                    fontWeight={isActive ? "bold" : "medium"}
                    lineHeight="1"
                    style={{ fontSize: `${opt.scale * 16}px` }}
                  >
                    A
                  </Text>
                  <Text fontSize="2xs">{opt.title}</Text>
                </chakra.button>
              );
            })}
          </HStack>
        </Box>
      )}
    </VStack>
  );

  const quickNavPane = (
    <VStack gap={6} align="stretch" maxW="560px">
      <Box>
        <Flex align="center" justify="space-between" mb={2}>
          <Text fontSize="sm" fontWeight="semibold" color="heading">
            Pinned
          </Text>
          <Badge
            bg={
              quickNavHrefs.length >= MAX_QUICK_NAV_ITEMS
                ? "warningTint"
                : "primaryTint"
            }
            color={
              quickNavHrefs.length >= MAX_QUICK_NAV_ITEMS
                ? "warningFg"
                : "infoFg"
            }
            borderRadius="full"
            px={2}
            fontSize="xs"
            fontWeight="medium"
          >
            {quickNavHrefs.length} / {MAX_QUICK_NAV_ITEMS}
          </Badge>
        </Flex>

        {quickNavHrefs.length === 0 ? (
          <Flex
            align="center"
            justify="center"
            py={7}
            borderRadius="card"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor="hairline"
          >
            <Text fontSize="sm" color="mutedStrong">
              No items pinned — add from below
            </Text>
          </Flex>
        ) : (
          <VStack gap={1.5} align="stretch">
            {quickNavHrefs.map((href, idx) => {
              const option = availableOptions.find((o) => o.key === href);
              if (!option) return null;
              const ItemIcon = option.Icon;
              const isReplacing = replacingIdx === idx;
              return (
                <Flex
                  key={href}
                  align="center"
                  gap={3}
                  px={3}
                  py={2}
                  borderRadius="control"
                  borderWidth="1px"
                  borderColor={isReplacing ? "warning" : "hairline"}
                  bg={isReplacing ? "warningTint" : "transparent"}
                  transition="border-color 0.15s, background-color 0.15s"
                >
                  <Flex
                    w="34px"
                    h="34px"
                    flexShrink={0}
                    align="center"
                    justify="center"
                    borderRadius="control"
                    bg={isReplacing ? "warning" : "primary"}
                    color={isReplacing ? "warningSolidFg" : "primaryForeground"}
                  >
                    <ItemIcon size={15} />
                  </Flex>
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="medium" truncate>
                      {option.title}
                    </Text>
                    {isReplacing && (
                      <Text fontSize="xs" color="warningFg" fontWeight="medium">
                        Select replacement below
                      </Text>
                    )}
                  </Box>
                  <HStack gap={0.5} flexShrink={0}>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      aria-label={`Move ${option.title} up`}
                      color="mutedStrong"
                      disabled={idx === 0 || isReplacing}
                      onClick={() => moveNavItem(idx, -1)}
                    >
                      <LuChevronUp size={14} />
                    </IconButton>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      aria-label={`Move ${option.title} down`}
                      color="mutedStrong"
                      disabled={idx === quickNavHrefs.length - 1 || isReplacing}
                      onClick={() => moveNavItem(idx, 1)}
                    >
                      <LuChevronDown size={14} />
                    </IconButton>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      aria-label={
                        isReplacing ? "Cancel replace" : `Replace ${option.title}`
                      }
                      color={isReplacing ? "warningFg" : "mutedStrong"}
                      _hover={{ bg: isReplacing ? "warningTint" : "rowHover" }}
                      onClick={() => setReplacingIdx(isReplacing ? null : idx)}
                    >
                      <LuArrowLeftRight size={13} />
                    </IconButton>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      aria-label={`Remove ${option.title}`}
                      color="danger"
                      _hover={{ bg: "dangerTint" }}
                      disabled={isReplacing}
                      onClick={() => removeNavItem(href)}
                    >
                      <LuX size={14} />
                    </IconButton>
                  </HStack>
                </Flex>
              );
            })}
          </VStack>
        )}
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={2}>
          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color={replacingIdx !== null ? "warningFg" : "heading"}
            >
              {replacingIdx !== null ? "Select Replacement" : "Available"}
            </Text>
            {replacingIdx !== null && (
              <Text fontSize="xs" color="mutedStrong">
                Replacing &ldquo;
                {
                  availableOptions.find(
                    (o) => o.key === quickNavHrefs[replacingIdx],
                  )?.title
                }
                &rdquo;
              </Text>
            )}
          </Box>
          {replacingIdx !== null && (
            <Button
              size="xs"
              variant="ghost"
              color="mutedStrong"
              onClick={() => setReplacingIdx(null)}
            >
              Cancel
            </Button>
          )}
        </Flex>

        {unpinnedOptions.length === 0 ? (
          <Text fontSize="sm" color="mutedStrong" py={3} textAlign="center">
            All available items are pinned
          </Text>
        ) : (
          <VStack gap={0.5} align="stretch">
            {unpinnedOptions.map((option) => {
              const ItemIcon = option.Icon;
              const isReplacingMode = replacingIdx !== null;
              const canAdd = quickNavHrefs.length < MAX_QUICK_NAV_ITEMS;
              const enabled = isReplacingMode || canAdd;
              return (
                <Flex
                  key={`${option.key}-${option.title}`}
                  align="center"
                  gap={3}
                  px={2.5}
                  py={2}
                  borderRadius="control"
                  _hover={{ bg: "rowHover" }}
                >
                  <RowIcon Icon={ItemIcon} size={34} />
                  <Text
                    flex={1}
                    minW={0}
                    fontSize="sm"
                    fontWeight="medium"
                    color={enabled ? "foreground" : "muted"}
                    truncate
                  >
                    {option.title}
                  </Text>
                  {isReplacingMode ? (
                    <IconButton
                      size="xs"
                      variant="outline"
                      aria-label={`Use ${option.title} as replacement`}
                      borderColor="warning"
                      color="warningFg"
                      _hover={{ bg: "warningTint" }}
                      onClick={() => replaceNavItem(replacingIdx, option.key)}
                    >
                      <LuArrowLeftRight size={13} />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="xs"
                      variant="outline"
                      aria-label={`Pin ${option.title}`}
                      disabled={!canAdd}
                      borderColor={canAdd ? "primary" : "hairline"}
                      color={canAdd ? "infoFg" : "muted"}
                      _hover={{ bg: canAdd ? "primaryTint" : "transparent" }}
                      onClick={() => addNavItem(option.key)}
                    >
                      <LuPlus size={13} />
                    </IconButton>
                  )}
                </Flex>
              );
            })}
          </VStack>
        )}
      </Box>
    </VStack>
  );

  const PANES: Record<ProfileSection, React.ReactNode> = {
    overview: overviewPane,
    personal: personalPane,
    password: passwordPane,
    security: securityPane,
    appearance: appearancePane,
    "quick-nav": quickNavPane,
  };

  /* ---------------------------------------------------------------- *
   * Shell
   * ---------------------------------------------------------------- */

  return (
    <Flex
      direction="column"
      w="full"
      minH="100%"
      bg="surfaceRaised"
      overflow="hidden"
    >
      {/*
        Identity band. Stacked and centred at the root, a row once wide enough
        — and on a phone it collapses to a compact title bar the moment a pane
        opens, so the form below gets the space.
      */}
      <Flex
        direction={{ base: atRoot ? "column" : "row", sm: "row" }}
        align="center"
        textAlign={{ base: atRoot ? "center" : "start", sm: "start" }}
        gap={{ base: 3, sm: 5 }}
        bg="primary"
        px={{ base: 5, lg: 7 }}
        py={{ base: atRoot ? 7 : 3, lg: 6 }}
        transition="padding 0.2s"
        flexShrink={0}
      >
        <Avatar.Root
          size={{ base: atRoot ? "xl" : "md", lg: "2xl" }}
          flexShrink={0}
          colorPalette={pickPalette(displayName || "U")}
          outline="3px solid"
          outlineColor="primaryForeground/30"
        >
          <Avatar.Image src={avatarUrl} alt={displayName} />
          <Avatar.Fallback name={displayName} />
        </Avatar.Root>
        <Box minW={0}>
          <Text
            color="primaryForeground"
            fontWeight="bold"
            fontSize={{ base: atRoot ? "lg" : "md", lg: "xl" }}
            lineHeight="1.25"
            truncate
          >
            {displayName}
          </Text>
          {email && (
            <Text
              display={{ base: atRoot ? "block" : "none", sm: "block" }}
              color="primaryForeground/75"
              fontSize="sm"
              lineHeight="1.5"
              truncate
            >
              {email}
            </Text>
          )}
          {roleLabel && (
            <Badge
              display={{
                base: atRoot ? "inline-flex" : "none",
                sm: "inline-flex",
              }}
              mt={2}
              bg="primaryForeground/15"
              color="primaryForeground"
              borderRadius="full"
              px={3}
              py={0.5}
              fontSize="xs"
              fontWeight="medium"
              borderWidth="1px"
              borderColor="primaryForeground/30"
            >
              {roleLabel}
            </Badge>
          )}
        </Box>
      </Flex>

      <Grid
        flex="1"
        minH={0}
        templateColumns={{ base: "1fr", lg: "300px 1fr" }}
        alignItems="stretch"
      >
        {/* Rail — the whole screen when narrow and at the root, a persistent
            sidebar from `lg` up. */}
        <Flex
          direction="column"
          display={{ base: atRoot ? "flex" : "none", lg: "flex" }}
          borderRightWidth={{ lg: "1px" }}
          borderColor="hairlineSubtle"
          bg={{ base: "surfaceRaised", lg: "canvas" }}
          px={{ base: 2, lg: 3 }}
          pt={1}
          pb={4}
          minW={0}
        >
          {NAV_GROUPS.map((group) => (
            <Box key={group.label}>
              <GroupLabel>{group.label}</GroupLabel>
              <VStack gap={0.5} align="stretch">
                {group.items.map((item) => (
                  <NavRow
                    key={item.key}
                    Icon={item.Icon}
                    title={item.title}
                    hint={item.hint}
                    active={!!item.section && section === item.section}
                    onClick={() =>
                      item.section
                        ? openSection(item.section)
                        : item.onSelect?.()
                    }
                  />
                ))}
              </VStack>
            </Box>
          ))}

          {/*
            Sign out sits at the bottom of the rail on desktop; on a phone it
            just follows the list.
          */}
          <Box display={{ base: "none", lg: "block" }} flex="1" minH={4} />
          <Box display={{ base: "block", lg: "none" }} h={3} />

          <Button
            variant="outline"
            color="dangerFg"
            borderColor="danger/40"
            _hover={{ bg: "dangerTint", borderColor: "danger" }}
            onClick={handleSignOut}
          >
            <LuLogOut size={16} />
            Sign Out
          </Button>
        </Flex>

        {/* Detail — hidden at the root when narrow, always on from `lg`. */}
        <Flex
          direction="column"
          display={{ base: atRoot ? "none" : "flex", lg: "flex" }}
          minW={0}
        >
          <DetailHeader
            title={SECTION_META[section].title}
            description={SECTION_META[section].description}
            onBack={() => openSection("overview")}
          />
          <Box flex="1" px={{ base: 4, lg: 6 }} py={{ base: 5, lg: 6 }}>
            {PANES[section]}
          </Box>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Profile;
