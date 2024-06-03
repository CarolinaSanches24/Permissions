import { UseCase, UseCaseError } from '../../../../services/core/useCase';
import { encryption } from '../../../../services/utils/encryption';
import { env } from '../../../../utils/env';
import { UserRepo } from '../../repo/userRepo';
import { SessionUserDTO,  SessionUserResponseDTO } from './sessionUserDTO';
import { sign } from 'jsonwebtoken';

export class SessionUserUseCase implements UseCase<SessionUserDTO, Promise<SessionUserResponseDTO> >{
	private userRepo: UserRepo;

	constructor(userRepo: UserRepo) {
		this.userRepo = userRepo;
	}

	public async execute(request: SessionUserDTO): Promise<SessionUserResponseDTO> {

		const user = await this.userRepo.findByEmail(request.email);

        if (!user) throw new UseCaseError('User not found', 404);

        const isValidPassword = await encryption.compare(request.password, user.password);

        if (!isValidPassword)  throw new UseCaseError('Password is incorrect', 401);
	
		const token = sign({}, env.variables.JWT_SECRET, {
			subject:user.id?.toString(),
			expiresIn: '1d'
		});

		return {token}
	}
}
