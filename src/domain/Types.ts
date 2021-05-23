import { SaCollectorConfig, SaMetricItem } from './static-analysis/Types';

export interface TeamMetricsRequest {
  shouldUpdateEntries: boolean;
  config: any;
}

export interface CoreMetricsService {
  publish(entries: any, shouldReplaceEntries: boolean);
}

export interface SaCollectorService {
  fetch(collectorConfig: SaCollectorConfig): Promise<SaMetricItem[]>;
}
