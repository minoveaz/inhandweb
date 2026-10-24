import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { STATIC_ROUTES } from '../config/routes';
import { SeoHead } from '../components/organisms/SeoHead';
import {
  Card,
  TextField,
  Textarea,
  Button,
  Alert,
  Accordion,
} from '../components/ui';

export const Contact: React.FC = () => {
  const { locale, t } = useLocale();
  const routeMeta = STATIC_ROUTES.contact;
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const faqAccordionItems = t.contact.faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.q,
    content: <p className="text-xs sm:text-sm text-ih-muted leading-relaxed">{faq.a}</p>,
  }));

  return (
    <>
      <SeoHead
        title={routeMeta.title[locale]}
        description={routeMeta.description[locale]}
      />

      <section className="py-16 sm:py-24 ih-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Studio Info + FAQs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
                {t.contact.eyebrow}
              </span>
              <h1 className="ds-heading font-bold">
                {t.contact.title}
              </h1>
              <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ih-coral">
                  {t.contact.directEmailLabel}
                </span>
                <p className="text-sm font-bold text-ih-cobalt">
                  hola@inhand.design
                </p>
              </Card>
              <Card className="p-5 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ih-coral">
                  {t.contact.hoursLabel}
                </span>
                <p className="text-sm font-bold text-ih-cobalt">
                  {t.contact.hoursValue}
                </p>
              </Card>
              <Card className="sm:col-span-2 p-5 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ih-coral">
                  {t.contact.studioLocationLabel}
                </span>
                <p className="text-sm font-bold text-ih-cobalt">
                  {t.contact.studioLocationValue}
                </p>
              </Card>
            </div>

            {/* FAQs Accordion */}
            <div className="pt-4 space-y-4">
              <h2 className="ds-subheading font-bold">
                {t.contact.faqTitle}
              </h2>
              <Accordion items={faqAccordionItems} />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <Card className="p-8 sm:p-10 space-y-6">
              <h2 className="ds-subheading font-bold">
                {t.contact.formTitle}
              </h2>

              {sent ? (
                <Alert tone="success" title="Mensaje enviado">
                  {t.contact.sentSuccess}
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <TextField
                    label={t.contact.nameLabel}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    type="email"
                    label={t.contact.emailLabel}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label={t.contact.subjectLabel}
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <Textarea
                    label={t.contact.messageLabel}
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {t.contact.sendButton}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
