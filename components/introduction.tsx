"use client"
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import MotionTransition from "./transition-component";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

const Introduction = () => {
 
  const imagenes = ["/perro1.png", "/perro2.png", "/perro3.png", "/perro4.png",  "/perro5.png"];
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 2000);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndice((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };
  
  return (
    <MotionTransition position="right" className="absolute z-40 inline-block w-full top-5 md:top-30 px-20">
        <div className="z-20 w-full bg-darkBg/60">
          <div className="z-20 grid items-center h-full p-6 py-20 md:py-0 md:grid-cols-2">
          <div className="w-[400px] h-[300px] relative overflow-hidden mt-20 ml-20 bg-darkBg/60 px-5 py-3 rounded-lg shadow-md shadow-white/20 backdrop-blur-sm">
              <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${indice * 20}%)`,
            width: `${imagenes.length * 100}%`
          }}
        >
          {imagenes.map((src, i) => (
            <img
            key={i}
            src={src}
            alt={`Imagen ${i}`}
            className="object-cover h-full "
            style={{
              width: `${100 / imagenes.length}%`,
              flexShrink: 0,
            }}
            />
          ))}
        </div>
        {/* Botones */}
        <button
          onClick={anterior}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 px-2 py-1 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={siguiente}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 px-2 py-1 rounded-full"
        >
          ›
        </button>
              
              </div>


            <div className="flex flex-col justify-center max-w-md">
              <h1 className="mb-5 text-2xl leanding-tight text-center md:text-left
              md: text-4xl md:mb-10
              ">Razas de perros que puede predecir <br/>
              <TypeAnimation

              sequence={[
                  "Beagle",
                  1000,
                  "Bulldog frances",
                  1000,
                  "Chihuahua",
                  1000,
                  "Dalmata",
                  1000,
                  "Doberman",
                  1000,
                  "Dogo argentino", 
                  1000,
                  "Golden retriever",
                  1000,
                  "Lobo siberiano", 
                  1000,
                  "Pastor aleman", 
                  1000, 
                  "Rottweiler"
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-bold text-purple-500"
              
              />
              </h1>

              <p className="mx-aunto mb-2 text xl md:mx-0  md:mb-8">
                Prueba esta inteligencia artificail que te permite predecir la raza de un perro a partir de una imagen. <br/>
              </p>

              <div className="flex item-center justify-center gap-3 md:justify-start md:gap-10">

                  <Link href="/Demo" className="px-3 py-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover: shadow-white/50">Get Stared</Link>



              </div>
            </div>
          </div>
        </div>
      </MotionTransition>
  );
}

export default Introduction;
