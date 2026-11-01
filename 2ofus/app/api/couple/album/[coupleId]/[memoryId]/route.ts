// import { getCurrentUser } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";




// export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ coupleId?: string, memoryId?: string}> }) => {


//     try {

//         const { user } = await getCurrentUser();
        
        
//         if(!user) {
//             return NextResponse.json(
//                 { message: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         const { coupleId, memoryId } = await params;

//         if(!coupleId) {
//             return NextResponse.json(
//                 { message: "Couple Id is required" },
//                 { status: 400 }
//             );
//         }

//         if(!memoryId) {
//             return NextResponse.json(
//                 { message: "Memory Id is required" },
//                 { status: 400 }
//             );
//         }


//         const body = await request.json();


//         const { pin } = body;


//         if(pin) {
//             await update
//         }

//     }
// }