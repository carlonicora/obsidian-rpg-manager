import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ImageInterface } from "src/data/interfaces/ImageInterface";

export default function ImageCarouselComponent({ element }: { element: ElementInterface }): React.ReactElement {
	const { t } = useTranslation();

	const carouselRef = React.useRef(null);
	const [clickedImage, setClickedImage] = React.useState<ImageInterface | null>(undefined);

	const scroll = (direction: "left" | "right") => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({
				top: 0,
				left: direction === "left" ? -200 : 200,
				behavior: "smooth",
			});
		}
	};

	return (
		<div>
			<h2 className="!m-0 !mb-6 !text-2xl !font-bold border-b border-b-[--background-modifier-border]">
				{t("gallery.carousel")}
			</h2>
			<div className="relative w-full h-48">
				{/* Previous Button */}
				<button
					onClick={() => scroll("left")}
					className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[--background-primary] p-2 rounded-full shadow-md"
				>
					&lt;
				</button>

				<div className="flex w-full overflow-x-scroll overflow-y-hidden h-48 scrollbar-hide" ref={carouselRef}>
					{element.images.map((image: ImageInterface, index: number) => (
						<div key={index} className="flex-none">
							<img
								src={image.src}
								alt={image.caption ?? "Image of " + element.name}
								className="h-full object-contain mx-2 cursor-zoom-in hover:bg-[--background-primary] hover:opacity-50"
								onClick={() => setClickedImage(image)}
							/>
						</div>
					))}
				</div>

				{/* Next Button */}
				<button
					onClick={() => scroll("right")}
					className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[--background-primary] p-2 rounded-full shadow-md"
				>
					&gt;
				</button>

				{clickedImage && (
					<div
						className="fixed top-0 left-0 p-10 w-full h-full z-[9999] flex flex-col justify-start bg-black bg-opacity-75 cursor-zoom-out"
						onClick={() => setClickedImage(undefined)}
					>
						<img src={clickedImage.src} alt={clickedImage.caption} className="max-w-full max-h-full" />
						<div className="text-white text-center text-xl mt-5">{clickedImage.caption}</div>
					</div>
				)}
			</div>
		</div>
	);
}
