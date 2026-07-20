"use client";

/**
 * DocumentUploadCard — a fully self-contained, reusable upload slot.
 *
 * Drop it anywhere with a `DocumentTypeConfig` and it renders the complete
 * lifecycle: drag-and-drop, browse, camera capture, client-side validation,
 * upload progress, a SEPARATE AI-processing state, preview, replace, remove,
 * and retry.
 *
 * This variant keeps its own local state (no external ApplicationProvider is
 * required), so it can be dropped into the e-store without wiring up a
 * context. Swap the local `useDocumentSlot` hook for a shared provider later
 * if you need cross-component state.
 */

import React, { useRef, useState } from "react";
import { Box, Flex, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import {
  LuUpload,
  LuCamera,
  LuFolderOpen,
  LuFileText,
  LuCheck,
  LuTriangleAlert,
  LuRefreshCw,
  LuTrash2,
  LuReplace,
  LuSparkles,
} from "react-icons/lu";
// `sonner` is not installed in this project yet — install it via `npm i sonner`
// and uncomment the line below to use it. Until then we fall back to the
// in-project Chakra toaster (see `notifyError`).
// import { toast } from "sonner";
import { toaster } from "@/components/ui/toaster";

const PRIMARY = "var(--chakra-colors-primary)";
const PRIMARY_SOFT = "var(--chakra-colors-primary-disabled)";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

// The shared `DocumentTypeConfig` type lives in the sales-force feature and is
// not available here, so it is declared locally instead.
// import type { DocumentTypeConfig } from "../types";
export interface DocumentTypeConfig {
  /** Unique id for this document slot. */
  id: string;
  /** Human-readable label shown in the card header. */
  label: string;
  /** Optional supporting description under the label. */
  description?: string;
  /** Comma-separated accept string, e.g. "image/png,image/jpeg,.pdf". */
  accept: string;
  /** Maximum allowed file size in megabytes. */
  maxSizeMB: number;
  /** Whether the document is required for submission. */
  required?: boolean;
  /** Short hint shown inside the dropzone. */
  hint?: string;
  /** Which AI processor handles this doc — affects completed-state copy. */
  processor?: "signature" | "extraction" | string;
  /** Icon component (from react-icons) rendered in the header. */
  icon: React.ElementType;
}

type DocumentStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "completed"
  | "failed";

interface DocumentSlot {
  status: DocumentStatus;
  file?: File;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  previewUrl?: string;
  cleanedImageUrl?: string;
  progress?: number;
  error?: string;
  extraction?: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const notifyError = (message: string) => {
  // Swap for `toast.error(message)` once `sonner` is installed.
  toaster.create({ title: message, type: "error" });
};

const formatBytes = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const validate = (file: File, config: DocumentTypeConfig): string | null => {
  const accepted = config.accept.split(",").map((s) => s.trim());
  const okType =
    accepted.includes(file.type) ||
    accepted.some(
      (a) => a.startsWith(".") && file.name.toLowerCase().endsWith(a),
    );
  if (!okType) return "Unsupported file type. Please upload a JPG, PNG or PDF.";
  if (file.size > config.maxSizeMB * 1024 * 1024)
    return `File is too large. Maximum size is ${config.maxSizeMB}MB.`;
  return null;
};

/* ------------------------------------------------------------------ */
/* Local slot hook (replaces the ApplicationProvider context)          */
/* ------------------------------------------------------------------ */

const useDocumentSlot = (config: DocumentTypeConfig) => {
  const [slot, setSlot] = useState<DocumentSlot>({ status: "idle" });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const runLifecycle = (file: File) => {
    clearTimers();
    const previewUrl = URL.createObjectURL(file);
    const isSignature = config.processor === "signature";

    setSlot({
      status: "uploading",
      file,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      previewUrl,
      progress: 0,
    });

    // Simulated upload progress.
    let progress = 0;
    const tick = () => {
      progress = Math.min(100, progress + 20);
      setSlot((prev) => ({ ...prev, progress }));
      if (progress < 100) {
        timers.current.push(setTimeout(tick, 180));
      } else {
        // Move into a separate AI-processing state.
        timers.current.push(
          setTimeout(() => {
            setSlot((prev) => ({ ...prev, status: "processing" }));
            // Then complete.
            timers.current.push(
              setTimeout(() => {
                setSlot((prev) => ({
                  ...prev,
                  status: "completed",
                  cleanedImageUrl: isSignature ? prev.previewUrl : undefined,
                  extraction: isSignature
                    ? undefined
                    : { name: "Sample", date: "2026-07-16", id: "0001" },
                }));
              }, 1600),
            );
          }, 200),
        );
      }
    };
    timers.current.push(setTimeout(tick, 180));
  };

  const uploadDocument = (file: File) => runLifecycle(file);

  const retryDocument = () => {
    if (slot.file) runLifecycle(slot.file);
  };

  const removeDocument = () => {
    clearTimers();
    if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
    setSlot({ status: "idle" });
  };

  return { slot, uploadDocument, retryDocument, removeDocument };
};

/* ------------------------------------------------------------------ */
/* Inline Card wrapper (matches the project card style)                */
/* ------------------------------------------------------------------ */

const Card = ({
  activeIcon,
  title,
  subtitle,
  headerAction,
  children,
}: {
  activeIcon: React.ReactNode;
  title: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Box
    w="full"
    borderRadius="2xl"
    bg="white"
    borderWidth="1px"
    borderColor="gray.200"
    shadow="sm"
    overflow="hidden"
  >
    <Flex align="center" justify="space-between" px={4} py={3} gap={2}>
      <Flex align="center" gap={2} minW={0}>
        <Box
          p={2}
          borderRadius="full"
          bg="gray.100"
          color={PRIMARY}
          flexShrink={0}
        >
          {activeIcon}
        </Box>
        <Box minW={0}>
          <Text fontWeight="bold" fontSize="md" lineHeight="1.2" truncate>
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="xs" color="gray.500" truncate>
              {subtitle}
            </Text>
          )}
        </Box>
      </Flex>
      {headerAction}
    </Flex>
    <Box px={4} pb={4} pt={1} borderTopWidth="1px" borderColor="gray.100">
      {children}
    </Box>
  </Box>
);

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const StatusPill = ({ status }: { status: DocumentStatus }) => {
  const map = {
    idle: null,
    uploading: { label: "Uploading", fg: "#1D4ED8", bg: "#EFF6FF" },
    processing: { label: "Analyzing", fg: "#7C3AED", bg: "#F5F3FF" },
    completed: { label: "Completed", fg: "#15803D", bg: "#F0FDF4" },
    failed: { label: "Failed", fg: "#B91C1C", bg: "#FEF2F2" },
  } as const;
  const meta = map[status];
  if (!meta) return null;
  return (
    <Flex
      align="center"
      gap={1.5}
      px={2.5}
      py={1}
      borderRadius="full"
      fontSize="xs"
      fontWeight={600}
      style={{ color: meta.fg, background: meta.bg }}
      flexShrink={0}
    >
      {status === "processing" || status === "uploading" ? (
        <Spinner size="xs" borderWidth="2px" />
      ) : status === "completed" ? (
        <LuCheck size={12} />
      ) : (
        <LuTriangleAlert size={12} />
      )}
      {meta.label}
    </Flex>
  );
};

const ProgressBar = ({ value, color }: { value: number; color: string }) => (
  <Box w="full" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
    <Box
      h="full"
      borderRadius="full"
      style={{
        width: `${value}%`,
        background: color,
        transition: "width 0.2s ease",
      }}
    />
  </Box>
);

const Thumb = ({
  url,
  isPdf,
  fileName,
  transparent,
}: {
  url?: string;
  isPdf?: boolean;
  fileName?: string;
  transparent?: boolean;
}) => (
  <Flex
    align="center"
    justify="center"
    boxSize={{ base: "56px", md: "64px" }}
    borderRadius="lg"
    borderWidth="1px"
    borderColor="gray.200"
    overflow="hidden"
    flexShrink={0}
    bg={transparent ? "transparent" : "gray.50"}
    style={
      transparent
        ? {
            backgroundImage:
              "linear-gradient(45deg,#eee 25%,transparent 25%),linear-gradient(-45deg,#eee 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee 75%),linear-gradient(-45deg,transparent 75%,#eee 75%)",
            backgroundSize: "10px 10px",
            backgroundPosition: "0 0,0 5px,5px -5px,-5px 0",
          }
        : undefined
    }
  >
    {isPdf || !url ? (
      <Flex direction="column" align="center" color="gray.400" gap={0.5}>
        <LuFileText size={22} />
        <Text fontSize="9px" fontWeight={600}>
          {isPdf ? "PDF" : "FILE"}
        </Text>
      </Flex>
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={fileName ?? "preview"}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    )}
  </Flex>
);

const GhostBtn = ({
  icon,
  label,
  onClick,
  tone = "gray",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  tone?: "gray" | "danger" | "primary";
}) => {
  const tones = {
    gray: { c: "gray.600", h: "gray.50", b: "gray.200" },
    danger: { c: "#B91C1C", h: "#FEF2F2", b: "#FECACA" },
    primary: { c: PRIMARY, h: PRIMARY_SOFT, b: PRIMARY },
  } as const;
  const t = tones[tone];
  return (
    <Flex
      as="button"
      align="center"
      gap={1.5}
      px={2.5}
      py={1.5}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={t.b}
      color={t.c}
      bg="white"
      fontSize="xs"
      fontWeight={600}
      cursor="pointer"
      _hover={{ bg: t.h }}
      transition="all 0.15s"
      onClick={onClick}
    >
      {icon}
      {label}
    </Flex>
  );
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function DocumentUploadCard({ config }: { config: DocumentTypeConfig }) {
  const { slot, uploadDocument, retryDocument, removeDocument } =
    useDocumentSlot(config);
  const status = slot?.status ?? "idle";

  const browseRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const Icon = config.icon;
  const isPdf = slot?.fileType === "application/pdf";

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const error = validate(file, config);
    if (error) {
      notifyError(error);
      return;
    }
    void uploadDocument(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  /* --------------------------- IDLE ----------------------------- */
  const renderDropzone = () => (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={2}
      py={{ base: 6, md: 7 }}
      px={4}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={dragging ? PRIMARY : "gray.200"}
      borderRadius="xl"
      bg={dragging ? PRIMARY_SOFT : "gray.50"}
      transition="all 0.15s"
      textAlign="center"
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      role="button"
      tabIndex={0}
      onClick={() => browseRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") browseRef.current?.click();
      }}
      cursor="pointer"
      _hover={{ borderColor: PRIMARY, bg: PRIMARY_SOFT }}
    >
      <Flex
        align="center"
        justify="center"
        boxSize={11}
        borderRadius="full"
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        color={PRIMARY}
      >
        <LuUpload size={18} />
      </Flex>
      <Box>
        <Text fontSize="sm" fontWeight={600} color="gray.800">
          Drag &amp; drop or tap to upload
        </Text>
        <Text fontSize="xs" color="gray.500" mt={0.5}>
          {config.hint ?? "JPG, PNG or PDF"}
        </Text>
      </Box>
      <Flex gap={2} mt={1} onClick={(e) => e.stopPropagation()}>
        <GhostBtn
          icon={<LuFolderOpen size={13} />}
          label="Browse"
          tone="primary"
          onClick={() => browseRef.current?.click()}
        />
        <GhostBtn
          icon={<LuCamera size={13} />}
          label="Take photo"
          onClick={() => cameraRef.current?.click()}
        />
      </Flex>
    </Flex>
  );

  /* ----------------------- UPLOAD / PROCESS --------------------- */
  const renderBusy = () => (
    <Flex gap={3} align="center">
      <Thumb url={slot?.previewUrl} isPdf={isPdf} fileName={slot?.fileName} />
      <Box flex="1" minW={0}>
        <Text fontSize="sm" fontWeight={600} color="gray.800" truncate>
          {slot?.fileName}
        </Text>
        {status === "uploading" ? (
          <>
            <Flex
              justify="space-between"
              fontSize="xs"
              color="gray.500"
              mt={1}
              mb={1}
            >
              <Text>Uploading…</Text>
              <Text fontWeight={600}>{slot?.progress ?? 0}%</Text>
            </Flex>
            <ProgressBar value={slot?.progress ?? 0} color="#2563EB" />
          </>
        ) : (
          <Flex align="center" gap={2} mt={1.5}>
            <Flex
              align="center"
              gap={1.5}
              px={2}
              py={1}
              borderRadius="md"
              bg="#F5F3FF"
              color="#7C3AED"
              fontSize="xs"
              fontWeight={600}
            >
              <LuSparkles size={12} />
              {config.processor === "signature"
                ? "Cleaning signature…"
                : "Reading with AI…"}
            </Flex>
            <Spinner size="xs" color="#7C3AED" borderWidth="2px" />
          </Flex>
        )}
        {status === "processing" && (
          <Text fontSize="11px" color="gray.400" mt={1.5}>
            This can take a few seconds. Your upload is already saved.
          </Text>
        )}
      </Box>
    </Flex>
  );

  /* --------------------------- FAILED --------------------------- */
  const renderFailed = () => (
    <Box>
      <Flex gap={3} align="flex-start">
        <Thumb url={slot?.previewUrl} isPdf={isPdf} fileName={slot?.fileName} />
        <Box flex="1" minW={0}>
          <Text fontSize="sm" fontWeight={600} color="gray.800" truncate>
            {slot?.fileName ?? config.label}
          </Text>
          <Flex align="flex-start" gap={1.5} mt={1} color="#B91C1C">
            <Box mt="1px">
              <LuTriangleAlert size={13} />
            </Box>
            <Text fontSize="xs" lineHeight="1.4">
              {slot?.error ?? "We couldn't process this document."}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Flex gap={2} mt={3} wrap="wrap">
        {slot?.file ? (
          <GhostBtn
            icon={<LuRefreshCw size={13} />}
            label="Retry"
            tone="primary"
            onClick={() => void retryDocument()}
          />
        ) : (
          <GhostBtn
            icon={<LuUpload size={13} />}
            label="Re-upload"
            tone="primary"
            onClick={() => browseRef.current?.click()}
          />
        )}
        <GhostBtn
          icon={<LuReplace size={13} />}
          label="Choose another"
          onClick={() => browseRef.current?.click()}
        />
        <GhostBtn
          icon={<LuTrash2 size={13} />}
          label="Remove"
          tone="danger"
          onClick={() => removeDocument()}
        />
      </Flex>
    </Box>
  );

  /* -------------------------- COMPLETED ------------------------- */
  const renderCompleted = () => {
    const isSignature = config.processor === "signature";
    const fieldCount = slot?.extraction
      ? Object.values(slot.extraction).filter(Boolean).length
      : 0;
    const displayUrl = isSignature
      ? (slot?.cleanedImageUrl ?? slot?.previewUrl)
      : slot?.previewUrl;

    return (
      <Box>
        <Flex gap={3} align="center">
          <Thumb
            url={displayUrl}
            isPdf={isPdf && !isSignature}
            fileName={slot?.fileName}
            transparent={isSignature && !!slot?.cleanedImageUrl}
          />
          <Box flex="1" minW={0}>
            <Text fontSize="sm" fontWeight={600} color="gray.800" truncate>
              {slot?.fileName}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {formatBytes(slot?.fileSize)}
            </Text>
            <Flex
              align="center"
              gap={1.5}
              mt={1.5}
              color={PRIMARY}
              fontSize="xs"
              fontWeight={600}
            >
              <LuSparkles size={12} />
              {isSignature
                ? "Signature detected & cleaned"
                : `${fieldCount} field${fieldCount === 1 ? "" : "s"} extracted`}
            </Flex>
          </Box>
        </Flex>
        <Flex gap={2} mt={3} wrap="wrap">
          <GhostBtn
            icon={<LuReplace size={13} />}
            label="Replace"
            onClick={() => browseRef.current?.click()}
          />
          <GhostBtn
            icon={<LuTrash2 size={13} />}
            label="Remove"
            tone="danger"
            onClick={() => removeDocument()}
          />
        </Flex>
      </Box>
    );
  };

  const requiredTag = (
    <Text
      fontSize="10px"
      fontWeight={700}
      px={1.5}
      py={0.5}
      borderRadius="full"
      color={config.required ? "#B45309" : "gray.500"}
      bg={config.required ? "#FEF3C7" : "gray.100"}
      flexShrink={0}
    >
      {config.required ? "REQUIRED" : "OPTIONAL"}
    </Text>
  );
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <Card
      activeIcon={<Icon size={18} />}
      title={config.label}
      subtitle={config.description}
      headerAction={
        !isMobile ? (
          <Flex align="center" gap={2} flexShrink={0}>
            {requiredTag}
            <StatusPill status={status} />
          </Flex>
        ) : (
          <></>
        )
      }
    >
      {isMobile ? (
        <Flex
          align="center"
          justifySelf={"flex-end"}
          gap={2}
          mb={1}
          flexShrink={0}
        >
          {requiredTag}
          <StatusPill status={status} />
        </Flex>
      ) : (
        <></>
      )}

      {/* Body by state */}
      {status === "idle" && renderDropzone()}
      {(status === "uploading" || status === "processing") && renderBusy()}
      {status === "failed" && renderFailed()}
      {status === "completed" && renderCompleted()}

      {/* Hidden inputs */}
      <input
        ref={browseRef}
        type="file"
        accept={config.accept}
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </Card>
  );
}
