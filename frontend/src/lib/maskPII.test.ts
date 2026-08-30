import { describe, it, expect } from 'vitest';
import { maskPhone, maskIp } from './mockData';

describe('maskPhone', () => {
  it('9823481210 -> 98****10', () => {
    expect(maskPhone('9823481210')).toBe('98****10');
  });

  it('masks middle 6 digits keeping 2+2', () => {
    expect(maskPhone('9422019942')).toBe('94****42');
    expect(maskPhone('9822001122')).toBe('98****22');
  });

  it('leaves short/invalid phone unchanged (no match)', () => {
    expect(maskPhone('123')).toBe('123');
    expect(maskPhone('')).toBe('');
  });
});

describe('maskIp', () => {
  it('masks last two octets: 103.21.144.12 -> 103.21.***.**', () => {
    expect(maskIp('103.21.144.12')).toBe('103.21.***.**');
  });

  it('masks various IPs consistently', () => {
    expect(maskIp('115.111.45.10')).toBe('115.111.***.**');
    expect(maskIp('192.168.0.1')).toBe('192.168.***.**');
  });

  it('leaves invalid IP unchanged', () => {
    expect(maskIp('invalid')).toBe('invalid');
  });
});
