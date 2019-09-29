import cloneDeep from 'lodash/cloneDeep';
import getPeriodDays from './getPeriodDays';
import moment from 'moment';

export default function getChartData(data, mode, period, date) {
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
      }
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

      o[k] = o[k] || { date: k, info: { time: 0, count: 0} };
      o[k].info.time += info.time;
      o[k].info.count += info.count;

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
