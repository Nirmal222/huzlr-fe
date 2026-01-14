"use client";

import React, { useCallback, useMemo } from "react";
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
import { Home, Crown, Settings, FileText, Package, User } from "lucide-react";

interface FlowCanvasProps {
  className?: string;
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
    <>
      <UniversalHandles id={data.id} />
      <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-slate-900 border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] relative z-10">
        <Home size={32} className="text-indigo-400" strokeWidth={2} />
      </div>
    </>
  );
}

// 2. Cluster Head Node (The Planets - Pink/Purple)
function ClusterHeadNode({ data }: any) {
  const color = data.color || "#EC4899";
  return (
    <>
      <UniversalHandles id={data.id} />
      <div
        className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-slate-900 border-2 shadow-lg relative z-10"
        style={{ borderColor: color, boxShadow: `0 0 20px ${color}40` }}
      >
        <Crown size={24} color={color} strokeWidth={2} />
      </div>
    </>
  );
}

// 3. Satellite Node (The Moons - Blue/Cyan)
function SatelliteNode({ data }: any) {
  return (
    <>
      <UniversalHandles id={data.id} />
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-slate-800 border border-slate-600 hover:border-cyan-400 transition-colors shadow-md relative z-10">
        <User size={18} className="text-cyan-400" />
      </div>
    </>
  );
}

const nodeTypes = {
  hub: HubNode,
  clusterHead: ClusterHeadNode,
  satellite: SatelliteNode,
};

const edgeStyle: React.CSSProperties = {
  stroke: "#334155", // Darker, subtle lines
  strokeWidth: 1.5,
};

// --- Algorithmic Layout Generator ---
const generateGraph = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Center Point
  const CX = 600;
  const CY = 400;

  // 1. Create Central Hub
  nodes.push({ id: "hub", type: "hub", position: { x: CX - 40, y: CY - 40 }, data: { id: "hub" } });

  // 2. Create 3 Major Clusters (The Planets)
  const clusters = [
    { id: "c1", color: "#EC4899", angle: 210 }, // Bottom Left
    { id: "c2", color: "#8B5CF6", angle: 330 }, // Bottom Right
    { id: "c3", color: "#F59E0B", angle: 90 },  // Top
  ];

  const clusterRadius = 350; // Distance of clusters from hub

  clusters.forEach((cluster) => {
    // Position Cluster Head
    const rad = (cluster.angle * Math.PI) / 180;
    const cx = CX + clusterRadius * Math.cos(rad);
    const cy = CY + clusterRadius * Math.sin(rad);

    nodes.push({
      id: cluster.id,
      type: "clusterHead",
      position: { x: cx - 30, y: cy - 30 },
      data: { id: cluster.id, color: cluster.color },
    });

    // Connect Cluster Head to Hub
    edges.push({
      id: `e-hub-${cluster.id}`,
      source: "hub",
      target: cluster.id,
      sourceHandle: `hub-center-s`,
      targetHandle: `${cluster.id}-center-t`,
      type: "straight",
      style: { stroke: "#475569", strokeWidth: 2 },
    });

    // 3. Create Satellites for each Cluster (The Moons)
    const satelliteCount = 12;
    const satelliteRadius = 140; // Size of the satellite ring

    for (let i = 0; i < satelliteCount; i++) {
      const satId = `${cluster.id}-sat-${i}`;
      const angleStep = 360 / satelliteCount;
      const satAngle = i * angleStep;
      const satRad = (satAngle * Math.PI) / 180;

      const sx = cx + satelliteRadius * Math.cos(satRad);
      const sy = cy + satelliteRadius * Math.sin(satRad);

      nodes.push({
        id: satId,
        type: "satellite",
        position: { x: sx - 20, y: sy - 20 },
        data: { id: satId },
      });

      // Connect Satellite to Cluster Head
      // Use logic to pick nearest handles for straightest line
      // (Visual hack: standard straight line handles mostly work well with universal handles 
      // if we just rely on react-flow's default center-to-center or nearest handle logic.
      // But here we specify explicit handles for robustness if needed. 
      // For pure radial starburst, center connection is ideal, but we have perimeter handles.)

      edges.push({
        id: `e-${cluster.id}-${satId}`,
        source: cluster.id,
        target: satId,
        sourceHandle: `${cluster.id}-center-s`,
        targetHandle: `${satId}-center-t`,
        type: "straight",
        style: edgeStyle,
      });
    }
  });

  return { nodes, edges };
};

export const FlowCanvas = ({ className = "" }: FlowCanvasProps) => {
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

  return (
    <div className={`${className} bg-[#050B1A]`} style={{ width: "100%", height: "100%" }}>
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
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.06)" />
        <Controls />
        <MiniMap nodeColor={() => "#888"} maskColor="rgba(5,11,26,0.8)" />
      </ReactFlow>
    </div>
  );
};
