/**
 * Braco OmniPulse - TrustPulse: Brand Safety & Compliance Module
 * Validates advertising claims against Indian regulatory frameworks:
 * FSSAI (Food Safety & Standards), ASCI (Advertising Standards Council of India),
 * and Consumer Protection Act (2019).
 */

import { store } from '../state.js';

export function initTrustPulse(router, showToast) {
  const form = document.getElementById('trustpulse-form');
  const categorySelect = document.getElementById('trust-category');
  const fssaiGroup = document.getElementById('trust-fssai-group');
  const presetButtons = document.querySelectorAll('.trust-preset-btn');
  const btnReset = document.getElementById('btn-reset-trust');

  // Toggle FSSAI field based on category
  if (categorySelect && fssaiGroup) {
    categorySelect.addEventListener('change', () => {
      const isFoodOrSupp = categorySelect.value === 'food' || categorySelect.value === 'supplements';
      fssaiGroup.classList.toggle('hidden', !isFoodOrSupp);
    });
  }

  // Handle Preset Clicks
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.dataset.preset;
      applyTrustPreset(presetKey);
      showToast('Loaded audit sample: ' + btn.textContent.trim(), 'info');
      // Automatically run audit for instant demo delight
      runTrustAudit(showToast);
    });
  });

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      runTrustAudit(showToast);
    });
  }

  // Handle Reset
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (form) form.reset();
      const isFoodOrSupp = categorySelect?.value === 'food' || categorySelect?.value === 'supplements';
      if (fssaiGroup) fssaiGroup.classList.toggle('hidden', !isFoodOrSupp);
      const emptyState = document.getElementById('trust-empty-state');
      const resultsContainer = document.getElementById('trust-results-container');
      if (emptyState) emptyState.classList.remove('hidden');
      if (resultsContainer) resultsContainer.classList.add('hidden');
      showToast('TrustPulse audit form reset', 'info');
    });
  }
}

function applyTrustPreset(presetKey) {
  const brandInput = document.getElementById('trust-brand');
  const catInput = document.getElementById('trust-category');
  const copyInput = document.getElementById('trust-copy');
  const fssaiInput = document.getElementById('trust-fssai-number');
  const fssaiGroup = document.getElementById('trust-fssai-group');
  const chkInfluencer = document.getElementById('trust-chk-influencer');

  // Uncheck all claims first
  document.querySelectorAll('.trust-claim-chk').forEach(c => c.checked = false);

  if (presetKey === 'clean_food') {
    if (brandInput) brandInput.value = 'PureHarvest Organics';
    if (catInput) catInput.value = 'food';
    if (fssaiGroup) fssaiGroup.classList.remove('hidden');
    if (fssaiInput) fssaiInput.value = '10020021000452';
    if (chkInfluencer) chkInfluencer.checked = true;
    if (copyInput) copyInput.value = 'Start your morning with 100% stone-ground whole wheat chakki atta. Packed with natural dietary fiber and zero added preservatives. Certified organic goodness for your family. #ad #collaboration with @chef_tanvi';

    checkClaim('chk-organic');
    checkClaim('chk-preservative');
  } else if (presetKey === 'miracle_health') {
    if (brandInput) brandInput.value = 'MiracleSlim Drops';
    if (catInput) catInput.value = 'supplements';
    if (fssaiGroup) fssaiGroup.classList.remove('hidden');
    if (fssaiInput) fssaiInput.value = ''; // missing license!
    if (chkInfluencer) chkInfluencer.checked = true;
    if (copyInput) copyInput.value = 'Guaranteed 10kg weight loss in just 14 days without diet or exercise! Cures stubborn belly fat permanently. Doctor recommended miracle ayurvedic elixir!';

    checkClaim('chk-weightloss');
    checkClaim('chk-doctor');
  } else if (presetKey === 'missing_asci') {
    if (brandInput) brandInput.value = 'GlowVibe Cosmetics';
    if (catInput) catInput.value = 'cosmetics';
    if (fssaiGroup) fssaiGroup.classList.add('hidden');
    if (fssaiInput) fssaiInput.value = '';
    if (chkInfluencer) chkInfluencer.checked = true;
    if (copyInput) copyInput.value = 'I have been obsessed with this new serum for the past week! It cleared my acne overnight and made my skin glow like glass. Check the link in my bio to purchase!';
    // Note: no #ad or #collab in text despite influencer checked!

    checkClaim('chk-organic');
  } else if (presetKey === 'fintech_risk') {
    if (brandInput) brandInput.value = 'AlphaGain Wealth';
    if (catInput) catInput.value = 'fintech';
    if (fssaiGroup) fssaiGroup.classList.add('hidden');
    if (fssaiInput) fssaiInput.value = '';
    if (chkInfluencer) chkInfluencer.checked = false;
    if (copyInput) copyInput.value = 'Double your savings in 30 days with our proprietary algorithmic trading bot! 100% guaranteed risk-free 24% monthly returns. Outperforms traditional fixed deposits by 10x!';

    checkClaim('chk-financial');
    checkClaim('chk-comparative');
  }
}

function checkClaim(id) {
  const el = document.getElementById(id);
  if (el) el.checked = true;
}

function runTrustAudit(showToast) {
  const brand = document.getElementById('trust-brand')?.value.trim() || 'Sample Brand';
  const category = document.getElementById('trust-category')?.value || 'general';
  const copy = document.getElementById('trust-copy')?.value.trim() || '';
  const fssaiNum = document.getElementById('trust-fssai-number')?.value.trim() || '';
  const isInfluencer = document.getElementById('trust-chk-influencer')?.checked || false;

  const emptyState = document.getElementById('trust-empty-state');
  const resultsContainer = document.getElementById('trust-results-container');
  const loadingState = document.getElementById('trust-loading-state');

  if (emptyState) emptyState.classList.add('hidden');
  if (resultsContainer) resultsContainer.classList.add('hidden');
  if (loadingState) loadingState.classList.remove('hidden');

  setTimeout(() => {
    if (loadingState) loadingState.classList.add('hidden');

    const audit = performComplianceCheck({
      brand,
      category,
      copy,
      fssaiNum,
      isInfluencer
    });

    renderAuditResults(audit);
    if (resultsContainer) resultsContainer.classList.remove('hidden');

    if (showToast) {
      if (audit.score >= 80) {
        showToast('TrustPulse Audit Complete: Low Risk / Safe to Publish', 'success');
      } else if (audit.score >= 50) {
        showToast('TrustPulse Audit Complete: Moderate Risk / Revisions Required', 'warning');
      } else {
        showToast('TrustPulse Audit Complete: High Risk / Regulatory Violations Found', 'error');
      }
    }
  }, 600);
}

function performComplianceCheck(data) {
  const copyLower = data.copy.toLowerCase();
  const checks = [];
  let score = 100;

  // 1. Food / FSSAI Check
  if (data.category === 'food' || data.category === 'supplements') {
    const isValidFssai = /^\d{14}$/.test(data.fssaiNum);
    if (!data.fssaiNum) {
      score -= 25;
      checks.push({
        id: 'fssai_missing',
        name: 'FSSAI License Disclosure',
        status: 'fail',
        regulation: 'FSS (Advertising & Claims) Regulations, 2018',
        issue: 'Missing 14-digit FSSAI license number on food product advertisement.',
        remedy: 'Mandatory: Include valid 14-digit FSSAI license number in promotional creative or caption.'
      });
    } else if (!isValidFssai) {
      score -= 15;
      checks.push({
        id: 'fssai_invalid',
        name: 'FSSAI Number Format',
        status: 'warn',
        regulation: 'FSSAI Verification Protocol',
        issue: `Provided license number "${data.fssaiNum}" is not a valid 14-digit format.`,
        remedy: 'Verify the manufacturer / marketer license number is exactly 14 digits.'
      });
    } else {
      checks.push({
        id: 'fssai_valid',
        name: 'FSSAI License Verification',
        status: 'pass',
        regulation: 'FSS (Advertising & Claims) Regulations, 2018',
        issue: 'Valid 14-digit FSSAI license format detected.',
        remedy: 'Compliant. Ensure font size meets 3mm print / 5s video display minimum.'
      });
    }
  }

  // 2. ASCI Influencer Endorsement Check
  if (data.isInfluencer) {
    const hasAsciTag = /#(ad|collab|sponsored|partnership|advertisement)\b/i.test(data.copy);
    if (!hasAsciTag) {
      score -= 25;
      checks.push({
        id: 'asci_tag_missing',
        name: 'ASCI Influencer Endorsement Disclosure',
        status: 'fail',
        regulation: 'ASCI Guidelines for Influencer Advertising (2021/2023)',
        issue: 'Promotional influencer post lacks mandatory disclosure tags (#ad, #collab, or #sponsored).',
        remedy: 'Insert "#ad" or "#collab" within the first 3 lines of caption or prominently on the video frame.'
      });
    } else {
      checks.push({
        id: 'asci_tag_present',
        name: 'ASCI Influencer Disclosure',
        status: 'pass',
        regulation: 'ASCI Guidelines for Influencer Advertising',
        issue: 'Clear commercial disclosure tag identified in creative copy.',
        remedy: 'Compliant. Ensure tag is not hidden beneath "read more" cutoff on mobile.'
      });
    }
  }

  // 3. Absolute / Miracle Health Claims (Drugs & Magic Remedies Act)
  const miracleWords = ['cure', 'cures', 'instant weight loss', 'permanent fat loss', 'miracle', '100% cure', 'overnight'];
  const hasMiracle = miracleWords.some(w => copyLower.includes(w));
  if (hasMiracle) {
    score -= 35;
    checks.push({
      id: 'magic_remedies',
      name: 'Prohibited Therapeutic / Miracle Claims',
      status: 'fail',
      regulation: 'Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954',
      issue: 'Contains prohibited absolute claims guaranteeing medical cures or rapid bodily transformations.',
      remedy: 'Remove words like "cure", "instant weight loss", or "miracle". Rephrase to: "Supports a healthy lifestyle alongside balanced diet and exercise".'
    });
  }

  // 4. Financial Guaranteed Return Claims (SEBI & Consumer Protection Act)
  const financialWords = ['guaranteed return', 'double your savings', 'risk-free', 'guaranteed profit', '100% guaranteed'];
  if (financialWords.some(w => copyLower.includes(w))) {
    score -= 30;
    checks.push({
      id: 'financial_misleading',
      name: 'Unsubstantiated Financial Guarantees',
      status: 'fail',
      regulation: 'SEBI (Prohibition of Fraudulent & Unfair Trade Practices) & CPA 2019',
      issue: 'Promising guaranteed financial returns or risk-free profits is prohibited for investment products.',
      remedy: 'Remove "guaranteed" / "risk-free". Append mandatory regulatory disclaimer: "Investments are subject to market risks. Read all scheme related documents carefully."'
    });
  }

  // 5. Unsubstantiated Comparative Advertising
  const comparativeWords = ['outperforms', 'better than', 'beats competitor', '10x superior'];
  if (comparativeWords.some(w => copyLower.includes(w))) {
    score -= 15;
    checks.push({
      id: 'comparative_ad',
      name: 'Comparative Advertising Substantiation',
      status: 'warn',
      regulation: 'ASCI Chapter IV (Fair Competition)',
      issue: 'Comparative superiority claim requires verifiable independent laboratory/market research proof.',
      remedy: 'Provide verifiable test footnote or temper to: "Designed to provide superior value compared to standard market alternatives* (*based on internal testing)".'
    });
  }

  // 6. Natural / Organic Claim Verification
  if (copyLower.includes('100% natural') || copyLower.includes('organic')) {
    if (data.category === 'food' || data.category === 'cosmetics') {
      checks.push({
        id: 'organic_check',
        name: 'Organic / Natural Certification Requirement',
        status: 'warn',
        regulation: 'Jaivik Bharat / NPOP Organic Certification Norms',
        issue: 'Claims of "100% Organic" require valid Jaivik Bharat or NPOP certification logo on packaging.',
        remedy: 'Ensure certified organic registration logo is displayed on the product pack shown in ad.'
      });
      score -= 5;
    }
  }

  // Baseline Pass if no violations found
  if (checks.length === 0 || (checks.every(c => c.status === 'pass'))) {
    checks.push({
      id: 'general_safety',
      name: 'Tone & Claim Truthfulness',
      status: 'pass',
      regulation: 'Consumer Protection Act, 2019 (Misleading Ads Guidelines)',
      issue: 'No overt prohibited keywords, sensationalist claims, or deceptive omissions detected.',
      remedy: 'Creative is in good alignment with standard self-regulatory benchmarks.'
    });
  }

  score = Math.max(15, Math.min(100, score));

  let riskLevel = 'Low Risk';
  let badgeClass = 'badge-emerald';
  let statusText = 'SAFE TO PUBLISH';

  if (score < 55) {
    riskLevel = 'High Risk';
    badgeClass = 'badge-rose';
    statusText = 'HIGH RISK — REJECT OR REVISE';
  } else if (score < 80) {
    riskLevel = 'Moderate Risk';
    badgeClass = 'badge-amber';
    statusText = 'CAUTION — REVISIONS REQUIRED';
  }

  return {
    brand: data.brand,
    category: data.category,
    score,
    riskLevel,
    badgeClass,
    statusText,
    checks,
    cleanCopySuggestion: generateCompliantCopy(data.copy, data.category, data.isInfluencer)
  };
}

function generateCompliantCopy(originalCopy, category, isInfluencer) {
  let cleaned = originalCopy;
  cleaned = cleaned.replace(/guaranteed 10kg weight loss/gi, 'supports your fitness journey');
  cleaned = cleaned.replace(/cures stubborn belly fat permanently/gi, 'helps maintain healthy metabolism');
  cleaned = cleaned.replace(/miracle ayurvedic elixir/gi, 'ayurvedic wellness formulation');
  cleaned = cleaned.replace(/double your savings in 30 days/gi, 'grow your wealth systematically');
  cleaned = cleaned.replace(/100% guaranteed risk-free/gi, 'data-backed');

  if (isInfluencer && !/#(ad|collab)\b/i.test(cleaned)) {
    cleaned = cleaned + ' #ad #collab';
  }

  if (category === 'food' && !/fssai/i.test(cleaned)) {
    cleaned = cleaned + ' [FSSAI Lic No: 10020021000452]';
  }

  return cleaned;
}

function renderAuditResults(audit) {
  const container = document.getElementById('trust-results-container');
  if (!container) return;

  const scoreColor = audit.score >= 80 ? 'text-emerald-600' : audit.score >= 55 ? 'text-amber-500' : 'text-rose-600';
  const scoreBorder = audit.score >= 80 ? 'border-emerald-500' : audit.score >= 55 ? 'border-amber-500' : 'border-rose-500';

  container.innerHTML = `
    <div class="trust-audit-card">
      <div class="trust-summary-header flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 border-b border-slate-200 gap-3">
        <div class="flex items-center gap-3">
          <div class="score-circle w-14 h-14 rounded-full border-4 ${scoreBorder} flex items-center justify-center font-bold text-xl ${scoreColor} bg-white shadow-sm">
            ${audit.score}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="badge ${audit.badgeClass} font-bold">${audit.statusText}</span>
              <span class="text-xs text-slate-500">Brand: <strong>${escapeHtml(audit.brand)}</strong></span>
            </div>
            <p class="text-xs text-slate-600 mt-0.5">
              Automated safety audit against ASCI, FSSAI & Consumer Protection Act 2019 standards.
            </p>
          </div>
        </div>
        <div class="text-2xs text-slate-500 bg-white px-2.5 py-1.5 rounded border border-slate-200">
          Demo Assessment • Not Legal Counsel
        </div>
      </div>

      <!-- Checklist Table -->
      <div class="p-4">
        <h5 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <i data-lucide="clipboard-check" class="text-indigo-600 icon-xs"></i> Compliance Checklist & Audit Findings
        </h5>

        <div class="space-y-3">
          ${audit.checks.map(c => `
            <div class="audit-item-row p-3 rounded-lg border ${getItemRowClass(c.status)}">
              <div class="flex items-start justify-between gap-2 mb-1">
                <div class="flex items-center gap-2">
                  ${getStatusIcon(c.status)}
                  <span class="font-bold text-sm text-slate-900">${escapeHtml(c.name)}</span>
                </div>
                <span class="text-2xs font-mono px-2 py-0.5 rounded ${getStatusBadgeClass(c.status)}">
                  ${c.status.toUpperCase()}
                </span>
              </div>
              <div class="text-xs text-slate-500 mb-1 font-medium">
                Reg: <em>${escapeHtml(c.regulation)}</em>
              </div>
              <div class="text-xs text-slate-700 mb-1.5">
                <strong>Finding:</strong> ${escapeHtml(c.issue)}
              </div>
              <div class="text-xs text-slate-800 bg-white p-2 rounded border border-slate-200">
                <strong class="text-indigo-700">Recommended Action:</strong> ${escapeHtml(c.remedy)}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Compliant Ad Copy Suggestion -->
        <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <i data-lucide="check" class="icon-xs"></i> Suggested Compliant Ad Copy Variant
            </span>
            <button class="btn btn-ghost btn-xs text-emerald-700" id="btn-copy-clean-text">
              Copy Compliant Copy
            </button>
          </div>
          <p class="text-xs text-emerald-900 font-mono bg-white p-2 rounded border border-emerald-200 leading-relaxed" id="clean-copy-text">
            "${escapeHtml(audit.cleanCopySuggestion)}"
          </p>
        </div>

        <!-- Prominent Disclaimer -->
        <div class="mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded text-2xs text-amber-900 leading-relaxed">
          <strong>Regulatory Notice:</strong> TrustPulse assessments are algorithmic demo simulations designed to flag common advertising risks under Indian law (FSSAI/ASCI/SEBI). This output does not constitute formal legal certification, official clearance, or binding legal counsel. Consult a qualified advertising attorney prior to high-budget broadcasts.
        </div>
      </div>
    </div>
  `;

  // Attach copy button
  const btnCopyClean = document.getElementById('btn-copy-clean-text');
  if (btnCopyClean) {
    btnCopyClean.addEventListener('click', () => {
      const text = document.getElementById('clean-copy-text')?.textContent.replace(/^"|"$/g, '') || '';
      navigator.clipboard.writeText(text).then(() => {
        btnCopyClean.textContent = 'Copied!';
        setTimeout(() => btnCopyClean.textContent = 'Copy Compliant Copy', 2000);
      });
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

function getItemRowClass(status) {
  if (status === 'fail') return 'border-rose-200 bg-rose-50/50';
  if (status === 'warn') return 'border-amber-200 bg-amber-50/50';
  return 'border-emerald-200 bg-emerald-50/50';
}

function getStatusIcon(status) {
  if (status === 'fail') return '<i data-lucide="x-circle" class="text-rose-600 icon-xs shrink-0"></i>';
  if (status === 'warn') return '<i data-lucide="alert-triangle" class="text-amber-500 icon-xs shrink-0"></i>';
  return '<i data-lucide="check-circle" class="text-emerald-600 icon-xs shrink-0"></i>';
}

function getStatusBadgeClass(status) {
  if (status === 'fail') return 'bg-rose-100 text-rose-800 border border-rose-300';
  if (status === 'warn') return 'bg-amber-100 text-amber-800 border border-amber-300';
  return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
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
