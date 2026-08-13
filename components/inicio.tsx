import { div } from 'framer-motion/client';
import React from 'react';

const Inicio =  () => {
    return (
        <div className="hidden md:block md:w-[60%] md:h-[100vh] shadow-md shadow-white/100 backdrop-blur-sm" style={{ backgroundColor: '#f6ff007f' }}>

            <div className="w-120 h-120 m-auto md:mt-13">
                <img src="/logo2.png" alt="" className='-mt-15 h-30 w-70 absolute -ml-40' />
                <img src="/imagen1.png" alt="" className="max-w-full max-h-full object-contain" />
                <div className="flex justify-center items-center mt-10 font-bold">
                <p className="text-4xl text-center">
                    <span className="text-green-500">Organizamos</span> tus proyectos, <span className="text-green-500">potenciamos</span> tus resultados.
                </p>
            </div>
            </div>
 

        </div>
    );
};

export default Inicio;