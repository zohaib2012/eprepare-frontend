import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Shield, Zap, Crown, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic', Icon: BookOpen, tag: null,
    monthly: 0, yearly: 0,
    desc: 'Explore the platform for free',
    highlight: false,
    iconGrad: 'from-gray-400 to-gray-600',
    features: [
      { text: '500 Free MCQs', yes: true },
      { text: '5 Sample Video Lectures', yes: true },
      { text: '1 Practice Test', yes: true },
      { text: 'Basic Performance Stats', yes: true },
      { text: 'Full Question Bank (120,000+)', yes: false },
      { text: 'All Video Lectures (500+)', yes: false },
      { text: 'Full Mock Tests', yes: false },
      { text: 'Personalized Mentorship', yes: false },
    ],
    btn: 'Get Started Free',
    btnClass: 'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
  },
  {
    name: 'Pro', Icon: Zap, tag: 'Most Popular',
    monthly: 1499, yearly: 12499,
    desc: 'For serious MDCAT aspirants',
    highlight: true,
    iconGrad: 'from-red-500 to-rose-700',
    features: [
      { text: 'Full Question Bank (120,000+ MCQs)', yes: true },
      { text: 'All Video Lectures (500+)', yes: true },
      { text: '10 Full-Length Practice Tests', yes: true },
      { text: 'Flashcard System', yes: true },
      { text: 'Performance Analytics', yes: true },
      { text: 'Wrong MCQ Tracker', yes: true },
      { text: 'Leaderboard Access', yes: true },
      { text: 'WhatsApp Community', yes: true },
      { text: 'Personalized Mentorship', yes: false },
    ],
    btn: 'Start Pro Trial',
    btnClass: '',
  },
  {
    name: 'Elite', Icon: Crown, tag: 'Best Value',
    monthly: 2999, yearly: 24999,
    desc: 'For students wanting maximum support',
    highlight: false,
    iconGrad: 'from-amber-500 to-orange-600',
    features: [
      { text: 'Everything in Pro', yes: true },
      { text: 'Unlimited Mock Tests', yes: true },
      { text: 'Personalized Mentorship', yes: true },
      { text: '1-on-1 Doubt Sessions (2/month)', yes: true },
      { text: 'Priority WhatsApp Support', yes: true },
      { text: 'Exclusive Revision Notes', yes: true },
      { text: 'NUMS Extra Chapter Practice', yes: true },
      { text: 'Audio Biology Book', yes: true },
    ],
    btn: 'Go Elite',
    btnClass: 'border-2 border-amber-400 text-amber-700 hover:bg-amber-50',
  },
];

const faqs = [
  { q: 'Can I access ePrepare on mobile?', a: 'Yes! ePrepare Academy is fully mobile-responsive. Access all features from any device — phone, tablet, or desktop — with no app download required.' },
  { q: 'Is there a free trial?', a: 'Yes, the Basic plan is free forever with limited access. Explore the platform, solve 500 MCQs, and watch 5 sample lectures before upgrading.' },
  { q: 'What payment methods are accepted?', a: 'We accept Easypaisa, JazzCash, bank transfer, and credit/debit cards. All payments are processed securely.' },
  { q: 'Can I switch plans anytime?', a: 'Absolutely. Upgrade or downgrade at any time. Changes take effect immediately on upgrade.' },
  { q: 'Is content updated for latest MDCAT syllabus?', a: 'Yes. Our team reviews and updates all content annually to reflect the latest PMC/PMDC MDCAT syllabus changes.' },
];

function PricingCard({ plan, yearly }) {
  const price = yearly ? plan.yearly : plan.monthly;
  return (
    <div className={`relative flex flex-col rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
      plan.highlight
        ? 'bg-gradient-to-b from-[#0d1f3c] to-[#080f1e] text-white shadow-2xl shadow-blue-900/50 border border-blue-500/30 scale-105'
        : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
    }`}>
      {plan.tag && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className={`font-bold px-5 py-1.5 rounded-full text-xs shadow-lg ${
            plan.highlight
              ? 'bg-red-600 text-white shadow-red-500/30'
              : 'bg-amber-500 text-white shadow-amber-500/30'
          }`}>
            {plan.tag}
          </span>
        </div>
      )}

      <div className="p-7 flex-1">
        <div className="flex items-center gap-3 mb-5">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${plan.iconGrad} shadow-lg`}>
            <plan.Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-xl font-black ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
            <p className={`text-xs font-medium ${plan.highlight ? 'text-blue-300/70' : 'text-gray-400'}`}>{plan.desc}</p>
          </div>
        </div>

        <div className={`border-t border-b py-5 mb-6 ${plan.highlight ? 'border-white/10' : 'border-gray-100'}`}>
          <div className="flex items-end gap-1">
            <span className={`text-5xl font-black ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
              {price === 0 ? 'Free' : `Rs. ${price.toLocaleString()}`}
            </span>
            {price > 0 && <span className={`pb-1.5 text-sm ${plan.highlight ? 'text-blue-300/60' : 'text-gray-400'}`}>/{yearly ? 'year' : 'month'}</span>}
          </div>
          {yearly && price > 0 && (
            <p className="text-xs text-emerald-400 font-semibold mt-1">Save 30% vs monthly billing</p>
          )}
        </div>

        <ul className="space-y-3 mb-7">
          {plan.features.map(f => (
            <li key={f.text} className="flex items-start gap-2.5 text-sm">
              {f.yes
                ? <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-emerald-400' : 'text-emerald-500'}`} />
                : <X className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white/15' : 'text-gray-200'}`} />
              }
              <span className={f.yes
                ? (plan.highlight ? 'text-white/90' : 'text-gray-700')
                : (plan.highlight ? 'text-white/20 line-through' : 'text-gray-300 line-through')
              }>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-7 pb-7">
        <button className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
          plan.highlight
            ? 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 shadow-lg shadow-red-500/30 hover:shadow-red-500/50'
            : plan.btnClass
        }`}>
          {plan.btn}
        </button>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
            onClick={() => setOpen(open === i ? null : i)}>
            <span className={`font-semibold text-sm ${open === i ? 'text-red-600' : 'text-gray-900'}`}>{f.q}</span>
            {open === i
              ? <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0" />
              : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3">{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#080f1e] to-[#0d1f3c] py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-600/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block bg-white/10 border border-white/15 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Simple, Transparent Pricing</h1>
          <p className="text-blue-300/70 max-w-md mx-auto text-lg mb-8">Invest in your MDCAT success. No hidden fees.</p>

          {/* Toggle */}
          <div className="inline-flex bg-white/10 border border-white/15 rounded-2xl p-1 backdrop-blur">
            <button onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                !yearly ? 'bg-white text-gray-900 shadow-lg' : 'text-white/60 hover:text-white'
              }`}>Monthly</button>
            <button onClick={() => setYearly(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                yearly ? 'bg-white text-gray-900 shadow-lg' : 'text-white/60 hover:text-white'
              }`}>
              Yearly
              <span className="bg-emerald-500 text-white text-xs font-black px-2 py-0.5 rounded-full">-30%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 items-center">
          {plans.map(plan => <PricingCard key={plan.name} plan={plan} yearly={yearly} />)}
        </div>

        {/* Guarantee */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-8 text-center mb-16 flex flex-col items-center">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">7-Day Money-Back Guarantee</h3>
          <p className="text-gray-600 text-sm max-w-md leading-relaxed">Not satisfied? Get a full refund within 7 days — no questions asked. We stand behind our content 100%.</p>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ />
        </div>

        {/* Bottom CTA */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a237e] p-12 text-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Ready to Start Your MDCAT Journey?</h2>
              <p className="text-blue-300/70 mb-8 text-lg">Join 50,000+ students already on ePrepare Academy</p>
              <Link to="#"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-10 py-4 rounded-2xl hover:from-red-600 hover:to-red-800 transition-all shadow-2xl shadow-red-500/30 text-base">
                Register Now — It's Free
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
