import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenshootButton } from "./ScreenshotButton";
 

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested : () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {

    const [screenshot, setScreenshot] = useState<String | null>(null)
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);


    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            comment: comment,
            screenshot: screenshot
        });

        setIsSendingFeedback(false);
        onFeedbackSent();
    }



    return (
        <>
            <header>

                <button 
                type="button" 
                className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4"></ArrowLeft></button>

                <span className="text-xl leading-6 flex items-center gap-2">{feedbackTypeInfo.title}
                    <img className="w-6 h-6" src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                </span>
                <CloseButton />
            </header>

           <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>

                <textarea className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" 
                placeholder="Conte com detalhes o que esta acontecendo..."
                onChange={event => setComment(event.target.value)}
                ></textarea>

                <footer className="flex gap-2 mt-2">

                    <ScreenshootButton
                        screenshot = {screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                    disabled={comment.length === 0 || isSendingFeedback } 
                    type="submit"
                    className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                        {isSendingFeedback ? <Loading /> : "Enviar feedback"}
                    </button>

                </footer>

           </form>

        </>

    )

}