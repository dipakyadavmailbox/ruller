import qrcode from 'qrcode-generator'

/**
 * Generate 100% compliant QR Code boolean matrix using industry-standard qrcode-generator
 * Supports all versions (1-40) and Error Correction levels (L, M, Q, H).
 */
export function generateQrMatrix(text, ecLevel = 'M') {
  const content = text && text.trim() ? text : 'https://www.rockingtools.com'
  const ec = ['L', 'M', 'Q', 'H'].includes(ecLevel) ? ecLevel : 'M'

  // TypeNumber 0 = Auto-detect optimal QR Version (1-40)
  const qr = qrcode(0, ec)
  qr.addData(content)
  qr.make()

  const numModules = qr.getModuleCount()
  const matrix = []

  for (let r = 0; r < numModules; r++) {
    const row = []
    for (let c = 0; c < numModules; c++) {
      row.push(qr.isDark(r, c) ? 1 : 0)
    }
    matrix.push(row)
  }

  return matrix
}

/**
 * Render QR matrix to HTML5 Canvas
 */
export function drawQrToCanvas(canvas, matrix, options = {}) {
  if (!canvas || !matrix) return;
  const {
    fgColor = '#000000',
    bgColor = '#ffffff',
    margin = 4,
    dotShape = 'square', // 'square' | 'rounded' | 'dots'
    size = 400,
    logoText = '',
  } = options;

  const ctx = canvas.getContext('2d');
  const numModules = matrix.length;
  const totalModules = numModules + margin * 2;

  canvas.width = size;
  canvas.height = size;

  const cellSize = size / totalModules;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Foreground
  ctx.fillStyle = fgColor;

  for (let r = 0; r < numModules; r++) {
    for (let c = 0; c < numModules; c++) {
      if (matrix[r][c] === 1) {
        const x = (c + margin) * cellSize;
        const y = (r + margin) * cellSize;

        if (dotShape === 'dots') {
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (dotShape === 'rounded') {
          const radius = cellSize * 0.3;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, cellSize + 0.3, cellSize + 0.3, radius);
          } else {
            ctx.rect(x, y, cellSize + 0.3, cellSize + 0.3);
          }
          ctx.fill();
        } else {
          ctx.fillRect(x, y, cellSize + 0.3, cellSize + 0.3);
        }
      }
    }
  }

  // Render Optional Center Logo Text / Icon
  if (logoText) {
    const logoSize = cellSize * Math.floor(numModules * 0.22);
    const centerX = size / 2;
    const centerY = size / 2;

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(centerX - logoSize / 2 - 4, centerY - logoSize / 2 - 4, logoSize + 8, logoSize + 8, 8);
    } else {
      ctx.rect(centerX - logoSize / 2 - 4, centerY - logoSize / 2 - 4, logoSize + 8, logoSize + 8);
    }
    ctx.fill();

    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = fgColor;
    ctx.font = `${Math.floor(logoSize * 0.65)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(logoText, centerX, centerY + 2);
  }
}

/**
 * Generate SVG String of QR Code
 */
export function generateQrSvgString(matrix, options = {}) {
  if (!matrix) return '';
  const {
    fgColor = '#000000',
    bgColor = '#ffffff',
    margin = 4,
    dotShape = 'square',
    size = 400,
    logoText = '',
  } = options;

  const numModules = matrix.length;
  const totalModules = numModules + margin * 2;
  const cellSize = size / totalModules;

  let pathData = '';

  for (let r = 0; r < numModules; r++) {
    for (let c = 0; c < numModules; c++) {
      if (matrix[r][c] === 1) {
        const x = (c + margin) * cellSize;
        const y = (r + margin) * cellSize;

        if (dotShape === 'dots') {
          const cx = x + cellSize / 2;
          const cy = y + cellSize / 2;
          const rad = cellSize / 2.2;
          pathData += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${rad.toFixed(2)}" fill="${fgColor}"/>`;
        } else if (dotShape === 'rounded') {
          const rVal = (cellSize * 0.3).toFixed(2);
          pathData += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(cellSize + 0.3).toFixed(2)}" height="${(cellSize + 0.3).toFixed(2)}" rx="${rVal}" fill="${fgColor}"/>`;
        } else {
          pathData += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(cellSize + 0.3).toFixed(2)}" height="${(cellSize + 0.3).toFixed(2)}" fill="${fgColor}"/>`;
        }
      }
    }
  }

  let logoSvg = '';
  if (logoText) {
    const logoSize = cellSize * Math.floor(numModules * 0.22);
    const centerX = size / 2;
    const centerY = size / 2;
    logoSvg = `
      <rect x="${(centerX - logoSize / 2 - 4).toFixed(2)}" y="${(centerY - logoSize / 2 - 4).toFixed(2)}" width="${(logoSize + 8).toFixed(2)}" height="${(logoSize + 8).toFixed(2)}" rx="8" fill="${bgColor}" stroke="${fgColor}" stroke-width="2"/>
      <text x="${centerX.toFixed(2)}" y="${(centerY + 2).toFixed(2)}" font-size="${Math.floor(logoSize * 0.65)}" text-anchor="middle" dominant-baseline="central" fill="${fgColor}">${logoText}</text>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    ${pathData}
    ${logoSvg}
  </svg>`;
}
