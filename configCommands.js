//ALL DATA SENT OUT FROM THE GUI TOO THE BOARD HERE

// to sanitize strings **********
function checkUserString(userString, lengthCheck) {
  if (match(userString, "#") != null || match(userString, ",") != null) {
    return 'error no # or comma';
  }
  if (userString.length >=lengthCheck) {
    return 'error too long';
  }
  return null;
}

function checkUserIPaddress(userIP) {
  let splitNumbers = split(userIP, '.');
  if (splitNumbers.length>4 || splitNumbers.length<4) {
    return 'error not valid';
  }
  for (let i=0; i<4; i++) {
    if (isNaN(splitNumbers[i])) {
      return 'error not valid';
    }
    if (splitNumbers[i]>255 || splitNumbers[i]<0) {
      return 'error not valid';
    }
  }
  return null;
}
//******************

function appendRSSIenableCommand() {
  if (appendRSSIenableCheckbox.checked()) {
    sendData("#rssien");
  } else {
    sendData("#rssidi");
  }
}

function missionCriticalEnableCommand() {
  if (missionCriticalEnableCheckbox.checked()) {
    sendData("#missionen");
  } else {
    sendData("#missiondi");
  }
}

function missionCriticalTimeCommand() {
  let sanitizer = checkUserString(missionCriticalTimeInput.value(), 3);
  if (sanitizer!=null) {
    missionCriticalTimeInput.value("err");
    return;
  }
  if (isNaN(missionCriticalTimeInput.value())) {
    missionCriticalTimeInput.value("err");
    return;
  }
  if (missionCriticalTimeInput.value() > 60 || missionCriticalTimeInput.value() <=0) {
    missionCriticalTimeInput.value("err");
    return;
  }
  sendData("#tmiss,"+missionCriticalTimeInput.value());
}


function clockTimerEnableCommand() {
  if (clockTimerEnableCheckbox.checked()) {
    sendData("#clken");
  } else {
    sendData("#clkdi");
  }
}
function clockTimeZoneButtonCommand() {
  let sanitizer = checkUserString(clockTimeZone.value(), 5);
  if (sanitizer!=null) {
    clockTimeZone.value("err");
    return;
  }
  if (isNaN(clockTimeZone.value())) {
    clockTimeZone.value("err");
    return;
  }
  if (clockTimeZone.value() > 14 || clockTimeZone.value() <-12) {
    clockTimeZone.value("err");
    return;
  }
  sendData("#clkzn,"+clockTimeZone.value());
}
function clockSetTimeNTPCommand() {
  document.getElementById("currentTimeID").innerHTML = "PLEASE WAIT... GETTING TIME";
  sendData("#clkNTPset,");
}
function clockAppendCommand() {
  if (clockAppendCheckbox.checked()) {
    sendData("#clkappen");
  } else {
    sendData("#clkappdi");
  }
}
function clockAppendAlarmCommand() {
  if (clockAppendAlarmCheckbox.checked()) {
    sendData("#clkalmappen");
  } else {
    sendData("#clkalmappdi");
  }
}
function clockAlarmEnableCommand() {
  if (clockAlarmEnableCheckbox.checked()) {
    sendData("#clkalmen");
  } else {
    sendData("#clkalmdi");
  }
}
function clockAlarmButtonCommand() {
  let sanitizer = checkUserString(clockAlarmHour.value(), 5);
  if (sanitizer!=null) {
    clockAlarmHour.value("err");
    return;
  }
  if (isNaN(clockAlarmHour.value())) {
    clockAlarmHour.value("err");
    return;
  }
  if (clockAlarmHour.value() > 23 || clockAlarmHour.value() <0) {
    clockAlarmHour.value("err");
    return;
  }

  sanitizer = checkUserString(clockAlarmMinute.value(), 5);
  if (sanitizer!=null) {
    clockAlarmMinute.value("err");
    return;
  }
  if (isNaN(clockAlarmMinute.value())) {
    clockAlarmMinute.value("err");
    return;
  }
  if (clockAlarmMinute.value() > 59 || clockAlarmMinute.value() <0) {
    clockAlarmMinute.value("err");
    return;
  }
  sendData("#clkalmtim,"+clockAlarmHour.value() + "," + clockAlarmMinute.value());
}
function clockNTPupdateonAlarmCommand() {
  if (clockNTPupdateonAlarmCheckbox.checked()) {
    sendData("#clkNTPen");
  } else {
    sendData("#clkNTPdi");
  }
}
function clockAlarmMessageButtonCommand() {
  let sanitizer = checkUserString(clockAlarmMessage.value(), 50);
  if (sanitizer!=null) {
    clockAlarmMessage.value(sanitizer);
    return;
  }
  sendData("#clkalarMsg,"+clockAlarmMessage.value());
}

function saveWiFi() {
  let sanitizer = checkUserString(ssidInput.value(), 50);
  if (sanitizer!=null) {
    ssidInput.value(sanitizer);
    return;
  }
  sanitizer = checkUserString(pwInput.value(), 50);
  if (sanitizer!=null) {
    ssidInput.value(sanitizer);
    return;
  }
  if (pwInput.value().length <8) {
    ssidInput.value('error pw too short');
    return;
  }
  sendData("#wifi,"+ssidInput.value() + "," + pwInput.value());
}
function wifiTimeoutCommand() {
  let sanitizer = checkUserString(wifiTimeoutInput.value(), 3);
  if (sanitizer!=null) {
    wifiTimeoutInput.value("err");
    return;
  }
  if (isNaN(wifiTimeoutInput.value())) {
    wifiTimeoutInput.value("err");
    return;
  }
  if (wifiTimeoutInput.value() > 60 || wifiTimeoutInput.value() <=0) {
    wifiTimeoutInput.value("err");
    return;
  }
  sendData("#tout,"+wifiTimeoutInput.value());
}

function trigBoardNameCommand() {
  let sanitizer = checkUserString(trigBoardNameInput.value(), 50);
  if (sanitizer!=null) {
    trigBoardNameInput.value(sanitizer);
    return;
  }
  sendData("#name,"+trigBoardNameInput.value());
}

function triggerSelectorCommand() {
  sendData("#sel,"+triggerSelector.value());
}

function triggerOpensCommand() {
  let sanitizer = checkUserString(triggerOpensInput.value(), 50);
  if (sanitizer!=null) {
    triggerOpensInput.value(sanitizer);
    return;
  }
  sendData("#ope,"+triggerOpensInput.value());
}
function triggerClosesCommand() {
  let sanitizer = checkUserString(triggerClosesInput.value(), 50);
  if (sanitizer!=null) {
    triggerClosesInput.value(sanitizer);
    return;
  }
  sendData("#clo,"+triggerClosesInput.value());
}
function timerCommand() {
  let sanitizer = checkUserString(timerInput.value(), 4);
  if (sanitizer!=null) {
    timerInput.value("err");
    return;
  }
  if (isNaN(timerInput.value())) {
    timerInput.value("err");
    return;
  }
  if (timerInput.value() > 255 || timerInput.value() <=0) {
    timerInput.value("err");
    return;
  }
  sendData("#tim,"+timerInput.value());
}
function timerSelectorCommand() {
  sendData("#tse,"+trim(timerSelector.value()));
}

function timerStillOpenCommand() {
  let sanitizer = checkUserString(timerStillOpenInput.value(), 50);
  if (sanitizer!=null) {
    timerStillOpenInput.value(sanitizer);
    return;
  }
  sendData("#tso,"+timerStillOpenInput.value());
}
function timerStillClosedCommand() {
  let sanitizer = checkUserString(timerStillClosedInput.value(), 50);
  if (sanitizer!=null) {
    timerStillClosedInput.value(sanitizer);
    return;
  }
  sendData("#tsc,"+timerStillClosedInput.value());
}
function loBatteryCommand() {
  let sanitizer = checkUserString(loBatteryInput.value(), 5);
  if (sanitizer!=null) {
    loBatteryInput.value("err");
    return;
  }
  if (isNaN(loBatteryInput.value())) {
    loBatteryInput.value("err");
    return;
  }
  if (loBatteryInput.value() > 255 || loBatteryInput.value() <=0) {
    loBatteryInput.value("err");
    return;
  }
  sendData("#lob,"+loBatteryInput.value());
}
function pushOverSaveCommand() {
  let sanitizer = checkUserString(pushuserInput.value(), 50);
  if (sanitizer!=null) {
    pushuserInput.value("");
    return;
  }
  sanitizer = checkUserString(pushapiInput.value(), 50);
  if (sanitizer!=null) {
    pushapiInput.value("");
    return;
  }
  sendData("#pov,"+pushuserInput.value() +","+pushapiInput.value());
}
function pushOverTestCommand() {
  sendData("#pot");
}
function wakeButtonCommand() {
  let sanitizer = checkUserString(wakeButtonInput.value(), 50);
  if (sanitizer!=null) {
    wakeButtonInput.value(sanitizer);
    return;
  }
  sendData("#wak,"+wakeButtonInput.value());
}
function killCommand() {
  sendData("#kill,");
}

function pushOverEnableCommand() {
  if (pushOverEnableCheckbox.checked()) {
    sendData("#poe");
  } else {
    sendData("#pod");
  }
}

function pushSaferEnableCommand() {
  if (pushSaferEnableCheckbox.checked()) {
    sendData("#pse");
  } else {
    sendData("#psd");
  }
}

function pushSaferKeySaveCommand() {
  let sanitizer = checkUserString(pushSaferInput.value(), 50);
  if (sanitizer!=null) {
    pushSaferInput.value("");
    return;
  }
  sendData("#psk,"+pushSaferInput.value());
}

function iftttEnableCommand() {
  if (iftttEnableCheckbox.checked()) {
    sendData("#ife");
  } else {
    sendData("#ifd");
  }
}
function iftttKeySaveCommand() {
  let sanitizer = checkUserString(iftttInput.value(), 50);
  if (sanitizer!=null) {
    iftttInput.value("");
    return;
  }
  sendData("#ifk,"+iftttInput.value());
}

function telegramEnableCommand() {
  if (telegramEnableCheckbox.checked()) {
    sendData("#teleEN");
  } else {
    sendData("#teleDI");
  }
}

function telegramSaveCommand() {
  let sanitizer = checkUserString(telegramBOTInput.value(), 50);
  if (sanitizer!=null) {
    telegramBOTInput.value("");
    return;
  }
  sanitizer = checkUserString(telegramCHATInput.value(), 50);
  if (sanitizer!=null) {
    telegramCHATInput.value("");
    return;
  }
  sendData("#telcrd,"+telegramBOTInput.value() +","+telegramCHATInput.value());
}

//function udpEnableCommand() {
//  if (udpEnableCheckbox.checked()) {
//    sendData("#ude");
//  } else {
//    sendData("#udd");
//  }
//}

function udpSaveCommand() {//we also use this for saving tcp settings
  let sanitize = checkUserString(udpSSIDInput.value(), 50);
  if (sanitize!=null) {
    udpSSIDInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpPWInput.value(), 50);
  if (sanitize!=null) {
    udpSSIDInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(udpStaticIPInput.value());
  if (sanitize!=null) {
    udpStaticIPInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpStaticIPInput.value(), 20);
  if (sanitize!=null) {
    udpStaticIPInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(udpTargetIPInput.value());
  if (sanitize!=null) {
    udpTargetIPInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpTargetIPInput.value(), 20);
  if (sanitize!=null) {
    udpTargetIPInput.value(sanitize);
    return;
  }  
  sanitize = checkUserIPaddress(udpGatewayInput.value());
  if (sanitize!=null) {
    udpGatewayInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpGatewayInput.value(), 20);
  if (sanitize!=null) {
    udpGatewayInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(udpSubnetInput.value());
  if (sanitize!=null) {
    udpSubnetInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpSubnetInput.value(), 20);
  if (sanitize!=null) {
    udpSubnetInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(udpPrimaryDNSInput.value());
  if (sanitize!=null) {
    udpPrimaryDNSInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpPrimaryDNSInput.value(), 20);
  if (sanitize!=null) {
    udpPrimaryDNSInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(udpSecondaryDNSInput.value());
  if (sanitize!=null) {
    udpSecondaryDNSInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(udpSecondaryDNSInput.value(), 20);
  if (sanitize!=null) {
    udpSecondaryDNSInput.value(sanitize);
    return;
  }
  sanitizer = checkUserString(udpPortInput.value(), 10);
  if (sanitizer!=null) {
    udpPortInput.value("err");
    return;
  }
  if (isNaN(udpPortInput.value())) {
    udpPortInput.value("err");
    return;
  }
  if (udpPortInput.value() <=0) {
    udpPortInput.value("err");
    return;
  }
  sanitizer = checkUserString(udpBlastCountInput.value(), 10);
  if (sanitizer!=null) {
    udpBlastCountInput.value("err");
    return;
  }
  if (isNaN(udpBlastCountInput.value())) {
    udpBlastCountInput.value("err");
    return;
  }
  if (udpBlastCountInput.value() > 100 || udpBlastCountInput.value() <=0) {
    udpBlastCountInput.value("err");
    return;
  }
  sanitizer = checkUserString(udpBlastTimeInput.value(), 10);
  if (sanitizer!=null) {
    udpBlastTimeInput.value("err");
    return;
  }
  if (isNaN(udpBlastTimeInput.value())) {
    udpBlastTimeInput.value("err");
    return;
  }
  if (udpBlastTimeInput.value() > 100 || udpBlastTimeInput.value() <=0) {
    udpBlastTimeInput.value("err");
    return;
  }
  sendData("#udp," + udpSSIDInput.value() + ","+udpPWInput.value() + ","+udpStaticIPInput.value() + ","+udpTargetIPInput.value() +
    ","+udpGatewayInput.value() + ","+udpSubnetInput.value() + ","+udpPrimaryDNSInput.value() + ","+udpSecondaryDNSInput.value()+
    ","+udpPortInput.value()+ ","+udpBlastCountInput.value()+","+udpBlastTimeInput.value());
}

function timerUnitSelectorCommand() {
  if (timerUnitSelector.value()=='Minutes') {
    sendData("#rtcme");
  } else {
    sendData("#rtcmd");
  }
}

function mqttEnableCommand() {
  if (mqttEnableCheckbox.checked()) {
    sendData("#mqen");
  } else {
    sendData("#mqdi");
  }
}
function mqttKeySaveCommand() {
  let sanitize = checkUserString(mqttUserInput.value(), 50);
  if (sanitize!=null) {
    mqttUserInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(mqttPWInput.value(), 50);
  if (sanitize!=null) {
    mqttUserInput.value(sanitize);
    return;
  }
  //sanitize = checkUserIPaddress(mqttServerInput.value());
  //if (sanitize!=null) {
  //  mqttServerInput.value(sanitize);
  //  return;
  //}
  sanitize = checkUserString(mqttServerInput.value(), 50);
  if (sanitize!=null) {
    mqttServerInput.value(sanitize);
    return;
  }
  sanitizer = checkUserString(mqttPortInput.value(), 10);
  if (sanitizer!=null) {
    mqttPortInput.value("err");
    return;
  }
  if (isNaN(mqttPortInput.value())) {
    mqttPortInput.value("err");
    return;
  }
  if (mqttPortInput.value() <=0) {
    mqttPortInput.value("err");
    return;
  }
  sanitize = checkUserString(mqttTopicInput.value(), 50);
  if (sanitize!=null) {
    mqttTopicInput.value(sanitize);
    return;
  }
  sendData("#mqset,"+mqttPortInput.value()+","+mqttServerInput.value()+","+mqttTopicInput.value()+","+mqttPWInput.value()+","+mqttUserInput.value());
}


function mqttSecEnableCommand() {
  if (mqttSecEnableCheckbox.checked()) {
    sendData("#mqsen");
  } else {
    sendData("#mqsdi");
  }
}

function staticEnableCommand() {
  if (staticEnableCheckbox.checked()) {
    sendData("#sipen");
  } else {
    sendData("#sipdi");
  }
}
function highSpeedCommand() {
  if (highSpeedEnableCheckbox.checked()) {
    sendData("#highSpdON");
  } else {
    sendData("#highSpdOFF");
  }
}

function batteryOffsetCommand() {
  let sanitizer = checkUserString(batteryOffsetInput.value(), 10);
  if (sanitizer!=null) {
    batteryOffsetInput.value("err");
    return;
  }
  if (isNaN(batteryOffsetInput.value())) {
    loBatteryInput.value("err");
    return;
  }

  sendData("#boff,"+batteryOffsetInput.value());
}

function staticSaveCommand() {
  let sanitize = checkUserIPaddress(staticIPInput.value());
  if (sanitize!=null) {
    staticIPInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(staticIPInput.value(), 20);
  if (sanitize!=null) {
    staticIPInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(staticGatewayInput.value());
  if (sanitize!=null) {
    staticGatewayInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(staticGatewayInput.value(), 20);
  if (sanitize!=null) {
    staticGatewayInput.value(sanitize);
    return;
  }
  sanitize = checkUserIPaddress(staticSubnetInput.value());
  if (sanitize!=null) {
    staticSubnetInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(staticSubnetInput.value(), 20);
  if (sanitize!=null) {
    staticSubnetInput.value(sanitize);
    return;
  } 
  sanitize = checkUserIPaddress(staticPrimaryDNSInput.value());
  if (sanitize!=null) {
    staticPrimaryDNSInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(staticPrimaryDNSInput.value(), 20);
  if (sanitize!=null) {
    staticPrimaryDNSInput.value(sanitize);
    return;
  } 
  sanitize = checkUserIPaddress(staticSecondaryDNSInput.value());
  if (sanitize!=null) {
    staticSecondaryDNSInput.value(sanitize);
    return;
  }
  sanitize = checkUserString(staticSecondaryDNSInput.value(), 20);
  if (sanitize!=null) {
    staticSecondaryDNSInput.value(sanitize);
    return;
  } 
  sendData("#sipset,"+staticIPInput.value()+","+staticGatewayInput.value()+","+staticSubnetInput.value()+","+staticPrimaryDNSInput.value()+","+staticSecondaryDNSInput.value());
}

function otaStartCommand() {
  sendData("#otaStart");
}

function udptcpSelectorCommand() {
  udpEnabled = false;
  tcpEnabled = false;
  if (udptcpSelector.value()=="Not Enabled") {
    sendData("#udd");
  } else
    if (udptcpSelector.value()=="udp") {
      sendData("#ude");
    } else
      if (udptcpSelector.value()=="tcp") {
        sendData("#tce");
      }
}

function readDocsCommand() {
  window.open('https://trigboard-docs.readthedocs.io/en/latest/configurator.html');
}
function contactCommand() {
  window.open('https://www.kdcircuits.com#contact');
}
function otaGUICommand() {
  window.open('https://github.com/krdarrah/trigUpdater/releases');
}
