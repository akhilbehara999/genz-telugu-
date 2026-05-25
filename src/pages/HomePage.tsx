import { Link } from 'react-router-dom';
import { Code2, Zap, BookOpen, Globe, ArrowRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Code like you chat. Python powered, Telugu flavored.
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            GenZ{' '}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
              Telugu
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto mb-12">
            Write Python using Telugu keywords and Gen-Z slang.
            <br />
            Coding is now <span className="text-white font-medium">approachable</span>,{' '}
            <span className="text-white font-medium">fun</span>, and{' '}
            <span className="text-white font-medium">meme-worthy</span>. 🔥
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/playground"
              className="group flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary/80 text-white font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              <Code2 className="w-5 h-5" />
              Start Coding
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/examples"
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-lg transition-all border border-white/10"
            >
              <BookOpen className="w-5 h-5" />
              View Examples
            </Link>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Globe className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
      </section>

      {/* Code Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0F172A] shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-slate-500">main.gzt — GenZ Telugu</span>
          </div>
          <div className="p-6 font-mono text-sm sm:text-base">
            <div>
              <span className="text-slate-500"># Mee first program ra mama!</span>
            </div>
            <div className="mt-2">
              <span className="text-purple-400 font-bold">cheppu</span>
              <span className="text-slate-300">(</span>
              <span className="text-green-400">"Hello ra mama! 🔥"</span>
              <span className="text-slate-300">)</span>
            </div>
            <div className="mt-2">
              <span className="text-purple-400 font-bold">okavela</span>
              <span className="text-slate-300"> marks </span>
              <span className="text-orange-400">&gt;=</span>
              <span className="text-orange-400"> 90</span>
              <span className="text-slate-300">:</span>
            </div>
            <div className="ml-8 mt-1">
              <span className="text-purple-400 font-bold">cheppu</span>
              <span className="text-slate-300">(</span>
              <span className="text-green-400">"Thopu ra! 🏆"</span>
              <span className="text-slate-300">)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-12">
          Why GenZ Telugu?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🗣️',
              title: 'Telugu Keywords',
              desc: 'Write code in your native language. cheppu, okavela, kosam — it just makes sense.',
            },
            {
              icon: '⚡',
              title: 'Instant Execution',
              desc: 'Run Python directly in the browser. No setup, no installs, no config.',
            },
            {
              icon: '🎮',
              title: 'Learn by Playing',
              desc: 'Fun examples, meme-worthy errors, and a playground that feels like a game.',
            },
            {
              icon: '💾',
              title: 'Auto Save',
              desc: 'Your projects are saved locally. Pick up right where you left off.',
            },
            {
              icon: '📤',
              title: 'Share & Export',
              desc: 'Download as .py, copy translated Python, or share snippets with friends.',
            },
            {
              icon: '🌍',
              title: 'Open Source',
              desc: 'Built for the community. Contribute, fork, and make it yours.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all hover:bg-white/[0.04]"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Keyword Reference */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <h2 className="font-heading text-3xl font-bold text-white text-center mb-8">
          Quick Keyword Reference
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { gz: 'cheppu', py: 'print' },
            { gz: 'okavela', py: 'if' },
            { gz: 'lekapothe', py: 'else' },
            { gz: 'kosam', py: 'for' },
            { gz: 'lo', py: 'in' },
            { gz: 'paridhi', py: 'range' },
            { gz: 'pani', py: 'def' },
            { gz: 'tirigi', py: 'return' },
            { gz: 'nijam', py: 'True' },
            { gz: 'abaddam', py: 'False' },
            { gz: 'antha_varaku', py: 'while' },
            { gz: 'vadhilesi', py: 'break' },
          ].map(({ gz, py }) => (
            <div
              key={gz}
              className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <span className="text-primary font-mono text-sm font-medium">{gz}</span>
              <span className="text-slate-500">→</span>
              <span className="text-green-400 font-mono text-sm">{py}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <p>
          Built with 💜 for Telugu-speaking students everywhere.
        </p>
      </footer>
    </div>
  );
}
