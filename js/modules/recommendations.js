/**
 * Braco OmniPulse - Recommendations Module
 * Cross-module strategic recommendation hub with priority filtering
 * and one-click deep links to all relevant modules.
 */

import { store } from '../state.js';
import { MOCK_RECOMMENDATIONS } from '../mockData.js';

export function initRecommendations(router, showToast) {
  const container = document.getElementById('recommendations-list');
  const filterPills = document.querySelectorAll('.rec-filter-pill');

  let activeFilter = 'all';

  function renderList() {
    if (!container) return;

    let filtered = MOCK_RECOMMENDATIONS;
    if (activeFilter === 'high') {
      filtered = MOCK_RECOMMENDATIONS.filter(r => r.priority === 'high');
    } else if (activeFilter === 'regional') {
      filtered = MOCK_RECOMMENDATIONS.filter(r => r.category.includes('Regional') || r.category.includes('Competitive'));
    } else if (activeFilter === 'compliance') {
      filtered = MOCK_RECOMMENDATIONS.filter(r => r.category.includes('TrustPulse') || r.category.includes('Compliance'));
    } else if (activeFilter === 'creator') {
      filtered = MOCK_RECOMMENDATIONS.filter(r => r.category.includes('Creator') || r.category.includes('Channel'));
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-500">
          <p class="text-xs">No recommendations under this filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(rec => {
      const priorityClass = rec.priority === 'high' ? 'badge-rose' : rec.priority === 'medium' ? 'badge-amber' : 'badge-emerald';
      return `
        <div class="recommendation-card p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="badge ${priorityClass} font-semibold">${rec.priorityLabel}</span>
                <span class="badge badge-slate text-2xs">${escapeHtml(rec.category)}</span>
              </div>
              <h4 class="font-bold text-base text-slate-900">${escapeHtml(rec.title)}</h4>
            </div>
            <div class="rec-metric-badge shrink-0 sm:text-right">
              <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 inline-block">
                ${escapeHtml(rec.metric)}
              </span>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed mb-3">
            ${escapeHtml(rec.description)}
          </p>

          <div class="rec-card-footer pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-2xs text-slate-400 flex items-center gap-1">
              <i data-lucide="zap" class="icon-2xs text-amber-500"></i> AI Verified Strategy
            </span>
            <button class="btn btn-outline btn-sm btn-rec-action" data-target="${rec.targetSection}">
              ${escapeHtml(rec.actionLabel)} <i data-lucide="arrow-right" class="icon-inline"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to deep-link buttons
    container.querySelectorAll('.btn-rec-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        router.navigate(target);
        if (showToast) {
          showToast(`Navigated to ${target.charAt(0).toUpperCase() + target.slice(1)} module`, 'info');
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      renderList();
    });
  });

  renderList();
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
