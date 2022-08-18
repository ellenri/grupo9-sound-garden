const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events';

const listarEventos = async () => {

    const res =  await fetch(SOUND_URL, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const eventos = await res.json()
  
    console.log(eventos);

    const tbody = document.querySelector('.lista-eventos tbody');

    let htmlEventos = "";

    eventos.forEach(evento => {
        htmlEventos += `
            <tr>
                <th scope="row">#</th>
                <td>${evento.scheduled}</td>
                <td>${evento.name}</td>
                <td>${evento.attractions.join(', ')}</td>
                <td>
                  <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
                  <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
                  <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
                </td>
              </tr>
        `;
    });
    console.log(htmlEventos)

    tbody.innerHTML = htmlEventos;


}

listarEventos()








