// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-upload
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BindingKey} from '@loopback/core';
import {RequestHandler} from 'express-serve-static-core';

export const FILE_UPLOAD_SERVICE = BindingKey.create<RequestHandler>(
  'services.FileUpload',
);
