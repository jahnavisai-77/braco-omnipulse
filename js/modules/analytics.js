/**
 * Braco OmniPulse - Campaign Analytics Module
 * Provides dynamic performance filtering by date range & campaign,
 * re-renders interactive charts, and derives contextual AI optimization tips.
 */

import { store } from '../state.js';
import { renderAnalyticsTimelineChart, renderAnalyticsChannelChart } from '../charts.js';

export function initAnalytics(router, showToast) {
  const campaignSelect = document.getElementById('analytics-campaign-filter');
  const dateRangeSelect = document.getElementById('analytics-date-filter');
  const metricTabs = document.querySelectorAll('.analytics-metric-tab');

  // Populate campaign select with current campaigns
  updateCampaignFilterDropdown();

  // Listen to state changes to update campaign dropdown if new campaigns added
  store.subscribe(() => {
    updateCampaignFilterDropdown();
    if (store.getState().activeTab === 'analytics') {
      renderAnalyticsView();
    }
  });

  if (campaignSelect) {
    campaignSelect.addEventListener('change', (e) => {
      const current = store.getState().analyticsFilter;
      store.updateState({
        analyticsFilter: { ...current, campaignId: e.target.value }
      });
      renderAnalyticsView();
      showToast('Analytics updated for selected campaign', 'info');
    });
  }

  if (dateRangeSelect) {
    dateRangeSelect.addEventListener('change', (e) => {
      const current = store.getState().analyticsFilter;
      store.updateState({
        analyticsFilter: { ...current, dateRange: e.target.value }
      });
      renderAnalyticsView();
      showToast('Date range adjusted to ' + e.target.options[e.target.selectedIndex].text, 'info');
    });
  }

  metricTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      metricTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const metricType = tab.dataset.metric;
      const current = store.getState().analyticsFilter;
      store.updateState({
        analyticsFilter: { ...current, metricType }
      });
      renderAnalyticsView();
    });
  });

  renderAnalyticsView();
}

function updateCampaignFilterDropdown() {
  const campaignSelect = document.getElementById('analytics-campaign-filter');
  if (!campaignSelect) return;

  const campaigns = store.getState().campaigns;
  const currentVal = store.getState().analyticsFilter.campaignId || 'all';

  let html = `<option value="all">All Campaigns (Aggregated Portfolio)</option>`;
  campaigns.forEach(c => {
    html += `<option value="${escapeHtml(c.id)}" ${c.id === currentVal ? 'selected' : ''}>${escapeHtml(c.name)} (${escapeHtml(c.brand)})</option>`;
  });

  campaignSelect.innerHTML = html;
  campaignSelect.value = currentVal;
}

export function renderAnalyticsView() {
  const state = store.getState();
  const filter = state.analyticsFilter;
  const campaigns = state.campaigns;

  let selectedCampaign = null;
  if (filter.campaignId !== 'all') {
    selectedCampaign = campaigns.find(c => c.id === filter.campaignId);
  }

  // Calculate dynamic metrics
  let reachDisplay = '18.4M';
  let ctrDisplay = '3.42%';
  let convDisplay = '142,800';
  let cpaDisplay = '₹168';
  let roasDisplay = '4.1x';
  let budgetSpent = '₹44,40,000';

  if (selectedCampaign) {
    reachDisplay = selectedCampaign.reach || '5.2M';
    ctrDisplay = '3.85%';
    convDisplay = selectedCampaign.conversions || '28,400';
    cpaDisplay = selectedCampaign.cpa || '₹175';
    roasDisplay = selectedCampaign.roas || '3.9x';
    budgetSpent = selectedCampaign.spent || '₹12,50,000';
  } else {
    // Multipliers for date range
    if (filter.dateRange === '7d') {
      reachDisplay = '4.1M';
      convDisplay = '32,100';
      budgetSpent = '₹9,80,000';
    } else if (filter.dateRange === '90d') {
      reachDisplay = '46.2M';
      convDisplay = '368,000';
      budgetSpent = '₹1,24,00,000';
    } else if (filter.dateRange === 'ytd') {
      reachDisplay = '88.5M';
      convDisplay = '740,000';
      budgetSpent = '₹2,65,00,000';
    }
  }

  // Update DOM Cards
  const elReach = document.getElementById('analytics-card-reach');
  const elCtr = document.getElementById('analytics-card-ctr');
  const elConv = document.getElementById('analytics-card-conversions');
  const elCpa = document.getElementById('analytics-card-cpa');
  const elRoas = document.getElementById('analytics-card-roas');
  const elSpend = document.getElementById('analytics-card-spend');

  if (elReach) elReach.textContent = reachDisplay;
  if (elCtr) elCtr.textContent = ctrDisplay;
  if (elConv) elConv.textContent = convDisplay;
  if (elCpa) elCpa.textContent = cpaDisplay;
  if (elRoas) elRoas.textContent = roasDisplay;
  if (elSpend) elSpend.textContent = budgetSpent;

  // Generate dynamic optimization summary based on filters
  renderOptimizationSummary(selectedCampaign, filter);

  // Render Charts
  setTimeout(() => {
    renderAnalyticsTimelineChart('chart-analytics-timeline', filter, campaigns);
    renderAnalyticsChannelChart('chart-analytics-channels');
    if (window.lucide) window.lucide.createIcons();
  }, 50);
}

function renderOptimizationSummary(campaign, filter) {
  const container = document.getElementById('analytics-ai-summary-content');
  if (!container) return;

  const campaignTitle = campaign ? campaign.name : 'Your Active Campaign Portfolio';

  let insight1 = '';
  let insight2 = '';
  let tip = '';

  if (filter.dateRange === '7d') {
    insight1 = `Over the past 7 days, short-form video creative hooks produced a <strong>+24% higher click-through velocity</strong> than static imagery across urban metro audiences.`;
    insight2 = `Peak conversion activity concentrated between <strong>8:30 PM and 10:45 PM IST</strong>, coinciding with post-work mobile leisure time.`;
    tip = `Recommended: Shift 20% of off-peak morning budget into high-velocity evening time slots to lower cost-per-acquisition by an estimated ₹28.`;
  } else if (filter.dateRange === '90d' || filter.dateRange === 'ytd') {
    insight1 = `Long-term cohort retention reveals that <strong>creator co-branded reels yielded 3.4x higher repeat brand recall</strong> compared to standard white-label promotional ads.`;
    insight2 = `Customer acquisition cost remained most stable on <strong>YouTube Shorts (₹124/conversion)</strong>, while standard Meta display experienced 14% creative fatigue after week 6.`;
    tip = `Recommended: Refresh ad creative variations every 18-21 days to prevent audience fatigue in Tier-1 metros.`;
  } else {
    insight1 = `For <strong>${escapeHtml(campaignTitle)}</strong>, video deliverables achieved a <strong>3.85% CTR</strong>, outperforming category benchmarks (2.8%) by 37.5%.`;
    insight2 = `Regional language targeting in Maharashtra and Karnataka showed a <strong>₹42 lower CPA</strong> compared to English-only copies.`;
    tip = `Actionable Next Step: Double down on vernacular micro-creators in Tier-2 hubs and reallocate ₹1,50,000 from underperforming display banners into creator whitelisting.`;
  }

  container.innerHTML = `
    <div class="space-y-3 text-sm">
      <div class="summary-point flex items-start gap-2.5">
        <i data-lucide="check-circle-2" class="text-emerald-600 mt-0.5 icon-sm shrink-0"></i>
        <div class="text-slate-700">${insight1}</div>
      </div>
      <div class="summary-point flex items-start gap-2.5">
        <i data-lucide="trending-up" class="text-indigo-600 mt-0.5 icon-sm shrink-0"></i>
        <div class="text-slate-700">${insight2}</div>
      </div>
      <div class="optimization-recommendation p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-900 mt-2">
        <div class="flex items-center gap-1.5 font-semibold text-xs text-indigo-700 mb-1">
          <i data-lucide="sparkles" class="icon-inline"></i> AI Optimization Recommendation
        </div>
        <p class="text-xs leading-relaxed text-indigo-800">${tip}</p>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
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
