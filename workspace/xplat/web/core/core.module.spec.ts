import { WorkspaceCoreModule } from './core.module';

describe('WorkspaceCoreModule', () => {
  it('should work', () => {
    expect(new WorkspaceCoreModule(null)).toBeDefined();
  });
});
