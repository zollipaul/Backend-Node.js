import assert from 'assert';

import {convertAndRespond} from '../HttpUtils';

describe('HttpUtils', () => {

  it('convertAndRespond error without name ', () => {
    let error = {};

    convertAndRespond(context, error);
    assert.equal(context.status, 500);

  });
});
