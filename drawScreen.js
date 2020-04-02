
function drawScreen() {
  textSize(18);
  textAlign(LEFT, TOP);
  background(255);
  fill(0);
  image(trigBoardlogoImg, 0, 0);
  if (isConnected) {
    //text('Bluetooth Connected :)', 10, 140);
    if (newData) {
      image(trigBoardImg, 144, 160);
      noStroke();
      if (millis()-LEDblinkStartTime < 200) {
        fill(71, 134, 222, 150);//LED flasher
        rect(243, 520, 13, 20);
      }
      if (millis()-LEDblinkStartTime > 400) {
        LEDblinkStartTime=millis();
      }

      if (OTAisActive) {
        fill(255, 0, 0);
        text("OTA: "+OTAinProgress, 15, 200);
      }


      fill(0);

      textAlign(CENTER, TOP);

      if (wifiConnected) {
        textSize(14);
        fill(0, 255, 0);
        text('WiFi\nConnected\n'+connectedSSID+'\n'+ipAddress, 250, 250);
      } else {
        fill(255, 0, 0);
        text('WiFi\nDisonnected', 250, 250);
      }
      textSize(18);
      fill(0);
      text('Firmware Version: '+ fwVersion, 250, 120);
      text('MAC: '+macAddress, 250, 140);



      if (buttonPressed) {
        fill(0, 255, 0, 127);
        rect(282, 420, 40, 40);//wake button rectangle
      }
      fill(0);
      text(batteryVoltage+"V", 299, 565);
      if (contactOpen) {
        text("Contact\nOpen", 199, 565);
      } else {
        text("Contact\nClosed", 199, 565);
      }
    }
  } else {
    //text('Bluetooth Disconnected :/', 80, 150);
    newData=false;
  }
}
