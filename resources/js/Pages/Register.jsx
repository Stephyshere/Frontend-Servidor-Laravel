import React, { useState } from 'react';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await window.axios.post('http://watch_app-main.test/api/register', form);
            alert("¡Registro con éxito! Ahora puedes iniciar sesión.");
            window.location.href = '/login'; // Redirigimos al login
        } catch (error) {
            alert("Error en el registro: " + (error.response?.data?.message || "Revisa los datos"));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-2xl font-black tracking-tighter text-center">ÚNETE A JUAN TIME</h2>
                <input required type="text" placeholder="Nombre completo" className="w-full p-3 border rounded-xl" 
                    onChange={e => setForm({...form, name: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full p-3 border rounded-xl" 
                    onChange={e => setForm({...form, email: e.target.value})} />
                <input required type="password" placeholder="Contraseña" className="w-full p-3 border rounded-xl" 
                    onChange={e => setForm({...form, password: e.target.value})} />
                <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold uppercase tracking-widest">Crear Cuenta</button>
                <p className="text-center text-xs text-gray-400">¿Ya tienes cuenta? <a href="/login" className="text-black font-bold">Inicia sesión</a></p>
            </form>
        </div>
    );
};

export default Register;