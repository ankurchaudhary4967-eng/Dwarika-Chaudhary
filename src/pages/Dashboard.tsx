import { ArrowUpRight, ArrowDownRight, Droplet, Users, Activity, Wallet, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { calculateDashboardStats, mockHealthRecords } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function Dashboard() {
  const stats = calculateDashboardStats();
  
  const milkGrowth = ((stats.totalMilkToday - stats.totalMilkYesterday) / stats.totalMilkYesterday) * 100;

  const statCards = [
    {
      label: 'Milk Production (Today)',
      value: `${stats.totalMilkToday} L`,
      icon: Droplet,
      trend: milkGrowth > 0 ? `+${milkGrowth.toFixed(1)}%` : `${milkGrowth.toFixed(1)}%`,
      trendUp: milkGrowth >= 0,
      color: 'bg-farm-surface text-farm-green border border-farm-border'
    },
    {
      label: 'Active Milking Cows',
      value: stats.milkingCows.toString(),
      icon: Users,
      subtext: `Out of ${stats.totalCattle} total cattle`,
      color: 'bg-farm-surface text-farm-green border border-farm-border'
    },
    {
      label: 'Health Alerts',
      value: stats.sickCows.toString(),
      icon: Activity,
      subtext: 'Requires attention today',
      trendUp: false,
      color: stats.sickCows > 0 ? 'bg-[#D98C60]/10 text-farm-orange border border-farm-border' : 'bg-farm-surface text-farm-muted border border-farm-border'
    },
    {
      label: 'Est. Revenue (Week)',
      value: '$1,420',
      icon: Wallet,
      trend: '+4.2%',
      trendUp: true,
      color: 'bg-farm-surface text-farm-green border border-farm-border'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-farm-heading font-serif">Dashboard</h1>
          <p className="text-sm text-farm-muted mt-1">Welcome back. Here's what's happening on your farm today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-farm-green hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-opacity cursor-pointer">
            + Log Milk Yield
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white rounded-[32px] p-6 shadow-sm border border-farm-border flex flex-col"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-farm-muted font-black">{stat.label}</p>
                <h3 className="text-3xl font-serif text-farm-dark mt-2">{stat.value}</h3>
              </div>
              <div className={cn("p-2.5 rounded-2xl", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-xs">
              {stat.trend && (
                <span className={cn(
                  "flex items-center font-medium mr-2",
                  stat.trendUp ? "text-farm-green" : "text-farm-orange"
                )}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.trend}
                </span>
              )}
              {stat.subtext && (
                <span className="text-farm-subtext">{stat.subtext}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-[32px] shadow-sm border border-farm-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-farm-heading">Milk Production (7 Days)</h2>
            <select className="text-sm border flex items-center border-farm-border rounded-xl bg-farm-surface py-1.5 px-3 font-medium outline-none text-farm-subtext">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.milkTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E1D8" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8E8A81', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8E8A81', fontWeight: 'bold' }} />
                <Tooltip 
                  cursor={{ fill: '#F5F2EA' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #E5E1D8', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', background: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px', fontWeight: 'bold', color: '#8E8A81' }} />
                <Bar dataKey="Morning" name="Morning Yield (L)" fill="#7A8D6E" radius={[8, 8, 0, 0]} maxBarSize={40} stackId="a" />
                <Bar dataKey="Evening" name="Evening Yield (L)" fill="#DEDACD" radius={[8, 8, 0, 0]} maxBarSize={40} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts / Health */}
        <div className="bg-farm-surface rounded-[32px] shadow-sm border border-farm-border p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-farm-heading">Herd Activity & Alerts</h2>
            <button className="text-xs text-farm-green font-bold uppercase tracking-wider hover:opacity-80 transition-opacity">View All</button>
          </div>
          <div className="space-y-4 flex-1 overflow-auto">
            {mockHealthRecords.map((record) => (
              <div key={record.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-farm-border">
                <div className="w-10 h-10 rounded-full bg-farm-bg border border-farm-border flex items-center justify-center text- farm-orange">
                  <AlertTriangle className="w-5 h-5 text-farm-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-farm-heading">Cow #{record.cattleId.replace('c', '104')} <span className="font-normal text-xs text-farm-subtext">- {record.type}</span></p>
                  <p className="text-[10px] text-farm-muted mt-0.5">{record.description}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-farm-orange"></div>
              </div>
            ))}
            
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-farm-border">
                <div className="w-10 h-10 rounded-full bg-farm-bg border border-farm-border flex items-center justify-center">
                  <Activity className="w-5 h-5 text-farm-green" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-farm-heading">Vaccination Schedule</p>
                  <p className="text-[10px] text-farm-muted mt-0.5">3 cows due for vaccines next week.</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-farm-green"></div>
              </div>
          </div>
          <button className="w-full mt-6 py-3 bg-farm-hover text-farm-dark font-bold text-xs rounded-xl uppercase tracking-widest border border-farm-border hover:opacity-80 transition-opacity cursor-pointer">
            Add Health Record
          </button>
        </div>
      </div>
    </div>
  );
}
