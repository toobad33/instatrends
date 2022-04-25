import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@mantine/core";
import loading from "../../loading.gif";

function ScatterPlotLikesLength() {
  const [isPlotRendered, setRenderedPlot] = useState(null);

  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const ref = useRef();
  const space = 60;

  const drawXAxis = () => {
    const xScale = d3
      .scaleLinear()
      .domain([0, 2500])
      .range([space, space + width]);

    const xRange = [margin.left, width - margin.right];

    const context = ref.current.getContext("2d");

    const [startX, endX] = xRange;
    let tickSize = 6,
      xTicks = xScale.ticks(), // You may choose tick counts. ex: xScale.ticks(20)
      xTickFormat = xScale.tickFormat(); // you may choose the format. ex: xScale.tickFormat(tickCount, ".0s")

    context.strokeStyle = "black";

    context.beginPath();
    xTicks.forEach((d) => {
      context.moveTo(xScale(d), height);
      context.lineTo(xScale(d), height + tickSize);
    });
    context.stroke();

    context.beginPath();
    context.moveTo(startX, height + tickSize);
    context.lineTo(startX, height);
    context.lineTo(endX, height);
    context.lineTo(endX, height + tickSize);
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillStyle = "black";
    xTicks.forEach((d) => {
      context.beginPath();
      context.fillText(xTickFormat(d), xScale(d), height + tickSize);
    });
  };

  const drawYAxis = () => {
    const yScale = d3.scaleLinear().domain([0, 11500000]).range([height, 0]);
    const yRange = [height, margin.top];
    const [startY, endY] = yRange;
    const context = ref.current.getContext("2d");

    const tickPadding = 3,
      tickSize = 6,
      yTicks = yScale.ticks(),
      yTickFormat = yScale.tickFormat();

    context.strokeStyle = "black";
    context.beginPath();
    yTicks.forEach((d) => {
      context.moveTo(space, yScale(d));
      context.lineTo(space - tickSize, yScale(d));
    });
    context.stroke();

    context.beginPath();
    context.moveTo(space - tickSize, startY);
    context.lineTo(space, startY);
    context.lineTo(space, endY);
    context.lineTo(space - tickSize, endY);
    context.stroke();

    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = "black";
    yTicks.forEach((d) => {
      context.beginPath();
      context.fillText(
        yTickFormat(d),
        space - tickSize - tickPadding,
        yScale(d)
      );
    });
  };

  useEffect(() => {
    const drawPlot = async () => {
      var x = d3.scaleLinear().domain([0, 2500]).range([0, width]);
      var y = d3.scaleLinear().domain([0, 11500000]).range([height, 0]);

      const context = ref.current.getContext("2d");

      d3.csv("./likes_length.csv").then((data) => {
        data.forEach((d) => {
          context.beginPath();
          context.arc(x(d.length) + space, y(d.likes), 2, 0, 2 * Math.PI);
          context.fillStyle = "#99ccff";
          context.fill();
          context.closePath();
        });
        setRenderedPlot(true);
      });
    };

    drawPlot();
  }, []);

  useEffect(() => {
    if (isPlotRendered) {
      drawXAxis();
      drawYAxis();
    }
  }, [isPlotRendered]);

  return (
    <>
      <p style={{ fontSize: "24px" }}>
        Nombre de likes selon la longueur du nombre de caractères de la
        description
      </p>
      <p style={{ fontSize: "15px", textAlign: "left" }}>Nombre de likes</p>
      <div className="spinner">
        {!isPlotRendered && <img src={loading} alt="Logo" width={200} height={200} />}
      </div>

      <canvas width="1000" height="480" ref={ref} />
      <p style={{ fontSize: "15px" }}>Nombre de caractères</p>
    </>
  );
}

export default ScatterPlotLikesLength;
