/**
 * Braco OmniPulse - State Management
 * Handles central reactive state, localStorage persistence, and demo data resets.
 */

import { MOCK_CAMPAIGNS, MOCK_CREATORS } from './mockData.js';

const STORAGE_KEY = 'braco_omnipulse_state_v1';

const defaultState = {
  activeTab: 'overview',
  campaigns: [...MOCK_CAMPAIGNS],
  selectedCreatorIds: ['c1', 'c3'], // pre-selected realistic demo creators
  userBriefs: [],
  competitive: {
    brandA: 'nike',
    brandB: 'adidas',
    activeMetricTab: 'overall'
  },
  analyticsFilter: {
    dateRange: '30d',
    campaignId: 'all',
    metricType: 'reach'
  },
  regionalFilter: {
    region: 'maharashtra',
    audience: 'tier1',
    category: 'fashion',
    platform: 'instagram',
    styleA: 'vernacular_energy',
    styleB: 'minimal_ugc'
  },
  trustPulseAudit: null
};

class StateStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultState,
          ...parsed,
          // ensure arrays are preserved
          campaigns: parsed.campaigns && parsed.campaigns.length ? parsed.campaigns : [...MOCK_CAMPAIGNS],
          selectedCreatorIds: parsed.selectedCreatorIds || ['c1', 'c3'],
          userBriefs: parsed.userBriefs || []
        };
      }
    } catch (e) {
      console.warn('Could not load stored state, initializing defaults:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state to localStorage:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  updateState(partial) {
    this.state = {
      ...this.state,
      ...partial
    };
    this.saveState();
  }

  setActiveTab(tabId) {
    this.state.activeTab = tabId;
    this.saveState();
  }

  toggleCreator(creatorId) {
    const list = new Set(this.state.selectedCreatorIds);
    if (list.has(creatorId)) {
      list.delete(creatorId);
    } else {
      list.add(creatorId);
    }
    this.state.selectedCreatorIds = Array.from(list);
    this.saveState();
  }

  clearSelectedCreators() {
    this.state.selectedCreatorIds = [];
    this.saveState();
  }

  addCampaign(campaign) {
    this.state.campaigns.unshift(campaign);
    this.saveState();
  }

  saveBrief(brief) {
    this.state.userBriefs.unshift(brief);
    // Also auto-add as a draft campaign so it integrates into Analytics and Overview
    const newCamp = {
      id: 'camp-' + Date.now(),
      name: brief.title || `${brief.brand} Campaign`,
      brand: brief.brand,
      status: 'Draft',
      statusClass: 'status-draft',
      platform: brief.platform,
      budget: '₹' + Number(brief.budget).toLocaleString('en-IN'),
      spent: '₹0',
      reach: (brief.projectedReach || '1.8M'),
      reachNum: 1800000,
      engagement: (brief.projectedEngagement || '4.8%'),
      engagementNum: 4.8,
      conversions: (brief.projectedConversions || '8,500'),
      conversionsNum: 8500,
      cpa: '₹180',
      roas: '3.8x',
      roasNum: 3.8,
      dateRange: 'Next 30 Days',
      weeklyData: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        reach: [0.3, 0.6, 0.5, 0.4],
        engagement: [4.4, 4.8, 5.0, 4.8],
        conversions: [1200, 2800, 3100, 1400]
      }
    };
    this.addCampaign(newCamp);
    this.saveState();
    return newCamp;
  }

  resetDemoData() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    localStorage.removeItem(STORAGE_KEY);
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('State listener error:', err);
      }
    }
  }
}

export const store = new StateStore();
