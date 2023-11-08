const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function runCode(userCode: string, dockerName: string): string {
//Run code on container
    //Add code to file
    console.log('echo "' + userCode + '" > playerCode/' + dockerName + '/test.py');
    execSync('echo "' + userCode + '" > playerCode/' + dockerName + '/test.py');

    //Run code
    const fileName = 'test/test.py';
    let dExec = [
        'exec',
        dockerName,
        'python3',
        '-I',
        fileName
    ];

    const dockerRun = spawnSync('docker', dExec, {
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