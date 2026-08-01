import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
// Intentionally NOT importing the generated `attachSupabaseAuth`: it statically
// imports the Supabase client into the initial bundle. The lazy equivalent below
// attaches the same bearer token.
import { attachSupabaseAuthLazy } from "@/lib/supabase-auth";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuthLazy],
  requestMiddleware: [errorMiddleware],
}));
