export interface DonationPost {
  id: string;
  author: {
    name: string;
    location: string;
    avatar: string;
  };
  image: string[];
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  daysLeft: number;
}
export interface Donation {
  author: {
    _id: string;
    name: string;
    image: string;
    location: string;
  };
  image: string[];
  title: string;
  cause: string;
  donationUsage: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  daysLeft: number;
  location: string;
  IBAN: string;
  BankName: string;
  AccountTitle: string;
  isCompleted: boolean;
  isFavourite: boolean;
  _id: string;
}
export interface Volunteer {
  author: {
    _id: string;
    name: string;
    image: string;
    location: string;
  };
  image: string[];
  title: string;
  cause: string;
  help: string;
  description: string;
  currentVolunteers: number;
  targetVolunteers: number;
  daysLeft: number;
  location: string;
  isCompleted: boolean;
  _id: string;
}