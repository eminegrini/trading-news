
'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
export function getBrowserSupabase(){ return createClientComponentClient() }
