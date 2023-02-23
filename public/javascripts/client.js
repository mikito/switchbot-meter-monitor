$(function () {
  const monitor = new MeterMonitor();
  monitor.activate();
});

class MeterMonitor {
  syncInterval = 30000;
  chart = null;

  activate() {
    this.initChart();
    this.sync();

    // begin polling
    setInterval(() => this.sync(), this.syncInterval);
  }

  initChart() {
    const data = {
      datasets: [
        {
          label: 'Temperature',
          fill: false,
          data: [],
          yAxisID: 'y',
          pointStyle: false
        },
        {
          label: 'Humidity',
          fill: false,
          data: [],
          yAxisID: 'y1',
          pointStyle: false
        }
      ]
    };

    const options = {
      title: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'minute'
          }
        },

        y: {
          type: 'linear',
          display: true,
          title: {
            display: false,
            // display: true,
            text: '℃',
          },
          position: 'left',
          suggestedMin: 20,
          suggestedMax: 25
        },
        y1: {
          type: 'linear',
          display: true,
          title: {
            display: false,
            // display: true,
            text: '%',
          },
          position: 'right',
          min: 0,
          max: 100,
        },
      }
    };

    this.chart = new Chart($("#chart"), {
      type: 'line',
      data: data,
      options: options
    });
  }

  sync() {
    $.ajax({
      url: '/sync',
      type: 'GET',
      contentType: 'application/json',
      success: (responseData) => {
        try {
          this.updateData(responseData)
          this.hideMessage();
        } catch (e) {
          this.showMessage("error : " + e.message);
        }
      },
      error: (jqXHR, textStatus, errorThrown) => {
        this.showMessage("sync failed. status code: " + jqXHR.status);
      }
    });
  }

  updateData(responseData) {
    if (responseData.length == 0) return;

    const latest = responseData[responseData.length - 1];
    $("#temperature").text(latest.temperature);
    $("#humidity").text(latest.humidity);

    const temperatureData = responseData.map(d => {
      return {
        x: new Date(d.datetime),
        y: d.temperature
      }
    });
    const humidityData = responseData.map(d => {
      return {
        x: new Date(d.datetime),
        y: d.humidity
      }
    });

    const chartData = this.chart.data;
    chartData.datasets[0].data = temperatureData;
    chartData.datasets[1].data = humidityData;
    this.chart.update();
  }

  showMessage(mes) {
    const message = $("#error-message");
    message.text(mes);
    message.css('visibility', 'visible');
  }

  hideMessage() {
    const message = $("#error-message");
    message.text("");
    message.css('visibility', 'hidden');
  }
}
