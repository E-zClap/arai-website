import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component - Manages meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
 * 
 * Usage:
 * <SEO 
 *   title="Page Title"
 *   description="Page description"
 *   path="/page-path"
 *   type="website"
 * />
 */

const SITE_CONFIG = {
  siteName: 'Quantum Informatics Group',
  siteNameJP: '量子情報学グループ',
  baseUrl: 'https://qig-lab.net', // Update with your actual domain
  defaultImage: '/og-image.png', // Create this image (1200x630px recommended)
  twitterHandle: '@arailab', // Update with actual Twitter handle if available
  organization: {
    name: 'Institute of Science Tokyo',
    nameJP: '東京科学大学',
    department: 'Department of Electrical & Electronic Engineering',
    departmentJP: '電気電子系',
    url: 'https://www.titech.ac.jp'
  }
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: {
      EN: 'Home | Quantum Informatics Group | Arai Laboratory',
      JP: 'ホーム | 量子情報学グループ | 荒井研究室'
    },
    description: {
      EN: 'Quantum Informatics Group at Institute of Science Tokyo. Research in diamond NV centers, quantum sensing, and quantum metrology led by Dr. Keigo Arai.',
      JP: '東京科学大学 量子情報学グループ。荒井啓吾准教授が率いるダイヤモンドNVセンター、量子センシング、量子計測の研究。'
    },
    keywords: 'quantum informatics, NV centers, diamond, quantum sensing, quantum metrology, Tokyo Tech, Institute of Science Tokyo'
  },
  'about-us': {
    title: {
      EN: 'About Us | Quantum Informatics Group',
      JP: '私たちについて | 量子情報学グループ'
    },
    description: {
      EN: 'Learn about our mission, research philosophy, and the vision of the Quantum Informatics Group at Institute of Science Tokyo.',
      JP: '東京科学大学 量子情報学グループのミッション、研究理念、ビジョンについて。'
    },
    keywords: 'about, mission, quantum research, laboratory, Institute of Science Tokyo'
  },
  news: {
    title: {
      EN: 'News & Updates | Quantum Informatics Group',
      JP: 'ニュース | 量子情報学グループ'
    },
    description: {
      EN: 'Latest news, publications, and announcements from the Quantum Informatics Group at Institute of Science Tokyo.',
      JP: '東京科学大学 量子情報学グループの最新ニュース、論文発表、お知らせ。'
    },
    keywords: 'news, updates, publications, announcements, quantum research'
  },
  research: {
    title: {
      EN: 'Research | Quantum Informatics Group',
      JP: '研究 | 量子情報学グループ'
    },
    description: {
      EN: 'Explore our research areas: diamond NV center physics, quantum sensing, quantum metrology, and quantum information science.',
      JP: '研究テーマ：ダイヤモンドNVセンター物理、量子センシング、量子計測、量子情報科学。'
    },
    keywords: 'research, NV center, diamond defects, quantum sensing, quantum metrology, nanoscale NMR'
  },
  publications: {
    title: {
      EN: 'Publications | Quantum Informatics Group',
      JP: '論文・研究業績 | 量子情報学グループ'
    },
    description: {
      EN: 'Academic publications, journal articles, and research papers from the Quantum Informatics Group.',
      JP: '量子情報学グループの学術論文、ジャーナル記事、研究発表。'
    },
    keywords: 'publications, papers, journal articles, research, academic'
  },
  team: {
    title: {
      EN: 'Team | Quantum Informatics Group',
      JP: 'メンバー | 量子情報学グループ'
    },
    description: {
      EN: 'Meet our research team: principal investigator, postdoctoral researchers, PhD students, and alumni.',
      JP: '研究メンバー紹介：教員、ポスドク研究員、博士課程学生、卒業生。'
    },
    keywords: 'team, researchers, scientists, students, PI, postdoc'
  },
  contact: {
    title: {
      EN: 'Contact | Quantum Informatics Group',
      JP: 'お問い合わせ | 量子情報学グループ'
    },
    description: {
      EN: 'Contact the Quantum Informatics Group at Institute of Science Tokyo. Location, email, and collaboration inquiries.',
      JP: '東京科学大学 量子情報学グループへのお問い合わせ。所在地、メール、共同研究のご相談。'
    },
    keywords: 'contact, location, email, collaboration, visit'
  },
  'join-us': {
    title: {
      EN: 'Join Us | Quantum Informatics Group',
      JP: '参加・募集 | 量子情報学グループ'
    },
    description: {
      EN: 'Join our research team! Open positions for PhD students, postdocs, and research opportunities in quantum science.',
      JP: '研究メンバー募集中！博士課程学生、ポスドク、量子科学研究のポジションについて。'
    },
    keywords: 'join, positions, PhD, postdoc, career, opportunities, quantum research'
  },
  'profile-keigo-arai': {
    title: {
      EN: 'Dr. Keigo Arai | Principal Investigator | Quantum Informatics Group',
      JP: '荒井啓吾 准教授 | 量子情報学グループ'
    },
    description: {
      EN: 'Profile of Dr. Keigo Arai, Associate Professor and Principal Investigator at the Quantum Informatics Group, Institute of Science Tokyo.',
      JP: '荒井啓吾准教授のプロフィール。東京科学大学 量子情報学グループ主宰者。'
    },
    keywords: 'Keigo Arai, professor, PI, principal investigator, quantum physicist'
  }
};

export const SEO = ({ 
  page = 'home',
  language = 'EN',
  customTitle,
  customDescription,
  customImage,
  article = false,
  publishedTime,
  modifiedTime,
  author,
  noindex = false
}) => {
  const pageConfig = PAGE_SEO[page] || PAGE_SEO.home;
  const title = customTitle || pageConfig.title[language] || pageConfig.title.EN;
  const description = customDescription || pageConfig.description[language] || pageConfig.description.EN;
  const image = customImage || SITE_CONFIG.defaultImage;
  const url = `${SITE_CONFIG.baseUrl}/${page === 'home' ? '' : page}`;
  const canonicalUrl = url.replace(/\/$/, ''); // Remove trailing slash

  // Organization structured data (JSON-LD)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: SITE_CONFIG.siteName,
    alternateName: SITE_CONFIG.siteNameJP,
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/diam.svg`,
    description: PAGE_SEO.home.description.EN,
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: SITE_CONFIG.organization.name,
      alternateName: SITE_CONFIG.organization.nameJP,
      url: SITE_CONFIG.organization.url
    },
    department: {
      '@type': 'Organization',
      name: SITE_CONFIG.organization.department,
      alternateName: SITE_CONFIG.organization.departmentJP
    },
    sameAs: [
      // Add social media URLs here when available
      // 'https://twitter.com/arailab',
      // 'https://www.linkedin.com/company/arailab'
    ]
  };

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.baseUrl
      },
      ...(page !== 'home' ? [{
        '@type': 'ListItem',
        position: 2,
        name: pageConfig.title.EN.split(' | ')[0],
        item: url
      }] : [])
    ]
  };

  // WebPage structured data
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebPage',
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.baseUrl
    },
    ...(article && publishedTime && {
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@type': 'Person',
        name: author || 'Quantum Informatics Group'
      }
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language === 'JP' ? 'ja' : 'en'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={pageConfig.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_CONFIG.baseUrl}${image}`} />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:locale" content={language === 'JP' ? 'ja_JP' : 'en_US'} />
      {language === 'EN' && <meta property="og:locale:alternate" content="ja_JP" />}
      {language === 'JP' && <meta property="og:locale:alternate" content="en_US" />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_CONFIG.baseUrl}${image}`} />
      {SITE_CONFIG.twitterHandle && (
        <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      )}
      
      {/* Article specific tags */}
      {article && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}
      
      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
