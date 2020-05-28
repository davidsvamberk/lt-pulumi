# Example 2

Pulumi script which creates storage account and key vault in with private endpoints for Azure cloud provider in TypeScript. 

__Prerequisites__
- Installed __npm__
- Installed __pulumi__ CLI
- Installed and configured __az__ CLI


Run npm install to get required packages:
```
npm install
```

Login in local mode to use local state backend:
```
pulumi login --local
```

Pulimi needs to initiate the stack:
```
pulumi stack init
```

Deploy stack on cloud infrastructure:
```
pulumi up
```

Clean up and tear down the resources that are part of stack:
```
pulumi destroy
```

Delete the stack itself:
```
pulumi stack rm
```