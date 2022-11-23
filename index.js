#!/usr/bin/env node

import inquirer from "inquirer";
import {
    exec
} from "child_process"
import path from "path";
import fs from "fs";
import clui from "clui";
import chalk from "chalk";
import util from "util"

const execPromise = util.promisify(exec);

async function myCli(projectNameObj) {
    try {
        const {frame: fm} = await inquirer.prompt({
            name: "frame",
            message: `Please choose framework:`,
            type: 'list',
            choices: Object.keys(projectNameObj)
        })
        const projectName = projectNameObj[fm]
        // 实例化loading
        const Spinner = clui.Spinner;
        var loading = new Spinner('Removing directory...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

        const dir = path.resolve(process.cwd(), projectName)
        // 判断文件夹是否已经存在
        const exists = fs.existsSync(dir)
        if (exists) {
            const ans = await inquirer.prompt({
                name: "removeDir",
                message: `The "${projectName}" directory already exists, remove?`,
                type: 'confirm',
            })

            if (ans.removeDir) {

                loading.start();
                await execPromise(`rm -rf ${dir}`)
                loading.stop();

                console.log(chalk.cyan(`The "${projectName}" directory has been removed.`))
            }
        }

        // 从github下载
        const command = `git clone http://10.2.7.13/cli/${projectName}.git ${dir}`
        console.log(command)
        loading.message(`Cloning into ${projectName}...`);
        loading.start();
        await execPromise(command)

        loading.stop();

        console.log(`${chalk.cyan("Done!")}`)
        console.log(`${chalk.green("Success!")}`)
    } catch (err) {
        console.log(chalk.red(err))
    } finally {
        loading.stop();
    }
}

myCli({
    "Vue3.x": "ly-vue3-framework",
    // "Vue2.x": "ly-vue2-framework",
})