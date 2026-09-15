import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Agentic AI Coaching in Kolkata | AIKolkataHub',
  description:
    'Live weekend courses in Agentic AI, Generative AI, Python, Machine Learning and Data Science for school and college students in Kolkata and across India.',
  keywords: [
    'Agentic AI coaching Kolkata',
    'Agentic AI course Kolkata',
    'Generative AI course Kolkata',
    'Python coaching Kolkata',
    'AI course for students Kolkata',
    'Machine Learning coaching Kolkata',
    'Data Science classes Kolkata',
    'coding classes for school students Kolkata',
    'artificial intelligence training Kolkata',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Agentic AI Coaching in Kolkata | AIKolkataHub',
    description:
      'Live, project-based weekend courses in Agentic AI, Python, Machine Learning and Data Science for students in Kolkata and across India.',
    url: '/',
    siteName: 'AIKolkataHub',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
