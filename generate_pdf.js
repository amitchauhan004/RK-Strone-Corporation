const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { products } = require('./frontend/src/data/products.ts');

// List of 59 products for the catalog
const pagesConfig = [
  // Page 3
  {
    pageNum: 3,
    sections: [
      {
        title: 'SANDSTONE TEMPLE',
        items: [
          'Carved Sandstone Temple',
          'Hand Carved Sandstone Temple',
          'Handcrafted Sandstone Temple',
          'High Quality White Sandstone Temple',
          'Indian Style Sandstone Temple',
          'Natural Red Sandstone Temple',
          'Premium Sandstone Hindu Temple',
          'Sandstone Outdoor Temple'
        ]
      },
      {
        title: 'SANDSTONE TEMPLE ENTRY GATE',
        items: [
          'Designer Sandstone Temple Entrance Gate',
          'Hand Carved Sandstone Temple Entry Gate',
          'Handcrafted Sandstone Temple Main Gate',
          'Heavy Duty Sandstone Entry Gate for Temple'
        ]
      }
    ]
  },
  // Page 4
  {
    pageNum: 4,
    sections: [
      {
        title: 'SANDSTONE TEMPLE ENTRY GATE (CONT.)',
        items: [
          'Natural Sandstone Entry Gate with Traditional Carving',
          'Solid Sandstone Temple Entry Gate',
          'Traditional Sandstone Entry Gate for Temple'
        ]
      },
      {
        title: 'DHOLPUR SANDSTONE TEMPLE',
        items: [
          '17 Foot Dholpur Pink Sand Stone Temple',
          '20 Feet Dholpur Sand Stone Temple',
          '21 Feet Dholpur Sandstone Temple',
          '23 Feet Dholpur Sandstone Temple',
          'Custom Made Dholpur Sandstone Temple',
          'Dholpur Pink Sandstone Temple',
          'Dholpur Red Sandstone Temple',
          'Dholpur Stone Outdoor Temple'
        ]
      }
    ]
  },
  // Page 5
  {
    pageNum: 5,
    sections: [
      {
        title: 'SANDSTONE GRILL',
        items: [
          'Artistic Sandstone Grill',
          'Custom Made Sandstone Grill',
          'Decorative Sandstone Grill for Exterior Walls',
          'Designer Sandstone Grill for Temple'
        ]
      },
      {
        title: 'SANDSTONE LAMP',
        items: [
          'Artistic Sandstone Lamp Post',
          'Contemporary White Sandstone Lamp',
          'Custom Made Sandstone Lamp Post',
          'Decorative Sandstone Lamp Post'
        ]
      },
      {
        title: 'SANDSTONE GAZEBO',
        items: [
          'Brown Sandstone Outdoor Gazebo',
          'Decorative Sandstone Gazebo for Luxury Garden',
          'Dome White Sandstone Garden Gazebo',
          'Handcrafted Sandstone Gazebo'
        ]
      }
    ]
  },
  // Page 6
  {
    pageNum: 6,
    sections: [
      {
        title: 'SANDSTONE FOUNTAINS',
        items: [
          'Hand Carved Sandstone Fountains',
          'Handcrafted Sandstone Water Fountains',
          'Heritage Style Sandstone Fountains',
          'Natural Sandstone Fountains for Outdoor'
        ]
      },
      {
        title: 'SANDSTONE GARDEN BENCH',
        items: [
          '2 Seater Sandstone Garden Bench',
          'Designer Round Sandstone Table Bench Set',
          'Handcrafted Red Sandstone Table Bench Set',
          'Red Sandstone Garden Bench'
        ]
      },
      {
        title: 'SANDSTONE PLANTER',
        items: [
          'Brown Sandstone Garden Planter',
          'Decorative Garden Sandstone Planter',
          'Hand Carved Sandstone Planter',
          'Handcrafted Sandstone Planter'
        ]
      }
    ]
  },
  // Page 7
  {
    pageNum: 7,
    sections: [
      {
        title: 'SANDSTONE BALL SPHERE',
        items: [
          'Decorative Sandstone Sphere',
          'Modern Polished Rainbow Sandstone Ball',
          'Natural Sandstone Sphere',
          'Solid Rainbow Sandstone Ball'
        ]
      },
      {
        title: 'SANDSTONE ELEPHANT STATUE',
        items: [
          'Artisan Crafted Sandstone Elephant Sculpture',
          'Decorative Sandstone Elephant Statue',
          'Hand Carved Sandstone Elephant Statue',
          'Handcrafted Sandstone Elephant Statue'
        ]
      },
      {
        title: 'SANDSTONE GOD STATUE',
        items: [
          'Sandstone Adi Guru Shankaracharya Statue',
          'Sandstone Sherawali Mata Statue',
          'Sandstone Standing Vishnu Bhagwan Statue',
          'White Sandstone Buddha Statue'
        ]
      }
    ]
  }
];

// Cache for image base64
const imageCache = new Map();

async function getBase64Image(urlOrPath) {
  if (imageCache.has(urlOrPath)) return imageCache.get(urlOrPath);

  try {
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      const res = await fetch(urlOrPath);
      if (!res.ok) throw new Error('Fetch failed: ' + res.status);
      const ab = await res.arrayBuffer();
      const b64 = 'data:image/jpeg;base64,' + Buffer.from(ab).toString('base64');
      imageCache.set(urlOrPath, b64);
      return b64;
    } else {
      const localPath = path.resolve(__dirname, urlOrPath.replace(/^\//, ''));
      if (fs.existsSync(localPath)) {
        const buf = fs.readFileSync(localPath);
        const ext = path.extname(localPath).toLowerCase().replace('.', '') || 'jpeg';
        const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
        const b64 = `data:${mime};base64,` + buf.toString('base64');
        imageCache.set(urlOrPath, b64);
        return b64;
      }
    }
  } catch (e) {
    console.error('Error fetching image:', urlOrPath, e.message);
  }
  return '';
}

function getProductInfo(name) {
  const found = products.find(p => p.name.toLowerCase() === name.toLowerCase());
  return {
    name: found?.name || name,
    image: found?.image || ''
  };
}

async function buildHtml() {
  console.log('Downloading and converting assets for PDF generation...');
  
  // Local base64 images
  const logoB64 = await getBase64Image('frontend/src/assets/logo.png');
  const heroB64 = await getBase64Image('frontend/src/assets/Stone-Temple.jpg');
  const qrB64 = await getBase64Image('frontend/public/flipbook/qr-website.png');
  
  // About Us 3 images
  const aboutGateB64 = await getBase64Image('https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/designer-sandstone-temple-entrance-gate-1769601091-8558036.jpeg');
  const aboutLampB64 = await getBase64Image('https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/premium-white-sandstone-lamp-post-1769680741-8559738.jpeg');
  const aboutBenchB64 = await getBase64Image('https://2.wlimg.com/product_images/bc-500/2026/2/10109625/watermark/designer-round-sandstone-table-bench-set-1769685508-8559988.jpeg');

  // Pre-fetch all 59 product images
  const allNames = [];
  pagesConfig.forEach(p => p.sections.forEach(s => s.items.forEach(item => allNames.push(item))));
  console.log(`Pre-fetching ${allNames.length} product images...`);
  
  for (const name of allNames) {
    const info = getProductInfo(name);
    if (info.image) {
      await getBase64Image(info.image);
    }
  }
  console.log('All images ready in memory! Total cached:', imageCache.size);

  const headerHtml = (title) => `
    <div class="page-header">
      <div class="header-brand">
        <div class="logo-box">
          <img src="${logoB64}" alt="RK Stone" />
        </div>
        <span class="brand-text">RK Stone Corporation</span>
      </div>
      <div class="header-stripes">
        <div class="s1"></div>
        <div class="s-space"></div>
        <div class="s2"></div>
        <div class="s-space"></div>
        <div class="s1"></div>
      </div>
      <div class="header-title">${title}</div>
    </div>
  `;

  let pagesHtml = '';

  // ================= PAGE 1: COVER =================
  pagesHtml += `
    <div class="page page-cover" style="background-image: linear-gradient(rgba(10,10,10,0.75), rgba(0,0,0,0.92)), url('${heroB64}');">
      <div class="cover-top">
        <div class="top-tag"><span class="dot"></span> JAIPUR &bull; RAJASTHAN &bull; INDIA</div>
        <div class="top-year">ESTD. 2009</div>
      </div>
      <div class="cover-center">
        <div class="logo-large">
          <img src="${logoB64}" alt="RK Stone Corporation" />
        </div>
        <h1 class="main-title">RK STONE CORPORATION</h1>
        <div class="gold-divider"></div>
        <div class="sub-title">NATURAL SANDSTONE PRODUCTS</div>
        <div class="edition-pill">OFFICIAL FLIPBOOK CATALOGUE &bull; 59 KEY WORKS</div>
      </div>
      <div class="cover-bottom">
        <div>DIRECT WORKSHOP & QUARRY SOURCING &bull; PAN-INDIA DELIVERY</div>
        <div class="edition-tag">EDITION 2026-27</div>
      </div>
    </div>
  `;

  // ================= PAGE 2: ABOUT US =================
  pagesHtml += `
    <div class="page page-about">
      ${headerHtml('ABOUT US')}
      <div class="about-content">
        <div class="about-left">
          <h2 class="about-heading">ABOUT RK STONE CORPORATION</h2>
          <div class="about-p">
            RK Stone Corporation, established in 2009, is a renowned Manufacturer and Supplier of premium sandstone products based in Rajasthan, India. The company specializes in crafting exquisite Sandstone Temples, Temple Entry Gates, and Dholpur Sandstone Temples that reflect timeless Indian architecture. Its diverse product range includes Sandstone Grills, Lamps, Gazebos, Fountains, Garden Benches, Planters, and Decorative Sandstone Spheres.
          </div>
          <div class="about-p">
            RK Stone Corporation is also known for artistic sandstone statues such as Elephants, Gods, Angels, Mother Child figures, Wall Murals, and Red Sandstone Ashok Stambh with Pillar. With skilled craftsmanship and quality focus, the company serves domestic markets reliably.
          </div>
          <div class="about-info-cards">
            <div class="info-card">
              <span class="info-lbl">NAME OF FOUNDER:</span>
              <span class="info-val">Mr. Rajendra Saini</span>
            </div>
            <div class="info-card">
              <span class="info-lbl">YEAR OF ESTABLISHMENT:</span>
              <span class="info-val">2009</span>
            </div>
            <div class="info-card">
              <span class="info-lbl">NATURE OF BUSINESS:</span>
              <span class="info-val">Manufacturer, Supplier</span>
            </div>
          </div>
        </div>
        <div class="about-right">
          <div class="specimen-card">
            <img src="${aboutGateB64}" alt="Temple Entry Gate" />
            <div class="specimen-label">Temple Entry Gates</div>
          </div>
          <div class="specimen-card">
            <img src="${aboutLampB64}" alt="Sandstone Lamp Posts" />
            <div class="specimen-label">Sandstone Lamp Posts</div>
          </div>
          <div class="specimen-card">
            <img src="${aboutBenchB64}" alt="Sandstone Garden Benches" />
            <div class="specimen-label">Sandstone Garden Benches</div>
          </div>
        </div>
      </div>
      <div class="page-footer">
        <span>RK Stone Corporation &bull; Jaipur</span>
        <span class="footer-page">Page 2 of 8</span>
      </div>
    </div>
  `;

  // ================= PAGES 3 to 7: PRODUCTS =================
  for (const page of pagesConfig) {
    let sectionsHtml = '';
    for (const section of page.sections) {
      let itemsHtml = '';
      for (const itemName of section.items) {
        const info = getProductInfo(itemName);
        const itemB64 = imageCache.get(info.image) || '';
        itemsHtml += `
          <div class="product-card">
            <div class="img-box">
              <img src="${itemB64}" alt="${info.name}" />
            </div>
            <div class="product-name">${info.name}</div>
          </div>
        `;
      }

      sectionsHtml += `
        <div class="section-group">
          <div class="section-title-bar">
            <h3 class="section-title">${section.title}</h3>
            <span class="section-count">${section.items.length} ITEMS</span>
          </div>
          <div class="products-grid">
            ${itemsHtml}
          </div>
        </div>
      `;
    }

    pagesHtml += `
      <div class="page page-products">
        ${headerHtml('PRODUCTS')}
        <div class="products-content">
          ${sectionsHtml}
        </div>
        <div class="page-footer">
          <span>RK Stone Corporation &bull; Jaipur, Rajasthan</span>
          <span class="footer-page">Page ${page.pageNum} of 8</span>
        </div>
      </div>
    `;
  }

  // ================= PAGE 8: CONTACT US (BACK COVER) =================
  pagesHtml += `
    <div class="page page-contact">
      ${headerHtml('CONTACT')}
      <div class="contact-content">
        <div class="contact-top">
          <h2 class="contact-title-1">RK STONE</h2>
          <h2 class="contact-title-2">CORPORATION</h2>
          <div class="contact-gold-bar"></div>
        </div>
        
        <div class="contact-directory">
          <div class="dir-item">
            <div class="dir-icon">👤</div>
            <div class="dir-info">
              <div class="dir-label">CONTACT PERSON</div>
              <div class="dir-val highlight">Mr. Rajendra Saini</div>
            </div>
          </div>

          <div class="dir-item">
            <div class="dir-icon">📍</div>
            <div class="dir-info">
              <div class="dir-label">ADDRESS (JAIPUR WORKSHOP & YARD)</div>
              <div class="dir-val">Front of Surya City, Paldi Meena, Agra Road, Jaipur 302031, Rajasthan, India</div>
            </div>
          </div>

          <div class="dir-item">
            <div class="dir-icon">📞</div>
            <div class="dir-info">
              <div class="dir-label">CALL US</div>
              <div class="dir-val font-mono bold">+91 94147 84562</div>
            </div>
          </div>

          <div class="dir-item">
            <div class="dir-icon">✉️</div>
            <div class="dir-info">
              <div class="dir-label">EMAIL ID</div>
              <div class="dir-val font-mono">contact@rkstonecorporation.com</div>
            </div>
          </div>

          <div class="dir-item">
            <div class="dir-icon">🌐</div>
            <div class="dir-info">
              <div class="dir-label">WEBSITE</div>
              <div class="dir-val font-mono link">www.rkstonecorporation.com</div>
            </div>
          </div>

          <div class="dir-item">
            <div class="dir-icon">🏛️</div>
            <div class="dir-info">
              <div class="dir-label">GST REGISTRATION</div>
              <div class="dir-val font-mono bold">08CUUPS3588K1ZE</div>
            </div>
          </div>
        </div>

        <div class="contact-bottom-box">
          <div class="qr-info-text">
            <div class="qr-heading">VISIT OUR OFFICIAL WEBSITE & CATALOGUE</div>
            <div class="qr-sub">Scan QR code using any smartphone camera to view 122+ live works, custom sizes & direct workshop rate estimates.</div>
            <div class="hotline-text">Direct Inquiry WhatsApp & Call: <strong>+91 94147 84562</strong></div>
          </div>
          <div class="qr-box">
            <img src="${qrB64}" alt="QR Code to www.rkstonecorporation.com" />
          </div>
        </div>
      </div>
      
      <div class="contact-footer">
        <span>www.rkstonecorporation.com &bull; Direct Quarry & Workshop Sourcing</span>
        <span class="footer-page">Page 8 of 8</span>
      </div>
    </div>
  `;

  // Complete HTML document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RK Stone Corporation - Official Flipbook Catalogue</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 210mm;
      height: 297mm;
      background: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1c1917;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 210mm;
      height: 297mm;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Page Header */
    .page-header {
      background: #000000;
      color: #FFFFFF;
      height: 20mm;
      padding: 0 8mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }
    .header-brand {
      display: flex;
      align-items: center;
      gap: 3mm;
      z-index: 2;
    }
    .logo-box {
      width: 10mm;
      height: 10mm;
      border-radius: 50%;
      background: #1c1917;
      border: 1px solid rgba(212,175,55,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 1mm;
    }
    .logo-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .brand-text {
      font-size: 13pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #FFFFFF;
    }
    .header-stripes {
      position: absolute;
      right: 48mm;
      top: 0;
      bottom: 0;
      width: 32mm;
      display: flex;
      transform: skewX(-30deg);
      opacity: 0.85;
    }
    .header-stripes .s1 { flex: 1; background: #D4AF37; }
    .header-stripes .s2 { flex: 1; background: #8B5A2B; }
    .header-stripes .s-space { width: 2mm; background: #000000; }
    .header-title {
      font-size: 13pt;
      font-weight: 900;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #D4AF37;
      z-index: 2;
    }

    /* Page Footer */
    .page-footer {
      background: #F5F5F4;
      border-top: 1px solid #E7E5E4;
      height: 10mm;
      padding: 0 8mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 8.5pt;
      color: #57534E;
      font-family: monospace;
      flex-shrink: 0;
    }
    .footer-page {
      font-weight: bold;
      color: #0c0a09;
    }

    /* ================= PAGE 1: COVER ================= */
    .page-cover {
      background-size: cover;
      background-position: center;
      color: #FFFFFF;
      padding: 16mm 14mm;
      justify-content: space-between;
    }
    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid rgba(212,175,55,0.4);
      padding-bottom: 4mm;
      font-family: monospace;
      font-size: 9.5pt;
      letter-spacing: 1px;
    }
    .top-tag { color: #FDE047; font-weight: bold; display: flex; align-items: center; gap: 2mm; }
    .top-tag .dot { width: 2mm; height: 2mm; border-radius: 50%; background: #FDE047; display: inline-block; }
    .top-year { color: #E7E5E4; }
    .cover-center {
      text-align: center;
      margin: auto 0;
      padding: 10mm 0;
    }
    .logo-large {
      width: 32mm;
      height: 32mm;
      margin: 0 auto 6mm auto;
      padding: 2mm;
      border: 1px solid rgba(212,175,55,0.4);
      background: rgba(0,0,0,0.5);
    }
    .logo-large img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .main-title {
      font-size: 26pt;
      font-weight: 900;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #FFFFFF;
      margin-bottom: 4mm;
      text-shadow: 0 2px 6px rgba(0,0,0,0.8);
    }
    .gold-divider {
      width: 40mm;
      height: 1mm;
      background: #D4AF37;
      margin: 0 auto 5mm auto;
    }
    .sub-title {
      font-size: 13pt;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #FDE047;
      margin-bottom: 6mm;
    }
    .edition-pill {
      display: inline-block;
      padding: 2.5mm 6mm;
      background: rgba(212,175,55,0.2);
      border: 1px solid rgba(212,175,55,0.5);
      color: #FEF08A;
      font-family: monospace;
      font-size: 9pt;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .cover-bottom {
      border-top: 1.5px solid rgba(212,175,55,0.4);
      padding-top: 4mm;
      display: flex;
      justify-content: space-between;
      font-family: monospace;
      font-size: 8.5pt;
      color: #E7E5E4;
      letter-spacing: 1px;
    }

    /* ================= PAGE 2: ABOUT US ================= */
    .page-about {
      background: #FAF9F6;
    }
    .about-content {
      padding: 8mm;
      display: flex;
      gap: 7mm;
      flex: 1;
    }
    .about-left {
      flex: 1.1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .about-heading {
      font-size: 14pt;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #0c0a09;
      border-bottom: 2px solid #D4AF37;
      padding-bottom: 3mm;
      margin-bottom: 4mm;
    }
    .about-p {
      font-size: 9.5pt;
      line-height: 1.6;
      color: #44403C;
      text-align: justify;
      margin-bottom: 4mm;
    }
    .about-info-cards {
      display: flex;
      flex-direction: column;
      gap: 3mm;
      margin-top: auto;
    }
    .info-card {
      background: #1C1917;
      color: #FFFFFF;
      padding: 3mm 4mm;
      border-left: 3.5mm solid #D4AF37;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9pt;
    }
    .info-lbl {
      color: #A8A29E;
      font-family: monospace;
      font-size: 8pt;
    }
    .info-val {
      color: #FDE047;
      font-weight: bold;
      font-size: 9.5pt;
    }
    .about-right {
      flex: 0.9;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 4mm;
    }
    .specimen-card {
      flex: 1;
      border-radius: 3mm;
      overflow: hidden;
      border: 1px solid #D6D3D1;
      position: relative;
      background: #E7E5E4;
      box-shadow: 0 1mm 2mm rgba(0,0,0,0.08);
    }
    .specimen-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .specimen-label {
      position: absolute;
      bottom: 2mm;
      left: 3mm;
      background: rgba(0,0,0,0.8);
      color: #FFFFFF;
      font-family: monospace;
      font-size: 8pt;
      padding: 1mm 2.5mm;
    }

    /* ================= PAGES 3-7: PRODUCTS ================= */
    .products-content {
      padding: 5mm 7mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .section-group {
      margin-bottom: 3mm;
    }
    .section-title-bar {
      border-bottom: 2px solid #1C1917;
      padding-bottom: 1.5mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .section-title {
      font-size: 10.5pt;
      font-weight: 900;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #0C0A09;
    }
    .section-count {
      font-size: 7.5pt;
      font-family: monospace;
      color: #78716C;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 3.5mm;
    }
    .product-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .product-card .img-box {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 2.5mm;
      overflow: hidden;
      border: 1px solid #D6D3D1;
      background: #F5F5F4;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .product-card .img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .product-name {
      margin-top: 1.5mm;
      font-size: 7.5pt;
      font-weight: 700;
      color: #1C1917;
      line-height: 1.25;
      height: 6mm;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ================= PAGE 8: CONTACT ================= */
    .page-contact {
      background: #FAF9F6;
    }
    .contact-content {
      padding: 10mm 12mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .contact-top {
      margin-bottom: 3mm;
    }
    .contact-title-1 {
      font-size: 26pt;
      font-weight: 900;
      letter-spacing: 2px;
      color: #0C0A09;
      line-height: 1;
    }
    .contact-title-2 {
      font-size: 26pt;
      font-weight: 900;
      letter-spacing: 2px;
      color: #D4AF37;
      line-height: 1;
      margin-top: 1mm;
    }
    .contact-gold-bar {
      width: 25mm;
      height: 1.5mm;
      background: #D4AF37;
      margin-top: 3mm;
    }
    .contact-directory {
      display: flex;
      flex-direction: column;
      gap: 3.5mm;
    }
    .dir-item {
      display: flex;
      align-items: flex-start;
      gap: 3.5mm;
    }
    .dir-icon {
      font-size: 14pt;
      line-height: 1;
    }
    .dir-label {
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #0C0A09;
      text-transform: uppercase;
      margin-bottom: 0.8mm;
    }
    .dir-val {
      font-size: 10pt;
      color: #292524;
      line-height: 1.35;
    }
    .dir-val.highlight {
      font-weight: bold;
      font-size: 11pt;
      color: #0C0A09;
    }
    .dir-val.font-mono { font-family: monospace; }
    .dir-val.bold { font-weight: bold; }
    .dir-val.link { color: #854D0E; font-weight: bold; text-decoration: underline; }

    .contact-bottom-box {
      border-top: 1.5px solid #D6D3D1;
      padding-top: 4mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6mm;
    }
    .qr-info-text {
      flex: 1;
    }
    .qr-heading {
      font-size: 9.5pt;
      font-weight: 800;
      text-transform: uppercase;
      color: #0C0A09;
      margin-bottom: 1.5mm;
    }
    .qr-sub {
      font-size: 8.5pt;
      color: #57534E;
      line-height: 1.35;
      margin-bottom: 2mm;
    }
    .hotline-text {
      font-size: 9pt;
      color: #0C0A09;
      font-family: monospace;
    }
    .qr-box {
      width: 25mm;
      height: 25mm;
      padding: 1.5mm;
      background: #FFFFFF;
      border: 1.5px solid #0C0A09;
      border-radius: 1.5mm;
      flex-shrink: 0;
    }
    .qr-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .contact-footer {
      background: #0C0A09;
      color: #FFFFFF;
      height: 10mm;
      padding: 0 8mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 8.5pt;
      font-family: monospace;
    }
    .contact-footer .footer-page { color: #D4AF37; }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
}

async function run() {
  try {
    const html = await buildHtml();
    const tempHtmlPath = path.resolve(__dirname, 'catalog_print_temp.html');
    fs.writeFileSync(tempHtmlPath, html, 'utf-8');
    console.log('HTML written to:', tempHtmlPath, 'size:', html.length);

    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const outputPdf = path.resolve(__dirname, 'frontend/public/flipbook/rk_stone_corporation_catalog.pdf');

    console.log('Rendering PDF via Headless Microsoft Edge...');
    const cmd = `"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${outputPdf}" "${tempHtmlPath}"`;
    execSync(cmd, { stdio: 'inherit' });

    if (fs.existsSync(outputPdf)) {
      const stats = fs.statSync(outputPdf);
      console.log('✅ NEW PDF GENERATED SUCCESSFULLY!');
      console.log('File path:', outputPdf);
      console.log('File size:', Math.round(stats.size / 1024), 'KB');
    } else {
      console.error('Failed to create PDF.');
    }

    // Clean up temporary HTML
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  } catch (err) {
    console.error('Generation failed:', err);
  }
}

run();
