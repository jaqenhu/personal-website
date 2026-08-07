import { useState } from 'react'
import { profile } from '../data.js'
import { useReveal } from '../hooks/useReveal.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

export default function Contact() {
  const ref = useReveal()
  const [status, setStatus] = useState('idle')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') || '').trim()

    if (!EMAIL_PATTERN.test(email)) {
      setEmailError('Please enter a valid email address.')
      form.elements.email.focus()
      return
    }

    setEmailError('')

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (formData.get('_honey')) return

    setStatus('sending')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: String(formData.get('name') || '').trim(),
            email,
            message: String(formData.get('message') || '').trim(),
            _subject: 'New portfolio inquiry',
            _template: 'table',
          }),
        },
      )

      const result = await response.json()
      if (
        !response.ok ||
        result.success === false ||
        result.success === 'false'
      ) {
        throw new Error('Message delivery failed')
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner reveal" ref={ref}>
        <div className="contact__main">
          <div className="contact__intro">
            <span className="contact__kicker">04 — GET IN TOUCH</span>
            <h2 className="contact__title">
              Got an idea?
              <br />
              <a href={`mailto:${profile.email}`} className="contact__title-link">
                Let's talk<span className="contact__arrow">→</span>
              </a>
            </h2>
            <p className="contact__note">
              Technical exchange · project collaboration · open-source
              co-creation — always happy to hear from you.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__fields">
              <div className="contact-form__field">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  aria-label="Name"
                  autoComplete="name"
                  maxLength="80"
                  required
                />
              </div>
              <div className="contact-form__field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={emailError ? 'true' : 'false'}
                  aria-describedby={emailError ? 'contact-email-error' : undefined}
                  autoComplete="email"
                  maxLength="160"
                  onChange={() => emailError && setEmailError('')}
                  onBlur={(event) => {
                    const value = event.currentTarget.value.trim()
                    if (value && !EMAIL_PATTERN.test(value)) {
                      setEmailError('Please enter a valid email address.')
                    }
                  }}
                  required
                />
                {emailError && (
                  <p
                    id="contact-email-error"
                    className="contact-form__field-error"
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </div>
              <div className="contact-form__field">
                <textarea
                  name="message"
                  placeholder="Message"
                  aria-label="Message"
                  rows="6"
                  maxLength="2000"
                  required
                />
              </div>
              <input
                className="contact-form__honey"
                type="text"
                name="_honey"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />
            </div>

            <div className="contact-form__footer">
              <button
                type="submit"
                className="contact-form__submit"
                disabled={status === 'sending'}
              >
                <span className="contact-form__submit-dot" aria-hidden="true" />
                <span>{status === 'sending' ? 'SENDING' : 'SEND'}</span>
                <span aria-hidden="true">→</span>
              </button>
              <p
                className={`contact-form__status contact-form__status--${status}`}
                aria-live="polite"
              >
                {status === 'success' && 'Message sent successfully.'}
                {status === 'error' &&
                  'Unable to send. Please try again or email me directly.'}
              </p>
            </div>
          </form>
        </div>

        <div className="contact__channels">
          <a href={`mailto:${profile.email}`} className="contact__channel">
            <span className="contact__channel-label contact__channel-label--strong">
              <span
                className="contact__channel-icon contact__channel-icon--email"
                aria-hidden="true"
              />
              EMAIL
            </span>
            <span className="contact__channel-value">{profile.email}</span>
          </a>
          <a
            href={`tel:${profile.phone.replaceAll('-', '')}`}
            className="contact__channel contact__channel--phone"
          >
            <span className="contact__channel-label contact__channel-label--saul">
              Better call Jaqen
            </span>
            <span className="contact__channel-value">{profile.phone}</span>
          </a>
          <div className="contact__channel">
            <span className="contact__channel-label contact__channel-label--strong">
              <span
                className="contact__channel-icon contact__channel-icon--location"
                aria-hidden="true"
              />
              LOCATION
            </span>
            <span className="contact__channel-value">{profile.location}</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© 2026 {profile.name} · {profile.alias}</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </section>
  )
}
