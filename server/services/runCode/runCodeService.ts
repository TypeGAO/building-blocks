const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function runCode(userCode: string, dockerName: string): string {
//Run code on container
    //Add code to file
    execSync('echo' + userCode + '>> playerCode/' + dockerName + '.py');

    //Run code
    const fileName = 'playerCode/' + dockerName + '.py';
    let dExec = [
        'exec',
        dockerName,
        'python3',
        '-I',
        fileName
    ];

    const dockerRun = spawnSync('docker', test, {
        shell: true,
        stdio: ['inherit', 'pipe', 'pipe'],
        encoding: 'utf-8'
    });

    //Get output
    let output = '';

    if (dockerRun.status === 0) {
        output += dockerRun.output[1];
    } else {
        output += dockerRun.output[2];
    }

    return output;
}