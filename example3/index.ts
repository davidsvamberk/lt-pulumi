import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const resourcePrefix = "example3"

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup(resourcePrefix, {
    location: "WestEurope"
});

const vnet = new azure.network.VirtualNetwork(`${resourcePrefix}-vnet`, {
    resourceGroupName: resourceGroup.name,
    addressSpaces: ["10.1.0.0/16"],
});

const subnet = new azure.network.Subnet(`${resourcePrefix}-subnet`, {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: vnet.name,
    addressPrefix: "10.1.0.0/24",
    serviceEndpoints: ["Microsoft.Storage", "Microsoft.Sql", "Microsoft.KeyVault"],
    enforcePrivateLinkEndpointNetworkPolicies: true
});

// Create an Azure resource (Storage Account)
const account = new azure.storage.Account(`${resourcePrefix}st`, {
    // The location for the storage account will be derived automatically from the resource group.
    resourceGroupName: resourceGroup.name,
    accountTier: "Standard",
    accountReplicationType: "LRS",
    enableHttpsTrafficOnly: true,
    networkRules: {
        defaultAction: "Deny",
        virtualNetworkSubnetIds: [subnet.id],
    },
});

const accountPrivateEndpoint = new azure.privatelink.Endpoint(`${resourcePrefix}-st-pe`, {
    resourceGroupName: resourceGroup.name,
    subnetId: subnet.id,
    privateServiceConnection: {
        name: `${resourcePrefix}-st-psc`,
        isManualConnection: false,
        privateConnectionResourceId: account.id,
        subresourceNames: ["blob"]
    },
});

const keyVault = new azure.keyvault.KeyVault(`${resourcePrefix}-kv`, {
    resourceGroupName: resourceGroup.name,
    skuName: "standard",
    tenantId: "269a1b55-b8e0-4721-9d49-ae9f28544118",
    networkAcls: {
        bypass: "AzureServices",
        defaultAction: "Deny",
        virtualNetworkSubnetIds: [subnet.id],
    }
});

const keyVaultPrivateEndpoint = new azure.privatelink.Endpoint(`${resourcePrefix}-kv-pe`, {
    resourceGroupName: resourceGroup.name,
    subnetId: subnet.id,
    privateServiceConnection: {
        name: `${resourcePrefix}-kv-psc`,
        isManualConnection: false,
        privateConnectionResourceId: keyVault.id,
        subresourceNames: ["vault"]
    },
});

// Export the connection string for the storage account
export const connectionString = account.primaryConnectionString;
export const accountIP = accountPrivateEndpoint.privateServiceConnection.privateIpAddress;
export const keyVaultIP = keyVaultPrivateEndpoint.privateServiceConnection.privateIpAddress;