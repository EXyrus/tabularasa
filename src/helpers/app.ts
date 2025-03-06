
import { AppType } from '@/types/app';

export const getAppLogo = (appType: AppType): string => {
  switch (appType) {
    case 'vendor':
      return '/images/vendor-logo.png';
    case 'institution':
      return '/images/institution-logo.png';
    case 'guardian':
      return '/images/guardian-logo.png';
    case 'student':
      return '/images/student-logo.png';
    default:
      return '/images/default-logo.png';
  }
};

export const getAppThemeColor = (appType: AppType): string => {
  switch (appType) {
    case 'vendor':
      return '#6366f1'; // indigo-500
    case 'institution':
      return '#3b82f6'; // blue-500
    case 'guardian':
      return '#10b981'; // emerald-500
    case 'student':
      return '#f59e0b'; // amber-500
    default:
      return '#6366f1'; // indigo-500
  }
};

export const getAppName = (appType: AppType): string => {
  switch (appType) {
    case 'vendor':
      return 'Vendor Portal';
    case 'institution':
      return 'Institution Portal';
    case 'guardian':
      return 'Guardian Portal';
    case 'student':
      return 'Student Portal';
    default:
      return 'TabulaRasa';
  }
};
