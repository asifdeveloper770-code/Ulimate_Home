import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Home, 
  FolderKanban, 
  Wallet, 
  Settings, 
  LogOut, 
  User, 
  Bell, 
  Search, 
  TrendingUp, 
  ArrowUpRight, 
  Layers 
} from "lucide-react";

// 1. Define valid dashboard sections via Zod
const DASHBOARD_TABS = ["Overview", "Properties", "Blueprints", "Financials"] as const;

const dashboardSearchSchema = z.object({
  tab: fallback(z.enum(DASHBOARD_TABS), "Overview").default("Overview"),
});

export const Route = createFileRoute("/dashboard")({
  validateSearch: zodValidator(dashboardSearchSchema),
  head: () => ({
    meta: [
      { title: "Control Matrix — Ultimate Pro Builders" },
      { name: "description", content: "Enterprise workspace and architectural build management directive system." },
    ],
  }),
  component: DashboardGuard,
});

/* ==========================================================================
   2. AUTH MATRIX / GUARD LAYER
   ========================================================================== */
function DashboardGuard() {
  // Simple auth gate mechanism — swap with your token/auth provider if needed
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return <DashboardLayout />;
}

/* ==========================================================================
   3. SECURE CONTROL PANEL BASE LAYOUT
   ========================================================================== */
function DashboardLayout() {
  const { tab } = Route.useSearch();
  const { pathname } = useLocation();
  const navigate = useNavigate({ from: Route.fullPath });

  const menuItems = [
    { name: "Overview" as const, icon: LayoutDashboard },
    { name: "Portfolio" as const, icon: Home },
    { name: "Blueprints" as const, icon: FolderKanban },
    { name: "Financials" as const, icon: Wallet },
  ];

  const handleLogout = () => {
    // Perform cleanup or state resets
    window.location.reload(); 
  };

  // Determine if showing standard panels or nesting direct sub-routes
  const isBaseIndex = pathname === "/dashboard" || pathname === "/dashboard/";

  return (
    <div className="min-h-screen bg-black text-cream flex selection:bg-gold/30 antialiased">
      
      {/* Sidebar Matrix */}
      <aside className="w-64 border-r border-border/50 shrink-0 hidden md:flex flex-col justify-between p-6 bg-card/40 backdrop-blur-md">
        <div className="space-y-8">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 px-2">
            <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-cream tracking-tight">Ultimate</span>
          <span className="font-display text-2xl gold-text italic">Pro</span>
          <span className="font-display text-2xl text-cream">Builders</span>
        </a>
          </Link>

          {/* Core Dynamic Links changing ?tab state */}
          <nav className="space-y-1.5 mt-16">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = tab === item.name;
              return (
                <Link
                  key={item.name}
                  to="/dashboard"
                  search={{ tab: item.name }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all duration-300 group ${
                    isActive 
                      ? "bg-gold/10 text-gold font-medium border border-gold/20" 
                      : "text-muted-foreground hover:text-cream hover:bg-card/80 border border-transparent"
                  }`}
                >
                    
                  <Icon className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Identity & Session Control */}
        <div className="border-t border-border/60 pt-4 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-border flex items-center justify-center overflow-hidden border border-gold/30">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-cream truncate">Julian Thorne</p>
              <p className="text-[10px] text-muted-foreground truncate">Principal Director</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-rose-400 hover:bg-rose-500/5 transition-colors duration-300 group"
          >
            <LogOut className="h-4.5 w-4.5 text-muted-foreground group-hover:text-rose-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Systems Header */}
        <header className="h-20 border-b border-border/50 px-6 md:px-10 flex items-center justify-between gap-4 bg-card/20 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-card border border-border/60 rounded-xl px-3.5 py-2 w-full max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground/60" />
            <input 
              type="text" 
              placeholder="Search builds, design phases, assets..." 
              className="bg-transparent border-none text-xs text-cream outline-none placeholder:text-muted-foreground/50 w-full"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="h-10 w-10 border border-border/60 rounded-xl flex items-center justify-center text-muted-foreground hover:text-cream hover:border-gold/50 transition-colors relative">
              <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-gold rounded-full" />
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* View Selection Router Grid */}
        <div className="p-6 md:p-10 max-w-[1600px] w-full mx-auto space-y-10">
          {isBaseIndex ? <DashboardMetricsView tab={tab} /> : <Outlet />}
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   4. METRICS / CONTENT RENDER SWITCH
   ========================================================================== */
function DashboardMetricsView({ tab }: { tab: typeof DASHBOARD_TABS[number] }) {
  return (
    <>
      {/* Structural Headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-gold tracking-widest uppercase mb-1">// Operational Control</p>
          <h1 className="text-2xl md:text-3xl font-light text-cream tracking-tight">{tab} Matrix</h1>
        </div>
        <div className="text-xs font-mono text-muted-foreground bg-card border border-border/60 px-4 py-2 rounded-lg">
          System Live &bull; 2026
        </div>
      </div>

      {/* Metrics Array */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Active Deployments", metric: "14 Active", sub: "3 Pending engineering signoff", progress: "+12%", icon: Layers },
          { label: "Capital Allocation", metric: "$4.82M", sub: "$1.2M pipeline allocation", progress: "+8.4%", icon: Wallet },
          { label: "Operational Execution", metric: "94.2%", sub: "Avg execution rate metrics", progress: "+2.1%", icon: TrendingUp },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-card border border-border/50 rounded-2xl p-6 relative group hover:border-gold/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{card.label}</span>
                <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/20 transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-light text-cream tracking-tight">{card.metric}</span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" /> {card.progress}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 border-t border-border/40 pt-3">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Primary Log Panels */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 lg:col-span-2 space-y-6">
          <h3 className="text-lg font-light text-cream tracking-tight">Active Architecture Engagements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-medium">Estate Identifier</th>
                  <th className="pb-3 font-medium">Phase</th>
                  <th className="pb-3 font-medium text-right">Utilization</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-border/30">
                {[
                  { name: "Bel Air Crest Estate", phase: "Schematic Framing", budget: "42%" },
                  { name: "Malibu Coastal Ridge", phase: "Interior Finishes", budget: "78%" },
                  { name: "Amanpuri Pavilions", phase: "Landscape Grading", budget: "15%" },
                ].map((row, index) => (
                  <tr key={index} className="group hover:bg-white/[0.02]">
                    <td className="py-4 font-medium text-cream group-hover:text-gold transition-colors">{row.name}</td>
                    <td className="py-4 text-muted-foreground">{row.phase}</td>
                    <td className="py-4 text-right font-mono text-muted-foreground">{row.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-light text-cream tracking-tight">Activity Vector</h3>
          <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[1px] before:bg-border/60">
            {[
              { title: "Blueprints Approved", time: "14 mins ago", body: "Malibu Foundation structural sign-off." },
              { title: "Procurement Routed", time: "2 hrs ago", body: "Italian Travertine contract executed." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative items-start text-xs">
                <div className="h-6 w-6 rounded-full bg-black border border-border flex items-center justify-center shrink-0 z-10">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-cream">{item.title}</span>
                    <span className="text-[10px] font-mono text-muted-foreground/60">{item.time}</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   5. SPLIT-SCREEN AUTHENTRY CONTEXT
   ========================================================================== */
function LoginView({ onLogin }: { onLogin: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-black text-cream selection:bg-gold/30">
      <div className="flex flex-col justify-between p-8 md:p-16 lg:p-24">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-display font-bold text-xl">Ω</div>
          <span className="font-display tracking-widest text-sm uppercase text-cream">Aethel</span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cream mb-3">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-8">Access your custom home build workspace and engineering directives.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Email Address</label>
              <input type="email" required placeholder="architect@aethel.design" className="w-full bg-card border border-border/60 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-300" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-wider text-muted-foreground">Password</label>
                <a href="#forgot" className="text-xs text-gold/80 hover:text-gold transition-colors">Forgot?</a>
              </div>
              <input type="password" required placeholder="••••••••" className="w-full bg-card border border-border/60 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors duration-300" />
            </div>
            <button type="submit" className="w-full bg-cream text-black font-medium text-sm py-3.5 rounded-xl hover:bg-gold transition-all duration-300 transform active:scale-[0.99] mt-2 shadow-lg shadow-gold/5">
              Sign In
            </button>
          </form>
        </div>
        <p className="text-xs text-muted-foreground/60 text-center lg:text-left">&copy; 2026 Ultimate Pro Builders.</p>
      </div>

      <div className="hidden lg:block relative overflow-hidden m-4 rounded-3xl border border-border/40">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Space" className="w-full h-full object-cover brightness-75" />
      </div>
    </div>
  );
}