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

// 1. Hub Node - Minimal Gradient Sphere (Core)
function HubNode({ data }: any) {
  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <UniversalHandles id={data.id} />
      <div
        className="w-[80px] h-[80px] rounded-full pointer-events-auto transition-all duration-500 hover:scale-110 bg-primary shadow-lg shadow-primary/30"
      />
      <span className="absolute top-[85px] text-xs font-semibold text-foreground/70 whitespace-nowrap">
        {data.label}
      </span>
    </div>
  );
}

// 2. Cluster Head Node - Minimal Gradient Sphere (Medium)
function ClusterHeadNode({ data }: any) {
  const size = data.size || 60;
  const color = data.color || "#fbbf24";
  const Icon = data.icon || Crown;

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <UniversalHandles id={data.id} />
      <div
        className="rounded-full pointer-events-auto transition-all duration-500 hover:scale-110 bg-primary shadow-md shadow-primary/25"
        style={{ width: size, height: size }}
      />
      <span className="absolute text-[10px] font-semibold text-foreground/70 whitespace-nowrap" style={{ top: size + 5 }}>
        {data.label}
      </span>
    </div>
  );
}

// 3. Satellite Node - Minimal Gradient Sphere (Small)
function SatelliteNode({ data }: any) {
  const Icon = data.icon || User;

  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <UniversalHandles id={data.id} />
      <div
        className="w-[40px] h-[40px] rounded-full pointer-events-auto transition-all duration-300 hover:scale-110 bg-primary shadow-sm shadow-primary/20"
      />
      {data.label && (
        <span className="absolute top-[42px] text-[9px] font-medium text-muted-foreground/70 whitespace-nowrap">
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
  stroke: "hsl(var(--muted-foreground) / 0.12)",
  strokeWidth: 1,
};

// Minimal nodes evenly distributed across canvas
const clusters = [
  {
    id: "hub-product",
    label: "huzlr",
    type: "hub",
    color: "#fbbf24",
    size: 85,
    x: 500, y: 280,
    satellites: []
  },
  {
    id: "hub-sprint",
    label: "Sprint",
    type: "clusterHead",
    color: "#fbbf24",
    size: 65,
    x: 180, y: 420,
    satellites: [
      { id: "task-auth", label: "Auth", type: "task", edge: "CONTAINS", color: "#fbbf24" },
      { id: "task-pay", label: "Payments", type: "task", edge: "CONTAINS", color: "#fbbf24" },
      { id: "bug-login", label: "Bug", type: "bug", edge: "BLOCKS", color: "#f59e0b" }
    ]
  },
  {
    id: "hub-team",
    label: "Team",
    type: "clusterHead",
    color: "#fbbf24",
    size: 60,
    x: 820, y: 100,
    satellites: [
      { id: "u-nirmal", label: "Nirmal", type: "user", edge: "LEADS", color: "#fbbf24" },
      { id: "u-sarah", label: "Sarah", type: "user", edge: "MEMBER", color: "#fcd34d" },
      { id: "u-david", label: "David", type: "user", edge: "MEMBER", color: "#fcd34d" }
    ]
  },
  {
    id: "hub-infra",
    label: "Infrastructure",
    type: "clusterHead",
    color: "#fbbf24",
    size: 58,
    x: 880, y: 420,
    satellites: [
      { id: "aws", label: "AWS", type: "tool", edge: "HOSTS", color: "#fcd34d" },
      { id: "vercel", label: "Vercel", type: "tool", edge: "DEPLOYS", color: "#fcd34d" },
      { id: "db-pg", label: "Postgres", type: "db", edge: "STORES", color: "#fbbf24" }
    ]
  },
  {
    id: "hub-stack",
    label: "Tech",
    type: "clusterHead",
    color: "#fbbf24",
    size: 55,
    x: 140, y: 120,
    satellites: [
      { id: "next", label: "Next.js", type: "tech", edge: "POWERS", color: "#fcd34d" },
      { id: "py", label: "FastAPI", type: "tech", edge: "POWERS", color: "#fbbf24" },
      { id: "llm", label: "Gemini", type: "model", edge: "DRIVES", color: "#fb923c" }
    ]
  }
];

// Bridge nodes evenly distributed
const bridgeNodes = [
  { id: "bridge-github", label: "GitHub", type: "tool", color: "#fbbf24", x: 380, y: 480 },
  { id: "bridge-api", label: "API", type: "tool", color: "#fbbf24", x: 340, y: 240 },
  { id: "bridge-ci", label: "CI/CD", type: "tool", color: "#fbbf24", x: 600, y: 460 },
  { id: "bridge-analytics", label: "Analytics", type: "tool", color: "#fbbf24", x: 480, y: 80 },
  { id: "bridge-monitoring", label: "Monitor", type: "tool", color: "#fbbf24", x: 660, y: 140 },
  { id: "bridge-docs", label: "Docs", type: "tool", color: "#fbbf24", x: 280, y: 60 }
];

// Relationships (The "Story") - Cyclic Graph
const spineEdges = [
  // Sprint Management (bidirectional)
  { source: "hub-product", target: "hub-sprint", label: "MANAGES" },
  { source: "hub-sprint", target: "hub-product", label: "UPDATES" },

  // Team Assignment (bidirectional)
  { source: "hub-team", target: "hub-product", label: "BUILDS" },
  { source: "hub-product", target: "hub-team", label: "ASSIGNS" },

  // Tech Usage (bidirectional)
  { source: "hub-product", target: "hub-stack", label: "BUILT_WITH" },
  { source: "hub-stack", target: "hub-product", label: "POWERS" },

  // Infra Usage (bidirectional)
  { source: "hub-product", target: "hub-infra", label: "RUNS_ON" },
  { source: "hub-infra", target: "hub-product", label: "HOSTS" },

  // Cross-Cluster cycles
  { source: "hub-team", target: "hub-sprint", label: "EXECUTES" },
  { source: "hub-sprint", target: "hub-team", label: "REQUIRES" },

  { source: "hub-team", target: "bridge-github", label: "COMMITS_TO" },
  { source: "bridge-github", target: "hub-team", label: "NOTIFIES" },

  { source: "bridge-github", target: "hub-infra", label: "TRIGGERS_CI" },
  { source: "hub-infra", target: "bridge-github", label: "DEPLOYS_FROM" },

  // Additional cycles
  { source: "hub-stack", target: "hub-infra", label: "DEPENDS_ON" },
  { source: "hub-infra", target: "hub-stack", label: "SUPPORTS" },

  // Features connections
  { source: "hub-product", target: "hub-features", label: "PROVIDES" },
  { source: "hub-features", target: "hub-product", label: "ENHANCES" },
  { source: "hub-sprint", target: "hub-features", label: "DEVELOPS" },
  { source: "hub-features", target: "hub-stack", label: "USES" },

  // Top-center nodes connections
  { source: "hub-product", target: "bridge-analytics", label: "TRACKS" },
  { source: "bridge-analytics", target: "hub-sprint", label: "MEASURES" },
  { source: "hub-team", target: "bridge-monitoring", label: "MONITORS" },
  { source: "bridge-monitoring", target: "hub-infra", label: "WATCHES" },
  { source: "hub-stack", target: "bridge-docs", label: "DOCUMENTS" },
  { source: "bridge-docs", target: "hub-team", label: "GUIDES" },
  { source: "bridge-analytics", target: "bridge-monitoring", label: "FEEDS" },

  // Top edge nodes
  { source: "hub-stack", target: "bridge-testing", label: "TESTS" },
  { source: "bridge-testing", target: "hub-sprint", label: "VALIDATES" },
  { source: "hub-product", target: "bridge-security", label: "SECURES" },
  { source: "bridge-security", target: "hub-infra", label: "PROTECTS" },
  { source: "hub-team", target: "bridge-design", label: "DESIGNS" },
  { source: "bridge-design", target: "hub-features", label: "ENHANCES" },
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

    // Satellites - scattered organically instead of circular
    const itemCount = cluster.satellites.length;
    if (itemCount > 0) {
      // Define organic scattered positions relative to cluster
      const scatterPositions = [
        { dx: -120, dy: -80 },
        { dx: 100, dy: -100 },
        { dx: -140, dy: 60 },
        { dx: 120, dy: 80 },
        { dx: 0, dy: -140 },
        { dx: 0, dy: 140 },
        { dx: -100, dy: 0 },
        { dx: 100, dy: 0 },
      ];

      cluster.satellites.forEach((item, i) => {
        const pos = scatterPositions[i % scatterPositions.length];
        const x = cluster.x + pos.dx;
        const y = cluster.y + pos.dy;

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
            stroke: "hsl(var(--muted-foreground) / 0.4)",
            strokeWidth: 2,
            opacity: 1
          } : {
            stroke: "hsl(var(--muted-foreground) / 0.12)",
            strokeWidth: 1,
            opacity: highlightedNodes.length > 0 ? 0.1 : 1
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
      style: {
        stroke: "hsl(var(--muted-foreground) / 0.12)",
        strokeWidth: 1,
        opacity: highlightedNodes.length > 0 ? 0.1 : 1
      },
      labelStyle: {
        fill: "hsl(var(--muted-foreground))",
        fontWeight: 600,
        fontSize: 8,
        opacity: highlightedNodes.length > 0 ? 0 : 0.6
      },
      labelBgStyle: {
        fill: "var(--background)",
        fillOpacity: 0.9,
        opacity: highlightedNodes.length > 0 ? 0 : 0.6
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 12,
        height: 12,
        color: "hsl(var(--muted-foreground) / 0.2)"
      },
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
