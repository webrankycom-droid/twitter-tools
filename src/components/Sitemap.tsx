import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, ChevronRight, FileText, Home, Info, Shield, Scale, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface Article {
  id: number;
  title: string;
  slug: string;
  created_at: string;
}

export default function Sitemap() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const mainPages = [
    { name: t('nav.downloader'), path: '/', icon: Home },
    { name: t('nav.blog'), path: '/blog', icon: FileText },
    { name: t('nav.about'), path: '/about', icon: Info },
    { name: t('nav.contact'), path: '/contact', icon: Mail },
    { name: t('nav.privacy'), path: '/privacy', icon: Shield },
    { name: t('nav.terms'), path: '/terms', icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-xl shadow-indigo-200">
            <Map className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900 mb-4">Sitemap</h1>
          <p className="text-lg text-slate-600">Navigate through all the pages and articles on our platform.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
              Main Pages
            </h2>
            <ul className="space-y-4">
              {mainPages.map((page) => (
                <li key={page.path}>
                  <Link 
                    to={page.path}
                    className="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <page.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">{page.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Blog Articles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
          >
            <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              Blog Articles
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <ul className="space-y-4">
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link 
                      to={`/blog/${article.slug}`}
                      className="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                        <span className="font-medium text-slate-700 group-hover:text-slate-900 line-clamp-1">{article.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm italic">No articles published yet.</p>
            )}
          </motion.div>
        </div>

        {/* SEO Footer for Sitemap */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-400">
            Looking for our technical sitemap? Visit <a href="/sitemap.xml" className="text-indigo-600 hover:underline">sitemap.xml</a> for search engines.
          </p>
        </div>
      </div>
    </div>
  );
}
