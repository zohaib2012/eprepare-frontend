import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Flame } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On homepage top: dark bg matching hero. After scroll or on other pages: white glass
  const dark = isHome && !scrolled;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      dark
        ? 'bg-[#080f1e] border-b border-white/8'
        : 'bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
    }`}>

      {/* Top accent bar — homepage only */}
      {dark && (
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative bg-gradient-to-br from-red-500 to-red-700 p-2 rounded-xl shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="leading-none">
              <div className="flex items-center gap-1">
                <span className={`text-xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-red-500">e</span>Prepare
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  dark ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-500'
                }`}>MDCAT</span>
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path && link.path !== '#';
              return (
                <Link key={link.path} to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? dark
                        ? 'text-white bg-white/10'
                        : 'text-red-600 bg-red-50'
                      : dark
                        ? 'text-white/65 hover:text-white hover:bg-white/8'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      dark ? 'bg-red-400' : 'bg-red-500'
                    }`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right Buttons ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live badge */}
            <div className={`hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              dark ? 'bg-green-500/15 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              50K+ Students
            </div>

            <Link to="#"
              className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${
                dark
                  ? 'text-white/80 border-white/15 hover:bg-white/8 hover:border-white/25'
                  : 'text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
              }`}>
              Login
            </Link>

            <Link to="#"
              className="relative group text-sm font-bold text-white px-5 py-2 rounded-xl overflow-hidden transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 transition-all group-hover:from-red-600 group-hover:to-red-800" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)' }} />
              <span className="relative">Register Now</span>
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className={`md:hidden p-2.5 rounded-xl transition-colors ${
              dark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className={`md:hidden border-t px-4 py-4 ${
          dark
            ? 'bg-[#0d1f3c] border-white/10'
            : 'bg-white border-gray-100'
        }`}>
          <div className="space-y-1 mb-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                  location.pathname === link.path
                    ? dark ? 'bg-white/10 text-white' : 'bg-red-50 text-red-600'
                    : dark ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-3 pt-3 border-t border-white/10">
            <Link to="#"
              className={`flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-xl border ${
                dark ? 'text-white border-white/20 hover:bg-white/5' : 'text-blue-700 border-blue-200 hover:bg-blue-50'
              }`}>
              Login
            </Link>
            <Link to="#"
              className="flex-1 text-center text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-700 px-4 py-2.5 rounded-xl shadow-lg">
              Register Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
