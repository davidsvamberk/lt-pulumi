# Example 1

Official quickstart tutorial for Azure cloud provider in TypeScript. 

__Prerequisites__
- Installed __npm__
- Installed __pulumi__ CLI
- Installed and configured __az__ CLI

Login in local mode to use local state backend:
```
pulumi login --local
```

Create new stack for Azure TypeScript:
```
pulumi new azure-typescript
```

Deploy new stack on cloud infrastructure:
```
pulumi up
```

Try to add tags to existing storage account:
```
tags: {
    "Environment": "Dev",
}
```

Deploy stack again to see the difference:
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

__To try__

```
for (let i = 0; i < 5; i++) {
    const account = new azure.storage.Account(`storage${i}`, {
        resourceGroupName: resourceGroup.name,
        accountTier: "Standard",
        accountReplicationType: "LRS"
    });    
}
```