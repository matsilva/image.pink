import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
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
  const [selectedTool, setSelectedTool] = useState<Tool>('none');
  const [imageState, setImageState] = useState<ImageState>({
    url: null,
    padding: {
      horizontal: 0,
      vertical: 0,
    },
  });

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
                  src={imageState.url}
                  alt="Preview"
                  className="mx-auto max-w-full"
                  style={{
                    padding: `${imageState.padding.vertical}px ${imageState.padding.horizontal}px`,
                  }}
                />
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <p className="text-gray-500">Drop an image here or click to upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setImageState((prev) => ({ ...prev, url }));
                      }
                    }}
                  />
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
