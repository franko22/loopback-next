// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-file-upload
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestApplication, RestBindings} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import multer from 'multer';
import path from 'path';
import {FILE_UPLOAD_SERVICE} from './keys';
import {MySequence} from './sequence';

export class FileUploadApplication extends BootMixin(RestApplication) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Configure file upload with multer options
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        // Upload files to `.sandbox`
        destination: path.join(__dirname, '../.sandbox'),
        // Use the original file name as is
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);

    // Configure AJV to ignore `binary` format which is required for OpenAPI
    // spec 3.0 for file uploads
    this.bind(RestBindings.REQUEST_BODY_PARSER_OPTIONS).to({
      validation: {unknownFormats: ['binary']},
    });

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
