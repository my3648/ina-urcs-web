function alloc_variabe(variable_size_list, daq_list, first_odt_NO) {
 
  // console.log(first_odt_NO);
  //  var daq_list={};
  var odt_NO=first_odt_NO;
  daq_list[odt_NO] = 0;

  while(variable_size_list.length!=0) {
   
    var size_add = variable_size_list.sort().pop();
    console.log(size_add);
    var i = first_odt_NO;
    var odt_NO = first_odt_NO;
    var succesful_add = 0;
    console.log(daq_list);
    while (i < 251 && succesful_add == 0) {
      if ((daq_list[odt_NO] + size_add) <= 7) {
        daq_list[odt_NO] = daq_list[odt_NO] + size_add
        succesful_add = 1
      } else {
        i++;
        odt_NO = i
        if (!daq_list[odt_NO]) {
          daq_list[odt_NO] = 0
        }

      }
    }
  }
  
  // var daq_list=Array(daq_list);
  console.log(daq_list);
  console.log(Object.keys(daq_list));
  return Object.keys(daq_list).pop()
}

function get_busload(cycle,odt_num,baudrate){
  var busload=(odt_num * 127)/(baudrate * cycle)
  return busload
}

// get_bus_channel_load_firstPID
function get_load_PID(variable_size_channel_0, variable_size_channel_1, variable_size_channel_2, daq_config) {
  var odt_NO_temp = 0
  var busload_0 = 0
  var busload_1 = 0
  var busload_2 = 0
  var DAQ_NUM = 0
  var ODT_NUM_0 = 0
  var ODT_NUM_1 = 0
  var ODT_NUM_2 = 0
  var daq_list_channel_0 = {}
  var daq_list_channel_1 = {}
  var daq_list_channel_2 = {}
  //  import variables from daq_config
  var baudrate = daq_config['baudrate']
  var DAQ_MEMORY_LIMIT = daq_config['DAQ_MEMORY_LIMIT']
  var ODT_DAQ_BUFFER_ELEMENT_SIZE = daq_config['ODT_DAQ_BUFFER_ELEMENT_SIZE']
  var DAQ_SIZE = daq_config['DAQ_SIZE']
  var ODT_SIZE = daq_config['ODT_SIZE']
  var ODT_ENTRY_SIZE = daq_config['ODT_ENTRY_SIZE']

  var ODT_ENTRY_NUM = variable_size_channel_2.length + variable_size_channel_1.length + variable_size_channel_0.length

// console.log(variable_size_channel_2.length);
// console.log(variable_size_channel_1.length);
// console.log(variable_size_channel_0.length);


  if (variable_size_channel_0.length!=0) {
    var firstPID_0 = 0;
    var last_odt_NO_channel_0=alloc_variabe(variable_size_channel_0,daq_list_channel_0,0)
    // console.log(last_odt_NO_channel_0);
    // console.log("-------------------------------------")
    // console.log("通道0的First PID为" +" "+ 0)
    // console.log(daq_list_channel_0)
    odt_NO_temp = Number(last_odt_NO_channel_0) + 1 
    
    ODT_NUM_0 = Number(last_odt_NO_channel_0) + 1
    console.log("通道0分配了"+ ODT_NUM_0 + "个odt")
    busload_0 = get_busload(0.005,ODT_NUM_0,baudrate)*100
    console.log("通道0所占busload为"+busload_0+'%')
    DAQ_NUM = 1;
    

  }  else{
    var last_odt_NO_channel_0 = -1
    var firstPID_0 = -1
  }   

  if (variable_size_channel_1.length!=0) {
    var fitstPID_1 = odt_NO_temp
    // console.log(fitstPID_1)
    var last_odt_NO_channel_1 = alloc_variabe(variable_size_channel_1,daq_list_channel_1,odt_NO_temp)
    // console.log("-------------------------------------")
    // console.log("通道1的First PID为" + " "+odt_NO_temp)
    // console.log(daq_list_channel_1)
    odt_NO_temp = Number(last_odt_NO_channel_1) + 1 
    ODT_NUM_1 = Number(last_odt_NO_channel_1)-Number(last_odt_NO_channel_0)
    console.log("通道1分配了"+ODT_NUM_1+'个odt')
    busload_1 = get_busload(0.01,ODT_NUM_1,baudrate)*100
    console.log("通道1所占busload为"+busload_1+'%')
    DAQ_NUM++      
  
  }
else{
  var last_odt_NO_channel_1 = last_odt_NO_channel_0
  var fitstPID_1 = -1

}

if(variable_size_channel_2.length!=0){
  var firstPID_2 = odt_NO_temp
  var last_odt_NO_channel_2 = alloc_variabe(variable_size_channel_2,daq_list_channel_2,odt_NO_temp)
  // console.log("-------------------------------------")
  // console.log("通道2的First PID为" + " "+odt_NO_temp)
  // console.log(daq_list_channel_2)
  ODT_NUM_2 = Number(last_odt_NO_channel_2)-Number(last_odt_NO_channel_1)
  console.log("通道2分配了"+ODT_NUM_2+"个odt")
  busload_2 = get_busload(0.1,ODT_NUM_2,baudrate)*100
  console.log("通道2所占busload为"+busload_2+'%')
  DAQ_NUM ++

}else{
  var firstPID_2 = -1
}
var busload = busload_0 + busload_1 + busload_2
// var ODT_ENTRY_NUM = variable_size_channel_2.length + variable_size_channel_1.length + variable_size_channel_0.length
var ODT_NUM = ODT_NUM_0 + ODT_NUM_1 + ODT_NUM_2

console.log(ODT_ENTRY_NUM);
console.log(ODT_ENTRY_SIZE);
console.log(ODT_DAQ_BUFFER_ELEMENT_SIZE);
console.log(ODT_SIZE);
console.log(ODT_NUM);
console.log(DAQ_SIZE);
console.log(DAQ_NUM);
console.log(DAQ_MEMORY_LIMIT);
var channel_load =( ( ODT_ENTRY_NUM*(ODT_ENTRY_SIZE+ODT_DAQ_BUFFER_ELEMENT_SIZE) + ODT_SIZE*ODT_NUM + DAQ_SIZE*DAQ_NUM )/DAQ_MEMORY_LIMIT )*100

return [busload, channel_load, firstPID_0, fitstPID_1, firstPID_2]


}


// function get_size_list(variables_selected,variable_lib){
//   // 查找变量字节大小，返回字节大小组成的数组(按照字节从小到大排序)
//   // :param variables_selected :被选定的变量列表
//   // :param variable_lib :变量字典，key = 变量，value = 字节大小
//   // :return :
//   // console.log(variables_selected);
//   var variable_size_list = []
//   variables_selected.forEach(function(variable_temp,index){
//     // console.log(variable_temp);
//     var size_temp = variable_lib[variable_temp]
//     variable_size_list.push(size_temp)
//   })
//   // for (variable_temp in variables_selected){
//   //   var size_temp = variable_lib[variable_temp]
//   //   variable_size_list.push(size_temp)
//   // }
//   variable_size_list.sort()
//   console.log(variables_selected);
//   console.log(variable_lib);
//   console.log(variable_size_list);
//   return variable_size_list 
// }

// 随机生成变量dfes0到dfes99，及变量对应的字节大小（1，2，4中的随机值），组成一个字典variable_lib
// var seed = [1,1]
// var variable_lib = {}
// var size=[]
// var random_size = random.sample(seed,1)

// for num in range(0,100):
//     temp_var = 'dfes'+str(num)
//     variable_lib[temp_var] =  random.sample(seed,1)[0]
//     size.append(random.sample(seed,1)[0])    
// for(var num=0;num<100;num++){
// var temp_var='dfes'+num;
// variable_lib[temp_var]=seed[Math.floor((Math.random()*seed.length))]
// size.push(seed[Math.floor((Math.random()*seed.length))])   
// }
// variable_lib={'_stcEmiMisfCntrCyl':1,'_stcEmiMisfCntrCyl':2}
// variable_lib=[1,2,3]
// #print(variable_lib)

// # daq_config 需要超飞的解析A2L得到
// var daq_config = {}
// daq_config['baudrate'] = 500000 //web

// daq_config['DAQ_MEMORY_LIMIT'] = 5495 //
// daq_config['DAQ_SIZE'] = 46
// daq_config['ODT_SIZE'] = 6
// daq_config['ODT_ENTRY_SIZE'] = 5
// daq_config['ODT_DAQ_BUFFER_ELEMENT_SIZE'] = 2
// # variable_size_channel_x 通道内变量的字节大小组成的列表，需要超飞查找A2L得到


// // #输入variable_size_channel_x + daq_config 得到busload，channel_load，firstPID_x每个通道的firstPID

//   variable_size_channel// var PIDarr=get_load_PID(_0,variable_size_channel_1,variable_size_channel_2,daq_config);
// var busload=PIDarr[0]; 
// var channel_load=PIDarr[1];
// var firstPID_0=PIDarr[2]
// var firstPID_1=PIDarr[3]
// var firstPID_2=PIDarr[4]
// //busload 总线负载 进度条
// //channel_load通道负载 
// // Baud 根据网页选择 赋值500*1000 1000*1000
// //是否计入BMR 复选 BMR 不打勾时删除 filter 固定为false

// console.log("busload = " + busload + '% ' + 'channel_load = ' + channel_load + '% '+
//     'firstPID_0 = ' + firstPID_0 + ' '+'firstPID_1 = ' + firstPID_1+' '+ 'firstPID_2 = ' + firstPID_2)

    export {
    
      
      get_load_PID,
  

    }