import { useMemo, useState, type CSSProperties } from "react";
import { useStore } from "@nanostores/react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  FileText,
  Info,
  Lock,
} from "lucide-react";
import { $performanceMode } from "../../store/performanceStore";
import {
  artifactItems,
  autonomyFactors,
  autonomyTiers,
  evidenceLayers,
  executionSteps,
  gateScenarios,
  hardStopIcon,
  loopNodes,
  operationTabs,
  triagePaths,
  type AutonomyFactor,
  type OperationTabKey,
} from "../../data/agentic-operations-flow";

function clampTier(values: Record<AutonomyFactor["id"], number>) {
  const score = values.scope + values.unknowns + values.risk;
  if (values.risk === 2 && (values.scope > 0 || values.unknowns > 0)) return 3;
  if (score >= 4) return 3;
  if (score >= 3) return 2;
  if (score >= 1) return 1;
  return 0;
}

export default function AgenticOperationsFlow() {
  const performanceMode = useStore($performanceMode);
  const [activeTab, setActiveTab] = useState<OperationTabKey>("loop");
  const [activeLoopNode, setActiveLoopNode] = useState(loopNodes[0].id);
  const [activeTriagePath, setActiveTriagePath] = useState(triagePaths[0].id);
  const [activeArtifact, setActiveArtifact] = useState(artifactItems[0].id);
  const [activeExecutionStep, setActiveExecutionStep] = useState(executionSteps[0].id);
  const [activeGate, setActiveGate] = useState(gateScenarios[0].id);
  const [activeEvidence, setActiveEvidence] = useState(evidenceLayers[0].id);
  const [autonomyValues, setAutonomyValues] = useState<Record<AutonomyFactor["id"], number>>({
    scope: 1,
    unknowns: 1,
    risk: 0,
  });

  const currentTab = operationTabs.find((tab) => tab.key === activeTab) ?? operationTabs[0];
  const CurrentTabIcon = currentTab.icon;
  const selectedLoopNode = loopNodes.find((node) => node.id === activeLoopNode) ?? loopNodes[0];
  const SelectedLoopIcon = selectedLoopNode.icon;
  const selectedTriagePath =
    triagePaths.find((path) => path.id === activeTriagePath) ?? triagePaths[0];
  const selectedArtifact =
    artifactItems.find((artifact) => artifact.id === activeArtifact) ?? artifactItems[0];
  const selectedExecutionStep =
    executionSteps.find((step) => step.id === activeExecutionStep) ?? executionSteps[0];
  const selectedGate = gateScenarios.find((gate) => gate.id === activeGate) ?? gateScenarios[0];
  const selectedEvidence =
    evidenceLayers.find((layer) => layer.id === activeEvidence) ?? evidenceLayers[0];
  const SelectedEvidenceIcon = selectedEvidence.icon;
  const HardStopIcon = hardStopIcon;

  const selectedTier = useMemo(
    () => autonomyTiers[clampTier(autonomyValues)],
    [autonomyValues],
  );

  const updateAutonomy = (id: AutonomyFactor["id"], value: number) => {
    setAutonomyValues((current) => ({ ...current, [id]: value }));
  };

  return (
    <section
      className={`aof-shell ${performanceMode === "lite" ? "aof-shell--lite" : ""}`}
      aria-labelledby="agentic-operations-title"
    >
      <div className="aof-frame">
        <header className="aof-header">
          <div className="aof-kicker">
            <NetworkMark />
            <span>Agentic operations map</span>
          </div>
          <div>
            <h2 id="agentic-operations-title">One request, seven operating decisions</h2>
            <p>
              The same ask moves through different artifacts depending on uncertainty,
              risk, and the evidence the next session needs.
            </p>
          </div>
        </header>

        <div className="aof-tabs" role="tablist" aria-label="Agentic operations lanes">
          {operationTabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`aof-panel-${tab.key}`}
                id={`aof-tab-${tab.key}`}
                className={`aof-tab ${selected ? "aof-tab--active" : ""} focus-ring`}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon aria-hidden="true" size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          className="aof-workbench"
          id={`aof-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`aof-tab-${activeTab}`}
        >
          <aside className="aof-summary">
            <div className="aof-summary__icon" aria-hidden="true">
              <CurrentTabIcon size={22} />
            </div>
            <p className="aof-summary__label">Current lane</p>
            <h3>{currentTab.title}</h3>
            <p>{currentTab.summary}</p>
          </aside>

          <div className="aof-canvas">
            {activeTab === "loop" && (
              <LoopPanel
                activeLoopNode={activeLoopNode}
                setActiveLoopNode={setActiveLoopNode}
              />
            )}
            {activeTab === "triage" && (
              <TriagePanel
                activeTriagePath={activeTriagePath}
                setActiveTriagePath={setActiveTriagePath}
              />
            )}
            {activeTab === "artifacts" && (
              <ArtifactPanel activeArtifact={activeArtifact} setActiveArtifact={setActiveArtifact} />
            )}
            {activeTab === "autonomy" && (
              <AutonomyPanel
                autonomyValues={autonomyValues}
                selectedTier={selectedTier}
                updateAutonomy={updateAutonomy}
              />
            )}
            {activeTab === "execution" && (
              <ExecutionPanel
                activeExecutionStep={activeExecutionStep}
                setActiveExecutionStep={setActiveExecutionStep}
              />
            )}
            {activeTab === "gates" && (
              <GatePanel activeGate={activeGate} setActiveGate={setActiveGate} />
            )}
            {activeTab === "evidence" && (
              <EvidencePanel activeEvidence={activeEvidence} setActiveEvidence={setActiveEvidence} />
            )}
          </div>

          <aside className="aof-inspector" aria-live="polite">
            {activeTab === "loop" && (
              <>
                <div className="aof-inspector__heading">
                  <SelectedLoopIcon aria-hidden="true" size={20} />
                  <h3>{selectedLoopNode.label}</h3>
                </div>
                <p>{selectedLoopNode.description}</p>
                <InspectorGrid
                  rows={[
                    ["Input", selectedLoopNode.input],
                    ["Output", selectedLoopNode.output],
                    ["Artifact", selectedLoopNode.artifact],
                    ["Failure mode", selectedLoopNode.failureMode],
                  ]}
                />
              </>
            )}

            {activeTab === "triage" && (
              <>
                <div className="aof-inspector__heading">
                  <RouteIcon />
                  <h3>{selectedTriagePath.label}</h3>
                </div>
                <p>{selectedTriagePath.scenario}</p>
                <InspectorGrid
                  rows={[
                    ["Route", selectedTriagePath.route],
                    ["First artifact", selectedTriagePath.firstArtifact],
                    ["Why", selectedTriagePath.why],
                  ]}
                />
                <ol className="aof-mini-list">
                  {selectedTriagePath.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </>
            )}

            {activeTab === "artifacts" && (
              <>
                <div className="aof-inspector__heading">
                  <FileText aria-hidden="true" size={20} />
                  <h3>{selectedArtifact.label}</h3>
                </div>
                <p>{selectedArtifact.purpose}</p>
                <InspectorGrid
                  rows={[
                    ["Appears when", selectedArtifact.appearsWhen],
                    ["Prevents", selectedArtifact.prevents],
                  ]}
                />
                <ul className="aof-chip-list">
                  {selectedArtifact.mustContain.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === "autonomy" && (
              <>
                <div className="aof-inspector__heading">
                  <GaugeIcon />
                  <h3>{selectedTier.label}</h3>
                </div>
                <p>{selectedTier.summary}</p>
                <InspectorGrid
                  rows={[
                    ["Path", selectedTier.path],
                    ["Artifacts", selectedTier.artifacts],
                    ["Gate", selectedTier.gate],
                  ]}
                />
              </>
            )}

            {activeTab === "execution" && (
              <>
                <div className="aof-inspector__heading">
                  <GitBranchIcon />
                  <h3>{selectedExecutionStep.title}</h3>
                </div>
                <p>{selectedExecutionStep.description}</p>
                <InspectorGrid
                  rows={[
                    ["Owner", selectedExecutionStep.owner],
                    ["Output", selectedExecutionStep.output],
                    ["Parallelism", selectedExecutionStep.parallelism],
                  ]}
                />
              </>
            )}

            {activeTab === "gates" && (
              <>
                <div className="aof-inspector__heading">
                  {selectedGate.route.includes("Mode D") ? (
                    <HardStopIcon aria-hidden="true" size={20} />
                  ) : (
                    <ShieldIcon />
                  )}
                  <h3>{selectedGate.label}</h3>
                </div>
                <p>{selectedGate.risk}</p>
                <InspectorGrid
                  rows={[
                    ["Route", selectedGate.route],
                    ["Reviewer", selectedGate.reviewer],
                    ["Posture", selectedGate.posture],
                    ["Outcome", selectedGate.outcome],
                  ]}
                />
              </>
            )}

            {activeTab === "evidence" && (
              <>
                <div className="aof-inspector__heading">
                  <SelectedEvidenceIcon aria-hidden="true" size={20} />
                  <h3>{selectedEvidence.label}</h3>
                </div>
                <p>{selectedEvidence.description}</p>
                <InspectorGrid
                  rows={[
                    ["Captures", selectedEvidence.captures],
                    ["Reused by", selectedEvidence.reusedBy],
                  ]}
                />
              </>
            )}
          </aside>
        </div>

        <footer className="aof-footer">
          <Info aria-hidden="true" size={16} />
          <span>Curated illustration from the deck and storyboard, not measured telemetry.</span>
        </footer>
      </div>
    </section>
  );
}

function LoopPanel({
  activeLoopNode,
  setActiveLoopNode,
}: {
  activeLoopNode: string;
  setActiveLoopNode: (id: string) => void;
}) {
  return (
    <div className="aof-loop-map" aria-label="Agentic operations loop">
      {loopNodes.map((node, index) => {
        const Icon = node.icon;
        const selected = activeLoopNode === node.id;
        return (
          <button
            key={node.id}
            type="button"
            className={`aof-node aof-node--${index + 1} ${selected ? "aof-node--active" : ""} focus-ring`}
            onClick={() => setActiveLoopNode(node.id)}
          >
            <span className="aof-node__icon">
              <Icon aria-hidden="true" size={18} />
            </span>
            <span>{node.shortLabel}</span>
          </button>
        );
      })}
      <div className="aof-loop-map__center">
        <span>Artifact graph</span>
      </div>
    </div>
  );
}

function TriagePanel({
  activeTriagePath,
  setActiveTriagePath,
}: {
  activeTriagePath: string;
  setActiveTriagePath: (id: string) => void;
}) {
  return (
    <div className="aof-route-grid">
      {triagePaths.map((path) => {
        const selected = activeTriagePath === path.id;
        return (
          <button
            key={path.id}
            type="button"
            className={`aof-route-card ${selected ? "aof-route-card--active" : ""} focus-ring`}
            onClick={() => setActiveTriagePath(path.id)}
          >
            <span className="aof-route-card__label">{path.label}</span>
            <span className="aof-route-card__route">{path.route}</span>
            <span className="aof-route-card__artifact">{path.firstArtifact}</span>
          </button>
        );
      })}
    </div>
  );
}

function ArtifactPanel({
  activeArtifact,
  setActiveArtifact,
}: {
  activeArtifact: string;
  setActiveArtifact: (id: string) => void;
}) {
  return (
    <div className="aof-artifact-stack">
      {artifactItems.map((artifact, index) => {
        const selected = activeArtifact === artifact.id;
        return (
          <button
            key={artifact.id}
            type="button"
            className={`aof-artifact-card ${selected ? "aof-artifact-card--active" : ""} focus-ring`}
            onClick={() => setActiveArtifact(artifact.id)}
            style={{ "--aof-stack-index": index } as CSSProperties}
          >
            <span>0{index + 1}</span>
            <strong>{artifact.label}</strong>
          </button>
        );
      })}
    </div>
  );
}

function AutonomyPanel({
  autonomyValues,
  selectedTier,
  updateAutonomy,
}: {
  autonomyValues: Record<AutonomyFactor["id"], number>;
  selectedTier: (typeof autonomyTiers)[number];
  updateAutonomy: (id: AutonomyFactor["id"], value: number) => void;
}) {
  return (
    <div className="aof-autonomy">
      <div className="aof-autonomy__controls">
        {autonomyFactors.map((factor) => (
          <fieldset key={factor.id} className="aof-factor">
            <legend>{factor.label}</legend>
            <div className="aof-segments">
              {factor.options.map((option) => {
                const selected = autonomyValues[factor.id] === option.value;
                return (
                  <button
                    key={option.label}
                    type="button"
                    className={`aof-segment ${selected ? "aof-segment--active" : ""} focus-ring`}
                    onClick={() => updateAutonomy(factor.id, option.value)}
                    title={option.description}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className={`aof-tier-output aof-tier-output--${selectedTier.tier}`}>
        <span>{selectedTier.label}</span>
        <strong>{selectedTier.path}</strong>
      </div>
    </div>
  );
}

function ExecutionPanel({
  activeExecutionStep,
  setActiveExecutionStep,
}: {
  activeExecutionStep: string;
  setActiveExecutionStep: (id: string) => void;
}) {
  return (
    <div className="aof-execution-line" aria-label="Execution graph sequence">
      {executionSteps.map((step, index) => {
        const selected = activeExecutionStep === step.id;
        return (
          <div key={step.id} className="aof-execution-line__item">
            <button
              type="button"
              className={`aof-execution-step ${selected ? "aof-execution-step--active" : ""} focus-ring`}
              onClick={() => setActiveExecutionStep(step.id)}
            >
              <span>{index + 1}</span>
              <strong>{step.label}</strong>
            </button>
            {index < executionSteps.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
          </div>
        );
      })}
    </div>
  );
}

function GatePanel({
  activeGate,
  setActiveGate,
}: {
  activeGate: string;
  setActiveGate: (id: string) => void;
}) {
  return (
    <div className="aof-gate-router">
      {gateScenarios.map((gate) => {
        const selected = activeGate === gate.id;
        const dangerous = gate.route.includes("Mode D");
        return (
          <button
            key={gate.id}
            type="button"
            className={[
              "aof-gate-card",
              selected ? "aof-gate-card--active" : "",
              dangerous ? "aof-gate-card--stop" : "",
              "focus-ring"
            ].join(" ")}
            onClick={() => setActiveGate(gate.id)}
          >
            <span className="aof-gate-card__icon" aria-hidden="true">
              {dangerous ? <Lock size={18} /> : <ShieldIcon />}
            </span>
            <strong>{gate.label}</strong>
            <span>{gate.route}</span>
          </button>
        );
      })}
    </div>
  );
}

function EvidencePanel({
  activeEvidence,
  setActiveEvidence,
}: {
  activeEvidence: string;
  setActiveEvidence: (id: string) => void;
}) {
  return (
    <div className="aof-evidence-stack">
      {evidenceLayers.map((layer, index) => {
        const Icon = layer.icon;
        const selected = activeEvidence === layer.id;
        return (
          <button
            key={layer.id}
            type="button"
            className={`aof-evidence-layer ${selected ? "aof-evidence-layer--active" : ""} focus-ring`}
            onClick={() => setActiveEvidence(layer.id)}
          >
            <span className="aof-evidence-layer__index">0{index + 1}</span>
            <Icon aria-hidden="true" size={18} />
            <strong>{layer.label}</strong>
          </button>
        );
      })}
    </div>
  );
}

function InspectorGrid({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="aof-inspector-grid">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function NetworkMark() {
  return (
    <span className="aof-network-mark" aria-hidden="true">
      <Circle size={8} />
      <span />
      <Circle size={8} />
      <span />
      <CheckCircle2 size={11} />
    </span>
  );
}

function RouteIcon() {
  return <ArrowRight aria-hidden="true" size={20} />;
}

function GaugeIcon() {
  return <CheckCircle2 aria-hidden="true" size={20} />;
}

function GitBranchIcon() {
  return <ArrowRight aria-hidden="true" size={20} />;
}

function ShieldIcon() {
  return <CheckCircle2 aria-hidden="true" size={18} />;
}
