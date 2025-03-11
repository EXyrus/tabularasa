
export interface Institution {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  slug?: string;
  email?: string;
  phoneNumber?: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionResponse {
  institutions: Institution[];
}

export interface InstitutionsResponse {
  registered: number | string;
  active: number | string;
  inactive: number | string;
  pending: number | string;
  tertiary: number | string;
  secondary: number | string;
  primary: number | string;
}

export interface InstitutionRole {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  module: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface InstitutionDetailsPayload {
  id: string;
  name?: string;
  institutionType?: string;
  email?: string;
  phoneNumber?: string;
}

export interface InstitutionStatusPayload {
  id: string;
  status: 'active' | 'inactive' | 'pending';
}
