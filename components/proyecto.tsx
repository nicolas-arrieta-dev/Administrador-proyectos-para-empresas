import MotionTransition from "./transition-component";
import { useEffect,useState } from "react";
import Notificacion from "./notificacion";
import Mostrar_proyectos from "./mostrar_proyectos";
import { TypeAnimation } from "react-type-animation";
const Proyecto = () => {
    const [responseData, setResponseData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [precionado, setPrecionado] = useState(false);
    const [estado, setEstado] = useState(""); 
    const [mensaje, setMensaje] = useState("");
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
                            throw new Error("Error al registrar la empresa");
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
     
    function handleButtonClick(){
        setPrecionado(false);
        const formData = new FormData(document.querySelector("form") as HTMLFormElement);
        fetch("http://127.0.0.1:5000/registrar_proyecto", {
            method: "POST",
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al registrar la empresa");
            }
        })
        .then((data) => {
            setEstado(data.estado); 
            setMensaje(data.mensaje);
    
            console.log("Estado:", data.estado);      
            console.log("Mensaje:", data.mensaje);    
    
            setPrecionado(true); 
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
            setEstado("error");
            setMensaje("Hubo un error registrando la empresa");
            setPrecionado(true); 
        });
    };
    const [view, setView] = useState<'default' | 'mostrar_proyectos' >('default');

    if (view === 'mostrar_proyectos') {
        return <Mostrar_proyectos />
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
                <div className="flex flex-col  gap-4 p-8 font-sans">
                <h1 className="text-4xl font-bold">
                    Empieza Ahora a Crea tus <span className="text-green-600">Proyectos</span> <br />  Mejora tus &nbsp;
                    <TypeAnimation
                        sequence={[
                            "Objetivos",
                            1000,
                            "Competencias",
                            1000,
                            "Resultados",
                            1000,
                            "Recursos",
                            1000,
                            "Tiempos",
                            1000,
                            "Procesos",
                            1000,
                            "Pto el que lo lea.",
                            1
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="font-bold text-green-600"
                    />
                </h1>
                <br />
                <form action="/Otro" method="POST" className="flex flex-col gap-8 w-full max-w-4xl md:flex-row">
                <div className="flex flex-col gap-4 flex-1">
                <label className="flex flex-col">
                Nombre
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ingrese el nombre del proyecto"
                    className="w-full p-2 rounded border border-gray-800"
                />
                </label>

                <label className="flex flex-col">
                Empresa
                <select
                    name="id_empresa"
                    className="w-full p-2 rounded border border-gray-800"
                >
                {responseData.map((empresa: any) => (
                    <option key={empresa.CIF} value={empresa.CIF}>
                        {empresa.Nombre}
                    </option>
                ))}
                </select>
                </label>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                <label className="flex flex-col">
                Fecha de iniciacion
                <input
                    type="date"
                    name="fecha_inicio"
                    placeholder="Ingrese la contraseña"
                    className="w-full p-2 rounded border border-gray-800"
                />
                </label>
                <label className="flex flex-col">
                Fecha de finalizacion
                <input
                    type="date"
                    name="fecha_finalizacion"
                    placeholder="Ingrese la fecha de finalización"
                    className="w-full p-2 rounded border border-gray-800"
                    onChange={(e) => {
                        const fechaInicio = (document.querySelector("input[name='fecha_inicio']") as HTMLInputElement)?.value;
                        const fechaFinal = e.target.value;
                        if (fechaInicio && fechaFinal) {
                            const diffInMs = new Date(fechaFinal).getTime() - new Date(fechaInicio).getTime();
                            const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
                            const label = document.getElementById("duracion-proyecto");
                            if (label) {
                                label.textContent = `Duración del proyecto: ${diffInDays} días`;
                            }
                        }
                    }}
                />
                </label>
                <span id="duracion-proyecto" className="text-gray-700"></span>
                </div>
                </form>
                <button
                type="button"
                onClick={handleButtonClick}
                className="-mt-7 md: mt-7 md:w-40 px-4 py-2 rounded border-2 border-green-500 text-green-700 bg-transparent hover:bg-green-400 hover:text-white hover:shadow-lg shadow-white/80 backdrop-blur-md text-lg"
                >
                Enviar
                </button>
                <button
                type="button"
                onClick={() => setView('mostrar_proyectos')} 
                className="-mt-7 ml-50  md: -mt-16 md:w-70 px-4 py-2 rounded border-2 border-green-500 text-green-700 bg-transparent hover:bg-green-400 hover:text-white hover:shadow-lg shadow-white/80 backdrop-blur-md text-lg"
                >
                Ver todos los proyectos ...
                </button>
                </div>
</MotionTransition>
    );
};

export default Proyecto;