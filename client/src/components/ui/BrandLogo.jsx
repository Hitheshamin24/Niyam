import React from 'react';

export default function BrandLogo({ className = 'h-8 w-auto' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <rect width="48" height="48" rx="12" fill="#15803D" />
      <path
        d="M14 34V14L26 26V14H34V34L22 22V34H14Z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="34" cy="14" r="3" fill="#86EFAC" />
    </svg>
  );
}
