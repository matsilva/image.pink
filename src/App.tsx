import { useState, useRef } from 'react';
import { BellIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { usePadding } from './image-tools/padding/usePadding';
import { Logo } from './components/Logo';
import './App.css';

// Types for our image editor state
type Tool = 'padding' | 'none';

interface ImageState {
  url: string | null;
  dimensions?: {
    width: number;
    height: number;
  };
}

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>('none');
  const [imageState, setImageState] = useState<ImageState>({
    url: null,
  });

  const { padding, updatePadding, downloadWithPadding } = usePadding();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageState((prev) => ({ ...prev, url }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setImageState((prev) => ({
      ...prev,
      dimensions: {
        width: img.naturalWidth,
        height: img.naturalHeight,
      },
    }));
  };

  const handleDownload = () => {
    if (!imageRef.current || !imageState.dimensions) return;
    downloadWithPadding(imageRef.current, imageState.dimensions);
  };

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-2">
            <Logo />
          </div>
          <div className="flex items-center gap-x-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Left column - Tool selection */}
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedTool('padding')}
              className={`rounded-lg px-4 py-2 text-left ${selectedTool === 'padding' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'}`}
            >
              Padding
            </button>
          </nav>
        </aside>

        {/* Main area - Image preview and editing */}
        <main className="flex-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            {imageState.url ? (
              <div className="relative">
                <div
                  className="mx-auto inline-block max-w-full bg-white"
                  style={{
                    padding: `${padding.vertical}px ${padding.horizontal}px`,
                  }}
                >
                  <img ref={imageRef} src={imageState.url} alt="Preview" className="block max-w-full" onLoad={handleImageLoad} />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    <ArrowDownTrayIcon className="size-5" />
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleUploadClick}
                className="flex h-96 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-50"
              >
                <div className="text-center">
                  <p className="text-gray-500">Drop an image here or click to upload</p>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right column - Tool controls */}
        <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
          {selectedTool === 'padding' && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="mb-4 text-lg font-medium">Padding Controls</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Horizontal Padding (px)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={padding.horizontal}
                    onChange={(e) => updatePadding('horizontal', Number(e.target.value))}
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vertical Padding (px)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={padding.vertical}
                    onChange={(e) => updatePadding('vertical', Number(e.target.value))}
                    className="mt-1 w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
