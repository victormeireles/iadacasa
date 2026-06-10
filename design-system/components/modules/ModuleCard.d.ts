import * as React from 'react';

export type ModuleAccent =
  | 'ficha' | 'receitas' | 'estoque' | 'compras' | 'checklist' | 'financeiro';

/**
 * The signature card of IA da Casa — one solution in the "cardápio de soluções".
 * Color-coded per module, selectable, with hover-lift.
 * @startingPoint section="Modules" subtitle="The cardápio de soluções card" viewport="700x260"
 */
export interface ModuleCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Module name, e.g. "Ficha Técnica". */
  title: string;
  /** One-line pain/solution description. */
  description?: string;
  /** Lucide icon name (string) or a node. */
  icon?: React.ReactNode;
  /** Color coding — maps to the --mod-* tokens. */
  accent?: ModuleAccent;
  /** Optional meta line (e.g. an icon + "para hamburguerias"). */
  meta?: React.ReactNode;
  /** available = selectable; soon = dimmed "Em breve". */
  status?: 'available' | 'soon';
  /** Shows a colored ring + check — picked in the cardápio. */
  selected?: boolean;
  /** Render tag (default button). */
  as?: keyof JSX.IntrinsicElements;
}

/** The signature card of IA da Casa — one solution on the "cardápio de soluções". */
export function ModuleCard(props: ModuleCardProps): JSX.Element;
