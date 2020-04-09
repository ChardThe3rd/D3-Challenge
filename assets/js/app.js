// @TODO: YOUR CODE HERE!
function makeResponsive() {

  svgWidth = 960;
  svgHeight = 500;
  
  margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left:100
  };
  
  width = svgWidth - margin.left - margin.right;
  height = svgHeight - margin.top - margin.bottom;
  
  // creating svg wrapper
  svg = d3.select("#scatter")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  
  // appending svg group 
  chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // importing data from csv file and performing function on it
  d3.csv("assets/data/data.csv")
      .then(function(riskData){
  
  // storing data from strings into integers when necessary
      riskData.forEach(function(data) {
          data.age = +data.age;
          data.smokes = +data.smokes;
          data.healthcare = +data.healthcare;
          data.poverty = +data.poverty;
          data.abbr = data.abbr;
          data.income = +data.income;
      });
  // creating x and y linear scale
      xLinearScale = d3.scaleLinear()
          .domain([8.5, d3.max(riskData, d => d.poverty)])
          .range([0, width]);
  
      yLinearScale = d3.scaleLinear()
          .domain([3.5, d3.max(riskData, d => d.healthcare)])
          .range([height, 0]);
  
  
  // creating axes
      xAxis = d3.axisBottom(xLinearScale);
      yAxis = d3.axisLeft(yLinearScale);
  
  // appending axes
      chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);
  
      chartGroup.append("g")
      .call(yAxis);
      
  // appending circles to chart
      circlesGroup = chartGroup.selectAll("circle")
          .data(riskData)
          .enter()
          .append("circle")
          .attr("cx", d => xLinearScale(d.poverty))
          .attr("cy", d => yLinearScale(d.healthcare))
          .attr("r", 13)
          .attr("fill", "lightblue")
          .attr("opacity", ".5")
          .attr("stroke-width", "0")
          .attr("stroke", "black");
  
          chartGroup.select("g")
          .selectAll("circle")
          .data(riskData)
          .enter()
          .append("text")
          .text(d => d.abbr)
          .attr("x", d => xLinearScale(d.poverty))
          .attr("y", d => yLinearScale(d.healthcare))
          .attr("dy",-395)
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .attr("font-weight", "bold");
       
          console.log(riskData);

  // create axes labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 50)
        .attr("x", 0 -250)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
  
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
  
  
  
  });
  }
  
  makeResponsive();