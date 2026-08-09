import { useEffect, useState } from "react";

function EmployeeDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/dashboard/summary")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }

                return response.json();
            })
            .then((data) => {
                setDashboardData(data.data);
            })
            .catch((error) => {
                console.error(error);
                setError("Unable to load dashboard data");
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!dashboardData) {
        return <p>Loading dashboard...</p>;
    }

    return (
        <div>
            <h1>Employee Dashboard</h1>

            <p>
                Total Responses: {dashboardData.totalResponses}
            </p>

            <p>
                Average Workload: {dashboardData.averageWorkload}
            </p>

            <p>
                Average Manager Support:{" "}
                {dashboardData.averageManagerSupport}
            </p>

            <p>
                Average Work-Life Balance:{" "}
                {dashboardData.averageWorkLifeBalance}
            </p>
        </div>
    );
}

export default EmployeeDashboard;