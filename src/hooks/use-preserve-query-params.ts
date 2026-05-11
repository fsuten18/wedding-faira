import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function usePreserveQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const toParam = searchParams.get('to');

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      
      // Keep the 'to' parameter if it exists
      if (toParam) {
        newParams.set('to', toParam);
      }
      
      // Add or update other params
      Object.entries(params).forEach(([name, value]) => {
        newParams.set(name, value);
      });

      return newParams.toString();
    },
    [searchParams, toParam]
  );

  const navigate = useCallback((href: string, params: Record<string, string> = {}) => {
    const queryString = createQueryString(params);
    router.push(`${href}${queryString ? `?${queryString}` : ''}`);
  }, [createQueryString, router]);

  return {
    toParam,
    createQueryString,
    navigate,
    currentPath: pathname,
    currentSearchParams: searchParams.toString(),
  };
}
