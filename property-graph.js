const prices = [
    3298.38, 3354.86, 3194.86, 3237.41, 3262.86, 3290.23, 3307.47, 3404.83, 3378.72, 3423.51, 3482.32, 3507.14, // 2019
    3690.00, 3645.12, 3599.84, 3718.73, 3657.47, 3735.42, 3772.83, 3792.41, 3825.60, 3903.72, 3920.68, 4004.14, // 2020
    4144.63, 4096.19, 4064.23, 4185.72, 4129.82, 4223.91, 4267.82, 4301.34, 4322.67, 4408.86, 4457.41, 4502.32, // 2021
    4651.14, 4607.83, 4575.86, 4723.92, 4675.68, 4757.19, 4802.63, 4840.34, 4884.23, 4952.72, 4998.86, 5103.42, // 2022
    5300.86, 5249.14, 5194.86, 5352.23, 5307.68, 5398.83, 5454.92, 5504.34, 5530.68, 5598.41, 5671.82, 5708.23, // 2023
    5905.14, 5857.83, 5802.23, 5965.72, 5910.41, 6002.63, 6067.88, 6123.92, 6174.86, 6238.32, 6303.68, 6405.14  // 2024
  ];
  
  // Find the min and max values
var minValue = Math.min(...prices);
var maxValue = Math.max(...prices);

// Scale the prices to the range between 0 and 450
var price = prices.map(price => {
return ((- price + minValue) * (450 - 0)) / (maxValue - minValue);
});
// Dynamically calculate chart dimensions based on container
function calculateDimensions() {
  const container = $('.property-graph');
  const chartH = container.height();
  const chartW = container.width();
  return { chartH, chartW };
}

function draw(price) {
  const { chartH, chartW } = calculateDimensions();
  const paper = Snap('#svg');
  var prices = price.map((p) => p + chartH);

  function step(i, chartW) {
    return (chartW / prices.length) * i;
  }

  var points = [];
  var breakPointsX = [];
  var breakPointsY = [];
  var point = {};

  for (let i = 1; i < prices.length; i++) {
    var currStep = step(i, chartW);
    var y = prices[i];
    point.x = Math.floor(currStep);
    point.y = y;

    var prev = i - 1;
    var prevStep = step(prev, chartW);
    var prevY = prices[prev];
    point.prevX = Math.floor(prevStep);
    point.prevY = prevY;

    if (point.prevX === 0 || point.prevY === 0) {
      point.prevX = 15;
      point.prevY = chartH - 15;
    }

    points[i] = `M${point.prevX},${point.prevY} L${point.x},${point.y}`;

    breakPointsX[i] = point.x;
    breakPointsY[i] = point.y;
  }

  for (let i = 0; i < points.length; i++) {
    const myPath = paper.path(points[i]);
    const len = myPath.getTotalLength();
    myPath.attr({
      'stroke-dasharray': len,
      'stroke-dashoffset': len,
      'stroke': 'white',
      'stroke-linecap': 'round',
      'stroke-width': 4,
      'stroke-linejoin': 'round',
      'id': `myLine${i}`,
      'class': 'line',
    });
  }

  for (let i = 0; i < points.length; i+=5) {
    const circle = paper.circle(breakPointsX[i], breakPointsY[i], 5);
    circle.attr({
      'fill': '#FF4864',
      'stroke': 'white',
      'stroke-width': 3,
      'id': `myCirc${i}`,
      'class': 'breakpoint',
    });
    
  }
    const circle = paper.circle(breakPointsX[prices.length-1], breakPointsY[prices.length-1], 5);
    circle.attr({
        'fill': '#FF4864',
        'stroke': 'white',
        'stroke-width': 3,
        'id': `myCirc${prices.length-1}`,
        'class': 'breakpoint',
    });

  const xAxis = paper.path(`M0,${chartH}L${chartW},${chartH}`);
  const yAxis = paper.path(`M0,${chartH}L0,0`);

  const xOff = xAxis.getTotalLength();
  const yOff = yAxis.getTotalLength();
  const start = prices.length * 250 + 'ms';

  yAxis.attr({
    'stroke': 'white',
    'stroke-width': 1,
    'stroke-dasharray': yOff,
    'stroke-dashoffset': yOff,
    'id': 'yAxis',
  });
  xAxis.attr({
    'stroke': 'white',
    'stroke-width': 1,
    'stroke-dasharray': xOff,
    'stroke-dashoffset': xOff,
    'id': 'xAxis',
  });

  $('#yAxis').css({
    '-webkit-transition-delay': start,
    '-webkit-transition': 'all 200ms ease-in',
  });
  $('#xAxis').css({
    '-webkit-transition-delay': start,
    '-webkit-transition': 'all 200ms ease-in',
  });
  $('#xAxis').animate({ 'stroke-dashoffset': '0' });
  $('#yAxis').animate({ 'stroke-dashoffset': '0' });

  var yMin = Math.min(...price);
  var yMax = Math.max(...price);
  var interval = (yMax - yMin) / 4; // 5 ticks (0, 1, 2, 3, 4)

  for (let i = 0; i <= 4; i++) {
    const yValue = yMin + i * interval;
    const yLabel = paper.text(-40, i*interval+35, (minValue - yValue*(maxValue-minValue)/450).toFixed(2));
    yLabel.attr({
      'fill': 'white',
      'font-size': '16px',
      'text-anchor': 'middle',
    });
  }
}

function animate() {
  for (let i = 0; i < price.length; i++) {
    const circ = $(`#myCirc${i}`);
    const line = $(`#myLine${i}`);
    circ.css({
      '-webkit-transition': 'all 550ms cubic-bezier(.84,0,.2,1)',
      '-webkit-transition-delay': 375 + i * 125 + 'ms',
    });
    line.css({
      '-webkit-transition': 'all 250ms cubic-bezier(.84,0,.2,1)',
      '-webkit-transition-delay': i * 125 + 'ms',
    });
    line.animate({ 'stroke-dashoffset': 0 });
    circ.css({ 'transform': 'scale(1)' });
  }
}

$('#draw').on('click',function(){
    $('#svg').empty();
    draw(price);
    animate();
  });
