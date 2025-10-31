declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client';

  export interface UploadLinkOptions {
    uri: string;
    isExtractableFile?: (value: unknown) => boolean;
    FormData?: unknown;
    fetchOptions?: unknown;
    credentials?: unknown;
    headers?: unknown;
  }

  export function createUploadLink(options: UploadLinkOptions): ApolloLink;
}
