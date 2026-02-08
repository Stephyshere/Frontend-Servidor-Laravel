import React, { useEffect, useState } from 'react';

const WatchList = () => {
    const [watches, setWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.axios.get('http://watch_app-main.test/api/watches')
            .then(response => {
                setWatches(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar datos:", error);
                setLoading(false);
            });
    }, []);

    const filteredWatches = watches.filter(watch => 
        watch.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        watch.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="text-gray-400 font-light tracking-widest animate-pulse">CARGANDO COLECCIÓN...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Cabecera Superior */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-black tracking-tighter text-gray-900">JUAN TIME</h1>
                    
                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Buscar marca o modelo..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </nav>

            {/* Cuadrícula de Relojes */}
            <main className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredWatches.map(watch => (
                        <div key={watch.id} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
                                    {watch.brand}
                                </p>
                                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-4">
                                    {watch.model}
                                </h2>
                                <p className="text-xl font-light text-gray-600 mb-8">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(watch.price)}
                                </p>
                            </div>
                            
                            <button className="w-full py-3 bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200">
                                Detalles
                            </button>
                        </div>
                    ))}
                </div>

                {/* Mensaje de búsqueda vacía */}
                {filteredWatches.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg font-light">No se han encontrado piezas que coincidan con su búsqueda.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default WatchList;