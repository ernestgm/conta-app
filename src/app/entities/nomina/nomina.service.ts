import { Injectable } from '@angular/core';
import {Trabajadores} from '../trabajadores/trabajadores';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Nomina} from './nomina';

@Injectable()
export class NominaService {

    private _URL = 'http://contabilidad.backend.test/api/v1/';

    constructor(private http: HttpClient) {
    }

    getAll(fabrica_id: Number): Observable<Nomina[]> {
        let params = new HttpParams().set('fabrica', fabrica_id.toString());
        return this.http
            .get<Trabajadores[]>(this._URL + 'nomina', {params: params})
            .catch(this.handleError);

    }

    addNomina(nomina: Nomina): Observable<any> {
        return this.http.post(this._URL + 'nomina', nomina);
    }

    updateNomina(nomina: Nomina): Observable<any> {
        return this.http.put(this._URL + 'nomina/' + nomina.id, nomina);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    removeNomina(id: Number): Observable<any> {
        return this.http.delete(this._URL + 'nomina/' + id);
    }

}
