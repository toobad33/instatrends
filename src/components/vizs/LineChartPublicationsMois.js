import * as d3 from "d3";
import * as helper from "../helper";
import { useEffect, useRef } from "react";

function LineChartPublicationsMois() {
  const ref = useRef();
  const frLocale = d3.timeFormatLocale(helper.frCustonmLocale);
  const dateFormatter = frLocale.format("%B");

  useEffect(() => {
    const svg = d3.select(ref.current);

    svg
      .attr("id", "lineChart-zone")
      .attr("width", helper.svgSize.width)
      .attr("height", helper.svgSize.height);

    const graphSvg = svg
      .append("g")
      .attr("id", "lineChart-graph")
      .attr("width", helper.graphSize.width)
      .attr("height", helper.graphSize.height)
      .attr("transform", `translate(25,50)`);

    helper.appendXAxis(graphSvg);
    helper.appendYAxis(graphSvg);

    appendGraphLabels(svg);
    positionLabels(svg, helper.svgSize.width, helper.svgSize.height);

    const yScale = d3
      .scaleLinear()
      .domain([65000, 110000])
      .range([helper.graphSize.height, 0]);
    const yAxis = d3.axisLeft(yScale).ticks(7);
    svg.select(".y.axis").attr("transform", "translate(60, 10)").call(yAxis);

    d3.csv("./line_chart_publications_mois.csv").then((data) => {
      data.forEach(function (d) {
        d.date = d3.timeParse("%Y-%m")(d.date);
      });

      var xScale = d3
        .scaleTime()
        .range([0, helper.graphSize.width])
        .domain([data[0].date, data[data.length - 1].date]);

      const xAxis = d3.axisBottom(xScale).tickFormat(dateFormatter);

      svg
        .select(".x.axis")
        .attr(
          "transform",
          "translate(60," + (helper.graphSize.height + 10) + ")"
        )
        .call(xAxis);

      graphSvg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("transform", "translate(60, 0)")
        .attr(
          "d",
          d3
            .line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d["Nb de publications"]))
        );

      const toolTip = helper.createToolTip(graphSvg);
      helper.appendToolTipLabels(toolTip);

      graphSvg
        .append("rect")
        .attr("class", "overlay")
        .attr("width", helper.graphSize.width)
        .attr("height", helper.graphSize.height)
        .attr("transform", "translate(60, 0)")
        .attr("opacity", 0)
        .on("mouseover", function () {
          toolTip.style("display", null);
        })
        .on("mouseout", function () {
          toolTip.style("display", "none");
        })
        .on("mousemove", (evt) => mousemove(d3.pointer(evt)[0]));

      function mousemove(mouse_x) {
        const x0 = xScale.invert(mouse_x),
          bisectDate = d3.bisector(function (d) {
            return d.date;
          }).left,
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        toolTip.attr(
          "transform",
          `translate(${helper.margin.left + xScale(d.date)},${yScale(
            d["Nb de publications"]
          )})`
        );
        toolTip.select(".tooltip-date").text(dateFormatter(d.date));
        toolTip.select(".tooltip-pub").text(d["Nb de publications"]);
        updateOffSet(toolTip, dateFormatter(d.date));
      }
    });
  }, []);
  return <svg ref={ref} />;
}

function appendGraphLabels(g) {
  g.append("text").text(`Mois de l'année`).attr("class", "x axis-text");

  g.append("text")
    .text("Nombre de publications")
    .attr("class", "y axis-text")
    .attr("transform", "rotate(-90)");

  g.append("text")
    .text("Nombre de publications totales selon le mois")
    .attr("class", "title")
    .attr("font", "bold")
    .attr("font-size", "24px");
}

function positionLabels(g, width, height) {
  g.select(".x.axis-text")
    .attr("x", width / 2 - helper.margin.left)
    .attr("y", height - 10);

  g.select(".y.axis-text")
    .attr("x", -width / 2)
    .attr("y", 15);

  g.select(".title")
    .attr("x", width / 4)
    .attr("y", 20);
}

function updateOffSet(toolTip, date) {
  if (date == "Novembre" || date == "Décembre") {
    toolTip.select(".tooltip").attr("x", -170);
    toolTip.select(".tooltip-date").attr("x", -160);
    toolTip.select(".tooltip-pub-text").attr("x", -160);
    toolTip.select(".tooltip-pub").attr("x", -60);
  } else {
    toolTip.select(".tooltip").attr("x", 10);
    toolTip.select(".tooltip-date").attr("x", 18);
    toolTip.select(".tooltip-pub-text").attr("x", 18);
    toolTip.select(".tooltip-pub").attr("x", 110);
  }
}

export default LineChartPublicationsMois;
