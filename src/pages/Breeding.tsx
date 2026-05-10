import { useState } from 'react';
import { mockBreedingRecords, mockCattle } from '../mockData';
import { Plus, Search, Filter, CalendarDays, HeartPulse } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function Breeding() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecords = mockBreedingRecords.filter(record => {
    const cow = mockCattle.find(c => c.id === record.cattleId);
    return `${cow?.tagNumber || ''} ${cow?.name || ''} ${record.bullUsed || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pregnant': return 'bg-[#7A8D6E]/10 text-farm-green';
      case 'Open': return 'bg-farm-hover text-farm-subtext';
      case 'Pending': return 'bg-[#D98C60]/10 text-farm-orange';
      default: return 'bg-farm-hover text-farm-subtext';
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-farm-heading font-serif">Breeding & Reproduction</h1>
          <p className="text-sm text-farm-muted mt-1">Manage insemination, pregnancy checks, and calving timelines.</p>
        </div>
        <button className="bg-farm-green hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-opacity flex items-center shrink-0 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Log Breeding Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-farm-border flex items-center gap-4">
           <div className="w-14 h-14 bg-[#7A8D6E]/10 rounded-2xl flex items-center justify-center text-farm-green">
             <HeartPulse className="w-7 h-7" />
           </div>
           <div>
             <h4 className="text-[10px] uppercase tracking-wider font-black text-farm-muted">Upcoming Checks</h4>
             <p className="text-2xl font-serif text-farm-dark mt-1">
               {mockBreedingRecords.filter(r => r.pregnancyCheckResult === 'Pending').length} <span className="text-sm font-sans font-normal text-farm-muted">Pending</span>
             </p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-farm-border flex items-center gap-4">
           <div className="w-14 h-14 bg-[#D98C60]/10 rounded-2xl flex items-center justify-center text-farm-orange">
             <CalendarDays className="w-7 h-7" />
           </div>
           <div>
             <h4 className="text-[10px] uppercase tracking-wider font-black text-farm-muted">Upcoming Calving</h4>
             <p className="text-2xl font-serif text-farm-dark mt-1">
               2 <span className="text-sm font-sans font-normal text-farm-muted">This Month</span>
             </p>
           </div>
        </div>
        <div className="bg-farm-green text-white p-6 rounded-[32px] shadow-sm border border-farm-border flex items-center gap-4">
           <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
             <HeartPulse className="w-7 h-7" />
           </div>
           <div>
             <h4 className="text-[10px] uppercase tracking-wider font-black opacity-80">Conception Rate</h4>
             <p className="text-2xl font-serif mt-1">
               68% <span className="text-sm font-sans font-normal opacity-80">Avg.</span>
             </p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-farm-border flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-farm-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-farm-surface">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-farm-muted" />
            <input 
              type="text" 
              placeholder="Search by cow, bull used..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-farm-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-green focus:border-farm-green transition-all bg-farm-bg"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-farm-border rounded-xl text-sm font-medium text-farm-heading bg-white hover:bg-farm-hover cursor-pointer w-full sm:w-auto justify-center transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-farm-border">
            <thead className="bg-farm-surface sticky top-0 shadow-sm shadow-farm-border/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Cow Info</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Insemination</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Expected Calving</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Actual Calving</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-farm-border">
              {filteredRecords.map((record, i) => {
                const cow = mockCattle.find(c => c.id === record.cattleId);
                
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={record.id} 
                    className="hover:bg-farm-surface transition-colors align-middle"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-farm-bg rounded-full flex items-center justify-center border border-farm-border text-farm-heading font-bold text-sm">
                          {cow?.tagNumber}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-farm-heading">{cow?.name || 'Unnamed'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-farm-heading">{record.inseminationDate}</div>
                      <div className="text-[10px] text-farm-muted mt-0.5">Bull: {record.bullUsed}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn("px-2.5 py-1 inline-flex text-[10px] uppercase tracking-wider font-bold rounded-md", getStatusColor(record.pregnancyCheckResult))}>
                        {record.pregnancyCheckResult}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-farm-heading">{record.expectedCalvingDate || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-farm-heading">{record.actualCalvingDate || '-'}</div>
                    </td>
                  </motion.tr>
                );
              })}
              
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-farm-muted text-sm">
                    No breeding records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
