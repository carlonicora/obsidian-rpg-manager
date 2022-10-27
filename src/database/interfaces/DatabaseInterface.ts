import {ComponentType} from "../../core/enums/ComponentType";
import {IdInterface} from "../../services/idService/interfaces/IdInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {TFile} from "obsidian";

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

	readSingle<T extends ModelInterface>(
		type: ComponentType,
		id: IdInterface,
		overloadId?: number|undefined,
	): T;

	readList<T extends ModelInterface>(
		type: ComponentType,
		id: IdInterface|undefined,
		overloadId?: number|undefined,
	): T[];

	onSave(
		file: TFile,
	): Promise<void>;
}
