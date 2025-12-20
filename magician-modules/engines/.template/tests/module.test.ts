import { describe, it, expect, beforeEach } from 'vitest';
import { MagicianModule } from '../src/module';

describe('MagicianModule', () => {
  let module: MagicianModule;

  beforeEach(() => {
    module = new MagicianModule({
      visualFirst: true,
      aslSupport: true,
      debug: false
    });
  });

  describe('initialization', () => {
    it('should create instance with default config', () => {
      const defaultModule = new MagicianModule();
      expect(defaultModule).toBeDefined();
      expect(defaultModule.isInitialized()).toBe(false);
    });

    it('should create instance with custom config', () => {
      expect(module).toBeDefined();
      const config = module.getConfig();
      expect(config.visualFirst).toBe(true);
      expect(config.aslSupport).toBe(true);
    });

    it('should initialize successfully', async () => {
      await module.initialize();
      expect(module.isInitialized()).toBe(true);
    });

    it('should allow multiple initialization calls', async () => {
      await module.initialize();
      await module.initialize();
      expect(module.isInitialized()).toBe(true);
    });
  });

  describe('processing', () => {
    beforeEach(async () => {
      await module.initialize();
    });

    it('should process data successfully', async () => {
      const result = await module.process({ test: 'data' });
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should provide visual feedback when enabled', async () => {
      const result = await module.process({ test: 'data' });
      expect(result.visualFeedback).toBeDefined();
      expect(result.visualFeedback?.icon).toBeTruthy();
      expect(result.visualFeedback?.message).toBeTruthy();
    });

    it('should throw error if not initialized', async () => {
      const uninitializedModule = new MagicianModule();
      await expect(uninitializedModule.process({ test: 'data' }))
        .rejects.toThrow('Module not initialized');
    });

    it('should handle errors gracefully', async () => {
      // Test error handling
      const result = await module.process(null);
      expect(result).toBeDefined();
    });
  });

  describe('configuration', () => {
    it('should return current configuration', () => {
      const config = module.getConfig();
      expect(config).toBeDefined();
      expect(config.visualFirst).toBe(true);
    });

    it('should not allow direct modification of config', () => {
      const config = module.getConfig();
      (config as any).visualFirst = false;
      const newConfig = module.getConfig();
      expect(newConfig.visualFirst).toBe(true);
    });
  });

  describe('cleanup', () => {
    it('should dispose resources', async () => {
      await module.initialize();
      await module.dispose();
      expect(module.isInitialized()).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('should support visual-first mode', () => {
      const config = module.getConfig();
      expect(config.visualFirst).toBe(true);
    });

    it('should support ASL integration', () => {
      const config = module.getConfig();
      expect(config.aslSupport).toBe(true);
    });

    it('should support high-contrast mode', () => {
      const hcModule = new MagicianModule({ highContrast: true });
      const config = hcModule.getConfig();
      expect(config.highContrast).toBe(true);
    });
  });
});
