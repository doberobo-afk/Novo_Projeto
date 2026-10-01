//Crie uma variável e guarde um array vazio nela;
let listaTarefas = [];
//Crie uma função para renderizar a tela;
function renderizarLista() {
  //Crie uma Variável, vá no documento html, pegue o id da "ul" e guarde;
  let ulLista = document.getElementById("listaTarefas");
  //Limpe a lista;
  ulLista.innerHTML = "";
  //Para cada tarefa do Array:
  listaTarefas.forEach((tarefa, i) => {
    //Crie uma variável, no documento crie um elemento "li" e guarde;
    let li = document.createElement("li");
    //Crie uma variável, no documento crie um elemento 'span' e guarde;
    const span = document.createElement("span");
    //Insira o conteúdo de texto de tarefa na variável 'span';
    span.textContent = tarefa;
    //Atribua um estilo flex de css ao 'span';
    span.style.flex = "1";
    //Atribua um alinhamento de texto à esquerda ao 'span';
    span.style.textAlign = "left";
    //Crie um elemento filho 'span' em 'li';
    li.appendChild(span);
    //Crie um elemento filho 'li' em 'ul';
    ulLista.appendChild(li);

    //Crie uma variável, no documento crie um elemento 'div' e guarde nela;
    const divBotoes = document.createElement("div");
    //Atribua um display à variável;
    divBotoes.style.display = "flex";
    //Atribua um gap à variável;
    divBotoes.style.gap = "5px";
    //Crie um elemento filho contendo a variável em 'li';
    li.appendChild(divBotoes);

    //Crie uma variável, no documento crie um elemento 'button' e guarde nela;
    const botaoExcluir = document.createElement("button");
    //Insira o conteúdo de texto 'Ecluir' no botão;
    botaoExcluir.textContent = "Excluir";
    //Insira uma classe na variável;
    botaoExcluir.className = "excluirItem";
    //Crie um elemento filho 'botaoExcluir' em 'li';
    li.appendChild(botaoExcluir);
    //Ao clicar chame a função 'excluirItem';
    botaoExcluir.onclick = () => excluirItem(i);

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.className = "editarItem";
    li.appendChild(botaoEditar);
    botaoEditar.onclick = () => editarItem(i);

    divBotoes.appendChild(botaoEditar);
    divBotoes.appendChild(botaoExcluir);
  });
}

window.addEventListener("load", () => {
  const dados = localStorage.getItem("listaTarefas");
  if (dados) {
    try {
      const lista = JSON.parse(dados);

      if (Array.isArray(lista)) {
        listaTarefas = lista;
      } else {
        listaTarefas = [];
        localStorage.removeItem("listaTarefas");
      }
    } catch (e) {
      listaTarefas = [];
      localStorage.removeItem("listaTarefas");
    }
  }
  renderizarLista();
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
});

function cadastrar() {
  const input = document.getElementById("tarefa").value.trim();
  const mensagem = document.getElementById("mensagem");

  if (input === "") {
    mensagem.textContent = "Digite uma tarefa!";
    mensagem.style.color = "red";
    document.getElementById("tarefa").value = "";
    return;
  } else {
    mensagem.textContent = "Tarefa adicionada com sucesso";
    mensagem.style.color = "green";
  }

  listaTarefas.push(input);

  renderizarLista();

  salvar();
  document.getElementById("tarefa").value = "";
}

function excluirItem(index) {
  listaTarefas.splice(index, 1);
  renderizarLista();
  salvar();
}

function editarItem(index) {
  const itemEditado = prompt("Digite a tarefa: ", listaTarefas[index]);
  if (itemEditado && itemEditado.trim() !== "") {
    listaTarefas[index] = itemEditado.trim();
    renderizarLista();
    salvar();
  }
}

function excluirLista() {
  listaTarefas = [];
  renderizarLista();
  localStorage.removeItem("listaTarefas");
  salvar();
}

function salvar() {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}
