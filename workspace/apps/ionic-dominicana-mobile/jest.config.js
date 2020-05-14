module.exports = {
  name: 'ionic-dominicana-mobile',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ionic-dominicana-mobile',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
