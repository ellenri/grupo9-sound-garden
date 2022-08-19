const findID = () => {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    return id;
}

const inputNome = document.getElementById("nome");
const inputAtracoes = document.getElementById("atracoes");
const inputDescricao = document.getElementById("descricao");
const inputData = document.getElementById("data");
const inputLotacao = document.getElementById("lotacao");
const inputBanner = document.getElementById("banner");

const exibirDetalhesEvento = async () => {
    const dadosEvento =
        await fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + findID(), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json());

    console.log(dadosEvento);



    inputNome.value = dadosEvento.name;
    inputAtracoes.value = dadosEvento.attractions.join(', ');
    inputBanner.value = dadosEvento.poster;
    inputDescricao.value = dadosEvento.description;
    inputData.value = dadosEvento.scheduled;
    inputLotacao.value = dadosEvento.number_tickets;
}

exibirDetalhesEvento();

const buttonSubmit = document.querySelector("button.submit")
const atualizarEvento = () => {
    console.log("ola")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "name": inputNome.value,
        "poster": inputBanner.value,
        "attractions": inputAtracoes.value.split(', '),
        "description" : inputDescricao.value,
        "scheduled" : new Date(inputData.value).toISOString(),
                "number_tickets" : parseInt(inputLotacao.value),

    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + findID(), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
buttonSubmit.addEventListener("click", (evento) => {
    evento.preventDefault()
    atualizarEvento()

})
