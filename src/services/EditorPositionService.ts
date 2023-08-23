import { Editor, EditorPosition } from "obsidian";

export class EditorPositionService {
	private static _editorPositions: {
		[path: string]: { editor: Editor; cursorPosition: EditorPosition; scrollInfo: { top: number; left: number } };
	} = {};

	static async setEditorPosition(
		path: string,
		editor: Editor,
		cursorPosition: EditorPosition,
		scrollInfo: { top: number; left: number }
	): Promise<void> {
		EditorPositionService._editorPositions[path] = { editor, cursorPosition, scrollInfo };
	}

	static getEditorPositions(
		path: string
	): { editor: Editor; cursorPosition: EditorPosition; scrollInfo: { top: number; left: number } } | undefined {
		return EditorPositionService._editorPositions[path];
	}

	static clearEditorPosition(path: string): void {
		EditorPositionService._editorPositions[path] = undefined;
	}
}
