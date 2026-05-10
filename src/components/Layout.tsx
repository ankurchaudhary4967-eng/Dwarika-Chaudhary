import { ReactNode } from 'react';
import { LayoutDashboard, Users, Milk, Activity, DollarSign, Settings, Bell, Search, Menu, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Layout({ children, activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }: SidebarProps & { children: ReactNode }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cattle', label: 'Cattle Directory', icon: Users },
    { id: 'milk', label: 'Milk Production', icon: Milk },
    { id: 'health', label: 'Health & Vet', icon: Activity },
    { id: 'breeding', label: 'Breeding', icon: Heart },
    { id: 'finance', label: 'Finances', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-farm-bg flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-farm-surface border-r border-farm-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-farm-border bg-farm-surface">
            <Milk className="h-6 w-6 text-farm-green mr-2" />
            <span className="text-xl font-bold text-farm-heading tracking-tight">DairyFlow</span>
          </div>
          
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  activeTab === item.id
                    ? "bg-farm-green text-white shadow-sm" 
                    : "text-farm-subtext hover:bg-farm-hover"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mr-3",
                  activeTab === item.id ? "text-white" : "text-farm-muted"
                )} />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-farm-border">
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-farm-subtext rounded-xl hover:bg-farm-hover transition-colors">
              <Settings className="h-5 w-5 mr-3 text-farm-muted" />
              Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm border-b border-farm-border z-10">
          <div className="flex items-center flex-1">
            <button 
              className="lg:hidden p-2 -ml-2 text-farm-subtext hover:bg-farm-hover rounded-md mr-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="max-w-md w-full hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-farm-muted" />
              <input 
                type="text" 
                placeholder="Search cattle, records..." 
                className="w-full pl-9 pr-4 py-2 border border-farm-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-green focus:border-farm-green transition-all bg-farm-bg hover:bg-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-farm-subtext hover:bg-farm-hover rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-farm-orange ring-2 ring-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-farm-green text-white flex items-center justify-center font-bold text-sm shadow-sm">
              AM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-farm-bg/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
