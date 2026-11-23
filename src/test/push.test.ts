import { describe, expect, it, vi } from "vitest";
import { createPush } from "@/lib/push";

function fixture(initial: string, afterRequest = "granted", alreadyAsked = false) {
  let asked = alreadyAsked;
  const sdk = {
    checkPermissions: vi.fn().mockResolvedValue({ receive: initial }),
    requestPermissions: vi.fn().mockResolvedValue({ receive: afterRequest }),
    register: vi.fn().mockResolvedValue(undefined),
  };
  const push = createPush(sdk as never, () => true, { get: () => asked, set: () => { asked = true; } });
  return { push, sdk };
}

describe("yeni bölüm bildirimleri", () => {
  it("web önizlemesinde hiçbir şey yapmaz", async () => {
    const { sdk } = fixture("prompt");
    const push = createPush(sdk as never, () => false);
    expect(await push.start()).toBe("skipped");
    expect(sdk.checkPermissions).not.toHaveBeenCalled();
  });
  it("izni bir kez sorar, verilirse cihazı kaydeder", async () => {
    const { push, sdk } = fixture("prompt", "granted");
    expect(await push.start()).toBe("registered");
    expect(sdk.requestPermissions).toHaveBeenCalledTimes(1);
    expect(sdk.register).toHaveBeenCalledTimes(1);
  });
  it("izin zaten verilmişse sormadan kaydeder", async () => {
    const { push, sdk } = fixture("granted");
    expect(await push.start()).toBe("registered");
    expect(sdk.requestPermissions).not.toHaveBeenCalled();
  });
  it("reddedilirse kaydetmez ve yeniden sormaz", async () => {
    const { push, sdk } = fixture("prompt", "denied");
    expect(await push.start()).toBe("denied");
    expect(sdk.register).not.toHaveBeenCalled();
    const again = fixture("prompt", "granted", true);
    expect(await again.push.start()).toBe("denied");
    expect(again.sdk.requestPermissions).not.toHaveBeenCalled();
  });
  it("kayıt hatası uygulamayı etkilemez", async () => {
    const { push, sdk } = fixture("granted");
    sdk.register.mockRejectedValue(new Error("no play services"));
    expect(await push.start()).toBe("skipped");
  });
});
