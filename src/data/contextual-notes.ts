export interface ContextualNoteRecord {
  id: string;
  sectionId: string;
  title: string;
  body: string;
  detail: string;
}

// Authored reading annotations from the Registry Wave experience contract.
// They are selected locally by section, never generated at reading time.
export const contextualNotes: Record<string, ContextualNoteRecord[]> = {
  'the-registry-wave-agentic-artifact-supply-chain': [
    {
      id: 'artifact-runtime',
      sectionId: 'what-the-registry-wave-actually-solved',
      title: 'The runtime executes.',
      body: 'An artifact shapes behavior. Its presence is not proof that its instructions were followed.',
      detail: 'This is an authored explanatory note tied to this section, not a generated answer or an execution status.',
    },
    {
      id: 'separate-copy',
      sectionId: 'from-artifact-to-use',
      title: 'A copy has its own state.',
      body: 'Source, intended binding, deployed content and observed loading are different records.',
      detail: 'The thread details show these boundaries without claiming that every record exists in the current implementation.',
    },
    {
      id: 'unknown-evidence',
      sectionId: 'what-i-can-prove-today',
      title: 'Unknown is a valid state.',
      body: 'A present-day registry cannot tell you which bytes an unrecorded past run loaded.',
      detail: 'Proposed evidence fields must stay unknown until supported by a capture. Traceability alone does not establish causality.',
    },
  ],
};
