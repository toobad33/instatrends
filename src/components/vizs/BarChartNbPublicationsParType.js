import * as d3 from 'd3';
import * as helper from "../helper";
import d3Tip from 'd3-tip';
import { useRef, useEffect } from 'react';

function BarChartNbPublicationsParType(){
    const ref = useRef();
    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return getToolTip(d) });

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.attr('id', 'barChartPubType-zone')
            .attr("width", helper.svgSize.width)
            .attr("height", 750);

        const graphSvg = 
            svg.append('g')
                .attr('id', 'barchartPubTypes-graph')
                .attr("width", helper.BarChartGraphSize.width)
                .attr("height", helper.BarChartGraphSize.height)
                .attr("transform",`translate(200,60)`);

        graphSvg.call(tip);

        d3.csv("./nb_post_per_type.csv").then((data) => {

            // X axis
            const xScale = d3.scaleBand()
                .domain(data.map(function(d) { return d.type; }))
                .range([ 0, helper.BarChartGraphSize.width ])
                .padding(0.25);
            
            const xAxis = d3.axisBottom(xScale);
            
            // Y axis
            const toNumbers = arr => arr.map(Number);
            const nbPosts = toNumbers(data.map(function(d) { return d.nbPublications; console.log(d.nbPublications)}))
            const yScale = d3.scaleLinear()
                .domain([0, 620000])
                .range([helper.BarChartGraphSize.height, 0]);

            const yAxis = d3.axisLeft(yScale);
            
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
            graphSvg.selectAll("barchartPubTypes-graph")
                .data(data)
                .enter()
                .append("rect")
                    .attr("x", (d)=> xScale(d.type))
                    .attr("y", (d)=> yScale(d.nbPublications))
                    .attr("width", xScale.bandwidth())
                    .attr("height", (d) => helper.BarChartGraphSize.height - yScale(d.nbPublications))
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
      .text('Nombre de publications')
      .attr('class', 'y axis-text')
      .attr('transform', 'rotate(-90)')
  
    g.append('text')
      .text('Nombre de publication par type')
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
        <span style="font-weight: bold">Nombre de publications</span><br/>
        <span style="font-weight: bold">total pour le type </span><br/>
        <span style="font-weight: bold">${d.type} : </span>
        <span class="tooltip-value">${d.nbPublications}</span>
    </div>`;
    }

export default BarChartNbPublicationsParType;