import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, ArrowRight, Calendar, Loader2 } from 'lucide-react';
import Downloader from '../components/Downloader';

interface Article {
  id: number;
  title: string;
  slug: string;
  meta_description: string;
  created_at: string;
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Downloader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6 tracking-tight">
          XDownloader <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tips, tricks, and guides on how to download and manage your favorite Twitter media.
        </p>
      </motion.div>

      <div className="grid gap-8">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No articles published yet. Check back soon!</p>
          </div>
        ) : (
          articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span>Guide</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                <Link to={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {article.meta_description}
              </p>
              <Link 
                to={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
              >
                Read Article
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
