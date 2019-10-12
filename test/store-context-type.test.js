import { object } from 'prop-types';
import storeContextType from '../src/store-context-type';

describe('storeContextType', () => {
    test('Should define store context type', () => {
        expect.hasAssertions();
        expect(storeContextType.store).toBe(object);
    })
});
