import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Headers, Http, Request } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
    AppMetadataTypes,
    HttpActions,
    WrapperAppMetadataFailed,
    WrapperAppMetadataStart,
    WrapperAppMetadataSuccess,
} from '../actions/app-metadata.actions';
import { AppState } from '../app-state';
import { environment } from './../../../environments/environment';

const { proxyAPIVersion, cfAPIVersion } = environment;

export interface HttpAction extends Action {
  actions: string[];
}

@Injectable()
export class AppMetadataEffect {

  constructor(
    private http: Http,
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

  @Effect() appMetadataRequest$ = this.actions$.ofType<HttpAction>(HttpActions.ACTION)
    .map(appMetadataAction => {
      return new WrapperAppMetadataStart(appMetadataAction);
    });

  @Effect() appMetadataRequestStart$ = this.actions$.ofType<WrapperAppMetadataStart>(AppMetadataTypes.APP_METADATA_START)
    .withLatestFrom(this.store)
    .mergeMap(([{ appMetadataAction, type }, appState]) => {
      const startAction = { ...appMetadataAction } as Action;
      startAction.type = appMetadataAction.actions[0];
      this.store.dispatch(startAction);
      const options = { ...appMetadataAction.options };
      options.url = `/pp/${proxyAPIVersion}/proxy/${cfAPIVersion}/${appMetadataAction.options.url}`;
      options.headers =
        this.addBaseHeaders(appMetadataAction.cnis, appMetadataAction.options.headers);

      return this.http.request(new Request(options))
        .mergeMap(response => {

          return Observable.of(
            new WrapperAppMetadataSuccess(
              appMetadataAction.actions[1],
              response.json(),
              appMetadataAction
            )
          );
        })
        .catch(response => {
          return Observable.of(new WrapperAppMetadataFailed(appMetadataAction.actions[2], response, appMetadataAction));
        });
    });

  addBaseHeaders(cnsi: string, header: Headers): Headers {
    const cnsiHeader = 'x-cap-cnsi-list';
    const cnsiPassthroughHeader = 'x-cap-passthrough';
    const headers = new Headers();
    headers.set(cnsiHeader, cnsi);
    headers.set(cnsiPassthroughHeader, 'true');
    return headers;
  }

  getActionFromString(type: string) {
    return { type };
  }

}
