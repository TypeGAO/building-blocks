const express = require('express');
const { spawn, exec } = require('child_process');

export function runCode(userCode: string, dockerName: string): string {
    //Build docker image
    let buildImage = 'docker build -t ' + dockerName + ' .';
    exec(buildImage);

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

    const dockerRun = spawn('docker', dockerRunCommand, {
        stdio: 'pipe'
    });

    dockerRun.stdin.write(userCode);

    let dockerExec = 'docker exec ' + dockerName + ' python -c -I ' + userCode;

    exec(dockerExec);

    dockerRun.stdin.end();

    //Get output
    let output = '';
    let errorOutput = '';

    dockerRun.stdout.on('data', data => {
        output += data.toString();
    });

    dockerRun.stderr.on('data', data => {
        errorOutput += data.toString();
    });

    dockerRun.on('close', code => {
        if (code === 0) {
            console.log('Code execution successful.');
            console.log('Output:', output);
            return output;
        } else {
            console.error('Code execution failed. Exit code:', code);
            console.error('Error output:', errorOutput);
            return errorOutput;           
        }
    });

    dockerRun.on('error', err => {
        console.error('Error while spawning Docker process:', err);
        return errorOutput;
    });

    return output;
}