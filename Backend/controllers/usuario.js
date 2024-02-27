const express = require('express');
const router = express.Router();
const pool = require('../db');
const { gerarSenha } = require('./util');
const bcrypt = require('bcrypt');

// Função para verificar se o email é válido
function isValidEmail(email) {
    // Expressão regular para validar o email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Rota para recuperar todos os usuários cadastrados
router.get('/usuarios', async (req, res) => {
    try {
        // Consulta para recuperar todos os usuários do banco de dados
        const usuarios = await pool.query('SELECT * FROM usuarios');

        res.json(usuarios.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao recuperar os usuários.');
    }
});

// Rota para enviar dados do formulário e gerar senha
router.post('/usuario/enviar-dados', async (req, res) => {
    console.log('Rota /enviar-dados acionada');
    try {
        // Validação e sanitização dos dados recebidos do formulário
        const { nome, email, comprimentoSenha, letrasMinusculas, letrasMaiusculas, numeros, simbolos } = req.body;
        
        // Verifica se o email é válido
        if (!isValidEmail(email)) {
            return res.status(400).send('Email inválido.');
        }

        // Verifica se o comprimento da senha é válido
        if (comprimentoSenha < 1 || comprimentoSenha > 20) {
            return res.status(400).send('Comprimento da senha inválido.');
        }

        // Lógica para gerar a senha com base nos critérios especificados
        const senhaGerada = gerarSenha(comprimentoSenha, letrasMinusculas, letrasMaiusculas, numeros, simbolos);

        // Verificar se a senha foi gerada corretamente
        console.log('Senha gerada:', senhaGerada);

        // Criptografa a senha antes de inserir no banco de dados
        const senhaCriptografada = await bcrypt.hash(senhaGerada, 10); // 10 é o número de saltos (salt rounds)

        console.log(senhaCriptografada);

        // Insere os dados e a senha criptografada no banco de dados
        const novoUsuario = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senhaCriptografada]
        );

        res.status(201).json(novoUsuario.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao enviar os dados.');
    }
});

// Rota para atualizar um usuário existente
router.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        // Criptografa a nova senha antes de atualizar no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Atualiza o usuário com o ID fornecido
        await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4',
            [nome, email, senhaCriptografada, id]
        );

        res.json({ message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao atualizar o usuário.');
    }
});


// Rota para deletar um usuário existente
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Deleta o usuário com o ID fornecido
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

        res.json({ message: 'Usuário deletado com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro ao deletar o usuário.');
    }
});

module.exports = router;
