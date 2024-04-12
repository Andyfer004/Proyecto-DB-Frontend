import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className='register-page'>
    <div className='wrapper'>
      <form action=''>
        <h1>Register</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' required />
        </div>
        <div className='input-box'>
          <input type='email' placeholder='Email' required />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' required />
        </div>
        <div className='input-box'>
          <label htmlFor='role'>Selecciona un Rol:</label>
          <select id = "role" required>
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
            <option value="mesero">Mesero</option>
            <option value="cocina">Cocinero</option>
            <option value="barista">Bar</option>
          </select>
        </div>
        <button className='button' type='submit'>Register</button>
        <div className='register-link'>
          <p>Already have an account? <a href='./'>Login</a></p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Register;
