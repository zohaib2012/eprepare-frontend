import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Video, FileText, Zap, BarChart2, ClipboardCheck,
  ChevronRight, Star, Play, MessageCircle, Check, ArrowRight,
  Trophy, Users, TrendingUp, Clock, Target, AlertCircle, Flame,
  GraduationCap, Award
} from 'lucide-react';

/* ── Achievement Ticker ──────────────────────────────────────────────── */
const achievements = [
  { name: 'Ayesha K.', score: '185/200', college: 'KEMU' },
  { name: 'Hamza R.', score: '192/200', college: 'Dow Medical' },
  { name: 'Fatima S.', score: '178/200', college: 'AKU' },
  { name: 'Bilal A.', score: '188/200', college: 'AIMC' },
  { name: 'Sara N.', score: '182/200', college: 'FJMU' },
  { name: 'Usman T.', score: '190/200', college: 'Nishtar' },
  { name: 'Zara M.', score: '176/200', college: 'RMC' },
  { name: 'Ali H.', score: '194/200', college: 'SIMS' },
  { name: 'Hina Q.', score: '180/200', college: 'KEMC' },
  { name: 'Raza K.', score: '186/200', college: 'NUMS' },
];
function AchievementTicker() {
  const doubled = [...achievements, ...achievements];
  return (
    <div className="bg-[#0a0f1e] border-y border-white/5 py-3 overflow-hidden">
      <div className="flex items-center gap-3 mb-0">
        {/* Static label */}
        <div className="flex-shrink-0 pl-4 flex items-center gap-2 z-10 bg-[#0a0f1e] pr-3">
          <div className="flex items-center gap-1.5 bg-red-600/20 border border-red-500/30 rounded-full px-3 py-1">
            <Trophy className="w-3.5 h-3.5 text-red-400" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Latest Results</span>
          </div>
        </div>
        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-6 animate-[ticker_35s_linear_infinite]">
            {doubled.map((a, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                  {a.name[0]}
                </div>
                <span className="text-white/80 text-xs font-semibold whitespace-nowrap">{a.name}</span>
                <span className="text-emerald-400 text-xs font-black whitespace-nowrap">{a.score}</span>
                <span className="text-gray-600 text-xs whitespace-nowrap">→ {a.college}</span>
                <span className="text-white/10 mx-2">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Countdown ───────────────────────────────────────────────────────── */
function CountdownTimer() {
  // MDCAT 2026 — estimated date
  const TARGET = new Date('2026-09-13T00:00:00');
  // Prep start reference (Jan 1, 2026)
  const PREP_START = new Date('2026-01-01T00:00:00');
  const totalPrepMs = TARGET - PREP_START;

  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prepPct, setPrepPct] = useState(0);
  const [prevSec, setPrevSec] = useState(null);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = TARGET - now;
      if (diff <= 0) return;
      const s = Math.floor((diff % 60000) / 1000);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: s,
      });
      setPrevSec(prev => {
        if (prev !== null && prev !== s) setFlip(f => !f);
        return s;
      });
      const elapsed = now - PREP_START;
      setPrepPct(Math.min(100, Math.max(0, (elapsed / totalPrepMs) * 100)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const segments = [
    { label: 'Days', value: time.days, max: 365, color: 'from-red-500 to-rose-600', glow: 'rgba(239,68,68,0.5)' },
    { label: 'Hours', value: time.hours, max: 24, color: 'from-orange-500 to-amber-600', glow: 'rgba(249,115,22,0.5)' },
    { label: 'Minutes', value: time.minutes, max: 60, color: 'from-violet-500 to-purple-700', glow: 'rgba(139,92,246,0.5)' },
    { label: 'Seconds', value: time.seconds, max: 60, color: 'from-blue-500 to-cyan-600', glow: 'rgba(59,130,246,0.5)' },
  ];

  const daysLeft = time.days;
  const urgency = daysLeft < 30 ? 'critical' : daysLeft < 90 ? 'high' : daysLeft < 180 ? 'moderate' : 'early';
  const urgencyConfig = {
    critical: { text: 'Critical! MDCAT is less than 30 days away', color: 'text-red-400', dot: 'bg-red-500' },
    high:     { text: 'Less than 3 months left — time to accelerate', color: 'text-orange-400', dot: 'bg-orange-500' },
    moderate: { text: 'Under 6 months — stay consistent daily', color: 'text-yellow-400', dot: 'bg-yellow-500' },
    early:    { text: 'Great time to build strong foundations', color: 'text-emerald-400', dot: 'bg-emerald-500' },
  };
  const urg = urgencyConfig[urgency];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#080f1e] via-[#0d1a35] to-[#0a0f20] py-16">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Context ── */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/25 rounded-full px-4 py-2 mb-6">
              <Flame className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-xs font-bold uppercase tracking-[0.12em]">MDCAT 2026 Countdown</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Every Second<br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Counts.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-sm">
              MDCAT 2026 is approaching fast. Students who start early score significantly higher. Begin your preparation today.
            </p>

            {/* Urgency badge */}
            <div className="flex items-center gap-2 mb-8">
              <span className={`w-2 h-2 rounded-full ${urg.dot} animate-pulse flex-shrink-0`} />
              <span className={`text-sm font-semibold ${urg.color}`}>{urg.text}</span>
            </div>

            {/* Prep Progress Bar */}
            <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-white/70 text-sm font-semibold">Preparation Year Progress</span>
                </div>
                <span className="text-white font-black text-sm">{prepPct.toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-1000 relative"
                  style={{ width: `${prepPct}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/30 mt-2 font-medium">
                <span>Jan 2026</span>
                <span>Sep 2026</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: 'Hours of content', value: '1,200+' },
                { label: 'Practice tests', value: '25+' },
                { label: 'Avg. score boost', value: '+34pts' },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                  <div className="text-white font-black text-lg">{s.value}</div>
                  <div className="text-white/40 text-[10px] font-medium mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Timer ── */}
          <div className="flex flex-col items-center">
            {/* Timer boxes */}
            <div className="flex items-center gap-3 flex-wrap justify-center mb-8">
              {segments.map(({ label, value, color, glow }, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center group">
                    {/* Box */}
                    <div className="relative">
                      {/* Glow */}
                      <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"
                        style={{ background: glow }} />
                      {/* Card */}
                      <div className={`relative bg-gradient-to-b ${color} rounded-2xl shadow-2xl border border-white/15 overflow-hidden`}
                        style={{ width: '96px', height: '100px' }}>
                        {/* Shine overlay */}
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 rounded-t-2xl" />
                        {/* Divider line (card flip effect) */}
                        <div className="absolute inset-x-2 top-1/2 h-px bg-black/20 z-10" />
                        {/* Number */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl font-black text-white font-mono tabular-nums tracking-tighter"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                            {String(value).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-white/50 text-[11px] font-bold uppercase tracking-widest mt-2.5">{label}</span>
                  </div>
                  {/* Colon separator (not after last) */}
                  {i < segments.length - 1 && (
                    <div className="flex flex-col gap-2 mb-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Date badge */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-6">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-white/60 text-sm font-medium">MDCAT 2026 — Estimated: </span>
              <span className="text-white font-bold text-sm">September 13, 2026</span>
            </div>

            {/* CTA */}
            <Link to="/pricing"
              className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-7 py-3.5 rounded-2xl hover:from-red-600 hover:to-red-800 transition-all shadow-xl shadow-red-500/30 hover:shadow-red-500/50">
              <Flame className="w-4 h-4" />
              Start Preparing Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────────────────────── */
const stats = [
  { Icon: Users, value: '50,000+', label: 'Students Enrolled', color: 'text-blue-600' },
  { Icon: BookOpen, value: '120,000+', label: 'MCQs in Question Bank', color: 'text-red-600' },
  { Icon: Video, value: '500+', label: 'Video Lectures', color: 'text-purple-600' },
  { Icon: TrendingUp, value: '95%', label: 'Student Satisfaction', color: 'text-green-600' },
];
function StatsBar() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ Icon, value, label, color }) => (
            <div key={label} className="group">
              <div className={`inline-flex p-3 rounded-2xl bg-gray-50 mb-3 group-hover:scale-110 transition-transform ${color}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className={`text-4xl font-black mb-1 ${color}`}>{value}</div>
              <div className="text-gray-500 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────────────────────── */
const features = [
  { Icon: BookOpen, title: 'Massive Question Banks', desc: '120,000+ MCQs covering every chapter, board, and year — organized, searchable, and filterable.', grad: 'from-blue-500 to-blue-700' },
  { Icon: Video, title: 'HD Video Lectures', desc: '500+ expert-recorded lectures by Pakistan\'s top MDCAT educators, streamed in HD.', grad: 'from-red-500 to-rose-700' },
  { Icon: FileText, title: 'Past Papers (2015–2024)', desc: 'Complete MDCAT yearly papers with video solutions — the most accurate way to prepare.', grad: 'from-emerald-500 to-teal-700' },
  { Icon: Zap, title: 'Smart Flashcards', desc: 'AI-powered spaced repetition flashcards for Biology and Chemistry that remember for you.', grad: 'from-amber-500 to-orange-600' },
  { Icon: BarChart2, title: 'Deep Analytics', desc: 'Real-time dashboards tracking accuracy, weak topics, rank, and improvement trends.', grad: 'from-violet-500 to-purple-700' },
  { Icon: ClipboardCheck, title: 'Full-Length Mock Tests', desc: 'MDCAT-pattern tests with instant scoring, detailed analysis, and national leaderboard.', grad: 'from-pink-500 to-rose-600' },
];
function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">Why ePrepare</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Everything You Need<br className="hidden md:block" /> to Crack MDCAT</h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">One platform. Every tool. Zero excuses.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ Icon, title, desc, grad }) => (
            <div key={title}
              className="group bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${grad} mb-5 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              <div className="flex items-center gap-1 mt-4 text-blue-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Subjects ─────────────────────────────────────────────────────────── */
const subjects = [
  { emoji: '🧬', name: 'Biology', mcqs: '35,000', lectures: '200', grad: 'from-emerald-400 to-teal-600', light: 'bg-emerald-50 border-emerald-200' },
  { emoji: '⚗️', name: 'Chemistry', mcqs: '28,000', lectures: '150', grad: 'from-blue-500 to-indigo-700', light: 'bg-blue-50 border-blue-200' },
  { emoji: '⚡', name: 'Physics', mcqs: '22,000', lectures: '100', grad: 'from-violet-500 to-purple-700', light: 'bg-violet-50 border-violet-200' },
  { emoji: '📖', name: 'English', mcqs: '12,000', lectures: '30', grad: 'from-orange-400 to-red-600', light: 'bg-orange-50 border-orange-200' },
  { emoji: '🧠', name: 'Logical Reasoning', mcqs: '8,000', lectures: '20', grad: 'from-rose-500 to-pink-700', light: 'bg-rose-50 border-rose-200' },
];
function SubjectsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">Subjects</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Master All MDCAT Subjects</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {subjects.map(s => (
            <div key={s.name} className={`group rounded-3xl border-2 ${s.light} p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>
              <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${s.grad} items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {s.emoji}
              </div>
              <h3 className="font-extrabold text-gray-900 text-base mb-1">{s.name}</h3>
              <p className="text-xs text-gray-500 font-medium">{s.mcqs} MCQs</p>
              <p className="text-xs text-gray-500 font-medium mb-4">{s.lectures} Lectures</p>
              <button className={`text-xs text-white font-bold px-5 py-2 rounded-full bg-gradient-to-r ${s.grad} shadow-md hover:shadow-lg transition-all w-full`}>
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ─────────────────────────────────────────────────────── */
const steps = [
  { num: '01', title: 'Register Free', desc: 'Create your account in 2 minutes — no credit card required.', icon: '🚀' },
  { num: '02', title: 'Choose a Plan', desc: 'Pick the plan that fits your prep schedule and unlock everything.', icon: '💡' },
  { num: '03', title: 'Start Practicing', desc: 'Dive into MCQs, lectures, and live tests — score higher every day.', icon: '🎯' },
];
function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0d1f3c] to-[#1a237e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block bg-white/10 border border-white/20 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black text-white">Start in 3 Simple Steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
              )}
              <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="text-xs font-black text-red-400 uppercase tracking-widest mb-2">Step {s.num}</div>
                <h3 className="text-xl font-extrabold text-white mb-3">{s.title}</h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────────── */
const testimonials = [
  { text: "ePrepare's question bank is unmatched. I solved 800+ MCQs daily and scored 185/200 in MDCAT.", name: 'Ayesha K.', college: 'KEMU 2024', initials: 'AK', color: 'from-blue-500 to-blue-700' },
  { text: "The video lectures by Sir Asad helped me clear Chemistry concepts I struggled with for months. Life-changing.", name: 'Hamza R.', college: 'Dow Medical College', initials: 'HR', color: 'from-red-500 to-rose-700' },
  { text: "The mock tests are exactly like real MDCAT. My confidence doubled after using ePrepare for just 3 months.", name: 'Fatima S.', college: 'AKU 2024', initials: 'FS', color: 'from-emerald-500 to-teal-700' },
];
function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Trophy className="w-3 h-3 inline mr-1" />Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Students Who Cracked MDCAT</h2>
          <p className="text-gray-500 mt-4 text-lg">Real results from real students</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name}
              className="group bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl text-gray-100 font-black leading-none mb-4 select-none">"</div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 font-medium">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 font-medium">{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WhatsApp Banner ──────────────────────────────────────────────────── */
function WhatsAppBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-green-500 to-emerald-700 p-10 text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10">
            <div className="inline-flex w-16 h-16 rounded-full bg-white/20 backdrop-blur items-center justify-center mb-4 shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Join 2,600+ Students</h2>
            <p className="text-green-100 mb-7 text-lg">Get daily MCQs, free study material, and MDCAT updates on WhatsApp</p>
            <a href="#"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-green-50 transition-colors shadow-xl text-base">
              <MessageCircle className="w-5 h-5" />
              Join WhatsApp Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#080f1e] min-h-[90vh] flex items-center">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-sm text-blue-300 px-4 py-2 rounded-full mb-6 font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Pakistan's #1 MDCAT Platform
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight mb-6">
              <span className="text-white">Crack MDCAT </span>
              <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">with Confidence</span>
              <span className="text-white"> & </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Clarity</span>
            </h1>
            <p className="text-blue-200/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Join <span className="text-white font-semibold">50,000+ students</span> who cracked MDCAT using ePrepare's comprehensive question banks, HD video lectures, and AI-powered mock tests.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/pricing"
                className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(229,62,62,0.4)] hover:shadow-[0_0_40px_rgba(229,62,62,0.6)] text-base">
                Start Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-4 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm text-base">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex -space-x-2.5">
                {['AK','HR','FS','MK','RZ'].map((i, idx) => (
                  <div key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#080f1e] flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    style={{ background: ['#3B82F6','#EF4444','#10B981','#8B5CF6','#F59E0B'][idx] }}>
                    {i}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-white/70 text-sm"><span className="text-white font-bold">4.9</span> from 10,000+ reviews</span>
              </div>
            </div>
          </div>

          {/* Right — Dashboard Card */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/50 text-xs font-medium">Welcome back 👋</p>
                  <p className="text-white font-bold text-lg">Ahmed Raza</p>
                </div>
                <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />Active
                </div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Questions Solved', value: '1,240', color: 'from-blue-500/20 to-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/20' },
                  { label: 'Accuracy', value: '78%', color: 'from-green-500/20 to-green-600/20', text: 'text-green-400', border: 'border-green-500/20' },
                  { label: 'Rank', value: '#342', color: 'from-violet-500/20 to-purple-600/20', text: 'text-violet-400', border: 'border-violet-500/20' },
                  { label: 'Days to MDCAT', value: '87', color: 'from-red-500/20 to-rose-600/20', text: 'text-red-400', border: 'border-red-500/20' },
                ].map(item => (
                  <div key={item.label} className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-4`}>
                    <div className={`text-3xl font-black ${item.text}`}>{item.value}</div>
                    <div className="text-white/50 text-xs mt-0.5 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              {/* Progress */}
              <div className="space-y-3">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Today's Progress</p>
                {[
                  { subject: 'Biology', pct: 72, color: '#10B981' },
                  { subject: 'Chemistry', pct: 55, color: '#3B82F6' },
                  { subject: 'Physics', pct: 40, color: '#8B5CF6' },
                ].map(p => (
                  <div key={p.subject}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/60 font-medium">{p.subject}</span>
                      <span className="text-white/80 font-bold">{p.pct}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${p.pct}%`, background: p.color, boxShadow: `0 0 8px ${p.color}80` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AchievementTicker />
      <CountdownTimer />
      <StatsBar />
      <FeaturesSection />
      <SubjectsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <WhatsAppBanner />
    </>
  );
}
