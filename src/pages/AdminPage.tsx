import { useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { getActivities } from "@/lib/api";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Shield,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Panel principal", id: "dashboard" },
  { icon: Users, label: "Profesionales", id: "professionals" },
  { icon: Calendar, label: "Actividades", id: "activities" },
  { icon: FileText, label: "Contenidos", id: "content" },
  { icon: Settings, label: "Configuración", id: "settings" },
];

const PENDING_PROS = [
  { name: "María López", therapy: "Naturopatía", city: "Palma" },
  { name: "Thomas Weber", therapy: "Osteopatía", city: "Sóller" },
];

export default function AdminPage() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activities = getActivities().slice(0, 3);

  const months: Record<string, string[]> = {
    es: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
    en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    ca: ["GEN", "FEB", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DES"],
    de: ["JAN", "FEB", "MÄR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"],
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const m = (months[locale] || months.es)[d.getMonth()];
    return `${d.getDate()} ${m} ${d.getFullYear()}`;
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-[240px] bg-primary flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-[16px]">Mallorca Holística</p>
              <span
                className="inline-block text-[11px] font-medium mt-1 px-2 py-0.5 rounded-full"
                style={{ background: "hsl(var(--accent))", color: "hsl(var(--primary))" }}
              >
                Admin
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="flex-1 mt-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors"
              style={{
                background: activeTab === item.id ? "rgba(255,255,255,0.15)" : "transparent",
                color: activeTab === item.id ? "white" : undefined,
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <p className="text-white/40 text-xs px-5 pb-5">© 2026 Mallorca Holística</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-6 md:p-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-primary">
              <Menu size={24} />
            </button>
            <h1 className="text-[22px] font-bold text-primary">Panel principal</h1>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: "hsl(var(--accent))" }}
            >
              A
            </div>
            <span className="text-muted-foreground text-sm hidden md:inline">Admin</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Profesionales", value: "6", sub: "registrados" },
            { icon: Shield, label: "Pendientes", value: "2", sub: "por verificar" },
            { icon: Calendar, label: "Actividades", value: "3", sub: "próximas" },
            { icon: FileText, label: "Contenidos", value: "4", sub: "publicados" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-6"
              style={{ boxShadow: "0 2px 12px rgba(44,74,62,0.08)" }}
            >
              <stat.icon size={22} className="text-accent mb-2" />
              <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
              <p className="text-primary font-bold text-[28px] leading-none">{stat.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Pending professionals table */}
        <div
          className="bg-card rounded-xl p-6 mb-6"
          style={{ boxShadow: "0 2px 12px rgba(44,74,62,0.08)" }}
        >
          <h2 className="font-semibold text-primary text-[16px] mb-4">
            Profesionales pendientes de verificación
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="text-left pb-3 font-medium">Nombre</th>
                  <th className="text-left pb-3 font-medium">Terapia</th>
                  <th className="text-left pb-3 font-medium">Ciudad</th>
                  <th className="text-left pb-3 font-medium">Estado</th>
                  <th className="text-left pb-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {PENDING_PROS.map((row) => (
                  <tr key={row.name} style={{ borderBottom: "1px solid rgba(44,74,62,0.06)" }}>
                    <td className="py-3 text-foreground font-medium">{row.name}</td>
                    <td className="py-3 text-foreground">{row.therapy}</td>
                    <td className="py-3 text-foreground">{row.city}</td>
                    <td className="py-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                        Pendiente
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="text-xs font-medium text-accent hover:underline">Aprobar</button>
                        <button className="text-xs font-medium text-muted-foreground hover:underline">Rechazar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-[13px] italic mt-4">
            Funcionalidad completa disponible próximamente.
          </p>
        </div>

        {/* Recent activities table */}
        <div
          className="bg-card rounded-xl p-6"
          style={{ boxShadow: "0 2px 12px rgba(44,74,62,0.08)" }}
        >
          <h2 className="font-semibold text-primary text-[16px] mb-4">
            Actividades recientes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="text-left pb-3 font-medium">Título</th>
                  <th className="text-left pb-3 font-medium">Ciudad</th>
                  <th className="text-left pb-3 font-medium">Fecha</th>
                  <th className="text-left pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act) => (
                  <tr key={act.id} style={{ borderBottom: "1px solid rgba(44,74,62,0.06)" }}>
                    <td className="py-3 text-foreground font-medium">{act.title[locale]}</td>
                    <td className="py-3 text-foreground">{act.city}</td>
                    <td className="py-3 text-foreground">{formatDate(act.date)}</td>
                    <td className="py-3">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full text-primary"
                        style={{ background: "rgba(92,140,106,0.15)" }}
                      >
                        Publicada
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
