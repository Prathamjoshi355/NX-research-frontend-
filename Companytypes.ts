
export enum SidebarTab {
  OVERVIEW = 'OVERVIEW',
  SUBMIT_PROBLEM = 'SUBMIT PROBLEM',
  ACTIVE_PROBLEMS = 'ACTIVE PROBLEMS',
  ACTIVE_PROJECTS = 'ACTIVE PROJECTS',
  DELIVERABLES = 'DELIVERABLES',
  COMPANY_PROFILE = 'COMPANY PROFILE',
  OUR_FOUNDERS = 'OUR FOUNDERS',
  CHAT_AND_GROUP = 'CHAT & GROUP'
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
  linkedin?: string;
}

export interface RoadmapStep {
  id: number;
  title: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'PENDING';
}

export interface Attachment {
  type: 'image' | 'file';
  url: string;
  name: string;
  size?: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'other';
  text?: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: Attachment;
}

export interface Conversation {
  id: string;
  name: string;
  type: 'chat' | 'group';
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  online?: boolean;
  members?: number;
  messages: Message[];
}

export interface RequestItem {
  id: string;
  senderName: string;
  senderRole: string;
  senderImage: string;
  type: 'INVITE' | 'CONNECT';
  groupName?: string;
  time: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}
