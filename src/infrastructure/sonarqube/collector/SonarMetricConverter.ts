import { ProjectMetrics } from '../Types';
import { Utils } from '../../../utils/Utils';
import { SaMetricItem } from '../../../domain/static-analysis/Types';

export class SonarMetricConverter {
  static toMetricItem(projectMetrics: ProjectMetrics): SaMetricItem {
    return {
      id: Utils.toHash(
        `${projectMetrics.projectName}-${projectMetrics.createdAt.getTime()}`
      ),
      dataType: 'SAT',
      createdAt: projectMetrics.createdAt,
      ...projectMetrics,
    };
  }
}
