"use server";

import { createClient } from "@/utils/supabase/server";

export async function Logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout failed:", error.message);
  }
}
