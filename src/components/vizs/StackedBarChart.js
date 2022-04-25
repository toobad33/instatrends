import * as d3 from "d3";
import * as helper from "../helper";
import { useEffect, useRef } from "react";
import d3Tip from "d3-tip";

function StackedBarChart() {
  const ref = useRef();
  const keys = ["likes", "comments"];
  const keysFR = ["likes", "commentaires"];

  const colors = {
    likes: "#E1306C",
    comments: "#833AB4",
  };

  const margin = { top: 60, right: 60, bottom: 60, left: 60 };
  const svgSize = {
    width: 1000,
    height: 900,
  };
  const graphSize = {
    width: svgSize.width - margin.right - margin.left,
    height: svgSize.height - margin.bottom - margin.top,
  };

  const tip = d3Tip()
    .attr("class", "d3-tip")
    .html(function (d) {
      return getToolTip(d);
    });

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg
      .attr("id", "stackedBarChart-zone")
      .attr("width", svgSize.width)
      .attr("height", svgSize.height);

    const graphSvg = svg
      .append("g")
      .attr("id", "stackedBarChart-graph")
      .attr("width", graphSize.width)
      .attr("height", graphSize.height)
      .attr("transform", `translate(25,50)`);

    graphSvg.call(tip);

    d3.json("EngagementRate.json").then((data) => {
      const stackGenerator = d3
        .stack()
        .keys(keys)
        .order(d3.stackOrderAscending);

      const layers = stackGenerator(data);

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.hashtag))
        .range([0, graphSize.width])
        .padding(0.25);

      const xAxis = d3.axisBottom(xScale);

      const yScale = d3
        .scaleLinear()
        .domain([1000000, 350000000])
        .range([graphSize.height, 0]);

      const yAxis = d3.axisLeft().scale(yScale).ticks(10);

      helper.appendXAxis(graphSvg);
      helper.appendYAxis(graphSvg);

      appendGraphLabels(svg);
      positionLabels(svg, svgSize.width, svgSize.height);

      svg
        .select(".x.axis")
        .attr("transform", "translate(70," + (graphSize.height + 10) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      svg.select(".y.axis").attr("transform", "translate(70, 10)").call(yAxis);

      const mouseover = function (event, d) {
        let groupName = d3.select(this.parentNode).datum().key + "";
        const groupValue = d.data[groupName];
        if (groupName === "comments") groupName = "commentaires";
        const hashtag = d.data.hashtag;
        tip.show({ hashtag, groupName, groupValue }, this);
      };

      graphSvg
        .selectAll(".layer")
        .data(layers)
        .join("g")
        .attr("class", "layer")
        .attr("fill", (layer) => colors[layer.key])
        .selectAll("rect")
        .data((layer) => layer)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.data.hashtag))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d[1]))
        .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
        .attr("transform", "translate(70, 10)")
        .on("mouseover", mouseover)
        .on("mouseout", function (event, d) {
          tip.hide(d, this);
        });

      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", "translate(830,20)");

      legend
        .selectAll("rect")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * 18;
        })
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", (layer) => {
          return colors[layer];
        });

      legend
        .selectAll("text")
        .data(keysFR)
        .enter()
        .append("text")
        .text(function (d) {
          return d;
        })
        .attr("x", 18)
        .attr("y", function (d, i) {
          return i * 18;
        })
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "hanging");
    });
  }, []);

  return <svg ref={ref}></svg>;
}

function appendGraphLabels(g) {
  g.append("text")
    .text(`Hashtags les plus utilisés`)
    .attr("class", "x axis-text");

  g.append("text")
    .text("Nombre de likes et de commentaires")
    .attr("class", "y axis-text")
    .attr("transform", "rotate(-90)");

  g.append("text")
    .text("Taux d'engagement par hashtags")
    .attr("class", "title")
    .attr("font", "bold")
    .attr("font-size", "24px");
}

function positionLabels(g, width, height) {
  g.select(".x.axis-text")
    .attr("x", width / 2 - 60)
    .attr("y", height - 5);

  g.select(".y.axis-text")
    .attr("x", -width / 2)
    .attr("y", 15);

  g.select(".title")
    .attr("x", width / 3)
    .attr("y", 20);
}

function getToolTip({ hashtag, groupName, groupValue }) {
  return `<div style="border:2px; border-style:solid; border-color:black; padding: 1em; background-color:white; border-radius: 10px;">
      <span style="font-weight: bold">Nombre de ${groupName}</span><br/>
      <span style="font-weight: bold">pour le hashtag </span><br/>
      <span style="font-weight: bold">${hashtag}: </span><br/>
      <span>${groupValue} </span>
    </div>`;
}

export default StackedBarChart;
