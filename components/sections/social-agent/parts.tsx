"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Shared pieces for the /agents/social-media page. Screenshots are real captures
// of the agent's dashboard (a sample account), in /public/social-agent.

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** A screenshot in the site's frame: hairline border on a mist mat. */
export function Screenshot({
  name,
  width,
  height,
  alt,
  sizes = "(min-width: 1024px) 700px, 100vw",
  priority,
  className,
}: {
  name: string
  width: number
  height: number
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={cn("rounded-[26px] border border-hairline bg-mist p-2", className)}>
      <div className="overflow-hidden rounded-[18px] border border-hairline bg-white">
        <Image
          src={`/social-agent/${name}.webp`}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}

export function PrimaryCta({ href, children, external = true, className }: { href: string; children: React.ReactNode; external?: boolean; className?: string }) {
  const cls = cn(
    "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto",
    className,
  )
  const inner = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">
        {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </>
  )
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

export function GhostCta({ href, children, external = false, className }: { href: string; children: React.ReactNode; external?: boolean; className?: string }) {
  const cls = cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto",
    className,
  )
  return external ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
