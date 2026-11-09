var nomesProdutos = [];
var precosProdutos = [];
var totaisVendas = [];


// Cadastrar produto
function cadastrarProduto() {

    var nomeInformado = prompt("Digite o nome do produto:");

    if (nomeInformado === null) {
        return;
    }

    var nome = nomeInformado.trim();

    if (nome === "") {
        alert("O nome do produto não pode ficar vazio.");
        return;
    }

    // Verifica se já existe um produto com o mesmo nome.
    for (var i = 0; i < nomesProdutos.length; i++) {
        //Para evitar nomes iguais de serem cadastrado 
        if (nomesProdutos[i].toLowerCase() === nome.toLowerCase()) { //compara o tipo de dado também (===)
            alert("Esse produto já está cadastrado.");
            return;
        }
    }

    var precoInformado = prompt("Digite o preço do produto:");

    if (precoInformado === null) {
        return;
    }

    var preco = Number(precoInformado.trim().replace(",", ".")); //substituir "," por ".", caso digitem com virgula
    
    // Não aceita entrada que não seja numero finito e menor ou = a 0.
    if (!Number.isFinite(preco) || preco <= 0) {  
        alert("O preço deve ser um número maior que zero.");
        return;
    }
    nomesProdutos.push(nome);
    precosProdutos.push(preco);

    alert("Produto cadastrado com sucesso!");
}


// Listar produtos
function listarProdutos() {

    if (nomesProdutos.length === 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    var mensagem = "PRODUTOS CADASTRADOS\n\n";

    for (var i = 0; i < nomesProdutos.length; i++) {

        mensagem += "Código: " + (i + 1) +
            " | Produto: " + nomesProdutos[i] +
            " | Preço: R$ " + precosProdutos[i].toFixed(2) + "\n";
    }

    alert(mensagem);
}


// Calcular subtotal da venda
function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}


// Calcular desconto de 10% 
function calcularDesconto(total) {

    if (total > 50) {
        return total * 0.10;
    }

    return 0;
}


// Exibir resumo da venda
function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {

    var totalFinal = subtotal - desconto;

    var mensagem =
        "RESUMO DA VENDA\n\n" +
        "Produto: " + nome + "\n" +
        "Preço unitário: R$ " + preco.toFixed(2) + "\n" +
        "Quantidade: " + quantidade + "\n" +
        "Subtotal: R$ " + subtotal.toFixed(2) + "\n" +
        "Desconto: R$ " + desconto.toFixed(2) + "\n" +
        "Total a pagar: R$ " + totalFinal.toFixed(2);

    alert(mensagem);
}


// Obter total de vendas do dia
function obterTotalVendasDia() {

    var total = 0;

    for (var i = 0; i < totaisVendas.length; i++) {

        total += totaisVendas[i];
    }

    return total;
}


// Exibir total de vendas do dia
function exibirTotalVendasDia() {

    if (totaisVendas.length === 0) {
        alert("Não existem vendas registradas.");
        return;
    }

    var total = obterTotalVendasDia();

    alert(
        "TOTAL DE VENDAS DO DIA\n\n" +
        "Quantidade de vendas: " + totaisVendas.length + "\n" +
        "Valor total vendido: R$ " + total.toFixed(2)
    );
}

// Realizar venda
function realizarVenda() {

    if (nomesProdutos.length === 0) {
        alert("Cadastre um produto antes de realizar uma venda.");
        return;
    }

    listarProdutos();

    var codigoInformado = prompt("Digite o código do produto:");

    if (codigoInformado === null) {
        return;
    }

    var codigo = Number(codigoInformado);

    // O codigo deve ser um numero e inteiro, também deve ser menor que o vetor
    if (!Number.isInteger(codigo) || codigo < 1 || codigo > nomesProdutos.length) {
        alert("Código de produto inválido.");
        return;
    }
    var quantidadeInformada = prompt("Digite a quantidade desejada:");

    if (quantidadeInformada === null) {
        return;
    }

    var quantidade = Number(quantidadeInformada);

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("A quantidade deve ser um número inteiro maior que zero.");
        return;
    }

    var indice = codigo - 1;

    var nome = nomesProdutos[indice];
    var preco = precosProdutos[indice];
    var subtotal = calcularTotalVenda(preco, quantidade);
    var desconto = calcularDesconto(subtotal);
    var totalFinal = subtotal - desconto;

    var confirmarVenda = confirm("Confirma a venda de "+quantidade+" unidade(s) de "+
        nome+" por R$ "+totalFinal.toFixed(2)+"?");

    if (confirmarVenda) {
        // Registra somente vendas confirmadas.
        totaisVendas.push(totalFinal);
        exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);
    } 
    else {
        alert("Venda cancelada.");
    }
}

// Exibir menu
function exibirMenu() {
    return prompt(
        "SISTEMA DE LANCHONETE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Realizar venda\n" +
        "4 - Consultar total de vendas do dia\n" +
        "5 - Encerrar sistema\n" +
        "\nEscolha uma opção:"
    );
}

//Essa função chama o restante e é chamada com o botão id iniciar do html
function controlarMenu() {
    var continuar = true;

    while (continuar) {
        var opcao = exibirMenu();

        if (opcao === null) {
            continuar = false;

        } 

        else {
            switch (opcao.trim()) {
                case "1":
                    cadastrarProduto();
                    break;

                case "2":
                    listarProdutos();
                    break;

                case "3":
                    realizarVenda();
                    break;

                case "4":
                    exibirTotalVendasDia();
                    break;

                case "5":
                    continuar = false;
                    break;

                default:
                    alert("Opção inválida. Escolha uma opção de 1 a 5.");
            }
        }
    }

    alert("Sistema encerrado.");
}

//Esse trecho a seguir é responsável por iniciar o sistema ao clicar o botão iniciar.
document.getElementById("iniciar").addEventListener("click", controlarMenu);
