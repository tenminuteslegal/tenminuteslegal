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

export const handleApiError = (error, status) => {
  if (status === 401) {
    const errorEvent = new CustomEvent("fetch-error", {
      detail: { status: 401, message: error.message },
    });
    window.dispatchEvent(errorEvent);
  }
  throw error;
};

// utils/authFetch.js
  export const authFetch = async (url, options = {}, onUnauthorized) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = localStorage.getItem("app_token");

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });

      if (response.status === 401) {
        // 👈 Call the provided function when unauthorized
        if (typeof onUnauthorized === "function") {
          onUnauthorized();
        }
        throw new Error("Unauthorized (401) — token invalid or expired");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      throw err;
    }
  };
