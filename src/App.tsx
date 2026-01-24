import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { hasSupabaseConfig } from './lib/supabase';
import HomePage from './HomePage';
import UserPage from './UserPage';

function App() {
  if (!hasSupabaseConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-10 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Configuration Required</h1>
          <p className="text-lg text-slate-600 mb-6">
            This application requires Supabase environment variables to function properly.
          </p>
          <div className="bg-slate-100 rounded-xl p-6 text-left">
            <p className="text-sm font-semibold text-slate-700 mb-3">Missing environment variables:</p>
            <ul className="text-sm text-slate-600 space-y-2 font-mono">
              <li>• VITE_SUPABASE_URL</li>
              <li>• VITE_SUPABASE_ANON_KEY</li>
            </ul>
            <p className="text-sm text-slate-600 mt-4">
              Please configure these in your Netlify dashboard under Site settings → Environment variables.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:name" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
