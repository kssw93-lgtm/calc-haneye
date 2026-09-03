import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import assert from "node:assert/strict";
const root = join(process.cwd(), "out");
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]); }
const htmlFiles = files(root).filter(file => file.endsWith(".html") && !file.includes("_next"));
const errors = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const path = decodeURIComponent(match[1]).replace(/^\/+/, "");
    if (!path) continue;
    if (![join(root, path), join(root, path + ".html"), join(root, path, "index.html")].some(existsSync)) errors.push(relative(root, file) + " → " + match[1]);
  }
  assert(html.includes('name="google-site-verification"'), "Google tag missing: " + file);
  assert(html.includes('name="naver-site-verification"'), "Naver tag missing: " + file);
}
assert.deepEqual(errors, [], "Broken internal links");
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, new Set(urls).size, "Duplicate sitemap URLs");
for (const url of urls) {
  assert(url.startsWith("https://calc-haneye.kr"), "Wrong canonical domain");
  const path = new URL(url).pathname.replace(/^\/+/, "");
  assert(!path || [join(root, path), join(root, path + ".html"), join(root, path, "index.html")].some(existsSync), "Missing sitemap page: " + url);
}
const salary = readFileSync(join(root, "calculators/salary-net-pay.html"), "utf8");
assert(salary.includes("공제액 직접 입력"), "Salary mode missing");
assert(salary.includes("계산 결과와 함께"), "Related calculator links missing");
const ctaPages = htmlFiles.filter(file => readFileSync(file, "utf8").includes("data-calculator-cta-link"));
for (const slug of ["loan-rate-half-point-difference", "salary-family-withholding-example", "monthly-rent-management-cost-comparison", "severance-pay-guide", "loan-interest-guide", "home-acquisition-tax-guide", "salary-net-pay-guide", "loan-100-million-interest", "employment-contract-template"]) {
  assert(readFileSync(join(root, "guides", slug + ".html"), "utf8").includes("data-calculator-cta-link"), "Article calculator button missing: " + slug);
}
const rss = readFileSync(join(root, "rss.xml"), "utf8");
for (const slug of ["loan-rate-half-point-difference", "salary-family-withholding-example", "monthly-rent-management-cost-comparison"]) {
  assert(sitemap.includes("/guides/" + slug), "New guide missing from sitemap: " + slug);
  assert(rss.includes("/guides/" + slug), "New guide missing from RSS: " + slug);
}
console.log(JSON.stringify({ htmlPages: htmlFiles.length, sitemapUrls: urls.length, calculatorButtonPages: ctaPages.length, brokenInternalLinks: errors.length, searchVerificationTags: "passed" }, null, 2));
