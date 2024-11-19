const btnGerar = document.getElementById('btnGerar');
const btnCopiar = document.getElementById('btnCopiar');
const inputNickname = document.getElementById('nickname');
const listaHistorico = document.getElementById('listaHistorico');
const notificacao = document.getElementById('notificacao');
const radiosGenero = document.querySelectorAll('input[name="genero"]');

let historico = [];
let ultimoGenero = null;

// Função para mostrar notificações
function mostrarNotificacao(mensagem, cor = "#d9534f") {
    notificacao.style.display = "block";
    notificacao.style.backgroundColor = cor;
    notificacao.textContent = mensagem;
    setTimeout(() => notificacao.style.display = "none", 3000);
}

// Atualizar histórico
function atualizarHistorico() {
    listaHistorico.innerHTML = "";
    historico.slice(-5).forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        listaHistorico.appendChild(li);
    });
}

// Desmarcar rádio no duplo clique
radiosGenero.forEach(radio => {
    radio.addEventListener('click', (event) => {
        if (radio === ultimoGenero) {
            radio.checked = false;
            ultimoGenero = null;
        } else {
            ultimoGenero = radio;
        }
    });
});

// Gerar nickname
btnGerar.addEventListener('click', () => {
    const generoSelecionado = document.querySelector('input[name="genero"]:checked');
    if (!generoSelecionado) {
        mostrarNotificacao("Deve-se selecionar um dos gêneros abaixo.");
        return;
    }

    let nickname = "";
    if (generoSelecionado.value === "masculino") {
        nickname = faker.name.firstName("male");
    } else if (generoSelecionado.value === "feminino") {
        nickname = faker.name.firstName("female");
    } else {
        nickname = faker.internet.userName();
    }

    inputNickname.value = nickname;
    historico.push(nickname);
    atualizarHistorico();
});

// Copiar nickname
btnCopiar.addEventListener('click', () => {
    if (inputNickname.value) {
        navigator.clipboard.writeText(inputNickname.value)
            .then(() => mostrarNotificacao("Nickname copiado!", "#5cb85c"))
            .catch(() => mostrarNotificacao("Erro ao copiar."));
    } else {
        mostrarNotificacao("Nenhum nickname para copiar.");
    }
});

btnGerar.addEventListener('click', () => {
    const generoSelecionado = document.querySelector('input[name="genero"]:checked');
    if (!generoSelecionado) {
        mostrarNotificacao("Deve-se selecionar um dos gêneros abaixo.");
        return;
    }

    let nickname = "";
    if (generoSelecionado.value === "masculino") {
        // Primeiro nome masculino + sobrenome aleatório
        nickname = faker.name.firstName("male") + "_" + faker.random.word();
    } else if (generoSelecionado.value === "feminino") {
        // Primeiro nome feminino + sobrenome aleatório
        nickname = faker.name.firstName("female") + "_" + faker.random.word();
    } else {
        // Nickname neutro gerado diretamente
        nickname = faker.internet.userName();
    }

    inputNickname.value = nickname.toLowerCase(); // Formata em letras minúsculas
    historico.push(nickname);
    atualizarHistorico();
});
