package com.example.matrixmadness;

import androidx.appcompat.app.AppCompatActivity;
import android.webkit.WebSettings;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView =(WebView) findViewById(R.id.webview);

        webView.getSettings().setJavaScriptEnabled(true);


    webView.loadUrl("file:///android_asset/runner.html");
        webView.getSettings().setAllowFileAccess(true);
        WebSettings webSettings = webView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);



    }
}