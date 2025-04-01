import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeI18n } from './i18n/i18n.config';
import './index.css';
import App from './App.tsx';

async function main() {
  await initializeI18n();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

main().catch(console.error);
