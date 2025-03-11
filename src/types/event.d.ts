export type Event = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  createdBy?: string;
  description?: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
  recipientGroups: RecipientGroup[];
};

export type RecipientGroup = {
  id: string;
  institutionId: string;
  name: string;
  type: 'all' | 'student' | 'employee' | 'parent';
  recipients: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
};