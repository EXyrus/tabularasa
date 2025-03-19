
export type RecipientGroup = {
  id: string;
  name: string;
  description?: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
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
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: string[];
  createdAt: string;
  updatedAt: string;
};
