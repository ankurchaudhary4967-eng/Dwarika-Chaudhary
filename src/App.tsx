import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CattleList } from './pages/CattleList';
import { MilkProduction } from './pages/MilkProduction';
import { HealthLogs } from './pages/HealthLogs';
import { Breeding } from './pages/Breeding';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'cattle':
        return <CattleList />;
      case 'milk':
        return <MilkProduction />;
      case 'health':
        return <HealthLogs />;
      case 'breeding':
        return <Breeding />;
      case 'finance':
        return <div className="flex items-center justify-center h-64 text-farm-muted font-bold tracking-widest uppercase text-xs">Finances module coming soon.</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    >
      {renderContent()}
    </Layout>
  );
}
