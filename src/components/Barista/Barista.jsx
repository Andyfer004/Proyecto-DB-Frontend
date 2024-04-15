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

    useEffect(() => {
        Promise.all([
            fetch('http://127.0.0.1:8000/getordenes'),
            fetch('http://127.0.0.1:8000/getclientes'),
            fetch('http://127.0.0.1:8000/getdrinks'),
            fetch('http://127.0.0.1:8000/getcuenta'),
            fetch('http://127.0.0.1:8000/getmesas'),
            fetch('http://127.0.0.1:8000/getareas')
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([ordenes, clientes, drinks, cuentas, mesas, areas]) => {
                const ordersData = ordenes.map(order => {
                    // Obtener el cliente correspondiente a esta orden
                    const cliente = clientes.find(cliente => cliente.Id_cliente === order.Id_cliente);
                    // Obtener la bebida correspondiente a esta orden
                    const drink = drinks.find(drink => drink.Id_bebida === order.Id_bebida);
                    // Obtener la cuenta correspondiente a esta orden
                    const cuenta = cuentas.find(cuenta => cuenta.Id_cuenta === order.Id_cuenta);
                    // Obtener la mesa correspondiente a esta cuenta
                    const mesa = mesas.find(mesa => mesa.Id_mesa === cuenta.Id_mesa);
                    // Obtener el área correspondiente a esta mesa
                    const area = areas.find(area => area.Id_area === mesa.Id_area);

                    return {
                        Id_orden: order.Id_orden,
                        cliente: cliente ? cliente.nombre : 'Cliente no encontrado',
                        bebida: drink ? drink.nombre : 'Bebida no encontrada',
                        mesa: mesa ? mesa.Id_mesa : 'Mesa no encontrada',
                        area: area ? area.nombre : 'Área no encontrada',
                        cantidad_bebida: order.cantidad_bebida,
                        estado: order.estado
                    };
                });
                setOrders(ordersData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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
                                    // Puedes usar el estado local para manejar el estado del checkbox
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
