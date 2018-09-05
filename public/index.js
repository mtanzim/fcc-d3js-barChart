
function parentWidth(elem) {
  return elem.parentElement.clientWidth;
}
function parentHeight(elem) {
  return elem.parentElement.clientHeight;
}

function generateBarChart(dataset, id, isScaled = true) {
  var axisYoffset = 30;
  var axisXoffset = 20;
  var svgWidth = 0.85 * parentWidth(document.getElementById(id.replace('#','')));
  var svgHeight = 500;
  var barPadding = 0;
  var barWidth = (svgWidth - axisYoffset - barPadding) / dataset.length;

  // console.log(dataset);

  var svg = d3.select(id)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // axes
  var xAxisScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, svgWidth - axisYoffset]);

  var yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight, 0]);

  var x_axis = d3.axisBottom().scale(xAxisScale);
  var y_axis = d3.axisLeft().scale(yAxisScale);

  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${axisYoffset}, 10)`)
    .call(y_axis);

  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(${axisYoffset + barPadding}, ${svgHeight - axisXoffset + 2})`)
    .call(x_axis);

  // scaling !!
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight * 0.9]);

  svg.selectAll("rect")
    .data(dataset)
    // takes data from waiting state to 
    .enter()  
    // below operations get applied to 
    .append("rect")
    .attr("class", "bar")
    .attr("fill", (d, i) => i % 2 === 0 ? "salmon" : "salmon")
    .attr("y", d => isScaled ? svgHeight - yScale(d) - axisXoffset : svgHeight - d - axisXoffset)
    .attr("height", d => isScaled ? yScale(d) : d)
    .attr("width", barWidth - barPadding)
    .attr("transform", (d, i) => {
      var translate = [barWidth * i + axisYoffset + barPadding, 0];
      return `translate(${translate})`;
    });

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
  console.log('All assets are loaded')
  generateBarChart(dataset.data.map( d=> d[1] ), '#svg0');
  
});



