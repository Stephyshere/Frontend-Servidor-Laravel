import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

const Login = () => {
    // Estado para capturar los datos del formulario
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // Función para manejar el envío de datos al Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Intentamos hacer login contra la ruta que creamos en api.php

            const response = await window.axios.post('http://watch_app-main.test/api/login', credentials);            
            // Guardamos el token en el navegador
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('userName', response.data.user.name);
            
            alert('Acceso concedido. Bienvenido a Juan Time.');
            window.location.href = '/'; // Redirigimos al catálogo
        } catch (error) {
            alert('Error: Credenciales no válidas. Revisa tu email y contraseña.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans px-4">
            <Head title="Acceso Privado" />
            
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <header className="text-center mb-10">
                    <h1 className="text-2xl font-black tracking-tighter text-gray-900 mb-2">JUAN TIME</h1>
                    <p className="text-xs uppercase tracking-widest text-amber-700 font-bold">Panel de Administración</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest ml-1">Email Corporativo</label>
                        <input 
                            type="email" 
                            required
                            placeholder="juan@time.com"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors text-sm"
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest ml-1">Contraseña</label>
                        <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors text-sm"
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-95"
                    >
                        Entrar a la Colección
                    </button>
                </form>
                
                <p className="text-center mt-8 text-xs text-gray-400">
                    Solo personal autorizado. <a href="/" className="text-gray-900 font-bold">Volver al catálogo</a>
                </p>
            </div>
        </div>
    );
};

export default Login;