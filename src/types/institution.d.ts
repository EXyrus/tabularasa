export type Organization = {
    id: number;
    name: string;
    parentId: number | null;
    origin: boolean;
    institutionId: number;
    organizations: Organization[];
};

export type Institution = {
    id: string;
    name: string;
    email: string;
    slug: string;
    status: 'active' | 'pending' | 'inactive';
    type?: 'primary' | 'secondary' | 'tertiary';
    phoneNumber: string;
    deletedAt: string | null;
    settings?: Settings;
    modules?: Module[];
    organization?: Organization;
};

export type Settings = {
    id: number;
    logo: string;
    color: string;
    slug: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
};

export type Permission = {
    id: string;
    name: string;
    moduleId: string;
    createdAt: string;
    updatedAt: string;
};

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

export type BankAccount = {
    id: string;
    bank: string;
    accountNumber: string;
    accountName: string;
    accountType: string;
    isDefault?: boolean;
};

export type BankAccountResponse = BankAccount;
