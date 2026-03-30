import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Terminal, 
  User, 
  Moon, 
  Sun, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Github, 
  Linkedin, 
  Twitter,
  LayoutTemplate,
  Cpu,
  Feather,
  Zap,
  Database,
  Globe,
  Server,
  AlertCircle,
  Briefcase,
  Layers,
  Presentation,
  Component as ComponentIcon,
  Play
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = [
  "AI Agents", "Agentic SDLC", "Technical Leadership", 
  "CTO", "Architecture", "Platform Engineering"
];

const POSTS = [
  {
    id: 'agentic-sdlc-manifesto',
    title: 'The Agentic SDLC: What Changes When Delivery Becomes Agent-Aware',
    excerpt: 'AI agents are not just another tooling layer. They are fundamentally changing how software is designed, specified, implemented, reviewed, and operated.',
    date: '2026-03-09',
    readTime: '8 min read',
    category: 'Agentic SDLC',
    tags: ['repo design', 'developer workflows', 'evaluation'],
    interactiveElement: 'AgenticDiagram',
    contentTop: `
      <p class="lead">AI agents are not just another tooling layer. They are changing how software is designed, specified, implemented, reviewed, operated, and led. The leaders who win will be the ones who can translate between architecture, execution, systems of work, and organizational reality.</p>
      
      <h3>The Shift to Artifact-First Workflows</h3>
      <p>Most organizations are still treating AI coding assistants like autocomplete with better PR. This is a profound misunderstanding of the leverage available. The future belongs to teams that produce structured context, reusable abstractions, and machine-consumable systems of knowledge.</p>
      
      <p>When you introduce autonomous or semi-autonomous agents into the Software Development Life Cycle (SDLC), the bottleneck shifts. It is no longer about how fast a human can type boilerplate; it is about how precisely a human can define constraints, architecture, and intent.</p>

      <h3>The Anatomy of an Agent-Ready Repo</h3>
      <p>What does a codebase optimized for AI consumption look like? It requires a departure from traditional "human-only" documentation. Agents struggle with spaghetti code. Clear module boundaries and interface definitions are no longer just good practice; they are required for agentic reliability.</p>
    `,
    contentBottom: `
      <h3>The Leader's Takeaway</h3>
      <p>Agentic SDLC is real, but it requires architectural discipline. If your codebase is a mess for humans, it will be a hallucination engine for agents. Invest in your platform's structural integrity today to reap the velocity benefits tomorrow.</p>
    `
  },
  {
    id: 'modern-cto-execution-systems',
    title: 'The Modern CTO as a Designer of Execution Systems',
    excerpt: 'Modern technical leadership is increasingly about designing execution environments, not just approving technical decisions. Why the best CTOs are systems thinkers first.',
    date: '2026-02-28',
    readTime: '6 min read',
    category: 'Technical Leadership',
    tags: ['systems thinking', 'organizational design'],
    interactiveElement: null,
    contentTop: `
      <p class="lead">The role of the technical executive has drifted. In many organizations, the CTO has become a purely strategic figurehead or a glorified manager of managers. We have lost the thread on what technical leadership actually requires at scale.</p>

      <h3>Designing the Machine that Builds the Machine</h3>
      <p>A modern CTO in the enterprise space cannot simply decree architecture from an ivory tower. They must design the <em>systems of work</em>—the execution environments where engineers, and increasingly AI agents, operate.</p>
      
      <p>This means treating the organization's delivery pipelines, internal developer platforms (IDPs), and communication structures as first-class architectural artifacts. If the architecture is clean but the delivery system is highly friction-bound, the architecture will inevitably degrade to match the friction.</p>
    `,
    contentBottom: `
      <h3>Bridging Depth and Influence</h3>
      <p>The most effective technical leaders I interact with are those who maintain deep technical gravity without becoming the bottleneck for every PR. They achieve this through leverage:</p>
      <ul>
        <li>Setting inviolable constraints (what we will <em>not</em> do).</li>
        <li>Building paved roads (making the right thing the easy thing).</li>
        <li>Fostering a culture of structural review over line-by-line nitpicking.</li>
      </ul>

      <h3>The Practical Consequence</h3>
      <p>Your job is not to build the product. Your job is to build the environment where the product inevitably emerges with high quality and high velocity.</p>
    `
  },
  {
    id: 'abstraction-barriers-after-ai',
    title: 'Abstraction Barriers After AI: Knuth in the LLM Era',
    excerpt: 'Revisiting foundational computer science concepts through the lens of modern AI. What classic CS texts still teach us about managing complexity.',
    date: '2026-02-15',
    readTime: '10 min read',
    category: 'Architecture',
    tags: ['canonical ideas', 'abstraction', 'software design'],
    interactiveElement: 'ContextVisualizer',
    contentTop: `
      <p class="lead">As the cost of generating code approaches zero, the value of structural boundaries approaches infinity. It is time to revisit our canonical texts.</p>

      <h3>The New Cost of Complexity</h3>
      <p>When Donald Knuth wrote about literate programming, or when Abelson and Sussman defined abstraction barriers in SICP, they were optimizing for human cognition. They wanted to manage complexity so the human mind wouldn't buckle under the weight of a large system.</p>

      <p>Today, we have LLMs that can hold massive amounts of context. But a new problem has emerged: the "context window cliff." An LLM can write a complex function perfectly, but if the system lacks clear abstraction barriers, injecting too much raw, un-abstracted context causes the model's attention mechanism to degrade.</p>
    `,
    contentBottom: `
      <h3>Re-establishing the Boundary</h3>
      <p>We need to enforce abstraction barriers more rigidly than ever. Not because humans can't read the code, but because agents need strict contracts to operate reliably across large codebases. The APIs between our internal modules must be as well-documented and stable as the APIs we expose to external customers. Without these barriers, you aren't passing context; you are just passing noise.</p>
    `
  }
];

const PROJECTS = [
  {
    id: 'agentic-platform-offering',
    title: 'Enterprise Agentic Platform: Offering Strategy',
    type: 'Deck',
    date: '2026-03-01',
    excerpt: 'A strategic framework and slide deck outlining how enterprise clients can adopt agentic SDLC securely.',
    tags: ['strategy', 'ibm consulting', 'platforms'],
    interactiveElement: 'MockDeckViewer',
    description: `
      <p>This deck was developed to help client executives understand the transition from traditional cloud-native modernization to agent-enabled platforms.</p>
      <p>It covers the maturity curve of AI adoption in software engineering, moving from simple autocomplete tools to fully autonomous verification and deployment agents, and highlights the security and governance architecture required to support them at enterprise scale.</p>
    `
  },
  {
    id: 'execution-node-component',
    title: 'ExecutionNode: React Component Library Extract',
    type: 'Component',
    date: '2026-02-20',
    excerpt: 'A live interactive extract from my internal "MeatyUI" component library, designed for visualizing agent workflows.',
    tags: ['react', 'ui library', 'open source'],
    interactiveElement: 'MockComponentDemo',
    description: `
      <p>As part of a larger internal developer platform initiative, I began standardizing how we visualize asynchronous, AI-driven workflows.</p>
      <p>The <code>ExecutionNode</code> component is designed to be highly extensible. It handles state transitions (pending, executing, failed, complete) with clear visual indicators, and includes built-in accessibility for screen readers navigating complex DAGs (Directed Acyclic Graphs).</p>
      <p>Feel free to interact with the live component above to see how it handles state changes.</p>
    `
  }
];

// --- INTERACTIVE POST & PROJECT COMPONENTS ---

const AgenticDiagram = ({ isLite }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={`my-10 p-6 rounded-xl border ${isLite ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900' : 'border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-inner'}`}>
      <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider text-center">System Boundary Diagram</h4>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 max-w-2xl mx-auto">
        
        {/* User Node */}
        <div className={`z-10 flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-slate-800 border-2 ${isLite ? 'border-slate-300 dark:border-slate-600' : 'border-slate-200 dark:border-slate-700 shadow-lg'}`}>
          <User className="w-8 h-8 text-slate-600 dark:text-slate-300 mb-2" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Engineer</span>
        </div>

        {/* Lines */}
        {!isLite && (
          <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 flex justify-between px-16 pointer-events-none hidden md:flex">
            <div className={`h-0.5 w-1/3 bg-indigo-200 dark:bg-indigo-800 relative overflow-hidden`}>
              {isHovering && <div className="absolute top-0 left-0 h-full w-full bg-indigo-500 animate-[slide_1s_linear_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, currentColor, transparent)' }}></div>}
            </div>
            <div className={`h-0.5 w-1/3 bg-indigo-200 dark:bg-indigo-800 relative overflow-hidden`}>
              {isHovering && <div className="absolute top-0 left-0 h-full w-full bg-indigo-500 animate-[slide_1s_linear_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, currentColor, transparent)' }}></div>}
            </div>
          </div>
        )}

        {/* Agent Node (Interactive) */}
        <div 
          className={`z-10 flex flex-col items-center justify-center p-6 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white cursor-pointer ${isLite ? '' : 'shadow-xl shadow-indigo-500/30 transition-transform hover:scale-105'}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Cpu className={`w-10 h-10 mb-2 ${!isLite && isHovering ? 'animate-pulse' : ''}`} />
          <span className="text-base font-bold">AI Agent</span>
          {!isLite && <span className="text-xs text-indigo-200 mt-1 opacity-80">(Hover me)</span>}
        </div>

        {/* External Systems */}
        <div className="z-10 flex flex-col gap-4">
          <div className={`flex items-center p-3 rounded-lg bg-white dark:bg-slate-800 border-2 ${isLite ? 'border-slate-300 dark:border-slate-600' : isHovering ? 'border-indigo-400 dark:border-indigo-500' : 'border-slate-200 dark:border-slate-700'} transition-colors duration-300`}>
             <Server className={`w-5 h-5 mr-3 ${!isLite && isHovering ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
             <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Internal API</span>
          </div>
          <div className={`flex items-center p-3 rounded-lg bg-white dark:bg-slate-800 border-2 ${isLite ? 'border-slate-300 dark:border-slate-600' : isHovering ? 'border-indigo-400 dark:border-indigo-500' : 'border-slate-200 dark:border-slate-700'} transition-colors duration-300`}>
             <Database className={`w-5 h-5 mr-3 ${!isLite && isHovering ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
             <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Vector DB</span>
          </div>
        </div>
      </div>
      {isLite && <p className="text-xs text-center text-slate-500 mt-6">Lite Mode: Animations disabled for performance.</p>}
    </div>
  );
};

const ContextVisualizer = ({ isLite }) => {
  const [contextLoad, setContextLoad] = useState(30);
  
  const isOverloaded = contextLoad > 85;

  const generateText = () => {
    if (isOverloaded && !isLite) {
      return "01001000 01100101 01101100 01110000 ERROR: Attention degraded. Hallucinating variables. function() { return undefined; } var memoryLeak = true; 01110011 01111001 01110011 01110100 01100101 01101101 01100110 01100001 01101001 01101100...";
    }
    return "function calculateSystemLoad(nodes) { return nodes.reduce((acc, node) => acc + node.weight, 0); } // Clean abstraction boundary. Safe to process. System normal.";
  };

  return (
    <div className={`my-10 p-6 rounded-xl border ${isLite ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg'}`}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Context Window Load</h4>
        <span className={`text-sm font-bold ${isOverloaded ? 'text-red-500' : 'text-emerald-500'}`}>
          {contextLoad}%
        </span>
      </div>
      
      {!isLite && (
        <input 
          type="range" 
          min="10" 
          max="100" 
          value={contextLoad}
          onChange={(e) => setContextLoad(e.target.value)}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer mb-6 accent-indigo-600"
        />
      )}

      <div className={`relative w-full h-32 rounded-lg border-2 overflow-hidden transition-colors duration-300 ${isOverloaded && !isLite ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'}`}>
        {/* Fill bar overlay */}
        {!isLite && (
          <div 
            className={`absolute top-0 left-0 h-full opacity-10 transition-all duration-100 ${isOverloaded ? 'bg-red-500' : 'bg-indigo-500'}`} 
            style={{ width: `${contextLoad}%` }}
          />
        )}
        
        <div className="absolute inset-0 p-4 font-mono text-xs md:text-sm overflow-hidden text-ellipsis text-slate-600 dark:text-slate-400">
          <p className={`${isOverloaded && !isLite ? 'text-red-600 dark:text-red-400 font-bold tracking-tighter' : ''}`}>
            {generateText()}
            <br/><br/>
            {!isLite && contextLoad > 50 && "Injecting secondary module dependencies..."}
            <br/>
            {!isLite && contextLoad > 70 && "Injecting legacy unstructured architecture logs..."}
          </p>
        </div>
        
        {isOverloaded && !isLite && (
          <div className="absolute top-2 right-2 flex items-center bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 px-2 py-1 rounded text-xs font-bold animate-pulse">
            <AlertCircle className="w-3 h-3 mr-1" /> Context Cliff Exceeded
          </div>
        )}
      </div>
      {isLite && <p className="text-xs text-center text-slate-500 mt-4">Lite Mode: Interactive sliders disabled.</p>}
    </div>
  );
}

const MockDeckViewer = ({ isLite }) => {
  const [slide, setSlide] = useState(1);
  const totalSlides = 3;

  const slides = [
    {
      title: "The Agentic Enterprise Platform",
      subtitle: "Moving from Copilots to Autonomous SDLC",
      body: "An architectural blueprint for securely integrating AI agents into existing enterprise delivery pipelines."
    },
    {
      title: "Maturity Model: AI in Engineering",
      subtitle: "Phase 1: Autocomplete -> Phase 2: Autonomous Verification -> Phase 3: Autonomous Delivery",
      body: "Most organizations are stuck in Phase 1. The highest ROI lies in deploying agents for architectural verification and PR review against structured ADRs."
    },
    {
      title: "Security & Governance Architecture",
      subtitle: "The LLM Firewall",
      body: "Agents require strict access boundaries. By implementing an 'LLM Firewall' and a vector database proxy, we ensure sensitive IP never leaves the trusted execution environment."
    }
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto my-10 border rounded-xl overflow-hidden ${isLite ? 'border-slate-300 dark:border-slate-700' : 'border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50'}`}>
      {/* Deck Header */}
      <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Presentation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Strategic Offering Pitch.pdf</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {slide} / {totalSlides}
          </span>
          <div className="flex space-x-1">
            <button 
              onClick={() => setSlide(Math.max(1, slide - 1))}
              disabled={slide === 1}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700 dark:text-slate-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSlide(Math.min(totalSlides, slide + 1))}
              disabled={slide === totalSlides}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700 dark:text-slate-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Slide Content */}
      <div className="aspect-[16/9] bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className={`relative z-10 ${!isLite ? 'animate-in fade-in slide-in-from-right-4 duration-300' : ''}`} key={slide}>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            {slides[slide - 1].title}
          </h2>
          <h3 className="text-lg md:text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-8">
            {slides[slide - 1].subtitle}
          </h3>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {slides[slide - 1].body}
          </p>
        </div>
      </div>
    </div>
  );
};

const MockComponentDemo = ({ isLite }) => {
  const [status, setStatus] = useState('pending');

  const handleRun = () => {
    setStatus('executing');
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'success' : 'failed');
    }, 2000);
  };

  const getStatusColors = () => {
    switch(status) {
      case 'executing': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-blue-500/20';
      case 'success': return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 shadow-emerald-500/20';
      case 'failed': return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 shadow-red-500/20';
      default: return 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className={`my-10 border rounded-xl p-8 ${isLite ? 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shadow-inner'}`}>
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center">
            <ComponentIcon className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            &lt;ExecutionNode /&gt;
          </h4>
          <p className="text-xs text-slate-500 mt-1">Interactive Component Preview</p>
        </div>
        <button 
          onClick={() => setStatus('pending')}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Reset Demo
        </button>
      </div>

      <div className="flex items-center justify-center py-12">
        {/* The Mock Component */}
        <div className={`relative flex items-center justify-between w-full max-w-sm p-4 rounded-lg border-2 transition-all duration-300 ${getStatusColors()} ${!isLite && status === 'executing' ? 'shadow-lg' : ''}`}>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-950 border ${status === 'executing' && !isLite ? 'animate-spin border-t-transparent border-blue-500' : 'border-inherit'}`}>
              {status === 'success' && <Zap className="w-5 h-5" />}
              {status === 'failed' && <AlertCircle className="w-5 h-5" />}
              {status === 'pending' && <Cpu className="w-5 h-5" />}
            </div>
            <div>
              <h5 className="font-bold text-sm">LLM Verification</h5>
              <p className="text-xs opacity-80 mt-0.5 capitalize">{status}...</p>
            </div>
          </div>

          <button 
            onClick={handleRun}
            disabled={status === 'executing'}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <Play className={`w-5 h-5 ${status === 'executing' && !isLite ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};


// --- GLOBAL COMPONENTS ---

const Navigation = ({ currentView, setView, darkMode, toggleDarkMode, isLite, toggleLite }) => (
  <nav className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 ${isLite ? 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800' : 'bg-white/80 dark:bg-slate-950/80 border-slate-200/50 dark:border-slate-800/50'}`}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div 
        className="flex items-center space-x-2 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <span className={`font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors ${!isLite && 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
          Nick Miethe
        </span>
        <span className="hidden sm:inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          MeatyBytes
        </span>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-4">
        <div className="hidden md:flex space-x-6 mr-2">
          {[
            { id: 'essays', label: 'Essays', icon: BookOpen },
            { id: 'projects', label: 'Projects', icon: Briefcase },
            { id: 'architecture', label: 'Architecture', icon: LayoutTemplate },
            { id: 'leadership', label: 'Leadership', icon: User },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
                currentView === item.id || (currentView === 'post' && item.id === 'essays') || (currentView === 'project' && item.id === 'projects')
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
        
        <button
          onClick={() => setView('about')}
          className={`text-sm font-medium transition-colors hidden sm:block ${
            currentView === 'about' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          About
        </button>
        
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg p-1">
          <button
            onClick={toggleLite}
            className={`p-1.5 rounded text-xs flex items-center gap-1 font-semibold transition-colors ${isLite ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="Lite Mode (Performance)"
          >
            <Feather className="w-4 h-4" /> <span className="hidden lg:inline">Lite</span>
          </button>
          <button
            onClick={toggleLite}
            className={`p-1.5 rounded text-xs flex items-center gap-1 font-semibold transition-colors ${!isLite ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="Rich Mode (Interactive)"
          >
            <Zap className="w-4 h-4" /> <span className="hidden lg:inline">Rich</span>
          </button>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="w-full py-8 mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-200">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex items-center space-x-2">
        <span className="font-serif font-semibold text-slate-900 dark:text-white">Nick Miethe</span>
        <span className="text-slate-400 dark:text-slate-500 text-sm">© {new Date().getFullYear()}</span>
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

const PostCard = ({ post, onClick, isLite }) => (
  <article 
    className={`group cursor-pointer p-6 -mx-6 rounded-2xl border ${isLite ? 'border-b border-transparent border-b-slate-200 dark:border-b-slate-800 rounded-none' : 'border-transparent hover:bg-slate-50/50 dark:hover:bg-slate-900/50 hover:border-slate-200 dark:hover:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300'}`}
    onClick={() => onClick(post.id)}
  >
    <div className="flex items-center space-x-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      <span>&middot;</span>
      <span className="flex items-center"><Terminal className="w-3 h-3 mr-1"/> {post.readTime}</span>
      <span>&middot;</span>
      <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">{post.category}</span>
    </div>
    <h3 className={`text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-3 ${!isLite && 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'}`}>
      {post.title}
    </h3>
    <p className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed line-clamp-3">
      {post.excerpt}
    </p>
    <div className={`flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 ${!isLite && 'group-hover:translate-x-1 transition-transform'}`}>
      Read essay <ArrowRight className="w-4 h-4 ml-1" />
    </div>
  </article>
);

const ProjectCard = ({ project, onClick, isLite }) => (
  <article 
    className={`group cursor-pointer flex flex-col h-full rounded-2xl border ${isLite ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden'}`}
    onClick={() => onClick(project.id)}
  >
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex items-center space-x-3 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
        {project.type === 'Deck' && <Presentation className="w-4 h-4 text-indigo-500" />}
        {project.type === 'Component' && <ComponentIcon className="w-4 h-4 text-indigo-500" />}
        <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">{project.type}</span>
        <span>&middot;</span>
        <span>{new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      </div>
      
      <h3 className={`text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-3 ${!isLite && 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'}`}>
        {project.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
        {project.excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
    
    <div className={`px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between text-sm font-bold text-indigo-600 dark:text-indigo-400 ${!isLite && 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors'}`}>
      View Artifact <ArrowRight className={`w-4 h-4 ${!isLite && 'transform group-hover:translate-x-1 transition-transform'}`} />
    </div>
  </article>
);


// --- INTERACTIVE BACKGROUND ---

const InteractiveNetwork = ({ darkMode, isLite }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  
  useEffect(() => {
    if (isLite) return; // Skip rendering canvas logic in lite mode

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const baseColor = isDark ? '129, 140, 248' : '79, 70, 229'; 
      
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${isDark ? 0.6 : 0.4})`;
        ctx.fill();
        
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const distanceOpacity = 1 - (dist2 / 120);
            const mouseProximityBoost = dist < 150 ? 0.2 : 0;
            const finalOpacity = Math.min(0.8, (distanceOpacity * 0.15) + mouseProximityBoost);
            
            ctx.strokeStyle = `rgba(${baseColor}, ${finalOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resize);
    resize();
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode, isLite]);

  if (isLite) {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-3xl z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-indigo-950/20 dark:to-slate-950"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden rounded-3xl z-0 pointer-events-auto"
      onMouseMove={(e) => {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onMouseLeave={() => mouseRef.current = { x: -1000, y: -1000 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none opacity-60"></canvas>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none"></div>
    </div>
  );
};

// --- VIEWS ---

const HomeView = ({ navigateToPost, navigateToProject, setView, darkMode, isLite }) => {
  return (
    <div className={`space-y-16 ${!isLite ? 'animate-in fade-in duration-500' : ''}`}>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 border-b border-slate-200 dark:border-slate-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-12">
        <InteractiveNetwork darkMode={darkMode} isLite={isLite} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm mb-8 ${!isLite ? 'animate-in slide-in-from-bottom-2' : ''}`}>
            <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase">Systems Thinking for the Agentic Era</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight tracking-tight mb-8 text-slate-900 dark:text-white ${!isLite ? 'bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 dark:from-white dark:via-indigo-300 dark:to-slate-300' : ''}`}>
            Designing Execution Systems at Scale.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Practical notes from the intersection of AI-enabled delivery, platform architecture, and modern technical leadership.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setView('essays')}
              className={`w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 ${!isLite ? 'hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5' : 'transition-colors'}`}
            >
              Read the Field Notes
            </button>
            <button 
              onClick={() => setView('projects')}
              className={`w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 ${!isLite ? 'transition-all duration-300' : ''}`}
            >
              View Artifacts & Projects
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Featured Content Column */}
        <section className="lg:col-span-8 space-y-16">
          
          {/* Recent Essays */}
          <div>
            <div className="flex items-center justify-between mb-8 px-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                Recent Synthesis
              </h2>
              <button 
                onClick={() => setView('essays')}
                className={`text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center ${!isLite ? 'group' : ''}`}
              >
                View all <ChevronRight className={`w-4 h-4 ml-0.5 ${!isLite ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
              </button>
            </div>
            <div className="space-y-2">
              {POSTS.slice(0, 2).map(post => (
                <PostCard key={post.id} post={post} onClick={navigateToPost} isLite={isLite} />
              ))}
            </div>
          </div>

          {/* Featured Artifacts */}
          <div>
            <div className="flex items-center justify-between mb-8 px-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center">
                <Layers className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                Featured Artifacts
              </h2>
              <button 
                onClick={() => setView('projects')}
                className={`text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center ${!isLite ? 'group' : ''}`}
              >
                View portfolio <ChevronRight className={`w-4 h-4 ml-0.5 ${!isLite ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map(project => (
                <ProjectCard key={project.id} project={project} onClick={navigateToProject} isLite={isLite} />
              ))}
            </div>
          </div>

        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Author Short Block */}
          <div className={`bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                NM
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Nick Miethe</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">CTO & Chief Architect</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Exploring how AI agents change software delivery, platform architecture, and technical leadership at enterprise scale.
            </p>
            <button 
              onClick={() => setView('about')}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              More about me &rarr;
            </button>
          </div>

          {/* Topics Cluster */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Core Topics</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <span key={cat} className={`px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-full font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 ${!isLite ? 'transition-colors' : ''}`}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const EssaysListView = ({ navigateToPost, title, filterCategory, isLite }) => {
  const filteredPosts = filterCategory 
    ? POSTS.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()))
    : POSTS;

  return (
    <div className={`max-w-3xl mx-auto py-12 ${!isLite ? 'animate-in fade-in duration-300' : ''}`}>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
        {title || 'All Essays & Field Notes'}
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
        Long-form thoughts on systems, architecture, and the future of engineering work.
      </p>
      
      <div className="space-y-2">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} onClick={navigateToPost} isLite={isLite} />
        ))}
      </div>
    </div>
  );
};

const ProjectsListView = ({ navigateToProject, isLite }) => {
  return (
    <div className={`max-w-5xl mx-auto py-12 ${!isLite ? 'animate-in fade-in duration-300' : ''}`}>
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
          Projects & Artifacts
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          A collection of active side projects, component library extracts, offering strategies, and executable architecture examples. 
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} onClick={navigateToProject} isLite={isLite} />
        ))}
      </div>
    </div>
  );
};

const PostDetailView = ({ postId, onBack, isLite }) => {
  const post = POSTS.find(p => p.id === postId);
  
  if (!post) return <div>Post not found.</div>;

  const renderInteractiveComponent = () => {
    switch (post.interactiveElement) {
      case 'AgenticDiagram': return <AgenticDiagram isLite={isLite} />;
      case 'ContextVisualizer': return <ContextVisualizer isLite={isLite} />;
      default: return null;
    }
  };

  return (
    <article className={`max-w-3xl mx-auto py-12 ${!isLite ? 'animate-in slide-in-from-bottom-4 duration-500' : ''}`}>
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8"
      >
        <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" /> Back to essays
      </button>

      <header className="mb-12">
        <div className="flex items-center space-x-3 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
          <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-0.5 rounded">
            {post.category}
          </span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>&middot;</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content Rendering */}
      <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-li:text-slate-700 dark:prose-li:text-slate-300 [&>.lead]:text-xl [&>.lead]:text-slate-600 [&>.lead]:dark:text-slate-400 [&>.lead]:mb-10 [&>.lead]:font-medium [&>h3]:mt-12 [&>h3]:mb-4">
        <div dangerouslySetInnerHTML={{ __html: post.contentTop }} />
        {renderInteractiveComponent()}
        <div dangerouslySetInnerHTML={{ __html: post.contentBottom }} />
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
             <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-slate-500 dark:text-slate-400" />
             </div>
             <div>
               <h4 className="font-bold text-slate-900 dark:text-white">Written by Nick Miethe</h4>
               <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                 Notes on building, leading, and designing execution systems.
               </p>
             </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const ProjectDetailView = ({ projectId, onBack, isLite }) => {
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project) return <div>Project not found.</div>;

  const renderInteractiveComponent = () => {
    switch (project.interactiveElement) {
      case 'MockDeckViewer': return <MockDeckViewer isLite={isLite} />;
      case 'MockComponentDemo': return <MockComponentDemo isLite={isLite} />;
      default: return null;
    }
  };

  return (
    <article className={`w-full mx-auto py-12 ${!isLite ? 'animate-in slide-in-from-bottom-4 duration-500' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors mb-8"
        >
          <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" /> Back to projects
        </button>

        <header className="mb-8">
          <div className="flex items-center space-x-3 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
            <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {project.type}
            </span>
            <span>{new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </header>
      </div>

      {/* Artifact Rendering - Taking up more width than text */}
      <div className="w-full my-12">
        {renderInteractiveComponent()}
      </div>

      {/* Descriptive Text underneath the artifact */}
      <div className="max-w-3xl mx-auto">
        <div 
          className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>
    </article>
  );
};


const AboutView = ({ isLite }) => (
  <div className={`max-w-3xl mx-auto py-12 ${!isLite ? 'animate-in fade-in duration-500' : ''}`}>
    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-8">
      About
    </h1>
    
    <div className="prose prose-lg dark:prose-invert prose-slate max-w-none">
      <p className="lead text-xl text-slate-600 dark:text-slate-400 font-medium mb-8">
        I am a chief architect and technical leader bridging the gap between enterprise scale and builder mentality.
      </p>
      
      <h3>What I Do</h3>
      <p>
        In my day-to-day, I operate at the intersection of consulting, platform architecture, and technical strategy. I focus on how organizations can design resilient systems and effective delivery workflows, particularly in the cloud-native ecosystem.
      </p>

      <h3>Why This Blog Exists</h3>
      <p>
        This site serves as a working notebook and field journal. As software engineering shifts from a purely code-first discipline to an artifact-first, agent-enabled workflow, the fundamental nature of technical leadership is changing. 
      </p>
      <p>
        Most discussions around AI agents focus solely on the tools. This blog focuses on the <strong>systems of work</strong>. I write to synthesize my observations on:
      </p>
      <ul>
        <li><strong>Agentic SDLC:</strong> Integrating autonomous agents into real-world delivery pipelines.</li>
        <li><strong>Platform Architecture:</strong> Building internal developer platforms that scale securely.</li>
        <li><strong>Technical Leadership:</strong> The evolving role of the CTO as a designer of execution environments.</li>
      </ul>

      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Connect</h4>
        <div className="flex space-x-6">
          <a href="#" className={`flex items-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${!isLite ? 'transition-colors' : ''}`}>
            <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
          </a>
          <a href="#" className={`flex items-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${!isLite ? 'transition-colors' : ''}`}>
            <Github className="w-5 h-5 mr-2" /> GitHub
          </a>
          <a href="#" className={`flex items-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${!isLite ? 'transition-colors' : ''}`}>
            <Twitter className="w-5 h-5 mr-2" /> Twitter
          </a>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLite, setIsLite] = useState(false); // New Lite mode state

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#020617'; // slate-950
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLite = () => setIsLite(!isLite);

  const handleNavigateToPost = (postId) => {
    setSelectedPostId(postId);
    setCurrentView('post');
    window.scrollTo(0, 0);
  };

  const handleNavigateToProject = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentView('project');
    window.scrollTo(0, 0);
  };

  const handleSetView = (view) => {
    setCurrentView(view);
    setSelectedPostId(null);
    setSelectedProjectId(null);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView navigateToPost={handleNavigateToPost} navigateToProject={handleNavigateToProject} setView={handleSetView} darkMode={darkMode} isLite={isLite} />;
      case 'essays':
        return <EssaysListView navigateToPost={handleNavigateToPost} isLite={isLite} />;
      case 'projects':
        return <ProjectsListView navigateToProject={handleNavigateToProject} isLite={isLite} />;
      case 'architecture':
        return <EssaysListView navigateToPost={handleNavigateToPost} title="Architecture" filterCategory="Architecture" isLite={isLite} />;
      case 'leadership':
        return <EssaysListView navigateToPost={handleNavigateToPost} title="Leadership & Strategy" filterCategory="Leadership" isLite={isLite} />;
      case 'post':
        return <PostDetailView postId={selectedPostId} onBack={() => handleSetView('essays')} isLite={isLite} />;
      case 'project':
        return <ProjectDetailView projectId={selectedProjectId} onBack={() => handleSetView('projects')} isLite={isLite} />;
      case 'about':
        return <AboutView isLite={isLite} />;
      default:
        return <HomeView navigateToPost={handleNavigateToPost} navigateToProject={handleNavigateToProject} setView={handleSetView} darkMode={darkMode} isLite={isLite} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans text-slate-900 dark:text-slate-50 ${!isLite ? 'transition-colors duration-200' : ''}`}>
      <Navigation 
        currentView={currentView} 
        setView={handleSetView} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        isLite={isLite}
        toggleLite={toggleLite}
      />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
        {renderView()}
      </main>
      
      <Footer />
    </div>
  );
}