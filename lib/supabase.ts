import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const service = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE as string;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
if (!url) throw new Error("Falta SUPABASE_URL");
if (!service) throw new Error("Falta SUPABASE_SERVICE_ROLE");
export const supaService = createClient(url, service, {
  auth: { persistSession: false },
  global: {
    fetch: (...args: any) => fetch(...(args as [RequestInfo, RequestInit])),
  },
});
export const supaAnon = anon
  ? createClient(url, anon, {
      auth: { persistSession: false },
      global: {
        fetch: (...args: any) => fetch(...(args as [RequestInfo, RequestInit])),
      },
    })
  : null;
