import {StoryCircleInterface} from "./interfaces/StoryCircleInterface";
import {StoryCirclePlotMetadataInterface} from "./interfaces/StoryCirclePlotMetadataInterface";

export class StoryCirclePlot implements StoryCircleInterface {
	constructor(
		private metadata: StoryCirclePlotMetadataInterface,
	) {
	}

	get change(): string {
		return this.metadata.plot?.storycircle?.change ?? '';
	}

	get find(): string {
		return this.metadata.plot?.storycircle?.find ?? '';
	}

	get go(): string {
		return this.metadata.plot?.storycircle?.go ?? '';
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
		return this.metadata.plot?.storycircle?.need ?? '';
	}

	get return(): string {
		return this.metadata.plot?.storycircle?.return ?? '';
	}

	get search(): string {
		return this.metadata.plot?.storycircle?.search ?? '';
	}

	get take(): string {
		return this.metadata.plot?.storycircle?.take ?? '';
	}

	get you(): string {
		return this.metadata.plot?.storycircle?.you ?? '';
	}
}
