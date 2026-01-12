import { Phone, MessageSquare, X, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase, hasSupabaseConfig } from './lib/supabase';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleCallMeClick = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!supabase) {
      alert('Database connection not configured');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('phone_requests')
        .insert([
          {
            phone_number: phoneNumber,
            name: name || null,
          },
        ]);

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setPhoneNumber('');
        setName('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting phone request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-5xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
          <span className="text-slate-900">Hey </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500 relative inline-block">
            Demo User
            <span className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 to-emerald-400 opacity-30 blur-sm"></span>
          </span>
          <span className="text-slate-400">,</span>
        </h1>

        <p className="text-3xl md:text-4xl text-slate-700 mb-14 font-semibold leading-tight">
          I built a tool that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
            answers your customer calls
          </span>{' '}
          for you.
        </p>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 px-10 py-12 mb-16 max-w-3xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
            It's a robot that talks to your customers on the phone, answers their questions, and
            helps them get what they need — <span className="font-semibold text-slate-800">automatically</span>.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10">
          Choose how you'd like to try it:
        </h2>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={handleCallMeClick}
            className="group relative bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 flex items-center gap-3 text-xl min-w-[240px] justify-center transform hover:scale-105 hover:-translate-y-1"
          >
            <Phone className="w-7 h-7" />
            <span>Call Me</span>
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 text-xl min-w-[240px] justify-center transform hover:scale-105 hover:-translate-y-1">
            <MessageSquare className="w-7 h-7" />
            <span>Test in Browser</span>
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative transform animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">Get a Call Back</h3>
                  <p className="text-slate-600">Enter your details and we'll call you shortly to demonstrate our AI assistant.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Call Back'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Submitted!</h3>
                <p className="text-slate-600">We'll call you back shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
