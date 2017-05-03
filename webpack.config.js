const config = {
    entry: {
        index: './scripts/index.js',
        autocomplete: './scripts/autocomplete.js'
    },
    output: {
        filename: 'dist/[name].bundle.js'
    }
};

module.exports = config;