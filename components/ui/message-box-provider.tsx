"use client";

// Moved to osp-ui-kit. Re-exported here so existing
// `@/components/ui/message-box-provider` imports keep working and share one
// context with the MessageDialogProvider mounted in app/layout.tsx.
export { MessageDialogProvider, useMessageDialog } from "osp-ui-kit";
