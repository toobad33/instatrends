import * as d3 from "d3";
import * as helper from "../helper";
import { useEffect, useRef } from "react";
import d3Tip from 'd3-tip';

function RadarChart() {
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d, n) { return getToolTip(d, n) });

  const ref = useRef();
  useEffect(() => {

    let svg = d3.select(ref.current)
      .attr("width", 600)
      .attr("height", 600)

    svg.call(tip);
    appendGraphTitle(svg, helper.svgSize.width);

    d3.csv("./likes_per_hour.csv").then((data) => {
      let radialScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0,0.015]);

      let ticks = [5000, 10000, 15000];

      ticks.forEach(t =>
        svg.append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
      );

      const features = data.map(function(d) { return d.hour; });
      let idx = 0;
      features.forEach((feature, index) => {
        if (index % 6 === 0) {
          let angle = (Math.PI / 2) + (2 * Math.PI * index / features.length);
          let line_coordinate = angleToCoordinate(angle, 15000, null, radialScale);
          let label_coordinate = angleToCoordinate(angle, 16000, null, radialScale);
          //draw axis line
          svg.append("line")
          .attr("x1", 300)
          .attr("y1", 300)
          .attr("x2", line_coordinate.x)
          .attr("y2", line_coordinate.y)
          .attr("stroke","gray");
      
          //draw axis label
          let offsetX = 0;
          let offsetY = 5;
          if (index === 18) {
            offsetX = 30;
          } else if (index === 0 || index === 12) {
            offsetX = 20;
          }
          svg.append("text")
          .attr("x", label_coordinate.x - offsetX)
          .attr("y", label_coordinate.y + offsetY)
          .text(feature);

        }
      });

      let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

      let color = "navy";
      let coordinates = [];
      let i = 0;
      const likes = data.map(function(d) { return d.likes; })
      data.forEach((point) => {
          let angle = (Math.PI / 2) + (2 * Math.PI * i++ / data.length);
          let coord = angleToCoordinate(angle, point.likes, point.hour, radialScale);
          coordinates.push(coord);
      });
      //draw the path element
      svg.append("path")
      .datum(coordinates)
      .attr("d",line)
      .attr("stroke-width", 3)
      .attr("stroke", color)
      .attr("fill", color)
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.5);

      coordinates.forEach((coord) => {
        svg.append('circle')
          .attr('class', 'radar-publications')
          .attr('cx', coord.x)
          .attr('cy', coord.y)
          .attr('r', 25)
          .attr('opacity', 0)
          .on("mouseover", function(d) {
            svg.append('circle')
            .attr('class', 'remove')
            .attr('cx', coord.x)
            .attr('cy', coord.y)
            .attr('r', 5)
            .attr('stroke', color)
            .attr('fill', color)
            .attr('opacity', 0.8)
            tip.show(coord.value, coord.key, this);
          })
          .on("mouseout", function() {
            svg.selectAll('.remove').attr("opacity", 0);
            tip.hide(this);
          });
      });

    }, []);

  }, [tip]);
  return <svg ref={ref} />;
}

function angleToCoordinate(angle, value, key, radialScale){
  let x = -Math.cos(angle) * radialScale(value);
  let y = Math.sin(angle) * radialScale(value);
  return {"x": 300 + x, "y": 300 - y, "key": key, "value": value};
}

function appendGraphTitle(g, width) {
  g.append('text')
    .text("Moyenne des likes selon l'heure de la journée")
    .attr('class', 'title')
    .attr('font','bold')
    .attr('font-size','24px')
    .attr('x', 100)
    .attr('y', 20)
}

function getToolTip(value, key) {
  return `<div style="border:2px; border-style:solid; border-color:black; padding: 1em; background-color:white; border-radius: 10px;">
    <span style="font-weight: bold">Nombre de </span><br/>
    <span style="font-weight: bold">likes</span><br/>
    <span style="font-weight: bold">moyen à </span><br/>
    <span style="font-weight: bold">${key} : </span>
    <span class="tooltip-value">${Math.round(value)}</span>
  </div>`;
}
  
export default RadarChart;
  