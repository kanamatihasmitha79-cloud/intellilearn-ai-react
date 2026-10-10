import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { LearningMaterial, NavPage, StudentProfile } from '../types';

interface NavbarProps {
  activeTab: NavPage;
  setActiveTab: (tab: NavPage) => void;
  activeMaterial: LearningMaterial;
  materials: LearningMaterial[];
  setActiveMaterial: (m: LearningMaterial) => void;
  onGetStarted: () => void;
  onLogout?: () => void;
  studentProfile?: StudentProfile | null;
  streakDays: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeMaterial,
  materials,
  setActiveMaterial,
  onGetStarted,
  onLogout,
  studentProfile,
  streakDays,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 block leading-tight">
                IntelliLearn<span className="text-indigo-600">AI</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider block">
                Visual EdTech Platform
              </span>
            </div>
          </button>
        </div>

        {/* Active Material Selector & Badges */}
        <div className="hidden lg:flex items-center gap-3">
          {activeTab !== 'landing' && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 rounded-full border border-slate-200 text-xs text-slate-700 transition-all">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-slate-500 font-medium">Active Module:</span>
              <select
                className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer pr-1"
                value={activeMaterial.id}
                onChange={(e) => {
                  const found = materials.find((m) => m.id === e.target.value);
                  if (found) setActiveMaterial(found);
                }}
              >
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title.length > 30 ? `${m.title.slice(0, 30)}...` : m.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Learning Streak Pill */}
          <div
            title={`${streakDays} days learning streak`}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-semibold shadow-xs"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streakDays}d Streak</span>
          </div>

          {/* Student Profile Quick Pill & Dropdown (When onboarded) */}
          {studentProfile?.name && activeTab !== 'landing' && (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-full text-xs font-medium text-slate-800 transition-colors border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                title="Account and learning profile"
                aria-expanded={profileMenuOpen}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {studentProfile.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold hidden sm:inline">{studentProfile.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {studentProfile.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {studentProfile.subject} • {studentProfile.level}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        setActiveTab('settings');
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2.5 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Settings & Profile</span>
                    </button>
                  </div>

                  {onLogout && (
                    <div className="border-t border-slate-100 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation CTA */}
          {activeTab === 'landing' ? (
            <button
              type="button"
              onClick={onGetStarted}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{studentProfile?.isOnboarded ? 'Go to Dashboard' : 'Get Started'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab('landing')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:text-slate-900 text-xs font-medium"
            >
              Overview
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
