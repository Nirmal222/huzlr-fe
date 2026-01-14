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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Home, Crown, Settings, FileText, Package, User,
  Code2, Laptop, Server, Cpu, LayoutDashboard, Map, Palette, Search, Rocket, BarChart3, Globe
} from "lucide-react";

interface FlowCanvasProps {
  className?: string;
  showControls?: boolean;
  showMiniMap?: boolean;
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

// 1. Hub Node (The Sun)
function HubNode({ data }: any) {
  return (
    <div className="flex flex-col items-center justify-center">
      <UniversalHandles id={data.id} />
      <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-slate-900 border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] relative z-10 dark:bg-slate-900 bg-white">
        <Home size={32} className="text-indigo-500" strokeWidth={2} />
      </div>
      {/* Label */}
      <span className="absolute top-[85px] text-xs font-bold text-foreground/80 whitespace-nowrap px-2 py-0.5 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
        {data.label}
      </span>
    </div>
  );
}

// 2. Cluster Head Node (The Planets - Pink/Purple)
function ClusterHeadNode({ data }: any) {
  const color = data.color || "#EC4899";
  const Icon = data.icon || Crown;

  return (
    <div className="flex flex-col items-center justify-center">
      <UniversalHandles id={data.id} />
      <div
        className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-card border-2 shadow-lg relative z-10"
        style={{ borderColor: color, boxShadow: `0 0 20px ${color}40` }}
      >
        <Icon size={24} color={color} strokeWidth={2} />
      </div>
      <span className="absolute top-[65px] text-[10px] font-semibold text-foreground/70 whitespace-nowrap px-1.5 py-0.5 rounded-full bg-background/50 backdrop-blur-sm">
        {data.label}
      </span>
    </div>
  );
}

// 3. Satellite Node (The Moons - Blue/Cyan)
function SatelliteNode({ data }: any) {
  const Icon = data.icon || User;

  return (
    <div className="flex flex-col items-center justify-center">
      <UniversalHandles id={data.id} />
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-card border border-border hover:border-cyan-400 transition-colors shadow-md relative z-10">
        <Icon size={18} className="text-cyan-400" />
      </div>
      {data.label && (
        <span className="absolute top-[42px] text-[9px] font-medium text-muted-foreground whitespace-nowrap pointer-events-none">
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

// --- Semantic Startup Data Structure ---
const graphData = {
  id: "hub",
  type: "hub",
  label: "Huzlr Core",
  children: [
    {
      id: "engineering",
      label: "Engineering",
      color: "#3b82f6", // Blue
      icon: Code2,
      children: [
        {
          id: "fe", label: "Frontend", icon: Laptop, children: [
            { id: "fe-react", label: "React" },
            { id: "fe-tw", label: "Tailwind" },
            { id: "fe-next", label: "Next.js" },
            { id: "fe-ts", label: "TypeScript" },
            { id: "fe-perf", label: "Vitals" }
          ]
        },
        {
          id: "be", label: "Backend", icon: Server, children: [
            { id: "be-py", label: "Python" },
            { id: "be-pg", label: "Postgres" },
            { id: "be-api", label: "FastAPI" },
            { id: "be-redis", label: "Redis" },
            { id: "be-auth", label: "OAuth" }
          ]
        },
        {
          id: "ai", label: "AI Core", icon: Cpu, children: [
            { id: "ai-llm", label: "LLM" },
            { id: "ai-rag", label: "RAG" },
            { id: "ai-vec", label: "Pinecone" },
            { id: "ai-agent", label: "Agents" }
          ]
        },
        {
          id: "devops", label: "DevOps", icon: Settings, children: [
            { id: "do-k8s", label: "K8s" },
            { id: "do-ci", label: "GitHub" },
            { id: "do-aws", label: "AWS" }
          ]
        },
        {
          id: "mobile", label: "Mobile", icon: Laptop, children: [
            { id: "mob-ios", label: "iOS" },
            { id: "mob-and", label: "Android" }
          ]
        }
      ]
    },
    {
      id: "product",
      label: "Product",
      color: "#ec4899", // Pink
      icon: LayoutDashboard,
      children: [
        {
          id: "rdmap", label: "Roadmap", icon: Map, children: [
            { id: "q1", label: "Q1 Goals" },
            { id: "q2", label: "Q2 Goals" },
            { id: "mvp", label: "MVP" }
          ]
        },
        {
          id: "design", label: "Design", icon: Palette, children: [
            { id: "ui", label: "UI Kit" },
            { id: "ux", label: "Flows" },
            { id: "ix", label: "Proto" },
            { id: "brand", label: "Brand" }
          ]
        },
        {
          id: "research", label: "Research", icon: Search, children: [
            { id: "res-user", label: "Users" },
            { id: "res-comp", label: "Comp" },
            { id: "res-data", label: "Data" }
          ]
        },
        {
          id: "analytics", label: "Analytics", icon: BarChart3, children: [
            { id: "ana-mix", label: "Mixpanel" },
            { id: "ana-ga", label: "GA4" }
          ]
        }
      ]
    },
    {
      id: "gtm",
      label: "GTM",
      color: "#f59e0b", // Orange
      icon: Rocket,
      children: [
        {
          id: "sales", label: "Sales", icon: BarChart3, children: [
            { id: "pipe", label: "Pipeline" },
            { id: "crm", label: "CRM" },
            { id: "out", label: "Outreach" },
            { id: "cls", label: "Closing" }
          ]
        },
        {
          id: "mkt", label: "Marketing", icon: Globe, children: [
            { id: "seo", label: "SEO" },
            { id: "ads", label: "Ads" },
            { id: "cont", label: "Content" },
            { id: "soc", label: "Social" }
          ]
        },
        {
          id: "supp", label: "Support", icon: User, children: [
            { id: "tix", label: "Tickets" },
            { id: "doc", label: "Docs" }
          ]
        }
      ]
    }
  ]
};

// --- Recursive Layout Generator ---
const generateGraph = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const CX = 600;
  const CY = 400;

  // Level 0: Hub
  nodes.push({
    id: graphData.id,
    type: "hub",
    position: { x: CX - 40, y: CY - 40 },
    data: { id: graphData.id, label: graphData.label }
  });

  // Level 1: Clusters (Orbit Radius: 360)
  const L1_RADIUS = 360;
  const categories = graphData.children;

  categories.forEach((cat, i) => {
    // 90 top, 210 bottom-left, 330 bottom-right
    const angle = 90 + (i * 120);
    const rad = (angle * Math.PI) / 180;

    const cx = CX + L1_RADIUS * Math.cos(rad);
    const cy = CY + L1_RADIUS * Math.sin(rad);

    nodes.push({
      id: cat.id,
      type: "clusterHead",
      position: { x: cx - 30, y: cy - 30 },
      data: { id: cat.id, label: cat.label, color: cat.color, icon: cat.icon }
    });

    edges.push({
      id: `e-hub-${cat.id}`,
      source: "hub",
      target: cat.id,
      sourceHandle: "hub-center-s",
      targetHandle: `${cat.id}-center-t`,
      type: "straight",
      style: { stroke: "#475569", strokeWidth: 2 }
    });

    // Level 2: Satellites (Orbit Radius: 160 around Cluster - increased for space)
    const subCategories = cat.children;
    const L2_RADIUS = 160;

    subCategories.forEach((sub, j) => {
      const subAngleStep = 360 / subCategories.length;
      const subAngle = (j * subAngleStep) + angle + 30; // Rotate offset
      const subRad = (subAngle * Math.PI) / 180;

      const sx = cx + L2_RADIUS * Math.cos(subRad);
      const sy = cy + L2_RADIUS * Math.sin(subRad);

      nodes.push({
        id: sub.id,
        type: "satellite",
        position: { x: sx - 20, y: sy - 20 },
        data: { id: sub.id, label: sub.label, icon: sub.icon }
      });

      edges.push({
        id: `e-${cat.id}-${sub.id}`,
        source: cat.id,
        target: sub.id,
        sourceHandle: `${cat.id}-center-s`,
        targetHandle: `${sub.id}-center-t`,
        type: "straight",
        style: edgeStyle
      });

      // Level 3: Grandchildren (Orbit Radius: 65 - compact)
      if (sub.children && sub.children.length > 0) {
        const grandChildren = sub.children;
        const L3_RADIUS = 65;

        grandChildren.forEach((child, k) => {
          // Fan layout logic - tightened to 30 degrees to fit more nodes
          const baseAngle = Math.atan2(sy - cy, sx - cx) * 180 / Math.PI;
          // Center the fan around baseAngle
          const initialOffset = -((grandChildren.length - 1) * 30) / 2;
          const gcAngle = baseAngle + initialOffset + (k * 30);

          const gcRad = (gcAngle * Math.PI) / 180;

          const gcx = sx + L3_RADIUS * Math.cos(gcRad);
          const gcy = sy + L3_RADIUS * Math.sin(gcRad);

          nodes.push({
            id: child.id,
            type: "satellite",
            position: { x: gcx - 15, y: gcy - 15 },
            data: { id: child.id, label: child.label, icon: FileText }
          });

          edges.push({
            id: `e-${sub.id}-${child.id}`,
            source: sub.id,
            target: child.id,
            sourceHandle: `${sub.id}-center-s`,
            targetHandle: `${child.id}-center-t`,
            type: "straight",
            style: { ...edgeStyle, strokeWidth: 1, opacity: 0.6 }
          });
        });
      }
    });

  });

  // Cross-Pollination Edges (Enhanced Mesh)
  const crossConnections = [
    { from: "fe", to: "design" },
    { from: "be", to: "ai" },
    { from: "product", to: "gtm" },
    { from: "sales", to: "mkt" },
    { from: "ai-rag", to: "be-pg" },
    { from: "devops", to: "be" },
    { from: "analytics", to: "mkt" },
    { from: "mobile", to: "fe" }
  ];

  crossConnections.forEach(conn => {
    edges.push({
      id: `e-cross-${conn.from}-${conn.to}`,
      source: conn.from,
      target: conn.to,
      sourceHandle: `${conn.from}-center-s`,
      targetHandle: `${conn.to}-center-t`,
      type: "straight",
      style: { ...edgeStyle, strokeDasharray: "4 4", opacity: 0.3 }
    });
  });

  return { nodes, edges };
};

export const FlowCanvas = ({
  className = "",
  showControls = false,
  showMiniMap = false
}: FlowCanvasProps) => {
  const { resolvedTheme } = useTheme();
  // Ensure we have a value for initial render to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { nodes: generatedNodes, edges: generatedEdges } = useMemo(() => generateGraph(), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(generatedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(generatedEdges);

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
        attributionPosition="bottom-right"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={32}
          size={2}
          color={dotColor}
        />
        {showControls && <Controls />}
        {showMiniMap && (
          <MiniMap
            nodeColor={() => "#888"}
            maskColor={maskColor}
            style={{ backgroundColor: isDark ? "#1e293b" : "#f1f5f9" }}
          />
        )}
      </ReactFlow>
    </div>
  );
};
