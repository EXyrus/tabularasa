
export type RecipientGroup = {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  type?: string;
};

export type Organization = {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Organization[];
  level?: number;
};

export type OrganizationNode = {
  id: string;
  name: string;
  parentId?: string;
  children?: OrganizationNode[];
  level?: number;
  path?: string[];
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  startDate?: string;
  endDate?: string;
  location: string;
  organizer?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: string[];
  createdAt?: string;
  updatedAt?: string;
  allDay?: boolean;
  createdBy?: string;
  recipientGroups?: { id: string; name: string; type: string; members: number }[];
};
