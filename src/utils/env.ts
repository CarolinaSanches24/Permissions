require('dotenv').config();

export default interface Variables {
	DB_USER: string;
    DB_PASS:string;
}

class Env {
	public variables: Variables = {
		DB_USER: this.getEnv('DB_USER'),
        DB_PASS:this.getEnv('DB_PASS')
		
	};

	private getEnv(envName: string): string {
		const result = process.env[envName] as string;
		if (!result) throw new Error(`Environment variable ${envName} not found`);
		return result;
	}
}

export const env = new Env();