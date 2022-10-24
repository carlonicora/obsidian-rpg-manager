import {StoryCircleInterface} from "./interfaces/StoryCircleInterface";
import {StoryCirclePlotMetadataInterface} from "./interfaces/StoryCirclePlotMetadataInterface";

export class StoryCirclePlot implements StoryCircleInterface {
	constructor(
		private _metadata: StoryCirclePlotMetadataInterface,
	) {
	}

	get change(): string {
		return this._metadata.plot?.storycircle?.change ?? '';
	}

	get find(): string {
		return this._metadata.plot?.storycircle?.find ?? '';
	}

	get go(): string {
		return this._metadata.plot?.storycircle?.go ?? '';
	}

	get isEmpty(): boolean {
		return this.you === '' &&
			this.need === '' &&
			this.go === '' &&
			this.search === '' &&
			this.find === '' &&
			this.take === '' &&
			this.return === '' &&
			this.change === '';


	}

	get need(): string {
		return this._metadata.plot?.storycircle?.need ?? '';
	}

	get return(): string {
		return this._metadata.plot?.storycircle?.return ?? '';
	}

	get search(): string {
		return this._metadata.plot?.storycircle?.search ?? '';
	}

	get take(): string {
		return this._metadata.plot?.storycircle?.take ?? '';
	}

	get you(): string {
		return this._metadata.plot?.storycircle?.you ?? '';
	}
}
