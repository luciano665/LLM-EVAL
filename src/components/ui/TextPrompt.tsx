import * as React from "react";
//Uitlity function to merge class dynamically
import { cn } from "@/lib/utils";

/**
 * Custom text prompt area
 */

const TextPromptArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TextPromptArea.displayName = "TextPromptArea";

export { TextPromptArea };
