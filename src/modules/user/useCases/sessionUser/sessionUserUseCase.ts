import { PrivateJwtPayload, PublicJwtPayload } from '../../../../services/core/jwtPayloads';
import { UseCase, UseCaseError } from '../../../../services/core/useCase';
import { encryption } from '../../../../services/utils/encryption';
import { env } from '../../../../utils/env';

import { UserRepo } from '../../repo/userRepo';
import { SessionUserDTO,  SessionUserResponseDTO } from './sessionUserDTO';
import { sign } from 'jsonwebtoken';

export class SessionUserUseCase implements UseCase<SessionUserDTO, Promise<SessionUserResponseDTO> >{
	
	
	private tokenExpiryTime: number = 3600;
	private userRepo: UserRepo;

	constructor(userRepo: UserRepo) {
		this.userRepo = userRepo;
	}

	public async execute(request: SessionUserDTO): Promise<SessionUserResponseDTO> {

		const user = await this.userRepo.findByEmail(request.email);

        if (!user) throw new UseCaseError('User not found', 404);

		if (!user.roleId) throw new UseCaseError('User does not have a role', 401);

		const parsedPassword = encryption.parsePassword(user.password);

		const passwordVerification = await encryption.compare(
			await encryption.encrypt(request.password, parsedPassword.iterations, parsedPassword.salt),
			user.password,
		);

        if (!passwordVerification) throw new UseCaseError('Password is incorrect', 401);

		const expireDate = Math.floor(Date.now() / 1000) + this.tokenExpiryTime;
		

		//Public Token
		const publicTokenDTO: PublicJwtPayload = {
			userId: user.pid,
			exp: expireDate,
		};

		const publicToken: string = sign(publicTokenDTO, env.variables.JWT_SECRET );

		// Private Token
		const privateTokenDTO: PrivateJwtPayload = {
			email: user.email,
			roleId: user.roleId,
			pid: user.pid,
			id: user.id,
		};

		const privateToken: string = sign(privateTokenDTO, env.variables.JWT_SECRET);

		return {
			token: publicToken,
			expiresIn: this.tokenExpiryTime,
			expireDate,
		};
	}
}
