require('dotenv').config();

export default interface Variables {
	DB_USER: string;
    DB_PASS:string;
	DB_HOST:string;
	DB_NAME:string;
	DB_PORT:string;

}

class Env {
	public variables: Variables = {
		DB_USER: this.getEnv('DB_USER'),
        DB_PASS:this.getEnv('DB_PASS'),
		DB_HOST:this.getEnv('DB_HOST'),
		DB_NAME:this.getEnv('DB_NAME'),
		DB_PORT:this.getEnv('DB_PORT')


		
	};

	private getEnv(envName: string): string {
		const result = process.env[envName] as string;
		if (!result) throw new Error(`Environment variable ${envName} not found`);
		return result;
	}
}

export const env = new Env();