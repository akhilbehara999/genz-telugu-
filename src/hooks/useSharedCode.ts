import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { decodeShare } from '../utils/share';

export function useSharedCode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadExample } = useStore();

  useEffect(() => {
    const shareParam = searchParams.get('share');
    if (shareParam) {
      const data = decodeShare(shareParam);
      if (data) {
        loadExample({
          id: `shared-${Date.now()}`,
          title: data.name,
          description: 'Shared code snippet',
          code: data.code,
          category: 'Shared',
        });
        setSearchParams({});
      }
    }
  }, [searchParams, loadExample, setSearchParams]);
}
