import {App, CachedMetadata, MarkdownView} from "obsidian";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";

export class EditorSelector {
	public static select(
		app: App,
		currentElement: ComponentInterface,
		specificYamlKey: string|undefined=undefined,
	): void {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView != null) {
			const metadata: CachedMetadata|null = app.metadataCache.getFileCache(currentElement.file)
			if (metadata != null && metadata.sections !== undefined) {
				for (let index=0; index<metadata.sections.length; index++){
					const editor = activeView.editor;
					if (metadata.sections[index].type === 'code') {
						const codeType = editor.getRange(
							{line: metadata.sections[index].position.start.line, ch: 3},
							{line: metadata.sections[index].position.start.line + 1, ch: 0},
						).replaceAll('\n', '');

						if (codeType === 'RpgManager') {
							if (specificYamlKey === undefined) {
								editor.setSelection(
									{line: metadata.sections[index].position.start.line + 2, ch: 0},
									{line: metadata.sections[index].position.end.line, ch: 0},
								);
							} else {
								const code: Array<string> = editor.getRange(
									{line: metadata.sections[index].position.start.line + 2, ch: 0},
									{line: metadata.sections[index].position.end.line, ch: 0},
								).split('\n');

								for(let codeIndex=0; codeIndex<code.length; codeIndex++){
									if (code[codeIndex].trimStart().startsWith(specificYamlKey)){
										editor.setSelection(
											{line: metadata.sections[index].position.start.line + codeIndex + 2, ch: 0},
											{line: metadata.sections[index].position.end.line + codeIndex, ch: 0},
										);
										break;
									}
								}

							}

							editor.focus();
							break;
						}
					}
				}
			}
		}
	}
}
