"use client";

import { useEffect, useState } from "react";

export function useNotifyInstall() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect mobile
    const mobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    setIsMobile(mobile);

    // Check if already installed
    const installed =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsInstalled(installed);

    const handler = (event: any) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();

    const result = await installPrompt.userChoice;

    if (result.outcome === "accepted") {
      setIsInstalled(true);
    }

    setInstallPrompt(null);
  };

  return {
    isInstalled,
    isMobile,
    canInstall: !!installPrompt,
    install,
  };
}