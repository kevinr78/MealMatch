import { toast } from "react-toastify";
function getBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  } else if (import.meta.env.NODE_ENV === "production") {
    return window.location.origin;
  } else {
    return "http://localhost:3000";
  }
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const response = await res.json();
    toast.error(
      response.error.message ||
        response.error.reason ||
        "An error occurred while fetching data"
    );
    /*  throw new Error(error.message || "An error occurred while fetching data"); */
  }

  return res.json();
}
