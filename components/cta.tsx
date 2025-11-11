export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Why Agentic AI + MCP Matters</h2>
          <p className="text-lg text-muted-foreground">
            Unlike static AI assistants, <span className="text-accent font-semibold">Agentic AI</span> takes initiative.
            With <span className="text-accent font-semibold">MCP</span>, it safely interacts with your tools, making
            context-aware decisions while maintaining full data control.
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <p className="text-lg text-foreground">
            Your projects don't just get managed — they get intelligently{" "}
            <span className="text-accent">self-optimized</span>.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition">
            Experience the Future
          </button>
        </div>
      </div>
    </section>
  )
}
