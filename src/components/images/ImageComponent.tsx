import * as React from "react";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { FileUploadService } from "src/services/FileUploadService";
import MarkdownComponent from "../markdowns/MarkdownComponent";

export default function ImageComponent({
	element,
	isEditable,
}: {
	element: ElementInterface;
	isEditable: boolean;
}): React.ReactElement {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const api: RpgManagerInterface = useApi();

	const goPrev = () => {
		if (currentIndex === 0) setCurrentIndex(element.images.length - 1);
		else setCurrentIndex(currentIndex - 1);
	};

	const goNext = () => {
		if (currentIndex === element.images.length - 1) setCurrentIndex(0);
		else setCurrentIndex(currentIndex + 1);
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
	};
	const handleFileDrop = (event: React.DragEvent) => {
		event.preventDefault();
		const fileUpload = new FileUploadService(app, api);
		fileUpload.uploadFileList(element, event.dataTransfer.files);
	};

	let content;

	if (element.images.length === 0) {
		if (isEditable) {
			content = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-full border-2 border-dashed p-4"
					viewBox="0 0 16 16"
					onDrop={handleFileDrop}
					onDragOver={handleDragOver}
				>
					<path
						d="m 4 1 c -1.644531 0 -3 1.355469 -3 3 v 1 h 1 v -1 c 0 -1.109375 0.890625 -2 2 -2 h 1 v -1 z m 2 0 v 1 h 4 v -1 z m 5 0 v 1 h 1 c 1.109375 0 2 0.890625 2 2 v 1 h 1 v -1 c 0 -1.644531 -1.355469 -3 -3 -3 z m -5 4 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 s 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 z m -5 1 v 4 h 1 v -4 z m 13 0 v 4 h 1 v -4 z m -4.5 2 l -2 2 l -1.5 -1 l -2 2 v 0.5 c 0 0.5 0.5 0.5 0.5 0.5 h 7 s 0.472656 -0.035156 0.5 -0.5 v -1 z m -8.5 3 v 1 c 0 1.644531 1.355469 3 3 3 h 1 v -1 h -1 c -1.109375 0 -2 -0.890625 -2 -2 v -1 z m 13 0 v 1 c 0 1.109375 -0.890625 2 -2 2 h -1 v 1 h 1 c 1.644531 0 3 -1.355469 3 -3 v -1 z m -8 3 v 1 h 4 v -1 z m 0 0"
						fill="#2e3434"
						fillOpacity="0.34902"
					/>
				</svg>
			);
		} else {
			content = <></>;
		}
	} else {
		if (isEditable) {
			content = (
				<>
					<img
						src={element.images[currentIndex].src}
						alt={element.images[currentIndex].caption}
						className="w-full h-full object-cover"
					/>
					{element.images[currentIndex].caption && (
						<div className="p-2">
							<MarkdownComponent value={element.images[currentIndex].caption} />
						</div>
					)}

					{element.images.length > 1 && (
						<>
							<div
								onClick={goPrev}
								className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer flex items-center justify-start hover:bg-gradient-to-r hover:from-black hover:to-transparent hover:opacity-100 opacity-0"
							>
								<span className="text-[--text-faint] text-6xl ml-2">&lt;</span>
							</div>

							<div
								onClick={goNext}
								className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer flex items-center justify-end hover:bg-gradient-to-l hover:from-black hover:to-transparent hover:opacity-100 opacity-0"
							>
								<span className="text-[--text-faint] text-6xl mr-2">&gt;</span>
							</div>
						</>
					)}
				</>
			);
		} else {
			content = (
				<>
					<img
						src={element.images[currentIndex].src}
						alt={element.images[currentIndex].caption}
						className="w-full h-full object-cover"
					/>
					{element.images[currentIndex].caption && (
						<div className="p-2">
							<MarkdownComponent value={element.images[currentIndex].caption} />
						</div>
					)}
				</>
			);
		}
	}

	return <div className="relative">{content}</div>;
}
