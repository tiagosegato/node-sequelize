const express = require('express');
const app = express();
const PORT = 3001; // Usando uma porta diferente para não conflitar com o outro projeto

// Importa o Model Estudante que o Sequelize criou
// O arquivo models/index.js gerado pelo Sequelize já faz toda a mágica de conexão
const { Estudante } = require('./models');

// Middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

//Implementando o CRUD com Sequelize:
//[READ] Listar todos os estudantes (GET /estudantes)
app.get('/estudantes', async (req, res) => {
    try {
        const estudantes = await Estudante.findAll();
        res.status(200).json(estudantes);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar estudantes.' });
    }
});

//[READ] Buscar um estudante por ID (GET /estudantes/:id)
app.get('/estudantes/:id', async (req, res) => {
    try {
        const estudante = await Estudante.findByPk(req.params.id); // findByPk = Find by Primary Key
        if (!estudante) {
            return res.status(404).json({ mensagem: 'Estudante não encontrado.' });
        }
        res.status(200).json(estudante);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar estudante.' });
    }
});

// [CREATE] Criar um novo estudante (POST /estudantes)
app.post('/estudantes', async (req, res) => {
    try {
        const novoEstudante = await Estudante.create(req.body);
        res.status(201).json(novoEstudante);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar estudante.', erro: error.message });
    }
});

//[UPDATE] Atualizar um estudante (PUT /estudantes/:id)
app.put('/estudantes/:id', async (req, res) => {
    try {
        const estudante = await Estudante.findByPk(req.params.id);
        if (!estudante) {
            return res.status(404).json({ mensagem: 'Estudante não encontrado.' });
        }
        await estudante.update(req.body);
        res.status(200).json(estudante);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar estudante.', erro: error.message });
    }
});

//[DELETE] Deletar um estudante (DELETE /estudantes/:id)
app.delete('/estudantes/:id', async (req, res) => {
    try {
        const estudante = await Estudante.findByPk(req.params.id);
        if (!estudante) {
            return res.status(404).json({ mensagem: 'Estudante não encontrado.' });
        }
        await estudante.destroy();
        res.status(204).send(); // 204: No Content
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar estudante.' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});