import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import { execSync } from 'child_process'

try {
	// Get all directories in the current working directory
	const directories = readdirSync('.').filter((dir) => {
		const fullPath = resolve(dir)
		return statSync(fullPath).isDirectory() && /^day-\d+$/.test(dir)
	})

	if (directories.length === 0) {
		console.log('No day directories found.')
		process.exit(1)
	}

	// Loop through each directory and run the index.ts file
	directories.forEach((dir) => {
		const dayDir = resolve(`./${dir}`)
		process.chdir(dayDir)

		console.log(`Running ${dir}/index.ts...`)
		try {
			execSync('npx tsx ./index.ts', { stdio: 'inherit' })
		} catch (err) {
			console.error(`Error running ${dir}/index.ts:`, err)
		}

		// Change back to the original directory
		process.chdir('..')
	})
} catch (err) {
	console.error('Error:', err)
	process.exit(1)
}
