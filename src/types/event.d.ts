
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  allDay?: boolean;
  createdBy: string;
  institutionId: string;
  recipientGroups: RecipientGroup[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipientGroup {
  id: string;
  name: string;
  type?: string;
  eventId: string;
  institutionId: string;
}
