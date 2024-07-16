import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig, { githubStorage } from '@root/keystatic.config';

export const cms = import.meta.env.PROD
  ? createGitHubReader(keystaticConfig, {
    repo: githubStorage.repo,
    // TODO create token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
    token: process.env.GITHUB_PAT
  })
  : createReader(process.cwd(), keystaticConfig);