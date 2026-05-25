import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Trash2, ExternalLink, Calendar, Clock } from 'lucide-react';

export function ProjectsPage() {
  const { projects, loadProject, deleteProject } = useStore();
  const navigate = useNavigate();

  const handleOpen = (id: string) => {
    loadProject(id);
    navigate('/playground');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this project? This cannot be undone.')) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">Saved Projects</h1>
            <p className="text-slate-400 mt-1">
              {projects.length} project{projects.length !== 1 ? 's' : ''} stored locally
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400 mb-2">No projects yet</h3>
            <p className="text-slate-500 mb-6">
              Create a new project or try an example to get started
            </p>
            <button
              onClick={() => navigate('/playground')}
              className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium transition-all"
            >
              Start Coding
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              )
              .map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all hover:bg-white/[0.04] p-5"
                >
                  <h3 className="font-heading text-lg font-semibold text-white mb-3 truncate">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(project.updatedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpen(project.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
