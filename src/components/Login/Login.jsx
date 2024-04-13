import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import bcrypt from 'bcryptjs'; // Importa bcryptjs
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Encriptar la contraseña antes de enviarla al servidor
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enviar los datos de inicio de sesión al servidor
    const userData = { email, password: hashedPassword };
    try {
      const response = await fetch('http://127.0.0.1:8000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Verificar si el inicio de sesión fue exitoso
      if (response.ok) {
        // Redirigir según el rol del usuario
        switch (data.role) {
          case 'Administrador':
            navigate.push('/admin');
            break;
          case 'Cliente':
            navigate.push('/cliente');
            break;
          case 'Mesero':
            navigate.push('/mesero');
            break;
          case 'Cocinero':
            navigate.push('/cocinero');
            break;
          case 'Barista':
            navigate.push('/barista');
            break;
          default:
            // Manejar otros roles o errores
            break;
        }
      } else {
        // Manejar errores de inicio de sesión
        console.error('Error en inicio de sesión:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-page'>
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <FaLock className='icon' />
          </div>
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' />
              "Remember me"
            </label>
            <a href='hello'>Forgot password</a>
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
