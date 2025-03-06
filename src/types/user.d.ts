export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    appType: AppType;
  }

  export type AppType = 'vendor' | 'institution' | 'guardian';
