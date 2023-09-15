import "@testing-library/jest-dom/extend-expect";

jest.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
	}),
}));

jest.mock("@/factories/ServiceFactory");
jest.mock("@/data/classes/Element", () => ({}));
