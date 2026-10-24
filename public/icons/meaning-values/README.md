# 02. Meaning & Values Icon Set — INHAND

48 iconos que expresan la esencia de INHAND: fe, valores, comunidad y vida cotidiana.

- **Visor con selector de color:** [`index.html`](index.html) (clic en un icono = copiar SVG)
- **Lámina de vista previa:** [`preview.png`](preview.png)

## Especificaciones
- `viewBox="0 0 24 24"`, trazo `1.75`, remates `round`, `fill="none"`
- Dos roles de color: **primario** (Azul Tinta `#2638A5`) y **acento** (Coral `#fc6c21`)

## Cambiar los colores
Cada SVG usa variables CSS con valor por defecto:

```css
.ih-p  { stroke: var(--ih-icon-primary, #2638A5) }
.ih-a  { stroke: var(--ih-icon-accent,  #fc6c21) }
.ih-pf { fill:   var(--ih-icon-primary, #2638A5) }
.ih-af { fill:   var(--ih-icon-accent,  #fc6c21) }
```

**SVG insertado en el HTML (inline):** define las variables en cualquier contenedor:

```css
:root        { --ih-icon-primary: #2638A5; --ih-icon-accent: #fc6c21; }
.footer-dark { --ih-icon-primary: #FFFFFF; --ih-icon-accent: #F1A280; }
```

**Usado como `<img src="...svg">`:** las variables CSS de la página no llegan dentro del archivo, así que se muestran los colores por defecto. Para cambiarlos de forma permanente, edita `PRIMARY` / `ACCENT` en [`build_icons.py`](build_icons.py) y ejecuta `python3 build_icons.py` (necesita `pymupdf` y `pillow` para la lámina de vista previa).

## Categorías
| Carpeta | Iconos |
|---|---|
| `01_faith_spirituality` | cross, prayer, bible, light, path, hope, guidance, grace, worship, truth, purpose, eternity |
| `02_emotions_values` | love, joy, gratitude, peace, strength, courage, patience, kindness, humility, trust, transformation, purpose |
| `03_community_relationships` | community, family, friends, support, together, sharing, conversation, connection, mentorship, service, belonging, unity |
| `04_everyday_life` | daily-life, study, work, travel, creativity, nature, rest, balance, goals, growth, gift, celebration |
