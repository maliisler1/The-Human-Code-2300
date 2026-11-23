package com.aimultiverse.cinema;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // "Yeni bölüm eklendi" bildirimleri bu konuya gönderilir. Firebase yapılandırması
        // yoksa (google-services.json eksikse) sessizce atlanır.
        try {
            if (!FirebaseApp.getApps(this).isEmpty()) {
                FirebaseMessaging.getInstance().subscribeToTopic("yeni-bolumler");
            }
        } catch (Exception ignored) {
        }
    }
}
