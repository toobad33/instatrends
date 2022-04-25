import * as d3 from "d3";
import * as helper from "../../helper";
import { useEffect, useRef } from "react";

export function CreateLineChart(file_name, field, title) {
  const ref = useRef();
  const frLocale = d3.timeFormatLocale(helper.frCustonmLocale);
  const dateFormatter = frLocale.format("%B");

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg
      .attr("id", "lineChart-zone")
      .attr("width", helper.smallSvgSize.width)
      .attr("height", helper.smallSvgSize.height);

    const graphSvg = svg
      .append("g")
      .attr("id", "lineChart-graph")
      .attr("width", helper.smallGraphSize.width)
      .attr("height", helper.smallGraphSize.height)
      .attr("transform", `translate(25,50)`);

    helper.appendXAxis(graphSvg);
    helper.appendYAxis(graphSvg);

    appendGraphLabels(svg, title);
    positionLabels(svg, helper.smallSvgSize.width, helper.smallSvgSize.height);

    const yScale = d3
      .scaleLinear()
      .domain([1000, 3500])
      .range([helper.smallGraphSize.height, 0]);
    const yAxis = d3.axisLeft(yScale).ticks(7);

    svg.select(".y.axis").attr("transform", "translate(60, 10)").call(yAxis);

    d3.csv(file_name).then((data) => {
      data.forEach(function (d) {
        d.month = d3.timeParse("%Y-%m")(d.month);
      });

      var xScale = d3
        .scaleTime()
        .range([0, helper.smallGraphSize.width])
        .domain([data[0].month, data[data.length - 1].month]);
      const xAxis = d3.axisBottom(xScale).tickFormat(frLocale.format("%b"));

      svg
        .select(".x.axis")
        .attr(
          "transform",
          "translate(60," + (helper.smallGraphSize.height + 10) + ")"
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
            .x((d) => xScale(d.month))
            .y((d) => yScale(d[field]))
        );

      const toolTip = helper.createToolTip(graphSvg);
      appendToolTipLabels(toolTip);

      graphSvg
        .append("rect")
        .attr("class", "overlay")
        .attr("width", helper.smallGraphSize.width)
        .attr("height", helper.smallGraphSize.height)
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
            return d.month;
          }).left,
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.month > d1.month - x0 ? d1 : d0;
        toolTip.attr(
          "transform",
          `translate(${helper.margin.left + xScale(d.month)},${yScale(
            d[field]
          )})`
        );
        toolTip.select(".tooltip-date").text(dateFormatter(d.month));
        toolTip.select(".tooltip-pub").text(d[field]);
        updateOffSet(toolTip, dateFormatter(d.month));
      }
    });
  }, []);
  return <svg ref={ref} />;
}

function appendGraphLabels(g, title) {
  g.append("text")
    .text(`Mois de l'année`)
    .attr("class", "x axis-text")
    .attr("font-size", "10px");

  g.append("text")
    .text("Nombre de publications")
    .attr("class", "y axis-text")
    .attr("transform", "rotate(-90)")
    .attr("font-size", "10px");

  g.append("text")
    .text(title)
    .attr("class", "title")
    .attr("font", "bold")
    .attr("font-size", "15px");
}

function positionLabels(g, width, height) {
  g.select(".x.axis-text")
    .attr("x", width / 2)
    .attr("y", height - 25);

  g.select(".y.axis-text")
    .attr("x", -width / 2)
    .attr("y", 30);

  g.select(".title")
    .attr("font-weight", "bold")
    .attr("x", width / 2)
    .attr("y", 20);
}

function appendToolTipLabels(toolTip) {
  toolTip.append("circle").attr("r", 5).attr("fill", "steelblue");

  toolTip
    .append("rect")
    .attr("class", "tooltip")
    .attr("width", 110)
    .attr("height", 50)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("x", 10)
    .attr("y", -22)
    .attr("rx", 4)
    .attr("ry", 4);

  toolTip
    .append("text")
    .attr("class", "tooltip-date")
    .attr("x", 18)
    .attr("y", 0)
    .attr("font-size", "11px")
    .attr("font-weight", "bold");

  toolTip
    .append("text")
    .attr("class", "tooltip-pub-text")
    .attr("x", 18)
    .attr("y", 16)
    .text("Publications:")
    .attr("font-size", "11px")
    .attr("font-weight", "bold");

  toolTip
    .append("text")
    .attr("class", "tooltip-pub")
    .attr("x", 86)
    .attr("y", 16)
    .attr("font-size", "11px");
}

function updateOffSet(toolTip, date) {
  if (date == "Novembre" || date == "Décembre" || date == "Octobre") {
    toolTip.select(".tooltip").attr("x", -120);
    toolTip.select(".tooltip-date").attr("x", -112);
    toolTip.select(".tooltip-pub-text").attr("x", -112);
    toolTip.select(".tooltip-pub").attr("x", -44);
  } else {
    toolTip.select(".tooltip").attr("x", 10);
    toolTip.select(".tooltip-date").attr("x", 18);
    toolTip.select(".tooltip-pub-text").attr("x", 18);
    toolTip.select(".tooltip-pub").attr("x", 86);
  }
}

export default CreateLineChart;
