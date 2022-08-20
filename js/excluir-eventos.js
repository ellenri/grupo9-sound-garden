const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events/';

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

const buttonExcluir = document.querySelector(".excluirforever")
buttonExcluir.addEventListener("click", (evento) => {
    evento.preventDefault()
    deletarParaSempre()
})

const deletarParaSempre = () => {
    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      

      fetch(`${SOUND_URL}${findID()}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            alert("Evento excluído!")
            setTimeout(() => {
                window.open('./admin.html','_SELF')
            }, 2000);
        
        })
        .catch(error => console.log('error', error));


}