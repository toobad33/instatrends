import "./MultipleLineChart.css";
import { hashtagsByPopularity } from "../../helper";
import CreateLineChart from "./LineChartTemplate"

function MultipleLineChart() {
  const lineCharts = [];
  hashtagsByPopularity.forEach((hashtag) => {
    const hashtagCount = hashtag + "_count"
    const csvFile = `./${hashtagCount}_month.csv`;
    lineCharts.push(CreateLineChart(csvFile, hashtagCount, `#${hashtag}`));
  })

  return (
    <div className="multiple-line-chart">
        <p style={{ fontSize: "24px" }}>
            Nombre de publications des 12 tendances les plus populaires selon le mois
        </p>
  
        <div className="row">{lineCharts.slice(0,3)}</div>
        <div className="row">{lineCharts.slice(3,6)}</div>
        <div className="row">{lineCharts.slice(6,9)}</div>
        <div className="row">{lineCharts.slice(9,12)}</div>
    </div>
 );
}

export default MultipleLineChart;