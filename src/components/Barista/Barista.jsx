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
    const [readyOrders, setReadyOrders] = useState({});

    useEffect(() => {
        fetch('http://127.0.0.1:8000/getordenes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Mapear la respuesta para ajustarla a los campos correctos
                const ordersData = data.map(order => ({
                    Id_cuenta: order.Id_cuenta,
                    Id_bebida: order.Id_bebida,
                    cantidad_bebida: order.cantidad_bebida,
                    estado: order.estado
                }));
                setOrders(ordersData);
                // Inicializar readyOrders con un objeto vacío para cada Id_cuenta
                const initialReadyOrders = ordersData.reduce((acc, order) => {
                    acc[order.Id_cuenta] = false;
                    return acc;
                }, {});
                setReadyOrders(initialReadyOrders);
            })
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

    const handleCheck = (Id_cuenta) => {
        setReadyOrders(prevReadyOrders => ({
            ...prevReadyOrders,
            [Id_cuenta]: !prevReadyOrders[Id_cuenta]
        }));
    
        setOrders(prevOrders => prevOrders.filter(order => order.Id_cuenta !== Id_cuenta));
    };
    

    return (
        <div>
            <Header />
            <div style={listStyles}>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Clientes:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.Id_cuenta}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Bebidas:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.Id_bebida}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>ID Mesa:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.cantidad_bebida}</li>
                        ))}
                    </ul>
                </div>
                <div style={columnStyles}>
                    <h2 style={titleStyles}>Área:</h2>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index} style={itemStyles}>{order.estado}</li>
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
                                    checked={readyOrders[order.Id_cuenta]} // Usar el estado local para el estado del checkbox
                                    onChange={() => handleCheck(order.Id_cuenta)}
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
