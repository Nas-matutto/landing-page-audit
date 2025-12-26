import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Free Conversion Rate Calculator | Calculate Your Website CVR Instantly with Talk to me Data",
  description: "Calculate your website conversion rate in seconds. Free tool with industry benchmarks, personalized insights, and expert tips to boost conversions. Improve your CVR by 2% and increase sales by 50%.",
  keywords: "conversion rate calculator, CVR calculator, website conversion rate, calculate conversion rate, conversion optimization, improve conversion rate, conversion rate benchmarks",
  openGraph: {
    title: "Free Conversion Rate Calculator - Instant CVR Analysis",
    description: "Calculate your conversion rate and get expert insights to boost sales. Free tool with industry benchmarks and actionable optimization tips.",
    type: "website",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}