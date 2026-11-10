import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "@/lib/auth";






// DELETE /api/couple/quiz/:coupleId/:quizId
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ coupleId?: string, quizId?: string }> }) {


    try {

        const { user, coupleData } = await getCurrentUser();

        if(!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        if(!coupleData) {

            return NextResponse.json(
                { message: "Couple Data is required" },
                { status: 400 }
            );
        }


        const { coupleId, quizId } = await params;

        if(!coupleId) {
            return NextResponse.json(
                { message: "Couple id is required" },
                { status: 400 }
            );
        }

        if(!quizId) {
            return NextResponse.json(
                { message: "Quiz Id is required" },
                { status: 400 }
            );
        }

        if(coupleData.id !== coupleId) {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const supabase = await createClient();

        const { data: quiz, error: quizError } = await supabase
        .from("quiz")
        .select("*")
        .eq("id", quizId)
        .eq("couple_id", coupleId)
        .single();

        if(quizError) {
            return NextResponse.json(
                { message: "Error reading quiz properties" },
                { status: 500 }
            );
        }

        if(!quiz) {
            return NextResponse.json(
                { messsage: "Quiz not found" },
                { status: 404 }
            );
        }


        if(quiz.conductor_id !== user.id) {

            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const { error: deleteQuizQuestionsError } = await supabase
        .from("quiz_questions")
        .delete()
        .eq("quiz_id", quizId);


        if(deleteQuizQuestionsError) {

            return NextResponse.json(
                { message: "Error deleting quiz questions" },
                { status: 500 }
            );
        }


        const { data: deleteQuiz, error: deleteQuizError } = await supabase
        .from("quiz")
        .delete()
        .eq("id", quizId)
        .eq("couple_id", coupleId)
        .select("id")

        if(deleteQuizError || !deleteQuiz) {

            return NextResponse.json(
                { message: "Error deleting quiz" },
                { status: 500 }
            );
        }


        return NextResponse.json(
            { message: "Quiz deleted successfully" },
            { status: 200 }
        );
    } catch (err) {

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}