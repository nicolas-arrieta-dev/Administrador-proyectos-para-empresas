import React, { useEffect, useState } from 'react';
import MotionTransition from './transition-component';

interface InfoProyectoProps {
    id_proyecto: string;
}

const InfoProyecto: React.FC<InfoProyectoProps> = ({ id_proyecto }) => {
    const [responseData, setResponseData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [horas, setHoras] = useState('');
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<any>(null);
    
    const abrirModal = (empleado: any) => {
      setEmpleadoSeleccionado(empleado);
      setMostrarModal(true);
    };
    
    const cerrarModal = () => {
      setMostrarModal(false);
      setHoras('');
      setEmpleadoSeleccionado(null);
    };
    
    const mandarHoras = async () => {
      if (empleadoSeleccionado && horas !== '') {
        console.log(`El trabajador con ID ${empleadoSeleccionado.Id_asociado} ha trabajado ${horas} horas.`);
        try {
          const response = await fetch('http://127.0.0.1:5000/Actualizar_horas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Id_asociado: empleadoSeleccionado.Id_asociado,
              horas: parseFloat(horas), // Asegura que horas se envíe como número
            }),
          });
    
          if (!response.ok) {
            throw new Error(`Error al actualizar horas. Código: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
    
          // Opcional: actualizar localmente el estado de horas del empleado
          setEmpleados(prev =>
            prev.map(emp =>
              emp.Id_asociado === empleadoSeleccionado.Id_asociado
                ? {
                    ...emp,
                    horas_trabajadas: Number(emp.horas_trabajadas || 0) + parseFloat(horas),
                  }
                : emp
            )
          );
          
    
          cerrarModal();
        } catch (error) {
          console.error('Error al mandar horas al backend:', error);
        }
        cerrarModal();
      }
    };
    useEffect(() => {
        const enviarIdProyecto = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/proyectos", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_proyecto }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                
                setResponseData(data);
                setLoading(false);
            } catch (error: any) {
                console.error('Error al enviar el ID del proyecto:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        enviarIdProyecto();
    }, [id_proyecto]);
    const [empleados, setEmpleados] = useState<any[]>([]);

    useEffect(() => {
        if (responseData) {
            setEmpleados(responseData);
        }
    }, [responseData]);
    
    function Eliminiar_empleado(Id_trabajador: number) {
        console.log("Vas a eliminar al trabajador con ID: " + Id_trabajador);
      
        fetch("http://127.0.0.1:5000/eliminar_empleado_asosiado", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Id_trabajador  }),
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Error al eliminar en el servidor');
          }
          return res.json();
        })
        .then(data => {
          console.log('Empleado eliminado en el servidor:', data);
          // Actualizar la lista de empleados en la interfaz
          setEmpleados(prev => prev.filter(emp => emp.Id_asociado !== Id_trabajador));
        })
        .catch(error => {
          console.error('Hubo un error al eliminar el empleado:', error);
        });
      }
      
      
    return (
       <>
    {mostrarModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Ingresar horas trabajadas</h2>
          <p className="mb-2 text-center text-gray-700">
            Empleado: <strong>{empleadoSeleccionado?.nombre_empleado} {empleadoSeleccionado?.Apellido}</strong>
          </p>
          <input
            type="number"
            placeholder="Horas"
            value={horas}
            onChange={(e) => setHoras(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
          />
          <div className="flex justify-between">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={cerrarModal}
            >
              Cancelar
            </button>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500"
              onClick={mandarHoras}
            >
              Mandar
            </button>
          </div>
        </div>
      </div>
    )}
            <MotionTransition position='right'>
      
              <div className='md:overflow-y-scroll md:scrollbar-custom md:h-125  printable '>
                <div className='w-full h-60 bg-white'>
                  {loading ? (
                    <p className="text-gray-600">Cargando empresas...</p>
                  ) : error ? (
                    <p className="text-red-600">Error: {error}</p>
                  ) : responseData && responseData.length > 0 ? (
                    <div>
                      <div className="flex justify-center items-center w-full ">
                        <div className="w-40 h-40 flex items-center justify-center mt-5">
                          <img
                            src={responseData[0].logo_empresa}
                            alt="Logo"
                            className="w-full h-full object-cover rounded-md "
                          />
                        </div>
                      </div>
          
                      <p className="font-bold text-3xl text-green-800 text-center">
                        {responseData[0].nombre_empresa}
                      </p>
          
                      <div className='flex flex-row'>
                        {/* Datos del Proyecto */}
                        <div className='h-135 md:h-130 w-130 md:w-70 bg-white mt-20 m-10 rounded-[20px] shadow-md shadow-black/100 backdrop-blur-sm'>
                          <p className='p-5 text-center text-2xl text-green-900'>Datos del proyecto</p>
                          <p className='p-2 text-lg'><span className='text-green-900'>Nombre: </span>{responseData[0].nombre_proyecto}</p>
                          <p className='p-2 text-lg'><span className='text-green-900'>Fecha de inicio estipulada: </span><br />{responseData[0].fecha_inicio}</p>
                          <p className='p-2 text-lg'><span className='text-green-900'>Fecha de fin estipulada: </span><br />{responseData[0].fecha_finalizacion}</p>
                          <p className='p-2 text-lg'><span className='text-green-900'>Estado del proyecto: </span><br />{responseData[0].estado_proyecto}</p>
                          <p className='p-2 text-lg'><span className='text-green-900'>Fecha real de inicio: </span><br />{responseData[0].fecha_inicio_real}</p>
                          <p className='p-2 text-lg'><span className='text-green-900'>Fecha real de fin: </span><br />{responseData[0].fecha_fin_real}</p>


                        </div>
          
                        {/* Empleados */}
                        <div className='h-135 md:h-130 w-90 md:w-155 bg-green-900 mt-20 rounded-[20px] shadow-md shadow-black/100 backdrop-blur-sm'>
                          <p className='p-5 text-center text-2xl text-white'>Empleados asociados al proyecto</p>
                          {responseData.length > 0 ? (
                            <ul>
                                  <div className='overflow-y-scroll md:h-100 md:scrollbar-custom'>
                              {empleados.map((empresa: any, index: number) => (
                                <li key={index} className="text-gray-800 text-lg">
                                  
                                  <div className="-ml-2 md:m-5 h-20 w-140 bg-white rounded-[10px] flex items-center">
                                    
                                    <div className="w-16 h-16 m-4">
                                      <img src="/icono11.png" alt="" className="w-full h-full object-cover rounded-md" />
                                    </div>
                                    <div className="text-base w-100">
                                     <span className='font-bold'> {empresa.nombre_empleado ? empresa.nombre_empleado : 'No hay clientes asociados'}  {empresa.Apellido}</span><br/>
                                     <span className='font-bold'>Profesion:</span>  {empresa.profesion}   <br/>                                  
                                     <span className='font-bold'>Horas trabajadas:</span>  {empresa.horas_trabajadas}   &nbsp;                                
                                     <button
  className="text-green-600 underline"
  onClick={() => abrirModal(empresa)}
>
  Ingresar horas
</button>

                                    </div>
                                    <button className='w-11 h-11 bg-red-800 rounded-[5px]'
                                    onClick={() => {
                                    Eliminiar_empleado(empresa.Id_asociado);
                                    }}>
                                    <img src="/icono3.png" alt="" className="w-full h-full object-cover rounded-md" />
                                    
                                    </button>
                                  </div>
                                  
                                </li>
                              ))}
                              </div>
                            </ul>
                          ) : (
                            <p className="text-center text-gray-500 mt-4">No hay clientes asociados.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <button
  onClick={() => window.print()}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400 print:hidden"
>
  Reporte
</button>

            </MotionTransition>
            </>
          );
          
};

export default InfoProyecto;
