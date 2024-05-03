import { RpgManagerInterface } from "@/RpgManagerInterface";
import { NewRelationshipController } from "@/controllers/NewRelationshipController";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { EditorSelection, EditorState, Range, Text } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
  keymap,
} from "@codemirror/view";
import { App, Scope } from "obsidian";
import * as React from "react";

export default function MarkdownEditorComponent({
  initialValue,
  campaign,
  className,
  onChange,
  onBlur,
  forceFocus,
}: {
  initialValue?: string;
  campaign?: ElementInterface;
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  forceFocus?: boolean;
}): React.ReactElement {
  const app: App = useApp();
  const api: RpgManagerInterface = useApi();

  const parentDivRef = React.useRef<HTMLDivElement | null>(null);

  const [value, setValue] = React.useState<string>(initialValue || "");
  const editorViewRef = React.useRef<EditorView | null>(null);
  const lastDetectedPositionRef = React.useRef<number | null>(null);
  const [scope, setScope] = React.useState<Scope | undefined>(undefined);
  const [originalScope] = React.useState<Scope>(app.scope);
  const [showRelatioshipModal, setShowRelationshipModal] =
    React.useState(false);

  const contentChangeExtension = EditorState.changeFilter.of((change) => {
    const newContent = change.state.doc.toString();

    setValue(newContent);
    if (onChange) onChange(newContent);

    return true;
  });

  const handleBlur = () => {
    if (onBlur && !showRelatioshipModal) onBlur(value);
  };

  const handleNewRelationship = () => {
    const relationshipModal = new NewRelationshipController(
      app,
      api,
      undefined,
      campaign,
      undefined,
      replaceSequenceWithModalValue,
    );
    relationshipModal.open();
  };

  const replaceSequenceWithModalValue = (replacementString: string) => {
    if (editorViewRef.current && lastDetectedPositionRef.current !== null) {
      const startPos = lastDetectedPositionRef.current;
      const editorView = editorViewRef.current;

      const nextChar =
        editorView.state.doc
          .sliceString(startPos + 1, startPos + 2)
          .toString() || "END_OF_STRING";

      let toPosition = startPos + 2;
      const specialCharacters = [" ", ",", ";", ":", "!", ".", "?", "-"];
      if (
        !specialCharacters.includes(nextChar) ||
        nextChar === "END_OF_STRING"
      ) {
        replacementString += " ";
      } else {
        toPosition -= 1;
      }

      if (nextChar === "\n") toPosition -= 1;

      toPosition = Math.min(toPosition, editorView.state.doc.length);

      const tr = editorView.state.update({
        changes: { from: startPos, to: toPosition, insert: replacementString },
      });
      editorView.dispatch(tr);

      // const endPos = startPos + replacementString.length;
      const endPos = Math.min(
        startPos + replacementString.length,
        editorView.state.doc.length,
      );

      editorView.dispatch({
        selection: { anchor: endPos, head: endPos },
        scrollIntoView: true,
      });

      lastDetectedPositionRef.current = null;
      setShowRelationshipModal(false);
    }
  };

  const doubleBracketKeyBinding = keymap.of([
    {
      key: "[",
      run: (view) => {
        setShowRelationshipModal(true);
        const cursorPos = view.state.selection.main.head;
        const beforeCursorChar = view.state.doc.sliceString(
          cursorPos - 1,
          cursorPos,
        );
        if (beforeCursorChar === "[") {
          lastDetectedPositionRef.current = cursorPos - 1;

          handleNewRelationship();
          return true;
        }
        return false;
      },
    },
  ]);

  const initializeEditor = async () => {
    if (parentDivRef.current) {
      const localScope = new Scope(app.scope);
      localScope.register(["Mod"], "b", (evt: any) => {
        evt.preventDefault();
        applyBold(editorViewRef.current!);
      });
      localScope.register(["Mod"], "i", (evt: any) => {
        evt.preventDefault();
        applyItalic(editorViewRef.current!);
      });
      app.keymap.pushScope(localScope);
      setScope(localScope);

      const view = new EditorView({
        state: EditorState.create({
          doc: value,
          extensions: [
            inlinePlugin(),
            contentChangeExtension,
            doubleBracketKeyBinding,
          ],
        }),
        parent: parentDivRef.current,
      });

      editorViewRef.current = view;

      if (forceFocus) view.focus();
    }
  };

  React.useEffect(() => {
    initializeEditor();

    return () => {
      editorViewRef.current?.destroy();

      if (scope !== undefined) app.keymap.popScope(scope);
      app.keymap.pushScope(originalScope);
    };
  }, []);

  return (
    <div
      id="rpgm-editor"
      className={`border-[--text-accent] markdown-editor-component p-3 ${className}`}
      ref={parentDivRef}
      onBlur={handleBlur}
    ></div>
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
        if (
          update.docChanged ||
          update.selectionSet ||
          update.viewportChanged
        ) {
          this.decorations = this.inlineRender(update.view);
        }
      }

      inlineRender(view: EditorView): DecorationSet {
        const decorations = findMarkdownElements(view.state.doc, view);

        const { from, to } = view.state.selection.main;
        return Decoration.set(
          decorations.filter((decoRange) => {
            const { from: decoFrom, to: decoTo } = decoRange;
            return to <= decoFrom || from >= decoTo;
          }),
        );
      }
    },
    { decorations: (v) => v.decorations },
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
  patterns: Pattern[],
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

function findMarkdownElements(
  doc: Text,
  view: EditorView,
): Range<Decoration>[] {
  const patterns = [
    {
      regex: /^(#{1})\s+(.+?)(?=\n|$)/gm,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderHeading(match, view, 1),
    },
    {
      regex: /^(#{2})\s+(.+?)(?=\n|$)/gm,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderHeading(match, view, 2),
    },
    {
      regex: /^(#{3})\s+(.+?)(?=\n|$)/gm,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderHeading(match, view, 3),
    },
    {
      regex: /\*\*((?!\*).+?)\*\*/,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderBold(match, view),
    },
    {
      regex: /\*([^*]+?)\*(?!\*)/,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderItalic(match, view),
    },
    {
      regex: /_([^_]+?)_(?!_)/,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderItalic(match, view),
    },
    {
      regex: /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
      renderWidget: (match: RegExpExecArray, view: EditorView) =>
        renderLink(match, view),
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

function isCursorInsideRange(
  selection: EditorSelection,
  start: number,
  end: number,
): boolean {
  if (
    selection.ranges[0].from === 0 &&
    selection.ranges[0].from === selection.ranges[0].to
  )
    return false;
  for (const range of selection.ranges) {
    if (range.from <= end && range.to >= start) {
      return true;
    }
  }
  return false;
}

function renderBold(
  match: RegExpExecArray,
  view: EditorView,
): Range<Decoration> {
  const el = document.createElement("strong");
  el.textContent = match[1];
  return Decoration.replace({ widget: new Widget(el) }).range(
    match.index,
    match.index + match[0].length,
  );
}

function renderItalic(
  match: RegExpExecArray,
  view: EditorView,
): Range<Decoration> {
  const el = document.createElement("em");
  el.textContent = match[1];
  return Decoration.replace({ widget: new Widget(el) }).range(
    match.index,
    match.index + match[0].length,
  );
}

function renderHeading(
  match: RegExpExecArray,
  view: EditorView,
  headingLevel: number,
): Range<Decoration> {
  const el = document.createElement("h" + headingLevel);
  el.textContent = match[2];
  el.className = "!-mt-1 !-mb-5";

  const endOffset = match[0].endsWith("\n")
    ? match.index + match[0].length - 1
    : match.index + match[0].length;

  return Decoration.replace({ widget: new Widget(el) }).range(
    match.index,
    endOffset,
  );
}

function renderLink(
  match: RegExpExecArray,
  view: EditorView,
): Range<Decoration> {
  const el = document.createElement("a");
  const linkTarget = match[1];
  const linkText = match[2] || linkTarget;

  el.setAttribute("href", linkTarget);
  el.textContent = linkText;
  el.className = "internal-link !no-underline";

  return Decoration.replace({ widget: new Widget(el) }).range(
    match.index,
    match.index + match[0].length,
  );
}

function applyBold(view: EditorView) {
  const { from, to } = view.state.selection.main;

  const changes = [
    { from, insert: "**" },
    { from: to, insert: "**" },
  ];

  const tr = view.state.update({
    changes,
    selection: { anchor: from, head: to + 4 },
  });

  view.dispatch(tr);
}

function applyItalic(view: EditorView) {
  const { from, to } = view.state.selection.main;

  const changes = [
    { from, insert: "*" },
    { from: to, insert: "*" },
  ];

  const tr = view.state.update({
    changes,
    selection: { anchor: from, head: to + 2 },
  });

  view.dispatch(tr);
}
