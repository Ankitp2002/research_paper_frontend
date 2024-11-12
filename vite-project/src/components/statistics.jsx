import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { fetchPaper } from "../utils/handleAuthor";

// Register the necessary chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const PieChart = () => {
  const [commentCounts, setCommentCounts] = useState([]);
  const [viewCounts, setViewCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const paperData = await fetchPaper();
      if (typeof paperData === "object" && paperData !== null) {
        const comments = [];
        const views = [];
        paperData.forEach((paper) => {
          comments.push({
            count: paper?.comments.length || 0,
            title: paper?.title || "Untitled",
          });

          views.push({
            count: paper?.view_count || 0,
            title: paper?.title || "Untitled",
          });
        });
        setCommentCounts(comments);
        setViewCounts(views);
      } else {
        console.error("Error fetching paper data:", paperData);
      }
    };
    fetchData();
  }, []);

  // Group data by count
  const groupByCount = (data) => {
    const grouped = data.reduce((acc, item) => {
      if (item.count > 0) {
        // Filter out zero counts
        acc[item.count] = acc[item.count] || [];
        acc[item.count].push(item.title);
      }
      return acc;
    }, {});
    return Object.entries(grouped).map(([count, titles]) => ({
      count: parseInt(count),
      titles,
    }));
  };

  // Prepare data based on the selected category
  const [selectedCategory, setSelectedCategory] = useState("Comment");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = selectedCategory === "Comment" ? commentCounts : viewCounts;
    setChartData(groupByCount(data));
  }, [selectedCategory, commentCounts, viewCounts]);

  // Handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Chart data configuration
  const data = {
    labels: chartData.map((item) => `${item.count}`), // Show count as labels
    datasets: [
      {
        label: "Distribution(%)",
        data: chartData.map((item) => item.count),
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
        borderColor: ["#FF5733", "#33FF57", "#3357FF"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options configuration with custom tooltips
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const titles = chartData[index].titles;
            const titleList = titles.join(", ");
            const count = chartData[index].count;
            return `Count: ${count}\nTheses: ${titleList}`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        anchor: "end",
        align: "start",
        font: {
          size: 14, // Adjust size as needed
        },
        clip: false, // Prevents text clipping
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <select onChange={handleDropdownChange} value={selectedCategory}>
          <option value="Comment">Comment</option>
          <option value="View">View</option>
        </select>
      </div>
      <div
        style={{
          height: "280px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
