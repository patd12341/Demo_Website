import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Home, Loader } from 'lucide-react';
import { supabase } from './lib/supabase';

export default function UserPage() {
  const { name } = useParams<{ name: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    async function checkAndCreateUser() {
      if (!name || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const normalizedName = name.toLowerCase();

        const { data: existingUser } = await supabase
          .from('users')
          .select('first_name')
          .eq('first_name', normalizedName)
          .maybeSingle();

        if (existingUser) {
          setUserExists(true);
          setDisplayName(existingUser.first_name);

          await supabase
            .from('users')
            .update({ last_visited: new Date().toISOString() })
            .eq('first_name', normalizedName);
        } else {
          const { data: newUser, error } = await supabase
            .from('users')
            .insert([{ first_name: normalizedName }])
            .select()
            .single();

          if (!error && newUser) {
            setUserExists(true);
            setDisplayName(newUser.first_name);
          }
        }
      } catch (error) {
        console.error('Error handling user:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAndCreateUser();
  }, [name]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">User Not Found</h1>
          <p className="text-slate-600 mb-6">We couldn't find or create this user page.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-medium"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full border border-teal-200/50 shadow-lg">
            <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
            <span className="text-sm font-semibold text-teal-900 tracking-wide">Your Personal Page</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-teal-800 to-slate-900 bg-clip-text text-transparent">
                Hey {capitalize(displayName)}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              Welcome to your personalized corner of the web
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              to="/"
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 font-medium flex items-center gap-2"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
          </div>

          <div className="pt-12">
            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
              <p className="text-slate-600 text-sm leading-relaxed">
                This is your unique page at <span className="font-mono font-semibold text-teal-700">/{displayName}</span>
                <br />
                Share this URL with others to show them your personalized greeting!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent"></div>
    </div>
  );
}
