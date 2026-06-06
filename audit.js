const { chromium, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'test-results');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const WEBSITE_PAGES = [
  { name: 'Home',        url: 'https://art-website-production-d8d8.up.railway.app/' },
  { name: 'Services',    url: 'https://art-website-production-d8d8.up.railway.app/services' },
  { name: 'Students',    url: 'https://art-website-production-d8d8.up.railway.app/students' },
  { name: 'Defence',     url: 'https://art-website-production-d8d8.up.railway.app/defence' },
  { name: 'Academy',     url: 'https://art-website-production-d8d8.up.railway.app/academy' },
  { name: 'Consultants', url: 'https://art-website-production-d8d8.up.railway.app/consultants' },
  { name: 'About',       url: 'https://art-website-production-d8d8.up.railway.app/about' },
  { name: 'Contact',     url: 'https://art-website-production-d8d8.up.railway.app/contact' },
  { name: 'Technology',  url: 'https://art-website-production-d8d8.up.railway.app/technology' },
];

const PLATFORM_PAGES = [
  { name: 'Platform-Login',       url: 'https://web-production-2ebb7.up.railway.app/' },
  { name: 'Platform-ClientReg',   url: 'https://web-production-2ebb7.up.railway.app/pages/register-client.html' },
  { name: 'Platform-ConsultReg',  url: 'https://web-production-2ebb7.up.railway.app/pages/register-consultant.html' },
];

const VIEWPORTS = [
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Mobile',  width: 390,  height: 844 },
];

const BROWSERS = [
  { name: 'Chromium', launcher: chromium },
  { name: 'WebKit',   launcher: webkit },
];

const CTA_CHECKS = [
  { label: 'Commission Research', expected: '/pages/register-client.html?type=organisation' },
  { label: 'Get Research Support', expected: '/pages/register-client.html?type=student' },
];

const results = {};
const issues = { critical: [], high: [], medium: [], low: [], crossBrowser: [], mobile: [], good: [] };

function slug(name) { return name.toLowerCase().replace(/[^a-z0-9]/g, '-'); }

function recordIssue(severity, page, browser, viewport, description, screenshot) {
  issues[severity].push({ page, browser, viewport, description, screenshot: screenshot || '' });
}

async function auditPage(page, pageName, url, browserName, viewportName, isMobile) {
  const key = `${pageName}-${browserName}-${viewportName}`;
  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('requestfailed', req => networkErrors.push(`${req.url()} — ${req.failure()?.errorText}`));

  let httpStatus = null;
  page.on('response', res => { if (res.url() === url || res.url() === url + '/') httpStatus = res.status(); });

  const startTime = Date.now();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  }
  const loadTime = Date.now() - startTime;

  // Wait for fonts
  await page.waitForTimeout(1500);

  const ssName = `${slug(pageName)}-${slug(browserName)}-${slug(viewportName)}.png`;
  const ssPath = path.join(OUT, ssName);
  await page.screenshot({ path: ssPath, fullPage: true });

  // ── Checks ──────────────────────────────────────────────────
  const checks = await page.evaluate(() => {
    const r = {};

    // H1
    const h1s = document.querySelectorAll('h1');
    r.h1Count = h1s.length;
    r.h1Text = h1s[0]?.innerText?.trim().substring(0, 80) || '';

    // Nav
    const nav = document.querySelector('nav, header');
    r.navExists = !!nav;
    r.navVisible = nav ? nav.getBoundingClientRect().height > 0 : false;

    // Footer
    const footer = document.querySelector('footer');
    r.footerExists = !!footer;
    r.footerVisible = footer ? footer.getBoundingClientRect().height > 0 : false;

    // Hamburger
    const hamburger = document.querySelector('#mobile-menu-btn, [aria-label*="menu" i], .hamburger, button[class*="menu"]');
    r.hamburgerExists = !!hamburger;

    // Bottom nav (mobile)
    const bottomNav = document.querySelector('.mobile-bottom-nav, nav[class*="bottom"], div[class*="bottom-nav"]');
    r.bottomNavExists = !!bottomNav;

    // Fonts
    r.playfairLoaded = Array.from(document.fonts).some(f => f.family.includes('Playfair'));
    r.interLoaded = Array.from(document.fonts).some(f => f.family.includes('Inter'));

    // Images without alt
    const imgs = document.querySelectorAll('img');
    r.imagesTotal = imgs.length;
    r.imagesMissingAlt = Array.from(imgs).filter(i => !i.alt || i.alt.trim() === '').length;
    r.imagesBroken = Array.from(imgs).filter(i => !i.complete || i.naturalWidth === 0).length;

    // Buttons without text
    const btns = document.querySelectorAll('button, [role="button"]');
    r.buttonsTotal = btns.length;
    r.buttonsMissingText = Array.from(btns).filter(b => !b.innerText?.trim() && !b.getAttribute('aria-label')).length;

    // Horizontal overflow
    r.horizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;

    // Body text size
    const bodyEl = document.querySelector('p, .text-sm, .text-base');
    r.bodyFontSize = bodyEl ? parseFloat(window.getComputedStyle(bodyEl).fontSize) : null;

    // CTA buttons
    const allLinks = Array.from(document.querySelectorAll('a'));
    r.ctaLinks = allLinks
      .filter(a => a.innerText?.trim() && (a.href.includes('register') || a.href.includes('commission') || a.href.includes('research')))
      .map(a => ({ text: a.innerText.trim(), href: a.href }));

    // All nav links
    const navLinks = Array.from(document.querySelectorAll('nav a, header a'));
    r.navLinks = navLinks.map(a => ({ text: a.innerText.trim(), href: a.href })).filter(l => l.text);

    // Form inputs with labels
    const inputs = document.querySelectorAll('input, select, textarea');
    r.inputsTotal = inputs.length;
    r.inputsMissingLabel = Array.from(inputs).filter(inp => {
      const id = inp.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = inp.getAttribute('aria-label');
      const hasPlaceholder = inp.getAttribute('placeholder');
      return !hasLabel && !hasAriaLabel && !hasPlaceholder;
    }).length;

    // Touch targets
    const clickables = document.querySelectorAll('a, button, [role="button"]');
    r.smallTouchTargets = Array.from(clickables).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
    }).length;

    return r;
  });

  const result = {
    key,
    page: pageName,
    url,
    browser: browserName,
    viewport: viewportName,
    httpStatus: httpStatus || 200,
    loadTime,
    consoleErrors,
    networkErrors,
    screenshot: ssName,
    ...checks,
  };

  // ── Issue flagging ───────────────────────────────────────────
  if (consoleErrors.length > 0) {
    recordIssue('medium', pageName, browserName, viewportName,
      `${consoleErrors.length} console error(s): ${consoleErrors.slice(0,2).join('; ')}`, ssName);
  }
  if (!checks.h1Count) {
    recordIssue('high', pageName, browserName, viewportName, 'No H1 found on page', ssName);
  }
  if (!checks.navVisible) {
    recordIssue('critical', pageName, browserName, viewportName, 'Navigation not visible', ssName);
  }
  if (!checks.footerVisible) {
    recordIssue('high', pageName, browserName, viewportName, 'Footer not visible', ssName);
  }
  if (checks.imagesMissingAlt > 0) {
    recordIssue('medium', pageName, browserName, viewportName,
      `${checks.imagesMissingAlt} image(s) missing alt text`, ssName);
  }
  if (checks.imagesBroken > 0) {
    recordIssue('critical', pageName, browserName, viewportName,
      `${checks.imagesBroken} broken image(s)`, ssName);
  }
  if (checks.horizontalOverflow && isMobile) {
    recordIssue('high', pageName, browserName, viewportName,
      'Horizontal overflow on mobile viewport', ssName);
    issues.mobile.push({ page: pageName, browser: browserName, description: 'Horizontal overflow', screenshot: ssName });
  }
  if (checks.smallTouchTargets > 5 && isMobile) {
    recordIssue('medium', pageName, browserName, viewportName,
      `${checks.smallTouchTargets} touch targets smaller than 44×44px`, ssName);
    issues.mobile.push({ page: pageName, browser: browserName, description: `${checks.smallTouchTargets} small touch targets`, screenshot: ssName });
  }
  if (checks.inputsMissingLabel > 0) {
    recordIssue('medium', pageName, browserName, viewportName,
      `${checks.inputsMissingLabel} form input(s) missing label/aria-label`, ssName);
  }

  results[key] = result;
  console.log(`  ✓ ${key} — load ${loadTime}ms, errors: ${consoleErrors.length}, overflow: ${checks.horizontalOverflow}`);
  return result;
}

async function checkCTAs(page, browserName, viewportName) {
  console.log(`\n── CTA check (${browserName} ${viewportName}) ──`);
  await page.goto('https://art-website-production-d8d8.up.railway.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  const ctaResults = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors
      .filter(a => a.innerText?.trim())
      .map(a => ({ text: a.innerText.trim().substring(0, 60), href: a.href }))
      .filter(a => a.text.match(/Commission|Research Support|Login|Get Research/i));
  });

  const ctaReport = [];
  const expectedCTAs = [
    { label: 'Commission Research', expected: 'register-client.html?type=organisation' },
    { label: 'Get Research Support', expected: 'register-client.html?type=student' },
    { label: 'Login', expected: 'web-production-2ebb7.up.railway.app' },
  ];

  for (const cta of expectedCTAs) {
    const found = ctaResults.find(r => r.text.toLowerCase().includes(cta.label.toLowerCase().substring(0, 10)));
    if (!found) {
      ctaReport.push({ label: cta.label, status: 'NOT FOUND', actual: '', expected: cta.expected });
      recordIssue('critical', 'Home', browserName, viewportName, `CTA "${cta.label}" not found`, '');
    } else {
      const match = found.href.includes(cta.expected);
      ctaReport.push({ label: cta.label, status: match ? 'PASS' : 'WRONG DEST', actual: found.href, expected: cta.expected });
      if (!match) {
        recordIssue('critical', 'Home', browserName, viewportName,
          `CTA "${cta.label}" points to wrong URL: ${found.href}`, '');
      }
    }
  }

  return ctaReport;
}

async function runBrowser(browserDef) {
  const { name: browserName, launcher } = browserDef;
  console.log(`\n════ ${browserName} ════`);
  const browser = await launcher.launch({ headless: true });
  const browserResults = {};

  for (const vp of VIEWPORTS) {
    console.log(`\n── ${vp.name} ${vp.width}×${vp.height} ──`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.name === 'Mobile',
      deviceScaleFactor: vp.name === 'Mobile' ? 2 : 1,
    });

    // Website pages
    for (const pg of WEBSITE_PAGES) {
      const p = await context.newPage();
      const r = await auditPage(p, pg.name, pg.url, browserName, vp.name, vp.name === 'Mobile');
      browserResults[r.key] = r;
      await p.close();
    }

    // Platform pages
    for (const pg of PLATFORM_PAGES) {
      const p = await context.newPage();
      const r = await auditPage(p, pg.name, pg.url, browserName, vp.name, vp.name === 'Mobile');
      browserResults[r.key] = r;
      await p.close();
    }

    // CTA check (desktop only to avoid duplication)
    if (vp.name === 'Desktop') {
      const p = await context.newPage();
      const ctaReport = await checkCTAs(p, browserName, vp.name);
      browserResults[`cta-${browserName}`] = ctaReport;
      console.log('  CTA results:', JSON.stringify(ctaReport));
      await p.close();
    }

    await context.close();
  }

  await browser.close();
  return browserResults;
}

async function main() {
  console.log('Starting ART Ghana full audit...\n');

  const chromiumResults = await runBrowser({ name: 'Chromium', launcher: chromium });
  const webkitResults = await runBrowser({ name: 'WebKit', launcher: webkit });

  const allResults = { ...chromiumResults, ...webkitResults };

  // ── Detect cross-browser differences ──────────────────────
  for (const pg of [...WEBSITE_PAGES, ...PLATFORM_PAGES]) {
    for (const vp of VIEWPORTS) {
      const cr = allResults[`${pg.name}-Chromium-${vp.name}`];
      const wr = allResults[`${pg.name}-WebKit-${vp.name}`];
      if (!cr || !wr) continue;
      if (cr.consoleErrors.length !== wr.consoleErrors.length) {
        issues.crossBrowser.push({
          page: pg.name, viewport: vp.name,
          description: `Console errors differ: Chromium ${cr.consoleErrors.length} vs WebKit ${wr.consoleErrors.length}`,
        });
      }
      if (cr.horizontalOverflow !== wr.horizontalOverflow) {
        issues.crossBrowser.push({
          page: pg.name, viewport: vp.name,
          description: `Horizontal overflow differs: Chromium=${cr.horizontalOverflow} WebKit=${wr.horizontalOverflow}`,
        });
      }
      if (cr.footerVisible !== wr.footerVisible) {
        issues.crossBrowser.push({
          page: pg.name, viewport: vp.name,
          description: `Footer visibility differs: Chromium=${cr.footerVisible} WebKit=${wr.footerVisible}`,
        });
      }
    }
  }

  // ── What's working well ────────────────────────────────────
  const allPages = [...WEBSITE_PAGES, ...PLATFORM_PAGES];
  const desktopChromium = allPages.map(pg => allResults[`${pg.name}-Chromium-Desktop`]).filter(Boolean);

  if (desktopChromium.every(r => r.navVisible)) issues.good.push('Navigation renders correctly on all pages in Chromium Desktop');
  if (desktopChromium.every(r => r.footerVisible)) issues.good.push('Footer visible on all pages in Chromium Desktop');
  if (desktopChromium.every(r => r.h1Count >= 1)) issues.good.push('Every page has an H1 heading');
  if (desktopChromium.every(r => !r.horizontalOverflow)) issues.good.push('No horizontal overflow on desktop');
  if (desktopChromium.some(r => r.playfairLoaded)) issues.good.push('Playfair Display font loading correctly');
  if (desktopChromium.some(r => r.interLoaded)) issues.good.push('Inter font loading correctly');
  if (desktopChromium.every(r => r.consoleErrors.length === 0)) issues.good.push('No console errors on any page');
  if (desktopChromium.every(r => r.loadTime < 8000)) issues.good.push('All pages load within 8 seconds');
  const mobileResults = allPages.map(pg => allResults[`${pg.name}-Chromium-Mobile`]).filter(Boolean);
  if (mobileResults.every(r => !r.horizontalOverflow)) issues.good.push('No horizontal overflow on mobile');
  if (mobileResults.every(r => r.navVisible)) issues.good.push('Navigation visible on all mobile pages');

  // ── Generate report ────────────────────────────────────────
  const lines = [];
  lines.push('# ART Ghana — Full Health Check & UX/UI Audit Report');
  lines.push(`\n**Date:** ${new Date().toISOString().split('T')[0]}  `);
  lines.push('**Browsers:** Chromium (Chrome), WebKit (Safari)  ');
  lines.push('**Viewports:** Desktop 1280×800, Mobile 390×844\n');
  lines.push('---\n');

  // Section A — Critical
  lines.push('## Section A — Critical Issues\n');
  const critical = issues.critical.filter((v, i, a) => a.findIndex(x => x.page === v.page && x.description === v.description && x.browser === v.browser) === i);
  if (critical.length === 0) {
    lines.push('_No critical issues found._\n');
  } else {
    for (const iss of critical) {
      lines.push(`**Page:** ${iss.page}  \n**Browser:** ${iss.browser}  \n**Viewport:** ${iss.viewport}  \n**Issue:** ${iss.description}  `);
      if (iss.screenshot) lines.push(`**Screenshot:** ![${iss.page}](${iss.screenshot})`);
      lines.push('');
    }
  }

  // Section B — High
  lines.push('## Section B — High Priority\n');
  const high = issues.high.filter((v, i, a) => a.findIndex(x => x.page === v.page && x.description === v.description && x.browser === v.browser) === i);
  if (high.length === 0) {
    lines.push('_No high priority issues found._\n');
  } else {
    for (const iss of high) {
      lines.push(`**Page:** ${iss.page}  \n**Browser:** ${iss.browser}  \n**Viewport:** ${iss.viewport}  \n**Issue:** ${iss.description}  `);
      if (iss.screenshot) lines.push(`**Screenshot:** ![${iss.page}](${iss.screenshot})`);
      lines.push('');
    }
  }

  // Section C — Medium
  lines.push('## Section C — Medium Priority\n');
  const medium = issues.medium.filter((v, i, a) => a.findIndex(x => x.page === v.page && x.description === v.description && x.browser === v.browser) === i);
  if (medium.length === 0) {
    lines.push('_No medium priority issues found._\n');
  } else {
    for (const iss of medium) {
      lines.push(`**Page:** ${iss.page}  \n**Browser:** ${iss.browser}  \n**Viewport:** ${iss.viewport}  \n**Issue:** ${iss.description}  `);
      if (iss.screenshot) lines.push(`**Screenshot:** ![${iss.page}](${iss.screenshot})`);
      lines.push('');
    }
  }

  // Section D — Low
  lines.push('## Section D — Low Priority\n');
  if (issues.low.length === 0) {
    lines.push('_No low priority issues recorded._\n');
  }

  // Section E — Cross-browser
  lines.push('## Section E — Cross-Browser Differences\n');
  const cb = [...new Map(issues.crossBrowser.map(x => [`${x.page}-${x.description}`, x])).values()];
  if (cb.length === 0) {
    lines.push('_No cross-browser differences detected._\n');
  } else {
    for (const iss of cb) {
      lines.push(`- **${iss.page}** (${iss.viewport}): ${iss.description}`);
    }
    lines.push('');
  }

  // Section F — Mobile
  lines.push('## Section F — Mobile-Specific Issues\n');
  const mob = [...new Map(issues.mobile.map(x => [`${x.page}-${x.description}`, x])).values()];
  if (mob.length === 0) {
    lines.push('_No mobile-specific issues detected._\n');
  } else {
    for (const iss of mob) {
      lines.push(`- **${iss.page}** (${iss.browser}): ${iss.description}`);
    }
    lines.push('');
  }

  // Section G — What's working well
  lines.push('## Section G — What Is Working Well\n');
  for (const g of issues.good) {
    lines.push(`- ${g}`);
  }
  lines.push('');

  // Section H — Summary table
  lines.push('## Section H — Summary Table\n');
  lines.push('| Page | Chrome Desktop | Chrome Mobile | Safari Desktop | Safari Mobile | Issues |');
  lines.push('|------|:--------------:|:-------------:|:--------------:|:-------------:|--------|');

  const allPageDefs = [...WEBSITE_PAGES, ...PLATFORM_PAGES];
  for (const pg of allPageDefs) {
    const cd = allResults[`${pg.name}-Chromium-Desktop`];
    const cm = allResults[`${pg.name}-Chromium-Mobile`];
    const sd = allResults[`${pg.name}-WebKit-Desktop`];
    const sm = allResults[`${pg.name}-WebKit-Mobile`];

    const statusIcon = (r) => {
      if (!r) return '❓';
      const bad = !r.navVisible || !r.footerVisible || r.imagesBroken > 0 || r.consoleErrors.length > 0;
      return bad ? '⚠️' : '✅';
    };

    const pageIssues = [...critical, ...high, ...medium].filter(i => i.page === pg.name);
    const uniqueIssues = [...new Map(pageIssues.map(x => [x.description, x])).values()];

    lines.push(`| ${pg.name} | ${statusIcon(cd)} | ${statusIcon(cm)} | ${statusIcon(sd)} | ${statusIcon(sm)} | ${uniqueIssues.length} |`);
  }
  lines.push('');

  // Section I — Fix order
  lines.push('## Section I — Recommended Fix Order\n');
  const allIssuesFlat = [...critical, ...high, ...medium]
    .filter((v, i, a) => a.findIndex(x => x.description === v.description && x.page === v.page) === i)
    .slice(0, 10);

  const effortMap = (desc) => {
    if (desc.includes('broken image') || desc.includes('alt text') || desc.includes('CTA')) return 'Quick';
    if (desc.includes('overflow') || desc.includes('touch target') || desc.includes('label')) return 'Medium';
    return 'Medium';
  };

  let rank = 1;
  for (const iss of allIssuesFlat) {
    lines.push(`${rank}. **[${iss.page}]** ${iss.description} *(Effort: ${effortMap(iss.description)})*`);
    rank++;
  }
  if (rank === 1) lines.push('_All pages passed automated checks — only cosmetic polish items remain._');
  lines.push('');

  // ── Per-page detail ────────────────────────────────────────
  lines.push('---\n## Appendix — Per-Page Detail\n');
  for (const pg of allPageDefs) {
    lines.push(`### ${pg.name}\n`);
    for (const b of BROWSERS) {
      for (const vp of VIEWPORTS) {
        const r = allResults[`${pg.name}-${b.name}-${vp.name}`];
        if (!r) continue;
        lines.push(`**${b.name} ${vp.name}** — HTTP ${r.httpStatus} | Load ${r.loadTime}ms | H1: ${r.h1Count ? `"${r.h1Text}"` : 'MISSING'} | Nav: ${r.navVisible ? '✅' : '❌'} | Footer: ${r.footerVisible ? '✅' : '❌'} | Errors: ${r.consoleErrors.length} | Overflow: ${r.horizontalOverflow ? '⚠️ YES' : '✅ No'} | Broken imgs: ${r.imagesBroken}`);
        lines.push(`> Screenshot: \`${r.screenshot}\``);
        if (r.consoleErrors.length > 0) {
          lines.push(`> Console errors: ${r.consoleErrors.slice(0, 3).join(' | ')}`);
        }
        lines.push('');
      }
    }
  }

  const report = lines.join('\n');
  const reportPath = path.join(OUT, 'audit-report.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\nReport written to ${reportPath}`);
  console.log(`Screenshots in ${OUT}`);

  // Summary to stdout
  console.log('\n══ QUICK SUMMARY ══');
  console.log(`Critical issues: ${critical.length}`);
  console.log(`High issues:     ${high.length}`);
  console.log(`Medium issues:   ${medium.length}`);
  console.log(`Cross-browser:   ${cb.length}`);
  console.log(`Mobile-specific: ${mob.length}`);
  console.log(`Positives:       ${issues.good.length}`);
}

main().catch(err => { console.error('Audit failed:', err); process.exit(1); });
