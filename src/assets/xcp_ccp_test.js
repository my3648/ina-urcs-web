function get_load(fileType, protocol, signalArr) {
  var {
    Baudrate,
    CANFDBaudrate,
    MAX_BUS_LOAD,
    DAQ_MEMORY_LIMIT,
    DAQ_SIZE,
    ODT_SIZE,
    ODT_ENTRY_SIZE,
    ODT_DAQ_BUFFER_ELEMENT_SIZE,
    CycleNum,
    CANType,
    odtMaxNum
  } = protocol
  // xcp能改baudrate
  // var XCP = 1 //a2l
  // var CCP = 0 //a2l 
  // console.log("please imput 0 or 1 [0:CCP, 1:XCP]\n");


  if (fileType == 'xcp') {
    var opt0 = optmizeVar(signalArr[0], signalArr[0].length)
    var opt1 = optmizeVar(signalArr[1], signalArr[1].length)
    var opt2 = optmizeVar(signalArr[2], signalArr[2].length)
    var odtNum0 = opt0[1];
    var odtNum1 = opt1[1];
    var odtNum2 = opt2[1];
    var measurement = [opt0[2], opt1[2], opt2[2]]
    var varNum = signalArr[0].length + signalArr[1].length + signalArr[2].length
    var var_new0 = opt0[0];
    var var_new1 = opt1[0];
    var var_new2 = opt2[0];

    var varSizeSUM = 0;

    for (var i = 0; i < var_new0.length; i++) {
      varSizeSUM += var_new0[i].size;
    }

    for (var i = 0; i < var_new1.length; i++) {
      varSizeSUM += var_new1[i].size;
    }

    for (var i = 0; i < var_new2.length; i++) {
      varSizeSUM += var_new2[i].size;
    }


    var odtNum = odtNum0 + odtNum1 + odtNum2

    // var CANType = CAN; // CANType can be CAN or CANFD
    // if(通道名称=='sync'){
    //   if(CANType==CAN){
    //     CycleNum=0.005
    //   }else{
    //     CycleNum=0.004

    //   }
    // }
    // var CycleNum = 0.01; // 0.005 for syn channel   0.01 for 10ms channel ......

    var busload0 = getBusload(CANType, CycleNum[0], odtNum0, Baudrate, MAX_BUS_LOAD, CANFDBaudrate);
    var busload1 = getBusload(CANType, CycleNum[1], odtNum1, Baudrate, MAX_BUS_LOAD, CANFDBaudrate);
    var busload2 = getBusload(CANType, CycleNum[2], odtNum2, Baudrate, MAX_BUS_LOAD, CANFDBaudrate);
    console.log('busload0', busload0);
    console.log('busload1', busload1);
    console.log('busload2', busload2);
    var busload = busload0 + busload1 + busload2
    var odtNum_1st_channel = odtNum0;
    var odtNum_2st_channel = odtNum1;
    var firstPID_1st_channel = 0;
    var firstPID_2st_channel = odtNum_1st_channel + firstPID_1st_channel;
    var firstPID_3st_channel = firstPID_2st_channel + odtNum_2st_channel;
    var firstPID = [
      firstPID_1st_channel, firstPID_2st_channel, firstPID_3st_channel
    ]
    var daqNum = 0; //几个通道DAQNUM为X
    signalArr.forEach((item, index) => {
      if (item.length > 0) {
        daqNum++
      }
    })
    console.log("daqNum:", daqNum, "DAQ_SIZE:", DAQ_SIZE, "odtNum:", odtNum,
     "ODT_SIZE:", ODT_SIZE, "varNum:", varNum, "ODT_ENTRY_SIZE:", ODT_ENTRY_SIZE,
      "varSizeSUM:", varSizeSUM, "ODT_DAQ_BUFFER_ELEMENT_SIZE:", ODT_DAQ_BUFFER_ELEMENT_SIZE,
       "DAQ_MEMORY_LIMIT:", DAQ_MEMORY_LIMIT);


    var memoryLoad = (daqNum * DAQ_SIZE + odtNum * ODT_SIZE + varNum * ODT_ENTRY_SIZE + (varSizeSUM + odtNum) * ODT_DAQ_BUFFER_ELEMENT_SIZE) / (DAQ_MEMORY_LIMIT * 1.0);
    console.log("busload:", busload, "memoryLoad:", memoryLoad, "firstPID:", firstPID, "measurement:", measurement);
    return [busload, memoryLoad, firstPID, measurement]

  } else {
    if (fileType == 'ccp') {
      var opt0 = optmizeVar(signalArr[0], signalArr[0].length)
      var opt1 = optmizeVar(signalArr[1], signalArr[1].length)
      var opt2 = optmizeVar(signalArr[2], signalArr[2].length)
      var var_new0 = opt0[0];
      var var_new1 = opt1[0];
      var var_new2 = opt2[0];
      var measurement = [opt0[2], opt1[2], opt2[2]]
      var varSizeSUM0 = 0;
      var varSizeSUM1 = 0;
      var varSizeSUM2 = 0;
      for (var i = 0; i < var_new0.length; i++) {
        varSizeSUM0 += var_new0[i].size;
      }
      for (var i = 0; i < var_new1.length; i++) {
        varSizeSUM1 += var_new1[i].size;
      }
      for (var i = 0; i < var_new2.length; i++) {
        varSizeSUM2 += var_new2[i].size;
      }
      var ccp_load0 = varSizeSUM0 / (odtMaxNum[0] * 7.0);
      var ccp_load1 = varSizeSUM1 / (odtMaxNum[1] * 7.0);
      var ccp_load2 = varSizeSUM2 / (odtMaxNum[2] * 7.0);
      console.log("ccp_load0:", ccp_load0, "ccp_load1:", ccp_load1, "ccp_load1:", ccp_load1, "measurement:", measurement);
      return [ccp_load0, ccp_load1, ccp_load2, measurement]
    }
  }
}

function optmizeVar(var_old, varNum) {
  var_old.sort((a, b) => {
    return b.size - a.size
  })
  var new_ = var_old;
  // console.log(new_);

  if (varNum != 0) {
    var arr = [
      []
    ]
    var odt = [0];

  } else {
    var arr = []
    var odt = []

  }

  for (var i = 0; i < varNum; i++) {
    // var num=0;
    var size = new_[i].size;
    var name = new_[i].name;
    var flag = false;
    for (var j = 0; j < odt.length; j++) {
      if (odt[j] + size < 8) {
        odt[j] += size
        arr[j].push(name)
        flag = true;
        break;
      }
    }
    if (!flag) {
      odt.push(size)
      arr.push([name])
    }
    // if (odt[odt.length - 1] +new_[i].size < 8) {
    //   odt[odt.length - 1] += new_[i].size
    //   arr[arr.length - 1].push(new_[i].name)
    // } else {
    //   odt.push(new_[i].size)
    //   arr.push([new_[i].name])
    // }
  }
  // console.log('结束')


  console.log(["new_:", new_, "odt:", odt, "arr:", arr])

  return [new_, odt.length, arr];
}
//CycleNum 0.1 0.01 0.005 
function getBusload(CANType, CycleNum, odtNum, Baudrate, MAX_BUS_LOAD, CANFDBaudrate) {
  var busload = 0;
  if (0 == CANType) //can
  {
    console.log('CAN');
    console.log("CANType:", CANType, "CycleNum:", CycleNum, "odtNum:", odtNum, "Baudrate:", Baudrate, "MAX_BUS_LOAD:", MAX_BUS_LOAD, "CANFDBaudrate:", CANFDBaudrate);
    var odtBitLen = 120;
    busload = ((odtNum / CycleNum) * odtBitLen * 100) / (Baudrate * MAX_BUS_LOAD);
  } else {
    if (1 == CANType) //canfd
    {
      console.log('CANFD');

      var arbitrationField_bitLen = 108;
      var dataField_bitLen = 28;
      // var CANFDBaudrate=2000000;

      console.log('odtNum', odtNum);
      console.log('CycleNum', CycleNum);
      console.log('arbitrationField_bitLen', arbitrationField_bitLen);
      console.log('CANFDBaudrate', CANFDBaudrate);
      console.log('dataField_bitLen', dataField_bitLen);
      console.log('Baudrate', Baudrate);
      console.log('MAX_BUS_LOAD', MAX_BUS_LOAD);
      busload = ((((odtNum / CycleNum) * arbitrationField_bitLen) / CANFDBaudrate + ((odtNum / CycleNum) * dataField_bitLen) / Baudrate) * 100) / MAX_BUS_LOAD;
    }
  }
  return busload;
}
export {
  get_load
}
