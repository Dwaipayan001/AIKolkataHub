import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Clock3,
  Code2,
  Download,
  MapPin,
  MonitorUp,
  Terminal,
  Users,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CourseRoadmap } from '@/components/course-roadmap';
import { DemoBookingForm } from '@/components/demo-booking-form';
import { courses, getCourse } from '@/lib/courses';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: 'Course not found | AIKolkataHub' };
  const description = `${course.summary} Live online ${course.shortTitle} coaching for school and college students, held on Saturdays and Sundays.`;
  return {
    title: `${course.title} Course in Kolkata | AIKolkataHub`,
    description,
    alternates: { canonical: `/courses/${course.slug}` },
    keywords: [
      `${course.shortTitle} course Kolkata`,
      `${course.shortTitle} coaching for students`,
      'coding classes Kolkata',
      'AI courses Kolkata',
    ],
    openGraph: {
      title: `${course.title} | AIKolkataHub`,
      description,
      url: `/courses/${course.slug}`,
      type: 'website',
      locale: 'en_IN',
      images: [],
    },
    twitter: {
      card: 'summary',
      title: `${course.title} | AIKolkataHub`,
      description,
      images: [],
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className={`course-page ${course.accent}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.title,
            description: course.summary,
            provider: {
              '@type': 'EducationalOrganization',
              name: 'AIKolkataHub',
              areaServed: 'Kolkata, West Bengal',
            },
            educationalLevel: course.level,
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
            },
          }),
        }}
      />

      <header className="course-header">
        <Link href="/" className="brand" aria-label="AIKolkataHub home">
          <span className="brand-mark">
            <Terminal size={19} />
          </span>
          <span>
            AIKolkata<span>Hub</span>
          </span>
        </Link>
        <nav aria-label="Course navigation">
          <a href="#curriculum">Curriculum</a>
          <a href="#projects">Projects</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href="#enrol">
          Book a free demo <ArrowRight size={16} />
        </a>
      </header>

      <section className="course-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="course-breadcrumb">
          <Link href="/">
            <ArrowLeft size={14} /> All programs
          </Link>
          <span>/</span>
          <span>{course.code}</span>
        </div>
        <div className="course-hero-grid">
          <article className="course-hero-copy">
            <span className="eyebrow">
              <i /> {course.eyebrow}
            </span>
            <h1>{course.title}</h1>
            <p>{course.summary}</p>
            <div className="course-actions">
              <a className="primary-button" href="#enrol">
                Join a free demo <ArrowRight size={18} />
              </a>
              <a
                className="brochure-button"
                href={`/courses/${course.slug}/brochure`}
                download
              >
                <Download size={17} /> Download brochure
              </a>
              <a className="text-button" href="#curriculum">
                View curriculum
              </a>
            </div>
          </article>
          <aside className="course-spec-card" aria-label="Course details">
            <div className="spec-top">
              <span>{course.code}</span>
              <i>ENROLMENTS OPEN</i>
            </div>
            <dl>
              <div>
                <dt>
                  <Users /> Best for
                </dt>
                <dd>{course.ageGroup}</dd>
              </div>
              <div>
                <dt>
                  <Clock3 /> Duration
                </dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>
                  <MonitorUp /> Format
                </dt>
                <dd>{course.format}</dd>
              </div>
              <div>
                <dt>
                  <MapPin /> Location
                </dt>
                <dd>Online · Join from anywhere</dd>
              </div>
            </dl>
            <div className="spec-status">
              <span>Next step</span>
              <strong>Meet your mentor for free</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="course-intro course-shell">
        <article>
          <span className="kicker">{'// THE OUTCOME'}</span>
          <h2>{course.promise}</h2>
          <p>{course.overview}</p>
        </article>
        <aside>
          <h3>By the end, you can</h3>
          <ul>
            {course.outcomes.map((item) => (
              <li key={item}>
                <Check /> {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="curriculum-section" id="curriculum">
        <div className="course-shell">
          <header className="course-section-heading">
            <article>
              <span className="kicker">{'// COURSE ROADMAP'}</span>
              <h2>See the whole journey.</h2>
            </article>
            <p>
              Follow the road from your first guided lesson to an independent
              capstone. Every milestone explains the ideas, practical skills and
              result you can expect before moving ahead.
            </p>
          </header>
          <CourseRoadmap modules={course.modules} />
        </div>
      </section>

      <section className="projects-section course-shell" id="projects">
        <header className="course-section-heading">
          <article>
            <span className="kicker">{'// BUILD, TEST, SHOW'}</span>
            <h2>Portfolio projects.</h2>
          </article>
          <p>
            You won&apos;t finish with empty notes. These guided builds become
            clear proof of your skills and thinking.
          </p>
        </header>
        <div className="project-grid">
          {course.projects.map((project, index) => (
            <article key={project.title}>
              <div className="project-icon">
                {index === 1 ? <Bot /> : <Code2 />}
              </div>
              <span>PROJECT {String(index + 1).padStart(2, '0')}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.build}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="fit-section">
        <div className="course-shell fit-grid">
          <article>
            <span className="kicker">{'// IS THIS FOR YOU?'}</span>
            <h2>A strong fit for curious builders.</h2>
            <p>
              No inflated promises—just a clear path, mentor feedback and the
              practice needed to become independent.
            </p>
          </article>
          <ul>
            {course.idealFor.map((item) => (
              <li key={item}>
                <Check /> <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="toolbelt course-shell">
        <span className="kicker">{'// YOUR TOOLBELT'}</span>
        <header>
          {course.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </header>
      </section>

      <section className="course-faq course-shell" id="faq">
        <div>
          <span className="kicker">{'// COURSE FAQ'}</span>
          <h2>Know before you join.</h2>
        </div>
        <Accordion className="faq-list">
          {course.faqs.map((faq, index) => (
            <AccordionItem value={`faq-${index}`} key={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="course-enrol" id="enrol">
        <div className="enrol-grid" aria-hidden="true" />
        <div className="course-enrol-content">
          <article className="course-enrol-intro">
            <span className="kicker">{'// START WITH ZERO PRESSURE'}</span>
            <h2>Try the learning experience first.</h2>
            <p>
              Meet a mentor, see how the lab works and check whether{' '}
              {course.shortTitle} is the right path for you. Leave your details
              and we&apos;ll email you to arrange a free demo.
            </p>
            <small>
              Small student batches · Saturday &amp; Sunday classes · Live
              online
            </small>
          </article>
          <DemoBookingForm course={course.shortTitle} />
        </div>
      </section>

      <footer>
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Terminal size={19} />
          </span>
          <span>
            AIKolkata<span>Hub</span>
          </span>
        </Link>
        <p>{course.shortTitle} coaching for Kolkata&apos;s young builders.</p>
        <nav aria-label="Footer navigation">
          <Link href="/#programs">All programs</Link>
          <Link href="/#course-finder">Course finder</Link>
          <Link href="/#faq">General FAQ</Link>
        </nav>
        <span>© 2026 AIKolkataHub</span>
      </footer>
    </main>
  );
}
