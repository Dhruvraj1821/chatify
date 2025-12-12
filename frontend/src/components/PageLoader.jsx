import { MessageCircleIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-16 bg-cyan-500/20 rounded-full flex items-center justify-center animate-pulse">
          <MessageCircleIcon className="size-8 text-cyan-400" />
        </div>
        <p className="text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

export default PageLoader;
