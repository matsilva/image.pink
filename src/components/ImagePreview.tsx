import { useRef } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { t } from '@matsilva/xtranslate';
import { GodeployAd } from './GodeployAd';

type Tool = 'padding' | 'resize' | 'none';

interface ImageState {
  url: string | null;
  dimensions?: {
    width: number;
    height: number;
  };
}

interface PaddingOptions {
  isTransparent: boolean;
  vertical: number;
  horizontal: number;
}

interface ResizeOptions {
  width: number;
  height: number;
  backgroundColor: string | null;
  stretchToFill: boolean;
}

interface ImagePreviewProps {
  imageState: ImageState;
  selectedTool: Tool;
  padding: {
    options: PaddingOptions;
  };
  resizeOptions: ResizeOptions;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onDownload: (imageElement: HTMLImageElement) => void;
  onUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImagePreview({
  imageState,
  selectedTool,
  padding,
  resizeOptions,
  onImageLoad,
  onDownload,
  onUploadClick,
  fileInputRef,
  onFileSelect,
}: ImagePreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDownload = () => {
    if (imageRef.current) {
      onDownload(imageRef.current);
    }
  };

  return (
    <main className="flex-1 min-w-0">
      <div className="h-full bg-gray-50 [background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [background-size:20px_20px] relative">
        {imageState.url ? (
          <div className="relative h-full flex items-center justify-center p-8">
            <div
              className={`relative inline-flex items-center justify-center border-2 border-dashed border-gray-300 rounded-sm ${
                selectedTool === 'padding'
                  ? `${padding.options.isTransparent ? '' : 'bg-white'}`
                  : resizeOptions.backgroundColor
                    ? ''
                    : 'bg-white'
              }`}
              style={{
                ...(selectedTool === 'padding' && {
                  padding: `${padding.options.vertical}px ${padding.options.horizontal}px`,
                  border: padding.options.isTransparent ? '2px dashed #d1d5db' : 'none',
                }),
                ...(selectedTool === 'resize' && {
                  width: `${resizeOptions.width}px`,
                  height: `${resizeOptions.height}px`,
                  backgroundColor: resizeOptions.backgroundColor || 'transparent',
                  overflow: 'hidden',
                }),
              }}
            >
              <img
                ref={imageRef}
                src={imageState.url}
                alt="Preview"
                className={`${
                  selectedTool === 'resize'
                    ? resizeOptions.stretchToFill
                      ? 'w-full h-full object-cover'
                      : 'max-w-full max-h-full object-contain'
                    : 'max-h-[calc(100vh-10rem)] object-contain'
                }`}
                style={{
                  ...(selectedTool === 'resize' && {
                    width: resizeOptions.stretchToFill ? '100%' : 'auto',
                    height: resizeOptions.stretchToFill ? '100%' : 'auto',
                  }),
                }}
                onLoad={onImageLoad}
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
                onClick={onUploadClick}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {t('image.actions.change')}
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={onUploadClick}
            className="transition-all duration-300 flex h-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-500/10"
          >
            <div className="text-center">
              <p className="text-gray-500">{t('image.upload.prompt')}</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileSelect}
              />
            </div>
          </div>
        )}

        <GodeployAd />
      </div>
    </main>
  );
}
