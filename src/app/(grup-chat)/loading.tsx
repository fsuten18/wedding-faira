export default function Loading() {
  return (
    <div className="flex items-center justify-center h-dvh w-full bg-background">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex space-x-1 items-center">
          <span
            className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"
            style={{ animationDelay: "-0.3s", animationDuration: "1.2s" }}
          ></span>
          <span
            className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"
            style={{ animationDelay: "-0.15s", animationDuration: "1.2s" }}
          ></span>
          <span
            className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"
            style={{ animationDuration: "1.2s" }}
          ></span>
        </div>
        <p className="text-sm text-white-500">Loading...</p>
      </div>
    </div>
  );
}
