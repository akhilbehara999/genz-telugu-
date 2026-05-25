import { useStore } from '../store/useStore';
import { Settings as SettingsIcon, Type, Save, Monitor } from 'lucide-react';

export function SettingsPage() {
  const { settings, updateSettings } = useStore();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-7 h-7 text-primary" />
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 mt-1">Customize your coding experience</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Font Size */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-white">
                Editor Font Size
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="24"
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                className="flex-1 accent-primary"
              />
              <span className="text-2xl font-mono font-bold text-white w-12 text-center">
                {settings.fontSize}
              </span>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-[#0B1120] font-mono text-slate-400">
              <span className="text-purple-400">cheppu</span>
              <span>(</span>
              <span className="text-green-400">"Preview text"</span>
              <span>)</span>
            </div>
          </div>

          {/* Auto Save */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Save className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-white">
                Auto Save
              </h3>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.autoSave ? 'bg-primary' : 'bg-slate-600'
                }`}
                onClick={() => updateSettings({ autoSave: !settings.autoSave })}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-slate-300 text-sm">
                {settings.autoSave
                  ? 'Auto save is enabled — projects save as you type'
                  : 'Auto save is disabled — save manually with Ctrl+S'}
              </span>
            </label>
          </div>

          {/* Theme Info */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-white">Theme</h3>
            </div>

            <div className="p-4 rounded-lg bg-[#0B1120] border border-white/5">
              <p className="text-slate-400 text-sm">
                Dark theme is the default and only option for now.
                <br />
                GenZ Telugu looks best in the dark. 🌙
              </p>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-6">
            <h3 className="font-heading text-lg font-semibold text-white mb-4">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-3">
              {[
                { keys: 'Ctrl + Enter', action: 'Run code' },
                { keys: 'Ctrl + S', action: 'Save project' },
                { keys: 'Ctrl + N', action: 'New project' },
              ].map(({ keys, action }) => (
                <div
                  key={keys}
                  className="flex items-center justify-between"
                >
                  <span className="text-slate-400 text-sm">{action}</span>
                  <kbd className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
                    {keys}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
