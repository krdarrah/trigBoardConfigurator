
function connectToBle() {
  // Connect to a device by passing the service UUID
  blueTooth.connect("a5f125c0-7cec-4334-9214-58cffb8706c0", gotCharacteristics);
  console.log('trying to connect');
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  console.log('looking for characteristics');
  if (error) { 
    console.log('error: ', error);
  }
  console.log('characteristics: ', characteristics);

  console.log(characteristics.length);
  if (characteristics.length != 2) {
    return;
  }


  for (let i=0; i<2; i++) {
    if (characteristics[i].uuid == 'a5f125c1-7cec-4334-9214-58cffb8706c0') {
      blueToothTXCharacteristic = characteristics[i];
    }
    if (characteristics[i].uuid == 'a5f125c2-7cec-4334-9214-58cffb8706c0') {
      blueToothRXCharacteristic = characteristics[i];
    }
  }

  blueTooth.startNotifications(blueToothRXCharacteristic, gotValue, 'string');
  isConnected = blueTooth.isConnected();

  connectButton.hide();
  showAllParam();

  // Add a event handler when the device is disconnected
  blueTooth.onDisconnected(onDisconnected);
}


// A function that will be called once got values
function gotValue(value) {
  // console.log('value: ', value);
  let splitString = split(value, ',');
  if (splitString[0]=='stat') {//status string
    newData=true;
    if (OTAisActive) {
      OTAisActive = false;
      //OTAinProgress=" ";
      showAllParam();
    }
    if (splitString[1]=='co') {
      wifiConnected=true;
    } else {
      wifiConnected=false;
    }
    batteryVoltage = splitString[2];
    if (splitString[3]=='op') {
      contactOpen=true;
    } else {
      contactOpen=false;
    }
    if (splitString[4]=='bt') {
      buttonPressed=true;
    } else {
      buttonPressed=false;
    }
    macAddress = splitString[5];
    fwVersion = splitString[6];
    ipAddress = splitString[7];
    connectedSSID = splitString[8];
    //here is where time can go
    if (splitString[9]!=null) {
      document.getElementById("currentTimeID").innerHTML = splitString[9];
    }

    if (wifiConnected) {
      otaStartButton.show();
      otaHelpTextTitle.hide();
    } else {
      otaStartButton.hide();
      otaHelpTextTitle.show();
    }

    if (firstConnected) {
      sendData("#param,");
    }
  }


  if (splitString[0]=='ssid') {//ssid string
    firstConnected = false;
    ssidInput.value(splitString[1]);
  }
  if (splitString[0]=='pw') {//pw string
    pwInput.value(splitString[1]);
  }
  if (splitString[0]=='tout') {//timeout
    wifiTimeoutInput.value(splitString[1]/1000);
  }
  if (splitString[0]=='name') {//name
    trigBoardNameInput.value(splitString[1]);
  }
  if (splitString[0]=='sel') {//selection
    triggerOpensTitle.hide();
    triggerOpensInput.hide();
    triggerOpensButton.hide();
    triggerClosesTitle.hide();
    triggerClosesInput.hide();
    triggerClosesButton.hide();
    if (splitString[1]=='Close') {
      triggerSelector.value('Contact Close');
      triggerClosesTitle.show();
      triggerClosesInput.show();
      triggerClosesButton.show();
    }
    if (splitString[1]=='Open') {
      triggerSelector.value('Contact Open');
      triggerOpensTitle.show();
      triggerOpensInput.show();
      triggerOpensButton.show();
    }    
    if (splitString[1]=='Both') {
      triggerSelector.value('Open and Close');
      triggerOpensTitle.show();
      triggerOpensInput.show();
      triggerOpensButton.show();
      triggerClosesTitle.show();
      triggerClosesInput.show();
      triggerClosesButton.show();
    }
  }
  if (splitString[0]=='ope') {//open message
    triggerOpensInput.value(splitString[1]);
  }
  if (splitString[0]=='clo') {//close message
    triggerClosesInput.value(splitString[1]);
  } 
  if (splitString[0]=='tim') {//countdown
    timerInput.value(splitString[1]);
  }
  if (splitString[0]=='tse') {//timer select
    if (splitString[1]=='Nothing') {
      timerSelector.value('Nothing');
      timerStillOpenTitle.hide();
      timerStillOpenInput.hide();
      timerStillOpenButton.hide();
      timerStillClosedTitle.hide();
      timerStillClosedInput.hide();
      timerStillClosedButton.hide();
    }
    if (splitString[1]=='Closed') {
      timerSelector.value('Contact Still Closed');
      timerStillOpenTitle.hide();
      timerStillOpenInput.hide();
      timerStillOpenButton.hide();
      timerStillClosedTitle.show();
      timerStillClosedInput.show();
      timerStillClosedButton.show();
    }
    if (splitString[1]=='Open') {
      timerSelector.value('Contact Still Open');
      timerStillOpenTitle.show();
      timerStillOpenInput.show();
      timerStillOpenButton.show();
      timerStillClosedTitle.hide();
      timerStillClosedInput.hide();
      timerStillClosedButton.hide();
    }
    if (splitString[1]=='Either') {
      timerSelector.value('Either Contact');
      timerStillOpenTitle.show();
      timerStillOpenInput.show();
      timerStillOpenButton.show();
      timerStillClosedTitle.show();
      timerStillClosedInput.show();
      timerStillClosedButton.show();
    }
  }
  if (splitString[0]=='tso') {//still open
    timerStillOpenInput.value(splitString[1]);
  }
  if (splitString[0]=='tsc') {//still closed
    timerStillClosedInput.value(splitString[1]);
  }  
  if (splitString[0]=='lob') {//voltage
    loBatteryInput.value(splitString[1]);
  }
  if (splitString[0]=='bof') {//battery offset
    batteryOffsetInput.value(splitString[1]);
  } 



  if (splitString[0]=='poe') {//push over enable
    if (splitString[1]=='t') {
      pushOverEnableCheckbox.checked(true);
      pushCredentTitle.show();
      pushuserTitle.show();
      pushuserInput.show();
      pushapiTitle.show();
      pushapiInput.show();
      pushOverSaveButton.show();
    } else {
      pushOverEnableCheckbox.checked(false);
      pushCredentTitle.hide();
      pushuserTitle.hide();
      pushuserInput.hide();
      pushapiTitle.hide();
      pushapiInput.hide();
      pushOverSaveButton.hide();
    }
  } 
  if (splitString[0]=='pouser') {//user key
    pushuserInput.value(splitString[1]);
  }  
  if (splitString[0]=='poapi') {//api key
    pushapiInput.value(splitString[1]);
  }
  if (splitString[0]=='wak') {//wake button message
    wakeButtonInput.value(splitString[1]);
  }

  if (splitString[0]=='pse') {//push safer enable
    if (splitString[1]=='t') {
      pushSaferEnableCheckbox.checked(true);
      pushSaferTitle.show();
      pushSaferKeyTitle.show();
      pushSaferInput.show();
      pushSaferSaveButton.show();
    } else {
      pushSaferEnableCheckbox.checked(false);
      pushSaferTitle.hide();
      pushSaferKeyTitle.hide();
      pushSaferInput.hide();
      pushSaferSaveButton.hide();
    }
  }
  if (splitString[0]=='psk') {//push safer key
    pushSaferInput.value(splitString[1]);
  }
  if (splitString[0]=='ife') {//ifttt enable
    if (splitString[1]=='t') {
      iftttEnableCheckbox.checked(true);
      iftttTitle.show();
      iftttKeyTitle.show();
      iftttInput.show();
      iftttSaveButton.show();
    } else {
      iftttEnableCheckbox.checked(false);
      iftttTitle.hide();
      iftttKeyTitle.hide();
      iftttInput.hide();
      iftttSaveButton.hide();
    }
  }
  if (splitString[0]=='ifk') {//ifttt key
    iftttInput.value(splitString[1]);
  }
  if (splitString[0]=='telegramEnable') {//telegram enable
    if (splitString[1]=='t') {
      telegramEnableCheckbox.checked(true);
      telegramCredentTitle.show();
      telegramBOTTitle.show();
      telegramBOTInput.show();
      telegramCHATTitle.show();
      telegramCHATInput.show();
      telegramSaveButton.show();
    } else {
      iftttEnableCheckbox.checked(false);
      telegramCredentTitle.hide();
      telegramBOTTitle.hide();
      telegramBOTInput.hide();
      telegramCHATTitle.hide();
      telegramCHATInput.hide();
      telegramSaveButton.hide();
    }
  }
  if (splitString[0]=='telegramBOT') {//telegram bot token
    telegramBOTInput.value(splitString[1]);
  }
  if (splitString[0]=='telegramCHAT') {//telegram chat ID
    telegramCHATInput.value(splitString[1]);
  }


  if (splitString[0]=='ude') {//udp enable
    udpEnabled=false;
    if (splitString[1]=='t') {
      udpEnabled=true;
      udptcpSelector.value('udp');
      tcpReCountTitle.hide();
      udpTitle.show();
      tcpTitle.hide();
      udpSSIDTitle.show();
      udpSSIDInput.show();
      udpPWTitle.show();
      udpPWInput.show();
      udpStaticIPTitle.show();
      udpStaticIPInput.show();
      udpTargetIPTitle.show();
      udpTargetIPInput.show();
      udpPortTitle.show();
      udpPortInput.show();
      udpGatewayTitle.show();
      udpGatewayInput.show();
      udpSubnetTitle.show();
      udpSubnetInput.show();
      udpPrimaryDNSTitle.show();
      udpPrimaryDNSInput.show();
      udpSecondaryDNSTitle.show();
      udpSecondaryDNSInput.show();
      udpSaveButton.show();
      udpBlastCountTitle.show();
      udpBlastCountInput.show();
      udpBlastTimeTitle.show();
      udpBlastTimeInput.show();
    }
  }
  if (splitString[0]=='tce') {//tcp enable
    tcpEnabled=false;
    if (splitString[1]=='t') {
      tcpEnabled=true;
      udptcpSelector.value('tcp');
      udpTitle.hide();
      tcpTitle.show();
      udpSSIDTitle.show();
      udpSSIDInput.show();
      udpPWTitle.show();
      udpPWInput.show();
      udpStaticIPTitle.show();
      udpStaticIPInput.show();
      udpTargetIPTitle.show();
      udpTargetIPInput.show();
      udpPortTitle.hide();
      udpPortInput.hide();
      udpGatewayTitle.show();
      udpGatewayInput.show();
      udpSubnetTitle.show();
      udpSubnetInput.show();
      udpPrimaryDNSTitle.show();
      udpPrimaryDNSInput.show();
      udpSecondaryDNSTitle.show();
      udpSecondaryDNSInput.show();
      udpSaveButton.show();
      tcpReCountTitle.show();
      udpBlastCountTitle.hide();
      udpBlastCountInput.show();
      udpBlastTimeTitle.hide();
      udpBlastTimeInput.hide();
    }
  }  

  if (!udpEnabled && !tcpEnabled && (splitString[0]=='tce' || splitString[0]=='ude')) {
    udptcpSelector.value('Not Enabled');
    tcpTitle.hide();
    udpTitle.hide();
    udpSSIDTitle.hide();
    udpSSIDInput.hide();
    udpPWTitle.hide();
    udpPWInput.hide();
    udpStaticIPTitle.hide();
    udpStaticIPInput.hide();
    udpTargetIPTitle.hide();
    udpTargetIPInput.hide();
    udpPortTitle.hide();
    udpPortInput.hide();
    udpGatewayTitle.hide();
    udpGatewayInput.hide();
    udpSubnetTitle.hide();
    udpSubnetInput.hide();
    udpPrimaryDNSTitle.hide();
    udpPrimaryDNSInput.hide();
    udpSecondaryDNSTitle.hide();
    udpSecondaryDNSInput.hide();
    udpSaveButton.hide();
    udpBlastCountTitle.hide();
    udpBlastCountInput.hide();
    udpBlastTimeTitle.hide();
    udpBlastTimeInput.hide();
    tcpReCountTitle.hide();
  }

  if (splitString[0]=='udt') {//udp settings
    udpTargetIPInput.value(splitString[1]);
  }
  if (splitString[0]=='uds') {//udp settings
    udpStaticIPInput.value(splitString[1]);
  } 
  if (splitString[0]=='udg') {//udp settings
    udpGatewayInput.value(splitString[1]);
  }  
  if (splitString[0]=='udb') {//udp settings
    udpSubnetInput.value(splitString[1]);
  }
  if (splitString[0]=='uddns') {//udp settings
    udpPrimaryDNSInput.value(splitString[1]);
  } 
  if (splitString[0]=='uddnss') {//udp settings
    udpSecondaryDNSInput.value(splitString[1]);
  }
  if (splitString[0]=='udsi') {//udp settings
    udpSSIDInput.value(splitString[1]);
  }
  if (splitString[0]=='udpw') {//udp settings
    udpPWInput.value(splitString[1]);
  }
  if (splitString[0]=='udport') {//udp settings
    udpPortInput.value(splitString[1]);
  }

  if (splitString[0]=='rtcm') {//timer units 
    if (splitString[1]=='t') {
      timerUnitSelector.value('Minutes');
    } else {
      timerUnitSelector.value('Seconds');
    }
  }
  if (splitString[0]=='mqe') {//mqtt enable
    if (splitString[1]=='t') {
      mqttEnableCheckbox.checked(true);
      mqttTitle.show();
      mqttPortTitle.show();
      mqttPortInput.show();
      mqttServerTitle.show();
      mqttServerInput.show();
      mqttTopicTitle.show();
      mqttTopicInput.show();
      mqttSaveButton.show();
      mqttSecEnableTitle.show();
      mqttSecEnableCheckbox.show();
      mqttSecEnableButton.show();
      //mqttUserTitle.show();
      //mqttUserInput.show();
      //mqttPWTitle.show();
      //mqttPWInput.show();
    } else {
      mqttEnableCheckbox.checked(false);
      mqttTitle.hide();
      mqttPortTitle.hide();
      mqttPortInput.hide();
      mqttServerTitle.hide();
      mqttServerInput.hide();
      mqttTopicTitle.hide();
      mqttTopicInput.hide();
      mqttSaveButton.hide();
      mqttSecEnableTitle.hide();
      mqttSecEnableCheckbox.hide();
      mqttSecEnableButton.hide();
      mqttUserTitle.hide();
      mqttUserInput.hide();
      mqttPWTitle.hide();
      mqttPWInput.hide();
    }
  }

  if (splitString[0]=='mqp') {//mqtt port 
    mqttPortInput.value(splitString[1]);
  }

  if (splitString[0]=='mqs') {//mqtt server 
    mqttServerInput.value(splitString[1]);
  }
  if (splitString[0]=='mqt') {//mqtt topic 
    mqttTopicInput.value(splitString[1]);
  }


  if (splitString[0]=='mqse') {//mqtt sec enable 
    if (splitString[1]=='t') {
      mqttSecEnableCheckbox.checked(true);
      mqttUserTitle.show();
      mqttUserInput.show();
      mqttPWTitle.show();
      mqttPWInput.show();
    } else {
      mqttSecEnableCheckbox.checked(false);
      mqttUserTitle.hide();
      mqttUserInput.hide();
      mqttPWTitle.hide();
      mqttPWInput.hide();
    }
  }

  if (splitString[0]=='mqsu') {//mqtt user 
    mqttUserInput.value(splitString[1]);
  }
  if (splitString[0]=='mqsp') {//mqtt user 
    mqttPWInput.value(splitString[1]);
  }
  if (splitString[0]=='mqsp') {//mqtt user 
    mqttPWInput.value(splitString[1]);
  }
  if (splitString[0]=='sipen') {//static ip enable 
    if (splitString[1]=='t') {
      staticEnableCheckbox.checked(true);
      staticIPTitle.show();
      staticIPInput.show();
      staticGatewayTitle.show();
      staticSubnetInput.show();
      staticPrimaryDNSTitle.show();
      staticPrimaryDNSInput.show();
      staticSecondaryDNSTitle.show();
      staticSecondaryDNSInput.show();
      staticSaveButton.show();
      staticGatewayInput.show();
      staticSubnetTitle.show();
    } else {
      staticEnableCheckbox.checked(false);
      staticIPTitle.hide();
      staticIPInput.hide();
      staticGatewayTitle.hide();
      staticSubnetInput.hide();
      staticPrimaryDNSTitle.hide();
      staticPrimaryDNSInput.hide();
      staticSecondaryDNSTitle.hide();
      staticSecondaryDNSInput.hide();
      staticSaveButton.hide();
      staticGatewayInput.hide();
      staticSubnetTitle.hide();
    }
  }
  if (splitString[0]=='sip') {//static ip
    staticIPInput.value(splitString[1]);
  }
  if (splitString[0]=='gip') {//gateway ip
    staticGatewayInput.value(splitString[1]);
  }
  if (splitString[0]=='suip') {//subnet ip
    staticSubnetInput.value(splitString[1]);
  }  
  if (splitString[0]=='pdnsip') {//prim dns
    staticPrimaryDNSInput.value(splitString[1]);
  }
  if (splitString[0]=='sdnsip') {//sec dns
    staticSecondaryDNSInput.value(splitString[1]);
  }
  if (splitString[0]=='udpBla') {//udp blast count
    udpBlastCountInput.value(splitString[1]);
  }
  if (splitString[0]=='udpTim') {//udp time
    udpBlastTimeInput.value(splitString[1]);
  }

  if (splitString[0]=='highSpd') {//high speed mode
    if (splitString[1]=='t') {
      highSpeedEnableCheckbox.checked(true);
    } else {
      highSpeedEnableCheckbox.checked(false);
    }
  }
  if (splitString[0]=='clkEnable') {//clock enable
    if (splitString[1]=='t') {
      clockTimerEnableCheckbox.checked(true);
      clockCurrentTime.show();
      clockTimeZoneTitle.show();
      clockTimeZone.show();
      clockTimeZoneButton.show();
      clockSetTimeNTPtitle.show();
      clockAppendTitle.show();
      clockAppendCheckbox.show();
      clockAppendButton.show();
      clockAlarmEnableTitle.show();
      clockAlarmEnableCheckbox.show();
      clockAlarmEnableButton.show();
    } else {
      clockTimerEnableCheckbox.checked(false);
      clockCurrentTime.hide();
      clockTimeZoneTitle.hide();
      clockTimeZone.hide();
      clockTimeZoneButton.hide();
      clockSetTimeNTPtitle.hide();
      clockSetTimeButton.hide();
      clockAppendTitle.hide();
      clockAppendCheckbox.hide();
      clockAppendButton.hide();
      clockAlarmEnableTitle.hide();
      clockAlarmEnableCheckbox.hide();
      clockAlarmEnableButton.hide();
      clockAlarmSettingTitle.hide();
      clockAlarmHour.hide();
      clockAlarmMinute.hide();
      clockAlarmButton.hide();
      clockNTPupdateonAlarmTitle.hide();
      clockNTPupdateonAlarmCheckbox.hide();
      clockNTPupdateonAlarmButton.hide();
      clockAlarmMessageTitle.hide();
      clockAlarmMessage.hide();
      clockAlarmMessageButton.hide();
    }
  }

  if (wifiConnected && clockTimerEnableCheckbox.checked()) {
    document.getElementById("clockSetTimeNTPtitleID").innerHTML = "Set Time with NTP server ";
    clockSetTimeButton.show();
  } else {
    document.getElementById("clockSetTimeNTPtitleID").innerHTML = "Note: Connect to WiFi to set Time from NTP Server! ";
    clockSetTimeButton.hide();
  }

  if (splitString[0]=='clkTimeZone') {//clock time zone
    clockTimeZone.value(splitString[1]);
  }
  if (splitString[0]=='clkAppendEnable') {//clock append enable
    if (splitString[1]=='t') {
      clockAppendCheckbox.checked(true);
    } else {
      clockAppendCheckbox.checked(false);
    }
  }
  if (splitString[0]=='clkAlarmEnable') {//clock append enable
    if (splitString[1]=='t') {
      clockAlarmEnableCheckbox.checked(true);
      clockAlarmSettingTitle.show();
      clockAlarmHour.show();
      clockAlarmMinute.show();
      clockAlarmButton.show();
      clockNTPupdateonAlarmTitle.show();
      clockNTPupdateonAlarmCheckbox.show();
      clockNTPupdateonAlarmButton.show();
      clockAlarmMessageTitle.show();
      clockAlarmMessage.show();
      clockAlarmMessageButton.show();
      clockAppendAlarmTitle.show();
      clockAppendAlarmCheckbox.show();
      clockAppendAlarmButton.show();
    } else {
      clockAlarmEnableCheckbox.checked(false);
      clockAlarmSettingTitle.hide();
      clockAlarmHour.hide();
      clockAlarmMinute.hide();
      clockAlarmButton.hide();
      clockNTPupdateonAlarmTitle.hide();
      clockNTPupdateonAlarmCheckbox.hide();
      clockNTPupdateonAlarmButton.hide();
      clockAlarmMessageTitle.hide();
      clockAlarmMessage.hide();
      clockAlarmMessageButton.hide();
      clockAppendAlarmTitle.hide();
      clockAppendAlarmCheckbox.hide();
      clockAppendAlarmButton.hide();
    }
  }
  if (splitString[0]=='clkAlarmHour') {//clock alarm hour
    clockAlarmHour.value(splitString[1]);
  }
  if (splitString[0]=='clkAlarmMinute') {//clock alarm hour
    clockAlarmMinute.value(splitString[1]);
  }
  if (splitString[0]=='clkUpdateNPTenable') {//clock NPT update
    if (splitString[1]=='t') {
      clockNTPupdateonAlarmCheckbox.checked(true);
    } else {
      clockNTPupdateonAlarmCheckbox.checked(false);
    }
  }
  if (splitString[0]=='clkAlarmMessage') {//clock alarm message
    clockAlarmMessage.value(splitString[1]);
  }
  if (splitString[0]=='clkAppendAlmEnable') {//clock alarm append time
    if (splitString[1]=='t') {
      clockAppendAlarmCheckbox.checked(true);
    } else {
      clockAppendAlarmCheckbox.checked(false);
    }
  }

  if (splitString[0]=='appendRSSI') {//append rssi
    if (splitString[1]=='t') {
      appendRSSIenableCheckbox.checked(true);
    } else {
      appendRSSIenableCheckbox.checked(false);
    }
  }

  if (splitString[0]=='missionEnable') {//mission critical enable
    if (splitString[1]=='t') {
      missionCriticalEnableCheckbox.checked(true);
      missionCriticalTimeTitle.show();
      missionCriticalTimeInput.show();
      missionCriticalTimeButton.show();
    } else {
      missionCriticalEnableCheckbox.checked(false);
      missionCriticalTimeTitle.hide();
      missionCriticalTimeInput.hide();
      missionCriticalTimeButton.hide();
    }
  }

  if (splitString[0]=='missionTimeafter') {//mission critical time
    missionCriticalTimeInput.value(splitString[1]);
  }


  if (splitString[0]=='OTAprog') {//OTA IS IN PROGRESS
    OTAinProgress=splitString[1];
    OTAisActive = true;
    hideAllParam();
  }
}

function onDisconnected() {
  console.log('Device got disconnected.');
  isConnected = false;
  firstConnected = true;
  connectButton.show();
  hideAllParam();
}

function sendData(data) {
  const inputValue = data;
  if (!("TextEncoder" in window)) {
    console.log("Sorry, this browser does not support TextEncoder...");
  }
  var enc = new TextEncoder(); // always utf-8
  blueToothTXCharacteristic.writeValue(enc.encode(inputValue));
}
