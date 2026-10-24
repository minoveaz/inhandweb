import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { STATIC_ROUTES } from '../config/routes';
import { SeoHead } from '../components/organisms/SeoHead';
import { Badge, Card } from '../components/ui';

export const Legal: React.FC = () => {
  const { locale } = useLocale();
  const routeMeta = STATIC_ROUTES.legal;

  return (
    <>
      <SeoHead
        title={routeMeta.title[locale]}
        description={routeMeta.description[locale]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 space-y-12">
        <div className="space-y-3 border-b border-ih-border pb-8">
          <Badge tone="accent" showSymbol={false}>
            INHAND · RGPD / LSSI-CE / TRLGDCU
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-ih-cobalt">
            {routeMeta.title[locale]}
          </h1>
        </div>

        <Card as="article" id="privacy" className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-ih-cobalt">
            {locale === 'es'
              ? '1. Política de Privacidad y Protección de Datos (RGPD)'
              : '1. Privacy Policy & GDPR Data Protection'}
          </h2>
          <p className="text-sm text-ih-muted leading-relaxed">
            {locale === 'es'
              ? 'En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018, los datos personales facilitados durante el proceso de compra o contacto se tratan exclusivamente para gestionar la entrega del pedido, emitir la factura correspondiente y atender tus consultas. INHAND no almacena en ningún caso números de tarjetas de crédito o débito (PAN/CVV): toda operación de cobro se delega mediante redirección segura a Stripe Payments Europe Ltd. o al TPV Virtual Redsys Servicios de Procesamiento S.L.'
              : 'In compliance with EU Regulation 2016/679 (GDPR), personal data provided during checkout or contact inquiries is processed strictly to fulfill your order, issue invoices, and provide customer care. INHAND never collects or stores credit/debit card numbers (PAN/CVV): all payment authorization is delegated via encrypted hosted redirects to Stripe Payments Europe Ltd. or Redsys Servicios de Procesamiento S.L.'}
          </p>
        </Card>

        <Card as="article" id="cookies" className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-ih-cobalt">
            {locale === 'es' ? '2. Política de Cookies' : '2. Cookie Policy'}
          </h2>
          <p className="text-sm text-ih-muted leading-relaxed">
            {locale === 'es'
              ? 'Utilizamos almacenamiento local técnico (localStorage) estrictamente necesario para conservar los productos añadidos a tu carrito de compra y recordar tu preferencia de idioma (ES / EN). No ejecutamos píxeles publicitarios invasivos de terceros sin tu consentimiento expreso.'
              : 'We use strictly necessary technical local storage (localStorage) to preserve items added to your shopping cart and remember your language preference (ES / EN). We do not run invasive third-party advertising trackers.'}
          </p>
        </Card>

        <Card as="article" id="terms" className="p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-ih-cobalt">
            {locale === 'es'
              ? '3. Condiciones de Venta, Impuestos y Derecho de Desistimiento'
              : '3. Terms of Sale, Taxes & 14-Day Right of Withdrawal'}
          </h2>
          <p className="text-sm text-ih-muted leading-relaxed">
            {locale === 'es'
              ? 'Todos los precios mostrados en INHAND están expresados en Euros (€) e incluyen el 21% de IVA aplicable en España. El envío estándar a España peninsular es gratuito para pedidos iguales o superiores a 50,00 € (4,90 € para pedidos inferiores). Conforme al Real Decreto Legislativo 1/2007 (TRLGDCU), el cliente dispone de un plazo de 14 días naturales desde la recepción del pedido para ejercer su derecho de desistimiento o devolución escribiendo a hola@inhand.design.'
              : 'All prices displayed on INHAND are in Euros (€) and include 21% Spanish VAT. Standard shipping in mainland Spain is free on orders of €50.00 or more (€4.90 on orders under €50). In accordance with EU consumer protection directives, customers have 14 calendar days from receipt to exercise their right of withdrawal or return by contacting hola@inhand.design.'}
          </p>
        </Card>
      </section>
    </>
  );
};
