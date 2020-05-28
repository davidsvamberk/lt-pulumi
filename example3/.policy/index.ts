import * as policy from "@pulumi/policy";
import { isTaggable } from "../taggable";

new policy.PolicyPack("tags-policies", {
    policies: [{
        name: "check-required-tags",
        description: "Ensure required tags are present on all resources.",
        configSchema: {
            properties: {
                requiredTags: {
                    type: "array",
                    items: { type: "string" },
                },
            },
        },
        validateResource: (args, reportViolation) => {
            const config = args.getConfig<TagsPolicyConfig>();
            const requiredTags = config.requiredTags;
            console.log(`INFO: Type of resource: ${args.type}`);
            if (requiredTags && isTaggable(args.type)) {
                const ts = args.props["tags"];
                for (const rt of requiredTags) {
                    if (!ts || !ts[rt]) {
                        reportViolation(
                            `Taggable resource '${args.urn}' is missing required tag '${rt}'`);
                    }
                }
            }
        },
    }],
});

interface TagsPolicyConfig {
    requiredTags?: string[];
}