/**
 * The six method profiles (build handoff specs/04 "Method profiles"). Each
 * Lab declares exactly one; its method record must carry every required
 * field key below, in this order. Lead-owned contract (see ./types.ts).
 */
export const METHOD_PROFILES = {
  'computational-experiment': {
    label: 'Computational experiment',
    fields: [
      ['task-metric', 'Task and metric'],
      ['data', 'Data edition and splits'],
      ['seeds', 'Seeds'],
      ['environment', 'Environment, lock and hardware'],
      ['baselines', 'Baselines'],
      ['parameters', 'Hyperparameters'],
      ['runs', 'Runs'],
      ['failure-cases', 'Failure cases'],
      ['ablations', 'Ablations'],
      ['variance', 'Expected variance'],
    ],
  },
  'evidence-review': {
    label: 'Evidence / literature review',
    fields: [
      ['cutoff', 'Search cutoff'],
      ['databases', 'Sources and databases'],
      ['queries', 'Queries and selection logic'],
      ['inclusion', 'Inclusion and exclusion'],
      ['editions', 'Source editions'],
      ['extraction', 'Extraction'],
      ['conflicts', 'Conflicts and missing evidence'],
    ],
  },
  'mathematical-analysis': {
    label: 'Mathematical analysis',
    fields: [
      ['proposition', 'Exact proposition and manuscript version'],
      ['assumptions', 'Assumptions'],
      ['dependencies', 'Dependencies and lemmas'],
      ['numerical-tests', 'Numerical tests (separate from proof)'],
      ['checking', 'Checking, referee and publication status'],
    ],
  },
  'design-study': {
    label: 'Design study',
    fields: [
      ['question', 'Question'],
      ['users', 'Intended users and tasks'],
      ['alternatives', 'Alternatives'],
      ['protocol', 'Evaluation protocol'],
      ['feedback', 'Observed feedback'],
      ['limits', 'Accessibility and generalization limits'],
    ],
  },
  'physical-investigation': {
    label: 'Physical / workshop investigation',
    fields: [
      ['materials', 'Materials'],
      ['dimensions', 'Dimensions'],
      ['instruments', 'Instruments and calibration'],
      ['tolerances', 'Tolerances'],
      ['environment', 'Environment'],
      ['conditions', 'Test conditions'],
      ['observations', 'Failures and observations'],
    ],
  },
  'philosophical-inquiry': {
    label: 'Philosophical inquiry',
    fields: [
      ['definitions', 'Definitions'],
      ['argument', 'Argument structure'],
      ['interpretations', 'Interpretations'],
      ['objections', 'Objections and counterexamples'],
      ['sources', 'Interpretive sources'],
    ],
  },
};

export const METHOD_PROFILE_IDS = Object.keys(METHOD_PROFILES);
