import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { calculateQuizScore } from "@/lib/quiz/calculateQuizScore";
import { encrypt } from "@/lib/encryption";


// PATCH: /api/couple/quiz/:coupleId/:quizId/submit
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ coupleId?: string, quizId?: string }> }) {

    try {

        const { user } = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { coupleId, quizId } = await params;


        if (!coupleId) {
            return NextResponse.json(
                { message: "Bad Request: Couple Id is required" },
                { status: 400 }
            );
        }

        if (!quizId) {
            return NextResponse.json(
                { message: "Bad Request: Quiz Id is required" },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const body = await request.json();

        const { quizQuestions } = body;

        if (!Array.isArray(quizQuestions)) {
            return NextResponse.json(
                { message: "Invalid quiz questions" },
                { status: 400 }
            );
        }

        // Verify couple membership
        const { data: couple, error: coupleError } = await supabase
            .from("couples")
            .select("partner_1, partner_2")
            .eq("id", coupleId)
            .single();

        if (
            coupleError ||
            !couple ||
            (couple.partner_1 !== user.id && couple.partner_2 !== user.id)
        ) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        // Fetch quiz
        const { data: quiz, error: quizError } = await supabase
            .from("quiz")
            .select("id, status, conductor_id")
            .eq("id", quizId)
            .eq("couple_id", coupleId)
            .single();

        if (quizError || !quiz) {
            return NextResponse.json(
                { message: "Quiz not found" },
                { status: 404 }
            );
        }

        // Conductor cannot attempt their own quiz
        if (quiz.conductor_id === user.id) {
            return NextResponse.json(
                { message: "You cannot attempt your own quiz" },
                { status: 403 }
            );
        }

        if (quiz.status === "attempted") {
            return NextResponse.json(
                { message: "Quiz has already been attempted" },
                { status: 409 }
            );
        }

        // Calculation of the score and saving the answer
        const { evaluatedQuestions, overallScore } = calculateQuizScore(quizQuestions);


        const updatedQuiz = await Promise.all(
            evaluatedQuestions.map(async (question) => {

                const encryptedAnsweredOptions = question.answered_options ? encrypt(JSON.stringify(question.answered_options)) : null;

                const encryptedGiventAnswers = question.given_answer ? encrypt(question.given_answer) : null;

                const { data: quizQuestionUpdate, error: quizQuestionUpdateError } = await supabase
                    .from("quiz_questions")
                    .update({
                        answered_options: encryptedAnsweredOptions,
                        given_answer: encryptedGiventAnswers,
                        score: question.score
                    })
                    .eq("id", question.quizQuestionId)
                    .select();

                if (quizQuestionUpdateError) {
                    console.error(quizQuestionUpdateError);
                    return NextResponse.json({
                        message: "Internal Server Error: Error Saving Quiz Questions",
                        quizQuestionUpdateError
                    });
                }

                return quizQuestionUpdate ?? {};
            })
        );


        const { data: quizUpdate, error: quizUpdateError } = await supabase
            .from("quiz")
            .update({
                overall_score: overallScore,
                status: "attempted"
            })
            .eq("id", quizId)
            .select()
            .single();

        if (quizUpdateError) {
            console.error(quizUpdateError);
            return NextResponse.json({
                message: "Internal Server Error: Error Saving Quiz",
                quizUpdateError
            });
        }

        return NextResponse.json({
            message: "Success",
            updatedQuiz,
            quizUpdate
        }, {
            status: 200
        });
    } catch (err) {
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        })
    }
}