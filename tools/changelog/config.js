module.exports = {
    changelogOpts: {
        // conventional-changelog options go here
        preset: 'angular',
        releaseCount: 1
    },
    writerOpts: {
        transform: (commit, context) => {

            var issues = [];

            if (commit.type === 'feat') {
                commit.type = 'Features';
            } else if (commit.type === 'fix') {
                commit.type = 'Bug Fixes';
            } else if (commit.type === 'perf') {
                commit.type = 'Performance Improvements';
            } else if (commit.type === 'revert') {
                commit.type = 'Reverts';
            } else if (commit.type === 'docs') {
                commit.type = 'Documentation';
            } else if (commit.type === 'style') {
                commit.type = 'Styles';
            } else if (commit.type === 'refactor') {
                commit.type = 'Code Refactoring';
            } else if (commit.type === 'test') {
                commit.type = 'Tests';
            } else if (commit.type === 'chore') {
                commit.type = 'Chores';
            } else {
                return;
            }

            commit.notes.forEach((note) => {
                note.title = 'BREAKING CHANGES';
            });

            if (commit.scope === '*') {
                commit.scope = '';
            }

            if (typeof commit.hash === 'string') {
                commit.hash = commit.hash.substring(0, 7);
            }

            if (typeof commit.subject === 'string') {
                commit.subject = commit.subject.substring(0, 120);

                let url = context.repository ?
                    `${context.host}/${context.owner}/${context.repository}` :
                    context.repoUrl;

                if (url) {
                    url = `${url}/issues/`;
                    // Issue URLs.
                    commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
                        issues.push(issue);
                        return `[#${issue}](${url}${issue})`;
                    });
                }

                if (context.host) {
                    // User URLs.
                    commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g, '[@$1](' + context.host + '/$1)');
                }
            }

            return commit;
        }
    }
};
