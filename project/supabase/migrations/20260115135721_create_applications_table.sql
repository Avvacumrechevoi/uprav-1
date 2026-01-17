/*
  # Create Applications Table for Yasna Project

  1. New Tables
    - `applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `name` (text) - Applicant's name
      - `contact` (text) - Contact information (Telegram, email, or phone)
      - `departments` (text[]) - Array of selected departments
      - `message` (text) - What brings the applicant to Yasna
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Application status (new, reviewed, contacted)

  2. Security
    - Enable RLS on `applications` table
    - Add policy for inserting applications (public access for form submissions)
    - Add policy for reading applications (authenticated users only)

  3. Notes
    - The departments field stores an array of department names
    - The status field helps track the application review process
    - Public can submit applications, but only authenticated users can view them
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  departments text[] DEFAULT '{}',
  message text DEFAULT '',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);