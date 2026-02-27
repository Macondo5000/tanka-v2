export interface LinkedApp {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  isConnected: boolean;
  connectedAt?: string;
  features?: string[];
}
