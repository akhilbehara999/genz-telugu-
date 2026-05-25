import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { BookOpen, ArrowRight, Filter } from 'lucide-react';

export function ExamplesPage() {
  const { examples, loadExample } = useStore();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(examples.map((e) => e.category)))];
  const filtered =
    selectedCategory === 'All'
      ? examples
      : examples.filter((e) => e.category === selectedCategory);

  const handleOpen = (example: typeof examples[0]) => {
    loadExample(example);
    navigate('/playground');
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Examples</h1>
            <p className="text-slate-400 mt-1">
              Learn GenZ Telugu with ready-made programs
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <Filter className="w-4 h-4 text-slate-500" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((example) => (
            <div
              key={example.id}
              className="group rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all hover:bg-white/[0.04] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400">
                    {example.category}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{example.description}</p>

                <div className="rounded-lg bg-[#0B1120] p-3 font-mono text-xs text-slate-400 line-clamp-4 mb-4">
                  {example.code}
                </div>

                <button
                  onClick={() => handleOpen(example)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all group-hover:bg-primary group-hover:text-white"
                >
                  Open in Playground
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
