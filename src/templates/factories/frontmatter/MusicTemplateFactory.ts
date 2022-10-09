import {AbstractComponentTemplateFactory} from "../../abstracts/AbstractComponentTemplateFactory";
import {ControllerMetadataInterface} from "../../../metadatas/controllers/ControllerMetadataInterface";
import {MusicMetadataInterface} from "../../../metadatas/components/MusicMetadataInterface";

export class MusicTemplateFactory extends AbstractComponentTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.musicTag + '/' + this.campaignId);
	}

	protected generateDataCodeBlock(
	): string {
		const metadata: MusicMetadataInterface = {
			data: {
				synopsis: '',
				image: '',
				complete: false,
				url: ''
			}
		};
		return this.generateRpgManagerDataCodeBlock(metadata);
	}

	public generateInitialCodeBlock(
	): string {
		const metadata: ControllerMetadataInterface = {
			models: {
				header: true,
				lists: {
					musics: [
						{
							relationship: "parent",
							title: "Part of playlists"
						},
						{
							relationship: "child",
							title: "Songs",
						}
					]
				}
			},
		};

		return this.generateRpgManagerCodeBlock(metadata);
	}
}
