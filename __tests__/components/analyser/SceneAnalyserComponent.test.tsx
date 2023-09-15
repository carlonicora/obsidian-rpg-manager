import { ServiceFactory } from "@/factories/ServiceFactory";
import { render, screen } from "@testing-library/react";
import { mockSession1 } from "__mocks__/data/classes/Element";
import React from "react";
import SceneAnalyserComponent from "src/components/analyser/SceneAnalyserComponent";

describe("Scene Analyser Component", () => {
	test("displays a score of 9 as error", () => {
		const mockElement = mockSession1;

		(ServiceFactory.createSceneAnalyserService as jest.Mock).mockReturnValue({
			analyseSession: () => ({
				score: 9,
			}),
		});

		render(<SceneAnalyserComponent element={mockElement} />);

		const scoreElement = screen.getByText("9%");
		expect(scoreElement).toHaveClass("text-[--text-error]");
	});

	test("displays a score of 53 as warning", () => {
		const mockElement = mockSession1;

		(ServiceFactory.createSceneAnalyserService as jest.Mock).mockReturnValue({
			analyseSession: () => ({
				score: 53,
			}),
		});

		render(<SceneAnalyserComponent element={mockElement} />);

		const scoreElement = screen.getByText("53%");
		expect(scoreElement).toHaveClass("text-[--text-warning]");
	});

	test("displays a score of 89 as success", () => {
		const mockElement = mockSession1;

		(ServiceFactory.createSceneAnalyserService as jest.Mock).mockReturnValue({
			analyseSession: () => ({
				score: 89,
			}),
		});

		render(<SceneAnalyserComponent element={mockElement} />);

		const scoreElement = screen.getByText("89%");
		expect(scoreElement).toHaveClass("text-[--text-success]");
	});

	test("displays an activity score of 11 as error", () => {
		const mockElement = mockSession1;

		(ServiceFactory.createSceneAnalyserService as jest.Mock).mockReturnValue({
			analyseSession: () => ({
				activity: 11,
			}),
		});

		render(<SceneAnalyserComponent element={mockElement} />);

		screen.getByText("analyser.activity: 11%");
	});

	it("renders correctly for a given analysis score", () => {
		const mockElement = mockSession1;

		(ServiceFactory.createSceneAnalyserService as jest.Mock).mockReturnValue({
			analyseSession: () => ({
				score: 70,
				expectedDuration: 3600,
				activity: 30,
				excitement: 20,
				interest: 40,
				variety: 50,
			}),
		});

		render(<SceneAnalyserComponent element={mockElement} />);

		expect(screen.getByText("analyser.sceneanalyser")).toBeInTheDocument();
		expect(screen.getByText("70%")).toBeInTheDocument();
		expect(screen.getByText("1h 00'")).toBeInTheDocument();
	});
});
