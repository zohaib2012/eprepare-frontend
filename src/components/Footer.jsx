import { Link } from 'react-router-dom';
import { BookOpen, Share2, Camera, PlayCircle, MessageCircle, Mail, Phone, MapPin, ArrowRight, ChevronRight } from 'lucide-react';

const footerLinks = {
  Platform: ['Home', 'Courses', 'Pricing', 'About Us', 'Contact'],
  Subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'],
  Resources: ['MDCAT Past Papers', 'Flashcards', 'Mock Tests', 'Video Lectures', 'Question Bank'],
};

const stats = [
  { value: '50K+', label: 'Students' },
  { value: '120K+', label: 'MCQs' },
  { value: '500+', label: 'Lectures' },
  { value: '4.9★', label: 'Rating' },
];

export default function Footer() {
  return (
    <footer className="bg-[#060d1a] text-gray-400 relative overflow-hidden">

      {/* Top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-700/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-700/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Stats Strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Brand Column (wider) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/50 rounded-xl blur-md group-hover:opacity-70 transition-opacity" />
                <div className="relative bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                <span className="text-red-500">e</span>Prepare
                <span className="text-gray-500 text-sm font-medium ml-1">Academy</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Pakistan's most trusted MDCAT preparation platform — empowering future doctors with the best tools to succeed.
            </p>

            {/* Newsletter */}
            <div className="mb-7">
              <p className="text-white font-semibold text-sm mb-3">Get free daily MCQs in your inbox</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/8 transition-all"
                />
                <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2.5 rounded-xl hover:from-red-600 hover:to-red-800 transition-all shadow-lg shadow-red-500/20 flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {[
                { Icon: Share2, label: 'Facebook' },
                { Icon: Camera, label: 'Instagram' },
                { Icon: PlayCircle, label: 'YouTube' },
                { Icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" title={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400 transition-all flex items-center justify-center group">
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(item => (
                  <li key={item}>
                    <Link to="#"
                      className="group flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors">
                      <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-red-500 transition-colors flex-shrink-0" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-10 pt-8 border-t border-white/5 grid md:grid-cols-3 gap-4">
          {[
            { Icon: Mail, text: 'support@eprepare.org' },
            { Icon: Phone, text: '+92 300 0000000' },
            { Icon: MapPin, text: 'Lahore, Pakistan' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-sm text-gray-500">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-red-500" />
              </div>
              {text}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2025 ePrepare Academy. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-gray-600">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
              <Link key={l} to="#" className="hover:text-gray-400 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
