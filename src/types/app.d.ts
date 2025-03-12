
import { ComponentType } from 'react';
import type { A } from 'ts-toolbelt';
import type { UserRole } from './users';

export type AppType = 'vendor' | 'institution' | 'guardian' | 'student';

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent;
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

export type BrowserId = A.Type<string, 'browser_id'>;

export type CorrelationId = A.Type<string, 'correlation_id'>;

export type SessionId = A.Type<string, 'session_id'>;

export type Session = {
  browserId: BrowserId;
  sessionId: SessionId;
  ipAddress: string;
  userId: string | null;
};

export type RouteConfig = {
  index?: boolean;
  path: string;
  exact?: boolean;
  title?: string;
  component: ComponentType;
  userRole: UserRole;
  // children?: RouteConfig[];
};


export type LocationState = {
  from?: string;
  redirectTo?: string;
  [key: string]: any;
};


export type AppScope = 'public' | 'vendor' | 'institution' | 'student';
