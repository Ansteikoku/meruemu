// Supabase 設定
const SUPABASE_URL = "https://egoxcxdwsgjdlnrjbnec.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnb3hjeGR3c2dqZGxucmpibmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzUxMDQsImV4cCI6MjA3OTkxMTEwNH0.tr3Bvd6tQEGSog6xjJ8mdi7vFzPBsrhIbzA5-M8OBic";

// ★ supabase を統一名として作成
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
