import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Layout as LayoutIcon,
  Image as ImageIcon,
  Code,
  Download,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  Eye,
  EyeOff,
  Type
} from 'lucide-react';
import Markdown from 'react-markdown';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'settings' | 'articles'>('settings');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Settings State
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    ads_code: '',
    site_name: '',
    site_icon: ''
  });

  // Articles State
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const navigate = useNavigate();

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editingArticle?.content || '';
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    
    setEditingArticle({ ...editingArticle, content: newText });
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (!res.ok) throw new Error();
    } catch (err) {
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const [settingsRes, articlesRes] = await Promise.all([
        fetch('/api/site-info'),
        fetch('/api/articles')
      ]);
      
      const settingsData = await settingsRes.json();
      const articlesData = await articlesRes.json();
      
      setSettings(settingsData);
      setArticles(articlesData);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, site_icon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveArticle = async () => {
    if (!editingArticle?.title || !editingArticle?.slug || !editingArticle?.content) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const isNew = !editingArticle.id;
      const url = isNew ? '/api/admin/articles' : `/api/admin/articles/${editingArticle.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save article');
      }

      setMessage({ type: 'success', text: `Article ${isNew ? 'created' : 'updated'} successfully!` });
      setEditingArticle(null);
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      fetchData();
    } catch (err) {
      alert('Failed to delete article');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your website content and settings</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <a 
            href="/api/export-data" 
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-colors bg-indigo-50 px-4 py-2 rounded-xl"
            title="Download all blog and settings data as JSON"
          >
            <Download className="w-5 h-5" />
            Backup Data
          </a>
          <a 
            href="/api/raw-data" 
            target="_blank"
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
          >
            <Code className="w-5 h-5" />
            Raw JSON
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'settings' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Settings className="w-5 h-5" />
          Site Settings
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'articles' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="w-5 h-5" />
          Articles
        </button>
      </div>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-medium ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-8">
        {activeTab === 'settings' ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Type className="w-4 h-4 text-indigo-600" />
                  Website Name (Logo Text)
                </label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-indigo-500 transition-all"
                  placeholder="XDownloader"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <ImageIcon className="w-4 h-4 text-indigo-600" />
                  Website Icon (Favicon/Logo)
                </label>
                <div className="flex items-center gap-4">
                  {settings.site_icon && (
                    <img src={settings.site_icon} alt="Site Icon" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleIconChange}
                    className="flex-grow text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <LayoutIcon className="w-4 h-4 text-indigo-600" />
                  Website Title
                </label>
                <input
                  type="text"
                  value={settings.site_title}
                  onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-indigo-500 transition-all"
                  placeholder="XDownloader - Best Twitter Video Downloader"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Meta Description
                </label>
                <textarea
                  value={settings.site_description}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-indigo-500 transition-all h-32 resize-none"
                  placeholder="Enter website meta description for SEO..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Code className="w-4 h-4 text-indigo-600" />
                Ads Code (AdSense, etc.)
              </label>
              <textarea
                value={settings.ads_code}
                onChange={(e) => setSettings({ ...settings, ads_code: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden font-mono text-sm focus:border-indigo-500 transition-all h-48 resize-none"
                placeholder="Paste your AdSense or other ad network code here..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Website Settings
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {editingArticle ? (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{editingArticle.id ? 'Edit Article' : 'New Article'}</h2>
                  <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-slate-600 font-bold">Cancel</button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Article Title</label>
                    <input
                      type="text"
                      value={editingArticle.title || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-indigo-500 transition-all"
                      placeholder="How to download Twitter videos..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">URL Slug</label>
                    <input
                      type="text"
                      value={editingArticle.slug || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-indigo-500 transition-all"
                      placeholder="how-to-download-twitter-videos"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Meta Description</label>
                  <textarea
                    value={editingArticle.meta_description || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, meta_description: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-indigo-500 transition-all h-24 resize-none"
                    placeholder="Brief summary for search engines..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700">Content (Markdown supported)</label>
                    <button 
                      onClick={() => setIsPreview(!isPreview)}
                      className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      {isPreview ? <><EyeOff className="w-3 h-3" /> Edit Mode</> : <><Eye className="w-3 h-3" /> Preview Mode</>}
                    </button>
                  </div>

                  {!isPreview && (
                    <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border border-slate-200 rounded-t-xl border-b-0">
                      <button onClick={() => insertMarkdown('# ')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Heading 1"><Heading1 className="w-4 h-4" /></button>
                      <button onClick={() => insertMarkdown('## ')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Heading 2"><Heading2 className="w-4 h-4" /></button>
                      <button onClick={() => insertMarkdown('### ')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Heading 3"><Heading3 className="w-4 h-4" /></button>
                      <button onClick={() => insertMarkdown('**', '**')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Bold"><Bold className="w-4 h-4" /></button>
                      <button onClick={() => insertMarkdown('*', '*')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Italic"><Italic className="w-4 h-4" /></button>
                      <button onClick={() => insertMarkdown('[', '](url)')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Link"><LinkIcon className="w-4 h-4" /></button>
                      <button onClick={() => insertMarkdown('- ')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Bullet List"><List className="w-4 h-4" /></button>
                    </div>
                  )}

                  {isPreview ? (
                    <div className="w-full p-6 bg-white border border-slate-200 rounded-xl min-h-[400px] prose prose-slate max-w-none">
                      <Markdown>{editingArticle.content || ''}</Markdown>
                    </div>
                  ) : (
                    <textarea
                      id="article-content"
                      value={editingArticle.content || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-b-xl outline-hidden focus:border-indigo-500 transition-all h-96 resize-none"
                      placeholder="Write your article content here..."
                    />
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveArticle}
                    disabled={saving}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {editingArticle.id ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditingArticle({})}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    New Article
                  </button>
                </div>

                <div className="grid gap-4">
                  {articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 text-slate-400">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No articles published yet.</p>
                    </div>
                  ) : (
                    articles.map((article) => (
                      <div key={article.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
                        <div>
                          <h3 className="font-bold text-slate-900">{article.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">/{article.slug} • {new Date(article.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setLoading(true);
                              fetch(`/api/articles/${article.slug}`)
                                .then(res => res.json())
                                .then(data => {
                                  setEditingArticle(data);
                                  setLoading(false);
                                });
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
