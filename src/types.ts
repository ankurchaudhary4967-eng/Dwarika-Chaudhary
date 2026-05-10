export interface Cattle {
  id: string;
  tagNumber: string;
  name?: string;
  breed: string;
  birthDate: string;
  weight: number;
  status: 'Milking' | 'Dry' | 'Heifer' | 'Calf' | 'Sick';
  lastCalvingDate?: string;
}

export interface MilkRecord {
  id: string;
  date: string;
  shift: 'Morning' | 'Evening';
  quantityLiters: number;
  cattleId: string;
  quality?: 'Good' | 'Fair' | 'Poor';
}

export interface HealthRecord {
  id: string;
  date: string;
  cattleId: string;
  type: 'Vaccination' | 'Illness' | 'Checkup' | 'Treatment';
  description: string;
  cost?: number;
  veterinarian?: string;
  symptoms?: string;
  diagnosis?: string;
  treatment?: string;
}

export interface BreedingRecord {
  id: string;
  cattleId: string;
  inseminationDate: string;
  bullUsed: string;
  pregnancyCheckResult: 'Pending' | 'Pregnant' | 'Open';
  expectedCalvingDate?: string;
  actualCalvingDate?: string;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: 'Feed' | 'Medical' | 'Salary' | 'Maintenance' | 'Other';
  amount: number;
  description: string;
}
