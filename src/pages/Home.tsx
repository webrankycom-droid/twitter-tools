import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Image as ImageIcon,
  Film,
  Play,
  Shield,
  Download,
  Info
} from 'lucide-react';
import Downloader from '../components/Downloader';

export default function Home() {
  const [siteName, setSiteName] = useState('XDownloader');

  useEffect(() => {
    fetch('/api/site-info')
      .then(res => res.json())
      .then(data => {
        if (data.site_name) setSiteName(data.site_name);
      })
      .catch(() => {});

    // Canonical link
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.origin + window.location.pathname);
  }, []);

  // JSON-LD Schema for SEO
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `${siteName} - Best Twitter Video & Image Downloader`,
      "operatingSystem": "Windows, macOS, Android, iOS, Linux",
      "applicationCategory": "MultimediaApplication",
      "description": "Download Twitter videos, photos, and GIFs in HD quality. The fastest X (Twitter) downloader for MP4 and JPG. Free, secure, and no registration required.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "15680"
      },
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      },
      "featureList": [
        "HD Video Download",
        "Original Image Quality",
        "GIF to MP4 Conversion",
        "No Registration Required",
        "Fast Processing",
        "Mobile Friendly"
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <div id="download-box" className="relative pt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
        </div>
        <Downloader />
      </div>

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">Powerful Features for X Media</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "HD Video Quality",
                desc: "Download videos in the highest resolution available, from 240p up to 1080p and 4K UHD.",
                icon: <Film className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "Original Image Size",
                desc: "Extract photos and images in their original uploaded resolution without any compression.",
                icon: <ImageIcon className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "GIF to MP4",
                desc: "Convert Twitter GIFs to high-quality MP4 video files for easy sharing and playback.",
                icon: <Play className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "No Registration",
                desc: "Use our tool instantly without creating an account or providing personal information.",
                icon: <CheckCircle2 className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "Fast & Secure",
                desc: "Our high-speed servers ensure your downloads are processed in seconds with SSL security.",
                icon: <Shield className="w-8 h-8 text-indigo-600" />
              },
              {
                title: "Unlimited Usage",
                desc: "Download as many videos and images as you want. There are no daily limits or restrictions.",
                icon: <Download className="w-8 h-8 text-indigo-600" />
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section 1: Video Downloader */}
      <section id="video-downloader" className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-center">Twitter Video Downloader to MP4</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Our <strong>Twitter Video Downloader</strong> is the most efficient tool to save videos from X (formerly Twitter) directly to your device. Whether you want to save a viral clip, a news segment, or a funny meme, {siteName} provides high-quality MP4 files in seconds.
            </p>
            <h3 className="text-2xl font-bold mb-4">Why use our Twitter to MP4 converter?</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
              <li><strong>HD Quality:</strong> We extract the highest resolution available, including 1080p and 4K.</li>
              <li><strong>Fast Processing:</strong> No waiting in queues. Our engine processes links instantly.</li>
              <li><strong>No Watermarks:</strong> Get clean videos without any added logos or watermarks.</li>
              <li><strong>Universal Compatibility:</strong> Works on Windows, Mac, Android, and iOS.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEO Content Section 2: Image Downloader */}
      <section id="image-downloader" className="bg-slate-50 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-center">Twitter Image & Photo Downloader</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Looking for a <strong>Twitter Photo Downloader</strong>? {siteName} isn't just for videos. We also support high-resolution image extraction. Save photos, infographics, and illustrations from X in their original quality.
            </p>
            <h3 className="text-2xl font-bold mb-4">Features of X Image Downloader:</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
              <li><strong>Original Resolution:</strong> Download images in the exact size they were uploaded.</li>
              <li><strong>Bulk Support:</strong> Easily save multiple images from a single tweet thread.</li>
              <li><strong>Secure Downloads:</strong> We use SSL encryption to ensure your downloads are safe.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Supported Devices Section */}
      <section id="devices" className="bg-indigo-600 py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Download on Any Device</h2>
          <p className="text-xl text-indigo-100 mb-12">
            {siteName} is a cross-platform web application. You can use it on any device with a modern web browser.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "iPhone / iOS", icon: "📱" },
              { name: "Android", icon: "🤖" },
              { name: "Windows PC", icon: "💻" },
              { name: "macOS", icon: "🍎" }
            ].map((device, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-4xl mb-4">{device.icon}</div>
                <div className="font-bold">{device.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: `Is ${siteName} free to use?`,
                a: `Yes, ${siteName} is 100% free. You can download as many videos and images as you want without any hidden costs or subscriptions.`
              },
              {
                q: "How to download Twitter videos on iPhone?",
                a: `On iPhone, you can use ${siteName} via the Safari browser. Simply paste the link, click download, and save the file to your 'Files' app or 'Photos' gallery.`
              },
              {
                q: "Can I download private Twitter videos?",
                a: "No, for privacy reasons, we cannot access or download videos from private accounts. You can only download content from public tweets."
              },
              {
                q: "Where are my downloaded videos saved?",
                a: "By default, files are saved in your device's 'Downloads' folder. You can change this in your browser settings."
              },
              {
                q: `Do I need to install any software?`,
                a: `No, ${siteName} is a web-based tool. You don't need to install any apps or browser extensions.`
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-600" />
                  {faq.q}
                </h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
