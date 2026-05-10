import { useState } from 'react';
import { mockHealthRecords, mockCattle } from '../mockData';
import { Search, Filter, Plus, Activity, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function HealthLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecords = mockHealthRecords.filter(record => {
    const cow = mockCattle.find(c => c.id === record.cattleId);
    const searchString = `${cow?.tagNumber || ''} ${cow?.name || ''} ${record.diagnosis || ''} ${record.type || ''}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-farm-heading font-serif">Health & Vet Logs</h1>
          <p className="text-sm text-farm-muted mt-1">Track symptoms, diagnoses, and treatments for every animal.</p>
        </div>
        <button className="bg-farm-green hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-opacity flex items-center shrink-0 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Log Health Event
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-farm-border flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-farm-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-farm-surface">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-farm-muted" />
            <input 
              type="text" 
              placeholder="Search by tag, name, diagnosis, type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-farm-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-green focus:border-farm-green transition-all bg-farm-bg"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-farm-border rounded-xl text-sm font-medium text-farm-heading bg-white hover:bg-farm-hover cursor-pointer w-full sm:w-auto justify-center transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter Records
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-farm-border">
            <thead className="bg-farm-surface sticky top-0 shadow-sm shadow-farm-border/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Animal</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Health Details</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Veterinarian</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Treatment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-farm-border">
              {filteredRecords.map((record, i) => {
                const cow = mockCattle.find(c => c.id === record.cattleId);
                const isIllness = record.type === 'Illness';
                
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={record.id} 
                    className="hover:bg-farm-surface transition-colors align-top"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-farm-heading">{record.date}</div>
                      <div className="text-[10px] text-farm-muted mt-1 uppercase tracking-wider">{record.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 bg-farm-bg rounded-full flex items-center justify-center border border-farm-border text-farm-heading font-bold text-xs">
                          {cow?.tagNumber}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-farm-heading">{cow?.name || 'Unnamed'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        {isIllness ? (
                          <AlertTriangle className="w-4 h-4 text-farm-orange mr-2 mt-0.5 shrink-0" />
                        ) : (
                          <Activity className="w-4 h-4 text-farm-green mr-2 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-bold text-farm-heading mb-1">{record.diagnosis || record.description}</p>
                          {record.symptoms && (
                            <p className="text-xs text-farm-subtext italic">Symptoms: {record.symptoms}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-farm-heading">{record.veterinarian || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-farm-subtext max-w-xs truncate">
                      {record.treatment || 'No specific treatment logged.'}
                    </td>
                  </motion.tr>
                );
              })}
              
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-farm-muted text-sm">
                    No health records found matching your search.
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
