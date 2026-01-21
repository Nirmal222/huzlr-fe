"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  BackgroundVariant,
  Handle,
  Position,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Home, Crown, Settings, FileText, Package, User,
  Code2, Laptop, Server, Cpu, LayoutDashboard, Map, Palette, Search, Rocket, BarChart3, Globe,
  Shield, CheckCircle, TrendingUp, Users, GitBranch, Trello, Calendar, CheckCircle2, AlertCircle,
  Workflow, Database, Activity
} from "lucide-react";

interface FlowCanvasProps {
  className?: string;
  showControls?: boolean;
  showMiniMap?: boolean;
  simulationPhase?: "IDLE" | "USER_TYPING" | "AI_PROCESSING" | "AI_REPLYING" | "COMPLETE";
  currentTopic?: "sprint" | "team" | "milestone" | "infra";
}

// --- Universal Handle Component ---
// Places handles around the circle perimeter for clean straight-line connections
const UniversalHandles = ({ id }: { id: string }) => {
  const handles = [
    // Center Handle (Visual Secret for Radial Graphs)
    // We place a handle in the dead center. Edges will radiate from here.
    // The node's opaque body will cover the start of the line, making it look perfect.
    { pos: Position.Top, id: "center", style: { left: "50%", top: "50%", zIndex: -1 } },
  ];

  return (
    <>
      {handles.map((h) => (
        <React.Fragment key={h.id}>
          <Handle
            type="source"
            id={`${id}-${h.id}-s`}
            position={h.pos}
            style={{ ...h.style, opacity: 0, transform: 'translate(-50%, -50%)', position: 'absolute' }}
          />
          <Handle
            type="target"
            id={`${id}-${h.id}-t`}
            position={h.pos}
            style={{ ...h.style, opacity: 0, transform: 'translate(-50%, -50%)', position: 'absolute' }}
          />
        </React.Fragment>
      ))}
    </>
  );
};

// --- Custom Node Components ---

// 1. Hub Node (The Sun) - Premium Bubbly Style
function HubNode({ data }: any) {
  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <UniversalHandles id={data.id} />
      <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-gradient-to-br from-primary via-primary to-violet-600 shadow-[0_8px_32px_-4px_rgba(139,92,246,0.5)] border border-white/20 relative z-10 pointer-events-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_-4px_rgba(139,92,246,0.6)]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
        <Home size={32} className="text-white drop-shadow-md" strokeWidth={2} />
      </div>
      {/* Label */}
      <span className="absolute top-[88px] text-xs font-bold text-foreground whitespace-nowrap px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-md border border-border/50 shadow-lg">
        {data.label}
      </span>
    </div>
  );
}

// 2. Cluster Head Node (The Planets) - Premium Style
function ClusterHeadNode({ data }: any) {
  const color = data.color || "#EC4899";
  const Icon = data.icon || Crown;

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <UniversalHandles id={data.id} />
      <div
        className="flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-lg border border-white/30 relative z-10 pointer-events-auto transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        style={{
          background: `linear-gradient(145deg, ${color}ee, ${color}cc)`,
          boxShadow: `0 8px 24px -4px ${color}55, inset 0 1px 0 rgba(255,255,255,0.2)`
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
        <Icon size={24} className="text-white drop-shadow-sm" strokeWidth={2} />
      </div>
      <span className="absolute top-[68px] text-[10px] font-semibold text-foreground/90 whitespace-nowrap px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-md shadow-md border border-border/40">
        {data.label}
      </span>
    </div>
  );
}

// 3. Satellite Node (The Moons) - Premium Style
function SatelliteNode({ data }: any) {
  const Icon = data.icon || User;

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <UniversalHandles id={data.id} />
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-card/90 backdrop-blur-md border border-border/60 shadow-md hover:shadow-xl relative z-10 pointer-events-auto transition-all duration-300 hover:scale-110 hover:border-primary/40 group">
        <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
      </div>
      {data.label && (
        <span className="absolute top-[44px] text-[9px] font-medium text-muted-foreground whitespace-nowrap pointer-events-none bg-card/80 px-2 py-0.5 rounded-full backdrop-blur-sm border border-border/30">
          {data.label}
        </span>
      )}
    </div>
  );
}

const nodeTypes = {
  hub: HubNode,
  clusterHead: ClusterHeadNode,
  satellite: SatelliteNode,
};

const edgeStyle: React.CSSProperties = {
  stroke: "#64748b", // Slate 500 - visible in both modes
  strokeWidth: 1.5,
};

// Domain: "StandMate" Product Development
const clusters = [
  {
    id: "hub-product",
    label: "huzlr",
    type: "hub",
    color: "#a855f7", // Purple (Core Product)
    x: 600, y: 400,
    satellites: []
  },
  {
    id: "hub-sprint",
    label: "Sprint 24",
    type: "clusterHead",
    color: "#eab308", // Yellow (Active Work)
    x: 600, y: 150, // Top
    satellites: [
      { id: "task-101", label: "Auth Flow", type: "task", edge: "CONTAINS", color: "#3b82f6" },
      { id: "task-102", label: "payments", type: "task", edge: "CONTAINS", color: "#3b82f6" },
      { id: "bug-404", label: "Login Bug", type: "bug", edge: "BLOCKS", color: "#ef4444" }, // Red for bug
      { id: "milestone", label: "Beta Launch", type: "milestone", edge: "TARGETS", color: "#10b981" } // Green
    ]
  },
  {
    id: "hub-team",
    label: "Core Team",
    type: "clusterHead",
    color: "#3b82f6", // Blue (People)
    x: 300, y: 400, // Left
    satellites: [
      { id: "u-nirmal", label: "Nirmal", type: "user", edge: "LEADS", color: "#f59e0b" },
      { id: "u-sarah", label: "Sarah (FE)", type: "user", edge: "MEMBER", color: "#eab308" },
      { id: "u-david", label: "David (BE)", type: "user", edge: "MEMBER", color: "#eab308" },
      { id: "u-agent", label: "AI Agent", type: "bot", edge: "ASSISTS", color: "#ec4899" }
    ]
  },
  {
    id: "hub-infra",
    label: "Infrastructure",
    type: "clusterHead",
    color: "#64748b", // Slate (Tech)
    x: 900, y: 400, // Right
    satellites: [
      { id: "aws", label: "AWS", type: "tool", edge: "HOSTS", color: "#64748b" },
      { id: "vercel", label: "Vercel", type: "tool", edge: "DEPLOYS", color: "#000000" },
      { id: "db-pg", label: "Postgres", type: "db", edge: "STORES", color: "#3b82f6" },
      { id: "redis", label: "Redis", type: "db", edge: "CATCHES", color: "#ef4444" }
    ]
  },
  {
    id: "hub-stack",
    label: "Tech Stack",
    type: "clusterHead",
    color: "#ec4899", // Pink (Code)
    x: 600, y: 650, // Bottom
    satellites: [
      { id: "next", label: "Next.js 14", type: "tech", edge: "POWERS", color: "#000000" },
      { id: "tw", label: "Tailwind", type: "tech", edge: "STYLES", color: "#38bdf8" },
      { id: "py", label: "Python/FastAPI", type: "tech", edge: "POWERS", color: "#3b82f6" },
      { id: "llm-core", label: "Gemini Pro", type: "model", edge: "DRIVES", color: "#8b5cf6" }
    ]
  }
];

// Special Bridge nodes for cross-functional links
const bridgeNodes = [
  {
    id: "bridge-github",
    label: "GitHub Repo",
    type: "tool",
    color: "#1e293b",
    x: 450, y: 550 // Between Team and Stack/Sprint
  }
];

// Relationships (The "Story")
const spineEdges = [
  // Sprint Management
  { source: "hub-product", target: "hub-sprint", label: "MANAGES" },
  // Team Assignment
  { source: "hub-team", target: "hub-product", label: "BUILDS" },
  // Tech Usage
  { source: "hub-product", target: "hub-stack", label: "BUILT_WITH" },
  // Infra Usage
  { source: "hub-product", target: "hub-infra", label: "RUNS_ON" },

  // Cross-Cluster details
  // Team works on Sprint
  { source: "hub-team", target: "hub-sprint", label: "EXECUTES" },
  // Team uses GitHub
  { source: "hub-team", target: "bridge-github", label: "COMMITS_TO" },
  // GitHub deploys to Infra
  { source: "bridge-github", target: "hub-infra", label: "TRIGGERS_CI" },
];

// Topic to nodes mapping for highlighting
const TOPIC_NODE_MAP: Record<string, string[]> = {
  sprint: ["hub-sprint", "hub-sprint-task-101", "hub-sprint-task-102"],
  team: ["hub-team", "hub-team-u-sarah", "hub-team-u-david", "hub-team-u-nirmal"],
  milestone: ["hub-sprint", "hub-sprint-bug-404", "hub-sprint-milestone"],
  infra: ["hub-infra", "hub-infra-aws", "hub-infra-vercel", "hub-infra-db-pg", "hub-infra-redis"],
};

// --- Layout Generator ---
const generateGraph = (highlightedNodes: string[] = [], activeEdges: string[] = []) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Helper to check highlight status
  const isHighlighted = (id: string) => highlightedNodes.includes(id);

  // 1. Render Clusters & Satellites
  clusters.forEach(cluster => {
    // Cluster Hub
    nodes.push({
      id: cluster.id,
      type: cluster.type === "hub" ? "hub" : "clusterHead",
      position: { x: cluster.x - (cluster.type === "hub" ? 40 : 30), y: cluster.y - (cluster.type === "hub" ? 40 : 30) },
      data: {
        id: cluster.id,
        label: cluster.label,
        color: cluster.color,
        icon: cluster.type === 'hub' ? Laptop : Activity
      },
      style: isHighlighted(cluster.id) ? {
        filter: "drop-shadow(0 0 12px hsl(var(--primary)))",
        zIndex: 100,
        transition: "filter 0.3s ease, opacity 0.3s ease"
      } : {
        transition: "filter 0.3s ease, opacity 0.3s ease",
        opacity: highlightedNodes.length > 0 ? 0.4 : 1
      }
    });

    // Satellites
    const itemCount = cluster.satellites.length;
    if (itemCount > 0) {
      const angleStep = 360 / itemCount;
      const radius = 130;

      cluster.satellites.forEach((item, i) => {
        const angle = (i * angleStep) - 90; // Start from top
        const rad = (angle * Math.PI) / 180;
        const x = cluster.x + radius * Math.cos(rad);
        const y = cluster.y + radius * Math.sin(rad);

        nodes.push({
          id: `${cluster.id}-${item.id}`,
          type: "satellite",
          position: { x: x - 20, y: y - 20 },
          data: {
            id: item.id,
            label: item.label,
            icon: item.type === 'user' ? User : (item.type === 'task' ? CheckCircle2 : (item.type === "tool" ? Settings : FileText))
          },
          style: isHighlighted(`${cluster.id}-${item.id}`) ? {
            filter: "drop-shadow(0 0 10px hsl(var(--primary)))",
            zIndex: 100,
            transition: "filter 0.3s ease, opacity 0.3s ease"
          } : {
            transition: "filter 0.3s ease, opacity 0.3s ease",
            opacity: highlightedNodes.length > 0 ? 0.3 : 1
          }
        });

        // Consistent Direction: Hub -> Satellite for "Contains/Owns"
        // But for "User -> Leads", we want User -> Hub
        let source = cluster.id;
        let target = `${cluster.id}-${item.id}`;

        // Logical "Reading" order
        if (["LEADS", "MEMBER", "ASSISTS", "POWERS", "STYLES", "DRIVES", "HOSTS", "STORES"].includes(item.edge)) {
          // "User LEADS Team" -> Source: User, Target: Team
          source = `${cluster.id}-${item.id}`;
          target = cluster.id;
        }

        const isEdgeActive = isHighlighted(source) && isHighlighted(target);

        edges.push({
          id: `e-${source}-${target}`,
          source,
          target,
          type: "straight",
          label: item.edge,
          style: isEdgeActive ? {
            stroke: cluster.color,
            strokeWidth: 3,
            opacity: 1,
            filter: "drop-shadow(0 0 4px currentColor)"
          } : {
            stroke: "#94a3b8",
            strokeWidth: 1.5,
            opacity: highlightedNodes.length > 0 ? 0.1 : 0.8
          },
          labelStyle: { fill: "#64748b", fontWeight: 700, fontSize: 8, opacity: isEdgeActive ? 1 : (highlightedNodes.length > 0 ? 0 : 1) },
          labelBgStyle: { fill: "var(--background)", fillOpacity: 0.8, opacity: isEdgeActive ? 1 : (highlightedNodes.length > 0 ? 0 : 1) },
          labelBgPadding: [2, 1],
          labelBgBorderRadius: 2,
          markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: isEdgeActive ? cluster.color : "#94a3b8" },
          animated: isEdgeActive
        });
      });
    }
  });

  // 2. Render Bridge Nodes
  bridgeNodes.forEach(bridge => {
    nodes.push({
      id: bridge.id,
      type: "clusterHead",
      position: { x: bridge.x - 30, y: bridge.y - 30 },
      data: { id: bridge.id, label: bridge.label, color: bridge.color, icon: GitBranch },
      style: { opacity: highlightedNodes.length > 0 ? 0.3 : 1, transition: "opacity 0.3s" }
    });
  });

  // 3. Render Spine Edges (Inter-hub)
  spineEdges.forEach((edge, i) => {
    edges.push({
      id: `spine-${i}`,
      source: edge.source,
      target: edge.target,
      type: "straight",
      label: edge.label,
      style: { stroke: "#a855f7", strokeWidth: 2, opacity: highlightedNodes.length > 0 ? 0.1 : 0.6 },
      labelStyle: { fill: "#a855f7", fontWeight: 700, fontSize: 9, opacity: highlightedNodes.length > 0 ? 0 : 1 },
      labelBgStyle: { fill: "var(--background)", fillOpacity: 0.9, opacity: highlightedNodes.length > 0 ? 0 : 1 },
      markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: "#a855f7" },
    });
  });

  return { nodes, edges };
};

export const FlowCanvas = ({
  className = "",
  showControls = false,
  showMiniMap = false,
  simulationPhase = "IDLE",
  currentTopic = "sprint"
}: FlowCanvasProps) => {
  const { resolvedTheme } = useTheme();
  // Ensure we have a value for initial render to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Simulation State
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Simulation Phases - The "Thinking" Animation
  useEffect(() => {
    if (!simulationPhase) return;

    let interval: NodeJS.Timeout;

    if (simulationPhase === "AI_PROCESSING") {
      // Sequence of nodes to "scan" - cycle through all main hubs
      const sequence = ["hub-product", "hub-sprint", "hub-team", "hub-infra", "hub-stack"];
      let idx = 0;

      interval = setInterval(() => {
        setHighlightedNodes([sequence[idx]]);
        idx = (idx + 1) % sequence.length;
      }, 500); // Fast scanning
    }
    else if (simulationPhase === "AI_REPLYING") {
      // Highlight the topic-specific nodes permanently during reply
      const nodesToHighlight = TOPIC_NODE_MAP[currentTopic] || TOPIC_NODE_MAP.sprint;
      setHighlightedNodes(nodesToHighlight);
    }
    else {
      // Clear highlights for IDLE, USER_TYPING, COMPLETE
      setHighlightedNodes([]);
    }

    return () => clearInterval(interval);
  }, [simulationPhase, currentTopic]);

  const { nodes: generatedNodes, edges: generatedEdges } = useMemo(() => generateGraph(highlightedNodes), [highlightedNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

  // Sync nodes/edges when highlights change
  useEffect(() => {
    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, [generatedNodes, generatedEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "straight", style: edgeStyle }, eds)),
    []
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log("Clicked node", node.id);
  }, []);

  // Dynamic Background Color based on resolvedTheme
  // Default to dark if not mounted yet (to match initial server render typically)
  const isDark = !mounted || resolvedTheme === 'dark';

  // High visibility settings
  // Light Mode: #94a3b8 is slate-400 (visible grey). 
  // Dark Mode: White with 20% opacity.
  const dotColor = isDark ? "rgba(255,255,255,0.2)" : "#94a3b8";
  const maskColor = isDark ? "rgba(5,11,26,0.95)" : "rgba(255,255,255,0.9)";

  return (
    // Added 'bg-background' to ensure it matches the global theme perfectly.
    <div className={`${className} bg-background`} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.05, minZoom: 0.7, maxZoom: 2 }}
        attributionPosition="bottom-left"
      >
        <Background
          key={resolvedTheme}
          variant={BackgroundVariant.Dots}
          gap={32}
          size={2}
          color={dotColor}
        />
        {showControls && <Controls />}
        {showMiniMap && (
          <MiniMap
            key={resolvedTheme}
            nodeColor={() => "#888"}
            maskColor={maskColor}
            style={{ backgroundColor: isDark ? "#1e293b" : "#f1f5f9" }}
          />
        )}
      </ReactFlow>
    </div>
  );
};
