import {ComponentInterface} from "./ComponentInterface";
import {IdInterface} from "../components/IdInterface";
import {ComponentType} from "../../enums/ComponentType";
import {TFile} from "obsidian";

export interface DatabaseInterface {
	recordset: ComponentInterface[];

	create(
		data: ComponentInterface,
	): void;

	ready(
	): void;

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

	refreshRelationships(
		element?: ComponentInterface|undefined,
	): Promise<void>;

	onSave(
		file: TFile,
	): Promise<void>;
}
