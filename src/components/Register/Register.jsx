import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Encriptar la contraseña antes de enviarla a la API
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
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

      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta de la API aquí

      // Mostrar mensaje de éxito si la cuenta se crea correctamente
      if (response.ok) {
        setSuccessMessage('Cuenta creada exitosamente.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='register-page'>
      <div className='wrapper'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          {successMessage && <p>{successMessage}</p>} {/* Aquí se muestra el mensaje si successMessage tiene algún valor */}
          <div className='input-box'>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className='input-box'>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='input-box'>
            <label htmlFor='role'>Selecciona un Rol:</label>
            <select id='role' value={role} onChange={(e) => setRole(e.target.value)} required>
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
