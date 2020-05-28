# Example 3

Policy as Code for Azure cloud provider in TypeScript.

See: https://www.pulumi.com/blog/automatically-enforcing-aws-resource-tagging-policies/

__Prerequisites__
- Installed __npm__
- Installed __pulumi__ CLI
- Installed and configured __az__ CLI

Run npm install to get required packages:
```
npm install
cd .policy
npm install
cd ..
```

Login in local mode to use local state backend:
```
pulumi login --local
```

Pulimi needs to initiate the stack:
```
pulumi stack init
```

Preview stack changes with manually set policy:
```
pulumi preview \
    --policy-pack=.policy \
    --policy-pack-config=policy-config.json
```

Add call of function registerAutoTags to fulfill policy:
```
import { registerAutoTags } from "./autotag";

registerAutoTags({
    "user:Project": pulumi.getProject(),
    "user:Stack": pulumi.getStack(),
});
```

Now everithing should be OK:
```
pulumi preview \
    --policy-pack=.policy \
    --policy-pack-config=policy-config.json
```

Deploy stack on cloud infrastructure:
```
pulumi up \
    --policy-pack=.policy \
    --policy-pack-config=policy-config.json
```

Clean up and tear down the resources that are part of stack:
```
pulumi destroy
```

Delete the stack itself:
```
pulumi stack rm
```