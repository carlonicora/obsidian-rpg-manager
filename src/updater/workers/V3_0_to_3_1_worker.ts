import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {CachedMetadata, parseYaml, SectionCache, TFile} from "obsidian";
import {ComponentMetadataInterface} from "../../core/interfaces/ComponentMetadataInterface";
import {ImageMetadataInterface} from "../../core/interfaces/ImageMetadataInterface";
import {LogMessageType} from "../../services/loggerService/enums/LogMessageType";
import {LoggerService} from "../../services/loggerService/LoggerService";
import {YamlService} from "../../services/yamlService/YamlService";

export class V3_0_to_3_1_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this.api.service(LoggerService).warning(LogMessageType.Updater, 'Updating RPG Manager from v3.0 to v3.1');

		const files: TFile[] = await this.api.app.vault.getMarkdownFiles();
		if (reporter !== undefined) reporter.setFileCount(files.length);
		for (let filesIndex=0; filesIndex<files.length; filesIndex++) {
			const file: TFile = files[filesIndex];
			const cachedMetadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (cachedMetadata == null) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			let fileContent = await this.api.app.vault.read(file);
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

				const attachmentFolder = (this.api.settings.imagesFolder !== undefined && this.api.settings.imagesFolder !== '') ? this.api.settings.imagesFolder : this.api.app.vault.config.attachmentFolderPath;

				if (attachmentFolder === undefined){
					if (reporter !== undefined) reporter.addFileUpdated();
					continue;
				}

				const files = this.api.app.vault.getFiles().filter((image: TFile) =>
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
			};

			yaml.data.images.push(metadataImage);
			delete yaml.data.image;

			const newYamlArray = this.api.service(YamlService).stringify(yaml).split('\n');
			fileContentArray.splice(codeblock.position.start.line+1, codeblock.position.end.line  - codeblock.position.start.line - 1, ...newYamlArray);

			fileContent = fileContentArray.join('\n');

			if (reporter !== undefined) reporter.addFileUpdated();
			this.api.app.vault.modify(file, fileContent)
				.then(() => {
					if (reporter !== undefined) reporter.addFileUpdated();
				});
		}
	}
}
