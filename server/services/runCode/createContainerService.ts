const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function createContainer(dockerName: string) {
    //Build docker image
    let buildImage = 'docker build ./services/runCode';
    execSync(buildImage);

    //Create file
    execSync('echo > test.py');

    //Run container
    execSync('docker run --name ' + dockerName + ' --rm -d -t -i python');
}