package com.ryantest;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.vonovak.AddCalendarEventPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.calendarevents.CalendarEventsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.wonday.pdf.RCTPdfView;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lynxit.contactswrapper.ContactsWrapperPackage;

import java.util.Arrays;
import java.util.List;


import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ContactsWrapperPackage(),
            new ReactNativeContacts(),
            new AddCalendarEventPackage(),
            new ReactNativeOneSignalPackage(),
            new CalendarEventsPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
            new RNFetchBlobPackage(),
            new RCTPdfView(),
            new ReactNativePushNotificationPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new ReactNativeOneSignalPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
