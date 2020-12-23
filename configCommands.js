function saveWiFi() {
  sendData("#wifi,"+ssidInput.value() + "," + pwInput.value());
}
function wifiTimeoutCommand() {
  sendData("#tout,"+wifiTimeoutInput.value());
}

function trigBoardNameCommand() {

  sendData("#name,"+trigBoardNameInput.value());
}

function triggerSelectorCommand() {
  sendData("#sel,"+triggerSelector.value());
}

function triggerOpensCommand() {
  sendData("#ope,"+triggerOpensInput.value());
}
function triggerClosesCommand() {
  sendData("#clo,"+triggerClosesInput.value());
}
function timerCommand() {
  sendData("#tim,"+timerInput.value());
}
function timerSelectorCommand() {
  sendData("#tse,"+trim(timerSelector.value()));
}

function timerStillOpenCommand() {
  sendData("#tso,"+timerStillOpenInput.value());
}
function timerStillClosedCommand() {
  sendData("#tsc,"+timerStillClosedInput.value());
}
function loBatteryCommand() {
  sendData("#lob,"+loBatteryInput.value());
}
function pushOverSaveCommand() {
  sendData("#pov,"+pushuserInput.value() +","+pushapiInput.value());
}
function pushOverTestCommand() {
  sendData("#pot");
}
function wakeButtonCommand() {
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
  sendData("#ifk,"+iftttInput.value());
}

//function udpEnableCommand() {
//  if (udpEnableCheckbox.checked()) {
//    sendData("#ude");
//  } else {
//    sendData("#udd");
//  }
//}

function udpSaveCommand() {//we also use this for saving tcp settings
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
  sendData("#boff,"+batteryOffsetInput.value());
}

function staticSaveCommand() {
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
