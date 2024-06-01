const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const oneLinerJoke = require('one-liner-joke');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));


app.get('/getjoke', (req, res) => {
    let getRandomJoke = oneLinerJoke.getRandomJoke({
        'exclude_tags': []
    });

    console.log(chalk.hex('#03befc').bold("~ Fetched a jokes"));
    console.log(chalk.magenta(JSON.stringify(getRandomJoke)));

    res.json(getRandomJoke);
});

app.listen(8080, () => {
    console.log(chalk.hex('#ffd000').underline.bold("--- SERVER RUNNING AT PORT 8080 ---"));
});