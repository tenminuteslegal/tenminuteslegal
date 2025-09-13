import { supabase } from "./supabaseClient";

export async function createProfileIfNotExists() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(user)

  // const {
  //   data: { Auser },

  // } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

    // console.log(data)
    console.log(profile)
  console.log("Role:", profile.role); // "user" or "admin"

  if (error) {
    console.error("Get user error:", error.message);
    return;
  }

  if (user) {
    await supabase.from("public.profiles").upsert({
      id: user.id, // UUID from auth.users
      email: user.email,
      role: "admin",
    });
  }
  console.log("User profile ensured in database.", user);
}

export const fetchArticles = async () => {
  const { data, error } = await supabase.from("articles").select("*");
  console.log("Fetched articles:", data);
  // console.log("Fetch error:", error);

  if (error) {
    console.error("Error fetching articles:", error.message);
    return [];
  }

  return data;
};

export const fetchUserRole = async () => {
  const { data, error } = await supabase.from("profiles").select("role");
  console.log("Fetched user role:", data);
  // console.log("Fetch error:", error);

  if (error) {
    console.error("Error fetching user role:", error.message);
    return [];
  }

  return data;
};
