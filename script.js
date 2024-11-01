const publicKey = '95980977f4cf2f25953ec28c603fbb6f';
const privateKey = '8107bfb3625c2f2fa845e64ce6327a2b52ccd81b';

document.getElementById('cargar-personajes').addEventListener('click', async () => {
    const ts = Date.now(); // Genera el tiempo actual en milisegundos

    try {
        const hash = md5(ts + privateKey + publicKey); // Genera el hash MD5

        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`; // URL aplicando parámetros 

        const response = await fetch(url);
        console.log('Status:', response.status); // Muestra el código de estado

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            const errorText = await response.text(); // Lee el texto de error
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json(); // Lee la respuesta como JSON
        mostrarDatos(data.data.results); // Mostrar datos obtenidos
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

function mostrarDatos(personajes) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (personajes.length === 0) {
        resultadoDiv.innerHTML = 'No se encontraron personajes.';
        return;
    }

    personajes.forEach(personaje => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${personaje.name}</strong>: ${personaje.description || '- Sin descripcion. -'}`;
        resultadoDiv.appendChild(div);
    });
}

function md5(string) {
    return CryptoJS.MD5(string).toString(); // Calcula el hash MD5 directamente
}

