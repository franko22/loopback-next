// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-upload
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  bind,
  BindingScope,
  config,
  ContextTags,
  Provider,
} from '@loopback/core';
import {RequestHandler} from 'express-serve-static-core';
import multer from 'multer';
import {FILE_UPLOAD_SERVICE} from '../keys';

/**
 * A provider to return an `Express` request handler from `multer` middleware
 */
@bind({
  scope: BindingScope.TRANSIENT,
  tags: {[ContextTags.KEY]: FILE_UPLOAD_SERVICE},
})
export class FileUploadProvider implements Provider<RequestHandler> {
  constructor(@config() private options: multer.Options = {}) {
    if (!this.options.storage) {
      // Default to in-memory storage
      this.options.storage = multer.memoryStorage();
    }
  }

  value(): RequestHandler {
    return multer(this.options).any();
  }
}
