import { useState } from 'react';
import { mockCattle } from '../mockData';
import { Search, Filter, Plus, MoreVertical } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function CattleList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCattle = mockCattle.filter(c => 
    c.tagNumber.includes(searchTerm) || 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Milking': return 'bg-[#7A8D6E]/10 text-farm-green';
      case 'Dry': return 'bg-farm-hover text-farm-subtext';
      case 'Sick': return 'bg-[#D98C60]/10 text-farm-orange';
      case 'Heifer': return 'bg-blue-100 text-blue-700';
      default: return 'bg-farm-hover text-farm-subtext';
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-farm-heading font-serif">Cattle Directory</h1>
          <p className="text-sm text-farm-muted mt-1">Manage all your animals and view their life records.</p>
        </div>
        <button className="bg-farm-green hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-opacity flex items-center shrink-0 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add Cattle
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-farm-border flex flex-col flex-1 overflow-hidden">
        <div className="p-4 border-b border-farm-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-farm-surface">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-farm-muted" />
            <input 
              type="text" 
              placeholder="Search by tag, name, breed..." 
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
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Animal Info</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Breed</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Last Calving</th>
                <th scope="col" className="px-6 py-4 text-right text-[10px] font-black text-farm-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-farm-border">
              {filteredCattle.map((cow, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={cow.id} 
                  className="hover:bg-farm-surface transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-farm-bg rounded-full flex items-center justify-center border border-farm-border text-farm-heading font-bold text-sm">
                        #{cow.tagNumber}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-farm-heading">{cow.name || 'Unnamed'}</div>
                        <div className="text-[10px] text-farm-muted mt-0.5">Born: {cow.birthDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-farm-heading">{cow.breed}</div>
                    <div className="text-[10px] text-farm-muted mt-0.5">{cow.weight} kg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn("px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusColor(cow.status))}>
                      {cow.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[10px] text-farm-subtext">
                    {cow.lastCalvingDate || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-farm-muted hover:text-farm-heading cursor-pointer p-1">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              
              {filteredCattle.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-farm-muted text-sm">
                    No cattle found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-farm-border bg-farm-surface flex items-center justify-between text-[10px] font-bold text-farm-muted uppercase tracking-widest">
          <span>Showing <span className="text-farm-heading">{filteredCattle.length}</span> out of <span className="text-farm-heading">{mockCattle.length}</span> cattle</span>
        </div>
      </div>
    </div>
  );
}
