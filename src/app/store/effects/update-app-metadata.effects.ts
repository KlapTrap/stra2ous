import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
    AppMetadataProperties,
    AppMetadataType,
    AppMetadataUpdateTypes,
    GetAppMetadataAction,
    WrapperAppMetadataSuccess,
} from '../actions/app-metadata.actions';
import { AppState } from './../app-state';


@Injectable()
export class UpdateAppEffects {

  constructor(
    private http: Http,
    private actions$: Actions,
    private store: Store<AppState>
  ) {
  }

  @Effect() UpdateAppInStore$ = this.actions$.ofType<WrapperAppMetadataSuccess>(AppMetadataUpdateTypes.APP_METADATA_SUCCESS)
    .mergeMap((action: WrapperAppMetadataSuccess) => {
      switch (action.type) {
        case AppMetadataProperties.ENV_VARS as AppMetadataType: {
          return [new GetAppMetadataAction(action.appMetadataAction.guid, action.appMetadataAction.cnis,
            AppMetadataProperties.ENV_VARS as AppMetadataType)];
        }
      }

      return [];

    });

}
