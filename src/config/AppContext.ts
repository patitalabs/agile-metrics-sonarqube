import { CoreMetricsClientImpl } from '../infrastructure/core-metrics/CoreMetricsClientImpl';
import { AppConfig } from './AppConfig';
import { CoreMetricsService, SaCollectorService } from '../domain/Types';
import { ApiMetricsService } from '../domain/static-analysis/ApiMetricsService';
import { SonarService } from '../infrastructure/sonarqube/Types';
import { SonarClientImpl } from '../infrastructure/sonarqube/SonarClientImpl';
import { SonarRepositoryImpl } from '../infrastructure/sonarqube/SonarRepositoryImpl';
import { SonarServiceImpl } from '../infrastructure/sonarqube/SonarServiceImpl';
import { SonarCollectorsService } from '../infrastructure/sonarqube/collector/SonarCollectorsService';

function coreMetricsService(): CoreMetricsService {
  return new CoreMetricsClientImpl({
    host: AppConfig.coreMetricsUrl(),
  });
}

function staCollectorService(): SaCollectorService {
  return new SonarCollectorsService(sonarqubeService());
}

function sonarqubeService(): SonarService {
  const sonarClient = new SonarClientImpl({
    host: `${AppConfig.sonarqubeUrl()}`,
  });
  const sonarRepository = new SonarRepositoryImpl(sonarClient);
  return new SonarServiceImpl(sonarRepository);
}

function apiMetricsServiceInstance(): ApiMetricsService {
  return new ApiMetricsService(coreMetricsService(), staCollectorService());
}

export const appContext = Object.freeze({
  apiMetricsService: apiMetricsServiceInstance(),
});
