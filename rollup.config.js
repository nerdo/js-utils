import babel from 'rollup-plugin-babel'

const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'build/index.js',
      format: 'umd',
      name: 'Cal'
    }
	],
	plugins: [babel()]
}

export default config
