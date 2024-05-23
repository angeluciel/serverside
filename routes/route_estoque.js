import express from "express"
import {itens} from "../controller/controller_estoque.js"

let router = express.Router()
router.get('/produto', itens.all)
router.post('/produto', itens.create)
router.put('/produto/:cod_produto', itens.update)
router.delete('/produto/:cod_produto', itens.delete)
router.get('/produto/preco/:preco_produto', itens.findByPrice)

export {router}