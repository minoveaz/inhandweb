import React from 'react';
import { Badge, BadgeTone } from './Badge';

export interface DataTableRow {
  id: string;
  piece: string;
  sku: string;
  statusLabel: string;
  statusTone: BadgeTone;
  quantity: number;
  priceFormatted: string;
}

export const DataTable: React.FC<{
  rows: DataTableRow[];
  caption?: string;
}> = ({ rows, caption }) => (
  <div className="ds-card overflow-x-auto">
    <table className="w-full text-left border-collapse text-sm">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="border-b border-ih-border bg-ih-cream text-xs font-bold uppercase tracking-wider text-ih-muted">
          <th scope="col" className="py-3.5 px-4">Pieza</th>
          <th scope="col" className="py-3.5 px-4">REF</th>
          <th scope="col" className="py-3.5 px-4">Estado</th>
          <th scope="col" className="py-3.5 px-4 text-right">Cantidad</th>
          <th scope="col" className="py-3.5 px-4 text-right">Importe</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-ih-border">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-ih-cream/60 transition duration-fast">
            <td className="py-3.5 px-4 font-bold text-ih-cobalt">{row.piece}</td>
            <td className="py-3.5 px-4 font-mono text-xs text-ih-muted">{row.sku}</td>
            <td className="py-3.5 px-4">
              <Badge tone={row.statusTone}>{row.statusLabel}</Badge>
            </td>
            <td className="py-3.5 px-4 text-right font-semibold text-ih-text">
              {row.quantity}
            </td>
            <td className="py-3.5 px-4 text-right font-bold text-ih-text">
              {row.priceFormatted}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
