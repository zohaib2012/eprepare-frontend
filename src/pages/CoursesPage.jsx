import { useState } from 'react';
import { Star, Check, Play, BookOpen, ChevronRight } from 'lucide-react';

const allCourses = [
  { id: 1, subject: 'Biology', badge: 'Bestseller', badgeColor: 'bg-emerald-100 text-emerald-700',
    title: 'Biology Complete Course', features: ['200 Video Lectures', '35,000 MCQs', 'Flashcards Included'],
    instructor: 'Dr. Sana Mirza', initials: 'SM', rating: 4.9, students: 3200,
    grad: 'from-emerald-500 to-teal-600', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5',
    emoji: '🧬' },
  { id: 2, subject: 'Chemistry', badge: null, badgeColor: '',
    title: 'Chemistry Master Class', features: ['150 Video Lectures', '28,000 MCQs', 'Chemistry Examples'],
    instructor: 'Sir Asad Khan', initials: 'AK', rating: 4.8, students: 2800,
    grad: 'from-blue-500 to-indigo-600', border: 'border-blue-500/30', bg: 'bg-blue-500/5',
    emoji: '⚗️' },
  { id: 3, subject: 'Physics', badge: null, badgeColor: '',
    title: 'Physics Crash Course', features: ['100 Video Lectures', '22,000 MCQs', 'Topic-wise Drills'],
    instructor: 'Sir Bilal Ahmed', initials: 'BA', rating: 4.7, students: 2100,
    grad: 'from-violet-500 to-purple-700', border: 'border-violet-500/30', bg: 'bg-violet-500/5',
    emoji: '⚡' },
  { id: 4, subject: 'English', badge: null, badgeColor: '',
    title: 'English MDCAT Prep', features: ['30 Video Lectures', '12,000 MCQs', 'Vocabulary Lab'],
    instructor: "Ma'am Rabia Aziz", initials: 'RA', rating: 4.8, students: 1900,
    grad: 'from-orange-400 to-red-600', border: 'border-orange-500/30', bg: 'bg-orange-500/5',
    emoji: '📖' },
  { id: 5, subject: 'Logical Reasoning', badge: null, badgeColor: '',
    title: 'Logical Reasoning Mastery', features: ['20 Video Lectures', '8,000 MCQs', 'Pattern Practice'],
    instructor: 'Sir Usman Tariq', initials: 'UT', rating: 4.6, students: 1500,
    grad: 'from-rose-500 to-pink-700', border: 'border-rose-500/30', bg: 'bg-rose-500/5',
    emoji: '🧠' },
  { id: 6, subject: 'All', badge: 'Top Rated', badgeColor: 'bg-blue-100 text-blue-700',
    title: 'MDCAT Past Papers 2015–2024', features: ['10 Complete Papers', 'Video Solutions', 'All Subjects'],
    instructor: 'ePrepare Team', initials: 'EP', rating: 4.9, students: 4500,
    grad: 'from-slate-600 to-blue-900', border: 'border-slate-500/30', bg: 'bg-slate-500/5',
    emoji: '📄' },
  { id: 7, subject: 'Biology', badge: null, badgeColor: '',
    title: 'Biology Flashcard Pack', features: ['2,000+ Flashcards', 'Spaced Repetition', 'Quick Revision'],
    instructor: 'Dr. Sana Mirza', initials: 'SM', rating: 4.7, students: 1200,
    grad: 'from-emerald-500 to-teal-600', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5',
    emoji: '🃏' },
  { id: 8, subject: 'All', badge: 'Recommended', badgeColor: 'bg-red-100 text-red-700',
    title: 'Full-Length Practice Tests (FLPs)', features: ['15 Complete Mock Tests', 'MDCAT Pattern', 'Detailed Analysis'],
    instructor: 'ePrepare Team', initials: 'EP', rating: 4.9, students: 2600,
    grad: 'from-red-500 to-rose-700', border: 'border-red-500/30', bg: 'bg-red-500/5',
    emoji: '📝' },
  { id: 9, subject: 'All', badge: null, badgeColor: '',
    title: 'Revision Test Series (Koshash)', features: ['30 Subject-wise Tests', 'Detailed Analysis', 'Leaderboard'],
    instructor: 'ePrepare Team', initials: 'EP', rating: 4.8, students: 1800,
    grad: 'from-amber-500 to-orange-600', border: 'border-amber-500/30', bg: 'bg-amber-500/5',
    emoji: '🎯' },
];

const tabs = ['All', 'Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'];

const boards = [
  { name: 'KPK Board', desc: 'Topic-wise MCQs aligned with KPK Board curriculum', emoji: '📚', color: 'from-blue-500 to-blue-700' },
  { name: 'Federal / FTB Board', desc: 'Comprehensive MCQ bank for Federal Textbook Board', emoji: '🏛️', color: 'from-violet-500 to-purple-700' },
  { name: 'Punjab / PTB Board', desc: 'Complete practice set for Punjab Textbook Board', emoji: '🏫', color: 'from-emerald-500 to-teal-700' },
];

function CourseCard({ course }) {
  return (
    <div className={`group relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}>
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${course.grad} p-5 flex items-center justify-between`}>
        <span className="text-4xl">{course.emoji}</span>
        {course.badge && (
          <span className="text-xs font-bold text-white bg-white/20 backdrop-blur border border-white/30 px-3 py-1 rounded-full">
            {course.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-extrabold text-gray-900 mb-3 text-base leading-snug">{course.title}</h3>
        <ul className="space-y-1.5 mb-4">
          {course.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${course.grad} flex items-center justify-center text-white text-xs font-black`}>
            {course.initials}
          </div>
          <span className="text-xs text-gray-500 font-medium">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-800">{course.rating}</span>
          <span className="text-xs text-gray-400">({course.students.toLocaleString()})</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 border border-gray-200 text-gray-700 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 font-medium">
            <Play className="w-3.5 h-3.5" /> Preview
          </button>
          <button className={`flex-1 text-white text-sm py-2.5 rounded-xl font-bold transition-all bg-gradient-to-r ${course.grad} hover:shadow-lg hover:shadow-current/20`}>
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? allCourses : allCourses.filter(c => c.subject === active);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#080f1e] to-[#0d1f3c] py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block bg-white/10 border border-white/15 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            All Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Courses & Resources</h1>
          <p className="text-blue-300/70 max-w-xl mx-auto text-lg">Comprehensive MDCAT preparation across all subjects</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActive(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                active === tab
                  ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg shadow-red-500/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600 shadow-sm'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map(course => <CourseCard key={course.id} course={course} />)}
        </div>

        {/* Board-wise Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">Board-wise Practice</span>
            <h2 className="text-2xl font-black text-gray-900">Practice by Your Board</h2>
            <p className="text-gray-500 text-sm mt-2">MCQs tailored to your board's exact curriculum</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {boards.map(b => (
              <div key={b.name}
                className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className={`bg-gradient-to-r ${b.color} p-5 flex items-center gap-3`}>
                  <span className="text-3xl">{b.emoji}</span>
                  <h3 className="font-extrabold text-white">{b.name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{b.desc}</p>
                  <button className={`w-full text-white text-sm py-2.5 rounded-xl font-bold bg-gradient-to-r ${b.color} hover:shadow-md transition-all flex items-center justify-center gap-2`}>
                    Practice Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
