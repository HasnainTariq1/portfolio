-- Portfolio Database Schema
-- Run this in your Supabase SQL editor to set up the database tables

-- Profile table for hero section
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  hero_image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About table for about section content
CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  traits TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact info table for contact details and social links
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  type VARCHAR(10) CHECK (type IN ('contact', 'social')),
  label VARCHAR(100) NOT NULL,
  value VARCHAR(255) NOT NULL,
  href VARCHAR(500) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  image_url VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data
INSERT INTO profile (name, title, description) VALUES 
('Hasnain', 'Full Stack Developer', 'Crafting beautiful, functional web experiences with modern technologies. Passionate about clean code and innovative solutions.') 
ON CONFLICT DO NOTHING;

INSERT INTO about (content, traits) VALUES 
('I''m a passionate full stack developer with over 5 years of experience creating digital solutions that make a difference. My journey in tech started with a curiosity for problem-solving and has evolved into a career dedicated to building beautiful, functional applications.

I specialize in modern web technologies and love working with React, Node.js, and cloud platforms. When I''m not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.', 
'{"Problem Solving", "Team Collaboration", "Continuous Learning", "Innovation"}')
ON CONFLICT DO NOTHING;

INSERT INTO contact_info (type, label, value, href, icon, order_index) VALUES 
('contact', 'Email', 'Hasnain@example.com', 'mailto:Hasnain@example.com', 'Mail', 0),
('contact', 'Phone', '+92 (310) 840-8796', 'tel:+923108408796', 'Phone', 1),
('contact', 'Location', 'Karachi, Pakistan', '#', 'MapPin', 2),
('social', 'GitHub', 'GitHub', 'https://github.com', 'Github', 0),
('social', 'LinkedIn', 'LinkedIn', 'https://linkedin.com', 'Linkedin', 1),
('social', 'Twitter', 'Twitter', 'https://twitter.com', 'Twitter', 2)
ON CONFLICT DO NOTHING;

-- Insert sample skill categories and skills
INSERT INTO skill_categories (title, order_index) VALUES 
('Frontend', 0),
('Backend', 1),
('Tools & Cloud', 2)
ON CONFLICT DO NOTHING;

INSERT INTO skills (category_id, name, proficiency, order_index) VALUES 
(1, 'React', 4, 0),
(1, 'TypeScript', 4, 1),
(1, 'Next.js', 4, 2),
(1, 'Tailwind CSS', 5, 3),
(2, 'Node.js', 4, 0),
(2, 'Python', 3, 1),
(2, 'PostgreSQL', 4, 2),
(3, 'Docker', 3, 0),
(3, 'AWS', 3, 1),
(3, 'Git', 5, 2)
ON CONFLICT DO NOTHING;

INSERT INTO projects (title, description, technologies, github_url, live_url, featured, order_index) VALUES 
('E-Commerce Platform', 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.', '{"React", "Node.js", "PostgreSQL", "Stripe", "AWS"}', '#', '#', true, 0),
('Task Management App', 'Collaborative project management tool with real-time updates, team chat, and advanced analytics.', '{"Next.js", "TypeScript", "Prisma", "Socket.io", "Tailwind"}', '#', '#', true, 1)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) - Important for Supabase
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to portfolio data
CREATE POLICY "Public read access for profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read access for about" ON about FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read access for skill_categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);

-- Allow anyone to insert messages (contact form)
CREATE POLICY "Allow insert for messages" ON messages FOR INSERT WITH CHECK (true);

-- Admin policies - authenticated users can manage all content
CREATE POLICY "Authenticated users full access to profile" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access to about" ON about FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access to contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access to skill_categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access to skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access to projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access to messages" ON messages FOR ALL USING (auth.role() = 'authenticated');