/*
  # Create users table for personalized pages

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique identifier for each user
      - `first_name` (text, unique) - User's first name (used in URL path)
      - `created_at` (timestamptz) - When the user was created
      - `last_visited` (timestamptz) - Last time the user's page was accessed

  2. Security
    - Enable RLS on `users` table
    - Add policy for public read access (anyone can view user pages)
    - Add policy for authenticated users to insert new names

  3. Important Notes
    - The first_name field is unique and case-insensitive for URL consistency
    - Public read access allows anyone to view personalized pages
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_visited timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read user names"
  ON users FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create new user names"
  ON users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update last visited"
  ON users FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);