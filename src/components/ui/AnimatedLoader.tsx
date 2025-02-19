import { LoaderCircle } from "lucide-react";

const AnimatedLoader = () => {
  return (
    <div className="flex items-center justify-center ">
      {/*<LoaderCircle className="w-16 h-6 text-gray-700 animate-spin animate-duration-1000 animate-ease-linear animate-delay-150" />*/}
      <LoaderCircle className="w-16 h-6 text-gray-700 animate-spin animate-duration-1000 animate-ease-linear animate-delay-300" />
      {/*<LoaderCircle className="w-16 h-6 text-gray-700 animate-spin animate-duration-1000 animate-ease-linear" />*/}
    </div>
  );
};

export default AnimatedLoader;
