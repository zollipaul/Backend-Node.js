//import assert from 'assert';
import testMngr from '~/test/testManager';

describe('Data', () => {
  it('seedIfEmpty when already seeded', async () => {
    await testMngr.app.data.seedIfEmpty();
    await testMngr.app.data.seedIfEmpty();
  });
});
