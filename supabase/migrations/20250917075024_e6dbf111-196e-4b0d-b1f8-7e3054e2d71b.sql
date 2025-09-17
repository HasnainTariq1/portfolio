-- Create profile table
CREATE TABLE public.profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  hero_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about table
CREATE TABLE public.about (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  traits TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skill_categories table
CREATE TABLE public.skill_categories (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  proficiency INTEGER NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_info table
CREATE TABLE public.contact_info (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'social')),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Allow public read access" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.about FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.contact_info FOR SELECT USING (true);

-- Messages table policies - public can insert, authenticated users can read
CREATE POLICY "Allow public insert" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.messages FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin policies for authenticated users (assumes admin authentication)
CREATE POLICY "Allow authenticated users to modify profile" ON public.profile FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to modify about" ON public.about FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to modify skill_categories" ON public.skill_categories FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to modify skills" ON public.skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to modify projects" ON public.projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to modify contact_info" ON public.contact_info FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to modify messages" ON public.messages FOR ALL USING (auth.uid() IS NOT NULL);