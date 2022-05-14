import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshootButtonProps {
    screenshot: String | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshootButton({ screenshot, onScreenshotTook }: ScreenshootButtonProps) {
    const [isTakingScreenshot, setIsTakingSreenshot] = useState(false);

    async function handleTakeScreenshot() {

        setIsTakingSreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL("image/png");

        onScreenshotTook(base64image);
        setIsTakingSreenshot(false);

    }

    if (screenshot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={ () =>   onScreenshotTook(null) }
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
            >
                <Trash weight="fill"></Trash>
            </button>
        );
    }

    return (

        <button
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:offset-zinc-900 focus:ring-brand-500"
            onClick={handleTakeScreenshot}
        >

            {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6"></Camera>}


        </button>


    )


}

