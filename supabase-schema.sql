-- Create the inquiries table
CREATE TABLE public.inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  product_ids text -- Optional, to store comma-separated IDs from the multi-select
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so people can submit forms without logging in)
CREATE POLICY "Allow anonymous inserts" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Allow anyone with the key to read inquiries for the admin dashboard
-- In a production app, you should restrict this with a service role key or Supabase Auth
CREATE POLICY "Allow reading inquiries" ON public.inquiries
  FOR SELECT USING (true);
