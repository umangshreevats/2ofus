import QuizfeaturePage from "@/features/couple-page/QuizFeaturePage"
import { getCurrentUser } from "@/lib/auth"
import { createClient } from "@/utils/supabase/server"
import { decrypt } from "@/lib/encryption";

export default async function QuizPage() {

    const { user, coupleData } = await getCurrentUser();
    const quizCategory: ("user" | "created" | "attempted")[] = ["user", "created", "attempted"];
    const supabase = await createClient();

    let quizes = null;

    const fetchData = async (category: "user" | "created" | "attempted") => {


        if (category === "created" || category === "attempted") {
            const { data: quizes, error: quizesError } = await supabase
                .from("quiz")
                .select("*")
                .eq("couple_id", coupleData.id)
                .eq("status", category)
                .limit(5)
                .order("created_at", { ascending: false });

            if (quizesError || !quizes) {
                throw quizesError;
            }
            return quizes;
        }

        const { data: quizes, error: quizesError } = await supabase
            .from("quiz")
            .select("*")
            .eq("couple_id", coupleData.id)
            .eq("conductor_id", user?.id)
            .limit(5)
            .order("created_at", { ascending: false });

        if (quizesError || !quizes) {
            throw quizesError;
        }
        return quizes;
    }


    const allQuizes = await Promise.all(
        quizCategory.map(async (category) => {
            const quizData = await fetchData(category);

            return quizData;
        })
    );

    quizes = allQuizes.flat();

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