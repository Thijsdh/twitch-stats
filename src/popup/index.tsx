import { createRoot } from 'react-dom/client';
import App from './app';

const appContainer = document.querySelector('#app');
const root = createRoot(appContainer);
root.render(<App />);
