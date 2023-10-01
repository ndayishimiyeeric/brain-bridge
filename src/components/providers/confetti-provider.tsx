"use client";
import ReactConfetti from "react-confetti";
import { useCanfettiStore } from "@/hooks";

const ConfettiProvider = () => {
  const confetti = useCanfettiStore();

  if (!confetti.isOpen) return null;
  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.OnClose();
      }}
    />
  );
};

export default ConfettiProvider;
