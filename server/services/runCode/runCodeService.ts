const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function runCode(userCode: string, dockerName: string): string {
    //Build docker image
    let buildImage = 'docker build -t ' + dockerName + ' ./services/runCode';
    execSync(buildImage);

    //Run container
    const dockerRunCommand = [
        'run',
        '--name',
        dockerName,
        '--rm',
        '-d',
        '-t',
        '-i',
        dockerName
    ];

    execSync('docker run --name ' + dockerName + ' --rm -d -t -i ' + dockerName);

    //Run code on container
    let code = '"' + userCode + '"';

    let dExec = [
        'exec',
        dockerName,
        'python',
        '-c',
        code
    ];

    const dockerRun = spawnSync('docker', dExec,{ 
        shell: true,
        stdio: ['inherit', 'pipe', 'pipe'],
        encoding: 'utf-8' 
    });

    //Close container
    execSync('docker container kill ' + dockerName);

    //Get output
    let output = '';


    if(dockerRun.status === 0){
        output += dockerRun.output[1];
    } else {
        output += dockerRun.output[2];
    }

    return output;
}