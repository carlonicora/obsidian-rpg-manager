import {AbtInterface} from "./interfaces/AbtInterface";
import {AbtPlotMetadataInterface} from "../metadatas/plots/AbtPlotMetadataInterface";

export class AbtPlot implements AbtInterface {
	constructor(
		private metadata: AbtPlotMetadataInterface
	) {
	}

	get and(): string {
		return this.metadata.plot?.abt?.and ?? '';
	}

	get but(): string {
		return this.metadata.plot?.abt?.but ?? '';
	}

	get isEmpty(): boolean {
		return this.need === '' &&
			this.and === '' &&
			this.but === '' &&
			this.therefore === '';


	}

	get need(): string {
		return this.metadata.plot?.abt?.need ?? '';
	}

	get therefore(): string {
		return this.metadata.plot?.abt?.therefore ?? '';
	}

}
