// index.js
import express from 'express';
import cors from 'cors';
import axios from "axios";
import * as cheerio from 'cheerio'

const app = express();
const PORT = process.env.PORT || 8081;
// Middleware
app.use(express.json());
app.use(cors());


app.post('/index', (req, resp) => {
    const { CodigoInputValue } = req.body;


    axios.get(`https://www.kabum.com.br/produto/${CodigoInputValue}/`)
        .then((resposta) => {

            const $ = cheerio.load(resposta.data)
            const imageProduto = $('.selectedImage img').attr('src');
            const nomeProduto = $('.brTtKt').text().trim()
            const valorProduto = $('.finalPrice').text().trim()
            const codigoProduto = $('.hezezy').text().trim()
            const lojaProduto = $('.YqEBe b:first').text().trim()

            resp.json({
                status:true,
                mensagem1: "Preview carregada",
                imageProduto: imageProduto,
                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                codigoProduto: codigoProduto,
                lojaProduto: lojaProduto

            })

        })
        .catch((error) => {

            resp.json({
                status:false,
                mensagem: 'Houve um problema no codigo do produto não deu para fazer requisição da preview',
                mensagem2: error.message,
                mensagem3: `O codigo do produto: ${CodigoInputValue}`
            })
        })




})


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
