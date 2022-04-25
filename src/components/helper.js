export const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const monthsAbbrev = [
  "Janv",
  "Févr",
  "Mars",
  "Avr",
  "Mai",
  "Juin",
  "Juill",
  "Août",
  "Sept",
  "Oct",
  "Nov",
  "Déc",
];

export const frCustonmLocale = {
  dateTime: "%A, le %e %B %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  shortDays: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  months: months,
  shortMonths: monthsAbbrev,
};

export const hashtagsByPopularity = [
  "citation",
  "amour",
  "humour",
  "citationdujour",
  "love",
  "france",
  "citations",
  "dz",
  "citationamour",
  "couple",
  "blague",
  "paris",
];

export function appendXAxis(g) {
  g.append("g").attr("class", "x axis");
}

export function appendYAxis(g) {
  g.append("g").attr("class", "y axis");
}

export const margin = { top: 60, right: 60, bottom: 60, left: 60 };

export const svgSize = {
  width: 1000,
  height: 900,
};

export const smallSvgSize = {
  width: 400,
  height: 390,
};

export const graphSize = {
  width: svgSize.width - margin.right - margin.left,
  height: svgSize.height - margin.bottom - margin.top,
};

export const smallGraphSize = {
  width: smallSvgSize.width - margin.right - margin.left,
  height: smallSvgSize.height - margin.bottom - margin.top,
};

export const BarChartGraphSize = {
  //custom smaller size
  width: 600,
  height: 600,
};

export function createToolTip(svg) {
  return svg.append("g").attr("class", "focus").style("display", "none");
}

export function appendToolTipLabels(toolTip) {
  toolTip.append("circle").attr("r", 5).attr("fill", "steelblue");

  toolTip
    .append("rect")
    .attr("class", "tooltip")
    .attr("width", 160)
    .attr("height", 50)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("y", -22)
    .attr("rx", 4)
    .attr("ry", 4);

  toolTip.append("text").attr("class", "tooltip-date").attr("y", -2);

  toolTip
    .append("text")
    .attr("class", "tooltip-pub-text")
    .attr("y", 18)
    .text("Publications:");

  toolTip.append("text").attr("class", "tooltip-pub").attr("y", 18);
}
