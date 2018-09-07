


function parentWidth(elem) {
  return elem.parentElement.clientWidth;
}
function parentHeight(elem) {
  return elem.parentElement.clientHeight;
}


function generateBarChart(datasetAll, id) {

  const dataset = datasetAll.map(d => d[1]);
  const datasetX = datasetAll.map(d => d[0]);
  let datasetXyears = [... new Set(datasetX.map(d => new Date(d).getFullYear()))];

  var axisYoffset = 40;
  var axisXoffset = 0;
  var svgMargin = 25;
  var svgWidth = 0.8 * parentWidth(document.getElementById(id.replace('#', '')));
  var svgHeight = 400;
  var barPadding = 0;
  var barWidth = (svgWidth - axisYoffset - barPadding) / dataset.length;


  // console.log(dataset);
  d3.select(id)
    .append("tooltip")
    .attr("id", "tooltip")
    .attr("class", "bg-light")
    .text("tooltip");
  d3.select(id)
    .append("h3")
    .text("US GDP")
    .attr("id", "title");

  var svg = d3.select(id)
    .append("div")
    .classed("svg-container", true) //container class to make it responsive

    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${svgWidth + svgMargin} ${svgHeight + svgMargin}`)
    //class to make it responsive
    .classed("svg-content-responsive", true);

  // var svg = d3.select(id)
  //   .classed("svg-container", true)
  //   .attr("width", svgWidth + svgMargin)
  //   .attr("height", svgHeight + svgMargin);

  // axes
  var xAxisScale = d3.scaleLinear()
    // .domain([d3.min(datasetXyears), d3.max(datasetXyears)])
    .domain([d3.min(datasetXyears), d3.max(datasetXyears)])
    .range([0, svgWidth - axisYoffset]);

  var yAxisScale = d3.scaleLinear()
    .domain([axisXoffset, d3.max(dataset)])
    .range([svgHeight - axisXoffset, svgMargin]);

  var x_axis = d3
    .axisBottom()
    .scale(xAxisScale)
    .tickFormat(d3.format(".0f"));

  var y_axis = d3.axisLeft().scale(yAxisScale);

  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${axisYoffset}, 0)`)
    .call(y_axis);

  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(${axisYoffset + barPadding}, ${svgHeight - axisXoffset})`)
    .call(x_axis);

  // scaling !!
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight - svgMargin]);


  svg.selectAll("rect")
    .data(datasetAll)
    // takes data from waiting state to 
    .enter()

    // below operations get applied to 
    .append("rect")
    .attr("class", "bar")
    .attr("fill", "salmon")
    .attr("y", d => {
      return svgHeight - yScale(d[1]) - axisXoffset;
    })
    .attr("height", d => {
      return yScale(d[1]);
    })
    .attr('data-gdp', d => d[1])
    .attr('data-date', d => d[0])
    .attr("width", barWidth - barPadding)
    .attr("transform", (d, i) => {
      var translate = [barWidth * i + axisYoffset + barPadding, 0];
      return `translate(${translate})`;
    })
    .on('mouseover', (d, i) => {
      let tooltip = document.getElementById('tooltip');
      tooltip.style.display = "block";
      tooltip.style.left = barWidth * i + axisYoffset + barPadding;
      tooltip.style.top = svgHeight - svgHeight * 0.25;

      tooltip.textContent = `Date: ${d[0]} GDP: ${d[1]}`;
      tooltip.setAttribute("data-date", d[0]);
      // tooltip.style.transform = `translate(${axisYoffset + barPadding}, ${svgHeight - axisXoffset})`;

    })
    .on('mouseout', () => document.getElementById('tooltip').style.display = "none");

  /*   svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr('y', d => isScaled ? svgHeight - 10 : svgHeight - d - 10)
      .attr('x', (d, i) => isScaled ? barWidth * i + barWidth / 2 : barWidth * i)
      .attr('fill', 'black '); */

}

// var datasetBarChart = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// var datasetJson = require('data.json');
window.addEventListener('load', function () {
  console.log('All assets are loaded');
  document.getElementById('tooltip').style.display = "none";

  // bootstrap tooptips
  /*   $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    }) */
  generateBarChart(dataset.data, '#bar-chart');

});



