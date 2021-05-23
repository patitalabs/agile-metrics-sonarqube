import { SonarRepositoryImpl } from './SonarRepositoryImpl';
import * as searchHistoryFakeData from './test/search-history-response.json';
import * as searchProjectFakeData from './test/search-project-analysis.json';
import { SonarClient, SonarRepository } from './Types';

describe('SonarRepositoryImpl', () => {
  const sonarClient: SonarClient = {
    getData: (url): Promise<any> => {
      let result = {};
      if (/.*api\/measures\/search_history/.test(url)) {
        result = searchHistoryFakeData;
      } else if (/.*api\/project_analyses\/search/.test(url)) {
        result = searchProjectFakeData;
      }
      return Promise.resolve(result);
    },
  };
  const sonarRepository: SonarRepository = new SonarRepositoryImpl(sonarClient);

  it('should get projectMetrics', async () => {
    const sonarConfig = {
      projectName: 'someProject',
      since: '2018-11-20',
      teamName: 'someTeam',
    };

    const data = await sonarRepository.projectMetrics(sonarConfig);
    expect(data).toMatchSnapshot();
  });
});
