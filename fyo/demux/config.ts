import { ConfigMap } from 'fyo/core/types';
import type { IPC } from 'main/preload';

export class Config {
  config: Map<string, unknown> | IPC['store'];
  isMobile: boolean;

  constructor(isElectron: boolean, isMobile = false) {
    this.isMobile = isMobile;
    this.config = new Map();
    if (isElectron) {
      this.config = ipc.store;
    }
  }

  get<K extends keyof ConfigMap>(
    key: K,
    defaultValue?: ConfigMap[K]
  ): ConfigMap[K] | undefined {
    if (this.isMobile) {
      const val = localStorage.getItem(key);
      if (val === null) return defaultValue;
      try {
        return JSON.parse(val) as ConfigMap[K];
      } catch {
        return (val as unknown) as ConfigMap[K];
      }
    }
    const value = this.config.get(key) as ConfigMap[K] | undefined;
    return value ?? defaultValue;
  }

  set<K extends keyof ConfigMap>(key: K, value: ConfigMap[K]) {
    if (this.isMobile) {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    this.config.set(key, value);
  }

  delete(key: keyof ConfigMap) {
    if (this.isMobile) {
      localStorage.removeItem(key);
      return;
    }
    this.config.delete(key);
  }
}
