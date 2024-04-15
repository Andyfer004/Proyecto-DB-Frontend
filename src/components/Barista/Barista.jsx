import React, { useState, useEffect } from 'react';

const Header = () => {
    const styles = {
        top: 0,
        background: 'rgba(0, 119, 182)',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        padding: '0%',
        alignItems: 'center',
        height: '10vh',
        width: '100%',
        zIndex: 1000,
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '2.5em',
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <nav style={styles}>
            <h1 style={h2Styles}>Bar</h1>
        </nav>
    );
};

const DrinksList = () => {
    const [orders, setOrders] = useState([]);
    const [readyOrders, setReadyOrders] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/getdrinks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setOrders(data))
            .catch(error => {
                console.error('Error fetching orders:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
                // o cambiando el estado para indicar que hubo un error
            });
    }, []);
    

    const listStyles = {
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontFamily: 'Open Sans, sans-serif',
        textAlign: 'center',
    };

    const itemStyles = {
        marginBottom: '10px',
        backgroundColor: 'lightslategrey',
        padding: '10px',
        borderRadius: '5px',
        width: '100px',
        color: 'white',
        fontSize: '0.9em',
        textAlign: 'center',
    };

    const titleStyles = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        fontFamily: 'Open Sans, sans-serif',
        marginBottom: '10px',
    };

    const columnStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleCheck = (index) => {
        const newReadyOrders = [...readyOrders];
        newReadyOrders[index] = !newReadyOrders[index]; // Cambiar el estado del pedido
        setReadyOrders(newReadyOrders);
    };

    return (
        <div>
            <Header />
            <div style={listStyles}>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Clientes:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.cliente}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Bebidas:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.bebida}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>ID Mesa:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.mesa}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Área:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.area}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Listo:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>
                                <input
                                    type="checkbox"
                                    checked={readyOrders[index]} // Usar el estado local para el estado del checkbox
                                    onChange={() => handleCheck(index)}
                                    style={{ backgroundColor: 'lightblue' }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DrinksList;
