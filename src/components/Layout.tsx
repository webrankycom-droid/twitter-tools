import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Download, Twitter, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface SiteInfo {
  site_title: string;
  site_description: string;
  ads_code: string;
  site_name: string;
  site_icon: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  const scrollToDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById('download-box');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('download-box');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch('/api/site-info')
      .then(res => res.json())
      .then(data => {
        setSiteInfo(data);
        
        // Update document metadata
        if (data.site_title) document.title = data.site_title;
        
        // Update Favicon if icon exists
        if (data.site_icon) {
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = data.site_icon;
        }
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', data.site_description);
        } else {
          const meta = document.createElement('meta');
          meta.name = "description";
          meta.content = data.site_description;
          document.head.appendChild(meta);
        }

        // Inject Ads Code
        if (data.ads_code) {
          const scriptContainer = document.getElementById('ads-container');
          if (scriptContainer) {
            scriptContainer.innerHTML = data.ads_code;
            // Execute any scripts in the ads code
            const scripts = scriptContainer.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
              const script = document.createElement('script');
              if (scripts[i].src) {
                script.src = scripts[i].src;
              } else {
                script.innerHTML = scripts[i].innerHTML;
              }
              document.head.appendChild(script);
            }
          }
        }
      });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ads Container (Hidden) */}
      <div id="ads-container" className="hidden"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" onClick={scrollToDownload} className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg overflow-hidden flex items-center justify-center min-w-[40px] min-h-[40px]">
                {siteInfo?.site_icon ? (
                  <img src={siteInfo.site_icon} alt="Logo" className="w-6 h-6 object-contain" />
                ) : (
                  <Download className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="text-xl font-display font-bold tracking-tight">{siteInfo?.site_name || 'XDownloader'}</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link to="/" onClick={scrollToDownload} className={`hover:text-indigo-600 transition-colors ${location.pathname === '/' ? 'text-indigo-600' : ''}`}>{t('nav.downloader')}</Link>
              <Link to="/blog" className={`hover:text-indigo-600 transition-colors ${location.pathname.startsWith('/blog') ? 'text-indigo-600' : ''}`}>{t('nav.blog')}</Link>
              <Link to="/about" className={`hover:text-indigo-600 transition-colors ${location.pathname === '/about' ? 'text-indigo-600' : ''}`}>{t('nav.about')}</Link>
              <Link to="/contact" className={`hover:text-indigo-600 transition-colors ${location.pathname === '/contact' ? 'text-indigo-600' : ''}`}>{t('nav.contact')}</Link>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg overflow-hidden flex items-center justify-center min-w-[32px] min-h-[32px]">
                  {siteInfo?.site_icon ? (
                    <img src={siteInfo.site_icon} alt="Logo" className="w-4 h-4 object-contain" />
                  ) : (
                    <Download className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-xl font-display font-bold text-white tracking-tight">{siteInfo?.site_name || 'XDownloader'}</span>
              </div>
              <p className="max-w-sm mb-8">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com/xdownloader" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="https://github.com/xdownloader" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">{t('nav.tools')}</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" onClick={scrollToDownload} className="hover:text-white transition-colors">Twitter Video Downloader</Link></li>
                <li><Link to="/" onClick={scrollToDownload} className="hover:text-white transition-colors">Twitter Image Downloader</Link></li>
                <li><Link to="/" onClick={scrollToDownload} className="hover:text-white transition-colors">Twitter GIF Downloader</Link></li>
                <li><Link to="/" onClick={scrollToDownload} className="hover:text-white transition-colors">Twitter to MP4</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">{t('nav.company')}</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('nav.privacy')}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t('nav.terms')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© {new Date().getFullYear()} {siteInfo?.site_name || 'XDownloader'}. {t('footer.rights')}</p>
            <div className="flex gap-8">
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              <Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
