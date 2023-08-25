import { ServiceFactory } from "@/factories/ServiceFactory";
import { render, screen } from "@testing-library/react";
import { mockSession1 } from "__mocks__/data/classes/Element";
import React from "react";
import SceneAnalyserComponent from "src/components/analyser/SceneAnalyserComponent";

describe("Scene Analyser Component", () => {
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
