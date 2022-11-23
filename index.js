#!/usr/bin/env node
 // const {program} = require("commander");
// const { default: inquirer } = require("inquirer");

import {
    program
} from "commander";
import inquirer from "inquirer";
import {
    exec,
    execSync
} from "child_process"
import path from "path";
import fs from "fs";
import clui from "clui";
import chalk from "chalk";

async function myCli(projectName) {
    // 实例化loading
    const Spinner = clui.Spinner;
    var countdown = new Spinner('Removing directory...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

    const dir = path.resolve(process.cwd(), "./vue3-ts-vite-framework")
    const exists = fs.existsSync(dir)
    if (exists) {
        try {
            const ans = await inquirer.prompt({
                name: "removeDir",
                message: `The "${projectName}" directory already exists, remove?`,
                type: 'confirm',
            })

            if (ans.removeDir) {
                countdown.start();
                execSync(`rm -rf ${dir}`)
                countdown.stop();
                console.log(chalk.cyan(`The "${projectName}" directory has been removed.`))
            }
        } catch (err) {
            console.log("err", err)
        }
    }

countdown.message(`Cloning into ${projectName}...`);
countdown.start();
    const command = `git clone https://github.com/LiuerQin/${projectName}.git ${dir}`
    exec(command, (err, stdout, stderr) => {

        countdown.stop();

        if (err) {
            // console.log(typeof err, err)
            console.log(chalk.red(err))
        } else {
            console.log(`${chalk.cyan("Done!")}`)
            console.log(`${chalk.green("Success!")}`)
        }
        return
    })
}

myCli("vue3-ts-vite-framework")