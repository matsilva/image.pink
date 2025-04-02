import { t } from '@matsilva/xtranslate';

type Tool = 'padding' | 'resize' | 'none';

interface ToolSelectorProps {
  selectedTool: Tool;
  onToolSelect: (tool: Tool) => void;
}

export function ToolSelector({ selectedTool, onToolSelect }: ToolSelectorProps) {
  return (
    <aside className="w-44 shrink-0 lg:block border-r border-gray-200 py-8 bg-white flex flex-col justify-between">
      <nav className="flex flex-col gap-2">
        <button
          onClick={() => onToolSelect('padding')}
          className={`w-full rounded-lg px-4 py-2 text-left ${
            selectedTool === 'padding' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
          }`}
        >
          {t('tools.padding')}
        </button>
        <button
          onClick={() => onToolSelect('resize')}
          className={`w-full rounded-lg px-4 py-2 text-left ${
            selectedTool === 'resize' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
          }`}
        >
          {t('tools.resize')}
        </button>
      </nav>
    </aside>
  );
}
