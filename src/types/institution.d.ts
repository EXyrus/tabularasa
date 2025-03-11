
import { Role, Permission } from './auth';
import { AppType } from './app';

export type Settings = {
  id: number;
  logo: string;
  color: string;
  slug: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
};

export type Organization = {
  id: number;
  name: string;
  parentId: number | null;
  origin: boolean;
  institutionId: number;
  organizations: Organization[];
};
export interface OrganizationNode extends Organization {
  children?: OrganizationNode[];
}
export interface Institution {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  type?: 'primary' | 'secondary' | 'tertiary';
  slug?: string;
  email?: string;
  phoneNumber?: string;
  settings?: Settings;
  modules?: Module[];
  organization?: Organization;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}



export interface Permission {
  id: string;
  name: string;
  module: string;
}



export type Module = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  pivot: {
    institutionId: string;
    moduleId: string;
  };
  permissions: Permission[];
};

export type Role = {
  id: string;
  name: string;
  description: string;
  institutionId: string;
  permissions: Permission[];
};

export type InstitutionTheme = {
  logo: string;
  color: string;
  id: string;
};

export type InstitutionRole = {
  id: number;
  name: string;
  permissions: Permission[];
};


export interface InstitutionRole {
  id: string;
  name: string;
  description: string;
  institutionId: string;
  permissionIds: string[];
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionTheme {
  data: {
    id: string;
    color: string;
    logo: string;
    name: string;
  };
}

export interface Module {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


