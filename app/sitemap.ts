import { courses } from '@/lib/courses';
import { SITE_URL } from '@/lib/site';

const LAST_CONTENT_UPDATE = '2026-09-20';

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, lastModified: LAST_CONTENT_UPDATE },
    ...courses.map(({ slug }) => ({
      url: `${SITE_URL}/courses/${slug}`,
      lastModified: LAST_CONTENT_UPDATE,
    })),
  ];
}
