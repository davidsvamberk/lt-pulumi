/**
 * isTaggable returns true if the given resource type is an Azure resource that supports tags.
 */
export function isTaggable(t: string): boolean {
    return (taggableResourceTypes.indexOf(t) !== -1);
}

// taggableResourceTypes is a list of Azure type tokens that are taggable.
const taggableResourceTypes = [
    "azure:core/resourceGroup:ResourceGroup",
    "azure:network/virtualNetwork:VirtualNetwork",
    "azure:keyvault/keyVault:KeyVault",
    "azure:storage/account:Account",
];