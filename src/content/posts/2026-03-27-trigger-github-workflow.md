---
title: Trigger Github Workflow
tags: [ci, github]
---

Normally running a github workflow happens either automatically as a result of a commit or PR merge or as a manual invokation if dispatch is configured for that 
workflow. Here I needed to kick off a workflow from another system and then query the status of the workflow until it completes so that I can either pass or fail 
the calling process. This requires the use of the [github API](https://docs.github.com/en/rest/actions/workflows) and running the code below requires that a 
github token is available to provide authorization for the workflow to run.

## Code

```bash

WORKFLOWREF="main"

endpoint="https://api.github.com/repos/my-lovely-repo/actions/workflows/build.yml/dispatches"
payload=$(jq -n \
  --arg ref "$WORKFLOWREF" \
  {
    ref: $ref,
    return_run_details: true
  }
')

response=$(curl -fsSL \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GithubToken" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "$endpoint" \
  -d "$payload")

```

The payload for this is a bit overkill for what I have demonstrated here but using jq is a useful technique if more elaborate versions of 
the payload need to be constructed, for example, if any inputs need to be specified when starting the workflow.
Once we have the response we can use it to get the run id and use that to query for the run status and the conclusion of the workflow run. 

```bash

run_id=$(echo "$response" | jq -r '.workflow_run_id // empty')

if [[ -z "$run_id" ]]; then
  echo "workflow_run_id was not returned by workflow API"
  exit 1
fi

while true; do
  response=$(curl -fsSL \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GithubToken" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/my-lovely-repo/actions/runs/$run_id")

  run_status=$(echo "$response" | jq -r '.status')
  conclusion=$(echo "$response" | jq -r '.conclusion')

  if [[ "$run_status" == "completed" ]]; then
    if [[ "$conclusion" == "success" ]]; then
      echo "Workflow run completed successfully."
    else
      echo "Workflow run completed with conclusion: $conclusion"
      exit 1
    fi
    break
  else
    echo "Current workflow run status: $run_status. Checking again in 60 seconds..."
    sleep 60
  fi
done
```

Status tells us when the workflow has completed and conclusion tells us if the workflow succeeded or there were any errors.
