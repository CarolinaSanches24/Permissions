import {v4} from 'uuid';
import { UseCase } from '../../../../services/core/useCase';
import { encryption } from '../../../../services/utils/encryption';

import { CreateUserDTO, CreateUserResponseDTO } from './createUserDTO';
import { UserRepo } from '../../repo/userRepo';

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<CreateUserResponseDTO>>{
	private userRepo: UserRepo;

	constructor(userRepo: UserRepo) {
		this.userRepo = userRepo;
	}

	public async execute(request: CreateUserDTO): Promise<CreateUserResponseDTO> {

		const res = await this.userRepo.insert({
			pid:v4(),
			phone: request.phone,
			email: request.email,
			password: await encryption.encrypt(request.password),
			roleId:request.roleId?request.roleId:1
		});

		return {
			id:res.id,
			pid:res.pid
		}
		
	}
}
