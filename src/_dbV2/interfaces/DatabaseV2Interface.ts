import {ComponentType} from "../../enums/ComponentType";
import {IdInterface} from "../../interfaces/IdInterface";
import {ComponentV2Interface} from "./ComponentV2Interface";

export interface DatabaseV2Interface {
	recordset: ComponentV2Interface[];

	create(
		data: ComponentV2Interface,
	): void;

	ready(
	): void;

	read<T>(
		query: any,
	): Array<T>;

	update(
		data: ComponentV2Interface,
	): void;

	delete(
		data: ComponentV2Interface|string,
	): boolean;

	readByPath<T extends ComponentV2Interface>(
		name: string,
	): T|undefined;

	readSingle<T extends ComponentV2Interface>(
		type: ComponentType,
		id: IdInterface,
		overloadId?: number|undefined,
	): T;

	readList<T extends ComponentV2Interface>(
		type: ComponentType,
		id: IdInterface|undefined,
		overloadId?: number|undefined,
	): Array<T>;

	/*
	onSave(
		file: TFile,
	): Promise<void>;
	*/
}
