import {ComponentType} from "../../components/enums/ComponentType";
import {IdInterface} from "../../id/interfaces/IdInterface";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {TFile} from "obsidian";

export interface DatabaseInterface {
	recordset: ComponentInterface[];

	create(
		data: ComponentInterface,
	): void;

	ready(
	): void;

	get isReady(): boolean;

	read<T>(
		query: any,
	): Array<T>;

	update(
		data: ComponentInterface,
	): void;

	delete(
		data: ComponentInterface|string,
	): boolean;

	readByPath<T extends ComponentInterface>(
		name: string,
	): T|undefined;

	readByBaseName<T extends ComponentInterface>(
		basename: string,
	): T|undefined;

	readSingle<T extends ComponentInterface>(
		type: ComponentType,
		id: IdInterface,
		overloadId?: number|undefined,
	): T;

	readList<T extends ComponentInterface>(
		type: ComponentType,
		id: IdInterface|undefined,
		overloadId?: number|undefined,
	): Array<T>;

	onSave(
		file: TFile,
	): Promise<void>;
}
