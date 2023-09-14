import { EditorSelection, EditorState, Range, Text } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view";
import * as React from "react";

export default function Temp(): React.ReactElement {
	const parentDivRef = React.useRef<HTMLDivElement | null>(null);
	const [editorView, setEditorView] = React.useState<EditorView | null>(null);

	const a = `**bold** _italic_ *italic* **bold**
[[Campaigns/Æther/Æther.md|Æther]]
[[Campaigns/Æther/Æther.md]]

# h1
## h2
### h3

- list1
- list2

1. list1
2. list2
`;

	const [editorContent, setEditorContent] = React.useState(a); // `a` being your initial content

	const contentChangeExtension = EditorState.changeFilter.of((change) => {
		// Get the updated content of the editor
		const newContent = change.state.doc.toString();

		// Update the state
		setEditorContent(newContent);

		return true; // Return true to allow the change to proceed
	});

	const initializeEditor = async () => {
		if (parentDivRef.current) {
			const view = new EditorView({
				state: EditorState.create({
					doc: a,
					extensions: [inlinePlugin(), contentChangeExtension],
				}),
				parent: parentDivRef.current,
			});

			setEditorView(view);
		}
	};

	React.useEffect(() => {
		initializeEditor();

		return () => {
			editorView?.destroy();
		};
	}, []);

	return (
		<>
			<div className="border border-[--background-modifier-border] rounded-lg" ref={parentDivRef}></div>
			<button
				onClick={() => {
					console.log(editorContent);
				}}
			>
				Log
			</button>
		</>
	);
}

export function inlinePlugin() {
	return ViewPlugin.fromClass(
		class {
			decorations: DecorationSet;

			constructor(view: EditorView) {
				this.decorations = this.inlineRender(view);
			}

			update(update: ViewUpdate) {
				if (update.docChanged || update.selectionSet || update.viewportChanged) {
					this.decorations = this.inlineRender(update.view);
				}
			}

			inlineRender(view: EditorView): DecorationSet {
				const decorations = findMarkdownElements(view.state.doc, view);

				const { from, to } = view.state.selection.main;
				return Decoration.set(
					decorations.filter((decoRange) => {
						const { from: decoFrom, to: decoTo } = decoRange;
						return to <= decoFrom || from >= decoTo; // Remove decorations that intersect with the cursor/selection
					})
				);
			}
		},
		{ decorations: (v) => v.decorations }
	);
}

class Widget extends WidgetType {
	constructor(private _el: HTMLElement) {
		super();
	}

	toDOM(view: EditorView): HTMLElement {
		return this._el;
	}
}

interface Pattern {
	regex: RegExp;
	renderWidget: (match: RegExpExecArray, view: EditorView) => Range<Decoration>;
}

function nextMatch(
	doc: string,
	position: number,
	patterns: Pattern[]
): { match: RegExpExecArray; pattern: Pattern } | null {
	let closestMatch: RegExpExecArray | null = null;
	let closestPattern: Pattern | null = null;

	for (const pattern of patterns) {
		const regex = new RegExp(pattern.regex.source, "gm"); // Make sure it's global and multiline
		regex.lastIndex = position; // Reset to current position

		const match = regex.exec(doc);

		if (match && (!closestMatch || match.index < closestMatch.index)) {
			closestMatch = match;
			closestPattern = pattern;
		}
	}

	if (closestMatch && closestPattern) {
		return {
			match: closestMatch,
			pattern: closestPattern,
		};
	}

	return null;
}

function findMarkdownElements(doc: Text, view: EditorView): Range<Decoration>[] {
	const patterns = [
		{
			regex: /^(#{1})\s+(.+?)(?=\n|$)/gm,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderHeading(match, view, 1),
		},
		{
			regex: /^(#{2})\s+(.+?)(?=\n|$)/gm,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderHeading(match, view, 2),
		},
		{
			regex: /^(#{3})\s+(.+?)(?=\n|$)/gm,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderHeading(match, view, 3),
		},
		{
			regex: /\*\*((?!\*).+?)\*\*/,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderBold(match, view),
		},
		{
			regex: /\*([^*]+?)\*(?!\*)/,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderItalic(match, view),
		},
		{
			regex: /_([^_]+?)_(?!_)/,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderItalic(match, view),
		},
		{
			regex: /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
			renderWidget: (match: RegExpExecArray, view: EditorView) => renderLink(match, view),
		},
	];

	const decorations: Range<Decoration>[] = [];
	const text = doc.toString().trim();

	let position = 0;

	while (position < text.length) {
		const next = nextMatch(text, position, patterns);

		if (next) {
			const { match, pattern } = next;

			const start = match.index;
			const end = start + match[0].length;

			if (!isCursorInsideRange(view.state.selection, start, end)) {
				const deco = pattern.renderWidget(match, view);
				decorations.push(deco);
			}

			position = end;
		} else {
			position = text.length;
		}
	}

	return decorations;
}

function isCursorInsideRange(selection: EditorSelection, start: number, end: number): boolean {
	for (const range of selection.ranges) {
		if (range.from <= end && range.to >= start) {
			return true;
		}
	}
	return false;
}

function renderBold(match: RegExpExecArray, view: EditorView): Range<Decoration> {
	const el = document.createElement("strong"); // Using <strong> tag for bold
	el.textContent = match[1]; // The content within **...**
	return Decoration.replace({ widget: new Widget(el) }).range(match.index, match.index + match[0].length);
}

function renderItalic(match: RegExpExecArray, view: EditorView): Range<Decoration> {
	const el = document.createElement("em"); // Using <em> tag for italic
	el.textContent = match[1]; // The content within _..._
	return Decoration.replace({ widget: new Widget(el) }).range(match.index, match.index + match[0].length);
}

function renderHeading(match: RegExpExecArray, view: EditorView, headingLevel: number): Range<Decoration> {
	const el = document.createElement("h" + headingLevel);
	el.textContent = match[2];

	const endOffset = match[0].endsWith("\n") ? match.index + match[0].length - 1 : match.index + match[0].length;

	return Decoration.replace({ widget: new Widget(el) }).range(match.index, endOffset);
}

function renderLink(match: RegExpExecArray, view: EditorView): Range<Decoration> {
	const el = document.createElement("a");
	const linkTarget = match[1];
	const linkText = match[2] || linkTarget;

	el.setAttribute("href", linkTarget);
	el.textContent = linkText;
	el.className = "internal-link !no-underline";

	return Decoration.replace({ widget: new Widget(el) }).range(match.index, match.index + match[0].length);
}
