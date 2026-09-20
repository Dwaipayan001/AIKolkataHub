import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  CalendarDays,
  Check,
  Code2,
  Database,
  GraduationCap,
  Laptop2,
  Lightbulb,
  Mail,
  MessageCircleQuestion,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { DemoBookingForm } from '@/components/demo-booking-form';
import { LearningQuiz } from '@/components/learning-quiz';
import { SiteHeader } from '@/components/site-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { courses } from '@/lib/courses';
import { SITE_URL } from '@/lib/site';

const CONTACT_EMAIL = 'hellocodeadda@gmail.com';

const courseIcons = {
  'python-foundations': Code2,
  'ai-machine-learning': BrainCircuit,
  'agentic-ai-lab': Bot,
  'data-science-studio': Database,
};

const courseColors = {
  'python-foundations': 'blue',
  'ai-machine-learning': 'purple',
  'agentic-ai-lab': 'green',
  'data-science-studio': 'orange',
};

const projects = [
  {
    icon: MessageCircleQuestion,
    title: 'Smart Quiz Engine',
    copy: 'Build a Python quiz that responds to answers, tracks progress and explains mistakes.',
    label: 'Python · Logic · Data',
  },
  {
    icon: Bot,
    title: 'Study Planning Agent',
    copy: 'Create an AI assistant that turns a syllabus and deadlines into a practical weekly plan.',
    label: 'Agents · Tools · Memory',
  },
  {
    icon: BarChart3,
    title: 'Kolkata Data Story',
    copy: 'Explore a real dataset and communicate the most useful findings through an interactive dashboard.',
    label: 'pandas · Charts · Insight',
  },
];

const faqs = [
  {
    question: 'Does a student need prior coding experience?',
    answer:
      'No. Python Foundations starts from the beginning. Students with some coding experience can use the course finder or free demo to identify a more suitable starting point.',
  },
  {
    question: 'When and where are classes held?',
    answer:
      'Classes are live and online on Saturdays and Sundays. There are no weekday classes, so students can continue their regular school or college schedule.',
  },
  {
    question: 'Who guides the sessions?',
    answer:
      'Sessions are practitioner-led by mentors with hands-on experience in Generative AI and modern software workflows. AIKolkataHub is an independent learning initiative and does not imply endorsement by any employer.',
  },
  {
    question: 'Are these recorded video courses?',
    answer:
      'No. These are live, small-batch sessions with explanations, guided building, questions and mentor feedback. Students work on practical projects throughout each course.',
  },
  {
    question: 'What happens in the free demo?',
    answer:
      'The demo introduces the teaching style, includes a small practical activity and gives students space to ask questions. There is no payment or obligation to continue.',
  },
];

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'AIKolkataHub',
    url: `${SITE_URL}/`,
    description:
      'Weekend live online courses in Python, Agentic AI, Machine Learning and Data Science for school and college students.',
    areaServed: ['Kolkata', 'India'],
    email: CONTACT_EMAIL,
    knowsAbout: [
      'Python programming',
      'Agentic AI',
      'Generative AI',
      'Machine Learning',
      'Data Science',
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SiteHeader />

      <section className="hero" id="top">
        <article className="hero-copy">
          <p className="eyebrow">
            <Sparkles aria-hidden="true" /> Live online learning for young
            builders
          </p>
          <h1>
            Agentic AI and coding courses that turn curiosity into{' '}
            <em>real projects.</em>
          </h1>
          <p className="hero-lede">
            Learn Python, Agentic AI, Machine Learning and Data Science through
            clear explanations, guided practice and portfolio-ready builds—not
            passive video lessons.
          </p>
          <p className="weekend-callout">
            <CalendarDays aria-hidden="true" />
            <span>
              <strong>Weekend-only live classes</strong>Saturdays and Sundays ·
              Online from anywhere in India
            </span>
          </p>
          <p className="hero-actions">
            <Link className="primary-button" href="#enrol">
              Book a free demo <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="secondary-button" href="#course-finder">
              <PlayCircle aria-hidden="true" /> Find your course
            </Link>
          </p>
          <p className="hero-proof">
            <Check aria-hidden="true" /> Small batches{' '}
            <Check aria-hidden="true" /> Practitioner-led{' '}
            <Check aria-hidden="true" /> Project-first
          </p>
        </article>
        <figure className="hero-visual">
          <Image
            src="/ai-learning-hero.png"
            alt="Students learning Python, data science and AI agent development together online"
            width={1674}
            height={942}
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />
          <figcaption>
            <span>Live lab</span> Learn it, build it, explain it.
          </figcaption>
        </figure>
      </section>

      <section className="value-strip" aria-label="Course benefits">
        <p>
          <Laptop2 aria-hidden="true" />
          <strong>100% live online</strong>
          <span>Learn from home</span>
        </p>
        <p>
          <CalendarDays aria-hidden="true" />
          <strong>Weekend schedule</strong>
          <span>Weekdays stay free</span>
        </p>
        <p>
          <Users aria-hidden="true" />
          <strong>Small batches</strong>
          <span>Room to ask questions</span>
        </p>
        <p>
          <BookOpenCheck aria-hidden="true" />
          <strong>Real projects</strong>
          <span>Show what you can build</span>
        </p>
      </section>

      <section className="section programs-section" id="programs">
        <header className="section-heading">
          <p className="kicker">Choose your learning path</p>
          <h2>Start at your level. Build toward something meaningful.</h2>
          <p>
            Each course follows a clear progression from understanding a concept
            to applying it in a working project. Explore the details before you
            decide.
          </p>
        </header>
        <div className="program-grid">
          {courses.map((course) => {
            const Icon = courseIcons[course.slug as keyof typeof courseIcons];
            const color =
              courseColors[course.slug as keyof typeof courseColors];
            return (
              <article className={`program-card ${color}`} key={course.slug}>
                <p className="card-icon">
                  <Icon aria-hidden="true" />
                  <span>{course.code}</span>
                </p>
                <p className="course-audience">
                  {course.ageGroup} · {course.level}
                </p>
                <h3>{course.shortTitle}</h3>
                <p>{course.summary}</p>
                <p className="course-format">
                  <CalendarDays aria-hidden="true" /> {course.duration} ·{' '}
                  {course.format}
                </p>
                <Link href={`/courses/${course.slug}`}>
                  View course details <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="quiz-section" id="course-finder">
        <article className="quiz-intro">
          <p className="kicker">60-second course finder</p>
          <h2>Not sure where to begin?</h2>
          <p>
            Answer three simple questions about what you want to build, your
            current comfort level and how you like to learn.
          </p>
          <p>
            The result is a starting suggestion, not a commitment. We can
            discuss it with you during the free demo.
          </p>
          <p className="quiz-feature">
            <Target aria-hidden="true" /> Personalised starting point
          </p>
        </article>
        <LearningQuiz />
      </section>

      <section className="section build-section" id="projects">
        <figure className="project-visual">
          <Image
            src="/project-lab.png"
            alt="A colorful project lab showing Python code, analytics, AI agents and an application prototype"
            width={1456}
            height={1092}
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </figure>
        <article className="build-copy">
          <p className="kicker">Learning becomes visible</p>
          <h2>
            Students don&apos;t just hear about technology. They build with it.
          </h2>
          <p>
            Every topic is connected to an output a student can run, test,
            improve and explain. Projects begin with guidance and gradually
            leave more decisions to the learner.
          </p>
          <p>
            This approach develops coding skill as well as problem-solving,
            communication and the confidence to explore unfamiliar tools
            independently.
          </p>
          <Link className="text-link" href="/courses/agentic-ai-lab">
            Explore the Agentic AI curriculum <ArrowRight aria-hidden="true" />
          </Link>
        </article>
        <div className="project-grid">
          {projects.map(({ icon: Icon, title, copy, label }) => (
            <article className="project-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
              <small>{label}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="method-section">
        <header className="section-heading centered">
          <p className="kicker">How a weekend lab works</p>
          <h2>Understand. Practise. Build. Reflect.</h2>
          <p>
            A repeatable learning cycle makes advanced ideas approachable and
            helps students remember what they learn.
          </p>
        </header>
        <ol className="method-steps">
          <li>
            <span>01</span>
            <Lightbulb aria-hidden="true" />
            <h3>Understand</h3>
            <p>
              A mentor explains one focused idea with visual examples and plain
              language.
            </p>
          </li>
          <li>
            <span>02</span>
            <Code2 aria-hidden="true" />
            <h3>Practise</h3>
            <p>
              Students try a guided task, ask questions and learn how to read
              mistakes.
            </p>
          </li>
          <li>
            <span>03</span>
            <Network aria-hidden="true" />
            <h3>Build</h3>
            <p>
              The concept becomes part of an application, model, analysis or AI
              workflow.
            </p>
          </li>
          <li>
            <span>04</span>
            <GraduationCap aria-hidden="true" />
            <h3>Explain</h3>
            <p>
              Students present their decisions and receive practical feedback
              for improvement.
            </p>
          </li>
        </ol>
      </section>

      <section className="weekend-section">
        <article>
          <p className="kicker">Built around student life</p>
          <h2>Keep weekdays for school and college. Build on weekends.</h2>
          <p>
            All sessions run online on Saturdays and Sundays. Students avoid
            weekday travel and scheduling pressure while still receiving live
            guidance, peer interaction and mentor feedback.
          </p>
          <p>
            Because classes are online, learners across Kolkata and the rest of
            India can participate from a familiar study environment.
          </p>
        </article>
        <aside aria-label="Weekend class format">
          <p>
            <span>Saturday</span>
            <strong>Learn and practise</strong>Understand the week&apos;s key
            idea through guided examples and short exercises.
          </p>
          <p>
            <span>Sunday</span>
            <strong>Build and review</strong>Apply the idea in a project,
            troubleshoot problems and review progress.
          </p>
        </aside>
      </section>

      <section className="trust-section" id="mentors">
        <article>
          <p className="kicker">Practical guidance, responsibly presented</p>
          <h2>Learn from people who work hands-on with modern GenAI.</h2>
          <p>
            Our mentors bring practical experience with Generative AI, software
            delivery and real-world technical constraints into the classroom.
            Lessons focus on sound engineering judgment rather than hype.
          </p>
          <p>
            Instructor identities are kept private for professional reasons.
            AIKolkataHub is an independent learning initiative and does not
            claim endorsement by any employer.
          </p>
        </article>
        <div className="trust-points">
          <p>
            <BrainCircuit aria-hidden="true" />
            <span>
              <strong>Current technical context</strong>Learn how modern AI
              workflows are actually designed and evaluated.
            </span>
          </p>
          <p>
            <ShieldCheck aria-hidden="true" />
            <span>
              <strong>Responsible AI habits</strong>Use validation, permission
              boundaries and human review from the beginning.
            </span>
          </p>
          <p>
            <Sparkles aria-hidden="true" />
            <span>
              <strong>Clear, student-friendly teaching</strong>Complex ideas are
              broken into practical steps without unnecessary jargon.
            </span>
          </p>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <header>
          <p className="kicker">Questions, answered</p>
          <h2>Know what to expect before you join.</h2>
          <p>
            If your question is not covered here, send it with your demo request
            and we will reply directly.
          </p>
        </header>
        <Accordion className="faq-list">
          {faqs.map((faq, index) => (
            <AccordionItem value={`faq-${index}`} key={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="enrol-section" id="enrol">
        <article className="contact-intro">
          <p className="kicker">Free live demo</p>
          <h2>Experience the teaching style before deciding.</h2>
          <p>
            Meet a mentor, try a short learning activity and discuss which
            course fits your current level and goals. No payment is required to
            request a demo.
          </p>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            <Mail aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
          <p className="contact-note">
            Weekend-only batches · Live online · Students across India welcome
          </p>
        </article>
        <DemoBookingForm />
      </section>

      <footer>
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Sparkles aria-hidden="true" />
          </span>
          <span>
            AIKolkata<span>Hub</span>
          </span>
        </Link>
        <p>
          Live weekend courses in Python, Agentic AI, Machine Learning and Data
          Science.
        </p>
        <nav aria-label="Footer navigation">
          <Link href="#programs">Courses</Link>
          <Link href="#course-finder">Course finder</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#enrol">Contact</Link>
        </nav>
        <small>© 2026 AIKolkataHub</small>
      </footer>
    </main>
  );
}
