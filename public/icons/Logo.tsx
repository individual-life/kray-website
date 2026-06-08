import React from "react";

export const Logo = ({
  color,
  size = 24,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number; color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    height={size}
    viewBox="0 0 375 375"
    className={className}
    {...props}
  >
    <defs>
      <clipPath id="4445348b7b">
        <path
          d="M 5.398438 0.398438 L 369.601562 0.398438 L 369.601562 364.601562 L 5.398438 364.601562 Z M 5.398438 0.398438 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="fd743e9864">
        <path
          d="M 187.5 0.398438 C 86.929688 0.398438 5.398438 81.929688 5.398438 182.5 C 5.398438 283.070312 86.929688 364.601562 187.5 364.601562 C 288.070312 364.601562 369.601562 283.070312 369.601562 182.5 C 369.601562 81.929688 288.070312 0.398438 187.5 0.398438 Z M 187.5 0.398438 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="f27f7fa2cc">
        <path
          d="M 0.398438 0.398438 L 364.601562 0.398438 L 364.601562 364.601562 L 0.398438 364.601562 Z M 0.398438 0.398438 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="665af0fd39">
        <path
          d="M 182.5 0.398438 C 81.929688 0.398438 0.398438 81.929688 0.398438 182.5 C 0.398438 283.070312 81.929688 364.601562 182.5 364.601562 C 283.070312 364.601562 364.601562 283.070312 364.601562 182.5 C 364.601562 81.929688 283.070312 0.398438 182.5 0.398438 Z M 182.5 0.398438 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="28bd761c34">
        <rect x="0" width="365" y="0" height="365" />
      </clipPath>
      <clipPath id="3b2a6b7caa">
        <path
          d="M 0 0.28125 L 375 0.28125 L 375 364.601562 L 0 364.601562 Z M 0 0.28125 "
          clipRule="nonzero"
        />
      </clipPath>
      <clipPath id="47789dffd8">
        <rect x="0" width="375" y="0" height="365" />
      </clipPath>
    </defs>
    <g transform="matrix(1, 0, 0, 1, 0, 5)">
      <g clipPath="url(#47789dffd8)">
        <g clipPath="url(#4445348b7b)">
          <g clipPath="url(#fd743e9864)">
            <g transform="matrix(1, 0, 0, 1, 5, 0)">
              <g clipPath="url(#28bd761c34)">
                <g clipPath="url(#f27f7fa2cc)">
                  <g clipPath="url(#665af0fd39)">
                    <path
                      fill={color || "#ec5429"}
                      d="M 0.398438 0.398438 L 364.601562 0.398438 L 364.601562 364.601562 L 0.398438 364.601562 Z M 0.398438 0.398438 "
                      fillOpacity="1"
                      fillRule="nonzero"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g clipPath="url(#3b2a6b7caa)">
          <path
            strokeLinecap="butt"
            transform="matrix(0.721593, 0.483394, -0.483394, 0.721593, 84.769444, 83.257071)"
            fill="none"
            strokeLinejoin="miter"
            d="M 6.732179 42.776918 C 83.704205 7.074635 187.981267 7.073677 319.572108 42.779015 "
            stroke="#ffffff"
            strokeWidth="32"
            strokeOpacity="1"
            strokeMiterlimit="4"
          />
        </g>
        <path
          strokeLinecap="butt"
          transform="matrix(-0.258814, 0.829085, -0.829085, -0.258814, 174.43716, 171.50537)"
          fill="none"
          strokeLinejoin="miter"
          d="M 2.263483 6.275472 C 34.932724 18.423917 73.869032 18.424974 119.066774 6.27569 "
          stroke="#ffffff"
          strokeWidth="13"
          strokeOpacity="1"
          strokeMiterlimit="4"
        />
      </g>
    </g>
  </svg>
);
