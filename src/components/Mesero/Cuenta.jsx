import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const header = () => {
    const styles = {
        background: 'rgba(0, 119, 182)',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        width: '100%',
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '1.5em',
        fontWeight: 'bold',
        margin: '0',
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <nav style={styles}>
            <a href='# ' style={h2Styles}>Cuenta</a>
        </nav>
    );
};

const initialCantidadesBebidas = {};

const Cuenta = () => {
    const { id } = useParams();
    const [idCliente, setIdCliente] = useState('');
    const [platos, setPlatos] = useState([]);
    const [bebidas, setBebidas] = useState([]);

    useEffect(() => {
        // Hacer la solicitud para obtener platos y bebidas al montar el componente
        axios.get('http://127.0.0.1:8000/getplatos') // Ruta de tu API para obtener platos
            .then(response => {
                setPlatos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener platos:', error);
            });

        axios.get('http://127.0.0.1:8000/getdrinks') // Ruta de tu API para obtener bebidas
            .then(response => {
                setBebidas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener bebidas:', error);
            });
    }, []);
    

    const handleInputChange = (e) => {
        setIdCliente(e.target.value);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaCuenta = {
            id_mesa: id, // Usar el ID de la mesa de la URL
            id_cliente: idCliente,
            estado: true,
            total: 0,
        };

        console.log('Datos a enviar:', nuevaCuenta);


        axios.post('http://127.0.0.1:8000/cuenta', nuevaCuenta)
            .then(response => {
                console.log('Cuenta creada exitosamente:', response.data);
            })
            .catch(error => {
                console.error('Error al crear la cuenta:', error);
            });
    };

    const desactivarCuenta = async () => {
        try {
            const data = {
                id_mesa: id, // ID de mesa correspondiente
                id_cliente: idCliente,
            };
    
            console.log('Datos a enviar:', data); // Agregar esta línea para depuración
    
            const response = await axios.post('http://127.0.0.1:8000/desactivar', data);
    
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta según tus necesidades
        } catch (error) {
            console.error('Error al desactivar la cuenta:', error);
            // Aquí puedes manejar el error según tus necesidades
        }
    };


    const stylemain = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    const contentStyles = {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
    };

    const leftContentStyles = {
        background: 'url(/background7.jpg)',
        backgroundSize: 'cover', // Hacer que la imagen se ajuste sin distorsionarse
        backgroundRepeat: 'no-repeat', // Evitar que la imagen se repita
        backgroundPosition: 'center', // Centrar la imagen
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '20px',
    };

    const rightContentStyles = {
        background: 'url(/background8.jpg)',
        backgroundSize: 'cover', // Hacer que la imagen se ajuste sin distorsionarse
        backgroundRepeat: 'no-repeat', // Evitar que la imagen se repita
        backgroundPosition: 'center', // Centrar la imagen
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '20px',
        flexDirection: 'column',
    };

    const styles = {
        container: {
          maxWidth: '70vw',  // Aumenta el ancho del contenedor principal
            margin: '0 auto',
            padding: '40px',   // Ajusta el padding para mantener el diseño equilibrado
            backgroundColor: 'transparent',
            backdropFilter: 'blur(30px)',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        label: {
          marginBottom: '10px',
          margin: '10px',
          display: 'block',
          borderRadius: '10px',
          color: 'white',
        },
        input: {
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          borderRadius: '10px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        },
        button: {
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: 'white',
          borderRadius: '10px',
          color: 'black',
          fontFamily: 'Roboto',
          border: 'none',
          cursor: 'pointer',
        },
      };
      const h2Style = {
        fontFamily: 'Roboto',
        fontSize: '1.5em',
        fontWeight: 'bold',
        margin: '0',
        color: 'white',
        textDecoration: 'none',
    };

      const stylesinput = {
        width: '100%',
          padding: '8px',
          marginBottom: '20px',
          borderRadius: '10px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          color: 'white',
          backgroundColor: 'transparent',
      }


      

      const [cantidadesBebidas, setCantidadesBebidas] = useState(initialCantidadesBebidas);
    const [cantidadBebidas, setCantidadBebidas] = useState(0);
    const [cantidadPlatos, setCantidadPlatos] = useState(0);
    const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState([]);
    const [platosSeleccionados, setPlatosSeleccionados] = useState([]);
    const initialCantidadesPlatos = {};
    const [cantidadesPlatos, setCantidadesPlatos] = useState(initialCantidadesPlatos);



    const handleCantidadBebidasChange = (e) => {
        setCantidadBebidas(parseInt(e.target.value, 10));
    };
    
    const handleCantidadPlatosChange = (e) => {
        setCantidadPlatos(parseInt(e.target.value, 10));
    };

    const handleAddBebida = () => {
        const bebidaSeleccionada = document.getElementById('bebidasSelect').value;
        const cantidad = parseInt(document.getElementById('cantidadBebidas').value, 10);
        
        setCantidadesBebidas(prevState => ({
            ...prevState,
            [bebidaSeleccionada]: (prevState[bebidaSeleccionada] || 0) + cantidad,
        }));
    
        setBebidasSeleccionadas([...bebidasSeleccionadas, bebidaSeleccionada]);
    };
    
    const handleAddPlato = () => {
        const platoSeleccionado = document.getElementById('platosSelect').value;
        const cantidad = parseInt(document.getElementById('cantidadPlatos').value, 10);
        
        setCantidadesPlatos(prevState => ({
            ...prevState,
            [platoSeleccionado]: (prevState[platoSeleccionado] || 0) + cantidad,
        }));
    
        setPlatosSeleccionados([...platosSeleccionados, platoSeleccionado]);
    };
    
    const handleEnviarBebidas = () => {
        setBebidasSeleccionadas([]); // Establece la lista de bebidas seleccionadas como un array vacío
    };
    
    const handleEnviarPlatos = () => {
        setPlatosSeleccionados([]); // Establece la lista de platos seleccionados como un array vacío
    };

    

    
    
    return (
        <div id='root' style={stylemain}>
            {header()}
            <main style={contentStyles}>
                <div style={leftContentStyles}>
                    <div style={styles.container}>
                    <h2 style={{color: 'white'}}>Crear Cuenta</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='idCliente' style={styles.label}>ID Cliente:</label>
                            <input
                                type='text'
                                id='idCliente'
                                name='idCliente'
                                value={idCliente}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type='submit' style={styles.button}>Crear Cuenta</button>
                        <button type= 'button'style={styles.button} onClick={desactivarCuenta}>Desactivar Cuenta</button>
                    </form>
                    </div>
                    
                </div>
                <div style={rightContentStyles}>
    <div>
        <label htmlFor='cantidadBebidas' style={styles.label}>Cantidad de Bebidas:</label>
        <input
            type='number'
            id='cantidadBebidas'
            name='cantidadBebidas'
            value={cantidadBebidas}
            onChange={handleCantidadBebidasChange}
            style={stylesinput}
        />
        <select id='bebidasSelect'>
                    {bebidas.map(bebida => (
                                <option key={bebida.id} value={`${bebida.id}:${bebida.nombre}`}>{bebida.nombre}</option>
                            ))}
        </select>
        <button type= 'button'style={styles.button} onClick={handleAddBebida}>Añadir bebidas</button>
    </div>
                <div>
                    <label htmlFor='cantidadPlatos' style={styles.label}>Cantidad de Platos:</label>
                    <input
                        type='number'
                        id='cantidadPlatos'
                        name='cantidadPlatos'
                        value={cantidadPlatos}
                        onChange={handleCantidadPlatosChange}
                        style={stylesinput}
                    />
                    <select id='platosSelect'> 
                    {platos.map(plato => (
        <option key={plato.id} value={`${plato.id}:${plato.nombre}`}>{plato.nombre}</option>
    ))}
        </select>
        <button type= 'button'style={styles.button} onClick={handleAddPlato}>Añadir platos</button>
                </div>
                <div>
    <h3 style={h2Style}>Bebidas Seleccionadas:</h3>
    {Object.keys(cantidadesBebidas).map((bebida, index) => (
    <p key={index}>
        <span style={{ color: 'white' }}>{cantidadesBebidas[bebida]}</span>
        <span style={{ color: 'white' }}>{bebida}</span>
    </p>
))}

    <button type= 'button'style={styles.button} onClick={handleEnviarBebidas}>enviar bebidas</button>
</div>
<div>
    <h3 style={h2Style}>Platos Seleccionados:</h3>
    {Object.keys(cantidadesPlatos).map((plato, index) => (
        <p key={index}>
            <span style={{color:'white'}}>{cantidadesPlatos[plato]}</span> {/* Mostrar cantidad */}
            <span style={{color:'white'}}>{plato}</span> {/* Mostrar nombre */}
        </p>
    ))}
    <button type= 'button'style={styles.button} onClick={handleEnviarPlatos} >enviar platos</button>
</div>

            </div>
            </main>
        </div>
    );
};

export default Cuenta;
