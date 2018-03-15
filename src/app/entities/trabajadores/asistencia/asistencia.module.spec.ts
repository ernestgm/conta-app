import { AsistenciaModule } from './asistencia.module';

describe('AsistenciaModule', () => {
  let asistenciaModule: AsistenciaModule;

  beforeEach(() => {
    asistenciaModule = new AsistenciaModule();
  });

  it('should create an instance', () => {
    expect(asistenciaModule).toBeTruthy();
  });
});
