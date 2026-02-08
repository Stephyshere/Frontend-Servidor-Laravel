import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import WatchList from './Components/WatchList';

console.log("🚀 React intentando arrancar...");

const rootElement = document.getElementById('app');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <WatchList />
        </React.StrictMode>
    );
    console.log("✅ React se ha montado correctamente.");
} else {
    console.error("❌ Error: No se encontró el div con id 'app'");
}