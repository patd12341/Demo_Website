/*
  # Create Phone Requests Table

  1. New Tables
    - `phone_requests`
      - `id` (uuid, primary key) - Unique identifier for each request
      - `phone_number` (text, not null) - User's phone number
      - `name` (text) - Optional user name
      - `created_at` (timestamptz) - When the request was made
      - `status` (text) - Status of the request (pending, contacted, completed)
  
  2. Security
    - Enable RLS on `phone_requests` table
    - Add policy for anonymous users to insert their own requests
    - Add policy for authenticated users to view all requests
*/

CREATE TABLE IF NOT EXISTS phone_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  name text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE phone_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert phone requests"
  ON phone_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all requests"
  ON phone_requests
  FOR SELECT
  TO authenticated
  USING (true);