import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)


describe('Submit Feedback', () => {

    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'Example',
            screenshot: 'data:image/png;base64,dsadsad'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a comment without type', async () => {
        await expect(submitFeedback.execute({
            type: 'teste',
            comment: '',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();

    });


});

describe('Submit Feedback', () => {
});


describe('Submit Feedback', () => {

});