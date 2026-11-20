/**
 * Google Play faturalandırma çağrılarını sıraya koyar.
 * Aynı anda gelen sorgular (ör. fiyat ve satın alma listesi) eklentide birbirinin
 * yanıtını ezebildiği için hepsi tek tek, sırayla çalıştırılır.
 */
let tail: Promise<unknown> = Promise.resolve();

export function billingQueue<T>(task: () => Promise<T>): Promise<T> {
  const run = tail.then(task, task);
  tail = run.catch(() => undefined);
  return run;
}
