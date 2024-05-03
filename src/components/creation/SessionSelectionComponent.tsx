import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function SessionSelectionComponent({
  sessions,
  setSession,
}: {
  sessions: ElementInterface[];
  setSession: (session: ElementInterface) => void;
}): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="max-w-md mb-3">
      <div>{t("session", { count: 1 })}</div>
      <div>
        <select
          onChange={(e) => {
            const session = sessions.find(
              (session: ElementInterface) => session.id === e.target.value,
            );
            setSession(session);
          }}
          className="w-full"
        >
          {sessions.length > 1 && <option value=""></option>}
          {sessions.map((session: ElementInterface) => (
            <option key={session.id} value={session.id}>
              {session.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
