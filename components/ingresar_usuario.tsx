import MotionTransition from "./transition-component";
import { useEffect,useState } from "react";
import Notificacion from "./notificacion";
const Ingresar_usuario= () => {
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
 
        const handleButtonClick = () => {
            setPrecionado(false);
            const formData = new FormData(document.querySelector("form") as HTMLFormElement);
            fetch("http://127.0.0.1:5000/registrar_usuario", {
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
    return (
        <MotionTransition position="right">
                              {precionado && (
            estado === "ok" ? (
                <Notificacion mensaje={mensaje} tipo="ok" />
            ) : estado === "error" ? (
                <Notificacion mensaje={mensaje} tipo="error" />
            ) : null
        )}
                <div className="flex flex-col items-center gap-4 p-8 font-sans">
                <h1 className="text-2xl font-bold">Formulario de Ingreso de usuarios</h1>
                <form action="/Otro" method="POST" className="flex flex-col gap-8 w-full max-w-4xl md:flex-row">
                    <div className="flex flex-col gap-4 flex-1">
                    <label className="flex flex-col">
                            Usuario:
                            <input
                                type="text"
                                name="usuario"
                                placeholder="Ingrese el usuario"
                                className="w-full p-2 rounded border border-gray-800"
                            />
                        </label>
                        <label className="flex flex-col">
                            contraseña:
                            <input
                                type="text"
                                name="pass"
                                placeholder="Ingrese la contraseña"
                                className="w-full p-2 rounded border border-gray-800"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">


                    </div>
                </form>
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="-mt-7 md: mt-7 md:-ml-185 w-40 px-4 py-2 rounded border-2 border-green-500 text-green-700 bg-transparent hover:bg-green-400 hover:text-white hover:shadow-lg shadow-white/80 backdrop-blur-md text-lg"
                >
                    Enviar
                </button>
                </div>
</MotionTransition>
);
};

export default Ingresar_usuario;