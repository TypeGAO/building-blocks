const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function runCode(userCode: string, dockerName: string): string {
    //Run code on container
    const code = `"${userCode}"`;

    //console.log("code1: " + code);

    let dExec = [
        'exec',
        dockerName,
        'python3',
        '-I',
        '-c',
        code
    ];

    let test = ['exec ' + dockerName + ' python3 -I -c ' + code];

    const dockerRun = spawnSync('docker', test, {
        shell: true,
        stdio: ['inherit', 'pipe', 'pipe'],
        encoding: 'utf-8'
    });

    //console.log(dockerRun);

    //Get output
    let output = '';

    console.log("code2: " + test);

    if (dockerRun.status === 0) {
        output += dockerRun.output[1];
    } else {
        output += dockerRun.output[2];
    }

    console.log("outut: " + output);

    return output;
}