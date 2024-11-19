import React, { useState } from "react";
import axios from "axios";

const FlowSimulation = () => {
    const [logs, setLogs] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const simulation = async () => {
        try {
            setIsActive(true);
            const logUpdates = ["Flow started"];
            setLogs([...logUpdates]);

            const { data: flow } = await axios.post(
                "http://localhost:3000/start"
            );
            logUpdates.push("Initial reminder sent");
            setLogs([...logUpdates]);

            await new Promise((resolve) => {
                logUpdates.push("Waiting for 10 seconds");
                setLogs([...logUpdates]);
                setTimeout(resolve, 10000);
            });

            if (Math.random() > 0.5) {
                logUpdates.push(
                    "User renewed. Thank you email sent. \n Flow ended"
                );
                await axios.put("http://localhost:3000/update", {
                    flowID: flow._id,
                    stage: "Completed",
                    outcome: "Renewed",
                    logs: "User renewed. Thank you email sent. \n Flow ended",
                });
                setLogs([...logUpdates]);
                setIsActive(false);
                return;
            } else {
                logUpdates.push("Subscription not renewed");
            }

            logUpdates.push("Second reminder sent");
            setLogs([...logUpdates]);
            await new Promise((resolve) => {
                logUpdates.push("Waiting for 10 seconds");
                setLogs([...logUpdates]);
                setTimeout(resolve, 10000);
            });

            if (Math.random() > 0.5) {
                logUpdates.push(
                    "User renewed. Thank you email sent. \n Flow ended"
                );
                await axios.put("http://localhost:3000/update", {
                    flowID: flow._id,
                    stage: "Completed",
                    outcome: "Renewed",
                    logs: "User renewed. Thank you email sent. \n Flow ended",
                });
                setLogs([...logUpdates]);
                setIsActive(false);
                return;
            } else {
                logUpdates.push("Subscription not renewed");
                setLogs([...logUpdates]);
            }

            logUpdates.push("No further action. Flow ended.");
            await axios.put("http://localhost:3000/update", {
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
                "An error occurred during the simulation.",
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
