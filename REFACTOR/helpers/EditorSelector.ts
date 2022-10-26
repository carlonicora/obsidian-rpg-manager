import {App, CachedMetadata, Editor, EditorPosition, EditorRange, MarkdownView} from "obsidian";
import {ModelInterface} from "../../src/api/modelsManager/interfaces/ModelInterface";

export class EditorSelector {
	public static focusOnDataKey(
		app: App,
		currentComponent: ModelInterface,
		dataId: string|undefined=undefined,
	): void {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView == null) return;

		const metadata: CachedMetadata|null = app.metadataCache.getFileCache(currentComponent.file);
		if (metadata == null || metadata.sections === undefined || metadata.sections?.length === 0) return;

		for (let index=0; index<metadata.sections.length; index++){
			const editor = activeView.editor;
			if (metadata.sections[index].type === 'code' && editor.getLine(metadata.sections[index].position.start.line) === '```RpgManagerData') {
				let metadataKeyStart: EditorPosition|undefined = undefined;
				let metadataKeyEnd: EditorPosition|undefined = undefined;

				if (dataId !== undefined) {
					const metadataPositions = this._findDataIdPosition(
						metadata.sections[index].position.start.line + 1,
						metadata.sections[index].position.end.line,
						editor,
						dataId
					);

					if (metadataPositions !== undefined){
						metadataKeyStart = metadataPositions.from;
						metadataKeyEnd = metadataPositions.to;
					}
				}

				if (metadataKeyStart === undefined){
					metadataKeyStart = {line: metadata.sections[index].position.start.line + 2, ch: 0};
					metadataKeyEnd = {line: metadata.sections[index].position.end.line, ch: 0};
				}

				if (metadataKeyStart !== undefined && metadataKeyEnd !== undefined) return this._setPositionsAndScroll(editor, metadataKeyStart, metadataKeyEnd);
			}
		}
	}

	public static focusOnDataRelationshipDescription(
		app: App,
		currentComponent: ModelInterface,
		path: string,
	): void {
		const activeView = app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView == null) return;

		const metadata: CachedMetadata|null = app.metadataCache.getFileCache(currentComponent.file);
		if (metadata == null || metadata.sections === undefined || metadata.sections?.length === 0) return;

		for (let index=0; index<metadata.sections.length; index++) {
			const editor = activeView.editor;
			if (metadata.sections[index].type === 'code' && editor.getLine(metadata.sections[index].position.start.line) === '```RpgManagerData') {
				const dataYaml: any|undefined = (metadata.sections !== undefined ? metadata.sections[index] : undefined);
				let metadataKeyStart: EditorPosition|undefined = undefined;
				let metadataKeyEnd: EditorPosition|undefined = undefined;

				if (dataYaml === undefined){
					metadataKeyStart = {line: metadata.sections[index].position.start.line + 2, ch: 0};
					metadataKeyEnd = {line: metadata.sections[index].position.end.line, ch: 0};
					return this._setPositionsAndScroll(editor, metadataKeyStart, metadataKeyEnd);
				} else {
					let relationshipsStarted = false
					for (let lineIndex=dataYaml.position.start.line+1; lineIndex<dataYaml.position.end.line; lineIndex++) {
						if (editor.getLine(lineIndex).trim().toLowerCase() === 'relationshipsService:') {
							relationshipsStarted = true
							continue;
						}
						if (!relationshipsStarted) continue;

						if (editor.getLine(lineIndex).trim().toLowerCase().startsWith('- type:')) {
							const startOfPath = editor.getLine(lineIndex+1).indexOf('path: ');
							if (startOfPath !== -1 && editor.getLine(lineIndex+1).substring(startOfPath+6).trim() === path){
								const startOfDescription = editor.getLine(lineIndex+2).indexOf('description: ');
								if (startOfDescription !== -1){
									return this._setCoordinatesAndScroll(editor, lineIndex+2, startOfDescription + 13, lineIndex+2, editor.getLine(lineIndex+2).length);
								} else {
									let relatioshipContent: string = editor.getRange({line: lineIndex, ch: 0}, {line: lineIndex+2, ch:0});
									relatioshipContent += ' '.repeat(startOfPath) + 'description: \n';
									editor.replaceRange(relatioshipContent, {line: lineIndex, ch: 0}, {line: lineIndex+2, ch:0});

									return this._setCoordinatesAndScroll(editor, lineIndex+2, startOfPath+13, lineIndex+2, startOfPath+13);
								}
							}
						}
					}

					let newRelationship = '';
					if (!relationshipsStarted) newRelationship += 'relationshipsService:\n';
					newRelationship += '  - type: unidirectional\n' +
						'    path: ' + path + '\n'+
						'    description: \n' +
						'```\n';

					editor.replaceRange(newRelationship, {line: dataYaml.position.end.line, ch: 0}, {line: dataYaml.position.end.line+1, ch:0});

					return this._setCoordinatesAndScroll(
						editor,
						dataYaml.position.end.line+2,
						17,
						dataYaml.position.end.line+2,
						17
					);
				}
			}
		}
	}

	private static _setCoordinatesAndScroll(
		editor: Editor,
		startLine: number,
		startCharacter: number,
		endLine: number,
		endCharacter: number,
	): void {
		const metadataKeyStart: EditorPosition = {line: startLine, ch: startCharacter};
		const metadataKeyEnd: EditorPosition = {line: endLine, ch:endCharacter};

		return this._setPositionsAndScroll(editor, metadataKeyStart, metadataKeyEnd);
	}

	private static _setPositionsAndScroll(
		editor: Editor,
		start: EditorPosition,
		end: EditorPosition,
	): void {
		editor.setSelection(
			start,
			end,
		);
		editor.scrollIntoView(
			{from: start, to: end,},
			true,
		);

		editor.focus();
	}

	private static _findDataIdPosition(
		start: number,
		end: number,
		editor: Editor,
		dataId: string,
	): EditorRange|undefined{
		const arr = editor.getRange(
			{line: start, ch: 0},
			{line: end, ch: 0},
		).split('\n');

		const arrKey = dataId.split('.');
		let startLine = 0;

		while (arrKey.length !== 0){
			let breakMe = true;
			for (let index=startLine; index<arr.length; index++){
				if (arr[index].trimStart().startsWith(arrKey[0] + ':')){
					if (arrKey.length === 1){
						const startingPosition = arr[index].indexOf(arrKey[0] + ':') + arrKey[0].length +2;
						const text = arr[index].substring(startingPosition);

						let response = undefined;

						if (text[0] === '"') {
							response = {
								from: {line: start + index, ch: startingPosition + 1},
								to: {line: start + index, ch: arr[index].length - 1},
							}
						} else {
							response = {
								from: {line: start + index, ch: startingPosition},
								to: {line: start + index, ch: arr[index].length},
							}
						}

						return response;
					} else {
						arrKey.shift();
						startLine = index+1;
						breakMe = false;
						break;
					}
				}
			}

			if (breakMe) break;
		}

		return undefined;
	}
}
