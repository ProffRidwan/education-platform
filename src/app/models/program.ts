export interface Program {
  id: string;
  title: string;
  university: string;
  country: string;
  flag: string;
  image: string;
  price: number;
  duration: string;
  level: string;
  type: string;
  attendance: string;
  startDate: string;
  isFavorite?: boolean;
  description?: string;
  verifiedIcon: string;
  schoolIcon: string
  countryFlags?: { flag: string; code: string }[];
  startDateColor: string;
  attendanceColor: string;
}
