const header = () => {

    const styles = {
        position: 'fixed', // Fijar la posición de la barra de navegación
        top: 0, // Colocarla en la parte superior  
        background: 'rgba(0, 119, 182)',
        color: 'Black', // color de texto
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20%',
        alignItems: 'center',
        height: '10vh',
        width: '100%',
        zIndex: 1000, // Asegurar que esté por encima de otros elementos
    };

    const h2Styles = {
        fontFamily: 'Roboto',
        fontSize: '1.5em', 
        fontWeight: 'bold',
        margin: '0',
        padding: '5%',
        color: 'White',
        textDecoration: 'none', 
    };

    return (
        <nav style={styles}>
            <a href='# ' style={h2Styles}>Facturas</a>
            <a href='# ' style={h2Styles}>Quejas</a>  
        </nav>
    );
}



const Cliente = () => {
    const stylemain = {
        backgroundColor: 'White',
    };
    return (
        <div id = 'root' style={stylemain}>
            <main >
                {header()}
            </main>
        </div>
    );
};

export default Cliente;