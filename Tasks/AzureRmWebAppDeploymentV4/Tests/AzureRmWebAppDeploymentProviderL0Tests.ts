import tl = require('vsts-task-lib');
import { DeploymentFactory } from '../deploymentProvider/DeploymentFactory';
import { AzureRmWebAppDeploymentProvider } from '../deploymentProvider/AzureRmWebAppDeploymentProvider'
import { IWebAppDeploymentProvider } from '../deploymentProvider/IWebAppDeploymentProvider';
import { TaskParametersUtility, TaskParameters, DeploymentType } from '../operations/TaskParameters';
import { stringify } from 'querystring';
import { PackageType } from 'webdeployment-common/packageUtility';
import { getMockEndpoint, mockAzureAppServiceTests, mockKuduServiceTests, mockAzureARMResourcesTests, mockAzureARMPreDeploymentSteps} from 'azure-arm-rest/tests/mock_utils';

getMockEndpoint();
mockAzureAppServiceTests();
mockKuduServiceTests();
mockAzureARMPreDeploymentSteps();

export class AzureRmWebAppDeploymentProviderL0Tests  {

    public static async startAzureRmWebAppDeploymentProviderL0Tests() {
        await AzureRmWebAppDeploymentProviderL0Tests.testForPreDeploymentSteps();
        await AzureRmWebAppDeploymentProviderL0Tests.testForPreDeploymentStepsWithSlotEnabled();
        await AzureRmWebAppDeploymentProviderL0Tests.testForUpdateDeploymentStatus();
    }

    public static async testForPreDeploymentSteps() {
        try {
            var taskParameters: TaskParameters = TaskParametersUtility.getParameters();
            var azureRmWebAppDeploymentProvider : AzureRmWebAppDeploymentProvider  = new AzureRmWebAppDeploymentProvider(taskParameters);
            await azureRmWebAppDeploymentProvider.PreDeploymentStep();
        } catch(error) {
            tl.setResult(tl.TaskResult.Failed, 'PreDeployment steps should succeeded but failed with error');
        }
    }

    public static async testForPreDeploymentStepsWithSlotEnabled() {
        try {
            var taskParameters: TaskParameters = TaskParametersUtility.getParameters();
            taskParameters.DeployToSlotOrASEFlag = true;
            taskParameters.ResourceGroupName = "MOCK_RESOURCE_GROUP_NAME";
            var azureRmWebAppDeploymentProvider : AzureRmWebAppDeploymentProvider  = new AzureRmWebAppDeploymentProvider(taskParameters);
            await azureRmWebAppDeploymentProvider.PreDeploymentStep();
            tl.setResult(tl.TaskResult.Succeeded, 'PreDeployment steps with slot enabled should succeeded');
        } catch(error) {
            tl.setResult(tl.TaskResult.Failed, 'PreDeployment steps with slot enabled failed with error');
        }
    }

    public static async testForUpdateDeploymentStatus() {
        try {
            var taskParameters: TaskParameters = TaskParametersUtility.getParameters();
            var azureRmWebAppDeploymentProvider : AzureRmWebAppDeploymentProvider  = new AzureRmWebAppDeploymentProvider(taskParameters);
            await azureRmWebAppDeploymentProvider.PreDeploymentStep();
            await azureRmWebAppDeploymentProvider.UpdateDeploymentStatus(true);
        } catch(error) {
            tl.setResult(tl.TaskResult.Failed, 'UpdateDeploymentStatus steps should succeeded but failed with error');
        }
    }

}

AzureRmWebAppDeploymentProviderL0Tests.startAzureRmWebAppDeploymentProviderL0Tests();