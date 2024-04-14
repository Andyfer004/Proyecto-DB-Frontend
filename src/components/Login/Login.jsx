import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const hashedPassword = await hashPassword(contrasena);
      console.log('Contraseña encriptada:', hashedPassword);
      // Realizar la solicitud de inicio de sesión
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena: hashedPassword }),
      });
  
      if (response.ok) {
        // Si la respuesta es exitosa, redirige al usuario a la página adecuada
        const data = await response.json();
        switch (data.rol) {
          case 'administrador':
            navigate('/administrador');
            break;
          case 'cliente':
            navigate('/cliente');
            break;
          case 'empleado':
            navigate('/barista');
            break;
          case 'cocinero':
            navigate('/cocinero');
            break;
          case 'mesero':
            navigate('/mesero');
            break;
          // Agrega más casos según sea necesario
          default:
            // Maneja otros roles o errores
            break;
        }
      } else if (response.status === 401) {
        // Si la respuesta es 401 (Unauthorized), muestra un mensaje de error al usuario
        setError('Credenciales incorrectas');
      } else {
        // Otros errores del servidor
        setError('Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log('Contraseña encriptada:', hashedPassword); 
    return hashedPassword;
  };

  return (
    <div className='login-page'>
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <div className='error'>{error}</div>}
          <div className='input-box'>
            <input type='email' placeholder='Email' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            <FaLock className='icon' />
          </div>
          <button className='button' type='submit'>
            Login
          </button>
          <div className='register-link'>
            <p>Don't have an account? <a href='./Register'>Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
