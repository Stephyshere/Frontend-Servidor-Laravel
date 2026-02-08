import React, { useState } from 'react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí conectaremos con tu autenticación JWT del Backend
            const response = await window.axios.post('http://watch_app-main.test/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            alert('¡Bienvenido, Juan!');
            window.location.href = '/'; 
        } catch (error) {
            alert('Error: Credenciales no válidas');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-black tracking-tighter text-center mb-8 text-gray-900">ACCESO PRIVADO</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Email</label>
                        <input 
                            type="email" 
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase font-bold text-gray-400 tracking-widest">Contraseña</label>
                        <input 
                            type="password" 
                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-all shadow-lg">
                        Entrar a la Colección
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;