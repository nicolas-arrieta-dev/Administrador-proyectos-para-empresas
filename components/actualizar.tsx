import MotionTransition from "./transition-component";
const Actualizar = () => {
    const handleButtonClick = () => {
        console.log("El botón ha sido presionado");
    };

    return (
        <MotionTransition position="right">
        <div className="flex flex-col items-center gap-4 p-8 font-sans">
            <h1 className="text-2xl font-bold">Formulario de Actualizacion de datos</h1>
            <form action="/Otro" method="POST" className="flex flex-col gap-8 w-full max-w-4xl md:flex-row">
                <div className="flex flex-col gap-4 flex-1">
                    <label className="flex flex-col">
                        Cédula:
                        <input
                            type="text"
                            placeholder="Ingrese su cédula"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Nombre:
                        <input
                            type="text"
                            placeholder="Ingrese su nombre"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Apellido:
                        <input
                            type="text"
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
                            placeholder="Ingrese su dirección"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Correo:
                        <input
                            type="email"
                            placeholder="Ingrese su correo"
                            className="w-full p-2 rounded border border-gray-800"
                        />
                    </label>
                    <label className="flex flex-col">
                        Celular:
                        <input
                            type="tel"
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
                Actualizar
            </button>
        </div>
        </MotionTransition>
    );
};

export default Actualizar;