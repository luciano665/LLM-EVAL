import { LoaderCircle } from "lucide-react";

const AnimatedLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className="w-16 h-16 text-gray-500 animate-spin [animation-delay:-0.3s] -mr-10" />
      <LoaderCircle className="w-16 h-16 text-gray-500 animate-spin [animation-delay:-0.15s] -mr-10" />
      <LoaderCircle className="w-16 h-16 text-gray-500 animate-spin" />
    </div>
  );
};

export default AnimatedLoader;
