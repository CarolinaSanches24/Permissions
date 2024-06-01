import express from 'express';
import { v1Router } from '../router/v1Router';

const app = express();
app.use(express.json());

app.use('/', v1Router);


// app.post('/test-insert', async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     const result = await userRepo.create(data);
//     res.status(201).send(`Dados inseridos com sucesso! ID: ${result.insertId}`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erro ao inserir dados');
//   }
// });

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});