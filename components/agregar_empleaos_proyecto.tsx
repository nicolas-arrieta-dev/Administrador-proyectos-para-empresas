import { useEffect, useState } from "react";
import MotionTransition from "./transition-component";
import Notificacion from "./notificacion";
import Mostrar_proyectos from "./mostrar_proyectos";
interface AgregarEmpleadosProyectoProps {
    id_proyecto: string;
}

const AgregarEmpleadosProyecto: React.FC<AgregarEmpleadosProyectoProps> = ({ id_proyecto }) => {
        const [responseData, setResponseData] = useState<any[]>([]);
        const [responseData2, setResponseData2] = useState<any[]>([]);
        const [loading, setLoading] = useState(true);
        const [loading2, setLoading2] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [error2, setError2] = useState<string | null>(null);
    
        useEffect(() => {
            fetch("http://127.0.0.1:5000/mostrar_todo_empleados", {
            method: "POST",
            })
            .then((response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Error fetching data");
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

        useEffect(() => {
            fetch("http://127.0.0.1:5000/mostrar_todo_profesiones", {
            method: "POST",
            })
            .then((response2) => {
            if (response2.ok) {
            return response2.json();
            } else {
            throw new Error("Error fetching data");
            }
            })
            .then((data) => {
            setResponseData2(data);
            setLoading2(false);
            })
            .catch((err) => {
            setError2(err.message);
            setLoading2(false);
            });
        }, []);

     
   


const [selectedFilter, setSelectedFilter] = useState<string>("Nombre");
const [filterValue, setFilterValue] = useState("");
const [precionado, setPrecionado] = useState(false);
const [estado, setEstado] = useState(""); 
const [mensaje, setMensaje] = useState("");

const handleButtonClick = async (id: number) => {
    console.log(`Button clicked for item with ID: ${id}`);
    const selectElement = document.querySelector(`#profesiones-${id}`) as HTMLSelectElement;
    const selectedProfessionId = selectElement?.value;
    console.log(`Selected Profession ID for employee ${id}: ${selectedProfessionId}`);

    try {
    const response = await fetch("http://127.0.0.1:5000/registrar_asosiados", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        id_proyecto,
        empleado_id: id,
        profesion_id: selectedProfessionId,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to send data to the backend");
    }

    const data = await response.json();
    setEstado(data.estado); 
    setMensaje(data.mensaje);

    console.log("Estado:", data.estado);      
    console.log("Mensaje:", data.mensaje);    

    setPrecionado(true); 
    setTimeout(() => setPrecionado(false), 1000); // Hide notification after 3 seconds
    } catch (error) {
    console.error("Error sending data to backend:", error);
    setEstado("error");
    setMensaje("Hubo un error registrando la empresa");
    setPrecionado(true); 
    setTimeout(() => setPrecionado(false), 1000); // Hide notification after 3 seconds
    }
};

const filteredData = responseData.filter((item) => {
    const value = item[selectedFilter];
    return value?.toString().toLowerCase().includes(filterValue.toLowerCase());
});


const [view, setView] = useState<'default' | 'mostrar_proyectos'>('default');



if (view === 'mostrar_proyectos') {
    return <Mostrar_proyectos/>
  }


    return (
<MotionTransition position="right">
  
    {precionado && (
    estado === "ok" ? (
        <Notificacion mensaje={mensaje} tipo="ok" />
    ) : estado === "error" ? (
        <Notificacion mensaje={mensaje} tipo="error" />
    ) : null
    )}
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
                        onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                        {responseData.length > 0 && Object.keys(responseData[0]).map((key, index) => (
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
                        placeholder="Busca aqui..."
                        className="px-4 py-2 w-35 md:w-60 text-lg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
            </div>
            <div
            className="text-green-600 underline" 
                            onClick={() => {
                                setView('mostrar_proyectos');
                            }}
                        >
                            Regresar
                        </div>
            <div className="overflow-x-auto overflow-y-auto h-[60vh]">
                <table className="min-w-full bg-white border border-green-300 rounded-lg shadow-md ">
                    <thead className="bg-green-300 ">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Nombre</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Apellido</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Dirección</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Celular</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Profesión</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Funciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="border-t border-green-300 hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-700">{item.DNI}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.Nombre}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.Apellido}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.Direccion}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.Email}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.Celular}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
    
                                    <select
                                        id={`profesiones-${item.DNI}`}
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 bg-white"
                                    >
                                        {responseData2.map((profesion, index) => (
                                        <option key={index} value={profesion.id}>
                                            {profesion.Nombre}
                                        </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button
                                        className="bg-green-500 border-2 border-green-500 rounded-md p-2"
                                        style={{ width: "40px", height: "40px" }}
                                        onClick={() => handleButtonClick(item.DNI)}
                                    >
                                        <img src="/icono2.png" alt="" style={{ width: "100%", height: "100%" }} />
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

export default AgregarEmpleadosProyecto;