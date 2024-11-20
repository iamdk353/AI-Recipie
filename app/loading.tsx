import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="mx-auto h-screen flex justify-center items-center flex-col">
      <Loader className="animate-spin size-28" />
      <p className="text-2xl">Loading...</p>
    </div>
  );
}
