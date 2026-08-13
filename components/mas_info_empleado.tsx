import React, { useEffect, useState } from 'react';

interface MasInfoEmpleadoProps {
    id_empleado: number;
}

const MasInfoEmpleado: React.FC<MasInfoEmpleadoProps> = ({ id_empleado }) => {
    const [empleadoInfo, setEmpleadoInfo] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/mas_info_empleados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_empleado })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener la información del empleado");
                }
                return response.json();
            })
            .then((data) => {
                setEmpleadoInfo(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id_empleado]);

    if (loading) return <p>Cargando información del empleado...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <div className="flex flex-col md:flex-row items-center justify-between m-10">
                    <h1 className="text-2xl font-bold text-center md:text-left mb-2 md:mb-0">
                Todos los proyectos en los que ha participado un <span className='text-green-600'>cliente</span> 
            </h1>
            </div>
<table className="min-w-full bg-white border border-green-300 rounded-lg shadow-md mb-6">
    <thead className="bg-green-300">
        <tr>
            <th className="px-4 py-2">DNI</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Apellido</th>
            <th className="px-4 py-2">Dirección</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Celular</th>
        </tr>
    </thead>
    <tbody>
        {empleadoInfo[0] && (
            <tr key={empleadoInfo[0].DNI} className="border-t border-green-300 hover:bg-gray-50">
                <td className="px-4 py-2">{empleadoInfo[0].DNI}</td>
                <td className="px-4 py-2">{empleadoInfo[0].nombre_empleado}</td>
                <td className="px-4 py-2">{empleadoInfo[0].Apellido}</td>
                <td className="px-4 py-2">{empleadoInfo[0].Direccion}</td>
                <td className="px-4 py-2">{empleadoInfo[0].Email}</td>
                <td className="px-4 py-2">{empleadoInfo[0].Celular}</td>
            </tr>
        )}
    </tbody>
</table>


<table className="min-w-full bg-white border border-green-300 rounded-lg shadow-md">
    <thead className="bg-green-300">
        <tr>
             <th className="px-4 py-2">ID Proyecto</th>
            <th className="px-4 py-2">Proyecto</th>
            <th className="px-4 py-2">Empresa</th>
            <th className="px-4 py-2">Estado</th>
        </tr>
    </thead>
    <tbody>
        {empleadoInfo.map((item, index) => (
            <tr key={index} className="border-t border-green-300 hover:bg-gray-50">
                <td className="px-4 py-2">{item.id_proyecto}</td>
                <td className="px-4 py-2">{item.nombre_proyecto}</td>
                <td className="px-4 py-2">{item.nombre_empresa}</td>
                <td className="px-4 py-2">{item.Estado}</td>
            </tr>
        ))}
    </tbody>
</table>
</>
    );
};

export default MasInfoEmpleado;
