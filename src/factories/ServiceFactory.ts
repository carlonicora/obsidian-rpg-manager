import { Service } from "src/interfaces/Service";

export class ServiceFactory {
	static async create<T extends Service>(ServiceClass: new (...args: any[]) => T, ...params: any[]): Promise<T> {
		const response: Service = new ServiceClass(...params);
		await response.initialise();

		return response as T;
	}
}
