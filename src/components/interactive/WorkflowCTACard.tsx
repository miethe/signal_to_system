/**
 * WorkflowCTACard — "try it yourself" card at the bottom of a stage.
 *
 * Renders the primary CTA link from the stage config. Per-stage skill link
 * is read from `stage.ctaLinks[0]`.
 */

import type { CTALink } from "../../types/workflow";

interface WorkflowCTACardProps {
  cta: CTALink;
}

export default function WorkflowCTACard({ cta }: WorkflowCTACardProps) {
  return (
    <section className="ws-cta" aria-label="Try this workflow yourself">
      <span className="ws-cta__icon" aria-hidden="true">
        →
      </span>
      <div className="ws-cta__body">
        <p className="ws-cta__title">{cta.copyText}</p>
        {cta.subtitle && <p className="ws-cta__sub">{cta.subtitle}</p>}
      </div>
      <a
        className="ws-cta__button"
        href={cta.skillUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open {cta.skillName} skill
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
