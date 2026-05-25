import { Link, useLocation } from 'react-router-dom';
import { Code2, Home, FolderOpen, BookOpen, Settings, Globe } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/playground', icon: Code2, label: 'Playground' },
  { path: '/examples', icon: BookOpen, label: 'Examples' },
  { path: '/projects', icon: FolderOpen, label: 'Projects' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-white text-sm group-hover:scale-110 transition-transform">
              GZ
            </div>
            <span className="font-heading font-bold text-lg text-white hidden sm:block">
              GenZ Telugu
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === path
                    ? 'bg-primary/20 text-primary'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
