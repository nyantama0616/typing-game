import IQuestion from "./IQuestion";

export default interface IQuestionGenerator {
    getNextQuestion(): IQuestion
}
