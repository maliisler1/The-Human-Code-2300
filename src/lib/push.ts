import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";

/**
 * "Yeni bölüm eklendi" bildirimleri (Firebase Cloud Messaging).
 * Uygulama açılışında bir kez bildirim izni istenir; izin verilirse cihaz kaydedilir.
 * Konu aboneliği ("yeni-bolumler") Android tarafında MainActivity'de yapılır; bildirimler
 * Firebase konsolundan bu konuya gönderilir. Web önizlemesinde hiçbir şey yapmaz.
 */
export const PUSH_TOPIC = "yeni-bolumler";
const ASKED_KEY = "amc.push.asked.v1";

type Sdk = Pick<typeof PushNotifications, "checkPermissions" | "requestPermissions" | "register">;
type Flags = { get: () => boolean; set: () => void };

const storedFlag: Flags = {
  get: () => {
    try {
      return localStorage.getItem(ASKED_KEY) === "1";
    } catch {
      return false;
    }
  },
  set: () => {
    try {
      localStorage.setItem(ASKED_KEY, "1");
    } catch {
      // Depolama kapalıysa izin bir sonraki açılışta yeniden sorulabilir.
    }
  },
};

export function createPush(sdk: Sdk = PushNotifications, native = () => Capacitor.getPlatform() === "android", asked: Flags = storedFlag) {
  let started = false;

  /** İzin durumuna göre cihazı kaydeder. İzin yalnızca bir kez sorulur. */
  async function start(): Promise<"registered" | "denied" | "skipped"> {
    if (!native() || started) return "skipped";
    started = true;
    try {
      let { receive } = await sdk.checkPermissions();
      if (receive === "prompt" || receive === "prompt-with-rationale") {
        if (asked.get()) return "denied";
        asked.set();
        ({ receive } = await sdk.requestPermissions());
      }
      if (receive !== "granted") return "denied";
      await sdk.register();
      return "registered";
    } catch {
      // Google Play hizmetleri yoksa ya da kayıt başarısızsa uygulama etkilenmez.
      return "skipped";
    }
  }

  return { start };
}

export const push = createPush();
