import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = 'https://rbicvnanaimaaqsidydc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaWN2bmFuYWltYWFxc2lkeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxODQwMjcsImV4cCI6MjA0OTc2MDAyN30.sCSiVCOKTzsxSUve427TZsX5NF3es9yQeStPHFv1_Ew'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)