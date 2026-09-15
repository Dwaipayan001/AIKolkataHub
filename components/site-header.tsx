'use client';

import Link from 'next/link';
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/#programs', label: 'Courses' },
  { href: '/#course-finder', label: 'Find your path' },
  { href: '/#projects', label: 'What you build' },
  { href: '/#faq', label: 'FAQ' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="AIKolkataHub home">
        <span className="brand-mark">
          <Sparkles aria-hidden="true" />
        </span>
        <span>
          AIKolkata<span>Hub</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="nav-cta" href="/#enrol">
        Book a free demo <ArrowRight aria-hidden="true" />
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#enrol" onClick={() => setOpen(false)}>
            Book a free demo
          </Link>
        </nav>
      )}
    </header>
  );
}
