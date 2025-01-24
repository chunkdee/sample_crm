import fakeDataProvider from 'ra-data-fakerest';
import dataObj from './data2';
import sampleData from './datagenerator/generateSampleData2';

const dataProvider = fakeDataProvider(sampleData, true);

//const dataProvider = fakeDataProvider({...dataObj}, true);

export default dataProvider;