import { useState, useRef } from 'react';
import { usePadding } from './image-tools/padding/usePadding';
import { useResize } from './image-tools/resize/useResize';
import { Header } from './components/Header';
import { ToolSelector } from './components/ToolSelector';
import { ImagePreview } from './components/ImagePreview';
import { ToolControls } from './components/ToolControls';

// Types for our image editor state
type Tool = 'padding' | 'resize' | 'none';

interface ImageState {
  url: string | null;
  dimensions?: {
    width: number;
    height: number;
  };
}

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>('none');
  const [imageState, setImageState] = useState<ImageState>({
    url: null,
  });

  const { padding, updatePadding, downloadWithPadding, toggleTransparentPadding } = usePadding();
  const { options: resizeOptions, updateOptions: updateResizeOptions, downloadWithResize } = useResize();

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
    const dimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
    setImageState((prev) => ({
      ...prev,
      dimensions,
    }));
    if (selectedTool === 'resize') {
      updateResizeOptions({
        width: dimensions.width,
        height: dimensions.height,
      });
    }
  };

  const handleDownload = (imageElement: HTMLImageElement) => {
    if (!imageState.dimensions) return;
    if (selectedTool === 'padding') {
      downloadWithPadding(imageElement, imageState.dimensions);
    } else if (selectedTool === 'resize') {
      downloadWithResize(imageElement, imageState.dimensions);
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem)] relative">
        <ToolSelector selectedTool={selectedTool} onToolSelect={setSelectedTool} />
        <ImagePreview
          imageState={imageState}
          selectedTool={selectedTool}
          padding={padding}
          resizeOptions={resizeOptions}
          onImageLoad={handleImageLoad}
          onDownload={handleDownload}
          onUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
        />
        <ToolControls
          selectedTool={selectedTool}
          padding={padding}
          resizeOptions={resizeOptions}
          updatePadding={updatePadding}
          toggleTransparentPadding={toggleTransparentPadding}
          updateResizeOptions={updateResizeOptions}
        />
      </div>
    </div>
  );
}

export default App;
