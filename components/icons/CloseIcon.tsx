import type { SVGProps } from "react";

/**
 * Symmetric close mark (two crossed strokes from corner to corner).
 * Avoids occasional uneven rendering from generic icon packs at small sizes.
 */
export function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
