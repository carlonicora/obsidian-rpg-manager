import {AbstractComponentFrontmatterTemplateFactory} from "../../abstracts/AbstractComponentFrontmatterTemplateFactory";
import {ControllerMetadataInterface} from "../../database/interfaces/metadata/ControllerMetadataInterface";
import {MusicMetadataInterface} from "../../database/interfaces/metadata/components/MusicMetadataInterface";

export class MusicFrontmatterTemplateFactory extends AbstractComponentFrontmatterTemplateFactory {
	public addFrontmatterData(
		frontmatter: any,
	): void {
		frontmatter.tags.push(this.settings.musicTag + '/' + this.campaignId);
	}

	public generateInitialCodeBlock(
	): string|undefined {
		const metadata: ControllerMetadataInterface|MusicMetadataInterface = {
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
			data: {
				synopsis: '',
				image: '',
				complete: false,
				url: ''
			}
		};
		return this.generateRpgManagerCodeBlock(
			metadata
		);
	}
}
