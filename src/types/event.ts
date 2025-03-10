
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  allDay?: boolean;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipientGroup {
  id: string;
  name: string;
  description: string;
  type?: string;
  eventId?: string;
  institutionId: string;
  recipients: string[];
  createdAt: string;
  updatedAt: string;
}
