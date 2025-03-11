
export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  createdBy?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  recipientGroups: RecipientGroup[];
}

export interface RecipientGroup {
  id: string;
  name: string;
  type: 'all' | 'student' | 'employee' | 'parent';
  description?: string;
}
