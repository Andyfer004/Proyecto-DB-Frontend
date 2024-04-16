import React, { useState } from 'react';

const header = () => {
    const styles = {
        top: 0, // Colocarla en la parte superior  
        background: 'rgba(0, 119, 182)',
        color: 'Black', // color de texto
        display: 'flex',
        justifyContent: 'center',
        padding: '0%',
        alignItems: 'center',
        height: '10vh',
        width: '100%',
        zIndex: 1000, // Asegurar que esté por encima de otros elementos
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '2.5em',
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'White',
        textDecoration: 'none',
    };

    return (
        <nav style={styles}>
            <h1 style={h2Styles}>Bar</h1>
        </nav>
    );
}

const DrinksList = () => {
    // Aquí puedes obtener las listas de bebidas, clientes, ID de mesa y área
    // Puedes obtenerlas de un estado, de un contexto, o pasadas como props
    const clients = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4'];
    const tableIds = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4'];
    const areas = ['Área 1', 'Área 2', 'Área 3', 'Área 4'];

    // Estado para almacenar los pedidos marcados como listos
    const [readyOrders, setReadyOrders] = useState([]);

    const listStyles = {
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row', // Alinear las listas en fila
        justifyContent: 'space-around', // Espacio uniforme entre las listas
        fontFamily: 'Century Gothic', // Cambiar la fuente a Century Gothic
    };

    const itemStyles = {
        marginBottom: '10px',
    };

    const titleStyles = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    const columnStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleCheck = (index) => {
        // Añadir o quitar el pedido de la lista de pedidos listos
        if (readyOrders.includes(index)) {
            setReadyOrders(readyOrders.filter(item => item !== index));
        } else {
            setReadyOrders([...readyOrders, index]);
        }
    };

    return (
        <div style={listStyles}>
            <div style={columnStyles}>
                <h2 style={titleStyles}>Clientes:</h2>
                <ul>
                    {clients.map((client, index) => (
                        <li key={index} style={itemStyles}>{client}</li>
                    ))}
                </ul>
            </div>
            <div style={columnStyles}>
                <h2 style={titleStyles}>ID de Mesa:</h2>
                <ul>
                    {tableIds.map((tableId, index) => (
                        <li key={index} style={itemStyles}>{tableId}</li>
                    ))}
                </ul>
            </div>
            <div style={columnStyles}>
                <h2 style={titleStyles}>Área:</h2>
                <ul>
                    {areas.map((area, index) => (
                        <li key={index} style={itemStyles}>{area}</li>
                    ))}
                </ul>
            </div>
            <div style={columnStyles}>
                <h2 style={titleStyles}>Listo:</h2>
                <ul>
                    {clients.map((client, index) => (
                        <li key={index} style={itemStyles}>
                            <input
                                type="checkbox"
                                checked={readyOrders.includes(index)}
                                onChange={() => handleCheck(index)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const Barista = () => {
    const stylemain = {
        backgroundColor: 'White',
    };

    const cardStyles = {
        margin: '40px auto', // Centro la tarjeta y aumento el margen superior
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        maxWidth: '800px', // Limito el ancho de la tarjeta para que no ocupe toda la pantalla
    };

    return (
        <div id='root' style={stylemain}>
            <main>
                {header()}
                <div style={cardStyles}>
                    <DrinksList />
                </div>
            </main>
        </div>
    );
};

export default Barista;
