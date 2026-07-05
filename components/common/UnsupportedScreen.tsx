import { Logo } from "@/public/icons/Logo";
import { poppins } from "@/app/fonts";

export default function UnsupportedScreen() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white text-black px-6 font-sans">
      <div className="flex flex-col items-center max-w-sm text-center">
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden mb-8">
          <Logo size={48} />
        </div>
        <h2
          className={`${poppins.className} text-xl font-medium tracking-tight text-black mb-3`}
        >
          Screen Size Not Supported
        </h2>
        <p className="text-[#4C4C4C] text-sm leading-relaxed">
          Kray is currently optimized for desktop views (screens{" "}
          <span className="text-[#EC5429] font-medium">1440px or wider</span>).
          Please switch to a larger device to experience our platform.
        </p>
      </div>
    </div>
  );
}
