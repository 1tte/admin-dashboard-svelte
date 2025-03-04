const os = require("os");
const { exec } = require("child_process");

// Get System Info (RAM & Processes)
exports.getSystemInfo = (req, res) => {
    try {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2);

        // Detect OS and set the correct command
        let command;
        if (os.platform() === "win32") {
            command = "tasklist";
        } else {
            command = "ps -eo comm --sort=-%mem | head -n 11"; // Top 10 processes (Linux/Mac)
        }

        exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
                return res.json({ memoryUsage, processes: "Unable to fetch processes" });
            }

            let processes;
            if (os.platform() === "win32") {
                processes = stdout
                    .split("\n")
                    .slice(3) // Skip headers
                    .map((line) => line.trim().split(/\s+/)[0]) // Extract process name
                    .filter(Boolean) // Remove empty lines
                    .slice(0, 10); // Limit to 10 processes
            } else {
                processes = stdout
                    .split("\n")
                    .slice(1) // Skip headers
                    .map((line) => line.trim()) // Trim whitespace
                    .filter(Boolean) // Remove empty lines
                    .slice(0, 10); // Limit to 10 processes
            }

            res.json({ memoryUsage, processes });
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching system info", error: error.message });
    }
};
