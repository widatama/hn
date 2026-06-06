import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import Link from 'next/link';
import React from 'react';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function parseHnContent(html: string): React.ReactNode {
  if (!html) return '';

  const processNodeDefinitions = new ProcessNodeDefinitions();

  const processingInstructions = [
    {
      shouldProcessNode(node: any) {
        return node.type === 'tag'
          && node.name === 'a'
          && node.attribs?.href?.includes('news.ycombinator.com');
      },
      processNode(node: any, children: React.ReactNode[], index: number) {
        const originalHref = node.attribs.href;

        const absoluteHref = originalHref.startsWith('//')
          ? `https:${originalHref}`
          : originalHref;

        const url = new URL(absoluteHref);
        let localHref: string;

        if (url.pathname === '/item' && url.searchParams.has('id')) {
          localHref = `${BASE_PATH}/item?id=${url.searchParams.get('id')}`;
        } else if (url.pathname === '/user' && url.searchParams.has('id')) {
          localHref = `${BASE_PATH}/user?id=${url.searchParams.get('id')}`;
        } else {
          localHref = `${url.pathname}${url.search}`;
        }

        const isPlainTextUrl = children.length === 1
          && typeof children[0] === 'string'
          && children[0].trim() === originalHref;

        return (
          <React.Fragment key={index}>
            <Link href={`${window.location.origin}${localHref}`} title="Open in HN Reader">
              {isPlainTextUrl ? `${window.location.origin}${localHref}` : children}
            </Link>
            <Link href={absoluteHref} target="_blank" rel="noopener noreferrer" className="tw:ml-2 tw:!no-underline" title="Open in original HN">
              ↗
            </Link>
          </React.Fragment>
        );
      },
    },
    {
      shouldProcessNode() { return true; },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];

  return Parser().parseWithInstructions(html, () => true, processingInstructions);
}
