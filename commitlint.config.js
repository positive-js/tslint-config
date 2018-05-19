module.exports = {
    extends: ['@ptsecurity/commitlint-config'],
    parserPreset: './tools/changelog/config.js',
    rules: {
        'scope-enum': [ 
            2,
            'always',
            [
                'common',
                'config',
                'rules'
            ]
        ]
    }
};