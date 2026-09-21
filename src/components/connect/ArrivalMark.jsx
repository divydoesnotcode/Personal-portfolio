import { useId } from "react";

export function ArrivalMark() {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");

  return (
    <div className="connect-mark-wrap" data-connect="mark-wrap" aria-hidden="true">
      <svg className="connect-orbit" viewBox="0 0 168 168">
        <circle
          className="connect-orbit-path"
          data-connect="orbit-path"
          cx="84"
          cy="84"
          r="66"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="connect-rings">
        <span data-connect="ring" />
        <span data-connect="ring" />
        <span data-connect="ring" />
      </div>

      <span className="connect-bridge" data-connect="bridge" />
      <span className="connect-node connect-node-a" data-connect="node-a" />
      <span className="connect-node connect-node-b" data-connect="node-b" />

      <div className="connect-mark" data-connect="mark">
        <svg viewBox="0 0 88 88" role="presentation">
          <defs>
            <linearGradient id={`${uid}-fill`} x1="8" y1="8" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#dc915a" />
              <stop offset="1" stopColor="#efc08d" />
            </linearGradient>
            <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="45%" stopColor="#fff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${uid}-plate`}>
              <rect x="4" y="4" width="80" height="80" rx="18" />
            </clipPath>
            <clipPath id={`${uid}-letter`}>
              <rect data-connect="letter-mask" x="22" y="18" width="48" height="52" />
            </clipPath>
          </defs>
          <rect
            data-connect="plate"
            x="4"
            y="4"
            width="80"
            height="80"
            rx="18"
            fill={`url(#${uid}-fill)`}
          />
          <g data-connect="letters" clipPath={`url(#${uid}-letter)`}>
            <path
              d="M30 22h14c11 0 19 8 19 18s-8 18-19 18H30V22zm8 8v20h6c6.6 0 11-4.3 11-10s-4.4-10-11-10H38z"
              fill="#191c21"
            />
          </g>
          <rect
            className="connect-shine"
            data-connect="shine"
            x="0"
            y="0"
            width="36"
            height="88"
            fill={`url(#${uid}-shine)`}
            clipPath={`url(#${uid}-plate)`}
          />
        </svg>
      </div>
    </div>
  );
}
