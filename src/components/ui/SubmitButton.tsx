import { CircleArrowUp, CircleStop } from "lucide-react";
import { SubmitButtonProps } from "@/types/button";

export default function SubmitButton({
  onClick,
  disabled,
  isLoading,
}: SubmitButtonProps) {
  return (
    <button
      onClick={!disabled && !isLoading ? onClick : undefined}
      disabled={disabled || isLoading}
      aria-label={isLoading ? "Processing..." : "Send message"}
      className={`absolute bottom-2 right-2 flex items-center justify-center rounded-full bg-black text-white shadow-md transition-all duration-300 hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <span className="relative flex items-center justify-center ">
        <CircleArrowUp
          className={`h-7 w-7 transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
        <CircleStop
          className={`absolute h-7 w-7 transition-opacity duration-300 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
