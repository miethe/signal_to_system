import { useState } from "react";

const layers = [
  ["Registry", "Identity, versioning, metadata, search, install, and update paths."],
  ["Governance", "Risk, trust, approvals, policy, access, scanning, and revocation."],
  ["Context", "Current, governed, domain-specific runtime input."],
  ["Distribution", "Placement, compatibility, permissions, and deployment across hosts."],
  ["Evidence", "Provenance and links from a run to accepted outcomes."],
  ["Adapters", "Connections to the real IDEs, registries, clouds, and runtimes."],
] as const;

export default function ArtifactControlPlane() {
  const [active, setActive] = useState(0);
  return <section className="rw-interactive" aria-labelledby="control-plane-title">
    <p className="rw-kicker">Interactive control-plane map</p><h2 id="control-plane-title">A registry is one layer of the operating surface</h2>
    <div className="rw-layers" role="list">{layers.map(([name, description], index) => <button key={name} role="listitem" className={active === index ? "is-active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{name}</button>)}</div>
    <div className="rw-panel" aria-live="polite"><h3>{layers[active][0]}</h3><p>{layers[active][1]}</p><p className="rw-note">In the current AOS, these layers are unevenly built. The map is an operating model, not a claim that one product supplies every layer.</p></div>
  </section>;
}
