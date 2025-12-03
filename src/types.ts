// src/types.ts
export type TourStatus = 'active' | 'inactive' | 'draft';

export interface Tour {
  id: string;
  title: string;
  price: number;
  durationDays: number;
  images: string[];       // URLs أو مسارات داخل repo أو CDN
  startDates: string[];   // ISO dates
  status: TourStatus;
  highlights: string[];   // <-- الحقل المضاف
  description?: string;
}
