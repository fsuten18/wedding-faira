'use client';

import Link, { LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';
import { forwardRef } from 'react';

interface PreserveQueryLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const PreserveQueryLink = forwardRef<HTMLAnchorElement, PreserveQueryLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    const searchParams = useSearchParams();
    const toParam = searchParams.get('to');
    
    // If there's a 'to' param, append it to the href
    const hrefWithQuery = toParam 
      ? `${href}${href.includes('?') ? '&' : '?'}to=${encodeURIComponent(toParam)}`
      : href;

    return (
      <Link 
        href={hrefWithQuery} 
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

PreserveQueryLink.displayName = 'PreserveQueryLink';

export default PreserveQueryLink;
