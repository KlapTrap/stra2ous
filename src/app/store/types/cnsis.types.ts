export interface CNSISModel {
  api_endpoint: {
    ForceQuery: boolean,
    Fragment: string,
    Host: string,
    Opaque: string,
    Path: string,
    RawPath: string,
    RawQuery: string,
    Scheme: string,
    User: object
  };
  authorization_endpoint: string;
  cnsi_type: string;
  doppler_logging_endpoint: string;
  guid: string;
  name: string;
  skip_ssl_validation: boolean;
  token_endpoint: string;
  // This is generated client side when we login
  registered?: boolean;
}

export interface CNSISState {
  entities: CNSISModel[];
  loading: boolean;
  error: boolean;
  message: string;
}
