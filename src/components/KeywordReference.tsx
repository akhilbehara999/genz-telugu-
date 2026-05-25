import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { KEYWORDS } from '../translator/translator';

const keywordGroups = {
  'Basic': ['cheppu', 'adugu', 'podavu'],
  'Conditionals': ['okavela', 'lekapothe_okavela', 'lekapothe'],
  'Loops': ['kosam', 'lo', 'paridhi', 'antha_varaku'],
  'Functions': ['pani', 'tirigi'],
  'Values': ['nijam', 'abaddam', 'yevaru'],
  'Control': ['vadhilesi', 'konasagu', 'kurcho'],
  'Operators': ['mariyu', 'leka', 'kaadhu'],
  'Types': ['sankhya', 'padham', 'bhinna_sankhya', 'gumpu'],
  'Other': ['vinu', 'bokka', 'motha_sankhya'],
};

export function KeywordReference() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-white/5 bg-[#0F172A]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Keyword Reference
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 max-h-64 overflow-auto">
          {Object.entries(keywordGroups).map(([group, keywords]) => (
            <div key={group} className="mb-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {group}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {keywords.map((kw) => (
                  <div
                    key={kw}
                    className="flex items-center justify-between px-2 py-1 rounded bg-white/[0.02] text-xs"
                  >
                    <span className="text-primary font-mono">{kw}</span>
                    <span className="text-slate-600 mx-1">→</span>
                    <span className="text-green-400 font-mono">{KEYWORDS[kw]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
