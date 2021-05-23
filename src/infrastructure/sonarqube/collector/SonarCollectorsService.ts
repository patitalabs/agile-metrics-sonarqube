import { SonarMetricConverter } from './SonarMetricConverter';
import { SonarService } from '../Types';
import { SaCollectorService } from '../../../domain/Types';
import {
  SaCollectorConfig,
  SaMetricItem,
} from '../../../domain/static-analysis/Types';

export class SonarCollectorsService implements SaCollectorService {
  constructor(private readonly sonarService: SonarService) {}

  public async fetch(
    saCollectorConfig: SaCollectorConfig
  ): Promise<SaMetricItem[]> {
    const projectMetrics = await this.sonarService.projectMetrics({
      teamName: saCollectorConfig.teamName,
      projectName: saCollectorConfig.projectName,
      since: saCollectorConfig.since,
    });

    return projectMetrics.map((metricItem) =>
      SonarMetricConverter.toMetricItem(metricItem)
    );
  }
}
