import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {SessionMetadataInterface} from "../../database/interfaces/metadata/components/SessionMetadataInterface";

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
				header: true
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
}
