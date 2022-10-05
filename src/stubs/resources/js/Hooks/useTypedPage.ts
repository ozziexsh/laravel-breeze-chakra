import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaSharedProps } from '@/types';

/**
 * Provides types for global shared props via HandleInertiaRequests
 * as well as page specific props
 *
 * const { props } = useTypedPage<{ posts: Post[] }>();
 * props.auth.user // Nullable<User>
 * props.posts // Post[]
 */
export default function useTypedPage<T = Record<string, unknown>>() {
  return usePage<Page<InertiaSharedProps<T>>>();
}
