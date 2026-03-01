import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Twitter, Github, ArrowLeft } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-slate max-w-none"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform no-underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tight">
          Contact <span className="gradient-text">Us</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          Have a question, feedback, or a business inquiry? We'd love to hear from you. Our team is dedicated to providing the best possible experience for our users.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
            <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Mail className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-slate-600 mb-4">For general inquiries and technical support.</p>
            <a href="mailto:support@xdownloader.app" className="text-indigo-600 font-bold hover:underline">support@xdownloader.app</a>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
            <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Feedback</h3>
            <p className="text-slate-600 mb-4">Help us improve XDownloader with your suggestions.</p>
            <a href="mailto:feedback@xdownloader.app" className="text-emerald-600 font-bold hover:underline">feedback@xdownloader.app</a>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Connect with Us</h2>
        <p className="mb-8">
          Follow us on social media for updates, tips, and news about XDownloader and our other projects.
        </p>

        <div className="flex gap-6 mb-16">
          <a href="https://twitter.com/xdownloader" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-bold">
            <Twitter className="w-6 h-6" />
            Twitter
          </a>
          <a href="https://github.com/xdownloader" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-slate-100 hover:bg-slate-900 hover:text-white transition-all font-bold">
            <Github className="w-6 h-6" />
            GitHub
          </a>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8">
          <h3 className="text-indigo-900 font-bold mb-4">Response Time</h3>
          <p className="text-indigo-800 text-sm leading-relaxed">
            We aim to respond to all inquiries within 24-48 hours. Please be patient as we are a small team. For technical issues, please include as much detail as possible, including the tweet URL and your browser version.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
