import { Cattle, ExpenseRecord, HealthRecord, MilkRecord, BreedingRecord } from './types';
import { last7Days } from './lib/utils';

export const mockCattle: Cattle[] = [
  { id: 'c1', tagNumber: '1042', name: 'Bessie', breed: 'Holstein', birthDate: '2020-03-15', weight: 650, status: 'Milking', lastCalvingDate: '2023-11-02' },
  { id: 'c2', tagNumber: '1043', name: 'Daisy', breed: 'Jersey', birthDate: '2019-06-22', weight: 480, status: 'Milking', lastCalvingDate: '2023-09-15' },
  { id: 'c3', tagNumber: '1044', breed: 'Holstein', birthDate: '2021-01-10', weight: 600, status: 'Dry', lastCalvingDate: '2022-12-05' },
  { id: 'c4', tagNumber: '1045', name: 'Bella', breed: 'Guernsey', birthDate: '2018-11-30', weight: 520, status: 'Milking', lastCalvingDate: '2024-01-20' },
  { id: 'c5', tagNumber: '1046', breed: 'Brown Swiss', birthDate: '2022-05-14', weight: 450, status: 'Heifer' },
  { id: 'c6', tagNumber: '1047', name: 'Rosie', breed: 'Holstein', birthDate: '2020-08-08', weight: 620, status: 'Sick', lastCalvingDate: '2023-10-11' },
];

// Generate some mock milk production over the last 7 days
export const mockMilkRecords: MilkRecord[] = [];
let recordId = 1;
last7Days.forEach((date) => {
  mockCattle.filter(c => c.status === 'Milking' || c.status === 'Sick').forEach(cow => {
    // Morning shift
    mockMilkRecords.push({
      id: `m${recordId++}`,
      date,
      shift: 'Morning',
      quantityLiters: cow.status === 'Sick' ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 8) + 12,
      cattleId: cow.id,
      quality: cow.status === 'Sick' ? 'Fair' : 'Good'
    });
    // Evening shift
    mockMilkRecords.push({
      id: `m${recordId++}`,
      date,
      shift: 'Evening',
      quantityLiters: cow.status === 'Sick' ? Math.floor(Math.random() * 4) + 4 : Math.floor(Math.random() * 6) + 10,
      cattleId: cow.id,
      quality: 'Good'
    });
  });
});

export const mockHealthRecords: HealthRecord[] = [
  { id: 'h1', date: last7Days[1], cattleId: 'c6', type: 'Illness', description: 'Mastitis detected in left hind quarter', cost: 150, veterinarian: 'Dr. Smith', symptoms: 'Swollen udder, reduced milk', diagnosis: 'Clinical Mastitis', treatment: 'Antibiotic therapy (Penicillin)' },
  { id: 'h2', date: last7Days[4], cattleId: 'c2', type: 'Vaccination', description: 'Annual FMD Vaccine', cost: 25, veterinarian: 'Dr. Smith', treatment: 'FMD Vaccine administered intramuscularly' },
];

export const mockBreedingRecords: BreedingRecord[] = [
  { id: 'b1', cattleId: 'c1', inseminationDate: '2023-01-20', bullUsed: 'Angus-X', pregnancyCheckResult: 'Pregnant', expectedCalvingDate: '2023-11-02', actualCalvingDate: '2023-11-02' },
  { id: 'b2', cattleId: 'c3', inseminationDate: '2023-03-10', bullUsed: 'Holstein-Premium', pregnancyCheckResult: 'Open' },
  { id: 'b3', cattleId: 'c4', inseminationDate: '2023-04-15', bullUsed: 'Guernsey-Star', pregnancyCheckResult: 'Pregnant', expectedCalvingDate: '2024-01-20', actualCalvingDate: '2024-01-20' },
  { id: 'b4', cattleId: 'c2', inseminationDate: last7Days[2], bullUsed: 'Jersey-Max', pregnancyCheckResult: 'Pending' },
];

export const mockExpenses: ExpenseRecord[] = [
  { id: 'e1', date: last7Days[6], category: 'Feed', amount: 850, description: 'Weekly concentrate and silage delivery' },
  { id: 'e2', date: last7Days[1], category: 'Medical', amount: 150, description: 'Treatment for Rosie (Mastitis)' },
  { id: 'e3', date: last7Days[0], category: 'Maintenance', amount: 320, description: 'Milking machine parts repair' }
];

export const calculateDashboardStats = () => {
  const totalCattle = mockCattle.length;
  const milkingCows = mockCattle.filter(c => c.status === 'Milking').length;
  const sickCows = mockCattle.filter(c => c.status === 'Sick').length;
  
  const today = last7Days[6];
  const todayMilkRecords = mockMilkRecords.filter(r => r.date === today);
  const totalMilkToday = todayMilkRecords.reduce((acc, curr) => acc + curr.quantityLiters, 0);

  const yesterday = last7Days[5];
  const yesterdayMilkRecords = mockMilkRecords.filter(r => r.date === yesterday);
  const totalMilkYesterday = yesterdayMilkRecords.reduce((acc, curr) => acc + curr.quantityLiters, 0);

  // Group milk by day for chart
  const milkTrends = last7Days.map(date => {
    const dailyRecords = mockMilkRecords.filter(r => r.date === date);
    const morning = dailyRecords.filter(r => r.shift === 'Morning').reduce((acc, r) => acc + r.quantityLiters, 0);
    const evening = dailyRecords.filter(r => r.shift === 'Evening').reduce((acc, r) => acc + r.quantityLiters, 0);
    return {
      date: date.substring(5), // MM-DD
      Morning: morning,
      Evening: evening,
      Total: morning + evening
    };
  });

  return { totalCattle, milkingCows, sickCows, totalMilkToday, totalMilkYesterday, milkTrends };
};
