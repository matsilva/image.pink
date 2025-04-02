import { BellIcon } from '@heroicons/react/24/outline';
import { Logo } from './Logo';
import { t } from '@matsilva/xtranslate';

export function Header() {
  return (
    <header className="shrink-0 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 items-center justify-start">
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
  );
}
