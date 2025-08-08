const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // index.html serve

app.post("/run", (req, res) => {
    const cmd = req.body.cmd;

    exec(cmd, { cwd: process.cwd(), shell: "bash" }, (error, stdout, stderr) => {
        let output = "";
        if (stdout) output += stdout;
        if (stderr) output += stderr;
        if (error && !stderr) output += error.message;

        // Linux va Windows newline formatini birlashtirish
        output = output.replace(/\r?\n/g, "\n");
        res.send(output);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT} da ishlayapti`));
