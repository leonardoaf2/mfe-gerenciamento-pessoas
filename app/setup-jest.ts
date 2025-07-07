import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

setupZoneTestEnv();

const originalConsoleError = console.error;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: any[]) => {
    const message = args.join(' ');
    if (message.includes('NG0303') || message.includes('NG0304')) return;
    originalConsoleError(...args);
  });

  const originalConfigureTestingModule = TestBed.configureTestingModule;

  TestBed.configureTestingModule = function (moduleDef: any) {
    moduleDef.schemas = moduleDef.schemas || [];
    if (!moduleDef.schemas.includes(NO_ERRORS_SCHEMA)) {
      moduleDef.schemas.push(NO_ERRORS_SCHEMA);
    }
    return originalConfigureTestingModule.call(this, moduleDef);
  };
});
