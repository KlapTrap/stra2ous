import { Headers, RequestOptions } from '@angular/http';
import { Action, compose, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../app-state';
import { AppMetadataRequestState } from '../reducers/app-metadata-request.reducer';

export const AppMetadataTypes = {
  APP_METADATA: '[App Metadata] App Metadata',
  APP_METADATA_START: '[App Metadata] App Metadata start',
  APP_METADATA_SUCCESS: '[App Metadata] App Metadata success',
  APP_METADATA_FAILED: '[App Metadata] App Metadata failed'
};

export const AppMetadataUpdateTypes = {
  APP_METADATA: '[App Metadata Update] App Metadata',
  APP_METADATA_START: '[App Metadata Update] App Metadata start',
  APP_METADATA_SUCCESS: '[App Metadata Update] App Metadata success',
  APP_METADATA_FAILED: '[App Metadata Update] App Metadata failed'
};

export const AppMetadataProperties = {
  INSTANCES: 'instances',
  ENV_VARS: 'environmentVars'
};
export type AppMetadataType = 'instances' | 'environmentVars';

export interface AppMetadataInfo {
  metadata: any;
  metadataRequestState: AppMetadataRequestState;
}

export class GetAppMetadataAction implements Action {
  options: RequestOptions;

  constructor(
    public guid: string,
    public cnis: string,
    public metadataType: AppMetadataType
  ) {
    this.options = this.getRequestOptions(guid, cnis, metadataType);
  }
  actions = [
    AppMetadataTypes.APP_METADATA,
    AppMetadataTypes.APP_METADATA_SUCCESS,
    AppMetadataTypes.APP_METADATA_FAILED
  ];
  type = AppMetadataTypes.APP_METADATA;

  private getRequestOptions(guid: string, cnis: string, type: AppMetadataType) {
    let requestObject: RequestOptions;
    switch (type) {
      case AppMetadataProperties.INSTANCES:
        requestObject = new RequestOptions({
          url: `apps/${guid}/stats`,
          method: 'get'
        });
        break;
      case AppMetadataProperties.ENV_VARS:
        requestObject = new RequestOptions({
          url: `apps/${guid}/env`,
          method: 'get'
        });
        break;
      default:
        requestObject = new RequestOptions();
        break;
    }
    return requestObject;
  }
}

export interface UpdateApplicationEnvVars {
  environment_json: Object;
}

export class UpdateAppMetadataAction implements Action {
  options: RequestOptions;

  constructor(
    private guid: string,
    private cnis: string,
    private metadataType: AppMetadataType,
    private updatedMetadata: any,
  ) {
    this.options = this.getRequestOptions(guid, cnis, metadataType, updatedMetadata);
  }
  actions = [
    AppMetadataUpdateTypes.APP_METADATA,
    AppMetadataUpdateTypes.APP_METADATA_SUCCESS,
    AppMetadataUpdateTypes.APP_METADATA_FAILED
  ];
  type = AppMetadataTypes.APP_METADATA;

  private getRequestOptions(guid: string, cnis: string, type: AppMetadataType, updatedMetadata: any) {
    let requestObject: RequestOptions;
    switch (type) {
      case AppMetadataProperties.ENV_VARS:
        requestObject = new RequestOptions({
          url: `apps/${guid}`,
          method: 'put',
          headers: new Headers({ 'x-cap-passthrough': 'true' }),
          body: updatedMetadata
        });
        break;
      default:
        requestObject = new RequestOptions();
        break;
    }
    return requestObject;
  }
}

export class WrapperAppMetadataStart implements Action {
  constructor(
    public appMetadataAction: GetAppMetadataAction
  ) { }
  type = AppMetadataTypes.APP_METADATA_START;
}

export class WrapperAppMetadataSuccess implements Action {
  constructor(
    public type: string,
    public metadata: any,
    public appMetadataAction: GetAppMetadataAction,
  ) { }
  // type = AppMetadataTypes.APP_METADATA_SUCCESS;
}

export class WrapperAppMetadataFailed implements Action {
  message: string;
  appMetedataError: AppMetedataError;

  constructor(
    public type: string,
    public response: any,
    public appMetadataAction: GetAppMetadataAction
  ) {
    // TODO: Make this standard over all CF responses
    this.appMetedataError = JSON.parse(response._body);
    this.message = this.appMetedataError.description;
  }
  // type = AppMetadataTypes.APP_METADATA_FAILED;
}

interface AppMetedataError {
  description: string;
  error_code?: string;
  code?: number;
}

function getAppMetadata(state) {
  return state.appMetadata.values || {};
}

function getAppRequestMetadata(state) {
  return state.appMetadata.requests || {};
}

function getMetadataType<T>(metadataType) {
  return (appMetadata): T => {
    return appMetadata[metadataType];
  };
}

function getMetadataById(appId: string) {
  return (entities) => {
    return entities[appId] || {};
  };
}

export const getAppMetadataObservable = (
  store: Store<AppState>,
  appId: string,
  action: GetAppMetadataAction
): Observable<any> => {
  let dispatched = false;
  return Observable.combineLatest(
    store.select(selectMetadata(action.metadataType, appId)),
    store.select(selectMetadataRequest(action.metadataType, appId))
  )
    .mergeMap(([metadata, metadataRequestState]: [any, AppMetadataRequestState]) => {
      if (!metadata && (!metadataRequestState || !metadataRequestState.fetching)) { // && !dispatched
        store.dispatch(action);
        dispatched = true;
      }
      return Observable.of({
        metadata,
        metadataRequestState
      });
    })
    .filter(({ metadata, metadataRequestState }) => {
      return metadata || metadataRequestState;
    });
};

export const selectMetadata = (metadataType: AppMetadataType, appId): any => {
  return compose(
    getMetadataType<any>(metadataType),
    getMetadataById(appId),
    getAppMetadata
  );
};

export const selectMetadataRequest = (metadataType: AppMetadataType, appId): any => {
  return compose(
    getMetadataType<AppMetadataRequestState>(metadataType),
    getMetadataById(appId),
    getAppRequestMetadata
  );
};
