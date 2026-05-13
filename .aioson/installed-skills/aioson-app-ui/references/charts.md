# Charts — AIOSON App UI

> Guia para integração de bibliotecas de gráficos com o design system.
> Foco: Chart.js (mais usado em apps Laravel/Livewire), com hints para ApexCharts e ECharts.

---

## Filosofia

Charts não são tratados como componentes do DS — eles são **integrações com bibliotecas externas**. O DS provê:

1. **Paleta categórica e sequencial** via CSS vars (`--ao-chart-*`)
2. **Tokens de eixo, grid e tooltip** já tematizados nos 4 contextos
3. **Helpers de leitura** de tokens em JS

Você escolhe a biblioteca; o DS garante coerência visual.

---

## Setup

### 1. Importe a paleta no CSS

```css
@import './path/to/aioson-app-ui/assets/charts/palette.css';
```

Isso expõe variáveis como `--ao-chart-1` até `--ao-chart-8`, mais variantes alpha (`-fill`) e tokens de UI (axis, grid, tooltip).

### 2. Helper para ler tokens em JS

```js
// charts/aoTokens.js
export function aoToken(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--ao-${name}`)
    .trim();
}

export const aoChart = {
  series: [
    aoToken('chart-1'), aoToken('chart-2'), aoToken('chart-3'),
    aoToken('chart-4'), aoToken('chart-5'), aoToken('chart-6'),
    aoToken('chart-7'), aoToken('chart-8'),
  ],
  fills: [
    aoToken('chart-1-fill'), aoToken('chart-2-fill'),
    aoToken('chart-3-fill'), aoToken('chart-4-fill'),
  ],
  axis: aoToken('chart-axis'),
  grid: aoToken('chart-grid'),
  tooltipBg: aoToken('chart-tooltip-bg'),
  tooltipText: aoToken('chart-tooltip-text'),
  tooltipBorder: aoToken('chart-tooltip-border'),
  text: aoToken('text'),
  textSoft: aoToken('text-soft'),
  fontBody: aoToken('font-body'),
};
```

---

## Chart.js — preset completo

```js
import { Chart, registerables } from 'chart.js';
import { aoChart } from './aoTokens';

Chart.register(...registerables);

// Defaults globais — aplicam a TODOS os charts da página
Chart.defaults.font.family = aoChart.fontBody;
Chart.defaults.font.size = 11;
Chart.defaults.color = aoChart.textSoft;
Chart.defaults.borderColor = aoChart.grid;

// Tooltip
Chart.defaults.plugins.tooltip.backgroundColor = aoChart.tooltipBg;
Chart.defaults.plugins.tooltip.titleColor = aoChart.tooltipText;
Chart.defaults.plugins.tooltip.bodyColor = aoChart.tooltipText;
Chart.defaults.plugins.tooltip.borderColor = aoChart.tooltipBorder;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 6;
Chart.defaults.plugins.tooltip.titleFont = { weight: 600, size: 12 };
Chart.defaults.plugins.tooltip.displayColors = true;

// Legend
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 16;
```

---

## Padrões de chart

### Line chart (vendas ao longo do tempo)

```js
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Receita',
      data: [12000, 19000, 15000, 22000, 28000, 31000],
      borderColor: aoChart.series[0],
      backgroundColor: aoChart.fills[0],
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 4,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: aoChart.grid }, beginAtZero: true }
    }
  }
});
```

### Bar chart (comparação por categoria)

```js
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Vendas', 'Marketing', 'Suporte', 'TI'],
    datasets: [{
      label: 'Tickets',
      data: [42, 18, 67, 23],
      backgroundColor: [
        aoChart.series[0], aoChart.series[1],
        aoChart.series[2], aoChart.series[3],
      ],
      borderRadius: 4,
      borderSkipped: false,
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: aoChart.grid } }
    }
  }
});
```

### Donut chart (proporção)

```js
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Ativos', 'Pendentes', 'Cancelados'],
    datasets: [{
      data: [142, 38, 12],
      backgroundColor: [aoChart.series[2], aoChart.series[3], aoChart.series[6]],
      borderColor: aoToken('surface'),
      borderWidth: 2,
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});
```

### Sparkline (dentro de KPI card)

Para encaixar no slot `.ao-kpi__chart`:

```js
new Chart(ctx, {
  type: 'line',
  data: {
    labels: Array(20).fill(''),
    datasets: [{
      data: [10, 12, 11, 13, 14, 16, 15, 18, 17, 19, 20, 22, 21, 24, 26, 25, 28, 30, 29, 32],
      borderColor: aoChart.series[0],
      backgroundColor: aoChart.fills[0],
      borderWidth: 1.5,
      fill: true,
      pointRadius: 0,
      tension: 0.4,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: { line: { borderJoinStyle: 'round' } }
  }
});
```

---

## Reagindo a troca de tema

Como os tokens mudam quando `data-theme`/`data-mode` mudam, você precisa re-renderizar os charts:

```js
const observer = new MutationObserver(() => {
  // Re-ler tokens
  Object.assign(aoChart, {
    series: [aoToken('chart-1'), aoToken('chart-2'), /* ... */],
    grid: aoToken('chart-grid'),
    tooltipBg: aoToken('chart-tooltip-bg'),
    /* ... */
  });

  // Atualizar charts existentes
  Chart.instances.forEach(chart => {
    chart.options.scales.y.grid.color = aoChart.grid;
    chart.data.datasets.forEach((ds, i) => {
      ds.borderColor = aoChart.series[i % aoChart.series.length];
    });
    chart.update();
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme', 'data-mode']
});
```

Em apps Livewire, isso pode ficar num `app.js` global.

---

## Quando usar cada tipo

| Tipo | Quando |
|------|--------|
| Line | Tendências ao longo do tempo. Receita, conversões, MAU. |
| Bar | Comparação entre categorias. Vendas por canal, tickets por equipe. |
| Stacked bar | Composição que muda no tempo. Receita por produto/mês. |
| Donut/Pie | Proporções de um total. **Use no máximo 5 fatias** — mais que isso vira ilegível. |
| Area | Volume + tendência. Tráfego, custos cumulativos. |
| Sparkline | Tendência inline (dentro de KPI ou tabela). Sem eixos, sem legenda. |
| Heatmap | Densidade em duas dimensões. Use a paleta sequencial (`--ao-chart-seq-*`). |

---

## Anti-padrões

❌ **Não use 3D.** Distorce percepção e parece de 2008.
❌ **Não use mais de 5-6 séries num chart.** Vira "espaguete" ilegível. Se precisar mais, separe em múltiplos charts ou use small multiples.
❌ **Não anime infinitamente** dados estáticos. Animação na **entrada** do chart é OK; pulsando depois é distração.
❌ **Não use cores fora da paleta DS.** Quebra coerência. Se 8 não bastam, divida o gráfico ou use a paleta sequencial.
❌ **Não esconda eixos sem motivo.** Sparklines podem (são contextuais), mas chart principal precisa de escala visível.

---

## ApexCharts (alternativa)

Se preferir ApexCharts (popular no Laravel via apexcharts/apexcharts):

```js
const options = {
  chart: {
    fontFamily: aoChart.fontBody,
    foreColor: aoChart.textSoft,
    toolbar: { show: false },
  },
  colors: aoChart.series,
  grid: {
    borderColor: aoChart.grid,
  },
  tooltip: {
    theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  },
  // ...
};
```

---

## ECharts (alternativa para gráficos complexos)

Para gráficos avançados (sankey, treemap, gauge), ECharts é melhor:

```js
const baseTheme = {
  color: aoChart.series,
  textStyle: { fontFamily: aoChart.fontBody, color: aoChart.textSoft },
  backgroundColor: 'transparent',
  axisLine: { lineStyle: { color: aoChart.axis } },
  splitLine: { lineStyle: { color: aoChart.grid } },
  tooltip: {
    backgroundColor: aoChart.tooltipBg,
    borderColor: aoChart.tooltipBorder,
    textStyle: { color: aoChart.tooltipText },
  },
};
```
