const Plugin = require('.');

describe('Plugin', () => {

  describe('Using pseudo parameters', () => {
    let serverlessPseudoParamsPlugin;
    let resultTemplate;

    beforeEach(() => {
      const serverless = {
        cli: {
          log: () => {},
          consoleLog: () => {}
        },
        service: {
          provider: {
            compiledCloudFormationTemplate: {},
          }
        },
      };
      serverless.service.provider.compiledCloudFormationTemplate = { Resources: {
        acmeResource: {
          Type: "AWS::Foo::Bar",
          Properties: {
            AccountId: "#{AWS::AccountId}",
            Region: "#{AWS::Region}",
            NotificationARNs: "#{AWS::NotificationARNs}",
            NoValue: "#{AWS::NoValue}",
            Partition: "#{AWS::Partition}",
            StackId: "#{AWS::StackId}",
            StackName: "#{AWS::StackName}",
            URLSuffix: "#{AWS::URLSuffix}",
          }
        }
      } };
      serverlessPseudoParamsPlugin = new Plugin(serverless);
      serverlessPseudoParamsPlugin.serverless.service.service = 'foo-service';
      serverlessPseudoParamsPlugin.addParameters();
      resultTemplate = serverlessPseudoParamsPlugin.serverless.service.provider.compiledCloudFormationTemplate;
      expect(Object.keys(resultTemplate.Resources.acmeResource.Properties).length).toEqual(8);
    });

    it('replaces #{AWS::[VAR]} with the correct CF pseudo parameter', () => {
      expect(Object.keys(resultTemplate.Resources.acmeResource.Properties).length).toEqual(8);
    });

    it('replaces #{AWS::AccountId} with the ${AWS::AccountId} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.AccountId).toEqual({ 'Fn::Sub': '${AWS::AccountId}' });
    });
    it('replaces #{AWS::Region} with the ${AWS::Region} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.Region).toEqual({ 'Fn::Sub': '${AWS::Region}' });
    });
    it('replaces #{AWS::NotificationARNs} with the ${AWS::NotificationARNs} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.NotificationARNs).toEqual({ 'Fn::Sub': '${AWS::NotificationARNs}' });
    });
    it('replaces #{AWS::NoValue} with the ${AWS::NoValue} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.NoValue).toEqual({ 'Fn::Sub': '${AWS::NoValue}' });
    });
    it('replaces #{AWS::Partition} with the ${AWS::Partition} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.Partition).toEqual({ 'Fn::Sub': '${AWS::Partition}' });
    });
    it('replaces #{AWS::StackId} with the ${AWS::StackId} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.StackId).toEqual({ 'Fn::Sub': '${AWS::StackId}' });
    });
    it('replaces #{AWS::StackName} with the ${AWS::StackName} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.StackName).toEqual({ 'Fn::Sub': '${AWS::StackName}' });
    });
    it('replaces #{AWS::URLSuffix} with the ${AWS::URLSuffix} pseudo parameter', () => {
      expect(resultTemplate.Resources.acmeResource.Properties.URLSuffix).toEqual({ 'Fn::Sub': '${AWS::URLSuffix}' });
    });

  });


});
