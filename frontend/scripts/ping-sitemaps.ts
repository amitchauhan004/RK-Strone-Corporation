import https from 'https';

const BASE_URL = process.env.SITEMAP_BASE_URL || 'https://rkstonecorporation.com';
const sitemapUrl = encodeURIComponent(`${BASE_URL}/sitemap.xml`);

function ping(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`Ping failed: ${res.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

async function main() {
  const google = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  const bing = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;
  try {
    await ping(google);
    console.log('Pinged Google successfully');
  } catch (e) {
    console.error('Google ping error:', e);
  }
  try {
    await ping(bing);
    console.log('Pinged Bing successfully');
  } catch (e) {
    console.error('Bing ping error:', e);
  }
}

main();


