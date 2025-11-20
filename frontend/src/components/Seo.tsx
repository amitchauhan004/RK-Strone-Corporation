import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  type?: string; // website | article | product
  structuredData?: Record<string, any> | Record<string, any>[];
  canonicalUrl?: string;
};

function ensureTag(name: string, attr: string, value: string) {
  let el = document.head.querySelector(`${name}[${attr}="${value}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement(name) as HTMLMetaElement;
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(name: string, content: string) {
  const el = ensureTag("meta", "name", name) as HTMLMetaElement;
  el.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  const el = ensureTag("meta", "property", property) as HTMLMetaElement;
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setJsonLd(id: string, data: Record<string, any> | Record<string, any>[]) {
  const scriptId = `jsonld-${id}`;
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(data);
}

export default function Seo({ title, description, image, type = "website", structuredData, canonicalUrl }: SeoProps) {
  useEffect(() => {
    const url = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : undefined);
    document.title = title;
    if (description) setMeta('description', description);

    setProperty('og:title', title);
    if (description) setProperty('og:description', description);
    setProperty('og:type', type);
    if (image) setProperty('og:image', image);
    if (url) setProperty('og:url', url);

    // Twitter cards
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', title);
    if (description) setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);

    if (url) setCanonical(url);

    if (structuredData) {
      setJsonLd('primary', structuredData);
    }
  }, [title, description, image, type, canonicalUrl, structuredData]);

  return null;
}


