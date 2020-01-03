import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'build/nerdo-utils.js',
      format: 'umd',
      name: 'nerdo-utils'
    },
		{
			file: 'build/nerdo-utils.min.js',
      format: 'umd',
      name: 'nerdo-utils'
    }
	],
	plugins: [
		babel(),
		terser({
			include: [
				/^.+\.min\.js$/
			]
		})
	]
}

export default config
