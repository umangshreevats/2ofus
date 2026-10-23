import { createClient } from "@/utils/supabase/server";
import QuizQuestionAnswer from "@/features/quiz/QuizQuestionAnswer";
import { decrypt } from "@/lib/encryption";


export default async function QuizSolvePage({ params }: { params: Promise<{ quizId?: string }>}) {


    const { quizId } = await params;

    if(!quizId) {
        alert("No quiz Id");
        return null;
    }

    const supabase = await createClient();

    const { data: quizInfo, error: quizInfoError } = await supabase
    .from("quiz")
    .select("*")
    .eq("id", quizId)
    .single();

    if(quizInfoError || !quizInfo) throw quizInfoError;

    const decryptedTitle = decrypt(quizInfo.title);

    quizInfo.title = decryptedTitle;

    return <section>
        <QuizQuestionAnswer quizInfo={quizInfo} />
    </section>
}