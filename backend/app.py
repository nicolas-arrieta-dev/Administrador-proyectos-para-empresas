from flask import Flask, request, render_template
import mysql.connector
from mysql.connector import Error
import pyodbc
from flask_cors import CORS
from datetime import datetime
import os
import uuid
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
from flask import jsonify
#D:\pyton\python.exe "d:/Poryectos de ia/backend/app.py"

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = os.path.abspath(os.path.join(os.getcwd(), "..", "pollas2", "landing-particles", "public"))
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  

@app.route('/registrar_empresa', methods=['POST'])
def registrar_empresa():
    logo = request.files.get('logo')
    logo_path = ""

    if logo:
        ext = os.path.splitext(logo.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        logo.save(file_path)
        logo_path = f"../pollas2/landing-particles/public{filename}"  


    cif = request.form.get('cif')
    rit = request.form.get('rit')
    nombre = request.form.get('nombre')
    direccion = request.form.get('direccion')
    telefono = request.form.get('telefono')
    email = request.form.get('email')
    sector = request.form.get('sector')
    nombre_encargado = request.form.get('nombre_encargado')
    logo = request.files.get('logo')
    fecha_registro = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    print(" ✅✅✅",logo)

    datos_empresa = {
        "cif": cif,
        "rit": rit,
        "nombre": nombre,
        "direccion": direccion,
        "telefono": telefono,
        "email": email,
        "sector": sector,
        "nombre_encargado": nombre_encargado,
        "logo": logo,
        "fecha_registro": fecha_registro
    }

    print("Datos recibidos:")
    print(datos_empresa)

    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:

        cursor.callproc('insertar_empresas', (
            cif, rit, nombre, direccion, telefono,email,
            sector, nombre_encargado, filename, fecha_registro
        ))

        conexion.commit()
        res = {
        "mensaje": "Empresa registrada correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Registrando la empresa ❌",
        "estado" : "error"
        }

    cursor.close()
    conexion.close()

   
    return res
@app.route('/registrar_empleado', methods=['POST'])
def registrar_empleado():


    id_trabajador = request.form.get('id_trabajador')
    DNI = request.form.get('DNI')
    nombre = request.form.get('nombre')
    apellido = request.form.get('apellido')
    direccion = request.form.get('direccion')
    email = request.form.get('email')
    celular = request.form.get('celular')


    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:

        cursor.callproc('Insertar_Trabajador', (
            id_trabajador, DNI, nombre, apellido, direccion, email,
            celular,
        ))

        conexion.commit()
        res = {
        "mensaje": "Empleado registrada correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Registrando al Empleado ❌",
        "estado" : "error"
        }

    cursor.close()
    conexion.close()

   
    return res

@app.route('/registrar_usuario', methods=['POST'])
def registrar_usuario():

    usuario= request.form.get('usuario')
    passs= request.form.get('pass')




    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:

        cursor.callproc('crear_usuario', (
            usuario, passs
        ))

        conexion.commit()
        res = {
        "mensaje": "Usuario registrada correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Registrando al Usuario ❌",
        "estado" : "error"
        }

    cursor.close()
    conexion.close()

   
    return res
@app.route('/registrar_proyecto', methods=['POST'])
def registrar_proyecto():

    nombre= request.form.get('nombre')
    id_empresa= request.form.get('id_empresa')
    fecha_inicio = request.form.get('fecha_inicio') 
    fecha_finalizacion = request.form.get('fecha_finalizacion')
    estado = "Pendiente"

    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:

        cursor.callproc('Insertar_Proyecto', (
            nombre, id_empresa,fecha_inicio, fecha_finalizacion, estado,
        ))

        conexion.commit()
        res = {
        "mensaje": "Poryecto registrada correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Registrando el Proyecto ❌",
        "estado" : "error"
        }

    cursor.close()
    conexion.close()

   
    return res
@app.route('/mostrar_todo_empresas', methods=['POST'])
def mostrar_todo_empresas():
    try:
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('Mostrar_todo_empresas')

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
   
@app.route('/mostrar_todo_proyectos', methods=['POST'])
def mostrar_todo_proyectos():
    try:
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('Mostrar_todo_proyetos')

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
@app.route('/mostrar_todo_empleados', methods=['POST'])
def mostrar_todo_empleados():
    try:
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('Mostrar_todo_empleados')

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
@app.route('/mostrar_todo_profesiones', methods=['POST'])
def mostrar_todo_profesiones():
    try:
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('mostrar_todo_profesion')

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
    
@app.route('/proyectos', methods=['POST'])
def proyectos():
    try:
        data = request.get_json()
        id_proyecto = data.get('id_proyecto')
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('proyectos',(id_proyecto,))

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
@app.route('/eliminar_empleado_asosiado', methods=['POST'])
def eliminar_empleado_asosiado():
    try:
        data = request.get_json()
        id_empleado = data.get('Id_trabajador')
        conexion = crear_conexion()
        cursor = conexion.cursor()
        print("✅✅✅✅✅",id_empleado)
        cursor.callproc('eliminar_empleado_asociado',(id_empleado,))
        conexion.commit()


        return jsonify({"mensaje": "Empleado eliminado correctamente"})

    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
@app.route('/registrar_asosiados', methods=['POST'])
def registrar_asosiados():
    data = request.get_json()
    id_empresa = data.get('id_proyecto')
    empleado_id = data.get('empleado_id')
    profesion_id = data.get('profesion_id')
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print("Datos recibidos:")
    print(f"id_empresa: {id_empresa}")
    print(f"empleado_id: {empleado_id}")
    print(f"profesion_id: {profesion_id}")

    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:
       
        cursor.callproc('Insertar_asosiados', (id_empresa, empleado_id, profesion_id, fecha))

        conexion.commit()
        res = {
            "mensaje": "Asociado registrado correctamente ✅",
            "estado": "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
            "mensaje": "Hubo un error registrando al asociado ❌",
            "estado": "error"
        }

    cursor.close()
    conexion.close()

    return jsonify(res)
@app.route('/Comenzar_proyecto', methods=['POST'])
def Comenzar_proyecto():
    data = request.get_json()
    id_proyecto = data.get('selectedEmpresaId')
    print("Datos recibidos:")
    print(f"id_empresa:✅✅ {id_proyecto}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    estado = "En curso"
    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:
       
        cursor.callproc('comenzar_proyecto', (id_proyecto,estado, fecha))

        conexion.commit()
        res = {
            "mensaje": "Poryecto comenzado ✅",
            "estado": "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
            "mensaje": "Hubo un error empezando el proyecto ❌",
            "estado": "error"
        }

    cursor.close()
    conexion.close()

    return jsonify(res)
@app.route('/Terminar_proyecto', methods=['POST'])
def Terminar_proyecto():
    data = request.get_json()
    id_proyecto = data.get('selectedEmpresaId')
    print("Datos recibidos:")
    print(f"id_empresa:✅✅ {id_proyecto}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    estado = "Terminado"
    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:
       
        cursor.callproc('terminar_proyecto', (id_proyecto,estado, fecha))

        conexion.commit()
        res = {
            "mensaje": "Poryecto terminado ✅",
            "estado": "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
            "mensaje": "Hubo un error al terminar el proyecto ❌",
            "estado": "error"
        }

    cursor.close()
    conexion.close()

    return jsonify(res)
@app.route('/Cancelar_proyecto', methods=['POST'])
def Cancelar_proyecto():
    data = request.get_json()
    id_proyecto = data.get('selectedEmpresaId')
    print("Datos recibidos:")
    print(f"id_empresa:✅✅ {id_proyecto}")
    fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    estado = "Cancelado"
    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:
       
        cursor.callproc('terminar_proyecto', (id_proyecto,estado, fecha))

        conexion.commit()
        res = {
            "mensaje": "Poryecto Cancelado ✅",
            "estado": "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
            "mensaje": "Hubo un error al Cancelar el proyecto ❌",
            "estado": "error"
        }

    cursor.close()
    conexion.close()

    return jsonify(res)

@app.route('/mas_info_empleados', methods=['POST'])
def mas_info_empleados():
    try:
        data = request.get_json()
        id_empleado = data.get('id_empleado')
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('ObtenerProyectosPorEmpleado',(id_empleado,))

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
@app.route('/Actualizar_horas', methods=['POST'])
def Actualizar_horas():
    data = request.get_json()
    id_proyecto = data.get('Id_asociado')
    horas = data.get('horas')

    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:
       
        cursor.callproc('Actualizar_horas', (id_proyecto,horas))

        conexion.commit()
        res = {
            "mensaje": "Horas Actualizadas ✅",
            "estado": "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
            "mensaje": "Hubo un error al actualizar las horas ❌",
            "estado": "error"
        }

    cursor.close()
    conexion.close()

    return jsonify(res)

@app.route('/consular_empleado', methods=['POST'])
def consular_empleado():
    try:
        data = request.get_json()
        id_empleado = data.get('id_empleado')
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('consultar_empleado',(id_empleado,))

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
    
@app.route('/Actualizar_empleado', methods=['POST'])
def Actualizar_empleado():


    id_trabajador = request.form.get('id_trabajador')
    DNI = request.form.get('DNI')
    nombre = request.form.get('nombre')
    apellido = request.form.get('apellido')
    direccion = request.form.get('direccion')
    email = request.form.get('email')
    celular = request.form.get('celular')


    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:

        cursor.callproc('Actualizar_empleado', (
            id_trabajador, DNI, nombre, apellido, direccion, email,
            celular,
        ))

        conexion.commit()
        res = {
        "mensaje": "Empleado Actuslizado correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Actualizando al Empleado ❌",
        "estado" : "error"
        }

    cursor.close()
    conexion.close()

   
    return res

@app.route('/eliminar_empleado', methods=['POST'])
def eliminar_empleado():
    try:
        data = request.get_json()
        id_empleado = data.get('id_empleado')
        conexion = crear_conexion()
        cursor = conexion.cursor()
        cursor.callproc('eliminar_empleado',(id_empleado,))


        conexion.commit()
        res = {
        "mensaje": "Empleado Eliminado correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Eliminando al Empleado ❌",
        "estado" : "error"
        }
    return res
@app.route('/eliminar_empresa', methods=['POST'])
def eliminar_empresa():
    try:
        data = request.get_json()
        id_empresa = data.get('id_empresa')
        conexion = crear_conexion()
        cursor = conexion.cursor()
        cursor.callproc('eliminar_empresa',(id_empresa,))


        conexion.commit()
        res = {
        "mensaje": "Empresa Eliminada correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Eliminando la Empresa ❌",
        "estado" : "error"
        }
    return res
@app.route('/Consultar_empresa', methods=['POST'])
def Consultar_empresa():
    try:
        data = request.get_json()
        id_empresa = data.get('id_empresa')
        conexion = crear_conexion()
        cursor = conexion.cursor()

        cursor.callproc('consultar_empresa',(id_empresa,))

        resultados = []
        columnas = []
        
        for result in cursor.stored_results():
            resultados_raw = result.fetchall()
            columnas = [col[0] for col in result.description]
            
            for fila in resultados_raw:
                resultados.append(dict(zip(columnas, fila)))

        return jsonify(resultados)
    
    except Exception as e:
        print(f"Ocurrió un error: {e}")
        return jsonify({"error": "Ocurrió un error en el procesamiento de los datos"}), 500
@app.route('/Actualizar_empresa', methods=['POST'])
def Actualizar_empresa():


    cif = request.form.get('cif')
    rit = request.form.get('rit')
    nombre= request.form.get('nombre')
    direccion = request.form.get('direccion')
    telefono = request.form.get('telefono')
    email = request.form.get('email')
    sector = request.form.get('sector')
    nombre_encargado = request.form.get('nombre_encargado')
    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:

        cursor.callproc('Actualizar_empresa', (
           cif, rit, nombre, direccion, telefono, email,sector, nombre_encargado
        ))

        conexion.commit()
        res = {
        "mensaje": "Empresa Actualizado correctamente ✅",
        "estado" : "ok"
        }
    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
        "mensaje": "Hubo un error Actualizando la Empresa ❌",
        "estado" : "error"
        }

    cursor.close()
    conexion.close()

   
    return res
from flask import request, jsonify

@app.route('/verificar_usuario', methods=['POST'])
def verificar_usuario():
    data = request.get_json()
    usuario = data.get('usuario')
    passs = data.get('pass')

    conexion = crear_conexion()
    cursor = conexion.cursor()

    try:
        cursor.callproc('VerificarUsuario', (usuario, passs))

        for result in cursor.stored_results():  
            resultados = result.fetchall()

        print(resultados)

        if resultados:
            res = {
                "mensaje": "Usuario encontrado correctamente ✅ Bienvenido",
                "estado": "ok"
            }
        else:
            res = {
                "mensaje": "Usuario o contraseña incorrectos ❌",
                "estado": "error"
            }

    except Exception as e:
        print(f"❌ Error: {e}")
        res = {
            "mensaje": "Hubo un error al verificar el usuario ❌",
            "estado": "error"
        }

    cursor.close()
    conexion.close()
    return jsonify(res)

def crear_conexion():
    conexion = None
    try:
        conexion = mysql.connector.connect(
                   host="localhost",
                   user="root",
                   password="",
                   database="proyectos"
        )
        print("Conexión exitosa a la base de datos")
    except Error as e:
           print(f"Error '{e}' ocurrió al intentar conectarse a la base de datos")
    return conexion





    


if __name__ == '__main__':
    app.run(debug=True)