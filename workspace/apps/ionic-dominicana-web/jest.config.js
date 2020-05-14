module.exports = {
  name: 'ionic-dominicana-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ionic-dominicana-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
