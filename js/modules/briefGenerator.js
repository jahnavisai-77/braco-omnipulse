/**
 * Braco OmniPulse - AI Campaign Brief Generator
 * Generates tailored, structured campaign proposals with realistic budget splits,
 * creative hooks, persona insights, and KPIs.
 */

import { store } from '../state.js';

let currentGeneratedBrief = null;

export function initBriefGenerator(router, showToast) {
  const form = document.getElementById('brief-form');
  const btnReset = document.getElementById('btn-reset-brief');
  const btnCopy = document.getElementById('btn-copy-brief');
  const btnSave = document.getElementById('btn-save-brief');
  const btnDownload = document.getElementById('btn-download-brief');
  const presetButtons = document.querySelectorAll('.brief-preset-btn');
  const budgetPills = document.querySelectorAll('.budget-pill-btn');

  // Handle Preset Clicks
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetType = btn.dataset.preset;
      applyPreset(presetType);
      showToast('Loaded preset template for ' + btn.textContent.trim(), 'info');
    });
  });

  // Handle Budget Pill clicks
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const budgetInput = document.getElementById('brief-budget');
      if (budgetInput) {
        budgetInput.value = pill.dataset.amount;
        budgetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
    });
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleGenerateBrief(showToast);
    });
  }

  // Handle Reset
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (form) form.reset();
      const outputArea = document.getElementById('brief-output-container');
      const emptyArea = document.getElementById('brief-empty-state');
      if (outputArea) outputArea.classList.add('hidden');
      if (emptyArea) emptyArea.classList.remove('hidden');
      currentGeneratedBrief = null;
      showToast('Brief generator form cleared', 'info');
    });
  }

  // Handle Copy
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      if (!currentGeneratedBrief) return;
      const text = formatBriefAsText(currentGeneratedBrief);
      navigator.clipboard.writeText(text).then(() => {
        showToast('Campaign Brief copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Could not copy to clipboard', 'warning');
      });
    });
  }

  // Handle Save to Campaigns
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      if (!currentGeneratedBrief) return;
      const savedCampaign = store.saveBrief(currentGeneratedBrief);
      showToast(`Campaign "${savedCampaign.name}" saved to Active Campaigns!`, 'success');
      btnSave.disabled = true;
      btnSave.innerHTML = `<i data-lucide="check" class="icon-inline"></i> Saved to Campaigns`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Handle Download
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      if (!currentGeneratedBrief) return;
      const text = formatBriefAsText(currentGeneratedBrief);
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `OmniPulse_Brief_${currentGeneratedBrief.brand.replace(/\s+/g, '_')}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded Campaign Brief packet', 'success');
    });
  }
}

function applyPreset(presetType) {
  const brandInput = document.getElementById('brief-brand');
  const objInput = document.getElementById('brief-objective');
  const audInput = document.getElementById('brief-audience');
  const budgetInput = document.getElementById('brief-budget');
  const durInput = document.getElementById('brief-duration');
  const platInput = document.getElementById('brief-platform');
  const toneInput = document.getElementById('brief-tone');
  const descInput = document.getElementById('brief-desc');

  if (presetType === 'ecoglow') {
    if (brandInput) brandInput.value = 'EcoGlow Botanicals';
    if (objInput) objInput.value = 'product_launch';
    if (audInput) audInput.value = 'Urban working women 22-35 seeking clean, non-toxic ayurvedic active skincare';
    if (budgetInput) budgetInput.value = '1500000';
    if (durInput) durInput.value = '30_days';
    if (platInput) platInput.value = 'instagram_youtube';
    if (toneInput) toneInput.value = 'aspirational_clean';
    if (descInput) descInput.value = 'Launching our Vitamin-C Kumkumadi Radiance Serum. Highlight clinical actives combined with sustainable cold-pressed botanicals, 100% recyclable glass packaging.';
  } else if (presetType === 'urbanstitch') {
    if (brandInput) brandInput.value = 'UrbanStitch India';
    if (objInput) objInput.value = 'festive_push';
    if (audInput) audInput.value = 'Gen Z streetwear enthusiasts (18-24) in Tier 1 & 2 cities wanting oversized fits';
    if (budgetInput) budgetInput.value = '1000000';
    if (durInput) durInput.value = '21_days';
    if (platInput) platInput.value = 'instagram';
    if (toneInput) toneInput.value = 'quirky_bold';
    if (descInput) descInput.value = 'Diwali Festive Drop: "Gully Cyberpunk" collection with reflective graphic hoodies, oversized drop-shoulder tees, and localized Indian pop-culture references.';
  } else if (presetType === 'pulseenergy') {
    if (brandInput) brandInput.value = 'PulseEnergy Zero';
    if (objInput) objInput.value = 'brand_awareness';
    if (audInput) audInput.value = 'Fitness enthusiasts, gamers, and corporate executives needing zero-sugar clean stamina';
    if (budgetInput) budgetInput.value = '2500000';
    if (durInput) durInput.value = '45_days';
    if (platInput) platInput.value = 'omnichannel';
    if (toneInput) toneInput.value = 'high_energy';
    if (descInput) descInput.value = 'Clean natural caffeine electrolyte drink with 0 sugar, BCAAs, and green tea extract. Direct challenge to sugar-laden energy drinks.';
  } else if (presetType === 'swiftpay') {
    if (brandInput) brandInput.value = 'SwiftPay Merchant QR';
    if (objInput) objInput.value = 'lead_gen';
    if (audInput) audInput.value = 'Small retail store owners, cafe founders, and D2C boutique merchants across India';
    if (budgetInput) budgetInput.value = '800000';
    if (durInput) durInput.value = '30_days';
    if (platInput) platInput.value = 'linkedin_youtube';
    if (toneInput) toneInput.value = 'authoritative_trust';
    if (descInput) descInput.value = 'Zero-fee instant bank settlements via soundbox and QR. Emphasize no hidden transactional fee, multilingual voice alerts, and instantaneous UPI transfers.';
  }
}

function handleGenerateBrief(showToast) {
  const brand = document.getElementById('brief-brand')?.value.trim() || 'Your Brand';
  const objective = document.getElementById('brief-objective')?.value || 'brand_awareness';
  const audience = document.getElementById('brief-audience')?.value.trim() || 'Broad Indian demographic';
  const budget = parseFloat(document.getElementById('brief-budget')?.value) || 1000000;
  const duration = document.getElementById('brief-duration')?.value || '30_days';
  const platform = document.getElementById('brief-platform')?.value || 'omnichannel';
  const tone = document.getElementById('brief-tone')?.value || 'aspirational_clean';
  const description = document.getElementById('brief-desc')?.value.trim() || 'Product promotion campaign';

  const outputContainer = document.getElementById('brief-output-container');
  const emptyState = document.getElementById('brief-empty-state');
  const loadingState = document.getElementById('brief-loading-state');

  if (emptyState) emptyState.classList.add('hidden');
  if (outputContainer) outputContainer.classList.add('hidden');
  if (loadingState) loadingState.classList.remove('hidden');

  // Simulated AI synthesis with progressive feedback steps
  const loadingStatusText = document.getElementById('brief-loading-status-text');
  const steps = [
    'Analyzing target persona & linguistic affinity...',
    'Synthesizing platform engagement algorithms...',
    'Calculating budget distribution in INR...',
    'Drafting high-converting creative hooks & deliverables...'
  ];

  let stepIdx = 0;
  const interval = setInterval(() => {
    stepIdx++;
    if (stepIdx < steps.length && loadingStatusText) {
      loadingStatusText.textContent = steps[stepIdx];
    }
  }, 350);

  setTimeout(() => {
    clearInterval(interval);
    if (loadingState) loadingState.classList.add('hidden');

    const brief = generateBriefData({
      brand,
      objective,
      audience,
      budget,
      duration,
      platform,
      tone,
      description
    });

    currentGeneratedBrief = brief;
    renderBriefOutput(brief);

    if (outputContainer) outputContainer.classList.remove('hidden');
    showToast('AI Campaign Brief generated successfully!', 'success');

    // Reset save button state
    const btnSave = document.getElementById('btn-save-brief');
    if (btnSave) {
      btnSave.disabled = false;
      btnSave.innerHTML = `<i data-lucide="bookmark-plus" class="icon-inline"></i> Save to Active Campaigns`;
      if (window.lucide) window.lucide.createIcons();
    }
  }, 1400);
}

function generateBriefData(inputs) {
  const budget = inputs.budget;
  const influencerBudget = Math.round(budget * 0.40);
  const paidMediaBudget = Math.round(budget * 0.35);
  const productionBudget = Math.round(budget * 0.15);
  const contingencyBudget = Math.round(budget * 0.10);

  // Derive estimated metrics based on budget
  const estReachMillions = ((budget / 1000000) * 1.85).toFixed(1);
  const estImpressions = ((budget / 1000000) * 3.4).toFixed(1);
  const estConversions = Math.round((budget / 1000000) * 8200).toLocaleString('en-IN');
  const targetCTR = '3.85%';
  const targetROAS = '3.9x';
  const estCPA = '₹' + Math.round(160 + (Math.random() * 40));

  let campaignTitle = `${inputs.brand}: Unleash The Pulse`;
  let hook = 'Stop settling for ordinary. Experience the benchmark.';
  let personaName = 'The Conscious Achiever';

  if (inputs.brand.toLowerCase().includes('glow') || inputs.brand.toLowerCase().includes('skincare')) {
    campaignTitle = `${inputs.brand}: Pure Radiance, Proven Science`;
    hook = '“Is your skincare actually working or just smelling nice?” Unveil cold-pressed Ayurvedic actives.';
    personaName = 'The Discerning Beauty Connoisseur (24-34)';
  } else if (inputs.brand.toLowerCase().includes('stitch') || inputs.brand.toLowerCase().includes('urban')) {
    campaignTitle = `${inputs.brand}: Claim Your Street Cred`;
    hook = '“Normal is boring.” Turn the street into your runway with oversized silhouettes designed for India.';
    personaName = 'The Gen-Z Cultural Rebel (18-24)';
  } else if (inputs.brand.toLowerCase().includes('pulse') || inputs.brand.toLowerCase().includes('energy')) {
    campaignTitle = `${inputs.brand}: Clean Fuel for Relentless Hustle`;
    hook = '“Zero crash. Zero sugar. 100% relentless focus.” The clean energy upgrade your day needs.';
    personaName = 'The High-Performance Hustler (22-35)';
  } else if (inputs.brand.toLowerCase().includes('pay') || inputs.brand.toLowerCase().includes('swift')) {
    campaignTitle = `${inputs.brand}: Instant Settlements, Zero Hassle`;
    hook = '“Why wait 24 hours for your hard-earned money?” Instant audio confirmation & zero transaction fee.';
    personaName = 'The Tech-Forward Retail Merchant (28-48)';
  }

  const durationLabel = inputs.duration.replace('_', ' ').toUpperCase();

  return {
    title: campaignTitle,
    brand: inputs.brand,
    objective: formatObjective(inputs.objective),
    audience: inputs.audience,
    personaName,
    budget: budget,
    duration: durationLabel,
    platform: formatPlatform(inputs.platform),
    tone: formatTone(inputs.tone),
    description: inputs.description,
    hook,
    budgetSplit: {
      influencers: influencerBudget,
      paidMedia: paidMediaBudget,
      production: productionBudget,
      contingency: contingencyBudget
    },
    projectedReach: `${estReachMillions}M`,
    projectedImpressions: `${estImpressions}M`,
    projectedCTR: targetCTR,
    projectedConversions: estConversions,
    projectedROAS: targetROAS,
    projectedCPA: estCPA,
    deliverables: [
      { format: 'Instagram Reels (15-30s)', count: '12 Creator Reels + 6 Brand Cuts', focus: 'High-hook problem-solution transformation' },
      { format: 'YouTube Long-Form / Shorts', count: '4 Deep Dives + 10 Shorts', focus: 'Authentic review, unboxing, and proof demonstration' },
      { format: 'Meta Paid Acquisition Ads', count: '18 Dynamic Creative Ad Variations', focus: 'A/B testing hook variations with direct CTA' },
      { format: 'Community & WhatsApp Push', count: '4 Weekly Broadcasts', focus: 'Exclusive limited-time promo codes and VIP drops' }
    ],
    roadmap: [
      { phase: 'Phase 1: Teaser & Seeding (Days 1-7)', detail: 'Send mystery PR drops to 15 micro-influencers. Build curiosity without showing the full product.' },
      { phase: 'Phase 2: Launch Blitz & Authority (Days 8-20)', detail: 'Simultaneous drop of creator reels + high-frequency Meta carousel ads targeting high-affinity interest segments.' },
      { phase: 'Phase 3: Social Proof & Retargeting (Days 21-30)', detail: 'Retarget landing page drop-offs with customer reviews, FOMO discounts, and founder unboxing cuts.' }
    ]
  };
}

function renderBriefOutput(brief) {
  const container = document.getElementById('brief-output-container');
  if (!container) return;

  const budgetTotalStr = '₹' + Number(brief.budget).toLocaleString('en-IN');
  const infStr = '₹' + Number(brief.budgetSplit.influencers).toLocaleString('en-IN');
  const paidStr = '₹' + Number(brief.budgetSplit.paidMedia).toLocaleString('en-IN');
  const prodStr = '₹' + Number(brief.budgetSplit.production).toLocaleString('en-IN');
  const contStr = '₹' + Number(brief.budgetSplit.contingency).toLocaleString('en-IN');

  container.innerHTML = `
    <div class="brief-result-card">
      <div class="brief-header">
        <div class="brief-title-block">
          <div class="badge-row mb-1">
            <span class="badge badge-indigo">AI Generated Strategy</span>
            <span class="badge badge-emerald">Ready for Execution</span>
            <span class="badge badge-slate">${escapeHtml(brief.duration)}</span>
          </div>
          <h3 class="brief-title text-xl font-bold text-slate-900">${escapeHtml(brief.title)}</h3>
          <p class="text-sm text-slate-500">Brand: <strong class="text-slate-800">${escapeHtml(brief.brand)}</strong> • Objective: <strong class="text-slate-800">${escapeHtml(brief.objective)}</strong> • Platform: <strong class="text-slate-800">${escapeHtml(brief.platform)}</strong></p>
        </div>
        <div class="brief-header-actions">
          <span class="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold border border-indigo-200">
            OmniPulse AI Demo Calibrated
          </span>
        </div>
      </div>

      <!-- Campaign Concept & Hook -->
      <div class="brief-section highlight-box">
        <h4 class="section-subtitle flex items-center gap-2">
          <i data-lucide="sparkles" class="text-indigo-600"></i> Core Concept & Primary Hook
        </h4>
        <div class="hook-callout">
          <p class="hook-quote">"${escapeHtml(brief.hook)}"</p>
          <p class="hook-explanation text-xs text-slate-600 mt-1">
            Tone: <strong>${escapeHtml(brief.tone)}</strong> • Crafted to capture attention in the first 2.8 seconds on short-form feeds.
          </p>
        </div>
      </div>

      <!-- Target Audience Persona -->
      <div class="brief-section">
        <h4 class="section-subtitle flex items-center gap-2">
          <i data-lucide="target" class="text-indigo-600"></i> Audience Persona Breakdown
        </h4>
        <div class="persona-card">
          <div class="persona-header font-semibold text-slate-800">${escapeHtml(brief.personaName)}</div>
          <p class="text-sm text-slate-600 mt-1">${escapeHtml(brief.audience)}</p>
          <div class="persona-triggers mt-2 text-xs text-slate-500">
            <strong>Key Purchase Triggers:</strong> Authenticity, zero-friction mobile checkout, verified social proof, and regional relatability.
          </div>
        </div>
      </div>

      <!-- Suggested Budget Breakdown -->
      <div class="brief-section">
        <div class="flex justify-between items-center mb-2">
          <h4 class="section-subtitle flex items-center gap-2">
            <i data-lucide="pie-chart" class="text-indigo-600"></i> Suggested Budget Allocation (${budgetTotalStr})
          </h4>
          <span class="text-xs text-slate-500 font-medium">Recommended Channel Split</span>
        </div>

        <div class="budget-progress-bar mb-3">
          <div class="bar-segment bar-inf" style="width: 40%;" title="Creator Partnerships (40%)"></div>
          <div class="bar-segment bar-paid" style="width: 35%;" title="Paid Performance Media (35%)"></div>
          <div class="bar-segment bar-prod" style="width: 15%;" title="Content Production (15%)"></div>
          <div class="bar-segment bar-cont" style="width: 10%;" title="Contingency & Contests (10%)"></div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="budget-stat-box">
            <span class="legend-dot dot-inf"></span>
            <div class="budget-stat-content">
              <span class="text-slate-500">Creators (40%)</span>
              <span class="font-bold text-slate-800">${infStr}</span>
            </div>
          </div>
          <div class="budget-stat-box">
            <span class="legend-dot dot-paid"></span>
            <div class="budget-stat-content">
              <span class="text-slate-500">Paid Ads (35%)</span>
              <span class="font-bold text-slate-800">${paidStr}</span>
            </div>
          </div>
          <div class="budget-stat-box">
            <span class="legend-dot dot-prod"></span>
            <div class="budget-stat-content">
              <span class="text-slate-500">Production (15%)</span>
              <span class="font-bold text-slate-800">${prodStr}</span>
            </div>
          </div>
          <div class="budget-stat-box">
            <span class="legend-dot dot-cont"></span>
            <div class="budget-stat-content">
              <span class="text-slate-500">Contingency (10%)</span>
              <span class="font-bold text-slate-800">${contStr}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Projected KPIs -->
      <div class="brief-section">
        <h4 class="section-subtitle flex items-center gap-2">
          <i data-lucide="trending-up" class="text-indigo-600"></i> Projected Campaign KPIs
        </h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          <div class="kpi-mini-card">
            <span class="text-xs text-slate-500">Est. Reach</span>
            <span class="text-lg font-bold text-indigo-600">${brief.projectedReach}</span>
            <span class="text-2xs text-slate-400">Unique Users</span>
          </div>
          <div class="kpi-mini-card">
            <span class="text-xs text-slate-500">Est. CTR</span>
            <span class="text-lg font-bold text-emerald-600">${brief.projectedCTR}</span>
            <span class="text-2xs text-slate-400">+1.2% Industry Avg</span>
          </div>
          <div class="kpi-mini-card">
            <span class="text-xs text-slate-500">Target ROAS</span>
            <span class="text-lg font-bold text-indigo-600">${brief.projectedROAS}</span>
            <span class="text-2xs text-slate-400">Blended Ad Spend</span>
          </div>
          <div class="kpi-mini-card">
            <span class="text-xs text-slate-500">Est. Conversions</span>
            <span class="text-lg font-bold text-emerald-600">${brief.projectedConversions}</span>
            <span class="text-2xs text-slate-400">Avg CPA ${brief.projectedCPA}</span>
          </div>
        </div>
      </div>

      <!-- Deliverables & Content Ideas -->
      <div class="brief-section">
        <h4 class="section-subtitle flex items-center gap-2">
          <i data-lucide="layers" class="text-indigo-600"></i> Content Deliverables Matrix
        </h4>
        <div class="deliverables-list mt-2 space-y-2">
          ${brief.deliverables.map(d => `
            <div class="deliverable-item flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <span class="font-semibold text-sm text-slate-800">${escapeHtml(d.format)}</span>
                <p class="text-xs text-slate-500">${escapeHtml(d.focus)}</p>
              </div>
              <span class="text-xs font-semibold px-2 py-1 bg-white rounded shadow-sm text-indigo-700 border border-slate-200">
                ${escapeHtml(d.count)}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Execution Roadmap -->
      <div class="brief-section">
        <h4 class="section-subtitle flex items-center gap-2">
          <i data-lucide="calendar" class="text-indigo-600"></i> 3-Phase Execution Roadmap
        </h4>
        <div class="roadmap-timeline mt-2 space-y-3">
          ${brief.roadmap.map((r, idx) => `
            <div class="roadmap-step flex items-start gap-3">
              <div class="step-num-badge">${idx + 1}</div>
              <div>
                <div class="text-sm font-semibold text-slate-800">${escapeHtml(r.phase)}</div>
                <div class="text-xs text-slate-600 mt-0.5">${escapeHtml(r.detail)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function formatBriefAsText(b) {
  return `========================================
BRACO OMNIPULSE - AI CAMPAIGN PROPOSAL
========================================
Title: ${b.title}
Brand: ${b.brand}
Objective: ${b.objective}
Target Audience: ${b.audience}
Duration: ${b.duration}
Tone: ${b.tone}
Platforms: ${b.platform}

CONCEPT & HOOK:
"${b.hook}"

BUDGET ALLOCATION (Total: ₹${Number(b.budget).toLocaleString('en-IN')}):
- Creator Partnerships (40%): ₹${Number(b.budgetSplit.influencers).toLocaleString('en-IN')}
- Paid Performance Media (35%): ₹${Number(b.budgetSplit.paidMedia).toLocaleString('en-IN')}
- Content Production (15%): ₹${Number(b.budgetSplit.production).toLocaleString('en-IN')}
- Contingency & Testing (10%): ₹${Number(b.budgetSplit.contingency).toLocaleString('en-IN')}

PROJECTED KPIS:
- Est. Reach: ${b.projectedReach}
- Est. CTR: ${b.projectedCTR}
- Est. Conversions: ${b.projectedConversions}
- Target ROAS: ${b.projectedROAS}
- Est. CPA: ${b.projectedCPA}

DELIVERABLES:
${b.deliverables.map(d => `- ${d.format}: ${d.count} (${d.focus})`).join('\n')}

EXECUTION ROADMAP:
${b.roadmap.map(r => `- ${r.phase}: ${r.detail}`).join('\n')}

*Generated with Braco OmniPulse Demo AI Engine (Calibrated with Indian Market Norms)*
`;
}

function formatObjective(val) {
  const map = {
    brand_awareness: 'Brand Awareness & Reach',
    product_launch: 'Product Launch Blitz',
    festive_push: 'Festive Seasonal Push',
    lead_gen: 'D2C Conversions & Sales',
    app_installs: 'App Installs & Engagement'
  };
  return map[val] || 'Brand Growth';
}

function formatPlatform(val) {
  const map = {
    omnichannel: 'Omnichannel (Instagram, YouTube, Meta, Regional)',
    instagram: 'Instagram Dominant (Reels & Carousels)',
    instagram_youtube: 'Instagram Reels + YouTube Longform',
    linkedin_youtube: 'LinkedIn B2B + YouTube Deep Dives',
    regional: 'Regional Vernacular & WhatsApp'
  };
  return map[val] || val;
}

function formatTone(val) {
  const map = {
    aspirational_clean: 'Aspirational, Clean & Premium',
    quirky_bold: 'Quirky, Bold & Humorous',
    authoritative_trust: 'Authoritative, Scientific & Trustworthy',
    high_energy: 'High-Energy, Bold & Relentless',
    festive_warmth: 'Festive, Emotionally Resonant & Warm'
  };
  return map[val] || val;
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
