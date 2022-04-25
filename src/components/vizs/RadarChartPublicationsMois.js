import * as d3 from "d3";
import * as helper from "../helper";
import d3Tip from 'd3-tip';
import { useEffect, useRef } from "react";

const radialScale = d3.scaleLinear()
  .domain([0,10])
  .range([0,50]);

function RadarChartPublicationsMois() {
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d, n) { return getToolTip(d, n) });
  const ref = useRef();

  useEffect(() => {

    const svg = d3.select(ref.current);
    
    svg.attr('id', 'radarMonth-g')
      .attr("width", helper.svgSize.width)
      .attr("height", 600);

    const graphSvg = 
      svg.append('g')
        .attr('id', 'radarMonth-graph')
        .attr("width", 600)
        .attr("height", 600)
        .attr("transform",`translate(220,50)`);

    graphSvg.call(tip);
  
    appendGraphTitle(svg, helper.svgSize.width);

    const ticks = [0,10,20,30,40];
  
    // append ticks
    ticks.forEach(t =>
     {
      graphSvg.append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t));
      
      graphSvg.append("text")
        .attr("x", 305)
        .attr("y", 300 - radialScale(t))
        .text(t.toString())
     });


    let index = 0;
    //axis
    helper.months.forEach((month) => {
      let angle = (Math.PI / 2) + (2 * Math.PI * index / helper.months.length);
      let line_coordinate = angleToCoordinate(angle,40);
      let label_coordinate = angleToCoordinate(angle, 45);

      graphSvg.append("line")
        .attr("x1", 300)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke","grey")
        .attr("opacity", 0.50);

      const offset = computeOffset(index)

      graphSvg.append("text")
        .attr("x", label_coordinate.x - offset.X + 5)
        .attr("y", label_coordinate.y + offset.Y)
        .text(month);

      index++;
    });

    // plot data
    const line = d3.line()
      .x(d => d.x)
      .y(d => d.y);

    const dataRadar = {};

    d3.csv("./radar_chart_publications_mois.csv").then((data) => {
      data.forEach((d) => {
        dataRadar[d.Mois] = parseFloat(d["Nb de publications"]);
      });
      let coordinates = getPathCoordinates(dataRadar);
  
      //draw the path element
      graphSvg.append("path")
        .datum(coordinates)
        .attr("d", line)
        .attr("stroke-width", 3)
        .attr("stroke", "#63db9f")
        .attr("fill", "#63db9f")
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.5);

      coordinates.forEach((coord) => {
        graphSvg.append('circle')
          .attr('class', 'radar-publications')
          .attr('cx', coord.x)
          .attr('cy', coord.y)
          .attr('r', 25)
          .attr('opacity', 0)
          .on("mouseover", function(d) {
            graphSvg.append('circle')
            .attr('class', 'remove')
            .attr('cx', coord.x)
            .attr('cy', coord.y)
            .attr('r', 5)
            .attr('stroke', "#63db9f")
            .attr('fill', "#63db9f")
            .attr('opacity', 0.8)
            tip.show(coord.value, coord.key, this);
          })
          .on("mouseout", function() {
            graphSvg.selectAll('.remove').attr("opacity", 0);
            tip.hide(this);
          });
      });
    });
  }, [tip]);
 
  return <svg ref={ref} />;
}

function computeOffset(index) {
  let offsetX = 0;
  let offsetY = 0
  if (index === 0 || index === 6)
    offsetX = 25;
  else if (index === 1) 
    offsetX = 5;
  else if (index === 7)
    offsetX = 50;
  else if (index > 6) {
    offsetX = 70;
  }
  else if (index === 0) {
    offsetY = -20;
  }
  else if (index === 6)
    offsetY = 10;

  return { X: offsetX, Y: offsetY};
}

function getPathCoordinates(data_point){
  const coordinates = [];
  let index = 0;
  helper.months.forEach((month) => {
    let angle = (Math.PI / 2) + (2 * Math.PI * index / helper.months.length);
    coordinates.push(angleToCoordinate(angle, data_point[month], month));
    index++;
  });
  return coordinates;
}

function angleToCoordinate(angle, value, month){
  const x = -Math.cos(angle) * radialScale(value);
  const y = Math.sin(angle) * radialScale(value);
  return {"x": 300 + x, "y": 300 - y, "key": month, "value": value};
}

function appendGraphTitle(g, width) {
  g.append('text')
    .text('Nombre de publications moyennes selon le mois')
    .attr('class', 'title')
    .attr('font','bold')
    .attr('font-size','24px')
    .attr('x', width/4)
    .attr('y', 20)
}

function getToolTip(value, key) {
  return `<div style="border:2px; border-style:solid; border-color:black; padding: 1em; background-color:white; border-radius: 10px;">
    <span style="font-weight: bold">Nombre de </span><br/>
    <span style="font-weight: bold">publications</span><br/>
    <span style="font-weight: bold">moyen en </span><br/>
    <span style="font-weight: bold">${key} : </span>
    <span class="tooltip-value">${value}</span>
  </div>`;
}

export default RadarChartPublicationsMois;