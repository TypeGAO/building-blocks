const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function createContainer(dockerName: string) {
    //Build docker image
    let buildImage = 'docker build ./services/runCode';
    execSync(buildImage);

    //Create file
    execSync('echo >> test.py');

    const runContainer = 'docker run --name ' + dockerName + ' -v "$(pwd)/playerCode/' + dockerName + '.py:/sandbox/' + dockerName + '.py" --rm -d -t -i python';
    console.log(runContainer);

    //Run container
    execSync(runContainer);
}