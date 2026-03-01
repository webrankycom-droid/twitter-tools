import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from 'lucide-react';
import Downloader from '../components/Downloader';

interface Article {
  title: string;
  content: string;
  meta_description: string;
  created_at: string;
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
        
        if (data.title) {
          document.title = `${data.title} - XDownloader Blog`;
        }
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-slate-600 mb-8">The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="text-indigo-600 font-bold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Downloader />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <div className="flex items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(article.created_at).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            5 min read
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-10 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:underline prose-img:rounded-3xl shadow-indigo-500/10">
          <Markdown>{article.content}</Markdown>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">XD</div>
            <div>
              <p className="font-bold text-slate-900">XDownloader Team</p>
              <p className="text-sm text-slate-500">Media Archiving Experts</p>
            </div>
          </div>
          <button 
            onClick={() => {
              navigator.share?.({
                title: article.title,
                url: window.location.href
              }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share Article
          </button>
        </div>
      </motion.div>
    </div>
  );
}
