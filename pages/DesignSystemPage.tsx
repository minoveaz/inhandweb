import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { INHAND_TOKENS } from '../config/tokens';
import { SeoHead } from '../components/organisms/SeoHead';
import {
  Button,
  LinkText,
  IconButton,
  ToggleButton,
  TextField,
  Checkbox,
  RadioGroup,
  Switch,
  Breadcrumb,
  Tabs,
  Card,
  Badge,
  Tag,
  Avatar,
  Accordion,
  Metadata,
  Select,
  Combobox,
  MultiSelect,
  Textarea,
  DateField,
  FileUpload,
  SearchField,
  FilterChip,
  SortSelect,
  ResultCount,
  Tooltip,
  Alert,
  Modal,
  Skeleton,
  Spinner,
  Progress,
  EmptyState,
  ErrorState,
  DataTable,
  Pagination,
  Stepper,
  Price,
  Availability,
  QuantityInput,
  VariantSelector,
} from '../components/ui';

export const DesignSystemPage: React.FC = () => {
  const { locale } = useLocale();

  // Interactive demo states
  const [favPressed, setFavPressed] = useState(true);
  const [switchNotifications, setSwitchNotifications] = useState(true);
  const [checkedTerms, setCheckedTerms] = useState(true);
  const [radioPurpose, setRadioPurpose] = useState('gift');
  const [cityQuery, setCityQuery] = useState('Madrid');
  const [multiInterests, setMultiInterests] = useState<string[]>(['Diseño', 'Fe']);
  const [giftNote, setGiftNote] = useState('Gracias por estar siempre cerca.');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-24');
  const [modalOpen, setModalOpen] = useState(false);
  const [pageIdx, setPageIdx] = useState(1);
  const [qtyDemo, setQtyDemo] = useState(1);
  const [variantDemo, setVariantDemo] = useState('gracia-blue');
  const [searchDemo, setSearchDemo] = useState('regalo');
  const [sortDemo, setSortDemo] = useState('featured');

  const colorTokens = [
    { name: 'brand.primary', hex: INHAND_TOKENS.color.brand.primary, role: 'Marca / Acción Principal' },
    { name: 'brand.dark', hex: INHAND_TOKENS.color.brand.dark, role: 'Hover Acción' },
    { name: 'surface.canvas', hex: INHAND_TOKENS.color.surface.canvas, role: 'Lienzo Base' },
    { name: 'surface.raised', hex: INHAND_TOKENS.color.surface.raised, role: 'Superficie / Tarjeta' },
    { name: 'surface.soft', hex: INHAND_TOKENS.color.surface.soft, role: 'Superficie Suave' },
    { name: 'text.primary', hex: INHAND_TOKENS.color.text.primary, role: 'Texto Principal' },
    { name: 'text.secondary', hex: INHAND_TOKENS.color.text.secondary, role: 'Texto Secundario' },
    { name: 'accent.decorative', hex: INHAND_TOKENS.color.accent.decorative, role: 'Acento Coral' },
    { name: 'accent.soft', hex: INHAND_TOKENS.color.accent.soft, role: 'Acento Suave' },
    { name: 'border.subtle', hex: INHAND_TOKENS.color.border.subtle, role: 'Borde Sutil (1px)' },
    { name: 'border.control', hex: INHAND_TOKENS.color.border.control, role: 'Borde Controles' },
    { name: 'focus', hex: INHAND_TOKENS.color.focus, role: 'Anillo Foco Teclado' },
  ];

  return (
    <>
      <SeoHead
        title="INHAND Design System v0.1 — Tokens & 57 Components"
        description="Catálogo interactivo de fundamentos, tokens semánticos y los 57 componentes P1–P4 del sistema de diseño INHAND."
      />

      {/* Hero Header (Slide 01 & 02) */}
      <section className="bg-ih-cream border-b border-ih-border py-12 sm:py-16">
        <div className="ih-container space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ih-border pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-cobalt">
              INHAND · DESIGN SYSTEM V0.1
            </span>
            <Badge tone="accent">57 Componentes · P1–P4 Implementados</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <h1 className="ds-display font-bold">
                {locale === 'es'
                  ? 'Una misma voz. Muchas formas de construir.'
                  : 'One shared voice. Many ways to build.'}
              </h1>
              <p className="text-base sm:text-lg text-ih-muted max-w-2xl">
                {locale === 'es'
                  ? 'Catálogo interactivo en React de los fundamentos, tokens semánticos (--inhand-*) y los 57 componentes organizados por prioridad (P1 a P4).'
                  : 'Interactive React catalog of foundations, semantic tokens (--inhand-*), and all 57 components organized by priority (P1 to P4).'}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              {[
                { num: '01', title: 'Fundamentos', desc: 'Color, tipo, espacio, forma' },
                { num: '02', title: 'Componentes', desc: 'Controles, estados, capas' },
                { num: '03', title: 'Composición', desc: 'Búsqueda, producto, compra' },
              ].map((p, i) => (
                <div
                  key={p.num}
                  className={`rounded-card p-4 border ${
                    i === 0
                      ? 'bg-ih-cobalt text-ih-on-action border-ih-cobalt'
                      : 'bg-ih-raised text-ih-cobalt border-ih-border'
                  }`}
                >
                  <span className="text-xs font-bold text-ih-coral block">{p.num}</span>
                  <p className="font-display text-base mt-1">{p.title}</p>
                  <p className={`text-[11px] mt-1 ${i === 0 ? 'text-ih-on-action/80' : 'text-ih-muted'}`}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ih-container py-12 sm:py-16 space-y-20">
        {/* =================================================================
            00. FOUNDATIONS & TOKENS (Slides 03–06)
        ================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-ih-border pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ih-coral">
              FUNDAMENTOS · LÁMINAS 03–06
            </span>
            <h2 className="ds-heading font-bold mt-1">
              Tokens Semánticos de Color, Tipografía, Espacio y Forma
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {colorTokens.map((tok) => (
              <div key={tok.name} className="ds-card p-3 space-y-2">
                <div
                  className="h-14 w-full rounded-control border border-ih-border"
                  style={{ backgroundColor: tok.hex }}
                />
                <div>
                  <p className="text-xs font-bold text-ih-cobalt">{tok.role}</p>
                  <p className="text-[11px] font-mono text-ih-muted">
                    {tok.hex} · {tok.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Semantic Status Badges & Radii */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-display text-ih-cobalt">
                Estados Semánticos (Siempre con icono + texto · Lámina 03)
              </h3>
              <div className="flex flex-wrap gap-2.5">
                <Badge tone="success">Correcto / Disponible</Badge>
                <Badge tone="warning">Revisar / Pocas unidades</Badge>
                <Badge tone="error">Error / Agotado</Badge>
                <Badge tone="info">Información</Badge>
                <Badge tone="neutral">Neutro</Badge>
                <Badge tone="accent">Novedad First Drop</Badge>
              </div>
              <p className="ds-helper">
                Contraste Azul (#092B8B) sobre Crema (#FBF6EE): 11.3:1. Objetivo mínimo texto normal: 4.5:1.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-display text-ih-cobalt">
                Radios, Alturas de Control y Movimiento (Lámina 06)
              </h3>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-control border border-ih-border-control bg-ih-cream">
                  <strong className="block text-ih-cobalt">Control</strong>
                  <span className="font-mono text-ih-muted">radius.control: 4px</span>
                </div>
                <div className="p-3 rounded-card border border-ih-border bg-ih-cream">
                  <strong className="block text-ih-cobalt">Tarjeta</strong>
                  <span className="font-mono text-ih-muted">radius.card: 8px</span>
                </div>
                <div className="p-3 rounded-dialog border border-ih-border bg-ih-cream shadow-floating">
                  <strong className="block text-ih-cobalt">Ventana</strong>
                  <span className="font-mono text-ih-muted">radius.dialog: 12px</span>
                </div>
              </div>
              <p className="ds-helper">
                Alturas: sm (36px), md (44px), lg (52px). Área táctil: 44×44px. Movimiento: 160ms estados / 240ms paneles.
              </p>
            </Card>
          </div>
        </section>

        {/* =================================================================
            P1. SHARED BASE PRIMITIVES (Slides 08–12)
        ================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-ih-border pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ih-coral">
              PRIORIDAD P1 · LÁMINAS 08–12
            </span>
            <h2 className="ds-heading font-bold mt-1">
              01. Base Compartida (Button, Link, IconButton, ToggleButton, TextField, Checkbox, Radio, Switch)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Buttons & IconButtons */}
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-display text-ih-cobalt">
                Botones, Tamaños y Estados (Lámina 08 & 09)
              </h3>

              <div className="space-y-2">
                <span className="ds-helper uppercase font-bold block">Variantes y Estados</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Guardar (Primario)</Button>
                  <Button variant="secondary">Cancelar (Secundario)</Button>
                  <Button variant="destructive">Eliminar (Destructivo)</Button>
                  <Button variant="primary" loading loadingText="Guardando">
                    Guardar
                  </Button>
                  <Button variant="primary" disabled>
                    Desactivado
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="ds-helper uppercase font-bold block">Tamaños (36px / 44px / 52px)</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Pequeño (sm)</Button>
                  <Button size="md">Mediano (md)</Button>
                  <Button size="lg">Grande (lg)</Button>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-ih-border">
                <span className="ds-helper uppercase font-bold block">
                  Enlaces, IconButton (44×44px) y ToggleButton (Lámina 09)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <LinkText href="#p2">Ver la colección</LinkText>
                  <LinkText href="https://inhand.design" external>
                    Leer nuestra historia
                  </LinkText>
                  <IconButton label="Anterior">←</IconButton>
                  <IconButton label="Siguiente">→</IconButton>
                  <Tooltip content="Guardar pieza en favoritos">
                    <ToggleButton
                      pressed={favPressed}
                      onPressedChange={setFavPressed}
                      label="Favorito"
                    />
                  </Tooltip>
                </div>
              </div>
            </Card>

            {/* TextField & Selection Primitives */}
            <Card className="p-6 space-y-5">
              <h3 className="text-lg font-display text-ih-cobalt">
                Campos de Texto y Estados de Validación (Lámina 10)
              </h3>
              <TextField
                label="Nombre completo"
                placeholder="Escribe tu nombre"
                defaultValue="Ana García"
                description="Tal como quieres que aparezca en el envío."
              />
              <TextField
                label="Correo electrónico (Estado con error recuperable)"
                defaultValue="ana@"
                error="Falta el dominio. Por ejemplo, ana@ejemplo.es."
              />
              <TextField
                label="Referencia (Solo lectura)"
                value="IH-00024"
                readOnly
                description="Este dato procede del pedido y no se puede editar."
              />
            </Card>

            {/* Checkbox, RadioGroup & Switch */}
            <Card className="p-6 space-y-5 lg:col-span-2">
              <h3 className="text-lg font-display text-ih-cobalt">
                Checkbox, RadioGroup y Switch (Lámina 12)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <span className="ds-label block">Varias opciones (Checkbox)</span>
                  <Checkbox
                    label="Novedades de colección"
                    checked={checkedTerms}
                    onChange={(e) => setCheckedTerms(e.target.checked)}
                  />
                  <Checkbox label="Grupo parcial (Indeterminado)" indeterminate readOnly />
                  <Checkbox
                    label="He leído la información sobre el uso de mis datos."
                    description="Las preferencias no se premarcan por defecto."
                  />
                </div>

                <RadioGroup
                  name="ds-purpose"
                  legend="Una sola opción (RadioGroup)"
                  value={radioPurpose}
                  onChange={setRadioPurpose}
                  options={[
                    { value: 'personal', label: 'Para mi espacio', description: 'Uso cotidiano en casa' },
                    { value: 'gift', label: 'Para regalar', description: 'Incluye tarjeta sin precio' },
                    { value: 'community', label: 'Para mi iglesia / evento', description: 'Desde 25 unidades' },
                  ]}
                />

                <div className="space-y-4">
                  <span className="ds-label block">Preferencia inmediata (Switch)</span>
                  <Switch
                    label="Avisos de seguimiento activados"
                    description="Aplica el cambio al instante."
                    checked={switchNotifications}
                    onCheckedChange={setSwitchNotifications}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* =================================================================
            P2. NAVIGATION & CONTENT (Slides 15, 18, 19, 20)
        ================================================================= */}
        <section id="p2" className="space-y-8">
          <div className="border-b border-ih-border pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ih-coral">
              PRIORIDAD P2 · LÁMINAS 15, 18–20
            </span>
            <h2 className="ds-heading font-bold mt-1">
              02. Navegación y Contenido (Breadcrumb, Tabs, Avatar, Metadata, Accordion)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-display text-ih-cobalt">
                Migas de Pan (Breadcrumb) y Pestañas (Tabs · Lámina 15)
              </h3>
              <Breadcrumb
                items={[
                  { label: 'Inicio', to: '/' },
                  { label: 'Colección', to: '/tienda' },
                  { label: 'Para regalar' },
                ]}
              />

              <Tabs
                tabs={[
                  {
                    id: 'desc',
                    label: 'Descripción',
                    content: (
                      <p className="text-sm text-ih-muted">
                        Las pestañas cambian paneles dentro de un mismo contexto sin recargar la ruta.
                      </p>
                    ),
                  },
                  {
                    id: 'details',
                    label: 'Detalles',
                    content: (
                      <div className="space-y-1">
                        <Metadata label="Material" value="PLA Técnico + Acabado Mate" />
                        <Metadata label="Origen" value="Estudio INHAND · Madrid" />
                      </div>
                    ),
                  },
                  {
                    id: 'care',
                    label: 'Cuidados',
                    content: (
                      <p className="text-sm text-ih-muted">
                        Limpiar la superficie con un paño suave y seco.
                      </p>
                    ),
                  },
                ]}
              />

              <div className="pt-3 border-t border-ih-border flex items-center gap-4">
                <Avatar name="Ana García" size="md" />
                <div>
                  <p className="text-sm font-bold text-ih-text">Ana García</p>
                  <p className="ds-helper">Miembro de la comunidad · Avatar con iniciales</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-display text-ih-cobalt">
                Acordeones y Divulgación (Accordion · Lámina 20)
              </h3>
              <Accordion
                defaultOpenIds={['a1']}
                items={[
                  {
                    id: 'a1',
                    title: '¿Cómo cuidar tu pieza?',
                    content:
                      'Limpia la superficie con un paño suave y seco. Consulta las indicaciones específicas de cada material.',
                  },
                  {
                    id: 'a2',
                    title: '¿Puedo añadir un mensaje de regalo?',
                    content:
                      'Sí. Durante el checkout puedes incluir una dedicatoria personal y enviamos el pedido sin importes impresos.',
                  },
                  {
                    id: 'a3',
                    title: '¿Guardáis datos de tarjetas bancarias?',
                    content:
                      'Nunca. El pago se realiza mediante redirección segura a Stripe Checkout o al TPV Virtual Redsys (Tarjeta y Bizum).',
                  },
                ]}
              />
            </Card>
          </div>
        </section>

        {/* =================================================================
            P3. INTERACTION, SEARCH, FILTERS, OVERLAYS & STATES (Slides 11, 13, 16, 23–25)
        ================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-ih-border pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ih-coral">
              PRIORIDAD P3 · LÁMINAS 11, 13, 16, 17, 23–25
            </span>
            <h2 className="ds-heading font-bold mt-1">
              03. Interacción Completa (Select, Combobox, MultiSelect, Textarea, Date, File, Alert, Modal, Estados)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 space-y-5">
              <h3 className="text-lg font-display text-ih-cobalt">
                Selección, Autocompletado y Multiselección (Lámina 11)
              </h3>
              <Select
                label="País"
                options={[
                  { value: 'ES', label: 'España' },
                  { value: 'PT', label: 'Portugal' },
                  { value: 'FR', label: 'Francia' },
                  { value: 'IT', label: 'Italia' },
                ]}
              />
              <Combobox
                label="Buscar localidad (Combobox con teclado)"
                options={['Madrid', 'Majadahonda', 'Manzanares el Real', 'Málaga', 'Barcelona', 'Valencia']}
                value={cityQuery}
                onChange={setCityQuery}
              />
              <MultiSelect
                label="Intereses (Multiselección con etiquetas removibles)"
                options={['Diseño', 'Fe', 'Hogar', 'Lectura', 'Comunidad']}
                selected={multiInterests}
                onChange={setMultiInterests}
              />
            </Card>

            <Card className="p-6 space-y-5">
              <h3 className="text-lg font-display text-ih-cobalt">
                Texto Largo, Fecha y Archivos (Lámina 13)
              </h3>
              <Textarea
                label="Mensaje para el regalo"
                maxLength={200}
                rows={3}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
              />
              <DateField
                label="Fecha estimada para vuestro evento"
                value={deliveryDate}
                onChange={setDeliveryDate}
              />
              <FileUpload label="Logotipo o identidad visual de la comunidad (opcional)" />
            </Card>

            {/* Search, FilterChips, SortSelect & ResultCount (Slide 16) */}
            <Card className="p-6 space-y-5 lg:col-span-2">
              <h3 className="text-lg font-display text-ih-cobalt">
                Búsqueda, Filtros y Orden (Lámina 16)
              </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <SearchField
                  value={searchDemo}
                  onChange={setSearchDemo}
                  className="w-full md:w-80"
                />
                <div className="flex flex-wrap gap-2">
                  <FilterChip label="Todos" selected={false} onSelect={() => {}} />
                  <FilterChip label="Para regalar" selected={true} onSelect={() => {}} />
                  <FilterChip label="Para tu espacio" selected={false} onSelect={() => {}} />
                  <FilterChip label="Para tus pausas" selected={false} onSelect={() => {}} />
                </div>
                <SortSelect
                  value={sortDemo}
                  onChange={setSortDemo}
                  options={[
                    { value: 'featured', label: 'Recomendados' },
                    { value: 'price-asc', label: 'Precio: menor a mayor' },
                  ]}
                />
              </div>
              <ResultCount
                count={12}
                label="resultados"
                onClearFilters={() => setSearchDemo('')}
              />
            </Card>

            {/* Alerts, Modal, Skeleton, Progress, EmptyState & ErrorState (Slides 23–25) */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-display text-ih-cobalt">
                Mensajes, Alertas y Ventana Modal (Láminas 23 & 24)
              </h3>
              <Alert tone="success" title="Tu selección se ha guardado.">
                Puedes volver a tus piezas favoritas cuando quieras.
              </Alert>
              <Alert tone="warning" title="Revisa los datos antes de continuar.">
                Verifica el código postal para calcular el envío.
              </Alert>
              <Alert tone="error" title="No hemos podido enviar el formulario.">
                Comprueba tu conexión e inténtalo de nuevo.
              </Alert>
              <div className="pt-2">
                <Button variant="secondary" onClick={() => setModalOpen(true)}>
                  Abrir Ventana Modal (Lámina 24)
                </Button>
              </div>
            </Card>

            <Card className="p-6 space-y-5">
              <h3 className="text-lg font-display text-ih-cobalt">
                Carga, Progreso, Vacío y Error (Lámina 25)
              </h3>
              <div className="flex items-center justify-between">
                <Spinner label="Cargando contenido…" />
                <span className="ds-helper">Skeleton sin desplazar layout</span>
              </div>
              <Skeleton className="h-14 w-full" />
              <Progress value={68} label="Subiendo archivo de personalización…" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <EmptyState
                  title="Aún no hay favoritos"
                  description="Guarda una pieza para encontrarla aquí."
                />
                <ErrorState onRetry={() => {}} />
              </div>
            </Card>
          </div>
        </section>

        {/* =================================================================
            P4. DATA & E-COMMERCE CONTROLS (Slides 21, 22, 26, 27)
        ================================================================= */}
        <section className="space-y-8">
          <div className="border-b border-ih-border pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ih-coral">
              PRIORIDAD P4 · LÁMINAS 21, 22, 26, 27
            </span>
            <h2 className="ds-heading font-bold mt-1">
              04. Datos y Comercio (DataTable, Pagination, Stepper, VariantSelector, QuantityInput, Price)
            </h2>
          </div>

          <div className="space-y-6">
            <DataTable
              caption="Inventario del First Drop INHAND"
              rows={[
                {
                  id: '1',
                  piece: 'Escultura Tipográfica GRACIA.',
                  sku: 'IH-OBJ-001',
                  statusLabel: 'Disponible',
                  statusTone: 'success',
                  quantity: 1,
                  priceFormatted: '32,00 €',
                },
                {
                  id: '2',
                  piece: 'Soporte Arquitectónico para Biblia',
                  sku: 'IH-OBJ-003',
                  statusLabel: 'Pocas unidades',
                  statusTone: 'warning',
                  quantity: 2,
                  priceFormatted: '96,00 €',
                },
                {
                  id: '3',
                  piece: 'Tote Bag «FE EN ACCIÓN.»',
                  sku: 'IH-WEA-004',
                  statusLabel: 'Disponible',
                  statusTone: 'success',
                  quantity: 1,
                  priceFormatted: '28,00 €',
                },
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-display text-ih-cobalt">
                  Proceso por Pasos (Stepper · Lámina 22)
                </h3>
                <Stepper
                  steps={[
                    { id: 's1', label: 'Datos', state: 'completed' },
                    { id: 's2', label: 'Entrega', state: 'current' },
                    { id: 's3', label: 'Revisión y Pago', state: 'pending' },
                  ]}
                />
                <Pagination
                  currentPage={pageIdx}
                  totalPages={4}
                  onPageChange={setPageIdx}
                  summaryText="Mostrando 1–5 de 20 piezas"
                />
              </Card>

              <Card className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display text-ih-cobalt">
                    Controles de Producto (Lámina 26)
                  </h3>
                  <Availability state="available" locale={locale} />
                </div>
                <Price
                  amountFormatted="32,00 €"
                  taxNote="IVA (21%) incluido"
                  size="lg"
                />
                <VariantSelector
                  label="Acabado / Color"
                  selectedId={variantDemo}
                  onSelect={setVariantDemo}
                  options={[
                    { id: 'gracia-blue', label: 'GRACIA. (Azul + Coral)', colorHex: '#092B8B' },
                    { id: 'fe-blue', label: 'FE. (Azul + Coral)', colorHex: '#2148C0' },
                    { id: 'agotado', label: 'Edición Especial (Agotado)', colorHex: '#DDDCD3', inStock: false },
                  ]}
                />
                <div className="flex items-center gap-4 pt-2">
                  <QuantityInput value={qtyDemo} onChange={setQtyDemo} />
                  <Button variant="primary" className="flex-1">
                    Añadir al carrito · {(32 * qtyDemo).toFixed(2).replace('.', ',')} €
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Modal Demo (Slide 24) */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="¿Quitar este favorito?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Conservar
            </Button>
            <Button variant="destructive" onClick={() => setModalOpen(false)}>
              Quitar
            </Button>
          </>
        }
      >
        Puedes volver a guardarlo en tu selección en cualquier momento. Presiona{' '}
        <strong>Escape</strong> o elige una opción para cerrar esta ventana.
      </Modal>
    </>
  );
};
