interface ChevronIconProps {
  expanded: boolean;
}

export const ChevronIcon = ({ expanded }: ChevronIconProps) => (
  <svg
    className={`w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
); 