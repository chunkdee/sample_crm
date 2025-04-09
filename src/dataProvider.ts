import fakeDataProvider from 'ra-data-fakerest';
import dataObj from './data2';
import sampleData from './datagenerator/generateSampleData2';
import seedDatabase from './db/seedDatabase';


const dataProvider = fakeDataProvider(sampleData, true);

seedDatabase();

//const dataProvider = fakeDataProvider({...dataObj}, true);

export default dataProvider;