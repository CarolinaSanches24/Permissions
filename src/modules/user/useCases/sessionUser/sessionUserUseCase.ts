import { UseCase, UseCaseError } from '../../../../services/core/useCase';
import { encryption } from '../../../../services/utils/encryption';
import { UserRepo } from '../../repo/userRepo';
import { SessionUserDTO } from './sessionUserDTO';

export class SessionUserUseCase implements UseCase<SessionUserDTO, Promise<void>>{
	private userRepo: UserRepo;

	constructor(userRepo: UserRepo) {
		this.userRepo = userRepo;
	}

	public async execute(request: SessionUserDTO): Promise<void> {

		const user = await this.userRepo.findByEmail(request.email);

        console.log(user);

        if (!user) {
            throw new UseCaseError('User not found', 404);
        }

        const isValidPassword = await encryption.compare(request.password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
		
	}
}
