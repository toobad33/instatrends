import * as Description from "./vizDescriptions";
import { Tabs, Text } from "@mantine/core";
import logo from "../../src/logo.webp";
import BarChart from "./vizs/BarChart";
import BarChartNbPublicationsParType from "./vizs/BarChartNbPublicationsParType";
import LineChartPublicationsMois from "./vizs/LineChartPublicationsMois";
import MultipleLineChart from "./vizs/multipleLineChartViz/MultipleLineChart"
import RadarChart from "./vizs/RadarChart";
import RadarChartPublicationsMois from "./vizs/RadarChartPublicationsMois";
import ScatterPlotLikesLength from "./vizs/ScatterPlotLikesLength";
import StackedBarChart from "./vizs/StackedBarChart";

const TabStyle = {
  fontSize: "18px",
};

export function Headers() {
  return (
    <div>
      <Text>
        <h1
          style={{
            color: "pink",
            fontSize: "60px",
            fontFamily: "papyrus",
            textAlign: "center",
          }}
        >
          <img src={logo} alt="Logo" width={80} height={80} />
          <span>#InstaTrends</span>
          <img src={logo} alt="Logo" width={80} height={80} />
        </h1>
      </Text>
    </div>
  );
}

function NavTabs() {
  return (
    <div>
      <Tabs color="pink" grow position="center" tabPadding="xl">
        <Tabs.Tab label="Accueil" style={TabStyle}>
          <Description.Home />
        </Tabs.Tab>
        <Tabs.Tab label="Tendances" style={TabStyle}>
          <StackedBarChart />
          <Description.StackedBarChartHashtag />
          <MultipleLineChart/>
          <Description.LineChartMultiple />
        </Tabs.Tab>
        <Tabs.Tab label="Temporel" style={TabStyle}>
          <LineChartPublicationsMois />
          <Description.LineChartByMonth />
          <RadarChartPublicationsMois />
          <Description.RadarChartByMonth />
          <RadarChart />
          <Description.RadarChartByHour />
        </Tabs.Tab>
        <Tabs.Tab label="Taux d'engagement" style={TabStyle}>
          <BarChart />
          <Description.BarChart />
          <BarChartNbPublicationsParType />
          <Description.BarChartNbPublicationsParType />
          <ScatterPlotLikesLength />
          <Description.ScatterPlot />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default NavTabs;
