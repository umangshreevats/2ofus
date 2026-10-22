import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { encrypt, decrypt } from "@/lib/encryption";


// POST: /api/couple/quiz/:coupleId
/*
Quiz:
id: UUID,
couple_id: UUID REF: couples,
conductor_id: UUID REF: users,
conductor: TEXT REF: users(username),
title: TEXT NOT NULL,
questions: INTO MAX 10,
status: "created" | "attempted",
created_at: TIMESTAMPTZ,
updated_at: TIMESTAMPTZ,
overall_score: NUMBER 1 - 100
*/

export async function POST(request: NextRequest, { params }: { params: Promise<{ coupleId?: string }> }) {


    try {
        const { user, userData } = await getCurrentUser();

        if (!user) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { coupleId } = await params;

        if (!coupleId) {

            return NextResponse.json(
                { message: "Bad Request: Couple Id is required" },
                { status: 404 }
            );
        }
        const supabase = await createClient();

        const body = await request.json();

        const { title, questions } = body;

        if (!title || !questions || questions.length === 0) {
            return NextResponse.json(
                { message: "Bad Request: One or more filed for creating quiz are empty!" },
                { status: 404 }
            );
        }

        if (questions.length > 10) {
            return NextResponse.json(
                { message: "Bad Request: Only upto questions per quiz!" },
                { status: 404 }
            );
        }

        // encrypting the title of the quiz
        const encryptedTitle = encrypt(title);


        // Creating the quiz, default status: created 
        const { data: quizData, error: quizError } = await supabase
        .from("quiz")
        .insert({
            title: encryptedTitle,
            couple_id: coupleId,
            conductor: userData.username,
            conductor_id: user.id,
            questions: questions.length,
            overall_score: 0,
            status: "created"
        }).select().single();

        if(quizError) {
            return NextResponse.json(
                { message: "Something went wrong while creating quiz" },
                { status: 500 }
            );
        }

        // Saving all the questions in quiz_questions
        let index: number = 1;
        for (const question of questions) {
            if (
                typeof question !== "object" ||
                question === null ||
                typeof question.question !== "string" ||
                !["short-answer", "multi-choice", "multi-select"].includes(question.type)
            ) {
                return NextResponse.json(
                    { message: "Bad Request: Invalid question data!" },
                    { status: 400 }
                );
            }

            if (!question.question.trim()) {
                return NextResponse.json(
                    { message: "Question cannot be empty!" },
                    { status: 400 }
                );
            }

            if (question.type === "short-answer") {
                if (typeof question.writtenAnswer !== "string") {
                    return NextResponse.json(
                        { message: "Invalid written answer!" },
                        { status: 400 }
                    );
                }
            }

            if (
                question.type === "multi-choice" ||
                question.type === "multi-select"
            ) {
                if (
                    !Array.isArray(question.options) ||
                    question.options.length !== 4 ||
                    question.options.some((option: unknown) => typeof option !== "string" || !option.trim())
                ) {
                    return NextResponse.json(
                        { message: "All four options must be provided!" },
                        { status: 400 }
                    );
                }

                if (question.type === "multi-choice") {
                    if (
                        typeof question.correctOptions !== "string" ||
                        !question.options.includes(question.correctOptions)
                    ) {
                        return NextResponse.json(
                            { message: "Select one valid correct answer!" },
                            { status: 400 }
                        );
                    }
                }

                if (question.type === "multi-select") {
                    if (
                        !Array.isArray(question.correctOptions) ||
                        question.correctOptions.length === 0 ||
                        question.correctOptions.some(
                            (option: unknown) => !question.options!.includes(option)
                        )
                    ) {
                        return NextResponse.json(
                            { message: "Select at least one valid correct answer!" },
                            { status: 400 }
                        );
                    }
                }

                // Encrypting all the answers and options
                const encryptedQuestion = encrypt(question.question);
                const encryptedWrittenAnswer = encrypt(question.writtenAnswer ?? "");

                const encryptedOptions = question.options
                    ? encrypt(JSON.stringify(question.options))
                    : null;

                const encryptedCorrectOptions = question.correctOptions
                    ? encrypt(JSON.stringify(question.correctOptions))
                    : null;

                // Saving the question along with number
                const { error: questionStoringError } = await supabase
                    .from("quiz_questions")
                    .insert({
                        quiz_id: quizData.id,
                        question_number: index++,
                        question: encryptedQuestion,
                        question_type: question.type,
                        answer_options: encryptedOptions,
                        correct_options: encryptedCorrectOptions,
                        written_answer: encryptedWrittenAnswer
                    });

                if (questionStoringError) {
                    return NextResponse.json(
                        { message: "Failed to store quiz question." },
                        { status: 500 }
                    );
                }
            }

            return NextResponse.json(
                { message: "Quiz created successfully", quizData },
                { status: 201 }
            );
        }

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}