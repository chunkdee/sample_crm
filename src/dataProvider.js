import fakeDataProvider from 'ra-data-fakerest';
import data from './data.json';

const dataProvider = fakeDataProvider(data, true);

export default dataProvider;
