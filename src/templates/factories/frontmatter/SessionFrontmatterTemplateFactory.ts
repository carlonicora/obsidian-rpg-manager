import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {SessionMetadataInterface} from "../../../metadatas/components/SessionMetadataInterface";
import {ActDataInterface} from "../../../databases/components/interfaces/data/ActDataInterface";

export class SessionFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.sessionTag + '/' + this.campaignId + '/' + this.sessionId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|SessionMetadataInterface = {
			models: {
				header: true,
				lists: {
					scenes: {
						relationship: "hierarchy",
					},
				}
			},
			data: {
				synopsis: '',
				image: '',
				complete: false,
				irl: undefined,
				abtStage: undefined
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}

	public generateLastCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|ActDataInterface = {
			models: {
				lists: {
					subplots: {
						relationship: "hierarchy",
					},
					musics: {
						relationship: "hierarchy",
					},
					pcs: {
						relationship: "hierarchy",
					},
					npcs: {
						relationship: "hierarchy",
					},
					factions: {
						relationship: "hierarchy",
					},
					clues: {
						relationship: "hierarchy",
					},
					locations: {
						relationship: "hierarchy",
					},
					events: {
						relationship: "hierarchy",
					},
				}
			}
		}
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
