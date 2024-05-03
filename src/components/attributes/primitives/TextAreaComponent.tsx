import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { NewRelationshipController } from "src/controllers/NewRelationshipController";
import { useApi } from "src/hooks/useApi";

export default function TextAreaComponent({
  initialValue,
  campaign,
  className,
  onChange,
  onBlur,
  forceFocus,
}: {
  initialValue?: string;
  campaign: ElementInterface;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  forceFocus?: boolean;
}): React.ReactElement {
  const api: RpgManagerInterface = useApi();
  const app: App = useApp();

  const [value, setValue] = React.useState<string>(initialValue || "");

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const previousValueRef = React.useRef<string>(value);
  const lastDetectedPositionRef = React.useRef<number | null>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.minHeight = "2em";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 10 + "px";
    }
  };

  React.useEffect(() => {
    resizeTextArea();
    if (forceFocus) textAreaRef.current?.focus();
  }, []);

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
    if (lastDetectedPositionRef.current !== null && textAreaRef.current) {
      const startPos = lastDetectedPositionRef.current;

      const nextChar =
        textAreaRef.current.value.charAt(startPos + 2) || "END_OF_STRING";
      const specialCharacters = [" ", ",", ";", ":", "!", ".", "?", "-"];
      const shouldAppendSpace =
        !specialCharacters.includes(nextChar) || nextChar === "END_OF_STRING";

      const appendedReplacement = shouldAppendSpace
        ? replacementString + " "
        : replacementString;

      setValue(
        (prev) =>
          prev.substring(0, startPos) +
          appendedReplacement +
          prev.substring(startPos + 2),
      );
      onChange(
        value.substring(0, startPos) +
          appendedReplacement +
          value.substring(startPos + 2),
      );

      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.selectionStart =
            startPos + appendedReplacement.length;
          textAreaRef.current.selectionEnd =
            startPos + appendedReplacement.length;
          resizeTextArea();
        }
      }, 0);

      lastDetectedPositionRef.current = null;
    }
  };

  const updateValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;

    const position = event.target.selectionStart;
    const lastTwoChars = currentValue.slice(position - 2, position);

    if (lastTwoChars === "[[") {
      lastDetectedPositionRef.current = position - 2;
      handleNewRelationship();
    }

    setValue(currentValue);
    onChange(currentValue);
    resizeTextArea();

    previousValueRef.current = currentValue;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { selectionStart, selectionEnd } = textAreaRef.current;
    if (selectionStart === selectionEnd) return;

    if (
      (event.metaKey || event.ctrlKey) &&
      (event.key === "b" || event.key === "i")
    ) {
      if (event.key === "b") {
        const end = textAreaRef.current.selectionEnd;
        textAreaRef.current.value =
          textAreaRef.current.value.substring(
            0,
            textAreaRef.current.selectionStart,
          ) +
          "**" +
          textAreaRef.current.value.substring(
            textAreaRef.current.selectionStart,
            textAreaRef.current.selectionEnd,
          ) +
          "**" +
          textAreaRef.current.value.substring(textAreaRef.current.selectionEnd);
        textAreaRef.current.selectionStart = end + 5;
        textAreaRef.current.selectionEnd = end + 5;
      }

      if (event.key === "i") {
        const end = textAreaRef.current.selectionEnd;
        textAreaRef.current.value =
          textAreaRef.current.value.substring(
            0,
            textAreaRef.current.selectionStart,
          ) +
          "*" +
          textAreaRef.current.value.substring(
            textAreaRef.current.selectionStart,
            textAreaRef.current.selectionEnd,
          ) +
          "*" +
          textAreaRef.current.value.substring(textAreaRef.current.selectionEnd);
        textAreaRef.current.selectionStart = end + 2;
        textAreaRef.current.selectionEnd = end + 2;
      }

      setValue(textAreaRef.current.value);
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className={className ?? ""}
      value={value}
      onKeyDown={handleKeyDown}
      onChange={(event) => {
        updateValue(event);
      }}
      onBlur={() => {
        onBlur && onBlur(value);
      }}
    />
  );
}
