"use client";
import React, { useState } from 'react';
import MotionTransition from './transition-component';
import Menu from './menu';
import Ingresar from './ingresar';
import Consultar from './consultar';
import MostrarTodo from './mostrar_todo';
import Actualizar from './actualizar';
import Elije from './elije';
import Proyecto from './proyecto';
import Mostrar_proyectos from './mostrar_proyectos';
const Nanvar = () => {
    const [activeButton, setActiveButton] = useState<string>('Menu');

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const buttonClass = (buttonName: string) =>
        `  p-6 transition-all duration-300 text-lg ${
            activeButton === buttonName
                ? 'border-l-5 border-white shadow-lg shadow-white/80 backdrop-blur-md'
                : 'hover:shadow-lg hover:shadow-white/80 hover:backdrop-blur-md'
        }`;

    return (
        <MotionTransition position="right" className='flex'>
        <div className=" w-[100px] h-[100vh] md:w-[300px] md:h-[100vh] shadow-md shadow-white/100 backdrop-blur-sm border-r-2 border-white">
        <div className='w-full h-29'>
        </div>
        <div className="flex justify-center items-center w-60 h-60 -mt-40  -mb-14 ml-5">
            <img className="w-full h-full object-contain" src="/logo2.png" alt="" />
        </div>
        <button
            className={`${buttonClass('Proyecto')} w-10 md:w-53 h-10 ml-6 md:ml-8 flex items-center gap-2 text-lg rounded-[60px] border-2 border-white  mb-7 `}
            onClick={() => handleButtonClick('Proyecto')}
            >
            <div className='font-bold text-3xl -ml-2 md:ml-1 mr-3 '>+</div>
            <span style={{ fontSize: '16px' }} className="ml-0 md:opacity-100 opacity-0">Nuevo Proyecto</span>
            </button>
            <button
                className={`${buttonClass('Menu')} h-18 w-full flex items-center gap-2 text-lg`}
                onClick={() => handleButtonClick('Menu')}
            >
                <img className='w-9 h-9 -mt-1 ml-2' src="/icono1.png" alt="" />
                <span className="ml-6 md:opacity-100 opacity-0">Menu</span>
            </button>
            <button
                 className={`${buttonClass('Ingresar')} h-18 w-full flex items-center gap-2 text-lg`}
                onClick={() => handleButtonClick('Ingresar')}
            >
                <img className='w-9 h-9 -mt-1 ml-2' src="/icono2.png" alt="" />
                <span className="ml-6 md:opacity-100 opacity-0">Registrar</span>
            </button>
            <button
                 className={`${buttonClass('Consultar')} h-18 w-full flex items-center gap-2 text-lg`}
                onClick={() => handleButtonClick('Consultar')}
            >
            <img className='w-9 h-9 -mt-1 ml-2' src="/icono7.png" alt="" />
            <span className="ml-6 md:opacity-100 opacity-0">Consular</span>
  
            </button>
             
            <button
                 className={`${buttonClass('Mostrar todo')} h-18 w-full flex items-center gap-2 text-lg`}
                onClick={() => handleButtonClick('Mostrar todo')}
            >
            <img className='w-9 h-9 -mt-1 ml-2' src="/icono5.png" alt="" />
            <span className="ml-6 md:opacity-100 opacity-0">Proyectos</span>
           </button>
            
            {/*
            <button
                className={`${buttonClass('Actualizar')} flex items-center gap-2 text-lg`}

                onClick={() => handleButtonClick('Actualizar')}
            >
            <img className='w-9 h-9 -mt-1 ml-2' src="/icono8.png" alt="" />
            <span className="ml-6 md:opacity-100 opacity-0">Actualizar</span>
            </button>
            */}
            <button
                className={`${buttonClass('Cerrar sesion')} w-full flex items-center gap-2 text-lg`}
                onClick={() => handleButtonClick('Cerrar sesion')}
            >
            <img className='w-9 h-9 -mt-1 ml-2 ' src="/icono6.png" alt="" />
            <span className="ml-6 md:opacity-100 opacity-0">Cerrar sesion</span>
            </button>
            </div>
            <div className='md:h-[85vh] w-[80%] text-black m-0 md:m-10 rounded-[5px] shadow-md shadow-black/50' style={{ backgroundColor: '#ffffff7f' }}>
                {activeButton === 'Menu' && <Menu />}
                {activeButton === 'Ingresar' && <Elije/>}
                {activeButton === 'Consultar' && <Consultar />}
                {activeButton === 'Mostrar todo' && <Mostrar_proyectos />}
                {activeButton === 'Actualizar' && <Actualizar/>}
                {activeButton === 'Proyecto' && <Proyecto/>}
                {activeButton === 'Cerrar sesion' && (window.location.href = '/')}

            </div>
 
        </MotionTransition>
    );
};

export default Nanvar;