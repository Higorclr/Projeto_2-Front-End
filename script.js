const conteudoDiv = document.getElementById('conteudo');

let numeroSecretoGlobal = 0;
let tentativasGlobal = 0;
let frutas = [];

/**
 * EXEMPLO 1: JOGO DE ADIVINHAÇÃO
 */
function carregarExemplo1() {
  numeroSecretoGlobal = Math.floor(Math.random() * 10) + 1;
  tentativasGlobal = 0;
  console.log("Número Secreto (para testes):", numeroSecretoGlobal);

  conteudoDiv.innerHTML = `
    <h2>Jogo de Adivinhação de Número</h2>
    <p>Adivinhe o número que estou pensando, entre 1 e 10.</p>
    <input type="number" id="chuteInput" placeholder="Seu palpite">
    <button id="btnVerificar" onclick="verificarChute()">Verificar</button>
    <p id="resultadoJogo"></p>
  `;
}

function verificarChute() {
  const chuteInput = document.getElementById('chuteInput');
  const chute = parseInt(chuteInput.value);
  const resultadoP = document.getElementById('resultadoJogo');
  
  if (isNaN(chute) || chute < 1 || chute > 10) {
    resultadoP.textContent = "Por favor, digite um número válido entre 1 e 10.";
    resultadoP.style.color = "var(--cor-aviso)";
    return;
  }
  
  tentativasGlobal++;

  if (chute === numeroSecretoGlobal) {
    resultadoP.textContent = `Parabéns! Você acertou o número ${numeroSecretoGlobal} em ${tentativasGlobal} tentativa(s).`;
    resultadoP.style.color = "var(--cor-sucesso)";
    chuteInput.disabled = true;
  } else if (chute > numeroSecretoGlobal) {
    resultadoP.textContent = `O número secreto é MENOR que ${chute}. Tente novamente.`;
    resultadoP.style.color = "var(--cor-erro)";
  } else {
    resultadoP.textContent = `O número secreto é MAIOR que ${chute}. Tente novamente.`;
    resultadoP.style.color = "var(--cor-erro)";
  }
}

/**
 * EXEMPLO 2: FORMULÁRIO PARA TXT
 */
function carregarExemplo2() {
  conteudoDiv.innerHTML = `
    <h2>Formulário com Exportação para .TXT</h2>
    <form id="formularioTXT">
      <fieldset>
        <legend>Dados para Exportação</legend>
        <label for="valor1">Valor 1:</label>
        <input type="text" id="valor1" required>
        <label for="valor2">Valor 2:</label>
        <input type="text" id="valor2" required>
        <label for="valor3">Valor 3:</label>
        <input type="text" id="valor3" required>
        <label for="valor4">Valor 4:</label>
        <input type="text" id="valor4" required>
        <label for="valor5">Valor 5:</label>
        <input type="text" id="valor5" required>
      </fieldset>
      <button type="submit" id="btnSalvarTxt">Salvar em TXT</button>
    </form>
  `;

  document.getElementById("formularioTXT").addEventListener("submit", function (e) {
    e.preventDefault();
    const valores = [];
    for (let i = 1; i <= 5; i++) {
      const valor = document.getElementById(`valor${i}`).value.trim();
      if (valor === "") {
        alert(`O campo Valor ${i} está vazio.`);
        return;
      }
      valores.push(valor);
    }
    const conteudo = valores.map((v, i) => `Valor ${i + 1}: ${v}`).join("\n");
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "valores.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

/**
 * EXEMPLO 3: MÉTODOS DE ARRAY (FRUTAS)
 */
function carregarExemplo3() {
  frutas = ['maçã', 'banana'];
  conteudoDiv.innerHTML = `
    <h2>Manipulando Frutas (Arrays)</h2>
    <div>
        <input type="text" id="frutaInput" placeholder="Digite uma fruta" />
        <button id="btnAdicionarFruta" onclick="adicionarFruta()">Adicionar</button>
    </div>
    <h3>Frutas Atuais:</h3>
    <div id="listaFrutas" class="display-array"></div>
    <h3>Métodos:</h3>
    <div id="botoes-metodos" class="botoes-navegacao">
      <button onclick="metodo('push')">Push</button>
      <button onclick="metodo('pop')">Pop</button>
      <button onclick="metodo('shift')">Shift</button>
      <button onclick="metodo('unshift')">Unshift</button>
      <button onclick="verificarBanana()">Includes('banana')</button>
      <button onclick="mostrarJoin()">Join</button>
      <button onclick="mapMaiusculas()">Map (Maiúsculas)</button>
      <button onclick="filtrarGrandes()">Filter (nome > 4 letras)</button>
    </div>
    <h3>Saída do Método:</h3>
    <pre id="saida" class="display-array"></pre>
  `;
  atualizarListaFrutas();
}

function atualizarListaFrutas() {
  document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
}

function adicionarFruta() {
  const input = document.getElementById('frutaInput');
  if (input.value.trim()) {
    frutas.push(input.value.trim());
    input.value = "";
    atualizarListaFrutas();
  }
}

function metodo(acao) {
  let fruta;
  if (acao === 'push') {
    fruta = prompt("Digite uma fruta para adicionar no final:");
    if (fruta) frutas.push(fruta);
  } else if (acao === 'pop') {
    fruta = frutas.pop();
    alert(`Fruta removida do final: ${fruta || 'nenhuma'}`);
  } else if (acao === 'shift') {
    fruta = frutas.shift();
    alert(`Fruta removida do início: ${fruta || 'nenhuma'}`);
  } else if (acao === 'unshift') {
    fruta = prompt("Digite uma fruta para adicionar no início:");
    if (fruta) frutas.unshift(fruta);
  }
  atualizarListaFrutas();
  document.getElementById('saida').textContent = ''; // Limpa a saída após ações com alert
}

function verificarBanana() {
  const resultado = frutas.includes('banana') ? "🍌 Sim, 'banana' está na lista!" : "🚫 Não, 'banana' não está na lista.";
  document.getElementById('saida').textContent = resultado;
}

function mostrarJoin() {
  document.getElementById('saida').textContent = "join(', '): " + frutas.join(', ');
}

function mapMaiusculas() {
  const maiusculas = frutas.map(f => f.toUpperCase());
  document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
}

function filtrarGrandes() {
  const grandes = frutas.filter(f => f.length > 4);
  document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
}