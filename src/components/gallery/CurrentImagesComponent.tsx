import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ImageInterface } from "src/data/interfaces/ImageInterface";

export default function CurrentImagesComponent({
	element,
	setCurrentImage,
}: {
	element: ElementInterface;
	setCurrentImage: (currentImage: ImageInterface) => void;
}): React.ReactElement {
	return (
		<div className="flex flex-wrap justify-center">
			{element.images.map((image, index) => (
				<div
					key={index}
					className="m-1 w-48 h-48 overflow-hidden cursor-pointer"
					onClick={() => setCurrentImage(image)}
				>
					<img src={image.src} alt={image.caption} className="min-w-full min-h-full object-cover rounded-lg" />
				</div>
			))}
		</div>
	);
}
