"use client";

import { type PointerEvent, useCallback, useRef, useState } from "react";
import { ChatbotMessenger } from "./chatbot-messenger";

const FAB_SIZE = 56;
const EDGE_GAP = 16;
const BOTTOM_NAV_OFFSET = 132;

function getSnappedPos(x: number, y: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const leftDistance = x;
  const rightDistance = width - x - FAB_SIZE;
  const topDistance = y;
  const bottomDistance = height - y - FAB_SIZE;
  const nearestEdge = Math.min(
    leftDistance,
    rightDistance,
    topDistance,
    bottomDistance,
  );
  const clampY = (value: number) =>
    Math.max(
      EDGE_GAP,
      Math.min(value, height - FAB_SIZE - EDGE_GAP - BOTTOM_NAV_OFFSET),
    );
  const clampX = (value: number) =>
    Math.max(EDGE_GAP, Math.min(value, width - FAB_SIZE - EDGE_GAP));

  if (nearestEdge === leftDistance) return { x: EDGE_GAP, y: clampY(y) };
  if (nearestEdge === rightDistance) {
    return { x: width - FAB_SIZE - EDGE_GAP, y: clampY(y) };
  }
  if (nearestEdge === topDistance) return { x: clampX(x), y: EDGE_GAP };

  return { x: clampX(x), y: height - FAB_SIZE - EDGE_GAP - BOTTOM_NAV_OFFSET };
}

function RobotIcon() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
    >
      <path
        d="M10 22 Q10 10 22 10 Q34 10 34 22"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="7" y="20" width="5.5" height="8" rx="2.75" fill="#475569" />
      <rect x="31.5" y="20" width="5.5" height="8" rx="2.75" fill="#475569" />
      <rect
        x="11"
        y="14"
        width="22"
        height="19"
        rx="5.5"
        fill="white"
        fillOpacity="0.92"
      />
      <rect x="14" y="17" width="16" height="13" rx="3.5" fill="#0f172a" />
      <circle cx="19" cy="22" r="3" fill="#00d4aa" fillOpacity="0.25" />
      <circle cx="25" cy="22" r="3" fill="#00d4aa" fillOpacity="0.25" />
      <circle cx="19" cy="22" r="2" fill="#00d4aa" />
      <circle cx="25" cy="22" r="2" fill="#00d4aa" />
      <circle cx="19.6" cy="21.4" r="0.6" fill="white" fillOpacity="0.7" />
      <circle cx="25.6" cy="21.4" r="0.6" fill="white" fillOpacity="0.7" />
      <path
        d="M17.5 26.5 Q22 30 26.5 26.5"
        stroke="#00d4aa"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="22"
        y1="14"
        x2="22"
        y2="10"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="8.5" r="2" fill="#00d4aa" />
      <circle cx="22" cy="8.5" r="3" fill="#00d4aa" fillOpacity="0.2" />
      <rect
        x="19"
        y="33"
        width="6"
        height="3"
        rx="1.5"
        fill="#cbd5e1"
        fillOpacity="0.6"
      />
    </svg>
  );
}

export function ChatbotFAB() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [messengerOpen, setMessengerOpen] = useState(false);
  const dragRef = useRef({ active: false, ox: 0, oy: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      posRef.current = { x: rect.left, y: rect.top };
      hasMoved.current = false;
      dragRef.current = {
        active: true,
        ox: event.clientX - posRef.current.x,
        oy: event.clientY - posRef.current.y,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      event.preventDefault();
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      if (!dragRef.current.active) return;

      hasMoved.current = true;
      const newPos = {
        x: event.clientX - dragRef.current.ox,
        y: event.clientY - dragRef.current.oy,
      };
      posRef.current = newPos;
      setPos(newPos);
    },
    [],
  );

  const onPointerUp = useCallback(() => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    setDragging(false);

    if (hasMoved.current) {
      const snapped = getSnappedPos(posRef.current.x, posRef.current.y);
      posRef.current = snapped;
      setPos(snapped);
      return;
    }

    setMessengerOpen(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes chatbot-fab-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,200,100,0.35), 0 8px 32px rgba(0,120,60,0.45); }
          50% { box-shadow: 0 0 0 8px rgba(0,200,100,0), 0 8px 32px rgba(0,120,60,0.45); }
        }
        .chatbot-fab {
          animation: chatbot-fab-pulse 2.8s ease-in-out infinite;
        }
        .chatbot-fab:hover {
          animation: none;
          box-shadow: 0 0 0 6px rgba(0,200,100,0.18), 0 12px 40px rgba(0,120,60,0.55) !important;
          transform: scale(1.08);
        }
      `}</style>
      <button
        aria-label="Chatbot"
        className="chatbot-fab"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: "fixed",
          left: pos ? pos.x : undefined,
          top: pos ? pos.y : undefined,
          right: pos ? undefined : EDGE_GAP,
          bottom: pos
            ? undefined
            : `calc(${EDGE_GAP + BOTTOM_NAV_OFFSET}px + env(safe-area-inset-bottom))`,
          width: FAB_SIZE,
          height: FAB_SIZE,
          opacity: messengerOpen ? 0 : 1,
          pointerEvents: messengerOpen ? "none" : "auto",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(0,168,80,0.22) 0%, rgba(0,80,40,0.28) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1.5px solid rgba(0,220,110,0.38)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1200,
          touchAction: "none",
          cursor: dragging ? "grabbing" : "grab",
          transition: dragging
            ? "none"
            : "left 0.25s cubic-bezier(.4,0,.2,1), top 0.25s cubic-bezier(.4,0,.2,1), transform 0.15s ease",
          userSelect: "none",
          outline: "none",
          padding: 0,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 32px rgba(0,120,60,0.45)",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <RobotIcon />
      </button>
      <ChatbotMessenger open={messengerOpen} onOpenChange={setMessengerOpen} />
    </>
  );
}
