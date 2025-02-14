import { LoaderCircle } from "lucide-react";

const AnimatedLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <LoaderCircle className="w-16 h-16 text-gray-500 animate-spin animate-duration-1000 animate-ease-linear animate-delay-150" />
      <LoaderCircle className="w-16 h-16 text-gray-500 animate-spin animate-duration-1000 animate-ease-linear animate-delay-300" />
      <LoaderCircle className="w-16 h-16 text-gray-500 animate-spin animate-duration-1000 animate-ease-linear" />
    </div>
  );
};

export default AnimatedLoader;
