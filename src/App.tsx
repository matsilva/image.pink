import { useState, useRef } from 'react';
import { BellIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { usePadding } from './image-tools/padding/usePadding';
import { Logo } from './components/Logo';
import { t } from '@matsilva/xtranslate';

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

  const { padding, updatePadding, downloadWithPadding, toggleTransparentPadding } = usePadding();

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
        <div className="mx-auto flex h-16 items-center justify-start ">
          <div className="flex items-center gap-x-2">
            <Logo />
          </div>
          <div className="flex items-center gap-x-8 ml-14">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300" title={t('notifications.tooltip')}>
              <span className="sr-only">{t('notifications.view')}</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex w-full h-[calc(100vh-4rem)]">
        {/* Left column - Tool selection */}
        <aside className="hidden w-44 shrink-0 lg:block border-r border-gray-200 py-8 bg-white">
          <nav className="flex flex-col w-full">
            <button
              onClick={() => setSelectedTool('padding')}
              className={`w-full  px-4 py-2 text-left ${selectedTool === 'padding' ? 'bg-pink-50 text-pink-700' : 'hover:bg-gray-100'}`}
            >
              {t('tools.padding')}
            </button>
          </nav>
        </aside>

        {/* Main area - Image preview and editing */}
        <main className="flex-1 min-w-0">
          <div className="h-full bg-gray-50 [background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [background-size:20px_20px]">
            {imageState.url ? (
              <div className="relative h-full flex items-center justify-center">
                <div
                  className={`max-w-full max-h-full ${padding.isTransparent ? '' : 'bg-white'} shadow-sm rounded-sm`}
                  style={{
                    padding: `${padding.vertical}px ${padding.horizontal}px`,
                    border: padding.isTransparent ? '2px dashed #d1d5db' : 'none',
                  }}
                >
                  <img
                    ref={imageRef}
                    src={imageState.url}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                    aria-label={t('image.actions.download')}
                  >
                    <ArrowDownTrayIcon className="size-5" />
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {t('image.actions.change')}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleUploadClick}
                className="transition-all duration-300 flex h-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-500/10"
              >
                <div className="text-center">
                  <p className="text-gray-500">{t('image.upload.prompt')}</p>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right column - Tool controls */}
        <aside className="hidden w-96 shrink-0 xl:block border-l border-gray-200 pl-8 py-8 bg-white">
          {selectedTool === 'padding' && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="mb-4 text-lg font-medium">{t('padding.controls.title')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('padding.controls.horizontal')}</label>
                  <div className="mt-1 flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      value={padding.horizontal}
                      onChange={(e) => updatePadding('horizontal', Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <input
                      type="number"
                      min="0"
                      value={padding.horizontal}
                      onChange={(e) => updatePadding('horizontal', Number(e.target.value))}
                      className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('padding.controls.vertical')}</label>
                  <div className="mt-1 flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      value={padding.vertical}
                      onChange={(e) => updatePadding('vertical', Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <input
                      type="number"
                      min="0"
                      value={padding.vertical}
                      onChange={(e) => updatePadding('vertical', Number(e.target.value))}
                      className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <label className="relative inline-flex items-center">
                    <input type="checkbox" checked={padding.isTransparent} onChange={toggleTransparentPadding} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{t('padding.controls.transparent')}</span>
                  </label>
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
