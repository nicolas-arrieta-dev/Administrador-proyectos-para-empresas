"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MotionTransition from "./transition-component";
import Notificacion2 from "./notificacion2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [precionado, setPrecionado] = useState(false);
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter(); // para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrecionado(false);
    try {
      const respuesta = await fetch("http://localhost:5000/verificar_usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          usuario: email,
          pass: password,
        }),
      });

      const data = await respuesta.json();
      console.log(data);
      
      setMensaje(data.mensaje);
      setEstado(data.estado);
      setPrecionado(true);

      if (data.estado === "ok") {
        setTimeout(() => {
          router.push("/Menu");
        }, 1500);
      }
    } catch (error) {
      console.error("Error al enviar al backend:", error);
      setMensaje("Error de conexión con el servidor");
      setEstado("error");
      setPrecionado(true);
    }
  };

  return (
    <MotionTransition position="right">
      {precionado && (
        estado === "ok" ? (
          <Notificacion2 mensaje={mensaje} tipo="ok" />
        ) : estado === "error" ? (
          <Notificacion2 mensaje={mensaje} tipo="error" />
        ) : null
      )}
      <div className="flex items-center justify-center min-h-screen m-15 -mt-10">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-sm shadow-md shadow-white/100 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <span className="text-gray-200 text-sm">Email</span>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="space-y-2">
              <span className="text-gray-200 text-sm">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </MotionTransition>
  );
};

export default Login;
