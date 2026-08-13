import React, { useState } from 'react';
import MotionTransition from './transition-component';
import Ingresar from './ingresar';
import Ingresar_empresa from './registrar_empresa';
import Ingresar_usuario from './ingresar_usuario';

const Elije = () => {
    const [view, setView] = useState<'default' | 'ingresar' | 'ingresar_empresa' | 'ingresar_usuario'>('default');

    if (view === 'ingresar') {
        return <Ingresar />
    }

    if (view === 'ingresar_empresa') {
        return <Ingresar_empresa />;
    }
    if (view === 'ingresar_usuario') {
        return <Ingresar_usuario />;
    }

    return (
        <MotionTransition position="right">
            <div className="flex items-center justify-center mt-20">
                <button
                    className="flex flex-col items-center justify-center border-5 border-white p-2 rounded-md hover:shadow-lg shadow-white/90 backdrop-blur-md m-10"
                    onClick={() => setView('ingresar_empresa')} 
                >
                    <img src="/icono9.png" alt="Logo" className="w-50 h-50 mb-5" />
                    <span className="text-md text-green-700 text-lg font-bold">Empresa</span>
                </button>
                <button
                    className="flex flex-col items-center justify-center border-5 border-white p-2 rounded-md hover:shadow-lg shadow-white/90 backdrop-blur-md m-10"
                    onClick={() => setView('ingresar')} 
                >
                    <img src="/icono10.png" alt="Logo" className="w-50 h-50 mb-5" />
                    <span className="text-md text-green-700 text-lg font-bold">Empleado</span>
                </button>

            </div>
        </MotionTransition>
    );
};

export default Elije;