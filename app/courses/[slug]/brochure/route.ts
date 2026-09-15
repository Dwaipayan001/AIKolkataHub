import { generateCourseBrochure } from '@/lib/course-brochure';
import { getCourse } from '@/lib/courses';

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) return new Response('Course not found', { status: 404 });

  return new Response(generateCourseBrochure(course), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="aikolkatahub-${course.slug}-brochure.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
