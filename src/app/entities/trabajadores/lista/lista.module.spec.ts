import { ListaModule } from './lista.module';

describe('ListaModule', () => {
  let listaModule: ListaModule;

  beforeEach(() => {
    listaModule = new ListaModule();
  });

  it('should create an instance', () => {
    expect(listaModule).toBeTruthy();
  });
});
