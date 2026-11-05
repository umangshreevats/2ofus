import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth";


// DELETE: /api/auth
export async function DELETE() {
  try {
    // Verify the currently authenticated user
    const { user } = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Optional: collect storage paths before deletion.
    // Database cascades do not delete Supabase Storage objects.

    // Delete the authenticated user using the Admin API
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (error) {
      console.error("Account deletion error:", error);

      return NextResponse.json(
        { message: "Failed to delete account" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete account route error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}