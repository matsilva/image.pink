export function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinkGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </linearGradient>

        {/* Refined glow for better text clarity */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
          <feFlood floodColor="white" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* First frame - represents the constrained space */}
      <rect x="25" y="10" width="20" height="20" stroke="#EC4899" strokeWidth="2" fill="none">
        <animateTransform attributeName="transform" type="rotate" from="0 35 20" to="360 35 20" dur="20s" repeatCount="indefinite" />
      </rect>

      {/* Second frame - represents the expanding space */}
      <rect x="45" y="10" width="20" height="20" stroke="#EC4899" strokeWidth="2" fill="none">
        <animate attributeName="width" values="20;30;20" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
        <animate attributeName="height" values="20;30;20" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
        <animate attributeName="x" values="45;40;45" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
        <animate attributeName="y" values="10;5;10" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
      </rect>

      {/* The dot - a playful element that moves between the frames */}
      <circle cx="35" cy="20" r="3" fill="#EC4899">
        <animate attributeName="cx" values="35;55;35" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
        <animate attributeName="r" values="3;4;3" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
      </circle>

      {/* The connecting line that follows the dot */}
      <line x1="35" y1="20" x2="55" y2="20" stroke="url(#pinkGlow)" strokeWidth="2">
        <animate attributeName="x2" values="35;55;35" dur="4s" repeatCount="indefinite" calcMode="ease-in-out" />
      </line>

      {/* Text element with perfect balance */}
      <g filter="url(#softGlow)">
        <text x="85" y="24" className="text-[13px] font-bold" fill="#EC4899" textAnchor="middle" style={{ letterSpacing: '0.07em' }}>
          pink
        </text>
      </g>
    </svg>
  );
}
