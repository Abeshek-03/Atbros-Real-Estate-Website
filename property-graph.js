const prices0 = [
    3298.38, 3354.86, 3194.86, 3237.41, 3262.86, 3290.23, 3307.47, 3404.83, 3378.72, 3423.51, 3482.32, 3507.14, // 2019
    3690.00, 3645.12, 3599.84, 3718.73, 3657.47, 3735.42, 3772.83, 3792.41, 3825.60, 3903.72, 3920.68, 4004.14, // 2020
    4144.63, 4096.19, 4064.23, 4185.72, 4129.82, 4223.91, 4267.82, 4301.34, 4322.67, 4408.86, 4457.41, 4502.32, // 2021
    4651.14, 4607.83, 4575.86, 4723.92, 4675.68, 4757.19, 4802.63, 4840.34, 4884.23, 4952.72, 4998.86, 5103.42, // 2022
    5300.86, 5249.14, 5194.86, 5352.23, 5307.68, 5398.83, 5454.92, 5504.34, 5530.68, 5598.41, 5671.82, 5708.23, // 2023
    5641.18, 5727.30, 5790.00, 5844.08, 5910.41, 6002.63, 5727.30, 5790.00, 5844.08, 5844.08, 5893.02, 5955.20  // 2024
  ];

const prices1 = [
    3200.00, 3264.51, 3332.80, 3359.13, 3365.36, 3437.23, 3401.51, 3479.97, 3545.14, 3501.20, 3569.45, 3641.35, // 2012
    3717.00, 3654.89, 3730.69, 3806.60, 3752.90, 3831.42, 3912.22, 3860.54, 3938.92, 4018.94, 3967.48, 4053.31, // 2013
    4134.14, 4067.12, 4149.65, 4232.98, 4168.23, 4253.84, 4341.12, 4277.05, 4365.59, 4455.78, 4392.64, 4483.48, // 2014
    4575.91, 4505.33, 4598.43, 4692.40, 4622.03, 4717.47, 4814.72, 4744.73, 4842.67, 4941.47, 4872.25, 4972.92, // 2015
    5075.57, 5000.73, 5104.74, 5209.69, 5134.25, 5240.76, 5348.17, 5272.20, 5380.32, 5490.43, 5414.93, 5527.19, // 2016
    5641.57, 5561.12, 5676.98, 5793.72, 5713.83, 5831.11, 5950.00, 5869.69, 5989.82, 6111.78, 6031.26, 6154.05, // 2017
    6278.77, 6195.63, 6321.49, 6448.92, 6365.13, 6493.19, 6623.05, 6538.71, 6668.01, 6799.85, 6715.07, 6847.35, // 2018
    6981.77, 6894.30, 7028.99, 7165.38, 7077.39, 7213.48, 7351.62, 7262.23, 7399.84, 7539.49, 7450.60, 7590.48, // 2019
    7732.41, 7641.74, 7784.01, 7927.81, 7836.40, 7980.27, 8125.88, 8033.93, 8179.78, 8327.14, 8234.63, 8382.95, // 2020
    8532.78, 8438.63, 8588.45, 8740.22, 8645.39, 8796.59, 8950.50, 8854.97, 9007.57, 9162.74, 9066.52, 9221.77, // 2021
    9378.39, 9279.41, 9437.24, 9596.84, 9497.12, 9656.34, 9817.91, 9717.45, 9879.47, 10043.23, 9942.11, 10106.33, // 2022
    10272.93, 10169.09, 10336.78, 10506.53, 10402.09, 10571.95, 10743.89, 10638.87, 10811.00, 10985.31, 10879.73, 11054.10, // 2023
    11230.74, 11122.62, 11300.39, 11480.22, 11371.67, 11551.88, 11733.38, 11623.32, 11805.10, 11988.16, 11877.43, 12061.75, // 2024
    12247.36, 12500.00 // Final
  ];
  
  
  // Find the min and max values
var minValue = [Math.min(...prices0), Math.min(...prices1)];
var maxValue = [Math.max(...prices0), Math.max(...prices1)];

// Scale the prices to the range between 0 and 450
var price0 = prices0.map(price => {
return ((- price + minValue[0]) * (450 - 0)) / (maxValue[0] - minValue[0]);
});

var price1 = prices1.map(price => {
  return ((- price + minValue[1]) * (450 - 0)) / (maxValue[1] - minValue[1]);
  });
// Dynamically calculate chart dimensions based on container
function calculateDimensions(index) {
  const container = $('.property-graph').eq(index);
  console.log(container);
  const chartH = container.height();
  const chartW = container.width();
  return { chartH, chartW };
}

function draw(price, index) {
  const { chartH, chartW } = calculateDimensions(index);
  const paper = Snap(`#svg${index}`);
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
      'id': `myLine${index}_${i}`,
      'class': 'line',
    });
  }

  for (let i = 0; i < points.length; i+=Math.floor(points.length/15)) {
    const circle = paper.circle(breakPointsX[i], breakPointsY[i], 5);
    circle.attr({
      'fill': '#FF4864',
      'stroke': 'white',
      'stroke-width': 3,
      'id': `myCirc${index}_${i}`,
      'class': 'breakpoint',
    });
    
  }
    const circle = paper.circle(breakPointsX[prices.length-1], breakPointsY[prices.length-1], 5);
    circle.attr({
        'fill': '#FF4864',
        'stroke': 'white',
        'stroke-width': 3,
        'id': `myCirc${index}_${prices.length-1}`,
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
    'id': `yAxis${index}`,
  });
  xAxis.attr({
    'stroke': 'white',
    'stroke-width': 1,
    'stroke-dasharray': xOff,
    'stroke-dashoffset': xOff,
    'id': `xAxis${index}`,
  });

  $(`#xAxis${index}`).css({
    '-webkit-transition-delay': start,
    '-webkit-transition': 'all 200ms ease-in',
  });
  $(`#yAxis${index}`).css({
    '-webkit-transition-delay': start,
    '-webkit-transition': 'all 200ms ease-in',
  });
  $(`#xAxis${index}`).animate({ 'stroke-dashoffset': '0' });
  $(`#yAxis${index}`).animate({ 'stroke-dashoffset': '0' });

  // var yMin = Math.min(...price);
  // var yMax = Math.max(...price);
  // var interval = (yMax - yMin) / 4; // 5 ticks (0, 1, 2, 3, 4)
  var interval = (maxValue[index] - minValue[index]) / 4; // 5 ticks (0, 1, 2, 3, 4)

  for (let i = 0; i <= 4; i++) {
    const yValue = minValue[index] + i * interval;
    const yLabel = paper.text(-40, 470-i*(450/4), yValue.toFixed(2));
    yLabel.attr({
      'fill': 'white',
      'font-size': '16px',
      'text-anchor': 'middle',
    });
  }
}

function animate(price, index) {
  var transitionSpeed = 25; 
  for (let i = 0; i < price.length; i++) {
    const circ = $(`#myCirc${index}_${i}`);
    const line = $(`#myLine${index}_${i}`);
    circ.css({
      '-webkit-transition': 'all 550ms cubic-bezier(.84,0,.2,1)',
      '-webkit-transition-delay': 375 + i * transitionSpeed + 'ms',
    });
    line.css({
      '-webkit-transition': 'all 250ms cubic-bezier(.84,0,.2,1)',
      '-webkit-transition-delay': i * transitionSpeed + 'ms',
    });
    line.animate({ 'stroke-dashoffset': 0 });
    circ.css({ 'transform': 'scale(1)' });
  }
}

$('#draw0').on('click',function(){
    $('#svg0').empty();
    draw(price0, 0);
    animate(price0, 0);
  });

  $('#draw1').on('click',function(){
    $('#svg1').empty();
    draw(price1, 1);
    animate(price1, 1);
  });
