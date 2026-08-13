import React, { useEffect, useState } from 'react';
import MotionTransition from './transition-component';
import AgregarEmpleadosProyecto from './agregar_empleaos_proyecto';
import InfoProyecto from './info_proyeto';
import Notificacion from './notificacion';
const Mostrar_proyectos = () => {
    const [responseData, setResponseData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'default' | 'mostrar_empleado' | 'mostrar_todo_proyecto' | 'Empezar_proyecto' | 'Terminar_proyecto' | 'Cancelar_proyecto'>('default');
    const [selectedEmpresaId, setSelectedEmpresaId] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string>('');
    const [filterValue2, setFilterValue2] = useState<string>('');
    const [precionado, setPrecionado] = useState(false);
    const [estado, setEstado] = useState(""); 
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        fetch("http://127.0.0.1:5000/mostrar_todo_proyectos", {
            method: "POST",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al registrar la empresa");
                }
                
                return response.json();
            })
            .then((data) => {
                setResponseData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Empezar proyecto
    useEffect(() => {
        if (view === 'Empezar_proyecto' && selectedEmpresaId) {
            fetch("http://127.0.0.1:5000/Comenzar_proyecto", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedEmpresaId }),
            })
            
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error al eliminar en el servidor');
                    }
                    return res.json();
                })
                .then((data) => {
                    setEstado(data.estado); 
                    setMensaje(data.mensaje);
                    setPrecionado(true); 
                    setTimeout(() => setPrecionado(false), 1000);
                })
                .catch((error) => {
                    console.error("Error en la solicitud:", error);
                    setEstado("error");
                    setMensaje("Hubo un error registrando la empresa");
                    setPrecionado(true); 
                    setTimeout(() => setPrecionado(false), 1000);
                });
        }
        if (view === 'Terminar_proyecto' && selectedEmpresaId) {
            fetch("http://127.0.0.1:5000/Terminar_proyecto", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedEmpresaId }),
            })
            
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error al eliminar en el servidor');
                    }
                    return res.json();
                })
                .then((data) => {
                    setEstado(data.estado); 
                    setMensaje(data.mensaje);
                    setPrecionado(true); 
                    setTimeout(() => setPrecionado(false), 1000);
                })
                .catch((error) => {
                    console.error("Error en la solicitud:", error);
                    setEstado("error");
                    setMensaje("Hubo un error registrando la empresa");
                    setPrecionado(true); 
                    setTimeout(() => setPrecionado(false), 1000);
                });
        }
        if (view === 'Cancelar_proyecto' && selectedEmpresaId) {
            fetch("http://127.0.0.1:5000/Cancelar_proyecto", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedEmpresaId }),
            })
            
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error al eliminar en el servidor');
                    }
                    return res.json();
                })
                .then((data) => {
                    setEstado(data.estado); 
                    setMensaje(data.mensaje);
                    setPrecionado(true); 
                    setTimeout(() => setPrecionado(false), 1000);
                })
                .catch((error) => {
                    console.error("Error en la solicitud:", error);
                    setEstado("error");
                    setMensaje("Hubo un error registrando la empresa");
                    setPrecionado(true); 
                    setTimeout(() => setPrecionado(false), 1000);
                });
        }
    }, [view, selectedEmpresaId]);

    const filteredData = responseData.filter((proyecto) =>
        (proyecto.Nombre_empresa || '').toLowerCase().includes(filterValue.toLowerCase()) &&
        (proyecto.fecha_fin_real || '').toLowerCase().includes(filterValue2.toLowerCase())
    );
    


    // Renderizado por vista
    if (view === 'mostrar_empleado' && selectedEmpresaId) {
        return <AgregarEmpleadosProyecto id_proyecto={selectedEmpresaId} />;
    }
    if (view === 'mostrar_todo_proyecto' && selectedEmpresaId) {
        return <InfoProyecto id_proyecto={selectedEmpresaId} />;
    }


        return (
            <MotionTransition position='right'>
                        {precionado && (
            estado === "ok" ? (
                <Notificacion mensaje={mensaje} tipo="ok" />
            ) : estado === "error" ? (
                <Notificacion mensaje={mensaje} tipo="error" />
            ) : null
        )}
            <div>
                <h1 className="text-left ml-10 text-3xl mt-10">
                Todos los <span className='text-green-600'> Proyectos</span> Asociados
                </h1>
                <div className='-mt-10 ml-180'>
                <input
                    type="text"
                    name="valor"
                    placeholder="Busca por empresa..."
                    className=" -ml-60 px-4 py-2 w-35 md:w-60 text-lg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
                                <input
                    type="date"
                    name="valor"
                    placeholder="Busca por fecha de inicio"
                    className="-mt-70  px-4 py-2 w-35 md:w-60 text-lg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filterValue2}
                    onChange={(e) => setFilterValue2(e.target.value)}
                />
                </div>
                {loading ? (
                <p className="text-center mt-5">Cargando...</p>
                ) : error ? (
                <p className="text-center mt-5 text-red-500">Error: {error}</p>
                ) : (
                <div className="mt-1 overflow-y-scroll h-100 scrollbar-custom">
                    {filteredData.map((proyecto, index) => (
                    <div 
        
                    key={index} className="text-left flex flex-row border-3  border-white p-4 w-230 mb-4 rounded-[20px] shadow m-10 hover:shadow-md shadow-black/100 backdrop-blur-sm" style={{ backgroundColor: '#ffffffaa' }}>
                        <div className='w-120 h-40 flex items-center justify-center'>
                            <img 
                                src={`/${proyecto.Logo}`} 
                                alt={proyecto.Nombre} 
                                className="object-contain w-full h-full"
                            />
                        </div>
                       <div className='ml-6 w-380'>
                       <h2 className="text-xl font-bold text-green-900">{proyecto.Nombre}</h2>
                        <p className='text-gray-600'><strong>Empresa:</strong> {proyecto.Nombre_empresa}</p>
                        <p className='text-gray-600'><strong>Estado:</strong> {proyecto.Estado}</p>
                        <br />
                        <div 
                            className='w-4 h-4 rounded-[50px]' 
                            style={{ backgroundColor: proyecto.Estado === 'En curso' ? 'green' : proyecto.Estado === 'Pendiente' ? 'gray' :proyecto.Estado === 'Cancelado' ? 'red': proyecto.Estado === 'Terminado' ? 'blue'  : 'gray' }}
                        ></div>
                        <a 
                            className="text-green-600 underline" 
                            onClick={() => {
                                setSelectedEmpresaId(proyecto.Id);
                                setView('mostrar_todo_proyecto');
                            }}
                        >
                            Ver más
                        </a>
                       </div>
                       <div className=' ml-10  w-100 h-full'>
                       {proyecto.Estado === "Pendiente" || proyecto.Estado === "En curso" ? (
    <button 
        className='m-1 p-2 bg-green-700 rounded-[20px] w-15 h-15'
        onClick={() => {
            setSelectedEmpresaId(proyecto.Id);
            setView('mostrar_empleado');
        }}
    >
        <img src="/icono2.png" alt="" className="object-contain w-full h-full" />
    </button>
) : (
    <span className="text-gray-500 italic"></span>
)}

                        {proyecto.Estado === "Pendiente" ? (
                            <button 
                                className='m-1 p-2 bg-green-700 rounded-[20px] w-15 h-15'
                                onClick={() => {
                                    setSelectedEmpresaId(proyecto.Id);
                                    setView('Empezar_proyecto');
                                }}
                            >
                                <img src="/icono12.png" alt="" className="object-contain w-full h-full" />
                            </button>
                        ) : proyecto.Estado === "En curso" ? (
                            <>
                            <button 
                                className='m-1 p-2 bg-red-700 rounded-[20px] w-15 h-15'
                                onClick={() => {
                                    setSelectedEmpresaId(proyecto.Id);
                                    setView('Terminar_proyecto');
                                }}
                            >
                                <div className='w-9 h-9 ml-1 rounded-[5px] bg-white'></div>
                            </button>
                            <button 
                            className='m-1 p-2 bg-red-700 rounded-[20px] ml-18 w-15 h-15'
                            onClick={() => {
                                setSelectedEmpresaId(proyecto.Id);
                                setView('Cancelar_proyecto');
                            }}
                        >
                            <div className='text-white text-4xl font-bold'>X</div>
                        </button>
                                                    </>
                        ) : (
                            <span className="text-gray-500 italic">Proyecto terminado</span>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </MotionTransition>
        );
    };
    export default Mostrar_proyectos;