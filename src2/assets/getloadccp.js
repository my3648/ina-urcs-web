function alloc_variabe_ccp(variable_size_list, daq_list, FirstPID, LENGTH) {
  // '''
  // 将变量的字节数组分配给daq内的odt列表，返回最后一个odt的编号
  // :param variable_size_list :变量的字节大小组成的数组
  // :param daq_list :daq表，daq与事件通道一一对应
  // :param FirstPID :此daq的第一个odt_NO
  // :param LENGTH :此daq的最大odt_num，即odt数量
  // :return 
  // '''
  var odt_NO = FirstPID
  daq_list[odt_NO] = 0
  // var outofmemory = 0
  // var remain_size = 7 * LENGTH
  var total_size = 7*LENGTH 
  var legal_byte_size = 0  
  var illegal_byte_size = 0 
  while (variable_size_list.length != 0) {
    // # take out the last variable_size_channel_0 element in turn
    var size_add = variable_size_list.sort().pop()
    var i = FirstPID
    var odt_NO = i
    var succesful_add = 0 // # 0: failed, add to next odt_NO; 1: succesful add in this odt_NO
    
    while (i <= 251 && succesful_add == 0) {
      if (i <=(FirstPID + LENGTH -1)){
        if ((daq_list[odt_NO] + size_add) <= 7) {
          console.log(odt_NO);
          daq_list[odt_NO] = daq_list[odt_NO] + size_add
          succesful_add = 1
          legal_byte_size = legal_byte_size + size_add
        } else {
      
          i++
          // if ((i + 1 - FirstPID) > LENGTH) {
          //   outofmemory = 1
          //   break
            
          // }
        
          odt_NO = i
       
          if (!daq_list[odt_NO]) {
            console.log(Object.keys(daq_list).pop());
            console.log(FirstPID);
            daq_list[odt_NO] = 0 //# creat a new odt_NO for adding the variable
            
  
          }
  
  
        }
  
      }else {
        if ((daq_list[odt_NO] + size_add) <= 7) {
          console.log(odt_NO);
          daq_list[odt_NO] = daq_list[odt_NO] + size_add
          succesful_add = 1
          illegal_byte_size = illegal_byte_size + size_add
        } else {
      
          i++
          // if ((i + 1 - FirstPID) > LENGTH) {
          //   outofmemory = 1
          //   break
            
          // }
        
          odt_NO = i
       
          if (!daq_list[odt_NO]) {
            console.log(Object.keys(daq_list).pop());
            console.log(FirstPID);
            daq_list[odt_NO] = 0 //# creat a new odt_NO for adding the variable
            
  
          }
  
  
        }
  

      }

    }
   

  }
  if (illegal_byte_size == 0){
    console.log(legal_byte_size);
    console.log(total_size);
   var channel_load = 100*legal_byte_size/total_size 
  }
  
else{
  console.log(illegal_byte_size);
    console.log(legal_byte_size);
  var channel_load =100* (1 + illegal_byte_size/legal_byte_size)  

}
var odt_num = Object.keys(daq_list).pop() - FirstPID + 1
  // console.log(odt_num);
  console.log(daq_list)
  return [channel_load, odt_num]
}



function get_load_ccp(variable_size_channel_0, variable_size_channel_1, variable_size_channel_2, daq_config) {
  // var LENGTH0 = daq_config['LENGTH0']
  console.log(daq_config);
  console.log(daq_config.DAQ);
  console.log(daq_config.DAQ['10ms time synchronous']);
  var daq_list_channel_0 = {}
  var daq_list_channel_1 = {}
  var daq_list_channel_2 = {}
  var busload0 = 0
  var busload1 = 0
  var busload2 = 0
  var channel_load0 = 0
  var channel_load1 = 0
  var channel_load2 = 0
  // var remain_size0 = 7 * daq_config.DAQ['segment synchronous']['LENGTH']
  // var remain_size1 = 7 * daq_config.DAQ['10ms time synchronous']['LENGTH']
  // var remain_size2 = 7 * daq_config.DAQ['100ms time synchronous']['LENGTH']
  console.log(daq_config);
  if (variable_size_channel_0.length!=0) {
    var returnArr = alloc_variabe_ccp(variable_size_channel_0,
      daq_list_channel_0, daq_config.DAQ['segment synchronous']['FIRST_PID'], daq_config.DAQ['segment synchronous']['LENGTH'])
       // var outofmemory0 = returnArr[0]
    // remain_size0 = returnArr[1]
    channel_load0 =returnArr[0]
    var odt_num0 = returnArr[1]
    busload0 = (odt_num0 * 127 * 100) / (daq_config['BAUDRATE'] * 0.005)
    if (channel_load0 > 100) {
      console.log("提示：syn通道容量已满，无法继续添加")
      // return {error:"提示：syn通道容量已满，无法继续添加"}
    }

  }




  if (variable_size_channel_1.length!=0) {
    var returnArr = alloc_variabe_ccp(variable_size_channel_1,
      daq_list_channel_1, daq_config.DAQ['10ms time synchronous']['FIRST_PID'], daq_config.DAQ['10ms time synchronous']['LENGTH'])
      // var outofmemory1 = returnArr[0]
      // remain_size1 = returnArr[1]
      channel_load1 =returnArr[0]
    var odt_num1 = returnArr[1]
    busload1 = (odt_num1 * 127 * 100) / (daq_config['BAUDRATE'] * 0.01)
  
    if (channel_load1 > 100) {
      console.log("提示：10ms通道容量已满，无法继续添加")
      // return {error:"提示：10ms通道容量已满，无法继续添加"}
    }

  }


  if (variable_size_channel_2.length!=0) {
    var returnArr = alloc_variabe_ccp(variable_size_channel_2,
      daq_list_channel_2,  daq_config.DAQ['100ms time synchronous']['FIRST_PID'], daq_config.DAQ['100ms time synchronous']['LENGTH'])
    // var outofmemory2 = returnArr[0]
    channel_load2 =returnArr[0]
    var odt_num2 = returnArr[1]
    console.log(odt_num2);
    busload2 = (odt_num2 * 127 * 100) / (daq_config['BAUDRATE'] * 0.1)
    if (channel_load2 > 100) {
      console.log('提示：100ms通道容量已满，无法继续添加')
      // return {error:"提示：100ms通道容量已满，无法继续添加"}
    }

  }


  var busload = busload0 + busload1 + busload2
  return [busload,channel_load0, channel_load1, channel_load2]
}
// #daq_config内容超飞提供
// daq_config={}
// daq_config['LENGTH0'] = 2
// daq_config['LENGTH1'] = 5
// daq_config['LENGTH2'] = 10
// daq_config['FirstPID0'] = 0
// daq_config['FirstPID1'] = 16
// daq_config['FirstPID2'] = 46
// daq_config['baudrate'] = 500000
// variable_size_channel_0 = []
// variable_size_channel_1 = [4,4,4,4]
// variable_size_channel_2 = []
// var CCParr=get_load_ccp(variable_size_channel_0,variable_size_channel_1,variable_size_channel_2,daq_config)
// var busload=CCParr[0]
// var remain_size0=CCParr[0]
// var remain_size1=CCParr[1]
// var remain_size2=CCParr[2]

// console.log("busload = " + busload +'\n' + "remain_size0 = " + remain_size0+
//      '\n' +"remain_size1 = " + remain_size1 + '\n' +"remain_size2 = " + remain_size2)
export {
  get_load_ccp
}
