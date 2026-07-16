import Image from "next/image"
import { Star } from "lucide-react"

export type Testimonial = {
  quote: string
  author: string
  role: string
  company?: string
  /** Path under /public, e.g. "/avatars/user1.jpg". Falls back to initials. */
  avatar?: string
  /** 1–5, defaults to 5 */
  rating?: number
}

type Props = {
  testimonials: Testimonial[]
  heading?: string
  subhead?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// SCAFFOLD: renders nothing until you pass REAL testimonials. Do not invent
// quotes, names, or logos. When you have genuine customer feedback, pass an
// array like this from the page:
//
//   const TESTIMONIALS = [
//     {
//       quote: "We went from 0 to a full pipeline in two weeks…",
//       author: "Jane Doe", role: "Head of Sales", company: "Acme",
//       avatar: "/avatars/user1.jpg", rating: 5,
//     },
//   ]
//   <AgentTestimonialsSection testimonials={TESTIMONIALS} />
// ─────────────────────────────────────────────────────────────────────────────

export function AgentTestimonialsSection({
  testimonials,
  heading = "What teams say",
  subhead,
}: Props) {
  if (!testimonials.length) return null

  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">{heading}</h2>
            {subhead && <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">{subhead}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating ?? 5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-slate-600">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {t.author.split(" ").map(w => w[0]).slice(0, 2).join("")}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.author}</p>
                    <p className="text-xs text-slate-400">
                      {t.role}
                      {t.company ? ` · ${t.company}` : ""}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
