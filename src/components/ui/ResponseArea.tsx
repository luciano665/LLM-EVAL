import AnimatedLoader from "./AnimatedLoader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface ResponseAreaProps {
  value: string;
  isLoading?: boolean;
}

export default function ResponseArea({ value, isLoading }: ResponseAreaProps) {
  //Sidebar later
  //const isOpen = sidebar ..

  const width = "w-[535px]";

  return (
    <div className="flex justify-center items-center relative">
      <div
        className={` ${width} min-h-[600px] border rounded-md p-4 overflow-auto bg-white shadow-lg transition-all duration-200 ease-linear`}
      >
        {value ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            className="prose prose-sm max-w-[100%] m-0 [&>p]:mb-4 text-sm [&_pre]:text-sm [&_code]:text-sm"
            components={{
              p: ({ children }) => (
                <p className="whitespace-pre-line">{children}</p>
              ),
            }}
          >
            {value}
          </ReactMarkdown>
        ) : (
          <span className="text-gray-400">
            {isLoading ? "" : "The model response will appear soon..."}
          </span>
        )}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedLoader />
        </div>
      )}
    </div>
  );
}
