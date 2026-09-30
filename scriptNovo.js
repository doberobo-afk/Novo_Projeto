let listaTarefas = [];

function renderizarLista() {
  let ulLista = document.getElementById("listaTarefas");
  ulLista.innerHTML = "";

  listaTarefas.forEach((tarefa, i) => {
    let li = document.createElement("li");
    li.textContent = tarefa;
    ulLista.appendChild(li);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    li.appendChild(botaoExcluir);
    botaoExcluir.onclick = () => excluirItem(i);

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    li.appendChild(botaoEditar);
    botaoEditar.onclick = () => editarItem(i);
  });
}

window.addEventListener("load", () => {
  const lista = JSON.parse(localStorage.getItem("listaTarefas"));
  if (lista) {
    listaTarefas = lista;
    renderizarLista();
  }
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
  localStorage.removeItem(listaTarefas);
  salvar();
}

function salvar() {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}
