import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Home,
  FolderKanban,
  Wallet,
  LogOut,
  User,
  Bell,
  Search,
  TrendingUp,
  ArrowUpRight,
  Layers,
  Lock,
  AlertCircle,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  DollarSign,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

// 1. Valid dashboard tabs
const DASHBOARD_TABS = ["Overview", "Portfolio", "Blueprints", "Financials"] as const;

const dashboardSearchSchema = z.object({
  tab: fallback(z.enum(DASHBOARD_TABS), "Overview").default("Overview"),
});

export const Route = createFileRoute("/dashboard")({
  validateSearch: zodValidator(dashboardSearchSchema),
  head: () => ({
    meta: [
      { title: "Control Matrix — Ultimate Pro Builders" },
      {
        name: "description",
        content: "Enterprise workspace and architectural build management directive system.",
      },
    ],
  }),
  component: DashboardGuard,
});

/* ==========================================================================
   2. AUTH MATRIX / GUARD LAYER
   ========================================================================== */
function DashboardGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = sessionStorage.getItem("upb_admin_auth") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <DashboardLayout
      onLogout={() => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("upb_admin_auth");
        }
        setIsAuthenticated(false);
        toast.info("Signed out successfully");
      }}
    />
  );
}

/* ==========================================================================
   3. SECURE CONTROL PANEL BASE LAYOUT
   ========================================================================== */
function DashboardLayout({ onLogout }: { onLogout: () => void }) {
  const { tab } = Route.useSearch();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Permit Approved",
      desc: "City of Miami Beach approved foundation framing.",
      time: "10m ago",
      read: false,
    },
    {
      id: 2,
      title: "Milestone Billed",
      desc: "Invoice #INV-2041 ($450,000) routed to Ridgeline client.",
      time: "2h ago",
      read: false,
    },
    {
      id: 3,
      title: "Blueprint Revision",
      desc: "Structural engineering CAD Rev 4.2 uploaded by Julian.",
      time: "5h ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const menuItems = [
    { name: "Overview" as const, icon: LayoutDashboard },
    { name: "Portfolio" as const, icon: Home },
    { name: "Blueprints" as const, icon: FolderKanban },
    { name: "Financials" as const, icon: Wallet },
  ];

  const isBaseIndex = pathname === "/dashboard" || pathname === "/dashboard/";

  return (
    <div className="min-h-screen bg-black text-cream flex flex-col md:flex-row selection:bg-gold/30 antialiased">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border/50 shrink-0 hidden md:flex flex-col justify-between p-6 bg-card/40 backdrop-blur-md">
        <div className="space-y-8">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 px-2 group">
            <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl text-cream tracking-tight">Ultimate</span>
              <span className="font-display text-xl gold-text italic">Pro</span>
              <span className="font-display text-xl text-cream">Builders</span>
            </div>
          </Link>

          {/* Core Dynamic Links changing ?tab state */}
          <nav className="space-y-1.5 mt-12">
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
                      ? "bg-gold/10 text-gold font-medium border border-gold/30 shadow-sm shadow-gold/5"
                      : "text-muted-foreground hover:text-cream hover:bg-card/80 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Identity & Session Control */}
        <div className="border-t border-border/60 pt-4 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-gold/10 flex items-center justify-center overflow-hidden border border-gold/40">
              <User className="h-5 w-5 text-gold" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-cream truncate">Admin</p>
              <p className="text-[10px] text-muted-foreground truncate">System Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            type="button"
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-rose-400 hover:bg-rose-500/5 transition-colors duration-300 group cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 text-muted-foreground group-hover:text-rose-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Systems Header */}
        <header className="h-20 border-b border-border/50 px-6 md:px-10 flex items-center justify-between gap-4 bg-card/30 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-cream"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-7 w-auto object-contain" />
              <span className="font-display text-lg text-cream tracking-tight">Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 bg-card border border-border/60 rounded-xl px-3.5 py-2 w-full max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground/60 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filter ${tab.toLowerCase()} by name, id, or client...`}
              className="bg-transparent border-none text-xs text-cream outline-none placeholder:text-muted-foreground/50 w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-muted-foreground hover:text-cream"
              >
                &times;
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0 relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-10 w-10 border border-border/60 rounded-xl flex items-center justify-center text-muted-foreground hover:text-cream hover:border-gold/50 transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-gold rounded-full ring-2 ring-black" />
              )}
              <Bell className="h-4 w-4" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-card border border-border/80 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-cream uppercase tracking-wider">
                      Directives
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-mono">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[11px] text-gold hover:underline cursor-pointer"
                  >
                    Mark read
                  </button>
                </div>
                <div className="divide-y divide-border/30 max-h-64 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`py-2.5 px-1 text-xs space-y-1 ${!n.read ? "bg-white/[0.02]" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-cream">{n.title}</span>
                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 text-xs text-muted-foreground hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/95 border-b border-border/80 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = tab === item.name;
              return (
                <Link
                  key={item.name}
                  to="/dashboard"
                  search={{ tab: item.name }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                    isActive
                      ? "bg-gold/10 text-gold font-medium border border-gold/30"
                      : "text-muted-foreground hover:text-cream"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-4.5 w-4.5" />
              Sign Out
            </button>
          </div>
        )}

        {/* Dynamic View Selection */}
        <div className="p-6 md:p-10 max-w-[1600px] w-full mx-auto space-y-8">
          {isBaseIndex ? <DashboardMetricsView tab={tab} query={searchQuery} /> : <Outlet />}
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   4. FULLY FUNCTIONAL TAB VIEWS
   ========================================================================== */
function DashboardMetricsView({
  tab,
  query,
}: {
  tab: (typeof DASHBOARD_TABS)[number];
  query: string;
}) {
  const cleanQuery = query.trim().toLowerCase();

  switch (tab) {
    case "Portfolio":
      return <PortfolioTabView query={cleanQuery} />;
    case "Blueprints":
      return <BlueprintsTabView query={cleanQuery} />;
    case "Financials":
      return <FinancialsTabView query={cleanQuery} />;
    case "Overview":
    default:
      return <OverviewTabView query={cleanQuery} />;
  }
}

/* 4A. OVERVIEW TAB */
function OverviewTabView({ query }: { query: string }) {
  const [engagements, setEngagements] = useState([
    {
      id: "UPB-01",
      name: "The Ridgeline Residence",
      phase: "Interior Finishes & Millwork",
      client: "Harrison Reed",
      budget: "$5.4M",
      progress: 88,
      status: "Active",
    },
    {
      id: "UPB-02",
      name: "Marble & Brass Kitchen",
      phase: "Italian Calacatta Installation",
      client: "Sophia Laurent",
      budget: "$780k",
      progress: 94,
      status: "Finishing",
    },
    {
      id: "UPB-03",
      name: "Alpine Glass House",
      phase: "Structural Curtain Wall Framing",
      client: "Vanderbilt Family Trust",
      budget: "$4.1M",
      progress: 45,
      status: "Active",
    },
    {
      id: "UPB-04",
      name: "Serenity Master Suite",
      phase: "Custom Millwork & Smart Automation",
      client: "Evelyn & David Miller",
      budget: "$920k",
      progress: 98,
      status: "Final Review",
    },
  ]);

  const filteredEngagements = useMemo(() => {
    if (!query) return engagements;
    return engagements.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.client.toLowerCase().includes(query) ||
        e.phase.toLowerCase().includes(query),
    );
  }, [engagements, query]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-gold tracking-widest uppercase mb-1">
            // Executive Summary
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-cream tracking-tight">
            Operational Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Matrix Online
          </span>
          <div className="text-xs font-mono text-muted-foreground bg-card border border-border/60 px-3 py-1.5 rounded-lg">
            Fiscal 2026
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Active Commissions",
            metric: "14 Estates",
            sub: "4 in final handover phase",
            progress: "+12.5%",
            icon: Layers,
          },
          {
            label: "Committed Capital",
            metric: "$24.8M",
            sub: "$4.82M allocated current quarter",
            progress: "+8.4%",
            icon: Wallet,
          },
          {
            label: "Execution Rate",
            metric: "96.4%",
            sub: "Average schedule milestone integrity",
            progress: "+2.1%",
            icon: TrendingUp,
          },
          {
            label: "Lead Inquiries",
            metric: "8 Pending",
            sub: "3 high-value commissions",
            progress: "+25%",
            icon: CheckCircle2,
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-2xl p-5 relative group hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  {card.label}
                </span>
                <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold/10 group-hover:border-gold/20 transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl md:text-3xl font-light text-cream tracking-tight">
                  {card.metric}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" /> {card.progress}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 border-t border-border/40 pt-2.5">
                {card.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Projects Table & Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-light text-cream tracking-tight">
                Active Architecture Engagements
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Live status and completion progress
              </p>
            </div>
            <Link
              to="/dashboard"
              search={{ tab: "Portfolio" }}
              className="text-xs text-gold hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-medium">Commission & Client</th>
                  <th className="pb-3 font-medium">Phase</th>
                  <th className="pb-3 font-medium text-center">Progress</th>
                  <th className="pb-3 font-medium text-right">Value</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-border/30">
                {filteredEngagements.map((row) => (
                  <tr key={row.id} className="group hover:bg-white/[0.02]">
                    <td className="py-4">
                      <p className="font-medium text-cream group-hover:text-gold transition-colors">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{row.client}</p>
                    </td>
                    <td className="py-4 text-muted-foreground text-xs">{row.phase}</td>
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 bg-border/60 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gold h-full rounded-full transition-all duration-500"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {row.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right font-mono text-gold font-medium">
                      {row.budget}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Vector Activity */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light text-cream tracking-tight">Timeline Vector</h3>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Live Log</span>
          </div>
          <div className="space-y-5 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[1px] before:bg-border/60">
            {[
              {
                title: "Structural Sign-Off",
                time: "14 mins ago",
                desc: "Foundation inspection signed by lead engineer.",
                tag: "Alpine",
              },
              {
                title: "Procurement Cleared",
                time: "2 hrs ago",
                desc: "Italian Travertine container released at port.",
                tag: "Ridgeline",
              },
              {
                title: "Milestone Paid",
                time: "Yesterday",
                desc: "$240,000 progress billing received from escrow.",
                tag: "Marble & Brass",
              },
              {
                title: "Client Design Approval",
                time: "2 days ago",
                desc: "Lighting package approved for master wing.",
                tag: "Serenity",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative items-start text-xs">
                <div className="h-6 w-6 rounded-full bg-black border border-gold/40 flex items-center justify-center shrink-0 z-10">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-cream">{item.title}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono text-gold/80">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">{item.desc}</p>
                  <p className="text-[10px] font-mono text-muted-foreground/60">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* 4B. PORTFOLIO / PROPERTIES TAB */
function PortfolioTabView({ query }: { query: string }) {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [projects, setProjects] = useState([
    {
      id: "EST-101",
      title: "The Ridgeline Residence",
      location: "Venetian Islands, FL",
      type: "Custom Estate",
      sqft: "12,400 sq.ft",
      budget: "$5,400,000",
      status: "Under Construction",
      completion: "Dec 2026",
      progress: 88,
    },
    {
      id: "EST-102",
      title: "Marble & Brass Kitchen",
      location: "Miami, FL",
      type: "Luxury Interior",
      sqft: "1,850 sq.ft",
      budget: "$780,000",
      status: "Finishing",
      completion: "Nov 2026",
      progress: 94,
    },
    {
      id: "EST-103",
      title: "Alpine Glass House",
      location: "Killington, VT",
      type: "Architecture & Build",
      sqft: "8,900 sq.ft",
      budget: "$4,100,000",
      status: "Framing",
      completion: "May 2027",
      progress: 45,
    },
    {
      id: "EST-104",
      title: "Serenity Master Suite",
      location: "Miami Beach, FL",
      type: "Estate Renovation",
      sqft: "2,400 sq.ft",
      budget: "$920,000",
      status: "Final Review",
      completion: "Completed",
      progress: 100,
    },
    {
      id: "EST-105",
      title: "Bel Air Crest Estate",
      location: "Bel Air, CA",
      type: "Custom Estate",
      sqft: "16,200 sq.ft",
      budget: "$8,200,000",
      status: "Permitting",
      completion: "Aug 2027",
      progress: 25,
    },
    {
      id: "EST-106",
      title: "Malibu Coastal Ridge",
      location: "Malibu, CA",
      type: "Oceanfront Compound",
      sqft: "10,500 sq.ft",
      budget: "$6,900,000",
      status: "Under Construction",
      completion: "Feb 2027",
      progress: 60,
    },
  ]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query);
      const matchStatus = filterStatus === "All" || p.status === filterStatus;
      return matchQuery && matchStatus;
    });
  }, [projects, query, filterStatus]);

  const handleUpdateStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextProgress = Math.min(100, p.progress + 10);
          toast.success(`Updated ${p.title} to ${nextProgress}% completion`);
          return { ...p, progress: nextProgress };
        }
        return p;
      }),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-gold tracking-widest uppercase mb-1">
            // Commission Portfolio
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-cream tracking-tight">
            Estate Builds & Architectural Works
          </h1>
        </div>
        <button
          type="button"
          onClick={() => toast.success("New Commission creation modal initiated")}
          className="inline-flex items-center gap-2 bg-gold text-black font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-gold-soft transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Commission New Build
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/50 pb-4">
        {["All", "Under Construction", "Framing", "Finishing", "Final Review", "Permitting"].map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                filterStatus === status
                  ? "bg-gold text-black font-medium"
                  : "bg-card border border-border/60 text-muted-foreground hover:text-cream"
              }`}
            >
              {status}
            </button>
          ),
        )}
      </div>

      {/* Grid of Projects */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-gold uppercase px-2 py-0.5 rounded bg-gold/10 border border-gold/20">
                  {item.id}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <h3 className="font-display text-xl text-cream tracking-tight mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.location}</p>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/40 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Budget</span>
                  <span className="font-mono text-cream font-medium">{item.budget}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">
                    Target Date
                  </span>
                  <span className="font-mono text-cream font-medium">{item.completion}</span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Milestone Completion</span>
                  <span className="font-mono text-gold">{item.progress}%</span>
                </div>
                <div className="w-full bg-border/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gold h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-border/40">
              <span className="text-[11px] text-muted-foreground">{item.sqft}</span>
              <button
                type="button"
                onClick={() => handleUpdateStatus(item.id)}
                className="text-[11px] text-gold hover:text-gold-soft hover:underline font-medium cursor-pointer"
              >
                Advance Phase &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4C. BLUEPRINTS TAB */
function BlueprintsTabView({ query }: { query: string }) {
  const [blueprints, setBlueprints] = useState([
    {
      id: "DWG-001",
      title: "Foundation & Subterranean Seismic Spec",
      project: "The Ridgeline Residence",
      type: "Structural",
      revision: "Rev 4.2",
      size: "48.2 MB",
      date: "Oct 24, 2026",
      status: "Approved",
    },
    {
      id: "DWG-002",
      title: "HVAC & Radiant Underfloor Distribution",
      project: "Alpine Glass House",
      type: "MEP Engineering",
      revision: "Rev 3.0",
      size: "32.1 MB",
      date: "Oct 20, 2026",
      status: "In Review",
    },
    {
      id: "DWG-003",
      title: "Custom Walnut Millwork & Secret Passages",
      project: "Marble & Brass Kitchen",
      type: "Architectural Interior",
      revision: "Rev 5.1",
      size: "18.6 MB",
      date: "Oct 18, 2026",
      status: "Approved",
    },
    {
      id: "DWG-004",
      title: "Oceanfront Cantilever Glass Balcony Details",
      project: "Malibu Coastal Ridge",
      type: "Structural / Glass",
      revision: "Rev 2.0",
      size: "26.4 MB",
      date: "Oct 12, 2026",
      status: "Pending Signoff",
    },
    {
      id: "DWG-005",
      title: "Electrical Automation & Lighting Matrices",
      project: "Bel Air Crest Estate",
      type: "Electrical",
      revision: "Rev 1.4",
      size: "14.8 MB",
      date: "Oct 05, 2026",
      status: "Approved",
    },
  ]);

  const filtered = useMemo(() => {
    if (!query) return blueprints;
    return blueprints.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.project.toLowerCase().includes(query) ||
        b.type.toLowerCase().includes(query),
    );
  }, [blueprints, query]);

  const handleDownload = (title: string) => {
    toast.success(`Packaging CAD schematic files for "${title}"...`);
  };

  const handleApprove = (id: string) => {
    setBlueprints((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Approved" } : b)));
    toast.success(`Schematic ${id} marked as Approved`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-gold tracking-widest uppercase mb-1">
            // Engineering Archives
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-cream tracking-tight">
            CAD Drawings & BIM Specifications
          </h1>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Upload dialog opened: Select CAD/PDF files")}
          className="inline-flex items-center gap-2 bg-gold text-black font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-gold-soft transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Upload New Schematic
        </button>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground bg-white/[0.01]">
                <th className="p-4 font-medium">Drawing ID & Title</th>
                <th className="p-4 font-medium">Commission Project</th>
                <th className="p-4 font-medium">Discipline</th>
                <th className="p-4 font-medium">Revision</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-border/30">
              {filtered.map((item) => (
                <tr key={item.id} className="group hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-cream group-hover:text-gold transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                          {item.id} &bull; {item.size}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-cream text-xs">{item.project}</td>
                  <td className="p-4 text-muted-foreground text-xs">{item.type}</td>
                  <td className="p-4 font-mono text-gold text-xs">{item.revision}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        item.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : item.status === "In Review"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== "Approved" && (
                        <button
                          type="button"
                          onClick={() => handleApprove(item.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-[11px] transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDownload(item.title)}
                        className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
                        title="Download CAD Bundle"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 4D. FINANCIALS TAB */
function FinancialsTabView({ query }: { query: string }) {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-2041",
      project: "The Ridgeline Residence",
      client: "Harrison Reed",
      milestone: "Phase 4: Interior Joinery & Stonework",
      amount: "$450,000",
      due: "Nov 15, 2026",
      status: "Pending",
    },
    {
      id: "INV-2040",
      project: "Marble & Brass Kitchen",
      client: "Sophia Laurent",
      milestone: "Final Handover & Fixtures Escrow",
      amount: "$180,000",
      due: "Nov 01, 2026",
      status: "Paid",
    },
    {
      id: "INV-2039",
      project: "Alpine Glass House",
      client: "Vanderbilt Family Trust",
      milestone: "Phase 2: Curtain Wall Glazing Deposit",
      amount: "$820,000",
      due: "Dec 05, 2026",
      status: "Scheduled",
    },
    {
      id: "INV-2038",
      project: "Bel Air Crest Estate",
      client: "Julian Vance",
      milestone: "Architectural Retainer & Engineering",
      amount: "$320,000",
      due: "Oct 15, 2026",
      status: "Paid",
    },
  ]);

  const filtered = useMemo(() => {
    if (!query) return invoices;
    return invoices.filter(
      (inv) =>
        inv.project.toLowerCase().includes(query) ||
        inv.client.toLowerCase().includes(query) ||
        inv.id.toLowerCase().includes(query),
    );
  }, [invoices, query]);

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: "Paid" } : inv)));
    toast.success(`Invoice ${id} marked as Paid in full`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-gold tracking-widest uppercase mb-1">
            // Capital Management
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-cream tracking-tight">
            Financial Directives & Progress Billing
          </h1>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Invoice generated and sent to client escrow")}
          className="inline-flex items-center gap-2 bg-gold text-black font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-gold-soft transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Issue Progress Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Gross Committed Value", val: "$24,800,000", sub: "14 commissions active" },
          { label: "Billed Year-to-Date", val: "$18,240,000", sub: "73.5% realization" },
          { label: "Pending Escrow Release", val: "$1,450,000", sub: "3 invoices outstanding" },
          { label: "Retainage Held", val: "$1,240,000", sub: "To release upon warranty" },
        ].map((c, i) => (
          <div key={i} className="bg-card border border-border/60 rounded-2xl p-5 space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
              {c.label}
            </span>
            <span className="text-2xl font-mono text-cream block">{c.val}</span>
            <span className="text-[10px] text-gold/80 font-mono block">{c.sub}</span>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden space-y-4 p-6">
        <h3 className="text-lg font-light text-cream tracking-tight">
          Milestone Billing & Draw Invoices
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-medium">Invoice #</th>
                <th className="pb-3 font-medium">Commission Project</th>
                <th className="pb-3 font-medium">Milestone Directive</th>
                <th className="pb-3 font-medium">Due Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-border/30">
              {filtered.map((inv) => (
                <tr key={inv.id} className="group hover:bg-white/[0.02]">
                  <td className="py-4 font-mono text-gold font-medium">{inv.id}</td>
                  <td className="py-4">
                    <p className="font-medium text-cream">{inv.project}</p>
                    <p className="text-[10px] text-muted-foreground">{inv.client}</p>
                  </td>
                  <td className="py-4 text-muted-foreground text-xs">{inv.milestone}</td>
                  <td className="py-4 font-mono text-muted-foreground text-xs">{inv.due}</td>
                  <td className="py-4 font-mono text-cream font-medium">{inv.amount}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                        inv.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : inv.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-white/5 text-muted-foreground border border-border/60"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {inv.status !== "Paid" ? (
                      <button
                        type="button"
                        onClick={() => handleMarkPaid(inv.id)}
                        className="px-2.5 py-1 rounded-lg border border-gold/40 text-gold hover:bg-gold hover:text-black text-[11px] transition-colors cursor-pointer"
                      >
                        Record Payment
                      </button>
                    ) : (
                      <span className="text-[11px] text-muted-foreground/60 flex items-center justify-end gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. CLEAN ADMIN LOGIN VIEW (NO PRESET CREDENTIALS OR AUTOFILL)
   ========================================================================== */
function LoginView({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    if (
      (cleanUser === "admin" || cleanUser === "admin@ultimateprobuilders.com") &&
      password === "admin@321"
    ) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("upb_admin_auth", "true");
      }
      setError("");
      onLogin();
      toast.success("Welcome back, Administrator");
    } else {
      setError("Invalid username or password. Please verify your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-black text-cream selection:bg-gold/30">
      <div className="flex flex-col justify-between p-8 md:p-14 lg:p-20">
        <Link to="/" className="flex items-center gap-3 w-fit group">
          <img src={logo} alt="Ultimate Pro Builders" className="h-10 w-auto object-contain" />
          <div>
            <span className="font-display text-xl text-cream tracking-tight block">
              Ultimate <span className="gold-text italic">Pro</span> Builders
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold block">
              Administrative Control Matrix
            </span>
          </div>
        </Link>

        <div className="max-w-md w-full mx-auto my-auto py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase mb-4">
            <Lock className="h-3 w-3" /> Secure Access
          </div>

          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-cream mb-2">
            Administrator Portal
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Enter your administrative credentials to manage commissions, engineering blueprints, and
            capital allocations.
          </p>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Username or Email
              </label>
              <input
                type="text"
                required
                autoCapitalize="none"
                autoCorrect="off"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter username"
                className="w-full bg-card border border-border/60 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-gold/80 hover:text-gold transition-colors cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter password"
                className="w-full bg-card border border-border/60 rounded-xl px-4 py-3 text-sm text-cream placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-primary-foreground font-medium text-sm py-3.5 rounded-xl hover:bg-gold-soft transition-all duration-300 transform active:scale-[0.99] mt-2 shadow-lg shadow-gold/10 cursor-pointer"
            >
              Sign In as Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-gold transition-colors uppercase tracking-wider"
            >
              &larr; Back to Public Website
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60 text-center lg:text-left">
          &copy; 2026 Ultimate Pro Builders. Administrative Protected Area.
        </p>
      </div>

      <div className="hidden lg:block relative overflow-hidden m-4 rounded-3xl border border-border/40">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Architecture"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute bottom-10 left-10 right-10 z-20">
          <p className="eyebrow mb-2">Management Terminal</p>
          <h3 className="font-display text-3xl text-cream">
            Precision Craftsmanship. Real-Time Oversight.
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Direct access to architectural timelines, client approvals, and financial models across
            all active estate builds.
          </p>
        </div>
      </div>
    </div>
  );
}
