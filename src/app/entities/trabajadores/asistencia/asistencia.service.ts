import {Injectable} from '@angular/core';

import {Trabajadores} from './trabajadores';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Fabrica} from '../fabricas/fabrica';

@Injectable()
export class TrabajadoresService {
    private _URL = 'http://contabilidad.backend.test/api/v1/';

    constructor(private http: HttpClient) {
    }

    getAll(fabrica_id: Number): Observable<Trabajadores[]> {
        let params = new HttpParams().set('fabrica', fabrica_id.toString());
        return this.http
            .get<Trabajadores[]>(this._URL + 'trabajador', {params: params})
            .catch(this.handleError);

    }

    addTrabajador(trabajador: Trabajadores): Observable<any> {
        return this.http.post(this._URL + 'trabajador', trabajador);
    }

    updateTrabajador(trabajador: Trabajadores): Observable<any> {
        return this.http.put(this._URL + 'trabajador/' + trabajador.id, trabajador);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    removeTrabajador(id: Number): Observable<any> {
        return this.http.delete(this._URL + 'trabajador/' + id);
    }
}