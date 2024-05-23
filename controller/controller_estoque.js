// importar a função async connect feito na conexão

import connect from "../config/connection.js"

// cria a variável itens que irá receber um valor do usuário.

let itens = {}

// cria a constante esperar que irá esperar a função connect rodar.

const esperar = await connect()

// função selecionar itens da table

itens.all = async function(req, res) {

    try {

        let selecionar = await esperar.query("SELECT * FROM produto")
        res.send(selecionar[0])

    } catch(e) {
        
        console.log("Erro em: ", e)

    }
}

// função inserir itens na table produto.

itens.create = async function(req, res) {
    try {
        // pegar valor inserido pelo usuario.
        let criarItem = req.body
        // deixar pronto o que será injetado.
        let sql = "INSERT INTO produto (nome_produto, preco_produto) values (?,?);"
        // trocar o valor de (?,?).
        let values = [criarItem.nome_produto, criarItem.preco_produto]
        // injetar no banco o que foi escrito na variavel sql com os valores do usuário.
        let resultado = await esperar.query(sql, values)
        res.send({
            status: "Inserção efetuada com sucesso.",
            result: resultado
        })
        
    } catch (e) {
        console.log(`Erro ${e} ao realizar inserção.`)
    }
}

// criar função para atualizar o banco de dados

itens.update = async function(req, res) {

    try {

        // cria a var nomeProduto, que recebe a key do item
        // que irá ser alterado.

        let codigo = req.params.cod_produto

        // pego o valor inserido pelo usuario

        let atualizaritens = req.body

        // código a ser injetado no banco.
        // where cod_produto fará com que altere o item correto.

        let sql = "UPDATE produto SET nome_produto=?, preco_produto=? WHERE cod_produto=?;"
        let values = [atualizaritens.nome_produto, atualizaritens.preco_produto, codigo]

        let resultado = await esperar.query(sql, values)

        res.send({
            status: "Atualização de " + atualizaritens.nome_produto + "realizada com sucesso.",
            result: resultado
        })
        
    } catch (e) {
        
        console.log(`Erro ao atualizar ${atualizaritens.nomeProduto}, erro: ${e}`)

    }

}

// criar a função delete

itens.delete = async function(req, res) {

    try {
    
        let apagar = req.params.cod_produto

        let sql = "DELETE FROM produto WHERE cod_produto=?;"
        let resultado = await esperar.query(sql, [apagar])
        
        res.send({
            status: "Delete de produto " + itens.nome_produto + "foi efetuado",
            result: resultado
        })
        
    } catch (e) {

        console.log(`Falha ao apagar ${nome_produto}. Erro: ${e}`)
        
    }

}

export {itens}

itens.findByPrice = async function(req, res) {

    try {
        
        // recebe o preço do produto à ser buscado
        let preco = req.params.preco_produto

        // SQL com base na coluna preco_produto
        let sql = "SELECT * FROM produto WHERE preco_produto=?;"
        let values = [preco]

        // executa a busca no banco
        let [rows] = await esperar.query(sql, values)

        // encurtamento de let result... + let rows = result[0]

        res.send({
            status: "Busca realizada com sucesso.",
            result: rows
        })

    } catch (e) {
        console.log(`Erro ao buscar produtos pelo preco ${preco}, erro: ${e}`)
               
    }
}