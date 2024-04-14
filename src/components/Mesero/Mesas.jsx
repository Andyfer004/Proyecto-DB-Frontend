import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

    


const Mesas = () => {
    const { nombre } = useParams();
    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/getmesas/${nombre}`)
            .then(response => {
                setMesas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las mesas:', error);
            });
    }, [nombre]);

    const header = () => {
        const styles = {
            top: 0,
            background: 'rgba(0, 119, 182)',
            color: 'black',
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
            color: 'white',
            textDecoration: 'none',
        };
    
        return (
            <nav style={styles}>
                <a href='# ' style={h2Styles}>Mesas del area {nombre} </a>
            </nav>
        );
    }
    const styleButton = {
        boxSizing: 'border-box',
        padding: '2%',
        margin: '1rem 0 0 1rem',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        backgroundColor: 'rgba(138, 1, 0, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        borderRadius: '10px',
        cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
        border: 'none', // Elimina el borde del botón
    };

    const h2StylesCards = {
        fontFamily: 'Roboto',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'white',
        textDecoration: 'none',
    };

    const renderCards = () => {
        return mesas.map(mesa => (
            <Link key={mesa.id} to={`/cuentas/${mesa.id}`} className="card" style={styleButton}>
                <h3 style={h2StylesCards}>{mesa.id}</h3>
            </Link>
        ));
    };


    return (
        <div>
            {header()}
            <ul>
                {renderCards()}
            </ul>
        </div>
    );
};

export default Mesas;
