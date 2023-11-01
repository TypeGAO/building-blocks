const express = require('express');
const { spawn, spawnSync, execSync, exec } = require('child_process');

export function killContainer(dockerName: string) {
    //Close container
    execSync('docker container kill ' + dockerName);
}