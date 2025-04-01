import { useState, useRef } from 'react';
import { BellIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import './App.css';

// Types for our image editor state
type Tool = 'padding' | 'none';

interface ImageState {
  url: string | null;
  padding: {
    horizontal: number;
    vertical: number;
  };
}

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>('none');
  const [imageState, setImageState] = useState<ImageState>({
    url: null,
    padding: {
      horizontal: 0,
      vertical: 0,
    },
  });

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

  const handleDownload = () => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to match the padded image dimensions
    canvas.width = img.naturalWidth + imageState.padding.horizontal * 2;
    canvas.height = img.naturalHeight + imageState.padding.vertical * 2;

    // Fill background with white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the image with padding
    ctx.drawImage(img, imageState.padding.horizontal, imageState.padding.vertical, img.naturalWidth, img.naturalHeight);

    // Convert to blob and create download link
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'padded-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-pink-600">image.pink</h1>
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
                <img
                  ref={imageRef}
                  src={imageState.url}
                  alt="Preview"
                  className="mx-auto max-w-full"
                  style={{
                    padding: `${imageState.padding.vertical}px ${imageState.padding.horizontal}px`,
                  }}
                />
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
                    value={imageState.padding.horizontal}
                    onChange={(e) =>
                      setImageState((prev) => ({
                        ...prev,
                        padding: {
                          ...prev.padding,
                          horizontal: Number(e.target.value),
                        },
                      }))
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vertical Padding (px)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={imageState.padding.vertical}
                    onChange={(e) =>
                      setImageState((prev) => ({
                        ...prev,
                        padding: {
                          ...prev.padding,
                          vertical: Number(e.target.value),
                        },
                      }))
                    }
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
