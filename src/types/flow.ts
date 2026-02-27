import type { Status, Priority, User, ActionCardData, ActionType } from './common';
import type { ChatMessage } from './chat';

export type ArtifactType = 'document' | 'presentation' | 'website' | 'spreadsheet' | 'image' | 'report';

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  description: string;
  createdAt: string;
  stepId?: number;
  url?: string;
  size?: string;
}

export interface StepAction {
  label: string;
  state: 'executed' | 'active';
  time?: string;
}

export interface WorkplanStep {
  id: number;
  tag: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  actionRecord?: string;
  actionLabel?: string;
  actionType?: ActionType;
  actionMeta?: {
    groupName?: string;
    members?: User[];
  };
  actions?: StepAction[];
  meta?: string;
  time?: string;
}

export interface Flow {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee?: User;
  collaborators?: User[];
  workplanSteps: WorkplanStep[];
  messages: ChatMessage[];
  actions: ActionCardData[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags?: string[];
  artifacts?: Artifact[];
}
