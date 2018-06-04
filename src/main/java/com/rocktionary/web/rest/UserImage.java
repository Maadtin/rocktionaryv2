package com.rocktionary.web.rest;

import java.util.Arrays;

public class UserImage {

    private byte[] base64Image;
    private String contentType;
    private String userLogin;

    public UserImage () {}

    public UserImage(byte[] base64Image, String contentType, String userLogin) {
        this.base64Image = base64Image;
        this.contentType = contentType;
        this.userLogin = userLogin;
    }

    public byte[] getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(byte[] base64Image) {
        this.base64Image = base64Image;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }
}
