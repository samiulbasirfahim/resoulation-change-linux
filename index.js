// import neccesary moduels
import chalkAnimation from "chalk-animation"
import chalk from "chalk"
import readline from "readline"
import os, { type } from "os"
import { exec } from "child_process"

// import from another file
import info from "./src/systemInfo.js"

const log = console.log

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

if (info.os !== "linux") {
	log(chalk.red("\nYou must be a linux user for run this..."))
	process.exit()
}

const changeResolution = () => {
	rl.question(
		chalk.green(
			`\nIf want to skip type skip, if want to exit type exit,\nPick a resoulation from above, Example of resoulation: 1920x1080... \nEnter new resolution: `
		),
		(answer) => {
			if (answer === info.resoultion) {
				log(
					chalk.yellow(
						`\nResolution is already set to ${info.resoultion}`
					)
				)
				return showAvailableResoutaion()
			} else if (answer === "skip") {
				log(chalk.yellow(`\nSkipping resolution change`))
				return process.exit()
			} else if (answer === "exit") {
				log(chalk.yellow("\nExiting..."))
				return rl.close()
			}
			exec(`xrandr -s ${answer}`, (err) => {
				if (err) {
					log(chalk.red("something went wrong"))
				} else {
					log(
						chalk.yellow(
							`\nChanging screen resolution to ${answer}`
						)
					)
				}
			})
		}
	)
}

const showAvailableResoutaion = () => {
	log(chalk.yellow(`\nCurrent screen resolution: ${info.resoultion}`))
	exec("xrandr", (err, stdout) => {
		if (err) {
			log(chalk.red(err))
		} else {
			const lines = stdout.split("\n")
			lines.splice(0, 2)
			const newString = lines.join("\n")
			log(chalk.yellow(`\nAvailable screen resolutions: \n${newString}`))
			changeResolution()
		}
	})
}

showAvailableResoutaion()
