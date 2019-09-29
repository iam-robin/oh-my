import cloneDeep from 'lodash/cloneDeep';
import getPeriodDays from './getPeriodDays';
import moment from 'moment';

export default function getChartData(data, mode, period, date, limit) {
  let dominantColor;
  for (let i = 0; i < data.length; i++) {
    dominantColor = data[i].info.dominant_color.hex;
  }

  let chartData = {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: mode,
          data: [],
          backgroundColor: dominantColor,
          hoverBackgroundColor: dominantColor,
          borderColor: 'transparent',
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      lineTension: 1,
      tooltips: {
        backgroundColor: '#fff',
        borderWidth: 3,
        titleFontColor: '#000',
        bodyFontColor: '#000',
        borderColor: '#000',
        caretPadding: 4,
        cornerRadius: 0,
        displayColors: false,
        callbacks: {
          label: function(tooltipItems, data) {
            if (mode === 'time') {
              return parseInt(tooltipItems.yLabel) + 'min';
            } else if (mode === 'views') {
              return parseInt(tooltipItems.yLabel) + ' views';
            } else if (mode === 'clicks') {
              return parseInt(tooltipItems.yLabel) + ' clicks';
            } else if (mode === 'scroll') {
              return parseInt(tooltipItems.yLabel) + ' px';
            }
          },
        },
      },
      layout: {
        padding: {
          top: 16,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 12,
            },
            gridLines: {
              color: '#EDEFF3',
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              padding: 4,
            },
            gridLines: {
              color: 'transparent',
            },
            categoryPercentage: 0.9,
            barPercentage: 0.5,
          },
        ],
      },
      legend: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: getLimit(mode, limit, period),
            borderColor: '#000',
            borderWidth: 2,
            label: {
              backgroundColor: '#fff',
              fontColor: '#000',
              fontFamily: 'monospace',
              content: getLimitDesc(mode, limit),
              cornerRadius: 0,
              enabled: true,
              yAdjust: -14,
              position: 'right',
            },
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: getUpperPadding(mode, limit, period),
            borderColor: 'transparent',
            borderWidth: 0,
          },
        ],
      },
    },
  };

  let selectedDay = moment(date);

  // WEEK AND MONTH
  if (period === 'week' || period === 'month') {
    let days;

    if (period === 'week') {
      days = getPeriodDays(selectedDay, 'week');
    } else if (period === 'month') {
      days = getPeriodDays(selectedDay, 'month');
    }

    // set x-Axis label
    days.forEach(day => {
      // set x-Axis label
      let hasData = false;
      let formatedDay;

      if (period === 'day' || period === 'week') {
        formatedDay = moment(day).format('dd. DD.MMM');
      } else if (period === 'month') {
        formatedDay = moment(day).format('dd. DD.');
      }

      day = moment(day).format('YYYY-MM-DD');
      chartData.data.labels.push(formatedDay);

      for (let i = 0; i < data.length; i++) {
        if (data[i].date === day) {
          if (mode === 'time') {
            chartData.data.datasets[0].data.push(data[i].info.time / 60000);
          } else if (mode === 'views') {
            chartData.data.datasets[0].data.push(data[i].info.count);
          } else if (mode === 'clicks') {
            chartData.data.datasets[0].data.push(data[i].info.clicks);
          } else if (mode === 'scroll') {
            chartData.data.datasets[0].data.push(data[i].info.scroll);
          }
          hasData = true;
        }
      }

      if (!hasData) {
        chartData.data.datasets[0].data.push(0);
      }
    });

    return chartData;
  } else if (period === 'year') {
    let date = selectedDay;

    let monthsData = data.reduce((o, { date, info }) => {
      let k = date.slice(0, 7);

      o[k] = o[k] || { date: k, info: { time: 0, count: 0, clicks: 0, scroll: 0 } };
      o[k].info.time += info.time;
      o[k].info.count += info.count;
      o[k].info.clicks += info.clicks;
      o[k].info.scroll += info.scroll;

      return o;
    }, {});

    let startOfPeriod = cloneDeep(date).startOf('year');
    let month = startOfPeriod;

    // iterate through year
    for (let i = 0; i < 12; i++) {
      let formatedMonth = month.format('YYYY-MM');
      let hasData = false;

      // x axis label
      chartData.data.labels.push(month.format('MMM.'));

      // get data
      for (const key of Object.keys(monthsData)) {
        if (formatedMonth === key) {
          if (mode === 'time') {
            chartData.data.datasets[0].data.push(monthsData[key].info.time / 60000);
          } else if (mode === 'views') {
            chartData.data.datasets[0].data.push(monthsData[key].info.count);
          } else if (mode === 'clicks') {
            chartData.data.datasets[0].data.push(monthsData[key].info.clicks);
          } else if (mode === 'scroll') {
            chartData.data.datasets[0].data.push(monthsData[key].info.scroll);
          }
          hasData = true;
        }
      }
      if (!hasData) {
        chartData.data.datasets[0].data.push(0);
      }
      month = month.add(1, 'months');
    }
  }

  return chartData;
}

function getLimit(mode, limit, period) {
  // LIMIT
  if (mode === 'time' && limit.timeLimit && period !== 'year') {
    return limit.timeLimit;
  } else if (mode === 'views' && limit.viewsLimit && period !== 'year') {
    return limit.viewsLimit;
  }
}

function getUpperPadding(mode, limit, period) {
  // LIMIT
  let padding = 5;
  if (mode === 'time' && limit.timeLimit && period !== 'year') {
    let helperValue = parseInt(limit.timeLimit) + padding;
    return helperValue;
  } else if (mode === 'views' && limit.viewsLimit && period !== 'year') {
    let helperValue = parseInt(limit.viewsLimit) + padding;
    return helperValue;
  }
}

function getLimitDesc(mode, limit) {
  // LIMIT
  if (mode === 'time') {
    return 'limit: ' + limit.timeLimit + 'min';
  } else if (mode === 'views') {
    return 'limit: ' + limit.viewsLimit + ' views';
  }
}
