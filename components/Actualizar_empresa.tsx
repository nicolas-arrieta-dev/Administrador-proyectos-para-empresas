import React, { useEffect, useState } from 'react';
import MotionTransition from './transition-component';
import Notificacion from './notificacion';
import Mostrar_empresas from './Mostrar_empresas';


interface MasInfoEmpleadoProps {
    id_empresa: number;
}

const Actualizar_empresa: React.FC<MasInfoEmpleadoProps> = ({ id_empresa }) => {
    const [precionado, setPrecionado] = useState(false);
    const [estado, setEstado] = useState(""); 
    const [mensaje, setMensaje] = useState("");
     const [empresaInfo, setEmpresaInfo] = useState<any>({});
         const [loading, setLoading] = useState(true);
         const [error, setError] = useState<string | null>(null);
         const handleButtonClick = () => {
            setPrecionado(false);
            const formData = new FormData(document.querySelector("form") as HTMLFormElement);
            fetch("http://127.0.0.1:5000/Actualizar_empresa", {
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
         }
     useEffect(() => {
            fetch("http://127.0.0.1:5000/Consultar_empresa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id_empresa })
            })
                .then((response) => {
                    
                    
                    if (!response.ok) {
                        throw new Error("Error al obtener la información del empleado");
                    }
                    return response.json();
                })
                .then((data) => {
                    setEmpresaInfo(data[0]);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }, [id_empresa]);

 return(
    <MotionTransition position="right">
    {precionado && (
        estado === "ok" ? (
            <Notificacion mensaje={mensaje} tipo="ok" />
        ) : estado === "error" ? (
            <Notificacion mensaje={mensaje} tipo="error" />
        ) : null
    )}
    <div className="flex flex-col items-center gap-4 p-8 font-sans">
        <h1 className="text-2xl font-bold">Formulario de Actualizacion de <span className='text-green-700'>Empresa</span></h1>
        <form action="/Otro" method="POST" className="flex flex-col gap-8 w-full max-w-4xl md:flex-row">
            <div className="flex flex-col gap-4 flex-1">
                <label className="flex flex-col">
                    CIF:
                    <input
                        type="number"
                        name = "cif"
                        value={empresaInfo.CIF}
                        placeholder="Ingrese el CIF de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                    readOnly/>
                </label>
                <label className="flex flex-col">
                    RIT:
                    <input
                        type="number"
                        name="rit"
                        value={empresaInfo.RIT}
                        placeholder="Ingrese el RIT de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                  readOnly  />
                </label>
                <label className="flex flex-col">
                    Nombre de la empresa:
                    <input
                        type="text"
                        name="nombre"
                        value={empresaInfo.Nombre}
                        onChange={(e) =>
                            setEmpresaInfo({ ...empresaInfo, Nombre: e.target.value })
                          }
                        placeholder="Ingrese su nombre de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                    />
                </label>
                <label className="flex flex-col">
                    Direccion:
                    <input
                        type="text"
                        name="direccion"
                        value={empresaInfo.Direccion}
                        onChange={(e) =>
                            setEmpresaInfo({ ...empresaInfo, Direccion: e.target.value })
                          }
                        placeholder="Ingrese la direccion de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                    />
                </label>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <label className="flex flex-col">
                    Telefono:
                    <input
                        type="number"
                        name="telefono"
                        value={empresaInfo.Telefono}
                        onChange={(e) =>
                            setEmpresaInfo({ ...empresaInfo, Telefono: e.target.value })
                          }
                        placeholder="Ingrese el telefono"
                        className="w-full p-2 rounded border border-gray-800"
                    />
                </label>
                <label className="flex flex-col">
                    Email:
                    <input
                        type="Email"
                        name="email"
                        value={empresaInfo.Email}
                        onChange={(e) =>
                            setEmpresaInfo({ ...empresaInfo, Email: e.target.value })
                          }
                        placeholder="Ingrese el email de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                    />
                </label>
                <label className="flex flex-col">
                    Sector:
                    <input
                        type="text"
                        name="sector"
                        value={empresaInfo.Sector}
                        onChange={(e) =>
                            setEmpresaInfo({ ...empresaInfo, Sector: e.target.value })
                          }
                        placeholder="Ingrese el sector de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                    />
                </label>
                <label className="flex flex-col">
                Nombre de la peronsa enargada:
                    <input
                        type="text"
                        name= "nombre_encargado"
                        value={empresaInfo.Nombre_encargado}
                        onChange={(e) =>
                            setEmpresaInfo({ ...empresaInfo, Nombre_encargado: e.target.value })
                          }
                        placeholder="Ingrese el nombre de la perona encargada de la empresa"
                        className="w-full p-2 rounded border border-gray-800"
                    />
                </label>

            </div>
        </form>
        <button
            type="button"
            onClick={handleButtonClick}
            className="mt-20 md:-mt-0 md:-ml-185 w-40 px-4 py-2 rounded border-2 border-green-500 text-green-700 bg-transparent hover:bg-green-400 hover:text-white hover:shadow-lg shadow-white/80 backdrop-blur-md text-lg"
        >
            Enviar
        </button>
    </div>
    </MotionTransition>
 );
}
export default Actualizar_empresa