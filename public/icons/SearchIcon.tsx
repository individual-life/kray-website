import React from "react";

export const SearchIcon = ({
  color,
  size = 24,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ color, ...props.style }}
    {...props}
  >
    <circle
      cx="11.5"
      cy="11.5"
      r="9.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M20 20L22 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
