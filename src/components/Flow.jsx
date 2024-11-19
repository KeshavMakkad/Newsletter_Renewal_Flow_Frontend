import React, { useState } from "react";
import axios from "axios";

const FlowSimulation = () => {
    const [logs, setLogs] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const getTimestamp = () => {
        const now = new Date();
        return `[${now.toLocaleTimeString()}]`;
    };

    const BASE_URL =
        import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

    const simulation = async () => {
        try {
            setIsActive(true);
            const logUpdates = [`${getTimestamp()} Flow started`];
            setLogs([...logUpdates]);

            const { data: flow } = await axios.post(`${BASE_URL}/start`);
            logUpdates.push(`${getTimestamp()} Initial reminder sent`);
            setLogs([...logUpdates]);

            await new Promise((resolve) => {
                logUpdates.push(`${getTimestamp()} Waiting for 10 seconds`);
                setLogs([...logUpdates]);
                setTimeout(resolve, 10000);
            });

            if (Math.random() > 0.5) {
                logUpdates.push(
                    `${getTimestamp()} User renewed. Thank you email sent. \nFlow ended`
                );
                await axios.put(`${BASE_URL}/update`, {
                    flowID: flow._id,
                    stage: "Completed",
                    outcome: "Renewed",
                    logs: "User renewed. Thank you email sent. \n Flow ended",
                });
                setLogs([...logUpdates]);
                setIsActive(false);
                return;
            } else {
                logUpdates.push(`${getTimestamp()} Subscription not renewed`);
            }

            logUpdates.push(`${getTimestamp()} Second reminder sent`);
            setLogs([...logUpdates]);
            await new Promise((resolve) => {
                logUpdates.push(`${getTimestamp()} Waiting for 10 seconds`);
                setLogs([...logUpdates]);
                setTimeout(resolve, 10000);
            });

            if (Math.random() > 0.5) {
                logUpdates.push(
                    `${getTimestamp()} User renewed. Thank you email sent. \nFlow ended`
                );
                await axios.put(`${BASE_URL}/update`, {
                    flowID: flow._id,
                    stage: "Completed",
                    outcome: "Renewed",
                    logs: "User renewed. Thank you email sent. \n Flow ended",
                });
                setLogs([...logUpdates]);
                setIsActive(false);
                return;
            } else {
                logUpdates.push(`${getTimestamp()} Subscription not renewed`);
                setLogs([...logUpdates]);
            }

            logUpdates.push(`${getTimestamp()} No further action. Flow ended.`);
            await axios.put(`${BASE_URL}/update`, {
                flowID: flow._id,
                stage: "Completed",
                outcome: "Not Renewed",
                logs: "Subscription Not Renewed",
            });
            setLogs([...logUpdates]);
            setIsActive(false);
        } catch (err) {
            setLogs((prevLogs) => [
                ...prevLogs,
                `${getTimestamp()} An error occurred during the simulation.`,
            ]);
            console.log(err);
            setIsActive(false);
        }
    };

    return (
        <div>
            <button onClick={simulation} disabled={isActive}>
                {isActive ? "Running..." : "Start Flow"}
            </button>
            <div className="logs">
                {logs.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default FlowSimulation;
