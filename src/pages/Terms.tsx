import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
          Terms of <span className="gradient-text">Service</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          By using XDownloader, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using our service.
        </p>

        <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By accessing and using XDownloader, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using XDownloader's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-3xl font-bold mb-6">2. Use of Service</h2>
        <p className="mb-6">
          XDownloader is a free online tool provided for personal, non-commercial use only. You agree to use the service in compliance with all applicable local, state, national, and international laws, rules, and regulations.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-8">
          <li><strong>Personal Use:</strong> You may use XDownloader to download public media from X for your personal use.</li>
          <li><strong>Prohibited Use:</strong> You may not use XDownloader to download copyrighted material without the permission of the owner, or to engage in any activity that violates the rights of others.</li>
          <li><strong>No Automated Access:</strong> You may not use any automated system (e.g., bots, scrapers) to access XDownloader for any purpose.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">3. Intellectual Property</h2>
        <p className="mb-6">
          XDownloader does not own any of the content you download. All media downloaded through our service is the property of the original content creator or copyright holder. You are solely responsible for ensuring that your use of the downloaded content complies with all relevant copyright laws.
        </p>

        <h2 className="text-3xl font-bold mb-6">4. Disclaimer of Warranties</h2>
        <p className="mb-6">
          XDownloader is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 className="text-3xl font-bold mb-6">5. Limitation of Liability</h2>
        <p className="mb-6">
          In no event shall XDownloader or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on XDownloader's website.
        </p>

        <h2 className="text-3xl font-bold mb-6">6. Governing Law</h2>
        <p className="mb-12">
          Any claim relating to XDownloader's website shall be governed by the laws of the jurisdiction in which the service is operated without regard to its conflict of law provisions.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Last Updated</p>
          <p className="text-slate-600 font-medium">March 1, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
