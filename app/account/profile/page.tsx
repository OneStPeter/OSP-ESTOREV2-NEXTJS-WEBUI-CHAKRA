"use client";

import React, { useMemo, useState } from "react";
import {
  Accordion,
  Avatar,
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  FiChevronRight,
  FiCopy,
  FiGrid,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { LuPencil, LuUsers, LuWallet } from "react-icons/lu";
import { EditButton, PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";

import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import { Card } from "@splpi/plan-management";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { RESPONSIVE_LAYOUT_TOKENS } from "@/lib/theme/layout-tokens";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { useDemoAuth } from "@/components/ui/demo-auth";

type ProfileSummary = {
  accountNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type ReferralData = {
  code: string;
  link: string;
  totalRewards: string;
  qrImageSrc?: string;
};

type PayoutRow = {
  channel: string;
  accountNo: string;
  branch: string;
};

type AgentRow = {
  referralCode: string;
  agentName: string;
  mobile: string;
  email: string;
};

const Profile = () => {
  const router = useRouter();
  const { logout } = useDemoAuth();

  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");
  const softBg = useColorModeValue("gray.50", "whiteAlpha.50");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [openSections, setOpenSections] = useState(["account-details"]);

  const profile = useMemo<ProfileSummary>(
    () => ({
      accountNo: "SPLPI-01-123456789",
      firstName: "YHUAN SHIN",
      middleName: "FRANZA",
      lastName: "TEJIMA",
      email: "yhuanshin@email.com",
      phone: "+63 912 345 6789",
      address: "Makati City, Philippines",
    }),
    [],
  );

  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.phone);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState<"email" | "mobile" | null>(null);
  const [draftValue, setDraftValue] = useState("");

  const referral = useMemo<ReferralData>(
    () => ({
      code: "YHUAN1234-A",
      link: "https://online.stpeter.com",
      totalRewards: "₱ 0.00",
      qrImageSrc: undefined,
    }),
    [],
  );

  const payouts = useMemo<PayoutRow[]>(
    () => [
      {
        channel: "BDO",
        accountNo: "0000-0000-0000",
        branch: "Makati",
      },
    ],
    [],
  );

  const agents = useMemo<AgentRow[]>(
    () => [
      {
        referralCode: "AGNT-1042",
        agentName: "Agent",
        mobile: "0917 000 0001",
        email: "agent@example.com",
      },
      {
        referralCode: "AGNT-2088",
        agentName: "Agent",
        mobile: "0917 000 0002",
        email: "agent@example.com",
      },
    ],
    [],
  );

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
  };

  const openEdit = (field: "email" | "mobile") => {
    setEditField(field);
    setDraftValue(field === "email" ? email : mobile);
    setEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (editField === "email") setEmail(draftValue);
    if (editField === "mobile") setMobile(draftValue);
    setEditDialogOpen(false);
    setEditField(null);
  };

  const downloadQr = () => {
    if (!referral.qrImageSrc) return;
    const a = document.createElement("a");
    a.href = referral.qrImageSrc;
    a.download = "referral-qr.png";
    a.click();
  };

  const fullName = useMemo(() => {
    const givenName = [profile.firstName, profile.middleName]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(" ");
    return [profile.lastName.trim(), givenName].filter(Boolean).join(", ");
  }, [profile.firstName, profile.middleName, profile.lastName]);

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <Container>
      <MobileProfileSettings
        fullName={fullName}
        accountNo={profile.accountNo}
        email={email}
        mobile={mobile}
        referralCode={referral.code}
        twoFactorEnabled={twoFactorEnabled}
        onBack={() => router.back()}
        onEditEmail={() => openEdit("email")}
        onEditMobile={() => openEdit("mobile")}
        onToggleTwoFactor={() => setTwoFactorEnabled((value) => !value)}
        onCopyReferral={() => copyText(referral.code)}
        onSignOut={handleSignOut}
      />

      <VStack
        align="stretch"
        gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
      >
        <Box
          display={{ base: "none", md: "block" }}
          bg={BRAND_COLORS.white}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          borderRadius={STANDARD_RADIUS.lg}
          boxShadow={STANDARD_SHADOWS.level1}
          p={{
            base: RESPONSIVE_LAYOUT_TOKENS.card.mobilePadding.base,
            md: RESPONSIVE_LAYOUT_TOKENS.card.padding.md,
          }}
        >
          <HStack
            gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
            align="center"
          >
            <Box mt={0}>
              <Avatar.Root size={{ base: "lg", md: "xl" }}>
                <Avatar.Fallback name={fullName} />
                <Avatar.Image src="/images/profile.jpg" />
              </Avatar.Root>
            </Box>

            <Box minW={0}>
              <Text
                fontSize={{ base: "22px", md: "28px" }}
                lineHeight="1.2"
                fontWeight="700"
                color={BRAND_COLORS.neutralText}
              >
                {fullName}
              </Text>
              <Text fontSize={{ base: "13px", md: "14px" }} color={labelColor}>
                Account: {profile.accountNo}
              </Text>
            </Box>
          </HStack>
        </Box>

        <Accordion.Root
          value={openSections}
          onValueChange={(details) => setOpenSections(details.value)}
          collapsible
          multiple
          display="none"
        >
          <VStack
            align="stretch"
            gap={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          >
            <ProfileAccordionCard
              value="account-details"
              title="Account Details"
            >
              <Grid
                templateColumns={{
                  base: "1fr",
                  lg: "minmax(300px, 0.8fr) minmax(0, 1.4fr)",
                }}
                gap={{ base: STANDARD_SPACING.md, lg: STANDARD_SPACING.lg }}
                alignItems="start"
              >
                <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                  <KeyValue label="Account No." value={profile.accountNo} />
                  <KeyValue label="Full Name" value={fullName} />
                  <Box pt={STANDARD_SPACING.xs}>
                    <PrimaryMdButton w={{ base: "full", sm: "auto" }}>
                      CHANGE PASSWORD
                    </PrimaryMdButton>
                  </Box>
                </VStack>

                <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    }}
                    gap={STANDARD_SPACING.sm}
                  >
                    <ContactRow
                      icon={FiMail}
                      label="Email"
                      value={email}
                      labelColor={labelColor}
                      valueColor={valueColor}
                      action={
                        <>
                          <Box display={{ base: "none", md: "block" }}>
                            <EditButton onClick={() => openEdit("email")} />
                          </Box>
                          <Button
                            display={{ base: "inline-flex", md: "none" }}
                            variant="ghost"
                            p={0}
                            minW="32px"
                            h="32px"
                            borderRadius={STANDARD_RADIUS.md}
                            aria-label="Edit email"
                            onClick={() => openEdit("email")}
                          >
                            <Icon as={LuPencil} boxSize={4} />
                          </Button>
                        </>
                      }
                    />
                    <ContactRow
                      icon={FiPhone}
                      label="Phone"
                      value={mobile}
                      labelColor={labelColor}
                      valueColor={valueColor}
                      action={
                        <>
                          <Box display={{ base: "none", md: "block" }}>
                            <EditButton onClick={() => openEdit("mobile")} />
                          </Box>
                          <Button
                            display={{ base: "inline-flex", md: "none" }}
                            variant="ghost"
                            p={0}
                            minW="32px"
                            h="32px"
                            borderRadius={STANDARD_RADIUS.md}
                            aria-label="Edit mobile"
                            onClick={() => openEdit("mobile")}
                          >
                            <Icon as={LuPencil} boxSize={4} />
                          </Button>
                        </>
                      }
                    />
                    <Box gridColumn={{ base: "auto", md: "1 / -1" }}>
                      <ContactRow
                        icon={FiMapPin}
                        label="Address"
                        value={profile.address}
                        labelColor={labelColor}
                        valueColor={valueColor}
                      />
                    </Box>

                    <Box
                      gridColumn={{ base: "auto", md: "1 / -1" }}
                      p={STANDARD_SPACING.sm}
                      borderWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      borderRadius={STANDARD_RADIUS.md}
                      bg={softBg}
                    >
                      <HStack
                        justify="space-between"
                        align="center"
                        gap={STANDARD_SPACING.sm}
                      >
                        <Text fontSize="14px" color={labelColor}>
                          Two Factor Authentication
                        </Text>
                        <SwitchPill
                          enabled={twoFactorEnabled}
                          onToggle={() =>
                            setTwoFactorEnabled((value) => !value)
                          }
                        />
                      </HStack>
                    </Box>
                  </Grid>
                </VStack>
              </Grid>
            </ProfileAccordionCard>

            <ProfileAccordionCard value="my-payout" title="My Payout">
              <Box display={{ base: "none", md: "block" }} overflowX="auto">
                <Box
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.md}
                  overflow="hidden"
                  minW="560px"
                >
                  <Grid
                    templateColumns="160px 1fr 1fr"
                    gap={0}
                    bg={BRAND_COLORS.subtleBg}
                    px={STANDARD_SPACING.sm}
                    py={STANDARD_SPACING.xs}
                  >
                    <TableHeaderText>Channel</TableHeaderText>
                    <TableHeaderText>Account No</TableHeaderText>
                    <TableHeaderText>Branch</TableHeaderText>
                  </Grid>

                  {payouts.map((row, idx) => (
                    <Grid
                      key={`${row.channel}-${idx}`}
                      templateColumns="160px 1fr 1fr"
                      gap={0}
                      px={STANDARD_SPACING.sm}
                      py={STANDARD_SPACING.sm}
                      borderTopWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      transition="background 150ms ease-out"
                    >
                      <Text fontSize="14px" color={valueColor} fontWeight="600">
                        {row.channel}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.accountNo}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.branch}
                      </Text>
                    </Grid>
                  ))}
                </Box>
              </Box>

              <VStack
                align="stretch"
                gap={STANDARD_SPACING.xs}
                display={{ base: "flex", md: "none" }}
              >
                {payouts.map((row, idx) => (
                  <Box
                    key={`${row.channel}-${idx}-mobile`}
                    p={STANDARD_SPACING.sm}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    bg={softBg}
                  >
                    <VStack align="stretch" gap={STANDARD_SPACING.xs}>
                      <MiniKV label="Channel" value={row.channel} />
                      <MiniKV label="Account No" value={row.accountNo} />
                      <MiniKV label="Branch" value={row.branch} />
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </ProfileAccordionCard>

            <ProfileAccordionCard value="referral" title="Referral">
              <Grid
                templateColumns={{ base: "1fr", lg: "1fr 320px" }}
                gap={STANDARD_SPACING.md}
              >
                <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                  <LabeledCopyField
                    label="Code"
                    value={referral.code}
                    onCopy={() => copyText(referral.code)}
                  />
                  <LabeledCopyField
                    label="Link"
                    value={referral.link}
                    onCopy={() => copyText(referral.link)}
                  />

                  <Box
                    p={STANDARD_SPACING.sm}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    bg={softBg}
                  >
                    <HStack
                      justify="space-between"
                      align="center"
                      gap={STANDARD_SPACING.sm}
                    >
                      <Text fontSize="14px" color={labelColor}>
                        Total Rewards
                      </Text>
                      <Text
                        fontSize={{ base: "18px", md: "22px" }}
                        fontWeight="700"
                        color={BRAND_COLORS.primaryGreen}
                      >
                        {referral.totalRewards}
                      </Text>
                    </HStack>
                    <Button
                      variant="ghost"
                      p={0}
                      h="auto"
                      mt={STANDARD_SPACING.xs}
                      fontWeight="600"
                      color={BRAND_COLORS.darkGreen}
                      justifyContent="flex-start"
                    >
                      View My Referral
                    </Button>
                  </Box>
                </VStack>

                <Box>
                  <Text
                    fontSize="14px"
                    color={labelColor}
                    mb={STANDARD_SPACING.xs}
                  >
                    QR Code
                  </Text>
                  <Box
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    p={STANDARD_SPACING.sm}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={softBg}
                    minH={{ base: "180px", md: "220px" }}
                  >
                    {referral.qrImageSrc ? (
                      <Image
                        src={referral.qrImageSrc}
                        alt="Referral QR code"
                        maxH="180px"
                        objectFit="contain"
                      />
                    ) : (
                      <VStack gap={STANDARD_SPACING.xs}>
                        <Icon as={FiShield} color={labelColor} />
                        <Text
                          fontSize="14px"
                          color={labelColor}
                          textAlign="center"
                        >
                          QR code will appear here
                        </Text>
                      </VStack>
                    )}
                  </Box>

                  <Button
                    mt={STANDARD_SPACING.xs}
                    size="sm"
                    colorPalette="orange"
                    onClick={downloadQr}
                    disabled={!referral.qrImageSrc}
                  >
                    DOWNLOAD
                  </Button>
                </Box>
              </Grid>
            </ProfileAccordionCard>

            <ProfileAccordionCard value="my-agents" title="My Agent/s">
              <Box display={{ base: "none", md: "block" }} overflowX="auto">
                <Box
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.md}
                  overflow="hidden"
                  minW="840px"
                >
                  <Grid
                    templateColumns="160px 1.5fr 140px 1.7fr 120px"
                    gap={0}
                    bg={BRAND_COLORS.subtleBg}
                    px={STANDARD_SPACING.sm}
                    py={STANDARD_SPACING.xs}
                  >
                    <TableHeaderText>Referral Code</TableHeaderText>
                    <TableHeaderText>Agent Name</TableHeaderText>
                    <TableHeaderText>Mobile</TableHeaderText>
                    <TableHeaderText>Email Address</TableHeaderText>
                    <TableHeaderText>Action</TableHeaderText>
                  </Grid>

                  {agents.map((row, idx) => (
                    <Grid
                      key={`${row.referralCode}-${idx}`}
                      templateColumns="160px 1.5fr 140px 1.7fr 120px"
                      gap={0}
                      px={STANDARD_SPACING.sm}
                      py={STANDARD_SPACING.sm}
                      borderTopWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      transition="background 150ms ease-out"
                      alignItems="center"
                    >
                      <Text fontSize="14px" color={valueColor} fontWeight="600">
                        {row.referralCode}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.agentName}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.mobile}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.email}
                      </Text>
                      <Button size="sm" borderRadius={STANDARD_RADIUS.md}>
                        REMOVE
                      </Button>
                    </Grid>
                  ))}
                </Box>
              </Box>

              <VStack
                align="stretch"
                gap={STANDARD_SPACING.xs}
                display={{ base: "flex", md: "none" }}
              >
                {agents.map((row, idx) => (
                  <Box
                    key={`${row.referralCode}-${idx}-mobile`}
                    p={STANDARD_SPACING.sm}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    bg={softBg}
                  >
                    <VStack align="stretch" gap={STANDARD_SPACING.xs}>
                      <Text fontSize="14px" fontWeight="700" color={valueColor}>
                        {row.agentName}
                      </Text>
                      <MiniKV label="Referral Code" value={row.referralCode} />
                      <MiniKV label="Mobile" value={row.mobile} />
                      <MiniKV label="Email" value={row.email} />
                      <Button
                        mt={STANDARD_SPACING.xs}
                        size="sm"
                        colorPalette="orange"
                        borderRadius={STANDARD_RADIUS.md}
                        w="full"
                      >
                        REMOVE
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </ProfileAccordionCard>
          </VStack>
        </Accordion.Root>

        <VStack
          align="stretch"
          gap={STANDARD_SPACING.md}
          display={{ base: "none", md: "flex" }}
        >
          <Card.Root title="Account Details">
            <Card.MainContent>
              <Grid
                templateColumns={{
                  base: "1fr",
                  lg: "minmax(300px, 0.8fr) minmax(0, 1.4fr)",
                }}
                gap={{ base: STANDARD_SPACING.md, lg: STANDARD_SPACING.lg }}
                alignItems="start"
              >
                <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                  <KeyValue label="Account No." value={profile.accountNo} />
                  <KeyValue label="Full Name" value={fullName} />
                  <Box pt={STANDARD_SPACING.xs}>
                    <PrimaryMdButton w={{ base: "full", sm: "auto" }}>
                      CHANGE PASSWORD
                    </PrimaryMdButton>
                  </Box>
                </VStack>

                <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    }}
                    gap={STANDARD_SPACING.sm}
                  >
                    <ContactRow
                      icon={FiMail}
                      label="Email"
                      value={email}
                      labelColor={labelColor}
                      valueColor={valueColor}
                      action={
                        <>
                          <Box display={{ base: "none", md: "block" }}>
                            <EditButton onClick={() => openEdit("email")} />
                          </Box>
                          <Button
                            display={{ base: "inline-flex", md: "none" }}
                            variant="ghost"
                            p={0}
                            minW="32px"
                            h="32px"
                            borderRadius={STANDARD_RADIUS.md}
                            aria-label="Edit email"
                            onClick={() => openEdit("email")}
                          >
                            <Icon as={LuPencil} boxSize={4} />
                          </Button>
                        </>
                      }
                    />
                    <ContactRow
                      icon={FiPhone}
                      label="Phone"
                      value={mobile}
                      labelColor={labelColor}
                      valueColor={valueColor}
                      action={
                        <>
                          <Box display={{ base: "none", md: "block" }}>
                            <EditButton onClick={() => openEdit("mobile")} />
                          </Box>
                          <Button
                            display={{ base: "inline-flex", md: "none" }}
                            variant="ghost"
                            p={0}
                            minW="32px"
                            h="32px"
                            borderRadius={STANDARD_RADIUS.md}
                            aria-label="Edit mobile"
                            onClick={() => openEdit("mobile")}
                          >
                            <Icon as={LuPencil} boxSize={4} />
                          </Button>
                        </>
                      }
                    />
                    <Box gridColumn={{ base: "auto", md: "1 / -1" }}>
                      <ContactRow
                        icon={FiMapPin}
                        label="Address"
                        value={profile.address}
                        labelColor={labelColor}
                        valueColor={valueColor}
                      />
                    </Box>

                    <Box
                      gridColumn={{ base: "auto", md: "1 / -1" }}
                      p={STANDARD_SPACING.sm}
                      borderWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      borderRadius={STANDARD_RADIUS.md}
                      bg={softBg}
                    >
                      <HStack
                        justify="space-between"
                        align="center"
                        gap={STANDARD_SPACING.sm}
                      >
                        <Text fontSize="14px" color={labelColor}>
                          Two Factor Authentication
                        </Text>
                        <SwitchPill
                          enabled={twoFactorEnabled}
                          onToggle={() =>
                            setTwoFactorEnabled((value) => !value)
                          }
                        />
                      </HStack>
                    </Box>
                  </Grid>
                </VStack>
              </Grid>
            </Card.MainContent>
          </Card.Root>

          <Card.Root title="My Payout">
            <Card.MainContent>
              <Box display={{ base: "none", md: "block" }} overflowX="auto">
                <Box
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.md}
                  overflow="hidden"
                  minW="560px"
                >
                  <Grid
                    templateColumns="160px 1fr 1fr"
                    gap={0}
                    bg={BRAND_COLORS.subtleBg}
                    px={STANDARD_SPACING.sm}
                    py={STANDARD_SPACING.xs}
                  >
                    <TableHeaderText>Channel</TableHeaderText>
                    <TableHeaderText>Account No</TableHeaderText>
                    <TableHeaderText>Branch</TableHeaderText>
                  </Grid>

                  {payouts.map((row, idx) => (
                    <Grid
                      key={`${row.channel}-${idx}`}
                      templateColumns="160px 1fr 1fr"
                      gap={0}
                      px={STANDARD_SPACING.sm}
                      py={STANDARD_SPACING.sm}
                      borderTopWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      transition="background 150ms ease-out"
                    >
                      <Text fontSize="14px" color={valueColor} fontWeight="600">
                        {row.channel}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.accountNo}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.branch}
                      </Text>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Card.MainContent>
          </Card.Root>

          <Card.Root title="Referral">
            <Card.MainContent>
              <Grid
                templateColumns={{ base: "1fr", lg: "1fr 320px" }}
                gap={STANDARD_SPACING.md}
              >
                <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                  <LabeledCopyField
                    label="Code"
                    value={referral.code}
                    onCopy={() => copyText(referral.code)}
                  />
                  <LabeledCopyField
                    label="Link"
                    value={referral.link}
                    onCopy={() => copyText(referral.link)}
                  />

                  <Box
                    p={STANDARD_SPACING.sm}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    bg={softBg}
                  >
                    <HStack
                      justify="space-between"
                      align="center"
                      gap={STANDARD_SPACING.sm}
                    >
                      <Text fontSize="14px" color={labelColor}>
                        Total Rewards
                      </Text>
                      <Text
                        fontSize={{ base: "18px", md: "22px" }}
                        fontWeight="700"
                        color={BRAND_COLORS.primaryGreen}
                      >
                        {referral.totalRewards}
                      </Text>
                    </HStack>
                    <Button
                      variant="ghost"
                      p={0}
                      h="auto"
                      mt={STANDARD_SPACING.xs}
                      fontWeight="600"
                      color={BRAND_COLORS.darkGreen}
                      justifyContent="flex-start"
                    >
                      View My Referral
                    </Button>
                  </Box>
                </VStack>

                <Box>
                  <Text
                    fontSize="14px"
                    color={labelColor}
                    mb={STANDARD_SPACING.xs}
                  >
                    QR Code
                  </Text>
                  <Box
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    p={STANDARD_SPACING.sm}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={softBg}
                    minH={{ base: "180px", md: "220px" }}
                  >
                    {referral.qrImageSrc ? (
                      <Image
                        src={referral.qrImageSrc}
                        alt="Referral QR code"
                        maxH="180px"
                        objectFit="contain"
                      />
                    ) : (
                      <VStack gap={STANDARD_SPACING.xs}>
                        <Icon as={FiShield} color={labelColor} />
                        <Text
                          fontSize="14px"
                          color={labelColor}
                          textAlign="center"
                        >
                          QR code will appear here
                        </Text>
                      </VStack>
                    )}
                  </Box>

                  <Button
                    mt={STANDARD_SPACING.xs}
                    size="sm"
                    colorPalette="orange"
                    onClick={downloadQr}
                    disabled={!referral.qrImageSrc}
                  >
                    DOWNLOAD
                  </Button>
                </Box>
              </Grid>
            </Card.MainContent>
          </Card.Root>

          <Card.Root title="My Agent/s">
            <Card.MainContent>
              <Box display={{ base: "none", md: "block" }} overflowX="auto">
                <Box
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.md}
                  overflow="hidden"
                  minW="840px"
                >
                  <Grid
                    templateColumns="160px 1.5fr 140px 1.7fr 120px"
                    gap={0}
                    bg={BRAND_COLORS.subtleBg}
                    px={STANDARD_SPACING.sm}
                    py={STANDARD_SPACING.xs}
                  >
                    <TableHeaderText>Referral Code</TableHeaderText>
                    <TableHeaderText>Agent Name</TableHeaderText>
                    <TableHeaderText>Mobile</TableHeaderText>
                    <TableHeaderText>Email Address</TableHeaderText>
                    <TableHeaderText>Action</TableHeaderText>
                  </Grid>

                  {agents.map((row, idx) => (
                    <Grid
                      key={`${row.referralCode}-${idx}`}
                      templateColumns="160px 1.5fr 140px 1.7fr 120px"
                      gap={0}
                      px={STANDARD_SPACING.sm}
                      py={STANDARD_SPACING.sm}
                      borderTopWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      transition="background 150ms ease-out"
                      alignItems="center"
                    >
                      <Text fontSize="14px" color={valueColor} fontWeight="600">
                        {row.referralCode}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.agentName}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.mobile}
                      </Text>
                      <Text fontSize="14px" color={valueColor}>
                        {row.email}
                      </Text>
                      <Button size="sm" borderRadius={STANDARD_RADIUS.md}>
                        REMOVE
                      </Button>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Card.MainContent>
          </Card.Root>
        </VStack>
      </VStack>

      <Dialog.Root
        open={editDialogOpen}
        onOpenChange={(details) => setEditDialogOpen(details.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content mx={{ base: 3, md: 0 }}>
              <Dialog.CloseTrigger asChild>
                <CloseButton position="absolute" top={3} right={3} zIndex={1} />
              </Dialog.CloseTrigger>

              <Dialog.Header>
                <Dialog.Title>
                  {editField === "email"
                    ? "Edit Email Address"
                    : "Edit Mobile Number"}
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <VStack align="stretch" gap={STANDARD_SPACING.xs}>
                  <Text fontSize="14px" color={labelColor}>
                    {editField === "email"
                      ? "Enter your new email address."
                      : "Enter your new mobile number."}
                  </Text>
                  <Input
                    value={draftValue}
                    onChange={(event) => setDraftValue(event.target.value)}
                    placeholder={
                      editField === "email"
                        ? "name@example.com"
                        : "+63 9xx xxx xxxx"
                    }
                  />
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <HStack justify="flex-end" gap={STANDARD_SPACING.xs} w="full">
                  <SecondaryMdButton
                    borderRadius={STANDARD_RADIUS.md}
                    onClick={() => {
                      setEditDialogOpen(false);
                      setEditField(null);
                    }}
                  >
                    CANCEL
                  </SecondaryMdButton>
                  <PrimaryMdButton
                    borderRadius={STANDARD_RADIUS.md}
                    onClick={saveEdit}
                  >
                    SAVE
                  </PrimaryMdButton>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  );
};

function MobileProfileSettings(props: {
  fullName: string;
  accountNo: string;
  email: string;
  mobile: string;
  referralCode: string;
  twoFactorEnabled: boolean;
  onBack: () => void;
  onEditEmail: () => void;
  onEditMobile: () => void;
  onToggleTwoFactor: () => void;
  onCopyReferral: () => void;
  onSignOut: () => void;
}) {
  const initials = props.fullName
    .split(/[,\s]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Box display={{ base: "block", md: "none" }} mx="-8" mt="-8">
      <Box
        bg={BRAND_COLORS.primaryGreen}
        color={BRAND_COLORS.white}
        minH="196px"
        px={STANDARD_SPACING.md}
        pt="52px"
        pb={STANDARD_SPACING.md}
        position="relative"
      >
        {/* <CloseButton
          position="absolute"
          top="12px"
          right="12px"
          color={BRAND_COLORS.white}
          borderWidth="1px"
          borderColor="rgba(255,255,255,0.7)"
          borderRadius={STANDARD_RADIUS.md}
          w="44px"
          h="44px"
          onClick={props.onBack}
        /> */}

        <VStack gap={STANDARD_SPACING.xs}>
          <Avatar.Root size="xl" bg="#BFD7FF" color="#0047A8">
            <Avatar.Fallback name={props.fullName}>{initials}</Avatar.Fallback>
            <Avatar.Image src="/images/profile.jpg" />
          </Avatar.Root>
          <Text fontSize="24px" fontWeight="800" lineHeight="1.15">
            {props.fullName}
          </Text>
          <Text fontSize="12px" fontWeight="700" opacity={0.88}>
            {props.accountNo}
          </Text>
        </VStack>
      </Box>

      <Box bg={BRAND_COLORS.white} px={STANDARD_SPACING.sm} py={5}>
        <MobileSectionLabel>Account</MobileSectionLabel>
        <MobileSettingRow
          icon={FiMail}
          title="Email Address"
          subtitle={props.email}
          onClick={props.onEditEmail}
        />
        <MobileSettingRow
          icon={FiPhone}
          title="Mobile Number"
          subtitle={props.mobile}
          onClick={props.onEditMobile}
        />
        <MobileSettingRow
          icon={FiLock}
          title="Change Password"
          subtitle="Update login password"
          onClick={() => undefined}
        />

        <Box mt={STANDARD_SPACING.sm}>
          <MobileSectionLabel>Preferences</MobileSectionLabel>
        </Box>
        <MobileSettingRow
          icon={FiShield}
          title="Two Factor Authentication"
          subtitle={props.twoFactorEnabled ? "Enabled" : "Disabled"}
          action={
            <SwitchPill
              enabled={props.twoFactorEnabled}
              onToggle={props.onToggleTwoFactor}
            />
          }
        />
        <MobileSettingRow
          icon={FiGrid}
          title="Referral Code"
          subtitle={props.referralCode}
          onClick={props.onCopyReferral}
        />
        <MobileSettingRow
          icon={LuWallet}
          title="My Payout"
          subtitle="Payout information"
          onClick={() => undefined}
        />
        <MobileSettingRow
          icon={LuUsers}
          title="My Agent/s"
          subtitle="Assigned referral agent records"
          onClick={() => undefined}
        />

        <Button
          mt={STANDARD_SPACING.sm}
          w="full"
          h="40px"
          borderRadius={STANDARD_RADIUS.md}
          borderWidth="1px"
          borderColor="#FFB4B4"
          bg={BRAND_COLORS.white}
          color="#E53935"
          fontSize="13px"
          fontWeight="700"
          onClick={props.onSignOut}
          _hover={{ bg: "#FFF5F5" }}
        >
          SIGN OUT
        </Button>
      </Box>
    </Box>
  );
}

function MobileSectionLabel(props: { children: React.ReactNode }) {
  return (
    <Text
      color="#6F717A"
      fontSize="12px"
      fontWeight="800"
      letterSpacing="0.12em"
      textTransform="uppercase"
      mb="8px"
    >
      {props.children}
    </Text>
  );
}

function MobileSettingRow(props: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <HStack
      as={props.onClick ? "button" : "div"}
      // type={props.onClick ? "button" : undefined}
      w="full"
      minH="68px"
      py="10px"
      gap={STANDARD_SPACING.sm}
      borderBottomWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      textAlign="left"
      onClick={props.onClick}
    >
      <Flex
        w="38px"
        h="38px"
        borderRadius={STANDARD_RADIUS.md}
        bg="#F4F4F4"
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Icon as={props.icon} boxSize="17px" color="#555762" />
      </Flex>

      <Box flex="1" minW={0}>
        <Text
          color="#3D4350"
          fontSize="14px"
          fontWeight="700"
          lineHeight="1.2"
          lineClamp={1}
        >
          {props.title}
        </Text>
        <Text color="#6F717A" fontSize="12px" lineHeight="1.25" lineClamp={1}>
          {props.subtitle}
        </Text>
      </Box>

      {props.action ?? (
        <Icon as={FiChevronRight} boxSize="18px" color="#A1A3AA" />
      )}
    </HStack>
  );
}

function ProfileAccordionCard(props: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Item value={props.value} borderWidth="0">
      <Card.Root title={null}>
        <Card.MainContent>
          <Accordion.ItemTrigger
            w="full"
            py={STANDARD_SPACING.xs}
            px="0"
            color={BRAND_COLORS.neutralText}
            cursor="pointer"
            _hover={{ color: BRAND_COLORS.darkGreen }}
          >
            <HStack justify="space-between" align="center" w="full">
              <Text color="#0F8E49" fontSize="sm" fontWeight="700">
                {props.title}
              </Text>
              <HStack gap={STANDARD_SPACING.xs} color={BRAND_COLORS.darkGreen}>
                <Text
                  display={{ base: "none", md: "block" }}
                  fontSize="12px"
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  View details
                </Text>
                <Accordion.ItemIndicator />
              </HStack>
            </HStack>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody px="0" pt={STANDARD_SPACING.sm} pb="0">
              {props.children}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Card.MainContent>
      </Card.Root>
    </Accordion.Item>
  );
}

function TableHeaderText(props: { children: React.ReactNode }) {
  return (
    <Text
      fontSize="12px"
      color={BRAND_COLORS.grey}
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing="0"
    >
      {props.children}
    </Text>
  );
}

function MiniKV(props: { label: string; value: string }) {
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");

  return (
    <HStack justify="space-between" gap={4}>
      <Text fontSize="xs" color={labelColor} fontWeight="medium">
        {props.label}
      </Text>
      <Text fontSize="sm" color={valueColor} textAlign="right">
        {props.value}
      </Text>
    </HStack>
  );
}

function KeyValue(props: { label: string; value: string }) {
  const labelColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("gray.900", "gray.100");

  return (
    <HStack
      justify={{ base: "space-between", md: "start" }}
      align="start"
      gap={STANDARD_SPACING.sm}
      py={STANDARD_SPACING.xs}
      borderBottomWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
    >
      <Text fontSize="xs" color={labelColor} fontWeight="medium">
        {props.label}
      </Text>
      <Text
        fontSize="sm"
        color={valueColor}
        fontWeight="semibold"
        textAlign="right"
      >
        {props.value}
      </Text>
    </HStack>
  );
}

function SwitchPill(props: { enabled: boolean; onToggle: () => void }) {
  return (
    <HStack gap={3}>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        color={props.enabled ? "green.700" : "gray.500"}
      >
        {props.enabled ? "ON" : "OFF"}
      </Text>

      <Box
        role="switch"
        aria-checked={props.enabled}
        tabIndex={0}
        onClick={props.onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            props.onToggle();
          }
        }}
        w="56px"
        h="28px"
        borderRadius="full"
        bg={props.enabled ? "green.600" : "red.500"}
        position="relative"
        transition="background 150ms ease"
        cursor="pointer"
        outline="none"
      >
        <Box
          position="absolute"
          top="3px"
          left={props.enabled ? "30px" : "3px"}
          w="22px"
          h="22px"
          borderRadius="full"
          bg="white"
          transition="left 150ms ease"
        />
      </Box>
    </HStack>
  );
}

function ContactRow(props: {
  icon: React.ElementType;
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
  action?: React.ReactNode;
}) {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  return (
    <Box
      p={3}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.900")}
    >
      <HStack gap={3} align="start" justify="space-between">
        <HStack gap={3} align="start" flex="1">
          <Icon
            as={props.icon}
            mt={0.5}
            color={useColorModeValue("gray.600", "gray.300")}
          />
          <Box>
            <Text fontSize="xs" color={props.labelColor} fontWeight="medium">
              {props.label}
            </Text>
            <Text fontSize="sm" color={props.valueColor}>
              {props.value}
            </Text>
          </Box>
        </HStack>

        {props.action ? <Box mt={0.5}>{props.action}</Box> : null}
      </HStack>
    </Box>
  );
}

function LabeledCopyField(props: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  const labelColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box>
      <Text fontSize="sm" color={labelColor} mb={2}>
        {props.label}
      </Text>
      <HStack gap={2} align="center">
        <Input value={props.value} readOnly />
        <Button
          size="sm"
          colorPalette="orange"
          onClick={props.onCopy}
          aria-label={`Copy ${props.label}`}
        >
          <Icon as={FiCopy} />
          COPY
        </Button>
      </HStack>
    </Box>
  );
}

export default Profile;
