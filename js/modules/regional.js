/**
 * Braco OmniPulse - Regional Insights Module (India Market)
 * Regional consumer behavior profiles & functional A/B Creative comparison engine.
 */

import { store } from '../state.js';
import { MOCK_REGIONS } from '../mockData.js';
import { renderRegionalABChart } from '../charts.js';

const CREATIVE_STYLES = {
  vernacular_energy: {
    name: 'High-Energy Vernacular Reel (Street Slang & Local Music)',
    retention: 76,
    ctr: 4.2,
    engagement: 86,
    trust: 82,
    bestFor: 'Tier 1 & 2 Youth, Festive Sales, Streetwear & Beverages'
  },
  minimal_ugc: {
    name: 'Aesthetic Minimalist UGC (Direct Value Proposition)',
    retention: 58,
    ctr: 3.1,
    engagement: 71,
    trust: 89,
    bestFor: 'Tech Enthusiasts, D2C Skincare, High-Ticket Gadgets'
  },
  festive_glam: {
    name: 'Grand Festive Celebration (Traditional Couture & Family Drama)',
    retention: 71,
    ctr: 3.6,
    engagement: 84,
    trust: 85,
    bestFor: 'Diwali/Wedding Collections, Gifting, Food & Beverages'
  },
  relatable_comedy: {
    name: 'Hyper-Relatable Comedy Sketch (Everyday Consumer Dilemma)',
    retention: 82,
    ctr: 3.9,
    engagement: 92,
    trust: 78,
    bestFor: 'Broad Vernacular Awareness, FMCG, Mass D2C'
  }
};

export function initRegionalInsights(router, showToast) {
  const regionSelect = document.getElementById('regional-state-select');
  const audienceSelect = document.getElementById('regional-audience-select');
  const categorySelect = document.getElementById('regional-category-select');
  const platformSelect = document.getElementById('regional-platform-select');

  const styleASelect = document.getElementById('ab-style-a-select');
  const styleBSelect = document.getElementById('ab-style-b-select');
  const btnRunAB = document.getElementById('btn-run-ab-compare');

  function triggerUpdate() {
    renderRegionalData();
  }

  if (regionSelect) {
    regionSelect.addEventListener('change', () => {
      triggerUpdate();
      showToast(`Loaded regional intelligence for ${regionSelect.options[regionSelect.selectedIndex].text}`, 'info');
    });
  }

  if (audienceSelect) audienceSelect.addEventListener('change', triggerUpdate);
  if (categorySelect) categorySelect.addEventListener('change', triggerUpdate);
  if (platformSelect) platformSelect.addEventListener('change', triggerUpdate);

  if (btnRunAB) {
    btnRunAB.addEventListener('click', () => {
      const styleAKey = styleASelect?.value || 'vernacular_energy';
      const styleBKey = styleBSelect?.value || 'minimal_ugc';

      if (styleAKey === styleBKey) {
        showToast('Please select two distinct creative styles for A/B comparison', 'warning');
        return;
      }

      runABSimulation(styleAKey, styleBKey, showToast);
    });
  }

  renderRegionalData();
  // Initial run of A/B comparison with defaults
  runABSimulation('vernacular_energy', 'minimal_ugc', null, false);
}

function renderRegionalData() {
  const regionKey = document.getElementById('regional-state-select')?.value || 'maharashtra';
  const regionData = MOCK_REGIONS[regionKey] || MOCK_REGIONS.maharashtra;

  // DOM Elements
  const elName = document.getElementById('region-profile-name');
  const elTier = document.getElementById('region-profile-tier');
  const elEng = document.getElementById('region-profile-engagement');
  const elSentiment = document.getElementById('region-profile-sentiment');
  const elHours = document.getElementById('region-profile-hours');
  const elBasket = document.getElementById('region-profile-basket');
  const elLanguages = document.getElementById('region-profile-languages');
  const elFormats = document.getElementById('region-profile-formats');
  const elTriggers = document.getElementById('region-profile-triggers');
  const elApproach = document.getElementById('region-profile-approach');

  if (elName) elName.textContent = regionData.name;
  if (elTier) elTier.textContent = regionData.tier;
  if (elEng) elEng.textContent = regionData.engagementRate + '%';
  if (elSentiment) elSentiment.textContent = regionData.sentiment + '/100';
  if (elHours) elHours.textContent = regionData.peakHours;
  if (elBasket) elBasket.textContent = regionData.basketSize;

  if (elLanguages) {
    elLanguages.innerHTML = regionData.primaryLanguages.map(l => `
      <span class="badge badge-slate">${escapeHtml(l)}</span>
    `).join(' ');
  }

  if (elFormats) {
    elFormats.innerHTML = regionData.topFormats.map(f => `
      <li class="flex items-center gap-2 text-xs text-slate-700 py-1 border-b border-slate-100 last:border-0">
        <i data-lucide="video" class="text-indigo-600 icon-xs shrink-0"></i> ${escapeHtml(f)}
      </li>
    `).join('');
  }

  if (elTriggers) {
    elTriggers.innerHTML = regionData.culturalTriggers.map(t => `
      <li class="flex items-center gap-2 text-xs text-slate-700 py-1 border-b border-slate-100 last:border-0">
        <i data-lucide="sparkles" class="text-amber-500 icon-xs shrink-0"></i> ${escapeHtml(t)}
      </li>
    `).join('');
  }

  if (elApproach) {
    elApproach.textContent = regionData.recommendedApproach;
  }

  if (window.lucide) window.lucide.createIcons();
}

function runABSimulation(styleAKey, styleBKey, showToast, notify = true) {
  const regionKey = document.getElementById('regional-state-select')?.value || 'maharashtra';
  const regionData = MOCK_REGIONS[regionKey] || MOCK_REGIONS.maharashtra;

  const styleA = CREATIVE_STYLES[styleAKey] || CREATIVE_STYLES.vernacular_energy;
  const styleB = CREATIVE_STYLES[styleBKey] || CREATIVE_STYLES.minimal_ugc;

  // Regional adjustments
  let statsA = { ...styleA };
  let statsB = { ...styleB };

  if (regionKey === 'karnataka') {
    // Tech-heavy, UGC minimal performs higher
    statsB.retention += 8;
    statsB.ctr = +(statsB.ctr + 0.6).toFixed(1);
    statsB.engagement += 7;
  } else if (regionKey === 'maharashtra' || regionKey === 'punjab') {
    // Street vernacular performs higher
    statsA.retention += 6;
    statsA.ctr = +(statsA.ctr + 0.5).toFixed(1);
    statsA.engagement += 8;
  }

  const scoreA = (statsA.retention * 0.4) + (statsA.ctr * 10 * 0.3) + (statsA.engagement * 0.3);
  const scoreB = (statsB.retention * 0.4) + (statsB.ctr * 10 * 0.3) + (statsB.engagement * 0.3);

  const isAWinner = scoreA >= scoreB;
  const winner = isAWinner ? styleA : styleB;
  const winnerDelta = Math.abs(Math.round(((scoreA - scoreB) / scoreB) * 100));

  // Render Result DOM
  const resultContainer = document.getElementById('ab-results-card');
  if (resultContainer) {
    resultContainer.innerHTML = `
      <div class="ab-winner-banner ${isAWinner ? 'winner-a' : 'winner-b'} mb-4 p-3 rounded-lg border flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="winner-trophy-badge">🏆</span>
          <div>
            <div class="font-bold text-sm text-slate-900">
              Winning Style: ${escapeHtml(winner.name.split('(')[0])}
            </div>
            <p class="text-xs text-slate-600">
              Projected to deliver <strong>+${winnerDelta}% higher composite engagement</strong> in ${escapeHtml(regionData.name.split('(')[0])}.
            </p>
          </div>
        </div>
        <span class="badge badge-emerald font-semibold">Simulated Recommendation</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <!-- Style A Card -->
        <div class="creative-style-card ${isAWinner ? 'card-winner' : 'card-runnerup'} p-3.5 rounded-lg border">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="badge ${isAWinner ? 'badge-indigo' : 'badge-slate'} text-2xs mb-1">Creative Option A</span>
              <h5 class="font-bold text-sm text-slate-900">${escapeHtml(styleA.name)}</h5>
            </div>
            ${isAWinner ? '<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">WINNER</span>' : ''}
          </div>
          <div class="grid grid-cols-3 gap-2 text-center my-3 bg-slate-50 p-2 rounded">
            <div>
              <span class="text-2xs text-slate-500 block">Retention</span>
              <span class="font-bold text-sm text-slate-800">${statsA.retention}%</span>
            </div>
            <div>
              <span class="text-2xs text-slate-500 block">Est. CTR</span>
              <span class="font-bold text-sm text-indigo-600">${statsA.ctr}%</span>
            </div>
            <div>
              <span class="text-2xs text-slate-500 block">Trust Score</span>
              <span class="font-bold text-sm text-slate-800">${statsA.trust}/100</span>
            </div>
          </div>
          <p class="text-2xs text-slate-500"><strong>Best Suited For:</strong> ${escapeHtml(styleA.bestFor)}</p>
        </div>

        <!-- Style B Card -->
        <div class="creative-style-card ${!isAWinner ? 'card-winner' : 'card-runnerup'} p-3.5 rounded-lg border">
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="badge ${!isAWinner ? 'badge-indigo' : 'badge-slate'} text-2xs mb-1">Creative Option B</span>
              <h5 class="font-bold text-sm text-slate-900">${escapeHtml(styleB.name)}</h5>
            </div>
            ${!isAWinner ? '<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">WINNER</span>' : ''}
          </div>
          <div class="grid grid-cols-3 gap-2 text-center my-3 bg-slate-50 p-2 rounded">
            <div>
              <span class="text-2xs text-slate-500 block">Retention</span>
              <span class="font-bold text-sm text-slate-800">${statsB.retention}%</span>
            </div>
            <div>
              <span class="text-2xs text-slate-500 block">Est. CTR</span>
              <span class="font-bold text-sm text-indigo-600">${statsB.ctr}%</span>
            </div>
            <div>
              <span class="text-2xs text-slate-500 block">Trust Score</span>
              <span class="font-bold text-sm text-slate-800">${statsB.trust}/100</span>
            </div>
          </div>
          <p class="text-2xs text-slate-500"><strong>Best Suited For:</strong> ${escapeHtml(styleB.bestFor)}</p>
        </div>
      </div>

      <!-- Qualitative Rationale -->
      <div class="ab-rationale-box p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
        <strong class="text-slate-900">Why ${isAWinner ? 'Option A' : 'Option B'} Won:</strong>
        ${isAWinner ?
          `In ${regionData.name.split('(')[0]}, the fast vernacular opening hook captures the commuter audience during peak hours (${regionData.peakHours.split('&')[0]}). The local conversational dialect bridges emotional skepticism faster than formal product reviews.` :
          `Audiences in ${regionData.name.split('(')[0]} favor informative transparency and ingredient/spec verification before making purchasing decisions. The clean aesthetic review generated significantly higher user trust and saved-for-later intent.`
        }
      </div>
    `;
  }

  // Render Comparison Chart
  setTimeout(() => {
    renderRegionalABChart('chart-regional-ab', styleA.name.split('(')[0], styleB.name.split('(')[0], statsA, statsB);
    if (window.lucide) window.lucide.createIcons();
  }, 50);

  if (notify && showToast) {
    showToast(`A/B Simulation complete: ${winner.name.split('(')[0]} is the top performer!`, 'success');
  }
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
