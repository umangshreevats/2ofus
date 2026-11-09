import { createClient } from "@/utils/supabase/server";
import QuizQuestionAnswer from "@/features/quiz/QuizQuestionAnswer";
import { decrypt } from "@/lib/encryption";


export default async function QuizSolvePage({ params }: { params: Promise<{ quizId?: string }>}) {


    const { quizId } = await params;

    if(!quizId) {
        throw new Error("No quiz Id");
    }

    const supabase = await createClient();


    // Quiz Information fetching
    const { data: quizInfo, error: quizInfoError } = await supabase
    .from("quiz")
    .select("*")
    .eq("id", quizId)
    .single();

    if(quizInfoError || !quizInfo) throw quizInfoError;

    const decryptedTitle = decrypt(quizInfo.title);

    quizInfo.title = decryptedTitle;


    // Quiz Questions and Answers information fetching
    const { data: quizQuestions, error: quizQuestionsError } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId);

    if(quizQuestionsError || !quizQuestions) throw quizQuestionsError;


    const updatedQuizQuestions = quizQuestions.map((quizQuestion) => {

        //decrypting the quiz questions
        const decryptedQuestion = decrypt(quizQuestion.question);
        let decryptedWrittenAnswer = null;
        let decryptedAnswerOptions = null;
        let decryptedCorrectOptions = null;
        if(quizQuestion.written_answer) {
            decryptedWrittenAnswer = decrypt(quizQuestion.written_answer);
        }

        if(quizQuestion.answer_options) {
            decryptedAnswerOptions = decrypt(quizQuestion.answer_options);
        }

        if(quizQuestion.correct_options) {
            decryptedCorrectOptions = decrypt(quizQuestion.correct_options);
        }

        return {
            ...quizQuestion,
            question: decryptedQuestion,
            written_answer: decryptedWrittenAnswer,
            answer_options: decryptedAnswerOptions ? JSON.parse(decryptedAnswerOptions) : null,
            correct_options: decryptedCorrectOptions ? JSON.parse(decryptedCorrectOptions) : null,
        }
    });

    console.log(updatedQuizQuestions);


    return <section>
        <QuizQuestionAnswer quizInfo={quizInfo} quizQuestions={updatedQuizQuestions} />
    </section>
}