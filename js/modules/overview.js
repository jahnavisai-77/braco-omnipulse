/**
 * Braco OmniPulse - Overview Module
 */

import { store } from '../state.js';
import { renderOverviewPerformanceChart, renderOverviewChannelChart } from '../charts.js';

export function initOverview(router) {
  const container = document.getElementById('section-overview');
  if (!container) return;

  renderOverview(router);

  // Re-render when state changes
  store.subscribe(() => {
    if (store.getState().activeTab === 'overview') {
      renderOverview(router);
    }
  });
}

export function renderOverview(router) {
  const state = store.getState();
  const campaigns = state.campaigns;

  // Compute live aggregates
  const activeCount = campaigns.filter(c => c.status === 'Live' || c.status === 'Optimizing').length;
  const totalReachNum = campaigns.reduce((acc, c) => acc + (c.reachNum || 0), 0);
  const totalReachDisplay = (totalReachNum / 1000000).toFixed(1) + 'M';
  const avgEngagement = (campaigns.reduce((acc, c) => acc + (c.engagementNum || 0), 0) / (campaigns.length || 1)).toFixed(2) + '%';
  const totalConversions = campaigns.reduce((acc, c) => acc + (c.conversionsNum || 0), 0).toLocaleString('en-IN');

  // Update KPI Elements
  const kpiActive = document.getElementById('kpi-active-campaigns');
  if (kpiActive) kpiActive.textContent = activeCount;

  const kpiReach = document.getElementById('kpi-total-reach');
  if (kpiReach) kpiReach.textContent = totalReachDisplay;

  const kpiEng = document.getElementById('kpi-avg-engagement');
  if (kpiEng) kpiEng.textContent = avgEngagement;

  const kpiConv = document.getElementById('kpi-total-conversions');
  if (kpiConv) kpiConv.textContent = totalConversions;

  // Render recent campaigns list
  const recentTableBody = document.getElementById('recent-campaigns-tbody');
  if (recentTableBody) {
    if (campaigns.length === 0) {
      recentTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state-cell">
            <div class="empty-state">
              <i data-lucide="folder-search" class="empty-icon"></i>
              <p>No active campaigns yet. Create your first campaign brief!</p>
              <button class="btn btn-primary btn-sm mt-2" onclick="window.omniRouter.navigate('brief')">Create AI Brief</button>
            </div>
          </td>
        </tr>`;
    } else {
      recentTableBody.innerHTML = campaigns.slice(0, 5).map(camp => `
        <tr class="table-row-hover">
          <td>
            <div class="campaign-cell-meta">
              <span class="campaign-name font-semibold text-slate-800">${escapeHtml(camp.name)}</span>
              <span class="campaign-brand text-xs text-slate-500">${escapeHtml(camp.brand)}</span>
            </div>
          </td>
          <td>
            <span class="status-pill ${camp.statusClass || 'status-live'}">${escapeHtml(camp.status)}</span>
          </td>
          <td>
            <span class="text-sm font-medium text-slate-700">${escapeHtml(camp.platform)}</span>
          </td>
          <td>
            <div class="spend-cell">
              <span class="text-sm font-semibold text-slate-800">${escapeHtml(camp.budget)}</span>
              <span class="text-xs text-slate-500">Spent: ${escapeHtml(camp.spent)}</span>
            </div>
          </td>
          <td>
            <div class="metric-cell">
              <span class="text-sm font-semibold text-indigo-600">${escapeHtml(camp.reach)}</span>
              <span class="text-xs text-slate-500">${escapeHtml(camp.engagement)} eng.</span>
            </div>
          </td>
          <td class="text-right">
            <button class="btn btn-ghost btn-sm" onclick="window.omniRouter.navigateWithFilter('analytics', '${camp.id}')">
              Analytics <i data-lucide="arrow-up-right" class="icon-inline"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render Charts
  setTimeout(() => {
    renderOverviewPerformanceChart('chart-overview-performance', campaigns);
    renderOverviewChannelChart('chart-overview-channels');
    if (window.lucide) window.lucide.createIcons();
  }, 50);
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
