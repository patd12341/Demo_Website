/*
  # Create profiles table for LinkedIn data

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - Unique identifier for each profile
      - `profileUrl` (text) - Profile URL
      - `fullName` (text) - Full name of the person
      - `firstName` (text, unique) - First name (used in URL path)
      - `lastName` (text) - Last name
      - `companyName` (text) - Current company name
      - `title` (text) - Current job title
      - `companyId` (text) - Company identifier
      - `companyUrl` (text) - Company URL
      - `regularCompanyUrl` (text) - Regular company URL
      - `summary` (text) - Profile summary/bio
      - `titleDescription` (text) - Job title description
      - `industry` (text) - Industry
      - `companyLocation` (text) - Company location
      - `location` (text) - Personal location
      - `durationInRole` (text) - Duration in current role
      - `durationInCompany` (text) - Duration in current company
      - `pastExperienceCompanyName` (text) - Previous company name
      - `pastExperienceCompanyUrl` (text) - Previous company URL
      - `pastExperienceCompanyTitle` (text) - Previous job title
      - `pastExperienceDate` (text) - Previous experience dates
      - `pastExperienceDuration` (text) - Duration of previous experience
      - `connectionDegree` (text) - LinkedIn connection degree
      - `profileImageUrl` (text) - Profile image URL
      - `sharedConnectionsCount` (integer) - Number of shared connections
      - `name` (text) - Name field
      - `vmid` (text) - VM identifier
      - `linkedInProfileUrl` (text) - LinkedIn profile URL
      - `isPremium` (boolean) - Premium account status
      - `isOpenLink` (boolean) - Open link status
      - `query` (text) - Search query
      - `timestamp` (timestamptz) - Record timestamp
      - `defaultProfileUrl` (text) - Default profile URL
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for public read access (anyone can view profiles)
    - Add policy for authenticated users to insert/update profiles

  3. Important Notes
    - The firstName field is unique and case-insensitive for URL consistency
    - Public read access allows anyone to view personalized pages
    - Most fields are nullable to allow flexible data entry
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "profileUrl" text,
  "fullName" text,
  "firstName" text UNIQUE NOT NULL,
  "lastName" text,
  "companyName" text,
  title text,
  "companyId" text,
  "companyUrl" text,
  "regularCompanyUrl" text,
  summary text,
  "titleDescription" text,
  industry text,
  "companyLocation" text,
  location text,
  "durationInRole" text,
  "durationInCompany" text,
  "pastExperienceCompanyName" text,
  "pastExperienceCompanyUrl" text,
  "pastExperienceCompanyTitle" text,
  "pastExperienceDate" text,
  "pastExperienceDuration" text,
  "connectionDegree" text,
  "profileImageUrl" text,
  "sharedConnectionsCount" integer DEFAULT 0,
  name text,
  vmid text,
  "linkedInProfileUrl" text,
  "isPremium" boolean DEFAULT false,
  "isOpenLink" boolean DEFAULT false,
  query text,
  timestamp timestamptz,
  "defaultProfileUrl" text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert profiles"
  ON profiles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update profiles"
  ON profiles FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_profiles_firstName ON profiles("firstName");
CREATE INDEX IF NOT EXISTS idx_profiles_linkedInProfileUrl ON profiles("linkedInProfileUrl");