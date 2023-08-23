import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { TaskServiceInterface } from "./services/taskService/interfaces/TaskServiceInterface";
import { RpgManagerSettingsInterface } from "./settings/RpgManagerSettings";

export interface RpgManagerInterface {
	settings: RpgManagerSettingsInterface;
	get version(): string;
	get(
		path?: string,
		campaign?: ElementInterface,
		type?: ElementType,
		parent?: ElementInterface
	): ElementInterface | ElementInterface[] | undefined;

	get tasks(): TaskServiceInterface;
}
