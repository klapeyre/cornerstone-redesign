import type { SVGProps } from "react";

export function DoorsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="6"
        y="3"
        width="12"
        height="18"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function MouldingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 18 L4 8 L10 4 L20 4 L20 6 L11 6 L11 18 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MillworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 20 L4 10 L12 4 L20 10 L20 20 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M4 20 L20 20" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
