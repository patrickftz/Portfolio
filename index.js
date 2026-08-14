require('dotenv').config();
const express = require("express");         // Importa a biblioteca do Express pro meu projeto
const app = express();      // Instância para aplicação do Express (execução)
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));      // Permite que o Express acesse todos os arquivos da pasta PUBLIC, onde está HTML, CSS, JS...

const transporter = nodemailer.createTransport ({
    service: "gmail",
    auth: {
        user: process.env.email_user,
        pass: process.env.email_pass
    }
})

app.post('/contato', async (req, res) => {

    const { name, email, message } = req.body;

    console.log(req.body);

    try {
        await transporter.sendMail({
            from: email,
            to: "patrickfeitoza1@gmail.com",
            subject: `Nova mensagem de ${name}`,
            text: 
`
Nome: ${name}
Email: ${email}
Mensagem:
${message}
`
        });

        res.json({
            mensagem: "Email enviado com sucesso!"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensagem: "Erro ao enviar email"
        });
    }
});

const PORT = process.env.PORT || 3000;      // Define variável PORT | o (process.env.PORT) define a porta automaticamente quando fizer deploy | 3000 = fallback local (É um valor de reserva, usado quando o principal não existe)
app.listen(PORT, () =>{         // Roda o servidor na porta já selecionada pelo deploy e inicia uma outra função: () =>{    o console.log
    console.log(`Rodando em http://localhost:${PORT}`);
})
 /*
 app.post('/contato', (req, res) =>{         // Cria uma rota na página principal representada pela "/" - http://localhost:3000/
    res.sendFile(__dirname + '/public/index.html');         // res.sendFile - Envia o arquivo entre parênteses como resposta ao cliente (navegador) | __dirname = variável que mostra caminho do arqivo
})
 */