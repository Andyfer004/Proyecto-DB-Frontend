import React, { useState, useEffect } from 'react';
import axios from 'axios';

const header = () => {

    const styles = {
        top: 0, // Colocarla en la parte superior  
        background: 'rgba(0, 119, 182)',
        color: 'Black', 
        display: 'flex',
        justifyContent: 'center',
        padding: '0',
        alignItems: 'center',
        height: '10vh',
        width: '100%',
        zIndex: 1000, 
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '2em', 
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'White',
        textDecoration: 'none', 
    };

    return (
        <nav style={styles}>
            <a href='# ' style={h2Styles}>Areas</a>
        </nav>
    );
}

const Mesero = () => {
    const stylemain = {
        backgroundColor: 'White',
        display: 'flex',
        flexDirection: 'column', // Cambiado a columna para asegurar el flujo vertical
        flexWrap: 'wrap',
    };

    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // Realiza la solicitud para obtener las áreas de restaurante
        axios.get('http://127.0.0.1:8000/obtenerAreas') // Ajusta la URL según tu configuración
            .then(response => {
                setAreas(response.data); // Actualiza el estado con los datos recibidos
            })
            .catch(error => {
                console.error('Error al obtener las áreas:', error);
            });
    }, []); // La dependencia vacía asegura que se realice solo una vez al montar el componente

    const stylecard = {
        boxSizing: 'border-box',
        padding: '2%',
        margin: '1rem 0 0 1rem',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        backgroundColor: 'rgba(138, 1, 0, 1)',
        display: 'flex',
        flexDirection: 'column', // Ajustado para mejor alineación del contenido
        justifyContent: 'center', // Alinea el contenido al centro horizontalmente
        alignItems: 'center', // Alinea el contenido al centro verticalmente
        width: '30%', // Ancho para tres tarjetas por fila
        borderRadius: '10px',
    };

    const h2StylesCards = {
        fontFamily: 'Roboto',
        fontSize: '1em', 
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'White',
        textDecoration: 'none', 
    };
    

    const renderCards = () => {
        return areas.map(area => (
            <div key={area.Id_area} className="card" style={stylecard} >
                <h3 style={h2StylesCards}>{area.nombre}</h3>
            </div>
        ));
    };
    return (
        <div id = 'root' style={stylemain}>
            <main >
                {header()}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
                {renderCards()}
                </div>
            </main>
        </div>
    );
};

export default Mesero;