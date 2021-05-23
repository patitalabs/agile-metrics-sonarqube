import { Converters } from './Converters';
import {
  ProjectMetrics,
  SonarClient,
  SonarConfig,
  SonarRepository,
} from './Types';

export class SonarRepositoryImpl implements SonarRepository {
  constructor(private readonly sonarClient: SonarClient) {}

  async projectMetrics(sonarConfig: SonarConfig): Promise<ProjectMetrics[]> {
    // TODO pagination
    const measures = await this.sonarClient.getData(
      SonarRepositoryImpl.searchHistoryUrl(sonarConfig)
    );
    const analysisHistory = await this.sonarClient.getData(
      SonarRepositoryImpl.analysisHistoryUrl(sonarConfig)
    );

    return Converters.toProjectMetrics(measures, analysisHistory, sonarConfig);
  }

  private static analysisHistoryUrl(sonarConfig: SonarConfig) {
    return `/api/project_analyses/search?category=VERSION&project=${
      sonarConfig.projectName
    }&ps=499&from=${sonarConfig.since}${this.untilParam(sonarConfig)}`;
  }

  private static searchHistoryUrl(sonarConfig: SonarConfig): string {
    return `/api/measures/search_history?component=${
      sonarConfig.projectName
    }&metrics=alert_status,quality_gate_details,bugs,new_bugs,reliability_rating,new_reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,new_security_rating,code_smells,new_code_smells,sqale_rating,new_maintainability_rating,sqale_index,new_technical_debt,coverage,new_coverage,new_lines_to_cover,tests,duplicated_lines_density,new_duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution,projects,new_lines&ps=499&from=${
      sonarConfig.since
    }${this.untilParam(sonarConfig)}`;
  }

  private static untilParam(sonarConfig: SonarConfig) {
    let untilParam = '';
    if (sonarConfig.until) {
      untilParam = `&to=${sonarConfig.until}`;
    }
    return untilParam;
  }
}
