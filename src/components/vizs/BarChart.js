import * as d3 from 'd3';
import * as helper from "../helper";
import { useRef, useEffect } from 'react';
import d3Tip from 'd3-tip';

function BarChart(){
    const ref = useRef();
    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return getToolTip(d) });

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.attr('id', 'barChartAvgLikes-zone')
            .attr("width", helper.svgSize.width)
            .attr("height", 750);

        const graphSvg = 
            svg.append('g')
                .attr('id', 'barchartAvgLikes-graph')
                .attr("width", helper.BarChartGraphSize.width)
                .attr("height", helper.BarChartGraphSize.height)
                .attr("transform",`translate(200,60)`);

        graphSvg.call(tip);

        d3.csv("./likes_type.csv").then((data) => {
            data.sort((b, a) => a.Value - b.Value);

            // X axis
            const xScale = d3.scaleBand()
                .domain(data.map(function(d) { return d.type; }))
                .range([ 0, helper.BarChartGraphSize.width ])
                .padding(0.25);
            
            const xAxis = d3.axisBottom(xScale);
            
            // Y axis
            const toNumbers = arr => arr.map(Number);
            const likes = toNumbers(data.map(function(d) { return d.likes; }))
            const yScale = d3.scaleLinear()
                .domain([0, Math.max(...likes) + 1000])
                .range([helper.BarChartGraphSize.height, 0]);

            const yAxis = d3.axisLeft().scale(yScale).ticks(10);
            
            helper.appendXAxis(graphSvg);
            helper.appendYAxis(graphSvg);

            appendGraphLabels(svg);
            positionLabels(svg, helper.svgSize.width, helper.svgSize.height);

            svg.select('.x.axis')
                .attr("transform", "translate(0," + (helper.BarChartGraphSize.height) + ")")
                .call(xAxis)
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            svg.select('.y.axis').call(yAxis);


            // Bars
            graphSvg.selectAll("barchartAvgLikes-graph")
                .data(data)
                .enter()
                .append("rect")
                    .attr("x", (d)=> xScale(d.type))
                    .attr("y", (d)=> yScale(d.likes))
                    .attr("width", xScale.bandwidth())
                    .attr("height", (d) => helper.BarChartGraphSize.height - yScale(d.likes))
                    .attr("fill", "#69b3a2")
                .on("mouseover", function(event, d) {
                    tip.show(d, this);
                })
                .on("mouseout", function(event, d) {
                    tip.hide(d, this);
                });
        }, []);
    }, [tip]);

    return (
        <div className="chart">
            <svg ref={ref}/>
        </div>
    )
}

function appendGraphLabels(g) {
    g.append('text')
      .text(`Types de publication`)
      .attr('class', 'x axis-text')
  
    g.append('text')
      .text('Nombre de likes')
      .attr('class', 'y axis-text')
      .attr('transform', 'rotate(-90)')
  
    g.append('text')
      .text('Moyenne des likes par types de publications')
      .attr('class', 'title')
      .attr('font','bold')
      .attr('font-size','24px')
  }
  
  function positionLabels(g, width, height) {
    g.select('.x.axis-text')
      .attr('x', width / 2 - helper.margin.left)
      .attr('y', height - 180)
  
    g.select('.y.axis-text')
      .attr('x', -width/2 + 60)
      .attr('y', 120)
  
    g.select('.title')
      .attr('x', width/4)
      .attr('y', 20)
  }

function getToolTip(d) {
    return `<div style="border:2px; border-style:solid; border-color:black; padding: 1em; background-color:white; border-radius: 10px;">
      <span style="font-weight: bold">Nombre de likes</span><br/>
      <span style="font-weight: bold">moyen pour le type </span><br/>
      <span style="font-weight: bold">${d.type} : </span>
      <span class="tooltip-value">${Math.round(d.likes)}</span>
    </div>`;
  }
  
export default BarChart;