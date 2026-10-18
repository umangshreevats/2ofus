
"use client";

const HeartBeatLoader = () => {
  return (
    <div className="flex min-h-[250px] items-center justify-center">
      <div className="relative flex h-40 w-40 items-center justify-center">

        {/* Ripple waves */}
        <span className="heart-wave wave-pink" />
        <span className="heart-wave wave-purple" />
        <span className="heart-wave wave-lavender" />

        {/* Heart */}
        <div className="heart-core relative z-10">
          <svg
            viewBox="0 0 100 100"
            className="h-16 w-16 drop-shadow-lg"
            fill="none"
          >
            <path
              d="M50 88 C40 78 10 58 10 34 C10 5 43 2 50 28 C57 2 90 5 90 34 C90 58 60 78 50 88Z"
              fill="url(#heartGradient)"
            />
            <defs>
              <linearGradient
                id="heartGradient"
                x1="10"
                y1="10"
                x2="90"
                y2="90"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8FAB" />
                <stop offset="1" stopColor="#E84393" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>
    </div>
  );
};

export default HeartBeatLoader;
