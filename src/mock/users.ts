import type { User } from '@/types/common';

export const USERS: User[] = [
  { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/40?u=me', isOnline: true },
  { id: 'jack', name: 'Jack Wu', avatar: 'https://i.pravatar.cc/40?u=jack', role: 'Sales East', isOnline: true },
  { id: 'sarah', name: 'Sarah Lin', avatar: 'https://i.pravatar.cc/40?u=sarah', role: 'Product', isOnline: true },
  { id: 'zhanghua', name: 'Zhanghua', avatar: 'https://i.pravatar.cc/40?u=zhanghua', role: 'Design', isOnline: false },
  { id: 'wang', name: 'Wang Zong', avatar: 'https://i.pravatar.cc/40?u=wang', role: 'Legal', isOnline: false },
  { id: 'chenlei', name: 'Chen Lei', avatar: 'https://i.pravatar.cc/40?u=chenlei', role: 'Frontend', isOnline: true },
  { id: 'wangfang', name: 'Wang Fang', avatar: 'https://i.pravatar.cc/40?u=wangfang', role: 'Design', isOnline: false },
  { id: 'liming', name: 'Li Ming', avatar: 'https://i.pravatar.cc/40?u=liming', role: 'Product', isOnline: true },
  { id: 'lisa', name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/40?u=lisa', role: 'Marketing', isOnline: true },
  { id: 'ai', name: 'Tanka AI', avatar: 'https://i.pravatar.cc/40?u=tanka-ai', role: 'AI Assistant', isOnline: true },
];

export const getUser = (id: string) => USERS.find(u => u.id === id)!;
