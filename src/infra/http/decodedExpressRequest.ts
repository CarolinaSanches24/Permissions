import {Request} from 'express';

export interface RequestWithIp extends Request {
	clientIp: string;
}

export interface DecodedExpressRequest extends RequestWithIp {
	token: string;
	user: {
		pid: string;
		id: number;
		role: {
			id: number;
			name: string;
		};
		email: string;
	};
}
