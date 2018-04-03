import {Injectable} from '@angular/core';

import {Trabajadores} from './trabajadores';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Fabrica} from '../fabricas/fabrica';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Horario} from './asistencia/horario';

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

    getAllAsistencia(fabrica_id: Number, fecha: NgbDateStruct): Observable<Trabajadores[]> {
        const params = new HttpParams()
            .set('fabrica', fabrica_id.toString())
            .set('fecha', fecha.year.toString() + '-' + fecha.month.toString() + '-' + fecha.day.toString());

        return this.http
            .get<Trabajadores[]>(this._URL + 'trabajador_asistencia', {params: params})
            .catch(this.handleError);

    }

    guardarAsistencia(horarios: Horario[]): Observable<any> {
        return this.http.post(this._URL + 'trabajador_guardarasistencia', horarios);
    }

    createAsistencia(horario: Horario): Observable<any> {
        return this.http.post(this._URL + 'horario', horario);
    }

    updateAsistencia(horario: any): Observable<any> {
        return this.http.put(this._URL + 'horario/' + horario.id, horario);
    }

    getCalendarByTrabajador(id: Number): Observable<any> {
        return this.http
            .get<any>(this._URL + 'trabajador_calendar/' + id)
            .catch(this.handleError);
    }

}