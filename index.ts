import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const gh = new github.GitHub(core.getInput('token'));

  const {data: deployments} = await gh.repos.listDeployments({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    ref: github.context.ref,
  });
  const deployment = deployments[0];

  if (deployment) {
    core.setOutput('url', deployment.url);
    core.setOutput('deployment_id', deployment.id.toString());
  } else {
    core.setFailed('No deployment found')
  }
}

run().catch((e) => {
  core.setFailed(e.message);
});
