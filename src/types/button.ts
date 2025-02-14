export interface SubmitButtonProps {
    onClick: () => Promise<void>;
    disabled?: boolean;
    isLoading?: boolean;
}