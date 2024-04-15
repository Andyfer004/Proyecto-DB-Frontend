import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [nombre, setNombre] = useState(''); // Nuevo estado para el nombre
  const [nit, setNit] = useState(''); // Nuevo estado para el nit
  const [direccion, setDireccion] = useState(''); // Nuevo estado para la dirección
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Encriptar la contraseña antes de enviarla a la API
    const hashedPassword = await hashPassword(contrasena);

    const userData = {
      usuario,
      correo,
      contrasena: hashedPassword,
      rol,
    };

    // Enviar los datos a tu API
    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(response);
      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta de la API aquí

      // Mostrar mensaje de éxito si la cuenta se crea correctamente
      if (response.ok) {
        setSuccessMessage('Cuenta creada exitosamente.');
      }
      if (rol === 'cliente') {
        const clienteData = {
          nombre,
          nit,
          direccion,
        };
  
        const responseCliente = await fetch('http://localhost:8000/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteData),
        });
        console.log(responseCliente);
        const dataCliente = await responseCliente.json();
        console.log(dataCliente); // Puedes manejar la respuesta de la API aquí
  
        // Mostrar mensaje de éxito para el cliente
        if (responseCliente.ok) {
          setSuccessMessage('Cuenta de cliente creada exitosamente.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  // Función para encriptar la contraseña utilizando SHA-256
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
  };

  return (
    <div className='register-page'>
      <div className='wrapper'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          {successMessage && <p>{successMessage}</p>} {/* Aquí se muestra el mensaje si successMessage tiene algún valor */}
          <div className='input-box'>
            <input type='text' placeholder='Username' value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          <div className='input-box'>
            <input type='email' placeholder='Email' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          </div>
          <div className='input-box'>
            <label htmlFor='role'>Selecciona un Rol:</label>
            <select id='role' value={rol} onChange={(e) => setRol(e.target.value)} required>
              <option value='' disabled selected>
                Selecciona una opción
              </option>
              <option value='administrador'>Administrador</option>
              <option value='cliente'>Cliente</option>
              <option value='mesero'>Mesero</option>
              <option value='cocina'>Cocinero</option>
              <option value='barista'>Bar</option>
            </select>
          </div>
          {rol === 'cliente' && (
            <>
              <div className='input-box'>
                <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className='input-box'>
                <input type='text' placeholder='NIT' value={nit} onChange={(e) => setNit(e.target.value)} required />
              </div>
              <div className='input-box'>
                <input type='text' placeholder='Dirección' value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
              </div>
            </>
          )}
          <button className='button' type='submit'>
            Register
          </button>
          <div className='register-link'>
            <p>
              Already have an account? <a href='./'>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
