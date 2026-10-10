import React from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  Lightbulb,
  BotMessageSquare,
  Network,
  HelpCircle,
  Compass,
  TrendingUp,
  Settings,
  Sparkles,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import { NavPage } from '../types';

interface SidebarProps {
  activeTab: NavPage;
  setActiveTab: (tab: NavPage) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  completedCount: number;
  subject?: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  completedCount,
  subject = 'Subject',
  isLoggedIn,
  onLogout,
}) => {
  const navItems: Array<{
    id: NavPage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materials', label: 'My Materials', icon: FolderOpen },
    { id: 'learn', label: 'Learn (AI Insights)', icon: Lightbulb },
    { id: 'tutor', label: 'AI Tutor', icon: BotMessageSquare, badge: 'RAG' },
    { id: 'visual', label: 'Visual Lessons', icon: Network, badge: 'Interactive' },
    { id: 'assessments', label: 'Assessments', icon: HelpCircle },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Compass },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (tab: NavPage) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-1">
          <div className="px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Learning Navigation
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-indigo-600' : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold tracking-wide ${
                        isActive
                          ? 'bg-indigo-200/80 text-indigo-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3">
          {/* Logout Button (When logged in) */}
          {isLoggedIn && onLogout && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Log Out</span>
            </button>
          )}

          {/* Learning Card / Status in sidebar */}
          <div className="p-3.5 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-950">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{subject} Mastery</span>
            </div>
            <span className="text-indigo-600 font-bold">{completedCount} done</span>
          </div>
          <div className="w-full bg-indigo-200/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, completedCount * 20)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Gemini AI ready with step diagrams & grounded tutoring.
          </p>
        </div>
      </div>
    </aside>
    </>
  );
};
