import wx from 'weixin-js-sdk';
import {get} from './http';

const baseUrl = 'https://ev-wx.com';

function wechatReady() {

    wx.ready(function () {
        // 微信分享的数据
        let shareData = {
            "imgUrl": location.origin + location.pathname.slice(0, location.pathname.lastIndexOf('/')) + '/img/banner.png',    // 分享显示的缩略图地址
            "link": location.href,    // 分享地址
            "desc": '低首付 低利率 新能源汽车开回家',   // 分享描述
            "title": '看车试驾好选择 ，一站式免费服务 ',   // 分享标题
            success: function () {
                $dialog.toast({
                    mes: '分享成功', timeout: 1500, icon: 'success'
                });
            }
        };
        console.log(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareQZone(shareData);
        wx.onMenuShareWeibo(shareData);
        wx.checkJsApi({
            jsApiList: ["getLocation"],
            success: function (res) {
                console.log(res);
            }
        });
    });
    // wx.error(function (res) {
    //     alert("error: " + res.errMsg);
    // });
}


function initWechatSDK() {
    get(baseUrl + "/wechat/wechatSDKConfig",{"url": window.location.href.split('#')[0]})
        .then((respData)=> {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: respData.data.appId, // 必填，公众号的唯一标识
                timestamp: respData.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: respData.data.noncestr, // 必填，生成签名的随机串
                signature: respData.data.signature,// 必填，签名
                jsApiList: [
                    "checkJsApi",
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareQZone",
                    "onMenuShareWeibo",
                    "getLocation",
                    "previewImage"
                ]
                // 必填，需要使用的JS接口列表
            });
            // 初始化分享
            wechatReady();
        })
}

window.onload = function () {
    window.wx = wx;
    initWechatSDK();
};