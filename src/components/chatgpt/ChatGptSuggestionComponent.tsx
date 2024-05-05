import * as React from "react";
import { useTranslation } from "react-i18next";

export default function ChatGptSuggestionComponent({
  generateSuggestions,
  applySuggestions,
}: {
  generateSuggestions: () => Promise<string[]>;
  applySuggestions: (suggestion: string) => void;
}): React.ReactElement {
  const { t } = useTranslation();

  const [suggestions, setSuggestions] = React.useState<string[] | undefined>(
    undefined,
  );

  const selectSuggestion = (suggestion: string) => {
    applySuggestions(suggestion);
  };

  const requestSuggestions = async () => {
    setSuggestions(undefined);
    const providedSuggestions = await generateSuggestions();
    setSuggestions(providedSuggestions);
  };

  return (
    <div className="!mt-3 p-3 grid grid-cols-1 rounded-md border border-[--background-modifier-border]">
      <div>
        <button className="rpgm-secondary !m-0" onClick={requestSuggestions}>
          {t("chatgpt.generate")}
        </button>
      </div>
      {suggestions && (
        <>
          {suggestions.map((suggestion: string, index: number) => {
            return (
              <div
                key={index}
                className="rounded-md border border-[--background-modifier-border] m-2 p-1 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
