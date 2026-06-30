/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: {
    // Public Supabase vars baked in at build time — anon key is safe to expose
    NEXT_PUBLIC_SUPABASE_URL: 'https://cmdfxsjbviglyfmilwvy.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZGZ4c2pidmlnbHlmbWlsd3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODE2MzUsImV4cCI6MjA5NzU1NzYzNX0.cvYwXI4DQHYSQlA8fQzxvA75PWoBx-urikI4T4uWWIs',
  },
}

module.exports = nextConfig
