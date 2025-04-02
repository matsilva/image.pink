import { t } from '@matsilva/xtranslate';

type Tool = 'padding' | 'resize' | 'none';

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

interface ToolControlsProps {
  selectedTool: Tool;
  padding: {
    options: PaddingOptions;
  };
  resizeOptions: ResizeOptions;
  updatePadding: (type: keyof Omit<PaddingOptions, 'isTransparent'>, value: number) => void;
  toggleTransparentPadding: () => void;
  updateResizeOptions: (updates: Partial<ResizeOptions>) => void;
}

export function ToolControls({
  selectedTool,
  padding,
  resizeOptions,
  updatePadding,
  toggleTransparentPadding,
  updateResizeOptions,
}: ToolControlsProps) {
  return (
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
                  value={padding.options.horizontal}
                  onChange={(e) => updatePadding('horizontal', Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <input
                  type="number"
                  min="0"
                  value={padding.options.horizontal}
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
                  value={padding.options.vertical}
                  onChange={(e) => updatePadding('vertical', Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <input
                  type="number"
                  min="0"
                  value={padding.options.vertical}
                  onChange={(e) => updatePadding('vertical', Number(e.target.value))}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            </div>
            <div className="pt-2">
              <label className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={padding.options.isTransparent}
                  onChange={toggleTransparentPadding}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">{t('padding.controls.transparent')}</span>
              </label>
            </div>
          </div>
        </div>
      )}
      {selectedTool === 'resize' && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="mb-4 text-lg font-medium">{t('resize.controls.title')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('resize.controls.width')}</label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="4000"
                  value={resizeOptions.width}
                  onChange={(e) => updateResizeOptions({ width: Number(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <input
                  type="number"
                  min="1"
                  max="4000"
                  value={resizeOptions.width}
                  onChange={(e) => updateResizeOptions({ width: Number(e.target.value) })}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('resize.controls.height')}</label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="4000"
                  value={resizeOptions.height}
                  onChange={(e) => updateResizeOptions({ height: Number(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <input
                  type="number"
                  min="1"
                  max="4000"
                  value={resizeOptions.height}
                  onChange={(e) => updateResizeOptions({ height: Number(e.target.value) })}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('resize.controls.background')}</label>
              <div className="mt-1 flex items-center gap-4">
                <input
                  type="color"
                  value={resizeOptions.backgroundColor || '#ffffff'}
                  onChange={(e) => updateResizeOptions({ backgroundColor: e.target.value })}
                  className="h-8 w-8 rounded border border-gray-300"
                />
                <button
                  onClick={() => updateResizeOptions({ backgroundColor: null })}
                  className={`px-3 py-1 text-sm rounded-md ${
                    resizeOptions.backgroundColor === null ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('resize.controls.transparent')}
                </button>
              </div>
            </div>
            <div className="pt-2">
              <label className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={resizeOptions.stretchToFill}
                  onChange={(e) => updateResizeOptions({ stretchToFill: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">{t('resize.controls.stretch')}</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
