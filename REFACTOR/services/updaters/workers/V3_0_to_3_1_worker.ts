import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {LogMessageType} from "../../loggers/enums/LogMessageType";
import {CachedMetadata, parseYaml, SectionCache, TFile} from "obsidian";
import {ComponentMetadataInterface} from "../../../../src/core/interfaces/ComponentMetadataInterface";
import {ImageMetadataInterface} from "../../../../src/core/interfaces/ImageMetadataInterface";
import {YamlHelper} from "../../../../src/core/helpers/YamlHelper";
import {AbstractModel} from "../../../../src/api/modelsManager/abstracts/AbstractModel";

export class V3_0_to_3_1_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this.factories.logger.warning(LogMessageType.Updater, 'Updating RPG Manager from v3.0 to v3.1');

		const files: TFile[] = await this.app.vault.getMarkdownFiles();
		if (reporter !== undefined) reporter.setFileCount(files.length);
		for (let filesIndex=0; filesIndex<files.length; filesIndex++) {
			const file: TFile = files[filesIndex];
			const cachedMetadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
			if (cachedMetadata == null) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			let fileContent = await this.app.vault.read(file);
			const fileContentArray = fileContent.split('\n');

			if (fileContent.indexOf('```RpgManagerData') === -1){
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const codeblocks: Array<SectionCache>|undefined = cachedMetadata.sections?.filter((section: SectionCache) =>
				section.type === 'code' &&
				fileContentArray[section.position.start.line] === '```RpgManagerData'
			);

			if (codeblocks == undefined || codeblocks.length !== 1){
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const codeblock = codeblocks[0];

			const data = fileContentArray.slice(codeblock.position.start.line+1, codeblock.position.end.line);

			const yaml: ComponentMetadataInterface = parseYaml(data.join('\n'));

			if (yaml == undefined){
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			if (yaml.data === undefined)
				yaml.data = {};

			if (yaml.data.images === undefined)
				yaml.data.images = [];

			const imageSrc = yaml.data.image;

			let imagePath = imageSrc;
			if (imagePath == undefined || imagePath === '') {
				if (AbstractModel.root == undefined)
					AbstractModel.initialiseRoots(this.app);

				const attachmentFolder = (this.settings.imagesFolder !== undefined && this.settings.imagesFolder !== '') ? this.settings.imagesFolder : this.app.vault.config.attachmentFolderPath;

				if (attachmentFolder === undefined){
					if (reporter !== undefined) reporter.addFileUpdated();
					continue;
				}

				const files = this.app.vault.getFiles().filter((image: TFile) =>
					image.path.toLowerCase().startsWith(attachmentFolder.toLowerCase()) &&
					image.basename.toLowerCase().startsWith(file.basename.toLowerCase())
				);

				if (files.length === 1)
					imagePath = files[0].path;

			}

			if (imagePath == undefined || imagePath === ''){
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const metadataImage: ImageMetadataInterface = {
				path: imagePath,
			}

			yaml.data.images.push(metadataImage);
			delete yaml.data.image;

			const newYamlArray = YamlHelper.stringify(yaml).split('\n');
			fileContentArray.splice(codeblock.position.start.line+1, codeblock.position.end.line  - codeblock.position.start.line - 1, ...newYamlArray)

			fileContent = fileContentArray.join('\n');

			if (reporter !== undefined) reporter.addFileUpdated();
			this.app.vault.modify(file, fileContent)
				.then(() => {
					if (reporter !== undefined) reporter.addFileUpdated();
				});
		}
	}
}
