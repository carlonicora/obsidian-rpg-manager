import {App, TFile} from "obsidian";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";

export class RelationshipFactory {
	constructor(
		private app: App,
	) {
	}

	public async read(
		file: TFile,
		relationship: Map<string, RelationshipInterface>,
	): Promise<void> {

		return this.app.vault.read(file)
			.then((fileContent: string) => {
				return fileContent.split('\n');
			})
			.then((fileContent: Array<string>) => {
				const body = this.parseContent(fileContent, false);
				const frontmatter = this.parseContent(fileContent, true);

				this.readRelationships(
					file.basename,
					frontmatter,
					relationship,
					true,
				);

				this.readRelationships(
					file.basename,
					body,
					relationship,
					false,
				);

				return;
			});
	}

	private readRelationships(
		baseName: string,
		content: Array<string>,
		relationships: Map<string, RelationshipInterface>,
		isInFrontMatter: boolean,
	): void {
		for (let fileContentLineCounter=0; fileContentLineCounter<content.length; fileContentLineCounter++) {
			let line = content[fileContentLineCounter];
			while (line.indexOf('[[') !== -1){
				line = line.substring(line.indexOf('[[') + 2);
				const endLinkIndex = line.indexOf(']]');
				if (endLinkIndex === -1) break;

				let name = '';

				const nameAndAlias = line.substring(0, endLinkIndex);
				const aliasIndex = nameAndAlias.indexOf('|');
				if (aliasIndex === -1){
					name = nameAndAlias;
				} else {
					name = nameAndAlias.substring(0, aliasIndex);
				}

				let relationshipDescription = '';

				if (isInFrontMatter) {
					const remainingFrontmatter = line.substring(endLinkIndex + 2);
					if (remainingFrontmatter[0] === ':'){
						relationshipDescription = remainingFrontmatter.substring(1).trimStart();

						if (
							relationshipDescription !== '' &&
							relationshipDescription[0] === relationshipDescription[relationshipDescription.length - 1] &&
							(relationshipDescription[0] === '"' || relationshipDescription[0] === "'")
						) {
							relationshipDescription = relationshipDescription.substring(1, relationshipDescription.length - 1).replaceAll('\\', '');
						}
					}
				}

				if (name !== baseName && !relationships.has(name)) relationships.set(name, {description: relationshipDescription, isReverse: false, isInFrontmatter: isInFrontMatter});
			}
		}
	}

	/*
	private readBodyRelationships(
		bodyContent: Array<string>,
		relationships: Map<string, RelationshipInterface>,
	): void {
		for (let fileContentLineCounter=0; fileContentLineCounter<bodyContent.length; fileContentLineCounter++) {
			let line = bodyContent[fileContentLineCounter];
			while (line.indexOf('[[') !== -1){
				line = line.substring(line.indexOf('[[') + 2);
				const endLinkIndex = line.indexOf(']]');
				if (endLinkIndex === -1) break;

				let name = '';

				const nameAndAlias = line.substring(0, endLinkIndex);
				const aliasIndex = nameAndAlias.indexOf('|');
				if (aliasIndex === -1){
					name = nameAndAlias;
				} else {
					name = nameAndAlias.substring(0, aliasIndex);
				}

				if (relationships.get(name) === undefined) relationships.set(name, {component: undefined, description: '', isReverse: false, isInFrontmatter: false});
			}
		}
	}

	private readFrontmatterRelationships(
		frontmatterContent: Array<string>,
		relationships: Map<string, RelationshipInterface>,
	): void {
		for (let fileContentLineCounter=0; fileContentLineCounter<frontmatterContent.length; fileContentLineCounter++) {
			let line = frontmatterContent[fileContentLineCounter];
			if (line.indexOf('[[') !== -1){
				line = line.substring(line.indexOf('[[') + 2);
				const endLinkIndex = line.indexOf(']]');
				if (endLinkIndex === -1) break;

				let name = '';
				let description = '';

				const nameAndAlias = line.substring(0, endLinkIndex);
				const aliasIndex = nameAndAlias.indexOf('|');
				if (aliasIndex === -1){
					name = nameAndAlias;
				} else {
					name = nameAndAlias.substring(0, aliasIndex);
				}

				const remainingFrontmatter = line.substring(endLinkIndex + 2);
				if (remainingFrontmatter[0] === ':'){
					description = remainingFrontmatter.substring(1).trimStart();

					if (
						description !== '' &&
						description[0] === description[description.length - 1] &&
						(description[0] === '"' || description[0] === "'")
					) {
						description = description.substring(1, description.length - 1).replaceAll('\\', '');
						this.readBodyRelationships([description], relationships);
					}
				}


				relationships.set(name, {component: undefined, description: '', isReverse: false, isInFrontmatter: true});
			}
		}
	}

	private addRelationshipsInLine(
		line: string,
	): void {
		let indexOfFirstLinkStart = line.indexOf('[[');
		const indexOfYamlSplitter = line.indexOf(':');
		if (indexOfYamlSplitter === -1 || indexOfFirstLinkStart === -1 || indexOfFirstLinkStart < indexOfYamlSplitter) return;

		while (indexOfFirstLinkStart !== -1) {
			const indexOfFirstLinkEnd = line.indexOf(']]');

			if (indexOfFirstLinkEnd === -1) break;

			line = line.substring(0, partialLine.indexOf('[[') + 2);

			let name = '';
			let description = '';

			const nameAndAlias = line.substring(0, indexOfFirstLinkEnd);
			const aliasIndex = nameAndAlias.indexOf('|');
			if (aliasIndex === -1){
				name = nameAndAlias;
			} else {
				name = nameAndAlias.substring(0, aliasIndex);
			}

			const remainingFrontmatter = line.substring(indexOfFirstLinkEnd + 2);
			if (remainingFrontmatter[0] === ':'){
				description = remainingFrontmatter.substring(1).trimStart();

				if (
					description !== '' &&
					description[0] === description[description.length - 1] &&
					(description[0] === '"' || description[0] === "'")
				) {
					description = description.substring(1, description.length - 1).replaceAll('\\', '');
					this.readBodyRelationships([description], relationships);
				}
			}


			relationships.set(name, {component: undefined, description: '', isReverse: false, isInFrontmatter: true});
		}
	}
	*/

	private parseContent(
		fileContent: Array<string>,
		isFrontMatter: boolean,
	): Array<string> {
		const response: Array<string> = [];

		let hasFrontmatterRelationshipStarted = false;
		let frontmatterRelationshipLevel = 0;
		let frontmatterRelationshipIndentation = 0;

		let hasFrontmatterReadStarted = false;
		let hasFrontmatterReadEnded = false;
		const containsFrontMatter = fileContent[0] === '---';

		if (isFrontMatter && !containsFrontMatter) return [];

		for (let fileContentLineCounter=0; fileContentLineCounter<fileContent.length; fileContentLineCounter++) {
			let line = fileContent[fileContentLineCounter];
			let addLine = false;

			if (line === '---') {
				if (!containsFrontMatter) {
					addLine = true;
				} else {
					if (isFrontMatter) {
						if (hasFrontmatterReadStarted) break;
						hasFrontmatterReadStarted = true;
						continue;
					} else {
						if (!hasFrontmatterReadStarted) {
							hasFrontmatterReadStarted = true;
							continue;
						}

						if (hasFrontmatterReadStarted && !hasFrontmatterReadEnded) {
							hasFrontmatterReadEnded = true;
							continue;
						}

						if (hasFrontmatterReadEnded) addLine = true;
					}
				}
			} else {
				if (isFrontMatter || (!isFrontMatter && hasFrontmatterReadEnded)) addLine = true;

				if (isFrontMatter && hasFrontmatterRelationshipStarted) {
					if (!line.startsWith(' ')) {
						hasFrontmatterRelationshipStarted = false;
					} else {
						let index = 0;
						while (line[index] === ' '){
							index++;
						}

						if (frontmatterRelationshipIndentation > index) frontmatterRelationshipLevel--;
						if (frontmatterRelationshipIndentation < index) frontmatterRelationshipLevel++;
						frontmatterRelationshipIndentation = index;

						if (frontmatterRelationshipLevel === 2) {
							const indexOfSeparator = line.indexOf(':');

							line = ' '.repeat(index) + '[[' + line.substring(index, indexOfSeparator) + ']]' + line.substring(indexOfSeparator);
						}
					}
				}

				if (isFrontMatter && line.toLowerCase().startsWith('relationships:')) hasFrontmatterRelationshipStarted = true;
			}

			if (addLine) response.push(line);
		}

		return response;
	}
}
