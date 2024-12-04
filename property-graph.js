const prices0 = [
    3298.38, 3354.86, 3194.86, 3237.41, 3262.86, 3290.23, 3307.47, 3404.83, 3378.72, 3423.51, 3482.32, 3507.14, // 2019
    3690.00, 3645.12, 3599.84, 3718.73, 3657.47, 3735.42, 3772.83, 3792.41, 3825.60, 3903.72, 3920.68, 4004.14, // 2020
    4144.63, 4096.19, 4064.23, 4185.72, 4129.82, 4223.91, 4267.82, 4301.34, 4322.67, 4408.86, 4457.41, 4502.32, // 2021
    4651.14, 4607.83, 4575.86, 4723.92, 4675.68, 4757.19, 4802.63, 4840.34, 4884.23, 4952.72, 4998.86, 5103.42, // 2022
    5300.86, 5249.14, 5194.86, 5352.23, 5307.68, 5398.83, 5454.92, 5504.34, 5530.68, 5598.41, 5671.82, 5708.23, // 2023
    5641.18, 5727.30, 5790.00, 5844.08, 5910.41, 6002.63, 5727.30, 5790.00, 5844.08, 5844.08, 5893.02, 5955.20  // 2024
  ];

  const prices1 = [
    3200.00, 3264.12, 3302.45, 3341.23, 3365.89, 3412.56, 3387.34, 3456.12, 3502.78, 3478.45, 3523.67, 3589.34, // 2012
    3642.89, 3598.67, 3678.45, 3734.12, 3695.23, 3762.89, 3834.56, 3790.12, 3867.45, 3923.78, 3882.34, 3956.67, // 2013
    4023.45, 3987.12, 4056.78, 4112.34, 4068.90, 4137.56, 4209.23, 4165.67, 4236.89, 4298.45, 4252.12, 4326.78, // 2014
    4392.45, 4348.90, 4417.56, 4482.23, 4438.67, 4507.34, 4578.90, 4534.12, 4605.78, 4671.45, 4626.89, 4698.56, // 2015
    4765.23, 4721.67, 4792.34, 4858.90, 4814.56, 4885.23, 4956.67, 4912.34, 4983.90, 5049.56, 5004.12, 5076.78, // 2016
    5143.45, 5098.90, 5170.56, 5236.23, 5191.67, 5263.34, 5334.90, 5290.12, 5361.78, 5427.45, 5382.89, 5454.56, // 2017
    5521.23, 5476.67, 5548.34, 5614.90, 5570.12, 5641.78, 5713.45, 5668.90, 5740.56, 5806.23, 5761.67, 5833.34, // 2018
    5900.90, 5856.12, 5927.78, 5993.45, 5948.90, 6020.56, 6092.23, 6047.67, 6119.34, 6185.90, 6141.12, 6212.78, // 2019
    7282.45, 7228.90, 7302.56, 7378.23, 7324.67, 7398.34, 7473.90, 7420.12, 7494.78, 7570.45, 7516.89, 7591.56, // 2020
    8392.23, 8338.67, 8412.34, 8487.90, 8434.12, 8507.78, 8583.45, 8529.90, 8603.56, 8679.23, 8625.67, 8699.34, // 2021
    9436.90, 9382.12, 9456.78, 9532.45, 9478.90, 9553.56, 9629.23, 9575.67, 9650.34, 9726.90, 9673.12, 9747.78, // 2022
    10512.45, 10458.90, 10533.56, 10609.23, 10555.67, 10630.34, 10706.90, 10653.12, 10727.78, 10803.45, 10749.90, 10824.56, // 2023
    11230.74, 11122.62, 11300.39, 11480.22, 11371.67, 11551.88, 11733.38, 11623.32, 11805.10, 11988.16, 11877.43, 12061.75, // 2024
    12500.00 // Final value
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

document.addEventListener('DOMContentLoaded', () => {
  // Select all property-graph divs
  const graphContainers = document.querySelectorAll('.property-graph');

  // Intersection Observer configuration
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  };

  // Intersection Observer callback
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      // Find the index of this specific graph container
      const index = Array.from(graphContainers).indexOf(entry.target);
      
      if (entry.isIntersecting) {
        // Get the corresponding SVG
        const svgId = `svg${index}`;
        const svgElement = document.getElementById(svgId);
        
        // Clear previous content
        $(svgId).empty();

        // Determine which price array to use based on the index
        const priceArray = index === 0 ? price0 : price1;

        // Draw and animate the graph
        draw(priceArray, index);
        animate(priceArray, index);

        // Unobserve the element to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observe all graph containers
  graphContainers.forEach(container => {
    observer.observe(container);
  });
});

// Optional: Fallback for older browsers
function fallbackDrawGraphs() {
  const graphContainers = document.querySelectorAll('.property-graph');
  graphContainers.forEach((container, index) => {
    const svgId = `svg${index}`;
    const svgElement = document.getElementById(svgId);
    
    // Clear previous content
    $(svgId).empty();

    // Determine which price array to use based on the index
    const priceArray = index === 0 ? price0 : price1;

    // Draw and animate the graph
    draw(priceArray, index);
    animate(priceArray, index);
  });
}

// Check for Intersection Observer support
if (!('IntersectionObserver' in window)) {
  // Fallback for browsers without Intersection Observer
  window.addEventListener('load', fallbackDrawGraphs);
}