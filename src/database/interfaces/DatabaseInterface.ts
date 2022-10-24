import {ComponentType} from "../../core/enums/ComponentType";
import {IdInterface} from "../../services/id/interfaces/IdInterface";
import {ComponentModelInterface} from "../../api/componentManager/interfaces/ComponentModelInterface";
import {TFile} from "obsidian";

export interface DatabaseInterface {
	recordset: ComponentModelInterface[];

	create(
		data: ComponentModelInterface,
	): void;

	ready(
	): void;

	get isReady(): boolean;

	read<T>(
		query: any,
	): T[];

	update(
		data: ComponentModelInterface,
	): void;

	delete(
		data: ComponentModelInterface|string,
	): boolean;

	readByPath<T extends ComponentModelInterface>(
		name: string,
	): T|undefined;

	readByBaseName<T extends ComponentModelInterface>(
		basename: string,
	): T|undefined;

	readSingle<T extends ComponentModelInterface>(
		type: ComponentType,
		id: IdInterface,
		overloadId?: number|undefined,
	): T;

	readList<T extends ComponentModelInterface>(
		type: ComponentType,
		id: IdInterface|undefined,
		overloadId?: number|undefined,
	): T[];

	onSave(
		file: TFile,
	): Promise<void>;
}
