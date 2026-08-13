import React, { useState } from 'react';
import MotionTransition from './transition-component';
import { TypeAnimation } from 'react-type-animation';
import Mostrar_empleados from './mostrar_empleados';
import Mostrar_empresas from './Mostrar_empresas';
const Consultar = () => {
    const [view, setView] = useState<'default' | 'mostrar_empleados' | 'mostrar_empresas' | 'mostrar_empleados'>('default');
    const [selectedOption, setSelectedOption] = useState('empleados');

    // Renderizar componente según la vista activa
    if (view === 'mostrar_empleados') {
        return <Mostrar_empleados />;
    }

    if (view === 'mostrar_empresas') {
        return <Mostrar_empresas />;
    }

    const handleSearch = () => {
        if (selectedOption === 'empleados') {
            setView('mostrar_empleados');
        } else if (selectedOption === 'empresas') {
            setView('mostrar_empresas');
        }
    };

    return (
        <MotionTransition position="right" className="m-20">
            <div className="flex flex-col justify-center max-w-md md:mt-20 mt-50">
                <h1 className="mb-5 text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-10">
                    Consulta tus &nbsp;
                    <TypeAnimation
                        sequence={[
                            "Empleados", 1000,
                            "Asociados", 1000,
                            "Empresas", 1000,
                            "Reportes", 1000,
                            "Proyectos", 1000,
                            "Etc ..........", 3000
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="font-bold text-green-500"
                    />
                </h1>

                <div className="flex md:flex-row flex-col items-center justify-center gap-3 md:justify-start md:gap-10">
                    <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="px-4 py-2 w-35 md:w-60 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="empleados">Empleados</option>
                        <option value="empresas">Empresas</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <img className="w-8 h-8 -ml-1" src="/icono7.png" alt="" />
                        &nbsp; Buscar
                    </button>
                </div>
            </div>
        </MotionTransition>
    );
};

export default Consultar;
