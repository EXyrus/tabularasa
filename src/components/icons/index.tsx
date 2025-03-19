
import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  spinner: (props: React.SVGProps<SVGSVGElement>) => <Loader2 {...props} className={`animate-spin ${props.className || ''}`} />,
  alertTriangle: AlertTriangle,
};

export default Icons;
