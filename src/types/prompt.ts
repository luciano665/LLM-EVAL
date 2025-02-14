export interface PromptAreaProps {
    value: string, 
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}