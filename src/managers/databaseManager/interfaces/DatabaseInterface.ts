import {ComponentType} from "../../../core/enums/ComponentType";
import {IndexInterface} from "../../../services/indexService/interfaces/IndexInterface";
import {ModelInterface} from "../../modelsManager/interfaces/ModelInterface";
import {TFile} from "obsidian";
import {IndexDataInterface} from "../../../services/indexService/interfaces/IndexDataInterface";

export interface DatabaseInterface {
	recordset: ModelInterface[];

	create(
		data: ModelInterface,
	): void;

	ready(
	): void;

	get isReady(): boolean;

	read<T>(
		query: any,
	): T[];

	update(
		data: ModelInterface,
	): void;

	delete(
		data: ModelInterface|string,
	): boolean;

	readByPath<T extends ModelInterface>(
		name: string,
	): T|undefined;

	readByBaseName<T extends ModelInterface>(
		basename: string,
	): T|undefined;

	readById<T extends ModelInterface>(
		id: string,
	): T;

	readChildren<T extends ModelInterface>(
		type: ComponentType,
		id: string,
	): T[];

	readNeighbour<T extends ModelInterface>(
		type: ComponentType,
		id: IndexInterface,
		previous: boolean,
	): T;

	onSave(
		file: TFile,
	): Promise<void>;
}
