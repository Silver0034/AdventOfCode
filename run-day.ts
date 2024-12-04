import { resolve } from 'path'

if (!process || !process.argv || !process.argv[2]) {
	console.log('Use the command "npm run day {#}" to run a specific day')
	process.exit(1)
}

const day = process.argv[2]

try {
	const dayDir = resolve(`./day-${day}`)

	// Change the current working directory to the day directory
	process.chdir(dayDir)

	// import and run the index file for the specified day: ./day-${day}/index.ts
	import(`./day-${day}/index.ts`).catch(console.error)
} catch (err) {
	console.log(`Day ${day} does not exist.`)
	process.exit(1)
}
