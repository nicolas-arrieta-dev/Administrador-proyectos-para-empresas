import React, { useEffect, useState } from 'react';
import MotionTransition from './transition-component';
import Notificacion from './notificacion';

interface MasInfoEmpleadoProps {
    id_empleado: number;
}

const Actualizar_empleado: React.FC<MasInfoEmpleadoProps> = ({ id_empleado }) => {
    const [empleadoInfo, setEmpleadoInfo] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [precionado, setPrecionado] = useState(false);
    const [estado, setEstado] = useState(""); 
    const [mensaje, setMensaje] = useState("");
    const handleButtonClick = () => {
        setPrecionado(false);
    const formData = new FormData(document.querySelector("form") as HTMLFormElement);
    fetch("http://127.0.0.1:5000/Actualizar_empleado", {
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
        fetch("http://127.0.0.1:5000/consular_empleado", {
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
                setEmpleadoInfo(data[0]);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id_empleado]);
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
<h1 className="text-2xl font-bold">Actualizar datos del  <span className='text-green-700'>empleado</span> </h1>
<form action="/Otro" method="POST" className="flex flex-col gap-8 w-full max-w-4xl md:flex-row">
    <div className="flex flex-col gap-4 flex-1">
    <label className="flex flex-col">
            Id trabajador:
            <input
                type="number"
                value={empleadoInfo.Id_trabajador}
                name="id_trabajador"
                placeholder="Ingrese el id del trabajador"
                className="w-full p-2 rounded border border-gray-800"
            readOnly/>
        </label>
        <label className="flex flex-col">
            DNI:
            <input
                type="number"
                name="DNI"
                value={empleadoInfo.DNI}
                placeholder="Ingrese el DNI"
                className="w-full p-2 rounded border border-gray-800"
            readOnly/>
        </label>
        <label className="flex flex-col">
            Nombre:
            <input
                type="text"
                name="nombre"
                onChange={(e) =>
                    setEmpleadoInfo({ ...empleadoInfo, Nombre: e.target.value })
                  }
                value={empleadoInfo.Nombre}
                placeholder="Ingrese su nombre"
                className="w-full p-2 rounded border border-gray-800"
            />
        </label>
        <label className="flex flex-col">
            Apellido:
            <input
                type="text"
                name="apellido"
                onChange={(e) =>
                    setEmpleadoInfo({ ...empleadoInfo, Apellido: e.target.value })
                  }
                value={empleadoInfo.Apellido}
                placeholder="Ingrese su apellido"
                className="w-full p-2 rounded border border-gray-800"
            />
        </label>
    </div>
    <div className="flex flex-col gap-4 flex-1">
        <label className="flex flex-col">
            Dirección:
            <input
                type="text"
                name="direccion"
                value={empleadoInfo.Direccion}
                onChange={(e) =>
                    setEmpleadoInfo({ ...empleadoInfo, Direccion: e.target.value })
                  }
                placeholder="Ingrese su dirección"
                className="w-full p-2 rounded border border-gray-800"
            />
        </label>
        <label className="flex flex-col">
            Correo:
            <input
                type="email"
                name="email"
                value={empleadoInfo.Email}
                onChange={(e) =>
                    setEmpleadoInfo({ ...empleadoInfo, Email: e.target.value })
                  }
                placeholder="Ingrese su correo"
                className="w-full p-2 rounded border border-gray-800"
            />
        </label>
        <label className="flex flex-col">
            Celular:
            <input
                type="number"
                name="celular"
                value={empleadoInfo.Celular}
                onChange={(e) =>
                    setEmpleadoInfo({ ...empleadoInfo, Celular: e.target.value })
                  }
                placeholder="Ingrese su celular"
                className="w-full p-2 rounded border border-gray-800"
            />
        </label>
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
}
export default Actualizar_empleado