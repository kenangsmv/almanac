import { Fragment, type ReactNode } from 'react';
import { Link } from '@mui/material';

// Renders a small HTML snippet (e.g. APOD credit) as safe React nodes: text stays
// text, <a> becomes a MUI Link, <br> a line break. Only the href and text content
// are ever read, so no markup is injected — nothing to sanitize, no XSS.
function toNodes(nodes: NodeListOf<ChildNode>): ReactNode[] {
  return Array.from(nodes).map((node, i) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return <Fragment key={i}>{node.textContent}</Fragment>;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const el = node as HTMLElement;
    if (el.tagName === 'BR') return <br key={i} />;

    const children = toNodes(el.childNodes);
    if (el.tagName === 'A') {
      const href = el.getAttribute('href');
      // Only trust real web links; drop javascript:/data: etc. to plain text.
      if (href && /^https?:\/\//i.test(href)) {
        return (
          <Link key={i} href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </Link>
        );
      }
    }
    return <Fragment key={i}>{children}</Fragment>;
  });
}

export function RichText({ html }: { html: string }) {
  const { body } = new DOMParser().parseFromString(html, 'text/html');
  return <>{toNodes(body.childNodes)}</>;
}
