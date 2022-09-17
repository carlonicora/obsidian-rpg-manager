import {App, TFile} from "obsidian";
import {RawTrait} from "../enums/RawTrait";
import {RawAbility} from "../enums/RawAbility";

export class RawCharacterRecordSheetFactory {
	public static updateAbility(
		app: App,
		file: TFile,
		trait: RawTrait,
		ability: RawAbility,
		value: number,
		specialisation: string|null = null,
	): void {
	}
}
