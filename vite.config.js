import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // Importamos el plugin

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'], // Asegúrate de que termina en .jsx
            refresh: true,
        }),
        react(), // ¡Esta línea es vital!
    ],
});