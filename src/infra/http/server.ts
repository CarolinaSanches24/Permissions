import express, { Request, Response } from 'express';
import { BaseRepo } from '../../services/core/baseRepo';
import { userSchema } from '../db/schemas/user/userSchema';

const app = express();
app.use(express.json());

class UserRepo extends BaseRepo{
  constructor() {
    super(userSchema);
  }

  public async create(data: object): Promise<any> {
    return super.create(data);
  }
}

const userRepo = new UserRepo();

app.post('/test-insert', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await userRepo.create(data);
    res.status(201).send(`Dados inseridos com sucesso! ID: ${result.insertId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao inserir dados');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});