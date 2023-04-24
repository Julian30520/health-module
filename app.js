const express = require('express');
const childProcess = require('child_process');
const app = express();
const port = 3000;

app.get(`/api/process/:pname`, (req, res) => {
  const processName = req.params.pname;

  // Ajoutez le code pour vérifier le processus ici
  childProcess.exec('tasklist', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const isAlive = stdout.includes(processName);
    const reponse = {
      isAlive
    };
    res.json(reponse);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});