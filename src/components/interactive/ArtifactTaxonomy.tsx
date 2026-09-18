import { useState } from "react";

const artifacts = [
  ["Instruction", "Prompts, skills, commands, rules (non-executable instructions; bundles may include code)", "Are the instructions and bundled executable dependencies versioned and reviewed?"],
  ["Tool", "MCP servers, scripts, API adapters (executable code), and tool declarations", "What system boundary and permission does the runtime cross when it executes this code?"],
  ["Context", "Context packs, memories, domain references (non-executable runtime inputs)", "Are these versioned inputs current, scoped, and attributable?"],
  ["Governance", "Policies, approvals, eval sets, permissions", "Which constraint is enforced, and which is only advisory?"],
  ["Execution", "Workflows, agent definitions, deployment bindings", "Which instructions, tools, and runtime conditions does this configuration select?"],
  ["Evidence", "Manifests, run records, verification results, outcome links", "Can a reviewer connect the observed execution to an accepted result?"],
] as const;

export default function ArtifactTaxonomy() {
  const [active, setActive] = useState(0);
  const item = artifacts[active];
  return <section className="rw-interactive" aria-labelledby="artifact-taxonomy-title">
    <p className="rw-kicker">Interactive taxonomy</p><h2 id="artifact-taxonomy-title">Every artifact changes the review question</h2>
    <div className="rw-tabs" aria-label="Agentic artifact categories">
      {artifacts.map(([name], index) => <button key={name} type="button" aria-pressed={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>{name}</button>)}
    </div>
    <div className="rw-panel" aria-live="polite"><h3>{item[0]} artifacts</h3><p><strong>Examples:</strong> {item[1]}</p><p><strong>Governance question:</strong> {item[2]}</p></div>
  </section>;
}
