---
title: Create a Service Now Incident
tags: [code, python]
---

A short sketch here to create an incident in Service Now. This uses the [Table API](https://www.servicenow.com/docs/bundle/xanadu-api-reference/page/integrate/inbound-rest/concept/c_TableAPI.html) 
to create an incident, passing a data object that includes the description and a priority.

## Code

The code uses the [requests](https://docs.python-requests.org/en/latest/index.html) library to post the data to the instance-specific url, passing a credential for that user which is stored as 
a user name and password in the environment. 

### request.py

```python
import requests 
import json
import os

data = {
    "short_description": "Short Desc",
    "description": "Long description of the problem",
    "urgency": "1",  # 1..3
    "impact": "1"    # 1..3
}

instance = "my-service-now-instance"  
url = f"https://{instance}.service-now.com/api/now/table/incident"
username = os.environ.get('SNOW_USER')
password = os.environ.get('SNOW_PW')

headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

response = requests.post(
    url,
    auth=(username, password),
    headers=headers,
    data=json.dumps(data)
)

if response.status_code == 200 or response.status_code == 201:
    result = response.json()
    ticket_number = result["result"]["number"]
    print(f"Ticket created successfully: {ticket_number}")
else:
    print(f"Failed to create ticket: {response.status_code}")
    print(response.text)
```
