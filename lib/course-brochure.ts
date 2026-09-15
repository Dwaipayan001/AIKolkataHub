import type { Course } from '@/lib/courses';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

type Rgb = [number, number, number];

const palette: Record<Course['accent'], Rgb> = {
  cyan: [0.43, 0.92, 0.84],
  violet: [0.64, 0.55, 1],
  lime: [0.78, 1, 0.24],
  orange: [1, 0.67, 0.42],
};

function ascii(value: string) {
  return value
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u00b7/g, '/')
    .replace(/[^\x20-\x7e]/g, '');
}

function escapePdf(value: string) {
  return ascii(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrap(value: string, maxCharacters: number) {
  const words = ascii(value).split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharacters) current = candidate;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function rgb([r, g, b]: Rgb) {
  return `${r} ${g} ${b}`;
}

function text(
  value: string,
  x: number,
  y: number,
  size = 10,
  font: 'F1' | 'F2' = 'F1',
  color: Rgb = [0.08, 0.1, 0.12],
) {
  return `BT /${font} ${size} Tf ${rgb(color)} rg 1 0 0 1 ${x} ${y} Tm (${escapePdf(value)}) Tj ET`;
}

function paragraph(
  value: string,
  x: number,
  y: number,
  width: number,
  size = 10,
  leading = 14,
  color: Rgb = [0.3, 0.34, 0.37],
  font: 'F1' | 'F2' = 'F1',
) {
  const averageCharacterWidth = size * 0.52;
  const lines = wrap(
    value,
    Math.max(12, Math.floor(width / averageCharacterWidth)),
  );
  return lines
    .map((item, index) => text(item, x, y - index * leading, size, font, color))
    .join('\n');
}

function rect(x: number, y: number, width: number, height: number, color: Rgb) {
  return `${rgb(color)} rg ${x} ${y} ${width} ${height} re f`;
}

function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: Rgb,
  width = 1,
) {
  return `${rgb(color)} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`;
}

function pageBase(accent: Rgb, pageNumber: number, dark = false) {
  const commands = [
    rect(
      0,
      0,
      PAGE_WIDTH,
      PAGE_HEIGHT,
      dark ? [0.035, 0.05, 0.07] : [0.97, 0.975, 0.97],
    ),
  ];
  commands.push(rect(0, PAGE_HEIGHT - 8, PAGE_WIDTH, 8, accent));
  commands.push(
    text(
      'AIKolkataHub',
      42,
      806,
      13,
      'F2',
      dark ? [0.94, 0.96, 0.95] : [0.06, 0.08, 0.1],
    ),
  );
  commands.push(
    text(
      'PYTHON + AI COACHING / KOLKATA',
      350,
      808,
      7,
      'F2',
      dark ? [0.45, 0.5, 0.55] : [0.42, 0.46, 0.44],
    ),
  );
  commands.push(
    line(42, 36, 553, 36, dark ? [0.15, 0.18, 0.21] : [0.8, 0.82, 0.8]),
  );
  commands.push(
    text(
      'hellocodeadda@gmail.com',
      42,
      20,
      7,
      'F1',
      dark ? [0.55, 0.6, 0.64] : [0.4, 0.44, 0.42],
    ),
  );
  commands.push(
    text(
      `COURSE BROCHURE / ${String(pageNumber).padStart(2, '0')}`,
      447,
      20,
      7,
      'F2',
      dark ? [0.55, 0.6, 0.64] : [0.4, 0.44, 0.42],
    ),
  );
  return commands;
}

function coverPage(course: Course, accent: Rgb) {
  const commands = pageBase(accent, 1, true);
  commands.push(text(course.code, 42, 746, 9, 'F2', accent));
  commands.push(text(course.eyebrow, 460, 746, 8, 'F2', accent));

  let titleY = 675;
  for (const titleLine of wrap(course.title, 21)) {
    commands.push(text(titleLine, 42, titleY, 38, 'F2', [0.95, 0.97, 0.96]));
    titleY -= 45;
  }

  commands.push(
    paragraph(course.summary, 42, titleY - 12, 430, 13, 19, [0.66, 0.71, 0.75]),
  );
  commands.push(rect(42, 355, 511, 104, [0.065, 0.09, 0.12]));
  commands.push(rect(42, 355, 5, 104, accent));
  commands.push(text('THE OUTCOME', 65, 430, 8, 'F2', accent));
  commands.push(
    paragraph(course.promise, 65, 400, 445, 16, 21, [0.91, 0.93, 0.92], 'F2'),
  );

  const specs = [
    ['LEVEL', course.level],
    ['BEST FOR', course.ageGroup],
    ['DURATION', course.duration],
    ['FORMAT', course.format],
  ];
  specs.forEach(([label, value], index) => {
    const x = 42 + index * 128;
    commands.push(text(label, x, 292, 7, 'F2', accent));
    commands.push(
      paragraph(value, x, 270, 112, 9, 12, [0.84, 0.87, 0.86], 'F2'),
    );
  });

  commands.push(text('LEARN BY BUILDING', 42, 183, 8, 'F2', [0.45, 0.5, 0.54]));
  commands.push(
    paragraph(
      'Live mentor guidance. Small student batches. Practical checkpoints. Portfolio-ready projects.',
      42,
      154,
      455,
      12,
      18,
      [0.83, 0.86, 0.85],
    ),
  );
  commands.push(rect(42, 65, 194, 40, accent));
  commands.push(text('BOOK A FREE DEMO', 66, 80, 10, 'F2', [0.04, 0.06, 0.07]));
  commands.push(
    text('Live online / Sat + Sun', 263, 80, 9, 'F1', [0.6, 0.65, 0.68]),
  );
  return commands.join('\n');
}

function curriculumPage(course: Course, accent: Rgb) {
  const commands = pageBase(accent, 2);
  commands.push(text('COURSE MAP', 42, 757, 8, 'F2', accent));
  commands.push(text("What you'll learn.", 42, 714, 27, 'F2'));
  commands.push(
    text(
      'Six connected modules. Guided practice to independent building.',
      42,
      686,
      10,
      'F1',
      [0.38, 0.42, 0.4],
    ),
  );

  let y = 630;
  course.modules.forEach((module) => {
    commands.push(line(42, y + 22, 553, y + 22, [0.79, 0.81, 0.79]));
    commands.push(text(module.number, 42, y - 2, 9, 'F2', accent));
    commands.push(text(module.title, 82, y - 2, 13, 'F2'));
    commands.push(
      paragraph(
        module.description,
        82,
        y - 22,
        285,
        8.5,
        12,
        [0.34, 0.38, 0.36],
      ),
    );
    commands.push(
      paragraph(
        module.topics.join(' / '),
        385,
        y - 3,
        157,
        7.2,
        10,
        [0.38, 0.42, 0.4],
      ),
    );
    y -= 91;
  });

  commands.push(rect(42, 55, 511, 55, [0.9, 0.92, 0.9]));
  commands.push(
    text('EVERY MODULE INCLUDES', 59, 87, 7, 'F2', [0.35, 0.39, 0.37]),
  );
  commands.push(
    text(
      'Live feedback  /  practical checkpoint  /  mentor review',
      59,
      69,
      10,
      'F2',
    ),
  );
  return commands.join('\n');
}

function outcomesPage(course: Course, accent: Rgb) {
  const commands = pageBase(accent, 3);
  commands.push(text('BUILD, TEST, SHOW', 42, 757, 8, 'F2', accent));
  commands.push(text('Leave with proof.', 42, 714, 27, 'F2'));
  commands.push(
    text('THREE PORTFOLIO PROJECTS', 42, 667, 8, 'F2', [0.4, 0.44, 0.42]),
  );

  course.projects.forEach((project, index) => {
    const x = 42 + index * 174;
    commands.push(rect(x, 475, 163, 166, [0.91, 0.925, 0.915]));
    commands.push(text(`0${index + 1}`, x + 15, 615, 8, 'F2', accent));
    commands.push(
      paragraph(
        project.title,
        x + 15,
        584,
        133,
        13,
        16,
        [0.08, 0.1, 0.09],
        'F2',
      ),
    );
    commands.push(
      paragraph(
        project.description,
        x + 15,
        535,
        133,
        8,
        11,
        [0.34, 0.38, 0.36],
      ),
    );
    commands.push(
      paragraph(project.build, x + 15, 491, 133, 7, 10, accent, 'F2'),
    );
  });

  commands.push(text('BY THE END, YOU CAN', 42, 426, 8, 'F2', accent));
  course.outcomes.forEach((outcome, index) => {
    const column = index < 3 ? 0 : 1;
    const row = column === 0 ? index : index - 3;
    const x = column === 0 ? 42 : 310;
    const y = 394 - row * 38;
    commands.push(rect(x, y - 3, 7, 7, accent));
    commands.push(
      paragraph(outcome, x + 17, y, 220, 9, 12, [0.2, 0.24, 0.22], 'F2'),
    );
  });

  commands.push(text('YOUR TOOLBELT', 42, 267, 8, 'F2', accent));
  commands.push(
    paragraph(
      course.tools.join('  /  '),
      42,
      242,
      500,
      10,
      14,
      [0.18, 0.22, 0.2],
      'F2',
    ),
  );
  commands.push(rect(42, 65, 511, 125, [0.045, 0.06, 0.075]));
  commands.push(text('READY TO EXPLORE?', 62, 159, 8, 'F2', accent));
  commands.push(
    text(
      'Start with a free demo class.',
      62,
      124,
      20,
      'F2',
      [0.95, 0.97, 0.96],
    ),
  );
  commands.push(
    text(
      'Meet a mentor, see the lab and decide with zero pressure.',
      62,
      98,
      9,
      'F1',
      [0.62, 0.67, 0.7],
    ),
  );
  commands.push(text('hellocodeadda@gmail.com', 409, 122, 9, 'F2', accent));
  commands.push(
    text('Live online / Sat + Sun', 409, 102, 7.5, 'F1', [0.62, 0.67, 0.7]),
  );
  return commands.join('\n');
}

function buildPdf(pageStreams: string[]) {
  const objects: string[] = [];
  const pageIds = pageStreams.map((_, index) => 3 + index * 2);
  const regularFontId = 3 + pageStreams.length * 2;
  const boldFontId = regularFontId + 1;
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  pageStreams.forEach((stream, index) => {
    const pageId = pageIds[index];
    const contentId = pageId + 1;
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] =
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  objects[regularFontId] =
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[boldFontId] =
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  let pdf = '%PDF-1.4\n%AIKolkataHub\n';
  const offsets = [0];
  for (let index = 1; index < objects.length; index++) {
    offsets[index] = pdf.length;
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let index = 1; index < objects.length; index++) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new TextEncoder().encode(pdf);
}

export function generateCourseBrochure(course: Course) {
  const accent = palette[course.accent];
  return buildPdf([
    coverPage(course, accent),
    curriculumPage(course, accent),
    outcomesPage(course, accent),
  ]);
}
