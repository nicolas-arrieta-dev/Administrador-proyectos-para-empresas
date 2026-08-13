import MotionTransition from "./transition-component";
import Notificacion from "./notificacion";
import React from "react";
import { useState } from "react";
const Ingresar_empresa = () => {
const [precionado, setPrecionado] = useState(false);
const [estado, setEstado] = useState(""); 
const [mensaje, setMensaje] = useState("");
const handleButtonClick = () => {
    setPrecionado(false);
    const formData = new FormData(document.querySelector("form") as HTMLFormElement);
    fetch("http://127.0.0.1:5000/registrar_empresa", {
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
            <h1 className="text-2xl font-bold">Formulario de Registro de Empresas</h1>
            <form action="/Otro" method="POST" className="flex flex-col gap-8 w-full max-w-4xl md:flex-row">
                <div className="flex flex-col gap-4 flex-1">
                    <label className="flex flex-col">
                        CIF:
                        <input
                            type="number"
                            name = "cif"
                            placeholder="Ingrese el CIF de la empresa"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        RIT:
                        <input
                            type="number"
                            name="rit"
                            placeholder="Ingrese el RIT de la empresa"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Nombre de la empresa:
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Ingrese su nombre de la empresa"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Direccion:
                        <input
                            type="text"
                            name="direccion"
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
                            placeholder="Ingrese el telefono"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Email:
                        <input
                            type="Email"
                            name="email"
                            placeholder="Ingrese el email de la empresa"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Sector:
                        <input
                            type="text"
                            name="sector"
                            placeholder="Ingrese el sector de la empresa"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                    Nombre de la peronsa enargada:
                        <input
                            type="text"
                            name= "nombre_encargado"
                            placeholder="Ingrese el nombre de la perona encargada de la empresa"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Logo de la empresa
                        <input
                            type="file"
                            name = "logo"
                            accept="image/*"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                </div>
            </form>
            <button
                type="button"
                onClick={handleButtonClick}
                className="mt-10 md:-mt-15 md:-ml-185 w-40 px-4 py-2 rounded border-2 border-green-500 text-green-700 bg-transparent hover:bg-green-400 hover:text-white hover:shadow-lg shadow-white/80 backdrop-blur-md text-lg"
            >
                Enviar
            </button>
        </div>
        </MotionTransition>
    );
};

export default Ingresar_empresa;