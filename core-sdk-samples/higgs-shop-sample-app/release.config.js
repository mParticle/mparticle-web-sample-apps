/* eslint-disable no-template-curly-in-string */
module.exports = {
    branches: ['main'],
    tagFormat: 'v${version}',
    repositoryUrl:
        'https://github.com/mParticle/mparticle-web-sample-apps-internal',
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'angular',
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'angular',
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/exec',
            {
                prepareCmd: 'sh ./scripts/release.sh',
            },
        ],
        [
            '@semantic-release/github',
            {
                assets: ['dist/higgs-shop-sample-app.tar.gz'],
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
                message:
                    'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
    ],
};
