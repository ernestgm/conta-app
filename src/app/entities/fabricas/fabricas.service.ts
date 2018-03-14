import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Fabrica} from './fabrica';
import {Trabajadores} from '../trabajadores/trabajadores';

@Injectable()
export class FabricasService {

    private _URL = 'http://contabilidad.backend.test/api/v1/';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Fabrica[]> {
        return this.http
            .get<Fabrica[]>(this._URL + 'fabrica')
            .catch(this.handleError);

    }

    addFabrica(fabrica: Fabrica): Observable<any> {
        return this.http.post(this._URL + 'fabrica', fabrica);
    }

    updateFabrica(fabrica: Fabrica): Observable<any> {
        return this.http.put(this._URL + 'fabrica/' + fabrica.id, fabrica);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    removeFabrica(id: Number): Observable<any> {
        return this.http.delete(this._URL + 'fabrica/' + id);
    }

}
