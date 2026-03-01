import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function About() {
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
          About <span className="gradient-text">XDownloader</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          XDownloader is a leading free utility designed to help users archive and save public media from X (formerly Twitter). Our mission is to provide a fast, secure, and user-friendly platform for social media managers, researchers, and content creators to manage their digital assets.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
            <p className="text-slate-600">
              We are committed to providing a transparent and secure service. We do not require registration, and we never store your personal data or downloaded files on our servers.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Info className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">Why XDownloader?</h3>
            <p className="text-slate-600">
              Unlike other tools, we prioritize quality and speed. We extract the highest resolution available directly from public sources, ensuring you get the best version of your content.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <p className="mb-6">
          XDownloader acts as a bridge between the public X API and your device. When you paste a link, our system identifies the media assets associated with that public tweet and provides direct download links for your convenience.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 mb-16">
          <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            AdSense Compliance & Quality
          </h3>
          <p className="text-indigo-800 text-sm leading-relaxed">
            We strive to maintain a high-quality environment for our users and advertisers. Our content is original, informative, and adheres to the strict policies set by major advertising networks like Google AdSense. We focus on utility and user experience above all else.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <p>
          We are a small team of developers and designers passionate about building useful web tools. XDownloader is one of our many projects aimed at making the web more accessible and productive for everyone.
        </p>
      </motion.div>
    </div>
  );
}
