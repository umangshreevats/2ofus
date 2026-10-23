import QuizfeaturePage from "@/features/couple-page/QuizFeaturePage"
import { getCurrentUser } from "@/lib/auth"
import { createClient } from "@/utils/supabase/server"
import { decrypt } from "@/lib/encryption";

export default async function QuizPage() {

    const { coupleData } = await getCurrentUser();
    const supabase = await createClient();


    const { data: quizes, error: quizesError } = await supabase
        .from("quiz")
        .select("*")
        .eq("couple_id", coupleData.id)
        .limit(4);

    if (quizesError || !quizes) {
        throw quizesError;
    }

    const updatedQuizes = await Promise.all(
        (quizes ?? []).map(async (quiz) => {

            const decryptedTitle = decrypt(quiz.title);

            return {
                ...quiz,
                title: decryptedTitle
            }
        })
    );


    return <section>
        <QuizfeaturePage quizes={updatedQuizes} />
    </section>
}