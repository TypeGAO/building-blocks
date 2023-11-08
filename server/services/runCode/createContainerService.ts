const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function createContainer(dockerName: string) {
    //Build docker image
    let buildImage = 'docker build ./services/runCode';
    execSync(buildImage);

    //Create file
    execSync("mkdir playerCode\\" + dockerName);

    execSync('echo print("hello") > playerCode/' + dockerName + '/test.py');

    const runContainer = 'docker run --name ' + dockerName + ' --mount type=bind,source=%cd%/playerCode/' + dockerName + ',target=/sandbox/test,readonly --rm -d -t -i python';
    console.log(runContainer);

    //Run container
    execSync(runContainer);
}