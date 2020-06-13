/* eslint-disable import/namespace */
import * as fetch from 'utils/fetch';

fetch.fetchUserRssList = jest.fn();
fetch.deleteUserRss = jest.fn();
fetch.fetchAllRssList = jest.fn(() => {
  return [{}];
});
