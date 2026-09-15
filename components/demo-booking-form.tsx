'use client';

import { Send } from 'lucide-react';
import { type SyntheticEvent, useState } from 'react';

const CONTACT_EMAIL = 'hellocodeadda@gmail.com';
const COURSE_OPTIONS = [
  'Python Foundations',
  'AI & Machine Learning',
  'Agentic AI Lab',
  'Data Science Studio',
];

type Props = { course?: string };

export function DemoBookingForm({ course }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (field: string) => {
      const entry = formData.get(field);
      return typeof entry === 'string' ? entry.trim() : '';
    };

    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'demo',
          name: value('name'),
          email: value('email'),
          phone: value('phone'),
          course: course ?? value('course'),
          message: value('message'),
          website: value('website'),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || 'We could not send your request.');
      }

      form.reset();
      setStatus('sent');
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'We could not send your request. Please try again.',
      );
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="contact-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="contact-field-row">
        <label>
          <span>Your name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Enter your name"
            maxLength={100}
            required
          />
        </label>
        <label>
          <span>Your email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
            required
          />
        </label>
      </div>
      <label>
        <span>Your phone number</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Include country code if outside India"
          maxLength={30}
          required
        />
      </label>
      {course ? (
        <p className="form-course">Free demo for {course}</p>
      ) : (
        <label>
          <span>Which course interests you?</span>
          <select name="course" defaultValue="" required>
            <option value="" disabled>
              Select a course
            </option>
            {COURSE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Not sure yet / General enquiry">Not sure yet</option>
          </select>
        </label>
      )}
      <label>
        <span>
          Anything you would like to ask? <small>(optional)</small>
        </span>
        <textarea
          name="message"
          rows={3}
          maxLength={2500}
          placeholder="Tell us what you hope to learn..."
        />
      </label>
      <button
        className="primary-button large"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Request a free demo'}{' '}
        <Send size={18} />
      </button>
      <p className="form-note">
        We&apos;ll email you to arrange a time. No payment is required.
      </p>
      {status === 'sent' && (
        <output className="form-status success">
          Request sent. We&apos;ll email you to arrange your demo.
        </output>
      )}
      {status === 'error' && (
        <p className="form-status error" role="alert">
          {error} You can also email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}
    </form>
  );
}
