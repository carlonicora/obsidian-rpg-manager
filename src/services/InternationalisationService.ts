import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { i18nEng } from "src/i18n/eng/eng";

export class InternationalisationService {
	static async loadSettings(): Promise<void> {
		i18n
			.use(initReactI18next)
			.use(I18nextBrowserLanguageDetector)
			.init({
				initImmediate: false,
				lng: window.localStorage.getItem("language"),
				fallbackLng: "en",
				debug: true,
				interpolation: {
					escapeValue: false,
				},
				ns: ["common"],
				defaultNS: "common",
				resources: {},
			});

		i18n.addResourceBundle("en", "common", i18nEng);
	}
}
