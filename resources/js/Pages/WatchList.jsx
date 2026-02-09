import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const WatchList = () => {
    const [watches, setWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // Issue #11: Estado para controlar qué reloj editamos
    const [editingId, setEditingId] = useState(null);
    const [newWatch, setNewWatch] = useState({ brand: '', model: '', price: '' });

    const { props } = usePage();
    const auth = props?.auth || null;

    useEffect(() => {
        fetchWatches();
    }, []);

    /**
     * Carga la lista de relojes desde la API del Backend
     */
    const fetchWatches = () => {
        const token = localStorage.getItem('token'); 
        window.axios.get('http://watch_app-main.test/api/watches', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            setWatches(response.data.data || response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error al cargar:", error);
            setLoading(false);
        });
    };

    /**
     * Cierra la sesión del usuario (Requisito PDF)
     */
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await window.axios.post('http://watch_app-main.test/api/logout', {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            // Limpiamos todo el rastro de la sesión
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            window.location.href = '/login';
        }
    };

    /**
     * Maneja tanto la creación como la edición (Issue #9, #10 y Validación de Duplicados)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 

        try {
            if (editingId) {
                // MODO EDICIÓN (PUT)
                await window.axios.put(`http://watch_app-main.test/api/watches/${editingId}`, newWatch, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("¡Reloj actualizado con éxito!");
            } else {
                // MODO CREACIÓN (POST)
                await window.axios.post('http://watch_app-main.test/api/watches', newWatch, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert("¡Reloj añadido con éxito!");
            }

            setShowModal(false);
            setEditingId(null);
            setNewWatch({ brand: '', model: '', price: '' });
            fetchWatches();
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Tu sesión ha expirado.");
            } else if (error.response?.status === 422) {
                // Aquí capturamos el error de duplicados enviado por el Backend
                alert(error.response.data.message);
            } else {
                alert("Error al procesar la solicitud");
            }
        }
    };

    /**
     * Prepara el modal para editar (Issue #11)
     */
    const handleEdit = (watch) => {
        setEditingId(watch.id);
        setNewWatch({ 
            brand: watch.brand, 
            model: watch.model, 
            price: watch.price 
        });
        setShowModal(true);
    };

    /**
     * Elimina un reloj (Issue #10)
     */
    const handleDelete = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar este reloj?")) return;
        const token = localStorage.getItem('token');
        try {
            await window.axios.delete(`http://watch_app-main.test/api/watches/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setWatches(watches.filter(watch => watch.id !== id));
            alert("Reloj eliminado correctamente");
        } catch (error) {
            alert("No se pudo eliminar el reloj");
        }
    };

    // Filtro de búsqueda en tiempo real
    const filteredWatches = watches.filter(watch => 
        (watch.brand?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (watch.model?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50 uppercase tracking-widest animate-pulse text-gray-400">
            Cargando Colección...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Nav */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-black tracking-tighter">JUAN TIME</h1>
                    
                    <div className="flex items-center gap-6">
                        <input 
                            type="text" 
                            placeholder="Buscar por modelo..." 
                            className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none w-40 md:w-64" 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />

                        {(auth?.user || localStorage.getItem('token')) && (
                            <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
                                {/* Mostrar nombre de usuario (Requisito PDF) */}
                                <div className="text-right hidden md:block">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Coleccionista</p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {auth?.user?.name || localStorage.getItem('userName') || 'Usuario'}
                                    </p>
                                </div>

                                {/* Botón Logout (Requisito PDF) */}
                                <button 
                                    onClick={handleLogout}
                                    className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors mr-2"
                                >
                                    Salir
                                </button>

                                <button 
                                    onClick={() => { setEditingId(null); setNewWatch({brand:'',model:'',price:''}); setShowModal(true); }} 
                                    className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 shadow-md transition-all active:scale-95"
                                >
                                    + Añadir
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">
                            {editingId ? "Editar Pieza" : "Nueva Pieza"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Marca</label>
                                <input required type="text" value={newWatch.brand} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black" onChange={e => setNewWatch({...newWatch, brand: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Modelo</label>
                                <input required type="text" value={newWatch.model} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black" onChange={e => setNewWatch({...newWatch, model: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Precio (€)</label>
                                <input required type="number" value={newWatch.price} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black" onChange={e => setNewWatch({...newWatch, price: e.target.value})} />
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button type="submit" className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 shadow-lg">
                                    {editingId ? "Actualizar" : "Guardar"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-200">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Grid de Relojes */}
            <main className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredWatches.map(watch => (
                        <div key={watch.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between group">
                            <div>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">{watch.brand}</p>
                                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-4">{watch.model}</h2>
                                <p className="text-2xl font-light text-gray-900 mb-8">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(watch.price)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-black transition-all shadow-lg active:scale-95">
                                    Detalles
                                </button>
                                {(auth?.user || localStorage.getItem('token')) && (
                                    <>
                                        <button onClick={() => handleEdit(watch)} className="px-4 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-100 flex items-center justify-center">
                                            <span>✏️</span>
                                        </button>
                                        <button onClick={() => handleDelete(watch.id)} className="px-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100 flex items-center justify-center">
                                            <span className="text-xl font-bold">×</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default WatchList;