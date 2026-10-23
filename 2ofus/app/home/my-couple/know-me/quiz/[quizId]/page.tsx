

export default async function QuizSolvePage({ params }: { params: Promise<{ quizId?: string }>}) {


    const { quizId } = await params;

    if(!quizId) {
        alert("No quiz Id");
        return null;
    }

    return <section>
        This is quiz solve page
    </section>
}