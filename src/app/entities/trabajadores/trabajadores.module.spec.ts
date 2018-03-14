import { TrabajadoresModule } from './trabajadores.module';

describe('TrabajadoresModule', () => {
    let trabajadoresModule: TrabajadoresModule;

    beforeEach(() => {
        trabajadoresModule = new TrabajadoresModule();
    });

    it('should create an instance', () => {
        expect(trabajadoresModule).toBeTruthy();
    });
});
