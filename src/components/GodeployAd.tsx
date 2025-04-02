export function GodeployAd() {
  return (
    <a
      href="https://godeploy.app"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-white hover:border-pink-200 transition-all duration-300 shadow-sm"
    >
      <div className="grid grid-cols-2 gap-0.5 mr-1.5">
        <div className="w-1.5 h-1.5 rounded-sm bg-pink-300" />
        <div className="w-1.5 h-1.5 rounded-sm bg-pink-400" />
        <div className="w-1.5 h-1.5 rounded-sm bg-pink-400" />
        <div className="w-1.5 h-1.5 rounded-sm bg-pink-500" />
      </div>
      deployed with godeploy
    </a>
  );
}
