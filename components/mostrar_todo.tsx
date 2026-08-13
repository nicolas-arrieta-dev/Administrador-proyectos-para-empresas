import { useState } from "react";
import MotionTransition from "./transition-component";

const MostrarTodo = () => {
    const data = [
        { id: 1, nombre: "Juan", apellido: "Pérez", direccion: "Calle Falsa 123", email: "juan.perez@example.com", celular: "123456789" },
        { id: 2, nombre: "María", apellido: "López", direccion: "Avenida Siempre Viva 456", email: "maria.lopez@example.com", celular: "987654321" },
        { id: 3, nombre: "Carlos", apellido: "García", direccion: "Boulevard Central 789", email: "carlos.garcia@example.com", celular: "456123789" },
        { id: 4, nombre: "Ana", apellido: "Martínez", direccion: "Calle Luna 321", email: "ana.martinez@example.com", celular: "789456123" },
        { id: 5, nombre: "Luis", apellido: "Hernández", direccion: "Avenida Sol 654", email: "luis.hernandez@example.com", celular: "321654987" },
        { id: 6, nombre: "Sofía", apellido: "Ramírez", direccion: "Calle Estrella 987", email: "sofia.ramirez@example.com", celular: "654789321" },
        { id: 7, nombre: "Miguel", apellido: "Torres", direccion: "Boulevard Norte 111", email: "miguel.torres@example.com", celular: "987321654" },
        { id: 8, nombre: "Lucía", apellido: "Gómez", direccion: "Avenida Sur 222", email: "lucia.gomez@example.com", celular: "123789456" },
        { id: 9, nombre: "Diego", apellido: "Vargas", direccion: "Calle Este 333", email: "diego.vargas@example.com", celular: "456987123" },
        { id: 10, nombre: "Valentina", apellido: "Morales", direccion: "Boulevard Oeste 444", email: "valentina.morales@example.com", celular: "789123654" }
    ];

    const [selectedFilter, setSelectedFilter] = useState<keyof typeof data[0]>("nombre");
    const [filterValue, setFilterValue] = useState("");

    const handleButtonClick = (id: number) => {
        console.log(`Button clicked for item with ID: ${id}`);
    };


    const filteredData = data.filter((item) => {
        const value = item[selectedFilter];
        return value.toString().toLowerCase().includes(filterValue.toLowerCase());
    });

    return (
        <MotionTransition position="right">
            <div className="p-4 m-5 mt-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-center md:text-left mb-2 md:mb-0">
                        Todos los datos de los clientes
                    </h1>
                    <div className="flex items-center flex-row">
                        <label htmlFor="filter" className="mr-2 text-lg text-black-700">
                            Filtrar por: &nbsp;
                        </label>
                        <select
                            id="filter"
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 bg-white"
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value as keyof typeof data[0])}
                        >
                            {Object.keys(data[0]).map((key, index) => (
                                <option key={index} value={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </option>
                            ))}
                        </select>
                        &nbsp;&nbsp;&nbsp;

                    </div>
                    <input
                            type="text"
                            name="valor"
                            placeholder="Escribe aquí..."
                            className="px-4 py-2 w-35 md:w-60 text-lg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                </div>

                <div className="overflow-x-auto overflow-y-auto h-[60vh]">
                            <div
        className="text-green-600 underline" 
                        onClick={() => {
                            setView('consultar');
                        }}
                    >
                        Regresar
                    </div>
                    <table className="min-w-full bg-white border border-green-300 rounded-lg shadow-md ">
                        <thead className="bg-green-300 ">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Nombre</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Apellido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Dirección</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Celular</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Funciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className="border-t border-green-300 hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.nombre}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.apellido}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.direccion}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.celular}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        <button
                                            className="bg-green-500 border-2 border-green-500 rounded-md p-2"
                                            style={{ width: "40px", height: "40px" }}
                                            onClick={() => handleButtonClick(item.id)}
                                        >
                                            <img src="/icono8.png" alt="" style={{ width: "100%", height: "100%" }} />
                                        </button>
                                        <button className="bg-red-500 border-2 border-red-500 rounded-md p-2" style={{ width: "40px", height: "40px" }}>
                                            <img src="/icono3.png" alt="" style={{ width: "100%", height: "100%" }} />
                                        </button>

                                    </td>

                                </tr>
                            ))}
                            <tr className="h-2"></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </MotionTransition>
    );
};

export default MostrarTodo;
