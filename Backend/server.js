const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./controllers/usuario.js');
const pool = require('./db');
const app = express();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

require('dotenv').config();

// Middleware para analisar dados JSON
app.use(bodyParser.json());

// Configuração do CORS
app.use(cors());

// Importando o módulo util
const util = require('./controllers/util.js');

// Definindo rotas
app.get('/', (req, res) => {
    res.send('Servidor do Projeto Fullstack está rodando!');
});

// Importando o nodemailer
const nodemailer = require('nodemailer');
const user = process.env.EMAIL_USER; 
const pass = process.env.EMAIL_PASS;
const porta = process.env.EMAIL_PORT;

// Configurando o transporte de e-mail
const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: porta, // Usando a variável porta definida no .env
    auth: {
        user: user,
        pass: pass
    }
});

// Rota para enviar dados do formulário e gerar senha
app.post('/usuario/enviar-dados', async (req, res) => {
    console.log('Rota para enviar dados do formulário e gerar senha');
    try {
        // Validação e sanitização dos dados recebidos do formulário
        const { nome, email, comprimentoSenha, letrasMinusculas, letrasMaiusculas, numeros, simbolos } = req.body;

        console.log('Dados recebidos do formulário:', req.body);

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!nome || !email || !comprimentoSenha || (comprimentoSenha < 1 || comprimentoSenha > 20) ||
            (!letrasMinusculas && !letrasMaiusculas && !numeros && !simbolos)) {
            return res.status(400).send('Dados incompletos para o envio da senha.');
        }

        console.log('Validação de dados completada com sucesso.');

        // Implementa a lógica para gerar a senha com base nos critérios especificados
        const senhaGerada = util.gerarSenha(comprimentoSenha, letrasMinusculas, letrasMaiusculas, numeros, simbolos);

        console.log('Senha gerada:', senhaGerada);

        // Criptografa a senha antes de inserir no banco de dados
        const senhaCriptografada = await bcrypt.hash(senhaGerada, 10); // 10 é o número de saltos (salt rounds)

        console.log(senhaCriptografada);

        // Insere os dados e criptografa a senha gerada no banco de dados
        const novoUsuario = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senhaCriptografada]
        );

        console.log('Usuário inserido no banco de dados:', novoUsuario.rows[0]);

        // Envia um e-mail com a senha gerada para o endereço fornecido
        await transporter.sendMail({
            from: user,
            to: email,
            subject: 'Senha Gerada',
            text: `Olá, ${nome},\n\nA senha do seu e-mail é ${senhaGerada}.\n\nAtenciosamente.`
        }).then(info => {
            console.log(`E-mail enviado para ${email}:`, info.response);
        }).catch(error => {
            console.error(`Erro ao enviar e-mail para ${email}:`, error);
        });

        console.log('Email enviado com sucesso.');

        res.status(201).json(novoUsuario.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao enviar os dados.');
    }
});


// Registra as rotas definidas em usuario.js
app.use(usuarioRoutes);

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});