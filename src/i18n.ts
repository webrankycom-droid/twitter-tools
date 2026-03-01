import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        downloader: 'Downloader',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        tools: 'Tools',
        company: 'Company'
      },
      hero: {
        title: 'The Ultimate Twitter Downloader',
        subtitle: 'Download Twitter videos, photos, and GIFs in HD quality. The fastest X (Twitter) downloader for MP4 and JPG. 100% Free & Secure.',
        placeholder: 'Paste Twitter/X link here...',
        button: 'Download'
      },
      footer: {
        description: 'The best Twitter Video & Image Downloader. Save content from X in HD quality for free. Fast, secure, and reliable.',
        rights: 'All rights reserved. Not affiliated with X Corp.'
      }
    }
  },
  es: {
    translation: {
      nav: {
        downloader: 'Descargador',
        blog: 'Blog',
        about: 'Acerca de',
        contact: 'Contacto',
        privacy: 'Política de Privacidad',
        terms: 'Términos de Servicio',
        tools: 'Herramientas',
        company: 'Compañía'
      },
      hero: {
        title: 'El Mejor Descargador de Twitter',
        subtitle: 'Descarga videos, fotos y GIFs de Twitter en calidad HD. El descargador de X (Twitter) más rápido para MP4 y JPG. 100% Gratis y Seguro.',
        placeholder: 'Pega el enlace de Twitter/X aquí...',
        button: 'Descargar'
      },
      footer: {
        description: 'El mejor descargador de videos e imágenes de Twitter. Guarda contenido de X en calidad HD gratis. Rápido, seguro y confiable.',
        rights: 'Todos los derechos reservados. No afiliado a X Corp.'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        downloader: 'Téléchargeur',
        blog: 'Blog',
        about: 'À propos',
        contact: 'Contact',
        privacy: 'Politique de Confidentialité',
        terms: 'Conditions d\'Utilisation',
        tools: 'Outils',
        company: 'Entreprise'
      },
      hero: {
        title: 'Le Téléchargeur Twitter Ultime',
        subtitle: 'Téléchargez des vidéos, photos et GIFs Twitter en qualité HD. Le téléchargeur X (Twitter) le plus rapide pour MP4 et JPG. 100% Gratuit et Sécurisé.',
        placeholder: 'Collez le lien Twitter/X ici...',
        button: 'Télécharger'
      },
      footer: {
        description: 'Le meilleur téléchargeur de vidéos et d\'images Twitter. Enregistrez le contenu de X en qualité HD gratuitement. Rapide, sûr et fiable.',
        rights: 'Tous droits réservés. Non affilié à X Corp.'
      }
    }
  },
  pt: {
    translation: {
      nav: {
        downloader: 'Download',
        blog: 'Blog',
        about: 'Sobre',
        contact: 'Contato',
        privacy: 'Política de Privacidade',
        terms: 'Termos de Serviço',
        tools: 'Ferramentas',
        company: 'Empresa'
      },
      hero: {
        title: 'O Melhor Downloader do Twitter',
        subtitle: 'Baixe vídeos, fotos e GIFs do Twitter em qualidade HD. O downloader de X (Twitter) mais rápido para MP4 e JPG. 100% Gratuito e Seguro.',
        placeholder: 'Cole o link do Twitter/X aqui...',
        button: 'Baixar'
      },
      footer: {
        description: 'O melhor downloader de vídeos e imagens do Twitter. Salve conteúdo do X em qualidade HD gratuitamente. Rápido, seguro e confiável.',
        rights: 'Todos os direitos reservados. Não afiliado à X Corp.'
      }
    }
  },
  de: {
    translation: {
      nav: {
        downloader: 'Downloader',
        blog: 'Blog',
        about: 'Über uns',
        contact: 'Kontakt',
        privacy: 'Datenschutz',
        terms: 'Nutzungsbedingungen',
        tools: 'Tools',
        company: 'Unternehmen'
      },
      hero: {
        title: 'Der ultimative Twitter Downloader',
        subtitle: 'Laden Sie Twitter-Videos, Fotos und GIFs in HD-Qualität herunter. Der schnellste X (Twitter) Downloader für MP4 und JPG. 100% kostenlos und sicher.',
        placeholder: 'Twitter/X Link hier einfügen...',
        button: 'Download'
      },
      footer: {
        description: 'Der beste Twitter Video & Image Downloader. Speichern Sie Inhalte von X kostenlos in HD-Qualität. Schnell, sicher und zuverlässig.',
        rights: 'Alle Rechte vorbehalten. Nicht mit X Corp. verbunden.'
      }
    }
  },
  it: {
    translation: {
      nav: {
        downloader: 'Downloader',
        blog: 'Blog',
        about: 'Chi siamo',
        contact: 'Contatti',
        privacy: 'Privacy Policy',
        terms: 'Termini di Servizio',
        tools: 'Strumenti',
        company: 'Azienda'
      },
      hero: {
        title: 'Il Miglior Downloader di Twitter',
        subtitle: 'Scarica video, foto e GIF di Twitter in qualità HD. Il downloader di X (Twitter) più veloce per MP4 e JPG. 100% gratuito e sicuro.',
        placeholder: 'Incolla il link di Twitter/X qui...',
        button: 'Scarica'
      },
      footer: {
        description: 'Il miglior downloader di video e immagini di Twitter. Salva i contenuti di X in qualità HD gratuitamente. Veloce, sicuro e affidabile.',
        rights: 'Tutti i diritti riservati. Non affiliato a X Corp.'
      }
    }
  },
  tr: {
    translation: {
      nav: {
        downloader: 'İndirici',
        blog: 'Blog',
        about: 'Hakkımızda',
        contact: 'İletişim',
        privacy: 'Gizlilik Politikası',
        terms: 'Kullanım Koşulları',
        tools: 'Araçlar',
        company: 'Şirket'
      },
      hero: {
        title: 'En İyi Twitter İndirici',
        subtitle: 'Twitter videolarını, fotoğraflarını ve GIF\'lerini HD kalitesinde indirin. MP4 ve JPG için en hızlı X (Twitter) indiricisi. %100 Ücretsiz ve Güvenli.',
        placeholder: 'Twitter/X bağlantısını buraya yapıştırın...',
        button: 'İndir'
      },
      footer: {
        description: 'En iyi Twitter Video ve Resim İndiricisi. X\'teki içerikleri ücretsiz olarak HD kalitesinde kaydedin. Hızlı, güvenli ve güvenilir.',
        rights: 'Tüm hakları saklıdır. X Corp. ile bağlantılı değildir.'
      }
    }
  },
  id: {
    translation: {
      nav: {
        downloader: 'Pengunduh',
        blog: 'Blog',
        about: 'Tentang Kami',
        contact: 'Kontak',
        privacy: 'Kebijakan Privasi',
        terms: 'Ketentuan Layanan',
        tools: 'Alat',
        company: 'Perusahaan'
      },
      hero: {
        title: 'Pengunduh Twitter Terbaik',
        subtitle: 'Unduh video, foto, dan GIF Twitter dalam kualitas HD. Pengunduh X (Twitter) tercepat untuk MP4 dan JPG. 100% Gratis & Aman.',
        placeholder: 'Tempel tautan Twitter/X di sini...',
        button: 'Unduh'
      },
      footer: {
        description: 'Pengunduh Video & Gambar Twitter terbaik. Simpan konten dari X dalam kualitas HD secara gratis. Cepat, aman, dan andal.',
        rights: 'Seluruh hak cipta. Tidak berafiliasi dengan X Corp.'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        downloader: 'محمل الفيديوهات',
        blog: 'المدونة',
        about: 'حول الموقع',
        contact: 'اتصل بنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
        tools: 'الأدوات',
        company: 'الشركة'
      },
      hero: {
        title: 'أفضل محمل فيديوهات تويتر',
        subtitle: 'قم بتحميل فيديوهات وصور تويتر وGIF بجودة HD. أسرع محمل لـ X (تويتر) لـ MP4 وJPG. مجاني وآمن بنسبة 100%.',
        placeholder: 'الصق رابط تويتر/X هنا...',
        button: 'تحميل'
      },
      footer: {
        description: 'أفضل محمل فيديوهات وصور تويتر. احفظ المحتوى من X بجودة HD مجانًا. سريع وآمن وموثوق.',
        rights: 'جميع الحقوق محفوظة. غير تابع لشركة X Corp.'
      }
    }
  },
  nl: {
    translation: {
      nav: {
        downloader: 'Downloader',
        blog: 'Blog',
        about: 'Over ons',
        contact: 'Contact',
        privacy: 'Privacybeleid',
        terms: 'Servicevoorwaarden',
        tools: 'Tools',
        company: 'Bedrijf'
      },
      hero: {
        title: 'De Ultieme Twitter Downloader',
        subtitle: 'Download Twitter-video\'s, foto\'s en GIF\'s in HD-kwaliteit. De snelste X (Twitter) downloader voor MP4 en JPG. 100% gratis en veilig.',
        placeholder: 'Plak Twitter/X link hier...',
        button: 'Downloaden'
      },
      footer: {
        description: 'De beste Twitter Video & Image Downloader. Sla inhoud van X gratis op in HD-kwaliteit. Snel, veilig en betrouwbar.',
        rights: 'Alle rechten voorbehouden. Niet gelieerd aan X Corp.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
