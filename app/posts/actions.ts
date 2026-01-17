"use server";

import { revalidatePath, revalidateTag } from "next/cache";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
    : "http://localhost:3000";
};

export async function getPosts() {
  const res = await fetch(`${getBaseUrl()}/api/posts`, {
    next: { tags: ["posts"] }
  });

  if (!res.ok) return [];
  return res.json();
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;

  const res = await fetch(`${getBaseUrl()}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Falha ao criar post");
  }

  revalidatePath("/posts");
  revalidateTag("posts", "max");
}
