// ─── PDF Pages Content Data for Programmatic SEO ─────────────────────────────

export const PDF_PAGES_DATA = [
  {
    slug: 'merge-pdf',
    tab: 'merge',
    name: 'Merge PDF Files Online',
    title: 'Merge PDF Files Online — Free, Private & Unlimited | Rocking Tools',
    description: 'Combine multiple PDF files into one single document in seconds. 100% browser-based with pdf-lib, zero file upload, complete privacy.',
    keywords: 'merge pdf, combine pdf files, join pdf online, free pdf merger, merge pdf without upload, private pdf joiner',
    intro: 'Combine multiple PDF documents, reports, receipts, and scans into a single organized PDF file — processed 100% locally in your browser with zero server uploads.',
    useCases: [
      { title: 'Combine Business Reports', desc: 'Merge quarterly financial statements, presentations, and executive summaries into a cohesive deck.' },
      { title: 'Application Document Packages', desc: 'Join resumes, cover letters, certificates, and portfolio samples into one submission file.' },
      { title: 'Tax & Receipt Consolidation', desc: 'Bundle multi-page invoices, tax forms, and expense receipts for accountants or tax filings.' },
    ],
    faqs: [
      { q: 'Are my PDF files uploaded to your servers?', a: 'No. All PDF merging runs client-side inside your web browser using WebAssembly and pdf-lib. Your confidential documents never leave your computer.' },
      { q: 'Can I reorder the pages or files before merging?', a: 'Yes. You can drag or arrange the uploaded PDF files in the exact order you want them appended before generating the merged file.' },
      { q: 'Is there a limit on how many PDFs I can combine?', a: 'There is no artificial file count or size limit. Since processing runs on your local CPU and memory, you can merge as many documents as your device can handle.' },
    ],
  },
  {
    slug: 'split-pdf',
    tab: 'split',
    name: 'Split PDF & Extract Pages',
    title: 'Split PDF Pages Online — Free, Instant Page Extractor | Rocking Tools',
    description: 'Split PDF documents and extract specific pages or page ranges into separate files. 100% client-side privacy, zero file uploads.',
    keywords: 'split pdf, extract pdf pages, separate pdf pages online, free pdf splitter, cut pdf pages, split pdf without uploading',
    intro: 'Extract specific pages, page ranges (e.g. 1-5, 8, 11-14), or separate every page of your PDF into standalone files with complete security.',
    useCases: [
      { title: 'Extract Single Invoices or Pages', desc: 'Pull out one specific invoice or contract page from a massive 100-page accounting document.' },
      { title: 'Remove Unnecessary Pages', desc: 'Trim confidential or irrelevant pages before sharing a PDF presentation with external clients.' },
      { title: 'Separate Chapters or Sections', desc: 'Break down large eBooks, technical manuals, or study guides into manageable chapter files.' },
    ],
    faqs: [
      { q: 'How do I specify which pages to extract?', a: 'Enter individual page numbers separated by commas (e.g., 1, 3, 5) or page ranges with dashes (e.g., 1-4, 7-10).' },
      { q: 'Is splitting confidential PDFs safe on this website?', a: 'Yes, 100%. The splitting algorithm runs strictly in your browser memory. No data is transmitted over the internet.' },
    ],
  },
  {
    slug: 'image-to-pdf',
    tab: 'convert',
    name: 'Image to PDF Converter',
    title: 'Convert Images to PDF Online (JPG, PNG, WebP) — Free | Rocking Tools',
    description: 'Convert JPG, PNG, and WebP images to high-quality PDF documents. Reorder images, adjust orientation, 100% private in-browser.',
    keywords: 'image to pdf, convert image to pdf, photos to pdf, picture to pdf online, free image to pdf converter, jpg png to pdf',
    intro: 'Turn photos, scans, and screenshots into clean, professional PDF documents. Add multiple images, arrange page order, and download instantly.',
    useCases: [
      { title: 'Document Scans & IDs', desc: 'Convert smartphone camera photos of physical documents, receipts, or IDs into standardized PDF files.' },
      { title: 'Photo Portfolios & Lookbooks', desc: 'Assemble high-resolution design graphics and artwork into a downloadable presentation PDF.' },
      { title: 'Class Notes & Whiteboards', desc: 'Combine photos of lecture notes or brainstorming whiteboard sessions into a single readable PDF.' },
    ],
    faqs: [
      { q: 'Which image formats can be converted to PDF?', a: 'You can convert JPEG/JPG, PNG, WebP, GIF, and BMP images into PDF pages.' },
      { q: 'Can I add multiple photos into one PDF?', a: 'Yes! Upload multiple images at once and arrange their order before generating the multi-page PDF.' },
    ],
  },
  {
    slug: 'jpg-to-pdf',
    tab: 'convert',
    name: 'JPG to PDF Converter',
    title: 'JPG to PDF Converter — Free, Fast & Private Online | Rocking Tools',
    description: 'Convert JPG / JPEG photos to PDF documents instantly. 100% browser-based conversion with zero quality loss and zero uploads.',
    keywords: 'jpg to pdf, jpeg to pdf, convert jpg to pdf, photos to pdf, save jpg as pdf, free jpg to pdf converter',
    intro: 'Convert JPG / JPEG images into clean, standard PDF documents. Perfect for official forms, homework submissions, and scanned papers.',
    useCases: [
      { title: 'Official Form Attachments', desc: 'Convert JPG scans of government forms or signatures to required PDF format.' },
      { title: 'Multi-Page Photo Documents', desc: 'Bundle multiple photo pages of a book or contract into one sequential PDF.' },
    ],
    faqs: [
      { q: 'How do I convert JPG to PDF for free?', a: 'Upload your JPG images into the tool, arrange the page sequence, and click "Download PDF". It converts instantly in your browser.' },
    ],
  },
  {
    slug: 'png-to-pdf',
    tab: 'convert',
    name: 'PNG to PDF Converter',
    title: 'PNG to PDF Converter — High-Quality Crisp Conversion | Rocking Tools',
    description: 'Convert transparent and high-res PNG images into PDF files. Preserves visual sharpness with 100% in-browser processing.',
    keywords: 'png to pdf, convert png to pdf, save png as pdf, png to pdf online, free png to pdf converter',
    intro: 'Convert PNG graphics, screenshots, diagrams, and digital artwork into high-definition vector-friendly PDF pages.',
    useCases: [
      { title: 'Digital Diagrams & Charts', desc: 'Convert software architecture diagrams, flowcharts, or infographics from PNG to PDF.' },
      { title: 'High-Res Design Exports', desc: 'Publish Figma or Photoshop PNG exports as client-ready PDF deliverables.' },
    ],
    faqs: [
      { q: 'Does PNG transparency convert well to PDF?', a: 'Yes, our engine renders transparent PNGs against clean white background pages suitable for professional printing and viewing.' },
    ],
  },
]

export function getPdfPageBySlug(slug) {
  return PDF_PAGES_DATA.find((p) => p.slug === slug)
}
