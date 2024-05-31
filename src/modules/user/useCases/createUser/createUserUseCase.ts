import {v4} from 'uuid';
import { UseCase } from '../../../../services/core/useCase';
import { encryption } from '../../../../services/utils/encryption';
import { UserRepo } from '../../repo/userRepo';
import { CreateUserDTO } from './createUserDTO';

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<void>> {
	private userRepo: UserRepo;

	constructor(userRepo: UserRepo) {
		this.userRepo = userRepo;
	}

	public async execute(request: CreateUserDTO): Promise<void> {
		const pid = v4();

		const res = await this.userRepo.insert({
			pid,
			phone: request.phone,
			email: request.email,
			password: await encryption.encrypt(request.password),
		});

		// return {
		// 	id: res.returnValue.insertId,
		// 	pid,
		// };
	}
}
