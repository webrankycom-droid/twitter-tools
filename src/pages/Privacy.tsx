import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          At XDownloader, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our service.
        </p>

        <h2 className="text-3xl font-bold mb-6">1. Information We Collect</h2>
        <p className="mb-6">
          XDownloader is designed to be a privacy-first tool. We do not require you to create an account, provide an email address, or share any personal identification.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-8">
          <li><strong>Usage Data:</strong> We may collect anonymous usage data such as your IP address (for rate limiting), browser type, and the pages you visit on our site.</li>
          <li><strong>Cookies:</strong> We use cookies to improve your experience and to serve relevant advertisements via third-party networks like Google AdSense.</li>
          <li><strong>No Media Storage:</strong> We do not store the videos, images, or GIFs you download. Our service acts as a real-time proxy to provide you with direct download links from public sources.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">2. Third-Party Services</h2>
        <p className="mb-6">
          We use third-party services to enhance our platform and provide a free service to our users.
        </p>
        <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-8">
          <li><strong>Google AdSense:</strong> We use Google AdSense to serve ads. Google uses cookies to serve ads based on your previous visits to our website or other websites on the internet. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google Ad Settings</a>.</li>
          <li><strong>Analytics:</strong> We may use anonymous analytics tools to understand how our users interact with XDownloader and to improve our service.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">3. Data Security</h2>
        <p className="mb-6">
          We implement a variety of security measures to maintain the safety of your information. Our website uses SSL (Secure Sockets Layer) encryption to ensure that all data transmitted between your browser and our servers is secure.
        </p>

        <h2 className="text-3xl font-bold mb-6">4. Changes to This Policy</h2>
        <p className="mb-6">
          We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2 className="text-3xl font-bold mb-6">5. Contact Us</h2>
        <p className="mb-12">
          If you have any questions about our Privacy Policy, please contact us at <a href="mailto:support@xdownloader.app" className="text-indigo-600 hover:underline">support@xdownloader.app</a>.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Last Updated</p>
          <p className="text-slate-600 font-medium">March 1, 2026</p>
        </div>
      </motion.div>
    </div>
  );
}
