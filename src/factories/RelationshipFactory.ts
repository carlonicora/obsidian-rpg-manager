import {TFile} from "obsidian";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {RelationshipType} from "../enums/RelationshipType";
import {RelationshipFactoryInterface} from "../interfaces/factories/RelationshipFactoryInterface";
import {AbstractFactory} from "../abstracts/AbstractFactory";

export class RelationshipFactory extends AbstractFactory implements RelationshipFactoryInterface {
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

				const content = fileContent.join('\n');
				const newContent = (frontmatter.length > 0 ? '---\n' + frontmatter.join('\n') + '\n---\n' : '') + body.join('\n');
				if (content !== newContent){
					this.app.vault.modify(file, newContent);
				}

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
				let isMainFrontLink = false;
				if (line.trimStart().indexOf('[[') === 0) isMainFrontLink = true;
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

				if (name !== baseName) {
					if (isInFrontMatter && isMainFrontLink) {
						relationships.set(name, {description: relationshipDescription, type: RelationshipType.DirectInFrontmatter});
					} else if (!relationships.has(name)) {
						relationships.set(name, {description: relationshipDescription, type: RelationshipType.Direct});
					}
				}
			}
		}
	}

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

		const linesAtTheEnd: Array<string> = [];

		for (let fileContentLineCounter=0; fileContentLineCounter<fileContent.length; fileContentLineCounter++) {
			let line = fileContent[fileContentLineCounter];
			let addLine = false;
			let addLineAtTheEnd = false;

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

							line = '[[' + line.substring(index, indexOfSeparator) + ']]' + line.substring(indexOfSeparator);
							addLineAtTheEnd = true;
						}
					}
				}

				if (isFrontMatter && line.toLowerCase().startsWith('relationships:')) {
					hasFrontmatterRelationshipStarted = true;
				}
			}

			if (addLineAtTheEnd) {
				linesAtTheEnd.push(line)
			} else {
				if (addLine) response.push(line);
			}
		}

		if (linesAtTheEnd.length > 0){
			return [...response, ...linesAtTheEnd];
		} else {
			return response;
		}
	}
}
