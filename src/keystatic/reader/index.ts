import { createReader } from '@keystatic/core/reader';
import { createGitHubReader } from '@keystatic/core/reader/github';
import keystaticConfig, { githubStorage } from '@root/keystatic.config';
import path from 'node:path';

const currentDir = new URL('.', import.meta.url).pathname;
const isProd = import.meta.env.PROD;
const githubPersonalToken = import.meta.env.GITHUB_PAT;

export const cms = isProd
  ? createGitHubReader(keystaticConfig, {
    repo: githubStorage.repo,
    // TODO create token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
    token: githubPersonalToken
  })
  : createReader(path.resolve(currentDir, '../../..'), keystaticConfig);