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

    execSync('docker run --name test --rm -d -t -i test');

    let code = '"' + userCode + '"';
    //let dockerExec = 'docker exec ' + dockerName + ' python -c ' + code;

    let dExec = [
        'exec',
        dockerName,
        'python',
        '-c',
        code
    ];

    const dockerRun = spawn('docker', dExec);

    //Get output
    let output = '';
    let errorOutput = '';

    dockerRun.stdout.on('data', (data: any) => {
        console.log("date: " + data);
        output += data.toString();
    });

    dockerRun.stderr.on('data', (data: any) => {
        errorOutput += data.toString();
    });

    dockerRun.on('close', (code: any) => {
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

    dockerRun.on('error', (err: any) => {
        console.error('Error while spawning Docker process:', err);
        return errorOutput;
    });

    return output;
}