import React, { useEffect, useState } from 'react';
import MotionTransition from './transition-component';

const Menu = () => {
    const [responseData, setResponseData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/mostrar_todo_empresas", {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    const jsonData = response.json();
                    console.log(jsonData);
                    
                    return jsonData;
                } else {
                    throw new Error("Error");
                }
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

    return (
        <MotionTransition position="right">
            <div className="overflow-y-scroll h-128 scrollbar-custom">
                <div className="flex items-center justify-center mt-0">
                    <div className="mr-5 opacity-0 md:opacity-100">
                        <img src="/imagen3.jpeg" alt="" className="w-160 h-127" />
                    </div>
                    <div className="text-left">
                        <h1 className="text-2xl ml-10 font-bold text-green-900">Bienvenido Usuario</h1>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-80 h-36 rounded-full my-5 "
                        />
                        <p className="text-base w-90 text-lg text-gray-800">
                            Nos especializamos en la gestión integral de proyectos para empresas de todos los sectores. Nuestro objetivo es ayudarte a convertir ideas en resultados tangibles, optimizando recursos, tiempos y procesos.
                            <span className="text-green-700 font-bold">¡¡¡¡Empieza Ahoraa !!!</span>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="flex items-center justify-center mt-0">
                    <p className="text-2xl ml-10 font-bold text-green-900">Empresas asociadas actualmente</p>
                </div>

                <br />
                <br />
                <br />
                <div className="w-full flex flex-wrap items-center justify-center space-x-4 ">
                    {loading ? (
                        <p className="text-gray-600">Cargando empresas...</p>
                    ) : error ? (
                        <p className="text-red-600">Error: {error}</p>
                    ) : responseData && responseData.length > 0 ? (
                        <ul className="flex flex-wrap gap-4">
                            {responseData.map((empresa: any, index: number) => (
                                <li key={index} className="text-gray-800 text-lg">
                                    <div className="w-70 h-80 rounded-[20px] border-4 border-white m-5 flex flex-col items-center">
                                        <img
                                            src={empresa.Logo}
                                            alt={empresa.nombre}
                                            className="rounded-[60px] border-5 border-white w-40 h-40 mt-5"
                                        />
                                        <div className="text-center mt-2">
                                            <p className="font-bold">{empresa.Nombre}</p>
                                            <p className="text-sm text-gray-600">Sector: {empresa.Sector}</p>
                                            <p className="text-sm text-gray-600">Direccion: {empresa.Direccion}</p>

                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No hay empresas asociadas actualmente.</p>
                    )}
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </MotionTransition>
    );
};

export default Menu;