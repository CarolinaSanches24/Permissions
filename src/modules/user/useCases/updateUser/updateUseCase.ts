import { UseCase } from '../../../../services/core/useCase';
import { encryption } from '../../../../services/utils/encryption';
import { UserRepo } from '../../repo/userRepo';
import { UpdateUserDTO } from './updateUserDTO';

export class UpdateUserUseCase implements UseCase<UpdateUserDTO, Promise<void>>{
	private userRepo: UserRepo;

	constructor(userRepo: UserRepo) {
		this.userRepo = userRepo;
	}

	public async execute(request: UpdateUserDTO): Promise<void> {

		await this.userRepo.update(request.id, {
			phone: request.phone,
			email: request.email,
			password: await encryption.encrypt(request.password),
		});
		
	}
}
