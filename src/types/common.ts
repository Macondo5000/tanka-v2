export type Status = 'pending' | 'awaiting' | 'actioning';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type ActionType = 'create_group' | 'send_email' | 'nudge' | 'generate_doc' | 'fetch_data';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  email?: string;
  isOnline?: boolean;
}

export interface ActionCardData {
  id: string;
  type: ActionType;
  label: string;
  description: string;
  state: 'proposed' | 'executed' | 'dismissed';
  groupName?: string;
  members?: User[];
  recipient?: string;
  subject?: string;
  body?: string;
  timestamp: string;
}

export const STATUS_CONFIG: Record<Status, { label: string; tagStyle: string; dotColor: string }> = {
  pending: { label: 'Pending', tagStyle: 'bg-amber-50 text-amber-600', dotColor: 'bg-amber-400' },
  awaiting: { label: 'Awaiting', tagStyle: 'bg-blue-50 text-blue-600', dotColor: 'bg-blue-400' },
  actioning: { label: 'Actioning', tagStyle: 'bg-emerald-50 text-emerald-600', dotColor: 'bg-emerald-400' },
};

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; fill: string }> = {
  critical: { label: 'Critical', color: 'text-red-500', fill: 'fill-red-500' },
  high: { label: 'High', color: 'text-orange-400', fill: 'fill-orange-400' },
  medium: { label: 'Medium', color: 'text-yellow-500', fill: 'fill-yellow-500' },
  low: { label: 'Low', color: 'text-gray-300', fill: 'fill-gray-300' },
};
