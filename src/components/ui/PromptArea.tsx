import { TextPromptArea } from "./TextPrompt";
import { ChangeEvent } from "react";
import { PromptAreaProps } from "@/types/prompt";

/**
 * Prompt component
 *
 * A controlled textarea input compunent to handle user queries -> prompts
 *
 * ✅ Uses the `Textarea` component for consistent styling and accessibility.
 * ✅ Implements a controlled input (`value` + `onChange`) to ensure state management remains in the parent.
 * ✅ Supports `placeholder` and `disabled` props for flexibility.
 * ✅ Includes an `aria-label` for better screen reader accessibility.
 */

export default function PromptArea({
  value,
  onChange,
  placeholder,
  disabled,
}: PromptAreaProps) {
  //Efficiently updates the parent state on input change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  return (
    <TextPromptArea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label="Insert you prompt here and see..."
      className="min-h-[70px] w-full resize-none bg-white shadow-lg"
    />
  );
}
