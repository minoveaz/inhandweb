import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { STATIC_ROUTES } from '../config/routes';
import { SeoHead } from '../components/organisms/SeoHead';
import {
  Card,
  Badge,
  TextField,
  Select,
  Textarea,
  Button,
  Alert,
} from '../components/ui';

export const ForCommunities: React.FC = () => {
  const { locale, t } = useLocale();
  const routeMeta = STATIC_ROUTES.communities;
  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [estimatedUnits, setEstimatedUnits] = useState('');
  const [projectType, setProjectType] = useState(t.communities.projectTypes[0] || '');
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypeOptions = t.communities.projectTypes.map((pt) => ({
    value: pt,
    label: pt,
  }));

  return (
    <>
      <SeoHead
        title={routeMeta.title[locale]}
        description={routeMeta.description[locale]}
        image="/images/brand/communities-boxes.jpg"
      />

      {/* Hero */}
      <section className="ih-gradient-warm-cream border-b border-ih-border py-16 sm:py-24">
        <div className="ih-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
              {t.communities.eyebrow}
            </span>
            <h1 className="ds-heading font-bold">
              {t.communities.title}
            </h1>
            <p className="text-base text-ih-muted leading-relaxed">
              {t.communities.subtitle}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-card overflow-hidden border border-ih-border aspect-[16/10] bg-ih-raised">
              <img
                src="/images/brand/communities-boxes.jpg"
                alt="INHAND For Communities"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24 ih-container">
        <h2 className="ds-subheading font-bold mb-10">
          {t.communities.useCasesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.communities.useCases.map((uc) => (
            <Card
              key={uc.title}
              className="p-7 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Badge tone="accent" showSymbol={false}>
                  {uc.tag}
                </Badge>
                <h3 className="text-xl font-display text-ih-cobalt">
                  {uc.title}
                </h3>
                <p className="text-sm text-ih-muted leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-16 sm:py-24 bg-ih-soft/55 border-y border-ih-border">
        <div className="ih-container">
          <h2 className="ds-subheading font-bold mb-10">
            {t.communities.processTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.communities.steps.map((s) => (
              <Card
                key={s.step}
                className="p-7 space-y-3"
              >
                <span className="text-sm font-bold text-ih-coral block">
                  {s.step}
                </span>
                <h3 className="text-xl font-display text-ih-cobalt">{s.title}</h3>
                <p className="text-sm text-ih-muted leading-relaxed">
                  {s.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Inquiry Form (Slide 10, 11, 13, 14: FormField + Select + Textarea with counter) */}
      <section className="py-16 sm:py-24 max-w-3xl mx-auto px-5 sm:px-8">
        <Card className="p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <h2 className="ds-subheading font-bold">
              {t.communities.formTitle}
            </h2>
            <p className="text-sm text-ih-muted">{t.communities.formSubtitle}</p>
          </div>

          {submitted ? (
            <Alert tone="success" title="Solicitud enviada con éxito">
              {t.communities.successMessage}
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label={t.communities.orgName}
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <TextField
                  label={t.communities.contactName}
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  type="email"
                  label={t.communities.email}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label={t.communities.estimatedUnits}
                  required
                  placeholder="25 - 500"
                  value={estimatedUnits}
                  onChange={(e) => setEstimatedUnits(e.target.value)}
                />
              </div>

              <Select
                label={t.communities.projectType}
                options={projectTypeOptions}
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              />

              <Textarea
                label={t.communities.message}
                maxLength={500}
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                {t.communities.submitButton}
              </Button>
            </form>
          )}
        </Card>
      </section>
    </>
  );
};
