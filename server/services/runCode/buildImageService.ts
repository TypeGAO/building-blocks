const express = require('express');
const { spawn, exec } = require('child_process');

export function buildImage(dockerName: string) {
    //Build docker image
    const buildImage = [
        'build',
        '-t',
        dockerName,
        './services/runCode'
    ];
    spawn('docker', buildImage);
}