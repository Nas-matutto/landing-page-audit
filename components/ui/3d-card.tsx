"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AgentCard3DProps {
  title: string;
  description: string;
  gradient: string;
  actionText: string;
  onActionClick: () => void;
  className?: string;
}

export const AgentCard3D = React.forwardRef<HTMLDivElement, AgentCard3DProps>(
  ({ title, description, gradient, actionText, onActionClick, className }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-[26rem] w-72 shrink-0 rounded-2xl shadow-xl border border-white/10",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          className="absolute inset-3 rounded-xl overflow-hidden flex flex-col justify-between p-5"
        >
          {/* Gradient background */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{ background: gradient }}
          />
          {/* Noise overlay for texture */}
          <div className="absolute inset-0 rounded-xl opacity-[0.06]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />

          {/* Header */}
          <div className="relative flex items-start justify-between">
            <div className="pr-3">
              <motion.h3
                style={{ transform: "translateZ(50px)" }}
                className="text-xl font-bold text-white leading-snug"
              >
                {title}
              </motion.h3>
            </div>
            <motion.button
              onClick={onActionClick}
              whileHover={{ scale: 1.1, rotate: "2.5deg" }}
              whileTap={{ scale: 0.9 }}
              style={{ transform: "translateZ(60px)" }}
              className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-inset ring-white/30 hover:bg-white/30 transition-colors"
            >
              <ArrowUpRight className="h-4 w-4 text-white" />
            </motion.button>
          </div>

          {/* Description */}
          <motion.p
            style={{ transform: "translateZ(40px)" }}
            className="relative text-sm text-white/80 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Button */}
          <motion.button
            onClick={onActionClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ transform: "translateZ(40px)" }}
            className="relative w-full rounded-lg py-3 text-center text-sm font-semibold text-white bg-white/15 backdrop-blur-md ring-1 ring-inset ring-white/25 hover:bg-white/25 transition-colors"
          >
            {actionText}
          </motion.button>
        </div>
      </motion.div>
    );
  }
);
AgentCard3D.displayName = "AgentCard3D";
