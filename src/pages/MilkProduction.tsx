import { useState } from 'react';
import { mockMilkRecords, mockCattle } from '../mockData';
import { last7Days } from '../lib/utils';
import { Plus, Download, BarChart2 } from 'lucide-react';

export function MilkProduction() {
  const [selectedDate, setSelectedDate] = useState(last7Days[6]); // Today
  
  const dailyRecords = mockMilkRecords.filter(r => r.date === selectedDate);
  const morningYield = dailyRecords.filter(r => r.shift === 'Morning').reduce((a, b) => a + b.quantityLiters, 0);
  const eveningYield = dailyRecords.filter(r => r.shift === 'Evening').reduce((a, b) => a + b.quantityLiters, 0);
  const totalYield = morningYield + eveningYield;

  const todayCattleIds = Array.from(new Set(dailyRecords.map(r => r.cattleId)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-farm-heading font-serif">Milk Production Logs</h1>
          <p className="text-sm text-farm-muted mt-1">Track daily milk yields, quality, and shifts.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-farm-border hover:bg-farm-hover text-farm-text px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors flex items-center cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-farm-green hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-opacity flex items-center cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </button>
        </div>
      </div>

      {/* Date Selector & Summary Bar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-farm-border flex-1">
          <label className="block text-sm font-medium text-farm-subtext mb-2 tracking-wider uppercase text-[10px]">Select Date</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={last7Days[6]}
            className="w-full sm:w-auto px-4 py-2 border border-farm-border bg-farm-surface rounded-xl focus:ring-2 focus:ring-farm-green focus:border-farm-green outline-none text-farm-heading"
          />
          
          <div className="mt-6 flex flex-col sm:flex-row gap-6 border-t border-farm-border pt-6">
            <div className="flex-1">
              <p className="text-[10px] text-farm-muted uppercase tracking-wider font-black">Morning Shift</p>
              <p className="text-2xl font-bold text-farm-heading mt-1 font-serif">{morningYield} <span className="text-base font-sans font-normal text-farm-muted">Liters</span></p>
            </div>
            <div className="hidden sm:block w-px bg-farm-border"></div>
            <div className="flex-1">
              <p className="text-[10px] text-farm-muted uppercase tracking-wider font-black">Evening Shift</p>
              <p className="text-2xl font-bold text-farm-heading mt-1 font-serif">{eveningYield} <span className="text-base font-sans font-normal text-farm-muted">Liters</span></p>
            </div>
            <div className="hidden sm:block w-px bg-farm-border"></div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-farm-green">Total Yield</p>
              <p className="text-3xl font-bold text-farm-green mt-1 font-serif">{totalYield} <span className="text-lg font-sans font-normal opacity-80">Liters</span></p>
            </div>
          </div>
        </div>
        
        <div className="bg-farm-green p-6 rounded-[32px] shadow-sm text-white lg:w-80 flex flex-col justify-center relative overflow-hidden">
          <BarChart2 className="absolute -right-6 -bottom-6 w-32 h-32 text-white opacity-10" />
          <h3 className="text-[10px] uppercase tracking-wider font-black opacity-80 relative z-10">Average per Cow</h3>
          <p className="text-4xl font-bold mt-2 font-serif relative z-10">
            {todayCattleIds.length > 0 ? (totalYield / todayCattleIds.length).toFixed(1) : 0} <span className="text-xl font-sans font-normal opacity-75">L</span>
          </p>
          <p className="text-xs mt-4 opacity-80 relative z-10">From {todayCattleIds.length} actively milking cows today.</p>
        </div>
      </div>

      {/* Detailed Records Table */}
      <div className="bg-white rounded-[32px] shadow-sm border border-farm-border overflow-hidden">
        <div className="px-6 py-4 border-b border-farm-border flex items-center justify-between bg-farm-surface">
          <h3 className="font-serif font-bold text-farm-heading">Individual Records for {selectedDate}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-farm-border">
            <thead className="bg-farm-surface">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Tag #</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Cow Name</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Shift</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Yield (L)</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-black text-farm-muted uppercase tracking-wider">Quality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-farm-border bg-white">
              {dailyRecords.length > 0 ? (
                dailyRecords.map(record => {
                  const cow = mockCattle.find(c => c.id === record.cattleId);
                  return (
                    <tr key={record.id} className="hover:bg-farm-surface transition-colors">
                      <td className="px-6 py-3 text-sm font-bold text-farm-heading">#{cow?.tagNumber}</td>
                      <td className="px-6 py-3 text-[10px] font-bold text-farm-subtext">{cow?.name || '-'}</td>
                      <td className="px-6 py-3 text-[10px] text-farm-muted uppercase tracking-wider">{record.shift}</td>
                      <td className="px-6 py-3 text-sm font-bold text-farm-heading font-serif">{record.quantityLiters}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          record.quality === 'Good' ? 'bg-[#7A8D6E]/10 text-farm-green' :
                          record.quality === 'Fair' ? 'bg-[#D98C60]/10 text-farm-orange' :
                           'bg-red-100 text-red-800'
                        }`}>
                          {record.quality || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-farm-muted text-sm">
                    No milk records found for this date.
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
