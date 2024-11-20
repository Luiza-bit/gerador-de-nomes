faker.locale = "pt_BR"; // Configura o faker para a cultura brasileira

const btnGerar = document.getElementById('btnGerar');
const btnCopiar = document.getElementById('btnCopiar');
const inputNickname = document.getElementById('nickname');
const listaHistorico = document.getElementById('listaHistorico');
const notificacao = document.getElementById('notificacao');

let historico = [];

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

// Função para gerar uma palavra única (sem espaços)
function gerarPalavraUnica() {
    return faker.random.word().replace(/\s+/g, "_"); // Substitui espaços por underscores
}

// Gerar nickname
btnGerar.addEventListener('click', () => {
    // Gerar nickname composto por um username e uma palavra única
    const nickname = faker.internet.userName();

    inputNickname.value = nickname.toLowerCase(); // Formata em letras minúsculas
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

// Deletar nickname ao pressionar Delete ou Backspace
document.addEventListener('keydown', (event) => {
    if ((event.key === "Delete" || event.key === "Backspace") && historico.length > 0) {
        const removido = historico.pop(); // Remove o último nickname do histórico
        atualizarHistorico(); // Atualiza a lista de histórico
        inputNickname.value = ""; // Limpa o campo de input
        mostrarNotificacao(`Nickname "${removido}" foi deletado.`, "#d9534f"); // Mostra notificação
    }
});
