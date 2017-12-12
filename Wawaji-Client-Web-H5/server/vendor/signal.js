const WebSocket=require("ws"),XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;Signal_=function(e){function n(e){var n,t,i;for(i=e.length;i;i--)n=Math.floor(Math.random()*i),t=e[i-1],e[i-1]=e[n],e[n]=t}function t(e,n,t){var i=new XMLHttpRequest,o=!1,s=setTimeout(function(){o=!0,i.abort(),t("timeout","")},n);i.open("GET",e),i.onreadystatechange=function(){4===i.readyState&&(o||(clearTimeout(s),200===i.status&&t("",i.responseText)))},i.send(null)}function i(e,n,t){var i=e.split(n,t),o=0;for(var s in i)o+=n.length+i[s].length;return i.push(e.substr(o)),i}var o=101,s=201,a=204,r=206,l=207;this.lbs_url1=["https://lbs-1-sig.agora.io","https://lbs-2-sig.agora.io"],this.lbs_url2=["https://lbs-3-sig.agora.io","https://lbs-4-sig.agora.io"],this.vid=e,this.appid=e;var c=this,u=function(u,h){this.onLoginSuccess="",this.onLoginFailed="",this.onLogout="",this.onInviteReceived="",this.onMessageInstantReceive="",this.account=u,this.state="session_state_logining",this.line="",this.uid=0;var f=this;f.lbs_state="requesting";var v=[];n(v),f.idx=0,f.socket=null;var g=function(){if(f.dbg){var e=[];for(var n in arguments)e.push(arguments[n]);console.log.apply(null,["Agora sig dbg :"].concat(e))}},_=function(e){return"wss://"+(e[0].replace(/\./g,"-")+"-sig-web.agora.io")+":"+(e[1]+1)+"/"};f.logout=function(){"session_state_logined"==f.state&&f.onLogout?f.call2("user_logout",{line:f.line},function(e,n){f.fire_logout(o),f.socket.close()}):"session_state_logining"==f.state&&(f.state,f.fire_logout(o))},f.fire_logout=function(e){e||(e=0);try{"session_state_logined"==f.state&&f.onLogout&&f.onLogout(e)}catch(e){console.error(e)}finally{f.state="session_state_logout"}};var d=function(n,i,o){if("requesting"==f.lbs_state){t(i[o]+"/getaddr?vid="+e,5e3,function(e,t){if(e)n-1>0?d(n-1,i,(o+1)%i.length):f.fire_login_failed(s);else{if("requesting"!=f.lbs_state)return;f.lbs_state="completed",v=JSON.parse(t).web,p(),p()}})}},p=function(){if("session_state_logining"==f.state)var n=new function(){var e=_(v[f.idx]);f.idx+=1;var t=new WebSocket(e);t.state="CONNECTING",setTimeout(function(){t.readyState!=t.CONNECTING||t.close()},6e3),t.onopen=function(e){if("session_state_logout"==f.state)t.close();else if("session_state_logining"==f.state&&null==f.socket){f.socket=n,t.state="OPEN",g("on conn open"),f.go_login();for(var i in a)t.send(JSON.stringify(a[i]))}else t.close()},t.onclose=function(e){"OPEN"==t.state&&(o("_close",""),g("on conn close")),"CONNECTING"==t.state&&p()},t.onmessage=function(e){var n=e.data,t=JSON.parse(n);t[0];o(t[0],t[1])},t.onerror=function(e){t.state="CLOSED",f.idx<v.length&&e.target.readyState==e.target.CLOSED?p():(g("on conn error"),"session_state_logined"==f.state?f.fire_logout("conn error"):"session_state_logining"==f.state&&f.fire_login_failed(s))};var i={},o=function(e,n){e in i&&i[e](n)},a=[];this.on=function(e,n){i[e]=n},this.emit=function(e,n){0!=t.readyState?t.send(JSON.stringify([e,n])):a.push([e,n])},this.close=function(){t.close()}};var t=0,o=function(){setTimeout(function(){"session_state_logined"==f.state&&(g("send ping",++t),f.socket.emit("ping",t),o())},1e4)};f.go_login=function(){""==f.line?(f.socket.emit("login",{vid:e,account:u,uid:0,token:h,device:"websdk",ip:""}),f.socket.on("login_ret",function(e){var n=e[0],t=JSON.parse(e[1]);if(g("login ret",n,t),n||"ok"!=t.result){""==n&&(n=t.reason);try{if(f.onLoginFailed){var i="kick"==n?l:"TokenErrorExpired"==n?a:n.startsWith("TokenError")?r:s;f.fire_login_failed(i)}}catch(i){console.error(i)}}else{f.uid=t.uid,f.line=t.line,f.state="session_state_logined",o(),J();try{f.onLoginSuccess&&f.onLoginSuccess(f.uid)}catch(i){console.error(i)}finally{L()}}})):f.socket.emit("line_login",{line:f.line});var n=0,t={},c={};f.call2=function(e,i,o){t[++n]=[e,i,o],g("call ",[e,n,i]),f.socket.emit("call2",[e,n,i])},f.socket.on("call2-ret",function(e){var n=e[0],i=e[1],o=e[2];if(n in t){var s=t[n][2];if(""==i)try{"ok"!=(o=JSON.parse(o)).result&&(i=o.data.result)}catch(e){i="wrong resp:"+o}s&&s(i,o)}});var v,_=function(e,n){return""==e},d=function(e){if(e.startsWith("msg-v2 ")){var n=i(e," ",6);if(7==n.length){return[n[1],n[4],n[6]]}}return null};f.socket.on("pong",function(e){g("recv pong")}),f.socket.on("close",function(e){f.fire_logout(0),f.socket.close()}),f.socket.on("_close",function(e){f.fire_logout(0)}),f.fire_login_failed=function(e){try{"session_state_logining"==f.state&&f.onLoginFailed&&f.onLoginFailed(e)}catch(e){console.error(e)}finally{f.state="session_state_logout"}};var p=function(e){var n=e,t=n[0],i=n[1],o=n[2];if("instant"==i)try{f.onMessageInstantReceive&&f.onMessageInstantReceive(t,0,o)}catch(e){console.error(e)}if(i.startsWith("voip_")){var s,a=JSON.parse(o),r=a.channel,l=a.peer,u=a.extra,h=a.peeruid;if("voip_invite"==i)s=new E(r,l,h,u),f.call2("voip_invite_ack",{line:f.line,channelName:r,peer:l,extra:""});else if(!(s=c[r+l]))return;if("voip_invite"==i)try{f.onInviteReceived&&f.onInviteReceived(s)}catch(e){console.error(e)}if("voip_invite_ack"==i)try{s.onInviteReceivedByPeer&&s.onInviteReceivedByPeer(u)}catch(e){console.error(e)}if("voip_invite_accept"==i)try{s.onInviteAcceptedByPeer&&s.onInviteAcceptedByPeer(u)}catch(e){console.error(e)}if("voip_invite_refuse"==i)try{s.onInviteRefusedByPeer&&s.onInviteRefusedByPeer(u)}catch(e){console.error(e)}if("voip_invite_failed"==i)try{s.onInviteFailed&&s.onInviteFailed(u)}catch(e){console.error(e)}if("voip_invite_bye"==i)try{s.onInviteEndByPeer&&s.onInviteEndByPeer(u)}catch(e){console.error(e)}if("voip_invite_msg"==i)try{s.onInviteMsg&&s.onInviteMsg(u)}catch(e){console.error(e)}}},m=function(){return Date.now()},y=0,I=0,C=0,k=0,N=0,S=!1,L=function(){S||(S=!0,f.call2("user_getmsg",{line:f.line,ver_clear:y,max:30},function(e,n){if(""==e){var t=n;y=t.ver_clear,C=y;for(var i in t.msgs){var o=t.msgs[i][0],s=t.msgs[i][1];p(d(s)),y=o}(30==t.msgs.length||y<I)&&L(),k=m()}S=!1,N=m()}))},b=function(){N=m()},J=function(){setTimeout(function(){if("session_state_logout"!=f.state){if("session_state_logined"==f.state){var e=m();C<y&&e-N>1e3?L():e-N>=6e4&&L()}J()}},100)};f.socket.on("notify",function(e){g("recv notify ",e),"string"==typeof e&&(e=(e=i(e," ",2)).slice(1));var n=e[0];if("channel2"==n){var t=e[1],o=e[2];if(0!=v.m_channel_msgid&&v.m_channel_msgid+1>o)return void g("ignore channel msg",t,o,v.m_channel_msgid);v.m_channel_msgid=o;var s=d(e[3]);if(s){s[0];var a=s[1],r=s[2],l=JSON.parse(r);if("channel_msg"==a)try{v.onMessageChannelReceive&&v.onMessageChannelReceive(l.account,l.uid,l.msg)}catch(n){console.error(n)}if("channel_user_join"==a)try{v.onChannelUserJoined&&v.onChannelUserJoined(l.account,l.uid)}catch(n){console.error(n)}if("channel_user_leave"==a)try{v.onChannelUserLeaved&&v.onChannelUserLeaved(l.account,l.uid)}catch(n){console.error(n)}if("channel_attr_update"==a)try{v.onChannelAttrUpdated&&v.onChannelAttrUpdated(l.name,l.value,l.type)}catch(n){console.error(n)}}}if("msg"==n&&(I=e[1],L()),"recvmsg"==n){var c=JSON.parse(e[1]),u=c[0],h=c[1];u==y+1?(p(d(h)),y=u,b()):(I=u,L())}}),f.messageInstantSend=function(e,n,t){f.call2("user_sendmsg",{line:f.line,peer:e,flag:"v1:E:3600",t:"instant",content:n},function(e,n){t&&t(!_(e,n))})},f.invoke=function(e,n,t){if(e.startsWith("io.agora.signal.")){var i=e.split(".")[3];n.line=f.line,f.call2(i,n,function(e,n){t&&t(e,n)})}};var E=function(e,n,t){this.onInviteReceivedByPeer="",this.onInviteAcceptedByPeer="",this.onInviteRefusedByPeer="",this.onInviteFailed="",this.onInviteEndByPeer="",this.onInviteEndByMyself="",this.onInviteMsg="";var i=this;this.channelName=e,this.peer=n,this.extra=t,c[e+n]=i,this.channelInviteUser2=function(){t=t||"",f.call2("voip_invite",{line:f.line,channelName:e,peer:n,extra:t},function(e,n){if(_(e,n));else try{i.onInviteFailed(e)}catch(e){console.error(e)}})},this.channelInviteAccept=function(t){t=t||"",f.call2("voip_invite_accept",{line:f.line,channelName:e,peer:n,extra:t})},this.channelInviteRefuse=function(t){t=t||"",f.call2("voip_invite_refuse",{line:f.line,channelName:e,peer:n,extra:t})},this.channelInviteDTMF=function(t){f.call2("voip_invite_msg",{line:f.line,channelName:e,peer:n,extra:JSON.stringify({msgtype:"dtmf",msgdata:t})})},this.channelInviteEnd=function(t){t=t||"",f.call2("voip_invite_bye",{line:f.line,channelName:e,peer:n,extra:t});try{i.onInviteEndByMyself&&i.onInviteEndByMyself("")}catch(e){console.error(e)}}};f.channelInviteUser2=function(e,n,t){var i=new E(e,n,t);return i.channelInviteUser2(),i},f.channelJoin=function(e){if("session_state_logined"==f.state)return v=new function(){this.onChannelJoined="",this.onChannelJoinFailed="",this.onChannelLeaved="",this.onChannelUserList="",this.onChannelUserJoined="",this.onChannelUserLeaved="",this.onChannelUserList="",this.onChannelAttrUpdated="",this.onMessageChannelReceive="",this.name=e,this.state="joining",this.m_channel_msgid=0,this.messageChannelSend=function(n,t){f.call2("channel_sendmsg",{line:f.line,name:e,msg:n},function(e,n){t&&t()})},this.channelLeave=function(n){f.call2("channel_leave",{line:f.line,name:e},function(e,t){if(v.state="leaved",n)n();else try{v.onChannelLeaved&&v.onChannelLeaved(0)}catch(e){console.error(e)}})},this.channelSetAttr=function(n,t,i){f.call2("channel_set_attr",{line:f.line,channel:e,name:n,value:t},function(e,n){i&&i()})},this.channelDelAttr=function(n,t){f.call2("channel_del_attr",{line:f.line,channel:e,name:n},function(e,n){t&&t()})},this.channelClearAttr=function(n){f.call2("channel_clear_attr",{line:f.line,channel:e},function(e,t){n&&n()})}},f.call2("channel_join",{line:f.line,name:e},function(e,n){if(""==e){v.state="joined";try{v.onChannelJoined&&v.onChannelJoined()}catch(e){console.error(e)}var t=n;try{v.onChannelUserList&&v.onChannelUserList(t.list)}catch(e){console.error(e)}try{if(v.onChannelAttrUpdated)for(var i in t.attrs)v.onChannelAttrUpdated("update",i,t.attrs[i])}catch(e){console.error(e)}}else try{v.onChannelJoinFailed&&v.onChannelJoinFailed(e)}catch(e){console.error(e)}}),v;g("You should log in first.")}}};f.socket=null,n(c.lbs_url1),n(c.lbs_url2),d(2,c.lbs_url1,0),d(2,c.lbs_url2,0)};this.login=function(e,n){return new u(e,n)}},Signal=function(e){return new Signal_(e)},module.exports=Signal;