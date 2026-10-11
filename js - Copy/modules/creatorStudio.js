/**
 * Braco OmniPulse - Creator Campaign Studio
 * Creator discovery, filter/sort, real-time interactive selection,
 * and live budget commitment calculation.
 */

import { store } from '../state.js';
import { MOCK_CREATORS } from '../mockData.js';

export function initCreatorStudio(router, showToast) {
  const searchInput = document.getElementById('creator-search-input');
  const nicheSelect = document.getElementById('creator-niche-select');
  const tierSelect = document.getElementById('creator-tier-select');
  const sortSelect = document.getElementById('creator-sort-select');
  const budgetInput = document.getElementById('creator-budget-input');

  const btnClearSelection = document.getElementById('btn-clear-creators');
  const btnExportRoster = document.getElementById('btn-export-roster');
  const btnProceedBrief = document.getElementById('btn-roster-to-brief');

  function triggerRender() {
    renderCreatorsList(showToast);
  }

  if (searchInput) searchInput.addEventListener('input', triggerRender);
  if (nicheSelect) nicheSelect.addEventListener('change', triggerRender);
  if (tierSelect) tierSelect.addEventListener('change', triggerRender);
  if (sortSelect) sortSelect.addEventListener('change', triggerRender);
  if (budgetInput) budgetInput.addEventListener('input', () => {
    updateRosterSummary();
  });

  if (btnClearSelection) {
    btnClearSelection.addEventListener('click', () => {
      store.clearSelectedCreators();
      renderCreatorsList(showToast);
      showToast('Cleared selected creators', 'info');
    });
  }

  if (btnExportRoster) {
    btnExportRoster.addEventListener('click', () => {
      exportCreatorRoster(showToast);
    });
  }

  if (btnProceedBrief) {
    btnProceedBrief.addEventListener('click', () => {
      router.navigate('brief');
    });
  }

  // Subscribe to state changes
  store.subscribe(() => {
    if (store.getState().activeTab === 'creators') {
      updateRosterSummary();
    }
  });

  renderCreatorsList(showToast);
  updateRosterSummary();
}

export function renderCreatorsList(showToast) {
  const container = document.getElementById('creators-grid');
  if (!container) return;

  const searchTerm = (document.getElementById('creator-search-input')?.value || '').toLowerCase().trim();
  const niche = document.getElementById('creator-niche-select')?.value || 'all';
  const tier = document.getElementById('creator-tier-select')?.value || 'all';
  const sortBy = document.getElementById('creator-sort-select')?.value || 'fit';

  const state = store.getState();
  const selectedSet = new Set(state.selectedCreatorIds);

  let filtered = MOCK_CREATORS.filter(c => {
    const matchesSearch = !searchTerm ||
      c.name.toLowerCase().includes(searchTerm) ||
      c.handle.toLowerCase().includes(searchTerm) ||
      c.niche.toLowerCase().includes(searchTerm);

    const matchesNiche = niche === 'all' || c.niche.toLowerCase().includes(niche.toLowerCase());
    const matchesTier = tier === 'all' || c.tierCategory === tier;

    return matchesSearch && matchesNiche && matchesTier;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'fit') return b.fitScore - a.fitScore;
    if (sortBy === 'followers') return b.followerCount - a.followerCount;
    if (sortBy === 'cost_asc') return a.costPerDeliverable - b.costPerDeliverable;
    if (sortBy === 'cost_desc') return b.costPerDeliverable - a.costPerDeliverable;
    if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
    return 0;
  });

  const countBadge = document.getElementById('creator-count-badge');
  if (countBadge) countBadge.textContent = `${filtered.length} Creators Found`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500">
        <i data-lucide="users" class="mx-auto w-10 h-10 text-slate-400 mb-2"></i>
        <h5 class="text-sm font-semibold text-slate-700">No creators found</h5>
        <p class="text-xs text-slate-500 mt-1">Try clearing your filters or search keywords.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    updateRosterSummary();
    return;
  }

  container.innerHTML = filtered.map(c => {
    const isSelected = selectedSet.has(c.id);
    return `
      <div class="creator-card ${isSelected ? 'selected' : ''}" data-creator-id="${c.id}">
        <div class="creator-card-header flex items-start justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="creator-avatar" style="background-color: ${c.avatarColor};">
              ${c.avatar}
            </div>
            <div>
              <div class="flex items-center gap-1">
                <span class="creator-name font-bold text-sm text-slate-900">${escapeHtml(c.name)}</span>
                ${c.verified ? '<i data-lucide="check-circle-2" class="text-indigo-600 icon-2xs"></i>' : ''}
              </div>
              <span class="creator-handle text-2xs text-slate-500">${escapeHtml(c.handle)}</span>
            </div>
          </div>
          <div class="creator-header-right text-right">
            <span class="badge ${getTierBadgeClass(c.tierCategory)} text-2xs">${c.tier}</span>
            <div class="text-2xs text-slate-400 mt-0.5 capitalize flex items-center justify-end gap-1">
              ${getPlatformIcon(c.platform)} ${c.platform}
            </div>
          </div>
        </div>

        <div class="creator-metrics-row grid grid-cols-3 gap-1.5 my-3 py-2 bg-slate-50 rounded border border-slate-100 text-center">
          <div>
            <span class="text-2xs text-slate-500 block">Followers</span>
            <span class="font-bold text-xs text-slate-800">${c.followers}</span>
          </div>
          <div>
            <span class="text-2xs text-slate-500 block">Engagement</span>
            <span class="font-bold text-xs text-indigo-600">${c.engagementRate}%</span>
          </div>
          <div>
            <span class="text-2xs text-slate-500 block">Rate / Deliv.</span>
            <span class="font-bold text-xs text-emerald-600">₹${(c.costPerDeliverable / 1000).toFixed(0)}k</span>
          </div>
        </div>

        <div class="creator-fit-reason mb-3">
          <div class="flex items-center justify-between text-2xs mb-1">
            <span class="text-indigo-700 font-semibold flex items-center gap-1">
              <i data-lucide="sparkles" class="icon-2xs"></i> OmniPulse Fit Match
            </span>
            <span class="font-bold text-indigo-700">${c.fitScore}%</span>
          </div>
          <p class="text-2xs text-slate-600 line-clamp-2">${escapeHtml(c.recommendationReason)}</p>
        </div>

        <div class="creator-action-footer pt-2 border-t border-slate-100 flex items-center justify-between">
          <span class="text-2xs text-slate-400">Auth: ${c.authenticityScore}%</span>
          <button class="btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'} btn-toggle-creator" data-id="${c.id}">
            ${isSelected ? '<i data-lucide="check" class="icon-inline"></i> Selected' : '<i data-lucide="plus" class="icon-inline"></i> Select Creator'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach click listeners to cards & toggle buttons
  container.querySelectorAll('.btn-toggle-creator').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const creatorId = btn.dataset.id;
      store.toggleCreator(creatorId);
      renderCreatorsList(showToast);
      const isNowSelected = store.getState().selectedCreatorIds.includes(creatorId);
      if (showToast) {
        showToast(isNowSelected ? 'Added creator to campaign roster' : 'Removed creator from roster', 'info');
      }
    });
  });

  if (window.lucide) window.lucide.createIcons();
  updateRosterSummary();
}

function updateRosterSummary() {
  const state = store.getState();
  const selectedIds = state.selectedCreatorIds || [];
  const selectedCreators = MOCK_CREATORS.filter(c => selectedIds.includes(c.id));

  const totalCommitted = selectedCreators.reduce((acc, c) => acc + c.costPerDeliverable, 0);
  const totalReach = selectedCreators.reduce((acc, c) => acc + c.followerCount, 0);
  const avgEngagement = selectedCreators.length ?
    (selectedCreators.reduce((acc, c) => acc + c.engagementRate, 0) / selectedCreators.length).toFixed(1) : 0;

  const totalBudgetAvailable = parseFloat(document.getElementById('creator-budget-input')?.value) || 600000;
  const pctUsed = Math.min(100, Math.round((totalCommitted / totalBudgetAvailable) * 100));

  // Update DOM elements
  const elCount = document.getElementById('roster-selected-count');
  const elBudgetUsed = document.getElementById('roster-budget-used');
  const elBudgetTotal = document.getElementById('roster-budget-total');
  const elReach = document.getElementById('roster-est-reach');
  const elEng = document.getElementById('roster-avg-engagement');
  const elBar = document.getElementById('roster-budget-progress-bar');
  const rosterDrawer = document.getElementById('creator-roster-drawer');

  if (elCount) elCount.textContent = `${selectedCreators.length} Selected`;
  if (elBudgetUsed) elBudgetUsed.textContent = '₹' + totalCommitted.toLocaleString('en-IN');
  if (elBudgetTotal) elBudgetTotal.textContent = '₹' + totalBudgetAvailable.toLocaleString('en-IN');
  if (elReach) elReach.textContent = (totalReach / 1000000).toFixed(2) + 'M';
  if (elEng) elEng.textContent = avgEngagement + '%';
  if (elBar) {
    elBar.style.width = pctUsed + '%';
    if (pctUsed > 90) {
      elBar.className = 'progress-fill bg-rose-500';
    } else {
      elBar.className = 'progress-fill bg-indigo-600';
    }
  }

  if (rosterDrawer) {
    rosterDrawer.classList.toggle('active', selectedCreators.length > 0);
  }
}

function exportCreatorRoster(showToast) {
  const state = store.getState();
  const selectedCreators = MOCK_CREATORS.filter(c => state.selectedCreatorIds.includes(c.id));

  if (selectedCreators.length === 0) {
    if (showToast) showToast('Please select at least one creator to export roster', 'warning');
    return;
  }

  let csv = 'Creator Name,Handle,Platform,Tier,Niche,Followers,Engagement Rate,Commercial Rate (INR),Fit Score\n';
  selectedCreators.forEach(c => {
    csv += `"${c.name}","${c.handle}","${c.platform}","${c.tier}","${c.niche}","${c.followers}","${c.engagementRate}%","₹${c.costPerDeliverable}","${c.fitScore}%"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `OmniPulse_Creator_Roster_${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);

  if (showToast) showToast('Creator Roster exported as CSV!', 'success');
}

function getTierBadgeClass(tier) {
  if (tier === 'nano') return 'badge-amber';
  if (tier === 'micro') return 'badge-emerald';
  if (tier === 'mid') return 'badge-indigo';
  return 'badge-violet';
}

function getPlatformIcon(platform) {
  if (platform === 'youtube') return '<i data-lucide="youtube" class="icon-2xs text-red-600"></i>';
  if (platform === 'linkedin') return '<i data-lucide="linkedin" class="icon-2xs text-blue-600"></i>';
  return '<i data-lucide="instagram" class="icon-2xs text-pink-600"></i>';
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
