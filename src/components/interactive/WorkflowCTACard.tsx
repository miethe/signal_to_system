/**
 * WorkflowCTACard — "try it yourself" card at the bottom of a stage.
 *
 * Renders the primary CTA link from the stage config. Per-stage skill link
 * is read from `stage.ctaLinks[0]`.
 *
 * Accessibility:
 * - Link has an accessible name that includes the skill name (not "click here").
 * - External links always carry rel="noopener noreferrer" when target="_blank".
 * - The decorative arrow icons are aria-hidden.
 *
 * Analytics:
 * - Fires showcase_cta_click via trackCtaClick on activation.
 */

import type { CTALink } from "../../types/workflow";
import { trackCtaClick } from "../../lib/showcase-analytics";

interface WorkflowCTACardProps {
  cta: CTALink;
  /** Stage id forwarded for analytics. */
  stageId?: string;
}

export default function WorkflowCTACard({ cta, stageId = "" }: WorkflowCTACardProps) {
  const handleClick = () => {
    trackCtaClick(stageId, cta.skillName, cta.skillUrl);
  };

  return (
    <section className="ws-cta" aria-label="Try this workflow yourself">
      <span className="ws-cta__icon" aria-hidden="true">
        &#8594;
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
        aria-label={`Open ${cta.skillName} skill (opens in new tab)`}
        onClick={handleClick}
      >
        Open {cta.skillName} skill
        <span aria-hidden="true">&#8599;</span>
      </a>
    </section>
  );
}
