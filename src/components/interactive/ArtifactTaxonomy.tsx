import { useState } from "react";

const artifacts = [
  ["Instruction", "Prompts, skills, commands, hooks", "Does the reusable behavior say what it is allowed to do?"],
  ["Tool", "MCP servers, tool declarations, API adapters", "What system boundary and permission does it cross?"],
  ["Context", "Context packs, memory bundles, domain packs", "Is the context current, scoped, and attributable?"],
  ["Governance", "Policies, approvals, eval sets, permissions", "Which constraint is enforced, and which is only advisory?"],
  ["Execution", "Workflows, agent definitions, sessions, traces", "Can the run be reconstructed without relying on chat history?"],
  ["Evidence", "Provenance, manifests, audit events, outcome links", "Can a reviewer connect this work to an accepted result?"],
] as const;

export default function ArtifactTaxonomy() {
  const [active, setActive] = useState(0);
  const item = artifacts[active];
  return <section className="rw-interactive" aria-labelledby="artifact-taxonomy-title">
    <p className="rw-kicker">Interactive taxonomy</p><h2 id="artifact-taxonomy-title">Every artifact changes the review question</h2>
    <div className="rw-tabs" role="tablist" aria-label="Agentic artifact categories">
      {artifacts.map(([name], index) => <button key={name} role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>{name}</button>)}
    </div>
    <div className="rw-panel" role="tabpanel" aria-live="polite"><h3>{item[0]} artifacts</h3><p><strong>Examples:</strong> {item[1]}</p><p><strong>Governance question:</strong> {item[2]}</p></div>
  </section>;
}
