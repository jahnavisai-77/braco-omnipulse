/**
 * Braco OmniPulse - Chart.js Helper Wrappers
 * Manages responsive charts, cleanup on rerenders, and cohesive theme palettes.
 */

// Global registry to prevent "Canvas is already in use" errors
const chartInstances = {};

export function destroyChart(chartId) {
  if (chartInstances[chartId]) {
    chartInstances[chartId].destroy();
    delete chartInstances[chartId];
  }
}

export function destroyAllCharts() {
  Object.keys(chartInstances).forEach(id => {
    destroyChart(id);
  });
}

// Check Chart.js availability
function isChartAvailable() {
  return typeof window.Chart !== 'undefined';
}

const themeColors = {
  indigo: '#4f46e5',
  violet: '#8b5cf6',
  sky: '#0284c7',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  slateDark: '#1e293b',
  slateLight: '#94a3b8',
  gridBorder: 'rgba(226, 232, 240, 0.6)'
};

/**
 * 1. Overview Performance Line Chart
 */
export function renderOverviewPerformanceChart(canvasId, campaignList) {
  if (!isChartAvailable()) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  destroyChart(canvasId);

  // Synthesize or aggregate weekly performance
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
  const reachData = [2.4, 3.8, 5.2, 7.6, 9.8, 12.4, 15.6, 18.4]; // cumulative millions
  const convData = [12.5, 24.2, 45.0, 68.4, 89.2, 114.0, 138.5, 162.8]; // cumulative thousands

  const ctx = canvas.getContext('2d');
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(79, 70, 229, 0.28)');
  gradient1.addColorStop(1, 'rgba(79, 70, 229, 0.01)');

  chartInstances[canvasId] = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Est. Reach (Millions)',
          data: reachData,
          borderColor: themeColors.indigo,
          backgroundColor: gradient1,
          borderWidth: 2.5,
          tension: 0.35,
          fill: true,
          pointBackgroundColor: themeColors.indigo,
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6,
          yAxisID: 'y'
        },
        {
          label: 'Conversions (k)',
          data: convData,
          borderColor: themeColors.emerald,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.35,
          pointBackgroundColor: themeColors.emerald,
          pointRadius: 3,
          pointHoverRadius: 5,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          padding: 10,
          titleFont: { size: 13, weight: '600' },
          bodyFont: { size: 12 }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11, family: 'sans-serif' } }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: themeColors.gridBorder },
          ticks: {
            callback: value => value + 'M',
            font: { size: 11 }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            callback: value => value + 'k',
            font: { size: 11 }
          }
        }
      }
    }
  });

  return chartInstances[canvasId];
}

/**
 * 2. Overview Channel Split Doughnut Chart
 */
export function renderOverviewChannelChart(canvasId) {
  if (!isChartAvailable()) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  destroyChart(canvasId);

  const ctx = canvas.getContext('2d');
  chartInstances[canvasId] = new window.Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Instagram Reels', 'YouTube Dedicated', 'LinkedIn B2B', 'Meta Feed', 'WhatsApp Channels'],
      datasets: [
        {
          data: [42, 28, 14, 10, 6],
          backgroundColor: [
            '#e1306c', // IG
            '#ff0000', // YT
            '#0a66c2', // LI
            '#1877f2', // FB/Meta
            '#25d366'  // WA
          ],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 12,
            font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" }
          }
        },
        tooltip: {
          callbacks: {
            label: context => ` ${context.label}: ${context.raw}% Share`
          }
        }
      }
    }
  });

  return chartInstances[canvasId];
}

/**
 * 3. Analytics Timeline Chart (Responsive to date range & filter)
 */
export function renderAnalyticsTimelineChart(canvasId, filter, campaigns) {
  if (!isChartAvailable()) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  destroyChart(canvasId);

  let labels = ['Day 1-5', 'Day 6-10', 'Day 11-15', 'Day 16-20', 'Day 21-25', 'Day 26-30'];
  if (filter.dateRange === '7d') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  } else if (filter.dateRange === '90d') {
    labels = ['Month 1 (W1-2)', 'Month 1 (W3-4)', 'Month 2 (W1-2)', 'Month 2 (W3-4)', 'Month 3 (W1-2)', 'Month 3 (W3-4)'];
  } else if (filter.dateRange === 'ytd') {
    labels = ['Q1 Jan-Feb', 'Q1 Mar', 'Q2 Apr-May', 'Q2 Jun', 'Q3 Jul-Aug', 'Q3 Sep-Oct'];
  }

  // Multiplier depending on filter
  let multiplier = 1;
  if (filter.campaignId !== 'all') {
    multiplier = 0.55;
  }
  if (filter.dateRange === '7d') multiplier *= 0.3;
  if (filter.dateRange === '90d') multiplier *= 2.4;
  if (filter.dateRange === 'ytd') multiplier *= 3.8;

  let dataset1Label = 'Reach (k)';
  let dataset1Data = [180, 240, 310, 420, 380, 510].map(v => Math.round(v * multiplier));
  let dataset2Label = 'Engagement (k)';
  let dataset2Data = [14, 22, 28, 38, 34, 46].map(v => Math.round(v * multiplier));

  if (filter.metricType === 'clicks') {
    dataset1Label = 'Clicks';
    dataset1Data = [12400, 15800, 21300, 28900, 26400, 34100].map(v => Math.round(v * multiplier));
    dataset2Label = 'CTR (%)';
    dataset2Data = [2.8, 3.1, 3.4, 3.9, 3.6, 4.2];
  } else if (filter.metricType === 'conversions') {
    dataset1Label = 'Conversions';
    dataset1Data = [1100, 1840, 2450, 3920, 3210, 4800].map(v => Math.round(v * multiplier));
    dataset2Label = 'ROAS Multiplier';
    dataset2Data = [3.2, 3.5, 3.9, 4.3, 4.1, 4.6];
  }

  const ctx = canvas.getContext('2d');
  chartInstances[canvasId] = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: dataset1Label,
          data: dataset1Data,
          backgroundColor: 'rgba(79, 70, 229, 0.85)',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: dataset2Label,
          data: dataset2Data,
          borderColor: themeColors.emerald,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          pointBackgroundColor: themeColors.emerald,
          pointRadius: 4,
          tension: 0.3,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: { boxWidth: 10, font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 } }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: themeColors.gridBorder },
          ticks: { font: { size: 11 } }
        },
        y1: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });

  return chartInstances[canvasId];
}

/**
 * 4. Analytics Channel Efficiency Bar Chart
 */
export function renderAnalyticsChannelChart(canvasId) {
  if (!isChartAvailable()) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  destroyChart(canvasId);

  const ctx = canvas.getContext('2d');
  chartInstances[canvasId] = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Instagram Reels', 'YouTube Shorts', 'YouTube Dedicated', 'LinkedIn B2B', 'Meta Display'],
      datasets: [
        {
          label: 'Cost Per Acquisition (₹ INR)',
          data: [165, 124, 210, 340, 245],
          backgroundColor: 'rgba(239, 68, 68, 0.75)',
          borderRadius: 4
        },
        {
          label: 'ROAS Return (x)',
          data: [4.4, 4.8, 3.8, 3.1, 2.9],
          backgroundColor: 'rgba(16, 185, 129, 0.85)',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: context => {
              if (context.datasetIndex === 0) return ` CPA: ₹${context.raw}`;
              return ` ROAS: ${context.raw}x`;
            }
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: themeColors.gridBorder } }
      }
    }
  });

  return chartInstances[canvasId];
}

/**
 * 5. Regional A/B Creative Comparison Chart
 */
export function renderRegionalABChart(canvasId, styleAName, styleBName, statsA, statsB) {
  if (!isChartAvailable()) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  destroyChart(canvasId);

  const ctx = canvas.getContext('2d');
  chartInstances[canvasId] = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['3-Sec Hook Retention (%)', 'Click-Through Rate (x10)', 'Engagement Score (/100)', 'Audience Trust Index (%)'],
      datasets: [
        {
          label: styleAName,
          data: [statsA.retention, statsA.ctr * 10, statsA.engagement, statsA.trust],
          backgroundColor: 'rgba(79, 70, 229, 0.85)',
          borderRadius: 6
        },
        {
          label: styleBName,
          data: [statsB.retention, statsB.ctr * 10, statsB.engagement, statsB.trust],
          backgroundColor: 'rgba(148, 163, 184, 0.75)',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          max: 100,
          grid: { color: themeColors.gridBorder },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });

  return chartInstances[canvasId];
}

/**
 * 6. Competitive Analysis Radar / Multi-Metric Chart
 */
export function renderCompetitiveComparisonChart(canvasId, brandA, brandB, metricType = 'overall') {
  if (!isChartAvailable()) return null;
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;
  destroyChart(canvasId);

  const ctx = canvas.getContext('2d');

  if (metricType === 'overall') {
    // Radar Chart for holistic competitive comparison
    chartInstances[canvasId] = new window.Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Engagement Rate',
          'Monthly Reach Index',
          'Conversion Rate',
          'Sentiment Score',
          'Share of Voice',
          'Audience Loyalty'
        ],
        datasets: [
          {
            label: brandA.name,
            data: [
              brandA.metrics.engagementRate * 18,
              (brandA.metrics.monthlyReach / 80) * 100,
              brandA.metrics.conversionRate * 20,
              brandA.metrics.sentimentScore,
              brandA.metrics.shareOfVoice * 1.8,
              88
            ],
            fill: true,
            backgroundColor: 'rgba(79, 70, 229, 0.25)',
            borderColor: '#4f46e5',
            pointBackgroundColor: '#4f46e5',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4f46e5',
            borderWidth: 2.5
          },
          {
            label: brandB.name,
            data: [
              brandB.metrics.engagementRate * 18,
              (brandB.metrics.monthlyReach / 80) * 100,
              brandB.metrics.conversionRate * 20,
              brandB.metrics.sentimentScore,
              brandB.metrics.shareOfVoice * 1.8,
              78
            ],
            fill: true,
            backgroundColor: 'rgba(14, 165, 233, 0.25)',
            borderColor: '#0284c7',
            pointBackgroundColor: '#0284c7',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#0284c7',
            borderWidth: 2.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12, family: "'Plus Jakarta Sans', sans-serif" } } }
        },
        scales: {
          r: {
            angleLines: { color: themeColors.gridBorder },
            grid: { color: themeColors.gridBorder },
            pointLabels: { font: { size: 11, weight: '500' } },
            ticks: { display: false, max: 100 }
          }
        }
      }
    });
  } else if (metricType === 'channels') {
    // Grouped Bar for Channel Share
    chartInstances[canvasId] = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Instagram', 'YouTube', 'X (Twitter)', 'Shorts/Reels'],
        datasets: [
          {
            label: `${brandA.name} (%)`,
            data: [brandA.channels.instagram, brandA.channels.youtube, brandA.channels.x, brandA.channels.shorts],
            backgroundColor: 'rgba(79, 70, 229, 0.85)',
            borderRadius: 6
          },
          {
            label: `${brandB.name} (%)`,
            data: [brandB.channels.instagram, brandB.channels.youtube, brandB.channels.x, brandB.channels.shorts],
            backgroundColor: 'rgba(2, 132, 199, 0.85)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
          tooltip: {
            callbacks: {
              label: context => ` ${context.dataset.label}: ${context.raw}% Share`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { color: themeColors.gridBorder },
            ticks: { callback: v => v + '%' }
          }
        }
      }
    });
  } else if (metricType === 'demographics') {
    // Horizontal Grouped Bar for Age Breakdown
    chartInstances[canvasId] = new window.Chart(ctx, {
      type: 'bar',
      indexAxis: 'y',
      data: {
        labels: ['Gen-Z (18-24)', 'Young Pro (25-34)', 'Mid Career (35-44)', 'Mature (45+)'],
        datasets: [
          {
            label: `${brandA.name} Audience (%)`,
            data: [
              brandA.demographics.age18_24,
              brandA.demographics.age25_34,
              brandA.demographics.age35_44,
              brandA.demographics.age45_plus
            ],
            backgroundColor: 'rgba(79, 70, 229, 0.85)',
            borderRadius: 4
          },
          {
            label: `${brandB.name} Audience (%)`,
            data: [
              brandB.demographics.age18_24,
              brandB.demographics.age25_34,
              brandB.demographics.age35_44,
              brandB.demographics.age45_plus
            ],
            backgroundColor: 'rgba(2, 132, 199, 0.85)',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } }
        },
        scales: {
          x: {
            grid: { color: themeColors.gridBorder },
            ticks: { callback: v => v + '%' }
          },
          y: { grid: { display: false } }
        }
      }
    });
  }

  return chartInstances[canvasId];
}
