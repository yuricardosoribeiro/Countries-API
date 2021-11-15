// quando window é carregada, a função carregaListaPaises é executada
window.onload = carregaListaPaises;

// arrayPaises vai receber o nome de todos os países da API para ser carregado no datalist e auxiliar na pesquisa
const arrayPaises = [];
// arrayTodos vai receber as informações de todos os países da API
let arrayTodos;

// aqui pegamos o evento de click
document.addEventListener('click', (e) => {
    const elemento = e.target;

    // se o elemento tiver a classe 'pesquisar', executamos a função pesquisar()
    if(elemento.classList.contains('pesquisar')) {
        pesquisar();
    }
})

// carregaListaPaises() pega os dados da API quando a página é carregada, preenchendo arrayPaises e arrayTodos
// Depois de fazer tudo isso, executa a função carregaDatalist()
function carregaListaPaises() {
    fetch("https://restcountries.com/v2/all")
    .then(res => res.json())
    .then(body => {
        arrayTodos = body;

        for(let i = 0; i < body.length; i++) {
            arrayPaises.push(body[i].name);
        }
    })
    .then(() => {
        carregaDatalist();
    })
}

// a função carregaDatalist() pega o elemento HTML datalist, cria options preenchidos com o nome dos páises e dá um appendChild neles
function carregaDatalist() {
    const datalist = document.querySelector('#paises');

    for(let i = 0; i < arrayPaises.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', arrayPaises[i]);
        datalist.appendChild(option);
    }
}

// a função pesquisar() é executada quando clicamos no botão de pesquisa
// ela pega o que foi digitado no input e compara com as informações contidas no arrayTodos, para carregar as informações na tela do usuário
function pesquisar() {
    const input = document.querySelector('.search');
    if(arrayPaises.indexOf(input.value) === -1) return;

    const imagem = document.querySelector('.imagem');
    const nome = document.querySelector('.nome');
    const nativeName = document.querySelector('.nativeName');
    const capital = document.querySelector('.capital');
    const region = document.querySelector('.region');
    const population = document.querySelector('.population');
    const languages = document.querySelector('.languages');

    for(let i = 0; i < arrayTodos.length; i++) {
        if(input.value === arrayTodos[i].name) {
            imagem.setAttribute('src', arrayTodos[i].flags.svg);
            imagem.removeAttribute('hidden');

            nome.innerText = `${arrayTodos[i].name}`;
            nativeName.innerHTML = `<b>Native Name</b> <div>${arrayTodos[i].nativeName}<div>`;
            capital.innerHTML = `<b>Capital</b> <div>${arrayTodos[i].capital}</div>`;
            region.innerHTML = `<b>Region</b> <div>${arrayTodos[i].region}</div>`;
            population.innerHTML = `<b>Population</b> <div>${(arrayTodos[i].population).toLocaleString('pt-BR')}</div>`;

            const languagesCountry = [];
            for(let j = 0; j < arrayTodos[i].languages.length; j++) {
                languagesCountry.push(arrayTodos[i].languages[j].name);
            }
            languages.innerHTML = `<b>Languages</b> <div>${languagesCountry.join(', ')}</div>`;

            return;
        }
    }
}
