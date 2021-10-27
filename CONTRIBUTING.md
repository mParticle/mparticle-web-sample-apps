# Contributing

When contributing to this repository, you may first want to discuss your intended change via an issue or, if available, by communication through the mParticle CSM representative assigned to your account. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Follow Semantic release guidelines for branch name, PR title (detailed bellow), and commit message
2. Ensure any unit tests and/or github actions run successfully on your branch.
3. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
4. Respond to code review communication until a member of the mParticle team provides an approval.
5. The mParticle team will merge the Pull Request and include it in the next release.

## PR Title and Commit Convention
PR titles should follow [conventional commit standards](https://www.conventionalcommits.org/). This helps automate the release process.

The standard format for commit messages is as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

The following lists the different `types` allowed in the commit message:

-   feat: A new feature (automatic minor release)
-   fix: A bug fix (automatic patch release)
-   docs: Documentation only changes
-   style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   refactor: A code change that neither fixes a bug nor adds a feature
-   perf: A code change that improves performance
-   test: Adding missing or correcting existing tests
-   chore: Changes that don't modify src or test files, such as automatic documentation generation, or building latest assets
-   ci: Changes to CI configuration files/scripts
-   revert: Revert commit
-   build: Changes that affect the build system or other dependencies

In the footer, if there is a breaking change, start your footer with `BREAKING CHANGE:` followed by a description.

## Code of Conduct

View our shared Code of Conduct [here]: https://github.com/mParticle/docs/blob/development/CODE_OF_CONDUCT.md
