export interface Post {
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
  IBAN: string;
  BankName: string;
  AccountTitle: string;
}