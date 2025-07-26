package com.mealplanner

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.mealplanner.R

class SplashScreenModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        private var splashScreenVisible = true
    }

    override fun getName(): String {
        return "SplashScreen"
    }

    @ReactMethod
    fun hide() {
        if (!splashScreenVisible) {
            return
        }

        val activity = currentActivity ?: return

        activity.runOnUiThread {
            activity.setTheme(R.style.AppTheme)
            splashScreenVisible = false
        }
    }

    @ReactMethod
    fun show() {
        val activity = currentActivity ?: return

        activity.runOnUiThread {
            activity.setTheme(R.style.SplashTheme)
            splashScreenVisible = true
        }
    }
}
