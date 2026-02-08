import axios from 'axios';

/**
 * Configuramos Axios de forma global para que esté disponible en toda la App.
 * 'window.axios' permite usarlo en cualquier componente sin volver a importarlo.
 */
window.axios = axios;

// Esta cabecera es estándar para que Laravel identifique peticiones AJAX
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * CONFIGURACIÓN PARA LA ISSUE DES005
 * Aquí conectamos con tu API de relojes en Herd.
 * Usamos la variable de entorno que definimos en el .env
 */
window.axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://watch_app-main.test/api';

// Forzamos a que siempre se pida y envíe JSON
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

/**
 * INTERCEPTOR DE TOKEN (Opcional pero recomendado)
 * Si guardas el token en localStorage después del login, 
 * esto lo añadirá automáticamente a todas las peticiones futuras.
 */
const token = localStorage.getItem('access_token');
if (token) {
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;