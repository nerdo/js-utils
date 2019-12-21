import babel from 'rollup-plugin-babel'

const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'build/index.js',
      format: 'umd',
      name: 'cal'
    }
	],
	plugins: [babel()]
}

export default config
