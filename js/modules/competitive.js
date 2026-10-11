/**
 * Braco OmniPulse - Competitive Analysis Module (KEY FEATURE)
 * Deep side-by-side brand intelligence, head-to-head metric benchmarking,
 * dynamic multi-metric charts, deep dive strategy matrix, and strategic gap analysis.
 */

import { store } from '../state.js';
import { MOCK_BRANDS } from '../mockData.js';
import { renderCompetitiveComparisonChart } from '../charts.js';

let customBrandData = null;

export function initCompetitiveAnalysis(router, showToast) {
  const brandASelect = document.getElementById('comp-brand-a-select');
  const brandBSelect = document.getElementById('comp-brand-b-select');
  const btnCompare = document.getElementById('btn-run-brand-comparison');
  const btnReset = document.getElementById('btn-reset-comparison');
  const btnSwap = document.getElementById('btn-swap-brands');
  const btnExport = document.getElementById('btn-export-comparison');
  const quickPairBtns = document.querySelectorAll('.comp-quick-pair-btn');
  const chartTabs = document.querySelectorAll('.comp-chart-tab');

  // Handle Quick Rivalry Pills
  quickPairBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.brandA;
      const b = btn.dataset.brandB;
      if (brandASelect) brandASelect.value = a;
      if (brandBSelect) brandBSelect.value = b;
      toggleCustomBrandInputs();
      executeBrandComparison(showToast);
      showToast(`Loaded rivalry: ${btn.textContent.trim()}`, 'info');
    });
  });

  // Handle Brand Dropdown changes (check for custom brand option)
  if (brandASelect) {
    brandASelect.addEventListener('change', () => {
      toggleCustomBrandInputs();
    });
  }

  if (brandBSelect) {
    brandBSelect.addEventListener('change', () => {
      toggleCustomBrandInputs();
    });
  }

  // Handle Compare Button
  if (btnCompare) {
    btnCompare.addEventListener('click', () => {
      executeBrandComparison(showToast);
    });
  }

  // Handle Swap Brands
  if (btnSwap) {
    btnSwap.addEventListener('click', () => {
      const aVal = brandASelect?.value;
      const bVal = brandBSelect?.value;
      if (brandASelect) brandASelect.value = bVal;
      if (brandBSelect) brandBSelect.value = aVal;
      executeBrandComparison(showToast);
      showToast('Swapped brand positions', 'info');
    });
  }

  // Handle Reset Comparison
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (brandASelect) brandASelect.value = 'nike';
      if (brandBSelect) brandBSelect.value = 'adidas';
      toggleCustomBrandInputs();
      executeBrandComparison(showToast);
      showToast('Reset to default comparison (Nike vs Adidas)', 'info');
    });
  }

  // Handle Export
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      exportComparisonSummary(showToast);
    });
  }

  // Handle Chart Metric Switcher
  chartTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const metricType = tab.dataset.metric;
      store.updateState({
        competitive: { ...store.getState().competitive, activeMetricTab: metricType }
      });

      const currentA = getBrandData(brandASelect?.value);
      const currentB = getBrandData(brandBSelect?.value);
      if (currentA && currentB) {
        renderCompetitiveComparisonChart('chart-competitive-comparison', currentA, currentB, metricType);
      }
    });
  });

  // Initial comparison execution on page load
  executeBrandComparison(null, false);
}

function toggleCustomBrandInputs() {
  const brandASelect = document.getElementById('comp-brand-a-select');
  const brandBSelect = document.getElementById('comp-brand-b-select');
  const customContainer = document.getElementById('comp-custom-brand-container');

  const isCustomA = brandASelect?.value === 'custom';
  const isCustomB = brandBSelect?.value === 'custom';

  if (customContainer) {
    customContainer.classList.toggle('hidden', !isCustomA && !isCustomB);
  }
}

function getBrandData(key) {
  if (key === 'custom') {
    const customName = document.getElementById('custom-brand-name')?.value.trim() || 'Custom Challenger';
    const customCategory = document.getElementById('custom-brand-category')?.value.trim() || 'D2C Consumer Goods';

    return {
      id: 'custom',
      name: customName,
      category: customCategory,
      tagline: 'Defying the Ordinary',
      positioning: 'Agile challenger brand offering premium value directly to modern consumers.',
      logoText: customName.substring(0, 4).toUpperCase(),
      color: '#8b5cf6',
      metrics: {
        engagementRate: 4.9,
        monthlyReach: 18.2,
        conversionRate: 4.2,
        sentimentScore: 88,
        shareOfVoice: 14.5,
        avgOrderValue: 3200,
        customerAcquisitionCost: 650
      },
      channels: {
        instagram: 55,
        youtube: 25,
        x: 8,
        shorts: 12
      },
      demographics: {
        age18_24: 48,
        age25_34: 38,
        age35_44: 10,
        age45_plus: 4
      },
      strategy: {
        messaging: 'Hyper-focused community building, rapid user feedback cycles, and authentic transparency.',
        contentFormats: 'Behind-the-scenes founder stories, real customer reviews, and unpolished TikTok/Reels hooks.',
        creatorMix: 'Nano & micro creators with high organic trust + community advocates.',
        strengths: [
          'High agility and rapid response to viral social trends',
          'Unfiltered founder transparency and authenticity',
          'Superior unit economics on targeted D2C channels'
        ],
        weaknesses: [
          'Limited physical retail footprint in Tier-2/3 India',
          'Lower total brand awareness compared to legacy market giants',
          'Smaller overall production and marketing budget'
        ],
        opportunities: [
          'Hyper-targeted regional vernacular creator campaigns',
          'Subscription bundle offers to increase repeat purchase frequency',
          'Marketplace expansion into Amazon India and quick-commerce (Blinkit/Zepto)'
        ]
      }
    };
  }

  return MOCK_BRANDS[key] || MOCK_BRANDS.nike;
}

function executeBrandComparison(showToast, notify = true) {
  const brandAKey = document.getElementById('comp-brand-a-select')?.value || 'nike';
  const brandBKey = document.getElementById('comp-brand-b-select')?.value || 'adidas';

  // 1. Guard against comparing a brand against itself!
  if (brandAKey === brandBKey) {
    if (showToast) {
      showToast('Cannot compare a brand against itself! Please select two distinct brands.', 'warning');
    }
    const alertBox = document.getElementById('comp-self-compare-alert');
    if (alertBox) {
      alertBox.classList.remove('hidden');
    }
    return;
  } else {
    const alertBox = document.getElementById('comp-self-compare-alert');
    if (alertBox) {
      alertBox.classList.add('hidden');
    }
  }

  const brandA = getBrandData(brandAKey);
  const brandB = getBrandData(brandBKey);

  store.updateState({
    competitive: {
      ...store.getState().competitive,
      brandA: brandAKey,
      brandB: brandBKey
    }
  });

  renderComparisonView(brandA, brandB);

  const activeMetric = store.getState().competitive.activeMetricTab || 'overall';
  setTimeout(() => {
    renderCompetitiveComparisonChart('chart-competitive-comparison', brandA, brandB, activeMetric);
    if (window.lucide) window.lucide.createIcons();
  }, 50);

  if (notify && showToast) {
    showToast(`Compared ${brandA.name} vs ${brandB.name} successfully!`, 'success');
  }
}

function renderComparisonView(brandA, brandB) {
  const container = document.getElementById('comp-results-container');
  if (!container) return;

  // Determine winners for each core metric
  const engWinner = brandA.metrics.engagementRate >= brandB.metrics.engagementRate ? brandA : brandB;
  const engDiff = Math.abs(brandA.metrics.engagementRate - brandB.metrics.engagementRate).toFixed(1);

  const reachWinner = brandA.metrics.monthlyReach >= brandB.metrics.monthlyReach ? brandA : brandB;
  const reachDiff = Math.abs(brandA.metrics.monthlyReach - brandB.metrics.monthlyReach).toFixed(1);

  const convWinner = brandA.metrics.conversionRate >= brandB.metrics.conversionRate ? brandA : brandB;
  const convDiff = Math.abs(brandA.metrics.conversionRate - brandB.metrics.conversionRate).toFixed(1);

  const sentWinner = brandA.metrics.sentimentScore >= brandB.metrics.sentimentScore ? brandA : brandB;
  const sentDiff = Math.abs(brandA.metrics.sentimentScore - brandB.metrics.sentimentScore);

  const sovWinner = brandA.metrics.shareOfVoice >= brandB.metrics.shareOfVoice ? brandA : brandB;
  const sovDiff = Math.abs(brandA.metrics.shareOfVoice - brandB.metrics.shareOfVoice).toFixed(1);

  container.innerHTML = `
    <!-- 1. Side-by-Side Brand Profile Headers -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <!-- Brand A Card -->
      <div class="brand-hero-card p-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="brand-logo-badge w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-base shadow" style="background-color: ${brandA.color};">
              ${brandA.logoText.substring(0, 4)}
            </div>
            <div>
              <span class="badge badge-indigo text-2xs mb-1">Brand A</span>
              <h3 class="text-xl font-bold text-slate-900">${escapeHtml(brandA.name)}</h3>
              <p class="text-xs text-slate-500">${escapeHtml(brandA.category)}</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2 py-1 bg-white rounded border border-slate-200 text-slate-700 shadow-2xs">
            SOV: ${brandA.metrics.shareOfVoice}%
          </span>
        </div>
        <p class="tagline-quote text-xs italic text-indigo-900 font-medium mt-3 bg-indigo-50/60 p-2 rounded border border-indigo-100">
          "${escapeHtml(brandA.tagline)}"
        </p>
        <p class="text-xs text-slate-600 mt-2 leading-relaxed">
          ${escapeHtml(brandA.positioning)}
        </p>
      </div>

      <!-- Brand B Card -->
      <div class="brand-hero-card p-4 rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/40 via-white to-slate-50">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="brand-logo-badge w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-base shadow" style="background-color: ${brandB.color};">
              ${brandB.logoText.substring(0, 4)}
            </div>
            <div>
              <span class="badge badge-sky text-2xs mb-1">Brand B</span>
              <h3 class="text-xl font-bold text-slate-900">${escapeHtml(brandB.name)}</h3>
              <p class="text-xs text-slate-500">${escapeHtml(brandB.category)}</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2 py-1 bg-white rounded border border-slate-200 text-slate-700 shadow-2xs">
            SOV: ${brandB.metrics.shareOfVoice}%
          </span>
        </div>
        <p class="tagline-quote text-xs italic text-sky-900 font-medium mt-3 bg-sky-50/60 p-2 rounded border border-sky-100">
          "${escapeHtml(brandB.tagline)}"
        </p>
        <p class="text-xs text-slate-600 mt-2 leading-relaxed">
          ${escapeHtml(brandB.positioning)}
        </p>
      </div>
    </div>

    <!-- 2. Core Head-to-Head Metric Cards -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-3">
        <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
          <i data-lucide="award" class="text-indigo-600 icon-xs"></i> Head-to-Head Benchmark Scorecard
        </h4>
        <span class="text-2xs text-slate-400">Illustrative Demo Data Benchmark</span>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        <!-- Engagement Rate -->
        <div class="metric-comp-card p-3 rounded-lg border bg-white shadow-2xs">
          <span class="text-2xs text-slate-500 font-semibold uppercase block">Engagement Rate</span>
          <div class="flex justify-between items-baseline mt-1">
            <span class="font-bold text-sm ${brandA === engWinner ? 'text-indigo-600' : 'text-slate-600'}">${brandA.metrics.engagementRate}%</span>
            <span class="text-2xs text-slate-400">vs</span>
            <span class="font-bold text-sm ${brandB === engWinner ? 'text-sky-600' : 'text-slate-600'}">${brandB.metrics.engagementRate}%</span>
          </div>
          <div class="winner-pill mt-2 text-2xs px-1.5 py-0.5 rounded ${engWinner === brandA ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-sky-50 text-sky-700 border border-sky-200'} font-semibold truncate">
            ★ ${engWinner.name} (+${engDiff}%)
          </div>
        </div>

        <!-- Monthly Reach -->
        <div class="metric-comp-card p-3 rounded-lg border bg-white shadow-2xs">
          <span class="text-2xs text-slate-500 font-semibold uppercase block">Est. Monthly Reach</span>
          <div class="flex justify-between items-baseline mt-1">
            <span class="font-bold text-sm ${brandA === reachWinner ? 'text-indigo-600' : 'text-slate-600'}">${brandA.metrics.monthlyReach}M</span>
            <span class="text-2xs text-slate-400">vs</span>
            <span class="font-bold text-sm ${brandB === reachWinner ? 'text-sky-600' : 'text-slate-600'}">${brandB.metrics.monthlyReach}M</span>
          </div>
          <div class="winner-pill mt-2 text-2xs px-1.5 py-0.5 rounded ${reachWinner === brandA ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-sky-50 text-sky-700 border border-sky-200'} font-semibold truncate">
            ★ ${reachWinner.name} (+${reachDiff}M)
          </div>
        </div>

        <!-- Conversion Rate -->
        <div class="metric-comp-card p-3 rounded-lg border bg-white shadow-2xs">
          <span class="text-2xs text-slate-500 font-semibold uppercase block">Conversion Rate</span>
          <div class="flex justify-between items-baseline mt-1">
            <span class="font-bold text-sm ${brandA === convWinner ? 'text-indigo-600' : 'text-slate-600'}">${brandA.metrics.conversionRate}%</span>
            <span class="text-2xs text-slate-400">vs</span>
            <span class="font-bold text-sm ${brandB === convWinner ? 'text-sky-600' : 'text-slate-600'}">${brandB.metrics.conversionRate}%</span>
          </div>
          <div class="winner-pill mt-2 text-2xs px-1.5 py-0.5 rounded ${convWinner === brandA ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-sky-50 text-sky-700 border border-sky-200'} font-semibold truncate">
            ★ ${convWinner.name} (+${convDiff}%)
          </div>
        </div>

        <!-- Sentiment Index -->
        <div class="metric-comp-card p-3 rounded-lg border bg-white shadow-2xs">
          <span class="text-2xs text-slate-500 font-semibold uppercase block">Sentiment Score</span>
          <div class="flex justify-between items-baseline mt-1">
            <span class="font-bold text-sm ${brandA === sentWinner ? 'text-indigo-600' : 'text-slate-600'}">${brandA.metrics.sentimentScore}</span>
            <span class="text-2xs text-slate-400">vs</span>
            <span class="font-bold text-sm ${brandB === sentWinner ? 'text-sky-600' : 'text-slate-600'}">${brandB.metrics.sentimentScore}</span>
          </div>
          <div class="winner-pill mt-2 text-2xs px-1.5 py-0.5 rounded ${sentWinner === brandA ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-sky-50 text-sky-700 border border-sky-200'} font-semibold truncate">
            ★ ${sentWinner.name} (+${sentDiff} pts)
          </div>
        </div>

        <!-- Share of Voice -->
        <div class="metric-comp-card p-3 rounded-lg border bg-white shadow-2xs col-span-2 md:col-span-1">
          <span class="text-2xs text-slate-500 font-semibold uppercase block">Share of Voice</span>
          <div class="flex justify-between items-baseline mt-1">
            <span class="font-bold text-sm ${brandA === sovWinner ? 'text-indigo-600' : 'text-slate-600'}">${brandA.metrics.shareOfVoice}%</span>
            <span class="text-2xs text-slate-400">vs</span>
            <span class="font-bold text-sm ${brandB === sovWinner ? 'text-sky-600' : 'text-slate-600'}">${brandB.metrics.shareOfVoice}%</span>
          </div>
          <div class="winner-pill mt-2 text-2xs px-1.5 py-0.5 rounded ${sovWinner === brandA ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-sky-50 text-sky-700 border border-sky-200'} font-semibold truncate">
            ★ ${sovWinner.name} (+${sovDiff}%)
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Deep Dive Strategy Comparison Matrix -->
    <div class="mb-6">
      <h4 class="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
        <i data-lucide="layers" class="text-indigo-600 icon-xs"></i> Deep-Dive Marketing & Strategy Matrix
      </h4>

      <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="p-3 font-semibold text-slate-600 w-1/4">Strategic Dimension</th>
              <th class="p-3 font-semibold text-indigo-700 w-3/8">${escapeHtml(brandA.name)}</th>
              <th class="p-3 font-semibold text-sky-700 w-3/8">${escapeHtml(brandB.name)}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-3 font-semibold text-slate-800 bg-slate-50/40">Campaign Messaging & Hooks</td>
              <td class="p-3 text-slate-700 leading-relaxed">${escapeHtml(brandA.strategy.messaging)}</td>
              <td class="p-3 text-slate-700 leading-relaxed">${escapeHtml(brandB.strategy.messaging)}</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold text-slate-800 bg-slate-50/40">Dominant Content Formats</td>
              <td class="p-3 text-slate-700 leading-relaxed">${escapeHtml(brandA.strategy.contentFormats)}</td>
              <td class="p-3 text-slate-700 leading-relaxed">${escapeHtml(brandB.strategy.contentFormats)}</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold text-slate-800 bg-slate-50/40">Creator Collaboration Mix</td>
              <td class="p-3 text-slate-700 leading-relaxed">${escapeHtml(brandA.strategy.creatorMix)}</td>
              <td class="p-3 text-slate-700 leading-relaxed">${escapeHtml(brandB.strategy.creatorMix)}</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold text-slate-800 bg-slate-50/40">Core Competitive Strengths</td>
              <td class="p-3">
                <ul class="space-y-1">
                  ${brandA.strategy.strengths.map(s => `
                    <li class="flex items-start gap-1.5 text-slate-700">
                      <i data-lucide="check" class="text-emerald-500 icon-2xs mt-0.5 shrink-0"></i>
                      <span>${escapeHtml(s)}</span>
                    </li>
                  `).join('')}
                </ul>
              </td>
              <td class="p-3">
                <ul class="space-y-1">
                  ${brandB.strategy.strengths.map(s => `
                    <li class="flex items-start gap-1.5 text-slate-700">
                      <i data-lucide="check" class="text-emerald-500 icon-2xs mt-0.5 shrink-0"></i>
                      <span>${escapeHtml(s)}</span>
                    </li>
                  `).join('')}
                </ul>
              </td>
            </tr>
            <tr>
              <td class="p-3 font-semibold text-slate-800 bg-slate-50/40">Vulnerabilities & Pain Points</td>
              <td class="p-3">
                <ul class="space-y-1">
                  ${brandA.strategy.weaknesses.map(w => `
                    <li class="flex items-start gap-1.5 text-rose-700">
                      <i data-lucide="alert-circle" class="text-rose-500 icon-2xs mt-0.5 shrink-0"></i>
                      <span>${escapeHtml(w)}</span>
                    </li>
                  `).join('')}
                </ul>
              </td>
              <td class="p-3">
                <ul class="space-y-1">
                  ${brandB.strategy.weaknesses.map(w => `
                    <li class="flex items-start gap-1.5 text-rose-700">
                      <i data-lucide="alert-circle" class="text-rose-500 icon-2xs mt-0.5 shrink-0"></i>
                      <span>${escapeHtml(w)}</span>
                    </li>
                  `).join('')}
                </ul>
              </td>
            </tr>
            <tr>
              <td class="p-3 font-semibold text-slate-800 bg-slate-50/40">Market Opportunities</td>
              <td class="p-3">
                <ul class="space-y-1">
                  ${brandA.strategy.opportunities.map(o => `
                    <li class="flex items-start gap-1.5 text-indigo-700">
                      <i data-lucide="sparkles" class="text-indigo-500 icon-2xs mt-0.5 shrink-0"></i>
                      <span>${escapeHtml(o)}</span>
                    </li>
                  `).join('')}
                </ul>
              </td>
              <td class="p-3">
                <ul class="space-y-1">
                  ${brandB.strategy.opportunities.map(o => `
                    <li class="flex items-start gap-1.5 text-sky-700">
                      <i data-lucide="sparkles" class="text-sky-500 icon-2xs mt-0.5 shrink-0"></i>
                      <span>${escapeHtml(o)}</span>
                    </li>
                  `).join('')}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 4. OmniPulse Strategic Gap Analysis & Takeaway -->
    <div class="strategic-gap-card p-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md">
      <div class="flex items-center gap-2 mb-2">
        <i data-lucide="lightbulb" class="text-amber-400 icon-sm"></i>
        <h5 class="text-sm font-bold text-white uppercase tracking-wider">
          OmniPulse Executive Gap Analysis: ${escapeHtml(brandA.name)} vs ${escapeHtml(brandB.name)}
        </h5>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-3">
        ${generateExecutiveTakeaway(brandA, brandB)}
      </p>
      <div class="flex flex-wrap items-center gap-2 text-2xs">
        <span class="bg-indigo-800/70 border border-indigo-700 px-2 py-0.5 rounded text-indigo-200">
          Challenger Opportunity: Target ${escapeHtml(brandB.name)}'s Tier-2 distribution gap
        </span>
        <span class="bg-indigo-800/70 border border-indigo-700 px-2 py-0.5 rounded text-indigo-200">
          Creative Angle: Lean into vernacular audio hooks
        </span>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function generateExecutiveTakeaway(a, b) {
  if (a.metrics.engagementRate > b.metrics.engagementRate) {
    return `<strong>${a.name}</strong> holds an engagement advantage (+${(a.metrics.engagementRate - b.metrics.engagementRate).toFixed(1)}%) driven by high-emotion storytelling and loyal community advocacy. However, <strong>${b.name}</strong> maintains broader accessibility across key demographic touchpoints. A strategic challenger brand should exploit ${b.name}'s pricing gap while borrowing ${a.name}'s narrative community-first activation model.`;
  } else {
    return `<strong>${b.name}</strong> commands stronger audience resonance (+${(b.metrics.engagementRate - a.metrics.engagementRate).toFixed(1)}%), while <strong>${a.name}</strong> leverages institutional brand prestige and global reach. Competitors can achieve breakthrough ROI by identifying the unmet demand in ${a.name}'s mid-tier pricing while out-innovating on short-form creative frequency.`;
  }
}

function exportComparisonSummary(showToast) {
  const brandAKey = document.getElementById('comp-brand-a-select')?.value || 'nike';
  const brandBKey = document.getElementById('comp-brand-b-select')?.value || 'adidas';
  const a = getBrandData(brandAKey);
  const b = getBrandData(brandBKey);

  const report = `================================================
BRACO OMNIPULSE - COMPETITIVE INTELLIGENCE DOSSIER
================================================
Comparison: ${a.name} vs ${b.name}
Generated: ${new Date().toLocaleDateString()}
Category: ${a.category} / ${b.category}

HEAD-TO-HEAD METRICS:
- Engagement Rate: ${a.name} (${a.metrics.engagementRate}%) vs ${b.name} (${b.metrics.engagementRate}%)
- Est. Monthly Reach: ${a.name} (${a.metrics.monthlyReach}M) vs ${b.name} (${b.metrics.monthlyReach}M)
- Conversion Rate: ${a.name} (${a.metrics.conversionRate}%) vs ${b.name} (${b.metrics.conversionRate}%)
- Sentiment Score: ${a.name} (${a.metrics.sentimentScore}/100) vs ${b.name} (${b.metrics.sentimentScore}/100)
- Share of Voice: ${a.name} (${a.metrics.shareOfVoice}%) vs ${b.name} (${b.metrics.shareOfVoice}%)

STRATEGIC MESSAGING:
- ${a.name}: "${a.tagline}" -> ${a.strategy.messaging}
- ${b.name}: "${b.tagline}" -> ${b.strategy.messaging}

KEY STRENGTHS:
- ${a.name}: ${a.strategy.strengths.join(' | ')}
- ${b.name}: ${b.strategy.strengths.join(' | ')}

VULNERABILITIES:
- ${a.name}: ${a.strategy.weaknesses.join(' | ')}
- ${b.name}: ${b.strategy.weaknesses.join(' | ')}

EXECUTIVE GAP ANALYSIS:
${generateExecutiveTakeaway(a, b).replace(/<[^>]*>/g, '')}

*Generated with Braco OmniPulse Intelligence Engine (Illustrative Demo Data Mode)*
`;

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `OmniPulse_Competitive_${a.name}_vs_${b.name}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  if (showToast) showToast('Exported Competitive Intelligence report!', 'success');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
