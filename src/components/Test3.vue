<template>
  <!-- 辉景 新版-->
  <div>
    <div v-show="configType==''" class="select" style="margin:0em auto;padding:6em 0;width:1100px;height:100%;">
      <el-row :gutter="12">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="8">
          <el-button plain @click="historyJson" icon="el-icon-document">历 史 配 置 文 件</el-button>

          <!-- <el-card  shadow="always">
      总是显示
    </el-card> -->
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="8">

          <el-button plain @click="buildJson()" icon="el-icon-document-add">新 建 配 置 文 件</el-button>
          <!-- <el-card  style="height:100%"  shadow="hover">
      鼠标悬浮时显示
    </el-card> -->
        </el-col>
        <el-col :span="2">&nbsp;</el-col>

      </el-row>
    </div>
    <div v-if="configType=='history'" class="history" style="margin:0 auto;width:1100px;">
      <div style="position:relative">
        <h3>历史配置文件</h3>

        <div style="position:absolute;top:50%;left:-80px;transform:translateY(-50%);cursor:pointer;"
          @click="configType=''">
          <!-- <i class="el-icon-back"></i> -->
          <el-link icon="el-icon-back" type="primary">返回</el-link>
        </div>
      </div>
      <el-table :data="tableDataJson" v-loading="jsonTableLoading" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="项目号">
                <span>{{ props.row.projectId }}</span>
              </el-form-item>
              <el-form-item label="配置文件名">
                <span>{{ props.row.confName }}</span>
              </el-form-item>
              <el-form-item label="a2l文件名">
                <span>{{ props.row.a2lName }}</span>
              </el-form-item>
              <el-form-item label="configDate">
                <span>{{ props.row.configDate }}</span>
              </el-form-item>
              <el-form-item label="SN号">
                <span>{{ props.row.sn }}</span>
              </el-form-item>
              <el-form-item label="车号">
                <span>{{ props.row.vehId }}</span>
              </el-form-item>
              <!-- <el-form-item label="uid">
                <span>{{ props.row.uid }}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="项目号" prop="projectId">
        </el-table-column>
        <el-table-column label="配置文件名" prop="confName">
        </el-table-column>
        <el-table-column label="车号" prop="vehId">
        </el-table-column>
        <el-table-column label="SN号" prop="sn" width="100">
        </el-table-column>
        <el-table-column align="right" width="300">
          <template slot="header" slot-scope="scope">
            <el-input style="width:200px" v-model="searchTableJson" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <!-- @click="handleDelete(scope.$index, scope.row)" -->
            <el-button size="mini" type="danger" @click="deleteHistroyJson(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="modifyHistroyJson(scope.$index, scope.row)">重加载</el-button>
            <el-button size="mini" type="success" @click="sendHistroyJson(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <my-page :tableData.sync="tableDataJson" :result="resultJson"></my-page>

    </div>

    <div v-if="configType=='build'" class="test" style="margin:0 auto;width:1100px;position:relative;">
      <i @click="stepReduce()" class="el-icon-arrow-left" v-show="step!=0&&!sendType"
        style="position:absolute;left:-100px;font-size:50px" :style="{'marginTop':scrollTop+'px'}"></i>

      <el-tooltip placement="top-start" title="内存已满" width="200" trigger="hover" content="通道内存不允许超过100%，请重新选择"
        :disabled="tooltipDisabled">
        <i @click="stepAdd()" class="el-icon-arrow-right" v-show="step!=3"
          style="position:absolute;right:-100px;font-size:50px" :style="{'marginTop':scrollTop+'px'}"></i>
      </el-tooltip>

      <div style="margin:1.5em 0;position:relative">
        <div style="position:absolute;top:50%;left:-80px;transform:translateY(-50%);cursor:pointer"
          @click="returnMainPage()" v-show="step==0||sendType">
          <el-link icon="el-icon-back" type="primary">返回</el-link>
        </div>
        <el-steps :active="step">
          <el-step title="上传文件" icon="el-icon-upload"></el-step>
          <el-step title="信号选取" icon="el-icon-edit"></el-step>
          <!-- description="选择测量变量" -->
          <el-step title="标签选取" icon="el-icon-price-tag"></el-step>
          <!-- description="定义测试文件标签" -->
          <el-step title="配置发送" icon="el-icon-upload"></el-step>
          <!-- description="发送测量配置" -->
        </el-steps>
      </div>

      <el-dialog title="提交进度" :close-on-click-modal="false" :visible.sync="dialogVisible" width="20%">
        <p style="margin:0 0 1em 0" v-show="a2lPercent<100">当前进度为:</p>
        <div style="margin:0 0 1em 0" v-show="a2lPercent==100">
          <div style="display:inline-block;height:2em;line-height:2em">正在处理中:</div>
          <div v-loading="true" style="width:2em;height:2em;display:inline-block;margin:0 1em"></div>

        </div>
 
        <el-progress v-show="a2lPercent<100" :color="customColorMethod" :text-inside="true" :stroke-width="24"
          :percentage="a2lPercent">
        </el-progress>
        <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span> -->
      </el-dialog>
      <el-dialog class="labdiaClass" title="提示" :visible.sync="dialogLab" width="20%">
        <p style="margin-top:0">请指定文件名</p>
        <el-input style="width:100%" @change="labNameReg()" v-model="downloadLabName" size="mini" placeholder="输入关键字搜索">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogLab = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="saveLabFile()">下载</el-button>
        </span>
      </el-dialog>

      <div v-show="step==0">
        <!-- <div class="submit">
        
          <p style="color:#666">channel 1(建议连ECU):</p>

          <el-dropdown :class="{dropdownDisabled:this.a2lChannel==1}" @click="transA2l(0)" @command="handleCommand0"
            type="primary" size="small" split-button>
            选择A2L
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">upload lab</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <input v-show="false" accept=".a2l" ref="filea2l0" type="file" @change="A2lName($event,0)" />
          <input v-show="false" accept=".lab" ref="filelab0" type="file" @change="labName($event,0)" />
          <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择a2l文件" v-model="locationA2l0"
            :disabled="true">
          </el-input>
          <el-button @click="submitA2l(0)" size="small" type="success" :disabled="this.a2lChannel==1">上传文件
          </el-button>
          <el-tooltip class="item" effect="dark" :disabled="locationHex0==''" :content="locationHex0" placement="top">
            <el-button @click="transHex(0)" type="primary" size="small" :disabled="this.a2lChannel==1">选择hex
            </el-button>
          </el-tooltip>

          <input v-show="false" ref="filehex0" type="file" @change="hexName($event,0)" accept=".hex" />
          <el-divider direction="vertical"></el-divider>

          <el-button @click="tranDbc(0)" type="primary" size="small" :disabled="this.dbcChannel==1">选择dbc
          </el-button>
          <input v-show="false" ref="filedbc0" type="file" @change="DbcName($event,0)" accept=".dbc" />
          <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择dbc文件" v-model="locationDbc0"
            :disabled="true">
          </el-input>
          <el-button size="small" type="success" @click="submitDbc(0)" :disabled="this.dbcChannel==1">上传文件
          </el-button>
        </div> -->
        <div class="submit">

          <p style="color:#666">channel 1(建议连ECU):</p>
          <div style="margin:0.25em 0">
            <el-button @click="transA2l(0)" type="primary" size="small" :disabled="this.a2lChannel==1">选择A2L
            </el-button>
            <input v-show="false" accept=".a2l" ref="filea2l0" type="file" @change="A2lName($event,0)" />
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择a2l文件" v-model="locationA2l0"
              :disabled="true">
              <i slot="suffix" class="el-input__icon el-icon-check" style="color:green"
                v-show="this.a2lChannel==0&&this.submitList.includes('a2l')"></i>
            </el-input>
            <el-button @click="submitA2l(0)" size="small" type="success" :disabled="this.a2lChannel==1">上传文件
            </el-button>
          </div>
          <div style="margin:0.25em 0">
            <el-button @click="transHex(0)" type="primary" size="small" :disabled="this.a2lChannel==1">选择hex
            </el-button>
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择hex文件" v-model="locationHex0"
              :disabled="true">
            </el-input>
            <input v-show="false" ref="filehex0" type="file" @change="hexName($event,0)" accept=".hex" />
          </div>
          <div style="margin:0.25em 0">
            <el-button @click="transLab(0)" type="primary" size="small" :disabled="this.a2lChannel==1">选择lab

            </el-button>
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择lab文件" v-model="locationLab0"
              :disabled="true">
              <i slot="suffix" class="el-input__icon el-icon-check" style="color:green"
                v-show="this.labIconIndex==0"></i>
            </el-input>
            <input v-show="false" accept=".lab" ref="filelab0" type="file" @change="labName($event,0)" />
            <el-button @click="submitLab(0)" size="small" type="success" :disabled="this.a2lChannel==1">上传文件
            </el-button>
          </div>
          <div style="margin:0.25em 0">
            <el-button @click="tranDbc(0)" type="primary" size="small" :disabled="this.dbcChannel==1">选择dbc
            </el-button>
            <input v-show="false" ref="filedbc0" type="file" @change="DbcName($event,0)" accept=".dbc" />
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择dbc文件" v-model="locationDbc0"
              :disabled="true">
              <i slot="suffix" class="el-input__icon el-icon-check" style="color:green"
                v-show="this.dbcChannel==0&&this.submitList.includes('dbc')"></i>
            </el-input>
            <el-button size="small" type="success" @click="submitDbc(0)" :disabled="this.dbcChannel==1">上传文件
            </el-button>
          </div>

        </div>
        <div class="submit">

          <p style="color:#666">channel 2(建议连DBC):</p>
          <div style="margin:0.25em 0">
            <el-button @click="transA2l(1)" type="primary" size="small" :disabled="this.a2lChannel==0">选择A2L
            </el-button>
            <input v-show="false" accept=".a2l" ref="filea2l1" type="file" @change="A2lName($event,1)" />
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择a2l文件" v-model="locationA2l1"
              :disabled="true">
              <i slot="suffix" class="el-input__icon el-icon-check" style="color:green"
                v-show="this.a2lChannel==1&&this.submitList.includes('a2l')"></i>
            </el-input>
            <el-button @click="submitA2l(1)" size="small" type="success" :disabled="this.a2lChannel==0">上传文件
            </el-button>
          </div>
          <div style="margin:0.25em 0">
            <el-button @click="transHex(1)" type="primary" size="small" :disabled="this.a2lChannel==0">选择hex
            </el-button>
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择hex文件" v-model="locationHex1"
              :disabled="true">

            </el-input>
            <input v-show="false" ref="filehex1" type="file" @change="hexName($event,1)" accept=".hex" />
          </div>
          <div style="margin:0.25em 0">
            <el-button @click="transLab(1)" type="primary" size="small" :disabled="this.a2lChannel==0">选择lab
            </el-button>
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择lab文件" v-model="locationLab1"
              :disabled="true">
              <i slot="suffix" class="el-input__icon el-icon-check" style="color:green"
                v-show="this.labIconIndex==1"></i>
            </el-input>
            <input v-show="false" accept=".lab" ref="filelab1" type="file" @change="labName($event,1)" />
            <el-button @click="submitLab(1)" size="small" type="success" :disabled="this.a2lChannel==0">上传文件
            </el-button>
          </div>
          <div style="margin:0.25em 0">
            <el-button @click="tranDbc(1)" type="primary" size="small" :disabled="this.dbcChannel==0">选择dbc
            </el-button>
            <input v-show="false" ref="filedbc1" type="file" @change="DbcName($event,1)" accept=".dbc" />
            <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择dbc文件" v-model="locationDbc1"
              :disabled="true">
              <i slot="suffix" class="el-input__icon el-icon-check" style="color:green"
                v-show="this.dbcChannel==1&&this.submitList.includes('dbc')"></i>
            </el-input>
            <el-button size="small" type="success" @click="submitDbc(1)" :disabled="this.dbcChannel==0">上传文件
            </el-button>
          </div>

        </div>

        <!-- <div class="submit">

        
          <p style="color:#666">channel 2(建议连DBC):</p>

          <el-dropdown :class="{dropdownDisabled:this.a2lChannel==0}" @click="transA2l(1)" @command="handleCommand1"
            type="primary" size="small" split-button>
            选择A2L
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">upload lab</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <input v-show="false" accept=".a2l" ref="filea2l1" type="file" @change="A2lName($event,1)" />
          <input v-show="false" accept=".lab" ref="filelab1" type="file" @change="labName($event,1)" />
          <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择a2l文件" v-model="locationA2l1"
            :disabled="true">
          </el-input>
          <el-button @click="submitA2l(1)" size="small" type="success" :disabled="this.a2lChannel==0">上传文件
          </el-button>
          <el-tooltip class="item" effect="dark" :disabled="locationHex1==''" :content="locationHex1" placement="top">
            <el-button @click="transHex(1)" type="primary" size="small" :disabled="this.a2lChannel==0">选择hex
            </el-button>
          </el-tooltip>

          <input v-show="false" ref="filehex1" type="file" @change="hexName($event,1)" accept=".hex" />
          <el-divider direction="vertical"></el-divider>

          <el-button @click="tranDbc(1)" type="primary" size="small" :disabled="this.dbcChannel==0">选择dbc
          </el-button>
          <input v-show="false" ref="filedbc1" type="file" @change="DbcName($event,1)" accept=".dbc" />
          <el-input size="small" style="width:220px;cursor:pointer" placeholder="请选择dbc文件" v-model="locationDbc1"
            :disabled="true">
          </el-input>
          <el-button size="small" type="success" @click="submitDbc(1)" :disabled="this.dbcChannel==0">上传文件
          </el-button>
        </div> -->

      </div>
      <div v-show="step==1">
        <!-- <el-divider></el-divider> -->

        <!-- v-show="submitType=='a2l'" -->
        <div v-show="signalStep==0">
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input size="small" style="margin-bottom:1em" placeholder="function search" v-model="funcSearch">
                </el-input>
                <el-scrollbar style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding:.25em 0;height:545px;">
                  <el-menu @select="selectFunc" default-active="" class="el-menu-vertical-demo">
                    <el-menu-item v-for="(item, index) in funcItem" :key="index" :index="String(index)">
                      <span slot="title">{{ item }}</span>
                    </el-menu-item>

                  </el-menu>
                </el-scrollbar>
              </el-col>
              <el-col :span="18">
                <span>baudrate:</span>
                <!-- :disabled="fileType=='ccp'" -->
                <el-select size="small" style="width:120px;margin-right:0.5em" v-model="baudRate" placeholder="请选择">

                  <el-option label="500Kbs" :value="500000"> </el-option>
                  <el-option label="1000Kbs" :value="1000000"> </el-option>
                </el-select>
                <el-checkbox v-model="BMRchecked">记录原始报文</el-checkbox>
                <div style="float:right">
                  <el-button size="small" @click="saveLabBox()" type="info">Save Lab</el-button>
                  <el-button size="small" @click="showAllSignal()" type="info">Show All</el-button>
                  <el-button size="small" type="info" @click="showSelectedSignal()">Show Selected</el-button>
                  <el-button size="small" @click="clearSelectedSignal()" type="info">Clear Selected</el-button>

                </div>
                <el-table :data="tableDataSignal" tooltip-effect="dark" style="width: 100%">
                  <el-table-column width="300" label="signalName">
                    <template slot="header" slot-scope="scope">
                      <span style="margin-right:1em"> signalName</span>
                      <el-input style="width:150px" v-model="searchTableVal" size="mini" placeholder="输入关键字搜索" />
                    </template>
                    <template slot-scope="scope">{{ scope.row.signalName }}</template>
                  </el-table-column>
                  <el-table-column label="synchronous">
                    <template slot="header" slot-scope="scope">
                      <el-checkbox v-model="syncAllmodel"></el-checkbox>
                      <span>synchronous</span>
                    </template>

                    <template slot-scope="scope">
                      <el-checkbox @change="changeSync(scope.$index)" v-model="scope.row['sync']"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="10ms">
                    <template slot="header" slot-scope="scope">
                      <el-checkbox v-model="Allmodel10ms"></el-checkbox>
                      <span>10ms</span>
                    </template>
                    <template slot-scope="scope">
                      <el-checkbox @change="change10ms(scope.$index)" v-model="scope.row['10ms']"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="100ms">
                    <template slot="header" slot-scope="scope">
                      <el-checkbox v-model="Allmodel100ms"></el-checkbox>
                      <span>100ms</span>
                    </template>
                    <template slot-scope="scope">
                      <el-checkbox @change="change100ms(scope.$index)" v-model="scope.row['100ms']"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
                <my-page ref="page" :tableData.sync="tableDataSignal" :result="resultSignal"></my-page>
                <span
                  style="color:#999;font-size:13px;float:right;height:32px;line-height:32px">{{a2lChannel==0?locationA2l0:locationA2l1}}</span>

              </el-col>
            </el-row>
          </div>
          <div v-drag class="el-notification left" v-if="labBoxShow"
            style="top:100px; z-index: 2025;width:200px;padding:8px">
            <div class="el-notification__group" style="width:100%">
              <div class="el-notification__content">
                <h3 style="margin:0">lab文件</h3>
                <el-menu @select="selectLab" default-active="" style="border-right:0" class="el-menu-vertical-demo">
                  <el-menu-item v-for="(item, index) in labArr" :key="index" :index="String(index)">
                    <span slot="title">{{ item }}</span>
                  </el-menu-item>

                </el-menu>

              </div>
            </div>

          </div>

          <div role="alert" v-drag class="el-notification right" style="top:100px; z-index: 2025;width:280px">
            <div class="el-notification__group">
              <!-- <h2 class="el-notification__title">提示</h2> -->
              <div class="el-notification__content" style="width:240px">
                <!-- xcp -->

                <h4 style="margin:0">busload:</h4>
                <el-progress :percentage="busload_per" :color="customColors"></el-progress>
                <!-- <el-progress v-else :percentage="busload_per" :color="customColors"></el-progress> -->
                <div v-show="fileType=='xcp'">

                  <h4 style="margin:0">channel_load:</h4>
                  <el-progress :percentage="channel_per" :color="customColors"></el-progress>
                </div>
                <div v-show="fileType=='ccp'">
                  <h4 style="margin:0">synchronous:</h4>
                  <el-progress :percentage="channel0_per" :color="customColors"></el-progress>
                  <h4 style="margin:0">10 ms:</h4>
                  <el-progress :percentage="channel1_per" :color="customColors"></el-progress>
                  <h4 style="margin:0">100 ms:</h4>
                  <el-progress :percentage="channel2_per" :color="customColors"></el-progress>

                </div>
              </div>
              <!-- <div class="el-notification__closeBtn el-icon-close"></div> -->
            </div>
          </div>

        </div>
        <!-- <el-divider></el-divider> -->

        <!-- v-show="submitType=='dbc'" -->
        <div v-show="signalStep==1">
          <el-table :data="tableDataDbc" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange" row-key="Name">
            <el-table-column type="selection" width="55" :reserve-selection="true">
            </el-table-column>
            <el-table-column prop="Name2" width="250" label="信号名">
              <template slot="header" slot-scope="scope">
                <span style="margin-right:1em"> Name</span>
                <el-input style="width:150px" v-model="searchTableDbc" size="mini" placeholder="输入关键字搜索" />
              </template>
            </el-table-column>

            <el-table-column prop="Name" label="记录名">
              <!-- <template slot="header" slot-scope="scope">
                <span style="margin-right:1em"> Name</span>
                <el-input style="width:150px" v-model="searchTableDbc" size="mini" placeholder="输入关键字搜索" />
              </template> -->
              <template slot-scope="scope">
                <span v-if="!scope.row.editShow"> {{ scope.row.Name }}
                </span>
                <el-input v-focus="true" v-if="scope.row.editShow" size="small"
                  @keyup.enter.native="removeEdit(scope.$index, scope.row)" v-model="scope.row.Name"
                  placeholder="请输入内容">
                </el-input>

              </template>

            </el-table-column>

            <!-- <el-table-column prop="BitLen" label="BitLen">
            </el-table-column> -->
            <!-- <el-table-column prop="ByteOrder" label="ByteOrder">
            </el-table-column> -->
            <el-table-column prop="Offset" label="偏移量（offset）">
              <template slot-scope="scope">
                <span v-if="!scope.row.editShow"> {{ scope.row.Offset }}
                </span>
                <el-input v-if="scope.row.editShow" size="small"
                  @keyup.enter.native="removeEdit(scope.$index, scope.row)" v-model="scope.row.Offset"
                  placeholder="请输入内容">
                </el-input>

              </template>

            </el-table-column>
            <!-- <el-table-column prop="Position" label="Position">
            </el-table-column> -->
            <el-table-column prop="Scale" label="放大系数（scale）">
              <template slot-scope="scope">
                <span v-if="!scope.row.editShow"> {{ scope.row.Scale }}
                </span>
                <el-input v-if="scope.row.editShow" size="small"
                  @keyup.enter.native="removeEdit(scope.$index, scope.row)" v-model="scope.row.Scale"
                  placeholder="请输入内容">
                </el-input>

              </template>
            </el-table-column>
            <!-- <el-table-column prop="Type" label="Type">
            </el-table-column> -->
            <el-table-column prop="Unit" label="单位（Unit）">
              <template slot-scope="scope">
                <span v-if="!scope.row.editShow"> {{ scope.row.Unit }}
                </span>
                <el-input v-if="scope.row.editShow" size="small"
                  @keyup.enter.native="removeEdit(scope.$index, scope.row)" v-model="scope.row.Unit"
                  placeholder="请输入内容">
                </el-input>

              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.editShow" size="small" @click.stop="removeEdit(scope.$index, scope.row)">确定
                </el-button>
                <el-button v-if="!scope.row.editShow" size="small" @click.stop="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
              </template>
            </el-table-column>

          </el-table>
          <my-page ref="pagedbc" :tableData.sync="tableDataDbc" :result="resultDbc"></my-page>
          <span
            style="color:#999;font-size:13px;float:right;height:32px;line-height:32px">{{dbcChannel==0?locationDbc0:locationDbc1}}</span>

        </div>

      </div>

      <div class="step2" v-show="step==2" style="position:relative">
        <!-- <i @click="step=0" class="el-icon-arrow-left" style="position:absolute;top:45%;left:-100px;font-size:50px"></i>
      <i @click="step2()" class="el-icon-arrow-right" style="position:absolute;top:45%;right:-100px;font-size:50px"></i> -->

        <!-- <div>
          <span style="margin:0 1em 0 0;font-weight:600">项目号:</span>

          <el-select v-model="projectNumberVal" clearable filterable placeholder="请选择项目号">
            <el-option v-for="(item,index) in projectNumberData" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
          <span style="margin:0 1em;font-weight:600">车号:</span>

          <el-input placeholder="请输入车号" style="width:200px" v-model="vehId" clearable>
          </el-input>

        </div>
        <el-divider></el-divider> -->

        <h4>Package标签</h4>
        <el-tag @close="reducePackage(index)" @click="mainPackageIndex=index" effect="dark"
          v-for="(item,index) in this.packageSelected" :key="index+'sp'" :type="mainPackageIndex==index?'danger':''"
          closable>
          {{item}}</el-tag>

        <div v-for="(item,index) in this.package" :key="index+'p'">
          <h5>{{item.groupName}}</h5>
          <el-tag @click="selectPackage(tag)" v-for="(tag,cindex) in item.packageItems" :key="cindex"
            :type="packageSelected.includes(tag)?'':'info'">{{tag}}</el-tag>

        </div>
        <el-divider></el-divider>
        <h4>Task标签</h4>
        <el-tag @close="reduceTask(index)" @click="mainTaskIndex=index" effect="dark"
          v-for="(item,index) in this.taskSelected" :key="index+'st'" :type="mainTaskIndex==index?'danger':''" closable>
          {{item}}</el-tag>

        <div v-for="(item,index) in this.task" :key="index+'t'">
          <h5>{{item.groupName}}</h5>
          <el-tag @click="selectTask(tag)" v-for="(tag,cindex) in item.taskItems" :key="cindex"
            :type="taskSelected.includes(tag)?'':'info'">{{tag}}</el-tag>

        </div>
        <el-divider></el-divider>
        <div style="margin:1em 0">
          <span style="margin:0 1em 0 0;font-weight:600">项目号:</span>

          <el-select v-model="projectNumberVal" clearable filterable placeholder="请选择项目号">
            <el-option v-for="(item,index) in projectNumberData" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
          <span style="margin:0 1em;font-weight:600">车号:</span>

          <el-input placeholder="请输入车号" style="width:200px" v-model="vehId" clearable>
          </el-input>

        </div>

        <span style="margin:0 1em 0 0;font-weight:600">备注:</span>

        <el-input placeholder="请输入备注,只允许英文和数字" style="width:250px" v-model="comment" clearable>
        </el-input>
        <span style="margin:0 1em 0 1em;font-weight:600;">配置文件名:</span>

        <el-input placeholder="请输入配置文件名字,只允许英文和数字" style="width:300px" v-model="jsonName" clearable>
        </el-input>

        <el-button type="primary" :loading="submitLoading" @click="submitImg()" style="float:right">提交</el-button>

      </div>
      <div class="step3" v-show="step==3">
        <div>
          <h4>待发送配置文件：</h4>
          <el-table :data="sendJsonTable" style="width: 100%">

            <el-table-column label="项目号" prop="projectId">
            </el-table-column>
            <el-table-column label="配置文件名" prop="confName">

            </el-table-column>
            <el-table-column label="a2l文件名" prop="a2lName">
            </el-table-column>
            <el-table-column label="configDate" prop="configDate">
            </el-table-column>
            <el-table-column label="SN号" prop="sn">
            </el-table-column>
            <el-table-column label="车号" prop="vehId">
            </el-table-column>
            <!-- <el-table-column
              label="uid"
              prop="uid"
            >
            </el-table-column> -->
          </el-table>

          <h3>可用记录仪:</h3>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in boxData" :key="index">
              <el-card :body-style="{ padding: '0px' }">

                <div style="padding: 14px;">
                  <span>{{item}}</span>
                  <div class="bottom clearfix" style="min-height:50px;position:relative">

                    <el-button @click="submitBox(item)" style="position:absolute;right:0;bottom:0" type="primary"
                      size="mini">
                      提交</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>

          </el-row>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import mypage from "./Page.vue";
import Box from "./Box.vue";
import { get_load_PID } from "@/assets/getloadpid.js";
import { get_load_ccp } from "@/assets/getloadccp.js";

export default {
  directives: {
    drag: {
      // 指令的定义
      inserted: function (el) {
        el.onmousedown = function (e) {
          //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
          let divx = e.clientX - el.offsetLeft;
          let divy = e.clientY - el.offsetTop;
          //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
          document.onmousemove = function (e) {
            //获取移动后div的位置：鼠标位置-divx/divy
            let l = e.clientX - divx;
            let t = e.clientY - divy;
            el.style.left = l + "px";
            el.style.top = t + "px";
          };
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
    focus: {
      inserted: function (el, { value }) {
        if (value) {
          console.log(value);
          el.children[0].focus();
        }
      },
    },
  },
  data() {
    return {
      scrollTop: 0, //
      applicationLab: [], //从url接收的lab
      configType: "", //控制历史配置文件和新建配置文件页面的显示

      sendType: false, //是否 是直接发送
      dialogLab: false, //下载lab提示框

      username: localStorage.getItem("username"),
      tableDataJson: [],
      allresultJson: [],
      resultJson: [],
      searchTableJson: "",
      sendJsonTable: [],
      // step1flag: true,
      step: 0,
      signalStep: 0,
      channel: 0,
      dialogVisible: false,
      a2lPercent: 0,
      locationDbc0: "",
      locationA2l0: "",
      locationHex0: "",
      locationDbc1: "",
      locationA2l1: "",
      locationHex1: "",
      locationLab0: "",
      locationLab1: "",

      funcSearch: "",
      boxData: [],

      AllFuncItem: [], //所有function
      funcItem: [], //过滤后的function
      uid: "",
      allSignalObj: {}, //1.为了点击全部数据时而保留的signal表格所有数据  2.为了计算byte
      func_signal: {}, //function signal 对应关系 用于选择func 展示用
      lab_signal: {}, //lab signal 对应关系 用于选择lab 展示用
      baudRate: 500000,
      BMRchecked: false,
      searchTableVal: "",
      searchTableDbc: "",
      dbcChannel: 2, //dbc在哪个通道
      a2lChannel: 2, //a2l在哪个通道
      submitList: [], //已上传的文件类型(dbc,a2l)
      submitType: "a2l", //控制a2l还是dbc表格 显示
      fileType: "",
      daq_config: {}, //用于计算进度 和  最后传递json时需要
      FirstPID: [],
      allresultSignal: [], //signalName搜索框过滤前的signal表格数据
      resultSignal: [], //signalname搜索框过滤后的signal表格数据 -->给page使用
      tableDataSignal: [], //单页signal表格数据

      selectedSignal: {},
      busload_per: 0,
      channel_per: 0,
      channel0_per: 0,
      channel1_per: 0,
      channel2_per: 0,
      customColorMethod: [
        { color: "#909399", percentage: 20 },

        // { color: "#e6a23c", percentage: 50 },
        { color: "#409eff", percentage: 100 },
        { color: "#67c23a" },
      ],
      customColors: [
        { color: "#5cb87a", percentage: 90 },
        // {color: '#e6a23c', percentage: 40},
        // {color: '#5cb87a', percentage: 60},
        // {color: '#1989fa', percentage: 80},
        { color: "#e6a23c", percentage: 100 },

        { color: "#f56c6c" },
      ],
      // --lab
      labArr: [],
      labBoxShow: false,

      // ---- dbc
      basicDbc: [],
      allresultDbc: [],
      resultDbc: [],
      tableDataDbc: [],
      selectedDbc: [],
      editshow: false,

      // -------------------------step 1
      projectNumberVal: "",
      vehId: "",
      comment: "",
      jsonName: "",
      jsonTableLoading: false,
      submitLoading: false,
      projectNumberData: [],
      package: [],
      translate: [],
      task: [],

      packageSelected: [],
      mainPackageIndex: 0,
      taskSelected: [],
      mainTaskIndex: 0,
      jsonuid: "", //json的uid
      downloadLabName: "",
      labIconIndex: 2,
    };
  },
  created() {
    // var _this = this;
    // let yy = new Date().getFullYear();
    // let mm = new Date().getMonth() + 1;
    // let dd = new Date().getDate();
    // let hh = new Date().getHours();
    // let mf =
    //   new Date().getMinutes() < 10
    //     ? "0" + new Date().getMinutes()
    //     : new Date().getMinutes();
    // let ss =
    //   new Date().getSeconds() < 10
    //     ? "0" + new Date().getSeconds()
    //     : new Date().getSeconds();
    // this.downloadLabName = yy + "" + mm + "" + dd + "" + hh + "" + mf + "" + ss;

    // var lab=eventBus.$on('lab')
    // console.log(lab);

    //  if (val == 1 && this.step1flag) {

    this.$http.get("/admin/getProjectID").then((res) => {
      console.log(res);
      var arr = [];
      res.data.projectIDList.forEach((item, index) => {
        arr.push(item.projectID);
      });
      this.projectNumberData = arr;
    });
    this.$http.get("/admin/getPackage").then((res) => {
      console.log(res);
      this.package = res.data.package;
      this.translate = res.data.translate;
    });

    this.$http.get("/admin/getTask").then((res) => {
      console.log(res);
      this.task = res.data.task;
    });
    // url传FLAG

    // this.applicationLab = this.$route.query.lab;
    // console.log(this.applicationLab);
    // if (this.applicationLab) {
    //   this.jsonTableLoading = true;
    //   this.configType = "history";
    //   this.$http.post("/test/getAllJson", { PA: this.username }).then((res) => {
    //     console.log(res);
    //     this.jsonTableLoading = false;

    //     this.allresultJson = res.data.data;
    //     var json = this.allresultJson[this.allresultJson.length - 1];
    //     this.modifyHistroyJson(1, json);
    //     this.$nextTick(function () {
    //       //     this.applicationLab=this.applicationLab.filter((item,index)=>{
    //       //  return Object.keys(this.allSignalObj).includes(item);

    //       //     })
    //       console.log(this.applicationLab);
    //     });
    //   });
    // }
    // url传FLAG

    // } else

    // this.$http.get("/admin/getProjectID").then(res => {
    //   console.log(res);
    //   var arr = [];
    //   res.data.projectIDList.forEach((item, index) => {
    //     arr.push(item.projectID);
    //   });
    //   this.projectNumberData = arr;
    // });
    // this.$http.get("/admin/getPackage").then(res => {
    //   console.log(res);
    //   this.package = res.data.package;
    //   this.translate = res.data.translate;
    //   //  var { package,tagDict}=res.data;
    //   // this.package = [
    //   //   {
    //   //     groupName: "groupnam1",
    //   //     packageItems: ["package1", "package2"]
    //   //   },
    //   //   {
    //   //     groupName: "groupnam2",
    //   //     packageItems: ["package3", "package4"]
    //   //   }
    //   // ];
    //   // this.translate = {
    //   //   package1: "中文1",
    //   //   package2: "中文2",
    //   //   package3: "中文3",
    //   //   package4: "中文4"
    //   // };
    // });
    // this.$http.get("/admin/getTask").then(res => {
    //   console.log(res);
    //   this.task = res.data.task;
    //   //  var { package,tagDict}=res.data;
    //   // this.task = [
    //   //   {
    //   //     groupName: "groupnam1",
    //   //     taskItems: ["package1", "package2"]
    //   //   },
    //   //   {
    //   //     groupName: "groupnam2",
    //   //     taskItems: ["package3", "package4"]
    //   //   }
    //   // ];
    // });
  },
  mounted() {
    var that = this;
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    var height = (document.documentElement.clientHeight - 250) / 2 + scrollTop;
    that.scrollTop = height;

    window.onscroll = function () {
      //  console.log(document.scrollTop());
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(document.body.offsetHeight);
      var height =
        (document.documentElement.clientHeight - 250) / 2 + scrollTop;
      // console.log(scrollTop);
      // console.log(height);
      that.scrollTop = height;
      // console.log(e.target.activeElement);
      // console.log(e.target.activeElement.scrollHeight)
      // console.log(e.target.activeElement.scrollTop)
    };
    // this.allresultSignal = [
    //   { signalName: "A", sync: false, "10ms": false, "100ms": false },
    // ];
  },
  methods: {
    //返回
    returnMainPage() {
      var projectNumberData = this.projectNumberData;
      var package2 = this.package;
      var translate = this.translate;
      var task = this.task;
      Object.assign(this.$data, this.$options.data()); //初始化所有数据。created需要重新赋值。
      this.projectNumberData = projectNumberData;
      this.package = package2;
      this.translate = translate;
      this.task = task;
      // this.username
    },
    //获取历史json
    historyJson() {
      this.jsonTableLoading = true;
      this.configType = "history";
      this.$http.post("/test/getAllJson", { PA: this.username }).then((res) => {
        // console.log(res);
        var { res, data, detail } = res.data;
        this.jsonTableLoading = false;

        if (res && res == "V") {
          this.allresultJson = data;
        } else {
          this.$message({
            type: "warning",
            message: detail,
          });
        }
      });
    },
    //新建JSON
    buildJson() {
      this.configType = "build";
      this.jsonuid = "";
      this.sendJsonTable = [];
      this.step = 0;
    },
    //查看历史JSON
    sendHistroyJson(index, row) {
      console.log(row);
      this.sendType = true;
      this.sendJsonTable = [row];
      this.jsonuid = row.uid;
      this.configType = "build";
      this.step = 3;
    },
    //删除历史JSON
    deleteHistroyJson(index, row) {
      console.log(index);
      console.log(row);
      this.$confirm("确认要删除该文件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .post("/test/deleteIMG", {
              jsonuid: row.uid,
            })
            .then((res) => {
              console.log(res);
              // var status=res.status;
              // // var res=res.data.res
              var { res, detail, data } = res.data;

              if (res == "V") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.allresultJson.forEach((value, index, array) => {
                  if (value.uid == row.uid) {
                    array.splice(index, 1);
                  }
                  return;
                });
              } else {
                this.$message({
                  type: "error",
                  message: detail || "删除失败!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败!",
          });
        });
    },
    //修改历史JSON
    modifyHistroyJson(index, row) {
      this.$alert("正在加载数据，请稍等......", "重加载", {
        showCancelButton: false,
        showConfirmButton: false,
        showClose: false,
        // confirmButtonText: '确定',
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      });
      var success = true;
      var baudrate;
      var signal = {};
      this.$http
        .post("/test/jsontoMeta", {
          jsonuid: row.uid,
        })
        .then((res) => {
          console.log(res);
          // var status=res.status;
          // // var res=res.data.res

          if (res.data.res == "V") {
            var { data } = res.data;
            var {
              comment,
              mainPack,
              mainTask,
              packages,
              tasks,
              a2lName,
              hexName,
              confName,
              projectId,
              vehId,
              a2lChannel,
              BAUDRATE,
              BMR,
            } = data;
            var packagesCN = [];
            var MainPackCN = "";
            console.log(this.translate);

            for (var item in this.translate) {
              var value = this.translate[item];
              console.log(value);
              if (packages.includes(value)) {
                packagesCN.push(item);
              }
              if (value == mainPack) {
                MainPackCN = item;
              }
            }
            console.log(MainPackCN);
            console.log(packagesCN);

            // var recordConf=res.data.data.recordConf;

            // this.channel = a2lChannel; //channel设置在解析A2L之前
            this.a2lChannel = a2lChannel;
            // this.dbcChannel = a2lChannel == 0 ? 1 : 0; 暂时还记不住DBC
            this.submitList = ["a2l"]; // 暂时还记不住DBC

            this.BMRchecked = BMR;
            baudrate = BAUDRATE; //baudrate设置 要在解析A2L之后 (替换)

            // this.translate.forEach((item,index)=>{

            // })
            packages.forEach((item, index) => {
              //  this.package
            });

            this.projectNumberVal = projectId;
            this.vehId = vehId;
            this.packageSelected = packagesCN;
            this.mainPackageIndex = packagesCN.indexOf(MainPackCN);

            this.taskSelected = tasks;
            this.mainTaskIndex = tasks.indexOf(mainTask);
            this.jsonName = confName;
            this.comment = comment;
            this["locationA2l" + this.a2lChannel] = a2lName;
            this["locationHex" + this.a2lChannel] = hexName;

            console.log(data);
          } else {
            this.$message({
              type: "error",
              message: "获取meta信息失败!",
            });
          }
        });
      // .catch(err => {
      //   this.$message({
      //     type: "error",
      //     message: "获取meta信息失败 !"
      //   });
      // });
      this.$http
        .post("/test/jsontoLab", {
          jsonuid: row.uid,
        })
        .then((res) => {
          console.log(res);
          // var status=res.status;
          // // var res=res.data.res

          if (res.data.res == "V") {
            var { data } = res.data;
            console.log(data);
            for (var item in data) {
              var time = data[item].time;
              var sig = data[item].sig;

              // sigArr.push(sig);
              if (time == "10ms") {
                var obj = {
                  signalName: sig,
                  sync: false,
                  "10ms": true,
                  "100ms": false,
                };
                signal[sig] = obj;
              } else if (time == "100ms") {
                var obj = {
                  signalName: sig,
                  sync: false,
                  "10ms": false,
                  "100ms": true,
                };
                signal[sig] = obj;
              } else if (time == "segment") {
                var obj = {
                  signalName: sig,
                  sync: true,
                  "10ms": false,
                  "100ms": false,
                };
                signal[sig] = obj;
              } else {
                var obj = {
                  signalName: sig,
                  sync: false,
                  "10ms": false,
                  "100ms": false,
                };
              }
            }
            console.log(signal);
          } else {
            this.$message({
              type: "error",
              message: res.data.detail,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取已选择信号名失败!",
          });
          // this.$msgbox.close();
        });

      this.$http
        .post("/test/uidGeta2l", {
          jsonuid: row.uid,
        })
        .then((res) => {
          console.log(res);
          // var status=res.status;
          // // var res=res.data.res
          console.log(baudrate);

          if (res.data.res == "V") {
            var { data } = res.data;
            //
            data.daq_config["BAUDRATE"] = baudrate;
            this.analyA2l(data, this.a2lChannel);
            //注意：上两行
            // 此接口时间较长this.a2lChannel已赋值 后续需改进

            this.configType = "build";

            this.step = 0;
            if (this.applicationLab.length == 0) {
              this.selectedSignal = signal;
            } else {
            }
            this.showSelectedSignal();
          } else {
            this.$message({
              type: "error",
              message: res.data.detail || "获取a2l信息失败",
            });
          }
          // console.log(this.selectedSignal)
          // this.selectedSignal = signal;
          // this.showSelectedSignal();

          this.$msgbox.close();
        });
      // .catch((err) => {
      //   this.$message({
      //     type: "error",
      //     message: "获取a2l信息失败.!",
      //   });
      //   this.$msgbox.close();
      // });
    },

    axiostest() {
      // this.$http
      //   .post("/test/generateAndSendImg", {
      //     uid: "jsontoIMG-4pSBb-MtSwR-4g7fz-1MxlY-rMsP8",
      //     sn: "6029"
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });

      this.$http.post("/test/getAllJson", { PA: this.username }).then((res) => {
        console.log(res);
      });
      //  this.$http
      //   .post("/test/deleteOneJson",{uid:'jsontoIMG-4pSBb-MtSwR-4g7fz-1MxlY-rMsP8',PA:'li.gao'})
      //   .then(res => {
      //     console.log(res);

      //   })
    },
    getTime: function () {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      var gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      return gettime;
    },
    tranDbc(index) {
      this.$refs["filedbc" + index].dispatchEvent(new MouseEvent("click"));
    },
    DbcName(e, index) {
      this["locationDbc" + index] = e.target.files[0]["name"];
    },
    submitDbc(index) {
      if (!this.$refs["filedbc" + index].files[0]) {
        console.log("return");
        return;
      }
      var formData = new FormData();
      formData.append("file", this.$refs["filedbc" + index].files[0]);
      formData.append("filename", this.$refs["filedbc" + index].files[0].name);
      this.dialogVisible = true;

      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          console.log(complete);
          this.a2lPercent = Math.floor(complete);
        },
      };

      this.$http
        .post("/test/upload/dbcFile", formData, config)
        .then((res) => {
          this.dialogVisible = false;

          console.log(res);
          console.log(JSON.stringify(res.data.data));
          this.dbcChannel = index;
          if (!this.submitList.includes("dbc")) {
            this.submitList.push("dbc");
          }
          this.a2lChannel = index == 0 ? 1 : 0;
          this.submitType = "dbc";
          this.basicDbc = res.data.data;

          var dbc = [];
          res.data.data.forEach((item, index) => {
            item.Signals.forEach((value, cindex) => {
              value.MsgID = item.MsgID;
              value.MsgName = item.MsgName;
              value.editshow = false;
              value.Name2 = value.Name;
              dbc.push(value);
            });
          });
          this.allresultDbc = JSON.parse(JSON.stringify(dbc));
          // console.log('allresultDbc',this.allresultDbc);
          // console.log();
        })
        .catch((res) => {
          this.dialogVisible = false;
          this.$message({
            type: "error",
            message: "上传文件失败 !",
          });
        });
    },
    transA2l(index) {
      this.$refs["filea2l" + index].dispatchEvent(new MouseEvent("click"));
    },
    A2lName(e, index) {
      this["locationA2l" + index] = e.target.files[0]["name"];
    },
    transHex(index) {
      this.$refs["filehex" + index].dispatchEvent(new MouseEvent("click"));
    },
    hexName(e, index) {
      this["locationHex" + index] = e.target.files[0]["name"];
    },
    transLab(index) {
      // console.log(command);
      this.$refs["filelab" + index].dispatchEvent(new MouseEvent("click"));
    },
    labName(e, index) {
      this["locationLab" + index] = e.target.files[0]["name"];
    },
    submitLab(index) {
      this.dialogVisible = true;

      var formData = new FormData();
      formData.append("file", this.$refs["filelab" + index].files[0]);
      formData.append("filename", this.$refs["filelab" + index].files[0].name);
      var labItem = this.$refs["filelab" + index].files[0].name;
      // if (this.labArr.indexOf(labItem) != -1) {
      //   this.$message({
      //     type: "warning",
      //     message: "不可以重复上传相同的文件!"
      //   });
      //   return;
      // }
      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          this.a2lPercent = complete;
        },
      };
      this.$http
        .post("/test/upload/labFile", formData, config)
        .then((res) => {
          this.dialogVisible = false;
          console.log(res);
          if (res.data.res == "X") {
            this.$message({
              type: "error",
              message: "处理lab文件失败,请检查文件!",
            });
          } else {
            var { data } = res.data;
            // var sigArr = [];
            this.labBoxShow = true;
            this.lab_signal[labItem] = {};
            data = data.filter((item, index) => {
              return Object.keys(this.allSignalObj).includes(item.sig);
            });
            // console.log(this.allSignalObj);
            console.log(data);
            // data = data.filter(function(item, index) {
            // });

            this.$confirm("是否使用lab中的通道设置?", "提示", {
              confirmButtonText: "使用",
              cancelButtonText: "不使用",
              type: "warning",
            })
              .then(() => {
                // this.lab_signal[labItem][sig]
                // this.selectedSignal[sig]=obj
                this.labFunc(data, "then", labItem);
              })
              .catch(() => {
                //  this.selectedSignal[sig]=obj
                this.labFunc(data, "catch", labItem);
              });

            if (this.labArr.indexOf(labItem) == -1) {
              this.labArr.push(labItem);
            }
            this.labIconIndex = index;

            // console.log(labItem);
          }
        })
        .catch((res) => {
          console.log(res);
          this.dialogVisible = false;
          this.$message({
            type: "error",
            message: "上传文件失败 !",
          });
        });
    },

    submitA2l(index) {
      if (!this.$refs["filea2l" + index].files[0]) {
        console.log("return");
        return;
      }
      this.dialogVisible = true;

      console.log(this.$refs["filea2l" + index].files[0]);

      var formData = new FormData();
      formData.append("file", this.$refs["filea2l" + index].files[0]);
      formData.append("filename", this.$refs["filea2l" + index].files[0].name);
      var config = {
        // headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          var complete =
            (progressEvent.loaded / progressEvent.total) * 100 || 0;
          this.a2lPercent = Math.floor(complete);
        },
      };
      this.$http
        .post("/test/upload/a2lFile", formData, config)
        .then((res) => {
          console.log(res);

          this.dialogVisible = false;
          var { data, res, detail } = res.data;
          if (res == "V") {
            this.analyA2l(data, index);
          } else {
            this.$message({
              type: "error",
              message: detail || "处理A2L文件失败!",
            });
          }
        })
        .catch((res) => {
          this.dialogVisible = false;
          this.$message({
            type: "error",
            message: "上传文件失败 !",
          });
        });
      // $.ajax({url:'/test/upload/a2lFile',data:formData,type:'post',success:function(){
      //             console.log(data);
      //   this.dialogVisible = false;
      //   this.uid = data.uid;
      //   this.func_signal = data.func_signal;
      //   this.fileType = data.fileType;
      //   this.daq_config = data.daq_config;
      //   if (this.fileType == "ccp") {
      //     this.baudRate = data.daq_config["BAUDRATE"];
      //   }

      //   this.allSignalObj = data.allSignal;
      //   //this.allSignalObj:1.为了点击全部数据时 而保留的signal表格所有数据  2.为了计算byte

      //   this.allresultSignal = [];
      //   for (var item in this.allSignalObj) {
      //     var obj = {
      //       signalName: item,
      //       sync: false,
      //       "10ms": false,
      //       "100ms": false
      //     };

      //     this.allresultSignal.push(obj);
      //   }
      //   console.log(this.allresultSignal);

      //   this.AllFuncItem = Object.keys(this.func_signal);
      //   this.funcItem = this.AllFuncItem.filter(
      //     data =>
      //       !this.funcSearch ||
      //       data.toLowerCase().includes(this.funcSearch.toLowerCase())
      //   );

      // }})
    },
    //计算A2L中的数据 （上传A2L和重加载历史数据会调用）
    analyA2l(data, index) {
      this.submitType = "a2l";

      this.a2lChannel = index;
      if (!this.submitList.includes("a2l")) {
        this.submitList.push("a2l");
      }
      this.dbcChannel = index == 0 ? 1 : 0;

      // this.a2lChannel = this.channel;

      // var data = {
      //   func_signal: {
      //     ACCECU_Co: [
      //       "a_a",
      //       "a_b",
      //       "a_c",
      //       "a_d",
      //       "a_e",
      //       "a_f",
      //       "a_g",
      //       "a_h",
      //       "a_i",
      //       "a_j",
      //       "a_k",
      //       "a_l",
      //       "a_m",
      //       "a_n"
      //     ],
      //     ACCI_CalcReq: [
      //       "b_a",
      //       "b_b",
      //       "b_c",
      //       "b_d",
      //       "b_e",
      //       "b_f",
      //       "b_g",
      //       "b_h",
      //       "b_i",
      //       "b_j",
      //       "b_k",
      //       "b_l",
      //       "b_m",
      //       "b_n"
      //     ],
      //     ACComp_Demand: [
      //       "a_a",
      //       "b_b",
      //       "a_c",
      //       "b_d",
      //       "a_e",
      //       "b_f",
      //       "a_g",
      //       "b_h",
      //       "a_i",
      //       "b_j",
      //       "a_k",
      //       "a_l",
      //       "a_m",
      //       "b_n",
      //       "u_v",
      //       "u_u",
      //       "v_v",
      //       "u_c",
      //       "v_d",
      //       "u_e",
      //       "v_f",
      //       "u_g",
      //       "v_h",
      //       "u_i",
      //       "v_j"
      //     ]
      //   },
      //   allSignal: {
      //     a_a: 3,
      //     a_b: 3,
      //     a_c: 3,
      //     a_d: 3,
      //     a_e: 3,
      //     a_f: 3,
      //     a_g: 3,
      //     a_h: 3,
      //     a_i: 3,
      //     a_j: 3,
      //     a_k: 3,
      //     a_l: 3,
      //     a_m: 3,
      //     a_n: 3,
      //     b_a: 3,
      //     b_b: 3,
      //     b_c: 3,
      //     b_d: 3,
      //     b_e: 3,
      //     b_f: 3,
      //     b_g: 3,
      //     b_h: 3,
      //     b_i: 3,
      //     b_j: 3,
      //     b_k: 3,
      //     b_l: 3,
      //     b_m: 3,
      //     b_n: 3
      //   },
      //   fileType: "xcp",
      //   daq_config: [
      //     {
      //       // baud:500000
      //       DAQ_MEMORY_LIMIT: 5495,
      //       ODT_DAQ_BUFFER_ELEMENT_SIZE: 2,
      //       DAQ_SIZE: 46,
      //       ODT_SIZE: 6,
      //       ODT_ENTRY_SIZE: 5
      //     },
      //     {
      //       // baud:1000000
      //       DAQ_MEMORY_LIMIT: 5495,
      //       ODT_DAQ_BUFFER_ELEMENT_SIZE: 2,
      //       DAQ_SIZE: 46,
      //       ODT_SIZE: 6,
      //       ODT_ENTRY_SIZE: 5
      //     }
      //   ]

      //   // fileType: "ccp",
      //   // daq_config: {
      //   //   DAQ: {
      //   //     "segment synchronous": { FIRST_PID: 72, LENGTH: 17 },
      //   //     "10ms time synchronous": { FIRST_PID: 46, LENGTH: 26 },
      //   //     "100ms time synchronous": { FIRST_PID: 0, LENGTH: 46 }
      //   //   },
      //   //   BAUDRATE: 500000
      //   // }
      // };
      this.uid = data.uid;
      // this.func_signal = data.func_signal;
      this.selectedSignal = {};
      this.labArr = [];
      this.lab_signal = {};
      // if (this.labArr.length != 0) {
      //   // var labObj = {};
      //   // this.labArr.forEach((item, index) => {
      //   //   labObj[item] = this.func_signal[item];
      //   // });
      //   // data.func_signal = Object.assign(labObj, data.func_signal);
      //   for (var item in this.lab_signal) {
      //     for (var value in this.lab_signal[item]) {
      //       console;
      //       this.selectedSignal[value] = this.lab_signal[item][value];
      //     }
      //   }
      //   console.log(this.selectedSignal);
      // }

      this.func_signal = data.func_signal;

      // this.func_signal[]

      //    if(this.labArr.length!=0){
      //    this.func_signal.push()
      // }

      this.fileType = data.fileType;
      this.daq_config = data.daq_config;
      if (this.fileType == "ccp") {
        this.baudRate = data.daq_config["BAUDRATE"];
      }

      this.allSignalObj = data.allSignal;
      //this.allSignalObj:1.为了点击全部数据时 而保留的signal表格所有数据  2.为了计算byte

      this.allresultSignal = [];
      for (var item in this.allSignalObj) {
        var obj = {
          signalName: item,
          sync: false,
          "10ms": false,
          "100ms": false,
        };

        this.allresultSignal.push(obj);
      }
      console.log(this.allresultSignal);

      this.AllFuncItem = Object.keys(this.func_signal);
      this.funcItem = this.AllFuncItem.filter(
        (data) =>
          !this.funcSearch ||
          data.toLowerCase().includes(this.funcSearch.toLowerCase())
      );
    },
    //是否启用LAB中的通道
    labFunc(data, x, labItem) {
      var sigArr = [];
      for (var item in data) {
        var time = data[item].time;
        var sig = data[item].sig;
        this.lab_signal[labItem] = [];

        sigArr.push(sig);
        if (time == "10ms") {
          var obj = {
            signalName: sig,
            sync: false,
            "10ms": true,
            "100ms": false,
          };
          // if (x == "then") {
          //   this.selectedSignal[sig] = obj;
          // }
        } else if (time == "100ms") {
          var obj = {
            signalName: sig,
            sync: false,
            "10ms": false,
            "100ms": true,
          };
          // if (x == "then") {
          //   this.selectedSignal[sig] = obj;
          // }
        } else if (time == "segment") {
          var obj = {
            signalName: sig,
            sync: true,
            "10ms": false,
            "100ms": false,
          };
          // if (x == "then") {
          //   this.selectedSignal[sig] = obj;
          // }
        } else {
          var obj = {
            signalName: sig,
            sync: false,
            "10ms": false,
            "100ms": false,
          };

          // lab中没选中 ，但原本选中的数据不会改变
          // 但是需要在lab_signal中保留所有lab中的signalname（即使是没选中的）
          //重复的lab如果包含相同的signalname 已选择的设置将会被覆盖,
        }
        if (x == "then") {
          this.selectedSignal[sig] = obj;
        }
      }
      console.log(sigArr);
      console.log(labItem);
      console.log(this.lab_signal);
      this.lab_signal[labItem] = sigArr; //用于重新上传A2L时 ，重新选择暂存的LAB数据

      console.log(labItem);
      console.log(this.lab_signal);
    },
    handleCommand0(command) {
      console.log(command);
      this.$refs.filelab0.dispatchEvent(new MouseEvent("click"));
      // $.ajax({url:'/test/upload/a2lFile',data:formData,type:'post',success:function(){
    },
    handleCommand1(command) {
      console.log(command);
      this.$refs.filelab1.dispatchEvent(new MouseEvent("click"));
      // $.ajax({url:'/test/upload/a2lFile',data:formData,type:'post',success:function(){
    },

    //全选框选择 目前是allresultSignal(过滤后的所有数据全部选择)
    selectFunc(index, path) {
      console.log(index);
      console.log(this.func_signal[this.funcItem[index]]);
      var arr = this.func_signal[this.funcItem[index]];
      this.allresultSignal = [];
      arr.forEach((item, index) => {
        if (Object.keys(this.selectedSignal).includes(item)) {
          this.allresultSignal.push(this.selectedSignal[item]);
        } else {
          var obj = {
            signalName: item,
            sync: false,
            "10ms": false,
            "100ms": false,
          };
          this.allresultSignal.push(obj);
        }
      });
    },
    //lab列表 展示LAB中的变量
    selectLab(index, path) {
      // console.log(index);
      console.log(this.labArr);
      var arr = this.lab_signal[this.labArr[index]];

      // var obj = {};
      // var labobj = this.lab_signal[this.labArr[index]];
      // console.log(labobj);
      // var arr = Object.keys(this.allSignalObj);
      // if (arr.length != 0) {
      //   for (var item in labobj) {
      //     if (arr.includes(item)) {
      //       obj[item] = labobj[item];
      //     }
      //   }
      // } else {
      // obj = labobj;
      // }
      this.allresultSignal = [];

      // for (var item in obj) {
      //   if (Object.keys(this.selectedSignal).includes(item)) {
      //     this.allresultSignal.push(this.selectedSignal[item]);
      //   } else {
      //     this.allresultSignal.push(obj[item]);
      //   }
      // }

      arr.forEach((item, index) => {
        if (Object.keys(this.selectedSignal).includes(item)) {
          this.allresultSignal.push(this.selectedSignal[item]);
        } else {
          var obj = {
            signalName: item,
            sync: false,
            "10ms": false,
            "100ms": false,
          };
          this.allresultSignal.push(obj);
        }
      });
    },
    //第一列选择
    changeSync(index) {
      var obj = this.tableDataSignal[index];
      if (obj["sync"]) {
        obj["10ms"] = false;
        obj["100ms"] = false;
        // this.selectedSignal[obj["signalName"]] = obj;
        this.$set(this.selectedSignal, obj["signalName"], obj);
      } else {
        delete this.selectedSignal[obj["signalName"]];
      }
      console.log(this.selectedSignal);
      //this.calculationPro();
    },
    //第二列选择
    change10ms(index) {
      var obj = this.tableDataSignal[index];
      if (obj["10ms"]) {
        obj["sync"] = false;
        obj["100ms"] = false;
        // this.selectedSignal[obj["signalName"]] = obj;
        this.$set(this.selectedSignal, obj["signalName"], obj);
      } else {
        delete this.selectedSignal[obj["signalName"]];
      }
      console.log(this.selectedSignal);

      //this.calculationPro();
    },
    //第三列选择
    change100ms(index) {
      var obj = this.tableDataSignal[index];

      if (obj["100ms"]) {
        obj["sync"] = false;
        obj["10ms"] = false;
        // this.selectedSignal[obj["signalName"]] = obj;
        this.$set(this.selectedSignal, obj["signalName"], obj);
      } else {
        delete this.selectedSignal[obj["signalName"]];
      }

      console.log(this.selectedSignal);
      //this.calculationPro();
    },
    saveLabBox() {
      if (Object.keys(this.selectedSignal).length == 0) {
        return;
      }
      this.dialogLab = true;
      // this.$prompt("请指定文件名字", "下载", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   inputPattern: /[a-zA-Z0-9]/g,
      //   inputErrorMessage: "邮箱格式不正确",
      // })
      //   .then(({ value }) => {
      //     this.downloadLabName = value;
      //     this.saveLabFile();
      //   })
      //   .catch(() => {});
    },
    labNameReg() {
      this.downloadLabName = this.downloadLabName.replace(
        /[^a-zA-Z0-9|\_]/g,
        ""
      );
    },
    saveLabFile() {
      console.log(this.selectedSignal);
      var obj = {};
      for (var key in this.selectedSignal) {
        var value = this.selectedSignal[key];
        var val = "";
        if (value["10ms"]) {
          val = "10ms";
        } else if (value["10ms"]) {
          val = "100ms";
        } else if (value["sync"]) {
          val = "sync";
        }
        obj[key] = val;
      }
      var labObj = { signals: obj, labname: "mylab" };
      console.log(labObj);
      this.$http
        .post("/test/downloadLab", labObj, {
          responseType: "blob", // 设置响应数据类型
        })
        .then((res) => {
          console.log(res);

          // if (res.data.res == "V") {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement("a");
          // let fileName ='test';
          let fileName =
            this.downloadLabName ||
            this.getTime().replace(":", "").replace("-", "");
          // let fileName = window.decodeURI(
          //   res.headers["content-disposition"].split("=")[2].split("''")[1],
          //   "UTF-8"
          // );

          var random = (Math.random() * 100000).toFixed(0);
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", fileName + ".lab"); // 自定义下载文件名（如exemple.txt）
          document.body.appendChild(link);
          link.click();
        });
    },
    showAllSignal() {
      this.allresultSignal = [];
      for (var item in this.allSignalObj) {
        var obj = {
          signalName: item,
          sync: false,
          "10ms": false,
          "100ms": false,
        };

        this.allresultSignal.push(obj);
      }
      this.allresultSignal.forEach((item, index) => {
        if (Object.keys(this.selectedSignal).includes(item.signalName)) {
          this.allresultSignal[index] = this.selectedSignal[item.signalName];
        }
      });
      console.log(this.allresultSignal);
    },
    showSelectedSignal() {
      console.log(this.selectedSignal);
      console.log(JSON.stringify(this.selectedSignal));
      this.allresultSignal = Object.values(this.selectedSignal);
    },
    clearSelectedSignal() {
      // this.selectedSignal.forEach((item,index)=>{

      // })
      this.allresultSignal.forEach((item, index) => {
        item.sync = false;
        item["10ms"] = false;
        item["100ms"] = false;
        // delete this.selectedSignal[item.signalName];
      });
      this.selectedSignal = [];
      //this.calculationPro();
    },

    // --

    //计算进度条占比
    calculationPro() {
      var variable_size_channel_0 = [];
      var variable_size_channel_1 = [];
      var variable_size_channel_2 = [];
      // this.selectedSignal
      Object.keys(this.selectedSignal).forEach((item, index) => {
        if (this.selectedSignal[item]["sync"]) {
          variable_size_channel_0.push(this.allSignalObj[item]);
        } else if (this.selectedSignal[item]["10ms"]) {
          variable_size_channel_1.push(this.allSignalObj[item]);
        } else if (this.selectedSignal[item]["100ms"]) {
          variable_size_channel_2.push(this.allSignalObj[item]);
        }
      });
      if (this.fileType == "xcp") {
        // this.daq_config.baudrate = this.baudRate; //取设定的baudrate
        if (this.baudRate == 500000) {
          var daq_config = this.daq_config[0];
          daq_config.baudrate = this.baudRate;
        } else {
          var daq_config = this.daq_config[1];
          daq_config.baudrate = this.baudRate;
        }
        console.log(daq_config);

        var progressArr = get_load_PID(
          variable_size_channel_0,
          variable_size_channel_1,
          variable_size_channel_2,
          daq_config
        );
        if (this.baudRate == 500000) {
          progressArr[0] = (progressArr[0] * 100) / 20;
        } else {
          progressArr[0] = (progressArr[0] * 100) / 80;
        }
        console.log(progressArr);
        this.busload_per = Math.floor(progressArr[0] * 100) / 100;
        this.channel_per = Math.floor(progressArr[1] * 100) / 100;
        this.FirstPID = [];
        this.FirstPID.push(progressArr[2]);
        this.FirstPID.push(progressArr[3]);
        this.FirstPID.push(progressArr[4]);
      } else if (this.fileType == "ccp") {
        this.daq_config.BAUDRATE = this.baudRate;
        var progressArr = get_load_ccp(
          variable_size_channel_0,
          variable_size_channel_1,
          variable_size_channel_2,
          this.daq_config
        );
        console.log(progressArr);
        this.busload_per = Math.floor(progressArr[0] * 100) / 100;
        this.channel0_per = Math.floor(progressArr[1] * 100) / 100;
        this.channel1_per = Math.floor(progressArr[2] * 100) / 100;
        this.channel2_per = Math.floor(progressArr[3] * 100) / 100;
      }

      //       this.$notify({
      //   title: 'HTML 片段',
      //   dangerouslyUseHTMLString: true,
      //   message: '<el-progress :percentage="50"></el-progress>'
      // });
    },

    // --
    //表格复选框选择事件
    handleSelectionChange(val) {
      this.selectedDbc = val;
      console.log(this.selectedDbc);
    },
    handleEdit(index, row) {
      this.$set(this.tableDataDbc[index], "editShow", true);
      // this.tableDataDbc[index]["editShow"]=true //视图未更新
    },
    removeEdit(index, row) {
      //  this.$set(this.tableDataDbc[index], "editShow", false);
      // this.tableDataDbc[index]["editShow"] = false;
      this.$set(this.tableDataDbc[index], "editShow", false);
    },

    //选择Package
    selectPackage(tag) {
      console.log(tag);

      var index = this.packageSelected.indexOf(tag);
      if (index > -1) {
        this.packageSelected.splice(index, 1);
      } else {
        if (this.packageSelected.length > 7) {
          this.$confirm("最多选择8个！", "提示", {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            // type: 'warning'
            showCancelButton: false,
          });
          return;
        }

        this.packageSelected.push(tag);
      }
    },
    reducePackage(index) {
      if (index == this.mainPackageIndex) {
        this.mainPackageIndex = 0;
      } else if (index < this.mainPackageIndex) {
        this.mainPackageIndex--;
      }
      this.packageSelected.splice(index, 1);
    },
    selectTask(tag) {
      console.log(tag);

      var index = this.taskSelected.indexOf(tag);
      if (index > -1) {
        this.taskSelected.splice(index, 1);
      } else {
        if (this.taskSelected.length > 3) {
          this.$confirm("最多选择4个！", "提示", {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            // type: 'warning'
            showCancelButton: false,
          });
          return;
        }
        this.taskSelected.push(tag);
      }
    },
    reduceTask(index) {
      if (index == this.mainTaskIndex) {
        this.mainTaskIndex = 0;
      } else if (index < this.mainTaskIndex) {
        this.mainTaskIndex--;
      }
      this.taskSelected.splice(index, 1);
    },
    submitImg() {
      if (
        this.packageSelected.length == 0 ||
        this.taskSelected.length == 0 ||
        this.vehId == "" ||
        this.projectNumberVal == ""
      ) {
        this.$message({
          type: "warning",
          message: "数据请填写完整 !",
        });
        return;
      }
      this.submitLoading = true;
      var packageSelected = [];
      this.packageSelected.forEach((item, index) => {
        packageSelected.push(this.translate[item]);
      });

      var Measurement10ms = [];
      var Measurement100ms = [];
      var MeasurementSync = [];
      for (var item in this.selectedSignal) {
        console.log(this.selectedSignal);
        if (this.selectedSignal[item]["10ms"]) {
          Measurement10ms.push(item);
        } else if (this.selectedSignal[item]["100ms"]) {
          Measurement100ms.push(item);
        } else if (this.selectedSignal[item]["sync"]) {
          MeasurementSync.push(item);
        }
      }
      var DAQ = {};
      if (this.fileType == "ccp") {
        DAQ = {
          "100ms time synchronous": {
            FirstPID: this.daq_config.DAQ["100ms time synchronous"].FIRST_PID,
          },
          "10ms time synchronous": {
            FirstPID: this.daq_config.DAQ["10ms time synchronous"].FIRST_PID,
          },
          "segment synchronous": {
            FirstPID: this.daq_config.DAQ["segment synchronous"].FIRST_PID,
          },
        };
        DAQ["10ms time synchronous"].Measurement = Measurement10ms;
        DAQ["100ms time synchronous"].Measurement = Measurement100ms;
        DAQ["segment synchronous"].Measurement = MeasurementSync;
        // this.daq_config.DAQ;
      } else if (this.fileType == "xcp") {


        
        if (this.FirstPID[2] >= 0) {
          DAQ["100ms time synchronous"] = {
            FirstPID: this.FirstPID[2],
            Measurement: Measurement100ms,
          };
        }
        if (this.FirstPID[1] >= 0) {
          DAQ["10ms time synchronous"] = {
            FirstPID: this.FirstPID[1],
            Measurement: Measurement10ms,
          };
        }
        if (this.FirstPID[0] >= 0) {
          DAQ["segment synchronous"] = {
            FirstPID: this.FirstPID[0],
            Measurement: MeasurementSync,
          };                                                                                
        }
        // DAQ = {
        //   "100ms time synchronous": {
        //     FirstPID: this.FirstPID[2],
        //   },
        //   "10ms time synchronous": {
        //     FirstPID: this.FirstPID[1],
        //   },
        //   "segment synchronous": {
        //     FirstPID: this.FirstPID[0],
        //   },
        // };
        // DAQ["100ms time synchronous"].Measurement = Measurement100ms;
        // DAQ["10ms time synchronous"].Measurement = Measurement10ms;
        // DAQ["segment synchronous"].Measurement = MeasurementSync;
      }

      // --
      // var MsgIDArr = [];
      // var MsgIDObj = {};
      // // var obj = { 513: [] };
      // this.selectedDbc.forEach((item, index) => {
      //   if (!MsgIDArr.includes(item.MsgID)) {
      //     MsgIDArr.push(item.MsgID);
      //   }
      // });
      // MsgIDArr.forEach((item,index)=>{
      //   MsgIDObj[item]=[]
      //    this.allresultDbc.forEach((value, cindex) => {
      //   //  if(allresultDbc)
      //   if(item.MsgID){

      //   }
      // });
      // })
      var Monitoring = this.basicDbc;
      Monitoring.forEach((item, index) => {
        // console.log();
        item.Signals = [];
        this.selectedDbc.forEach((value, cindex) => {
          delete value.Name2;
          if (value.MsgID == item.MsgID) {
            item.Signals.push(value);
          }
        });
      });
      console.log(Monitoring);
      var recordConf = [];

      if (this.submitList.includes("a2l")) {
        recordConf.push({
          Channel: this.a2lChannel,
          BMR: {
            Filter: this.BMRchecked,
          },
          BAUDRATE: this.baudRate,
          DAQ: DAQ,
        });
      }
      if (this.submitList.includes("dbc")) {
        recordConf.push({
          Channel: this.dbcChannel,
          BAUDRATE: 500000,
          Monitoring: Monitoring,
        });
      }
      recordConf.sort((a, b) => {
        return a.Channel - b.Channel;
      });

      var axiosData = {
        PA: this.username,

        meta: {
          projectId: this.projectNumberVal,
          vehId: this.vehId,
          comment: this.comment,
          packages: packageSelected,
          tasks: this.taskSelected,
          mainPack: packageSelected[this.mainPackageIndex],
          mainTask: this.taskSelected[this.mainTaskIndex],
          a2lName: this.a2lChannel==0?this.locationA2l0:this.locationA2l1,
          hexName: this.a2lChannel==0?this.locationHex0:this.locationHex1,
          user: this.username,
          userGroup: localStorage.getItem("group"),
          investigation: {
            investigationTopic: "",
            investigationSubTopic: "",
            investigationCaseId: "",
          },
          confName: this.jsonName || this.getTime(),
          a2lChannel: this.a2lChannel,
          BAUDRATE: this.baudRate,
          BMR: this.BMRchecked,
        },
        uid: this.uid,
        recordConf: recordConf,
      };
      console.log("axiosData", axiosData);

      // formData.append("projectNumberVal", this.projectNumberVal);
      // formData.append("vehId", this.vehId);
      // formData.append("comment", this.comment);
      // var packageSelected = [];
      // this.packageSelected.forEach((item, index) => {
      //   packageSelected.push(this.translate[item]);
      // });
      // formData.append("packages", packageSelected);
      // formData.append("tasks", this.taskSelected);
      // formData.append("mainPack", packageSelected[this.mainPackageIndex]);
      // formData.append("mainTask", this.taskSelected[this.mainTaskIndex]);

      // for (var [a, b] of formData.entries()) {
      //   console.log(a, b);
      // }
      this.$http
        .post("/test/generateJsonForRecord", axiosData)
        .then((res) => {
          console.log(res);
          if (res && res.status == 200 && res.data.res == "V") {
            this.$message({
              type: "success",
              message: "提交成功",
            });
            // this.jsonuid = res.data.res;
            var row = res.data.data;
            this.sendJsonTable = row;
            this.jsonuid = row[0].uid;
          } else {
            this.$message({
              type: "error",
              message: "提交失败",
            });
          }

          this.submitLoading = false;
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "提交失败",
          });
          this.submitLoading = false;
        });
    },
    stepReduce() {
      if (this.step == 1 && this.signalStep == 1) {
        this.signalStep--;
      } else {
        this.step--;
        window.scrollTo(0, 0);
      }
    },
    stepAdd() {
      if (!this.tooltipDisabled) {
        return;
      }
      if (
        this.step == 1 &&
        this.signalStep == 0 &&
        this.submitList.includes("dbc")
      ) {
        this.signalStep++;
      } else {
        this.step++;
        window.scrollTo(0, 0);
      }
    },
    submitBox(index) {
      if (this.sendJsonTable.length == 0) {
        this.$message({
          type: "error",
          message: "当前没有JSON数据，请求失败",
        });
        return;
      }
      var obj = {
        uid: this.jsonuid,
        sn: index,
        PA: this.username,
        confName: this.sendJsonTable[0]["confName"],
      };
      this.$http
        .post("/test/generateAndSendImg", obj)
        .then((res) => {
          console.log(res);
          var { res, data, detail } = res.data;
          if (res == "V") {
            this.$message({
              type: "success",
              message: "提交成功",
            });
          } else {
            this.$message({
              type: "warning",
              message: detail,
            });
          }

          this.submitLoading = false;
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "提交失败",
          });
          this.submitLoading = false;
        });
    },

    // step2() {
    //   this.step = 2;
    //   this.$http
    //     .post("/test/myAvaliableDevice", { PA: "li.gao" })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  computed: {
    // tableDataSignal(val){
    //   tableDataSignal
    //   return

    // },
    tooltipDisabled() {
      if (this.step == 1 && this.signalStep == 0) {
        if (
          this.busload_per >= 100 ||
          this.channel_per >= 100 ||
          this.channel0_per >= 100 ||
          this.channel1_per >= 100 ||
          this.channel2_per >= 100
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    syncAllmodel: {
      get() {
        var b = true;
        this.resultSignal.forEach((item, index) => {
          if (!item.sync) {
            b = false;
            return;
          }
        });
        return b;
      },

      set(val) {
        if (val) {
          if (this.resultSignal.length > 4000) {
            this.$message({
              type: "warning",
              message: "一次选择的信号数量不可超过4000！",
            });
            return;
          }
          this.resultSignal.forEach((item, index) => {
            item.sync = true;
            item["10ms"] = false;

            item["100ms"] = false;
            //   this.Allmodel100ms=false;
            //  this.Allmodel10ms=false;
            this.$set(this.selectedSignal, item.signalName, item);
            // this.selectedSignal[item.signalName] = item;

            //  console.log(this.selectedSignal);
          });
        } else {
          this.resultSignal.forEach((item, index) => {
            item.sync = false;
            delete this.selectedSignal[item.signalName];
          });
        }
        //this.calculationPro();
      },
    },
    Allmodel10ms: {
      get() {
        var b = true;
        this.resultSignal.forEach((item, index) => {
          if (!item["10ms"]) {
            b = false;
            return;
          }
        });
        return b;
      },

      set(val) {
        if (val) {
          if (this.resultSignal.length > 4000) {
            this.$message({
              type: "warning",
              message: "一次选择的信号数量不可超过4000！",
            });
            return;
          }
          this.resultSignal.forEach((item, index) => {
            item["10ms"] = true;
            item["sync"] = false;
            item["100ms"] = false;
            //  this.Allmodel100ms=false;
            //  this.syncAllmodel=false;
            this.$set(this.selectedSignal, item.signalName, item);
            // this.selectedSignal[item.signalName] = item;
          });
        } else {
          this.resultSignal.forEach((item, index) => {
            item["10ms"] = false;
            delete this.selectedSignal[item.signalName];
          });
        }
        console.log(this.selectedSignal);
        //this.calculationPro();
      },
    },
    Allmodel100ms: {
      get() {
        var b = true;
        this.resultSignal.forEach((item, index) => {
          if (!item["100ms"]) {
            b = false;
            return;
          }
        });
        return b;
      },

      set(val) {
        if (val) {
          if (this.resultSignal.length > 4000) {
            this.$message({
              type: "warning",
              message: "一次选择的信号数量不可超过4000！",
            });
            return;
          }
          this.resultSignal.forEach((item, index) => {
            //    this.Allmodel10ms=false;
            //  this.syncAllmodel=false;
            item["10ms"] = false;
            item["sync"] = false;
            item["100ms"] = true;

            // this.selectedSignal[item.signalName] = item;
            this.$set(this.selectedSignal, item.signalName, item);
          });
        } else {
          this.resultSignal.forEach((item, index) => {
            item["100ms"] = false;
            delete this.selectedSignal[item.signalName];
          });
        }
        console.log(this.selectedSignal);
        //this.calculationPro();
      },
    },
  },
  watch: {
    step(val) {
      if (val == 3) {
        this.$http
          .post("/test/getPersionalDevices", { PA: this.username })
          .then((res) => {
            console.log(res);
            if (res.data.res == "V") {
              this.boxData = res.data.data.sort();
            } else {
              this.$message({
                type: "warning",
                message: res.data.detail || "获取记录仪数据失败 !",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              type: "error",
              message: "获取记录仪数据失败 !",
            });
          });
      }
    },
    comment(val) {
      this.comment = val.replace(/[^a-zA-Z0-9|\_]/g, "");
    },
    jsonName(val) {
      this.jsonName = val.replace(/[^a-zA-Z0-9|\_]/g, "");
    },
    // channel(newVal, oldVal) {
    //   if (this.a2lChannel == oldVal) {
    //     this.dbcChannel = newVal;
    //   }
    //   if (this.dbcChannel == oldVal) {
    //     this.a2lChannel = newVal;
    //   }

    //   if (this.submitType == "a2l") {
    //     this.submitType = "dbc";
    //   } else if (this.submitType == "dbc") {
    //     this.submitType = "a2l";
    //   }
    // },
    funcSearch(val) {
      console.log(val);
      this.funcItem = this.AllFuncItem.filter(
        (data) => !val || data.toLowerCase().includes(val.toLowerCase())
      );
    },
    searchTableVal(val) {
      this.resultSignal = this.allresultSignal.filter(
        (data) =>
          !val || data.signalName.toLowerCase().includes(val.toLowerCase())
      );
    },
    allresultSignal(val) {
      this.resultSignal = val.filter(
        (data) =>
          !this.searchTableVal ||
          data.signalName
            .toLowerCase()
            .includes(this.searchTableVal.toLowerCase())
      );
    },
    searchTableDbc(val) {
      this.resultDbc = this.allresultDbc.filter(
        (data) => !val || data.Name2.toLowerCase().includes(val.toLowerCase())
      );
    },
    allresultDbc(val) {
      this.resultDbc = val.filter(
        (data) =>
          !this.searchTableDbc ||
          data.Name2.toLowerCase().includes(this.searchTableDbc.toLowerCase())
      );
    },
    searchTableJson(val) {
      this.resultJson = this.allresultJson.filter(
        (data) =>
          !val ||
          data.projectId.toLowerCase().includes(val.toLowerCase()) ||
          data.confName.toLowerCase().includes(val.toLowerCase()) ||
          data.a2lName.toLowerCase().includes(val.toLowerCase()) ||
          String(data.configDate)
            .toLowerCase()
            .includes(String(val).toLowerCase()) ||
          String(data.sn).toLowerCase().includes(String(val).toLowerCase()) ||
          data.vehId.toLowerCase().includes(val.toLowerCase()) ||
          data.uid.toLowerCase().includes(val.toLowerCase())
      );
    },
    allresultJson(val) {
      this.resultJson = val.filter(
        (data) =>
          !this.searchTableJson ||
          data.projectId
            .toLowerCase()
            .includes(this.searchTableJson.toLowerCase()) ||
          data.confName
            .toLowerCase()
            .includes(this.searchTableJson.toLowerCase()) ||
          data.a2lName
            .toLowerCase()
            .includes(this.searchTableJson.toLowerCase()) ||
          String(data.configDate)
            .toLowerCase()
            .includes(String(this.searchTableJson).toLowerCase()) ||
          String(data.sn)
            .toLowerCase()
            .includes(String(this.searchTableJson).toLowerCase()) ||
          data.vehId
            .toLowerCase()
            .includes(this.searchTableJson.toLowerCase()) ||
          data.uid.toLowerCase().includes(this.searchTableJson.toLowerCase())
      );
    },

    baudRate(val) {
      // if (this.fileType == "xcp") {
      this.calculationPro();
      // }
    },
    selectedSignal: {
      handler(val, oldVal) {
        console.log(val);
        this.calculationPro();
      },
      immediate: true,
      deep: true,
    },

    // tableDataSignal: {
    //   handler(newValue, oldValue) {
    //     // console.log(oldValue);
    //     for (let i = 0; i <script newValue.length; i++) {
    //        var value = newValue[i];
    //        newValue[i].sync=false
    //         newValue[i]["10ms"]=false
    //         newValue[i]["100ms"]=false
    //       // if (value.sync) {
    //       //   value["10ms"] = false;
    //       //   value["100ms"] = false;
    //       // } else if (value["10ms"]) {
    //       //   value.sync = false;
    //       //   value["100ms"] = false;
    //       // } else if ((value["100ms"] = false)) {
    //       //   value.sync = false;
    //       //   value["10ms"] = false;
    //       // }

    //       if (value.sync || value["10ms"] || value["100ms"]) {
    //         this.selectedSignal[value.signalName] = {
    //           sync: value.sync,
    //           "10ms": value["10ms"],
    //           "100ms": value["100ms"]
    //         };
    //       } else {
    //         delete this.selectedSignal[value.signalName];
    //       }
    //       // 　　　　　　　　if (oldValue[i] != newValue[i]) {
    //       // 　　　　　　　　　　console.log(newValue)
    //       // 　　　　　　　　}
    //     }
    //     console.log(this.selectedSignal);
    //   },
    //   deep: true, //深度
    //   // immediate:true
    // }
  },
  components: {
    "my-page": mypage,
    "my-box": Box,
  },
};
</script>

<style scoped>
.el-divider--vertical {
  margin: 0 1em;
}
.select /deep/ .el-row {
  height: 200px;
  /* width:100%; */
}
.select /deep/ .el-col {
  height: 200px;
  /* width:100%; */
}
.select /deep/ .el-button {
  height: 100%;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.select /deep/ .el-button:hover {
  transform: translateY(-3px);
  transition: transform 0.3s;
}
.history /deep/ .demo-table-expand {
  font-size: 0;
}
.history /deep/ .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.history /deep/ .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  display: block;
}
.test /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
i {
  cursor: pointer;
  color: #999;
}
i:hover {
  color: #5cb6ff;
}
.el-tag {
  margin: 0.5em;
  cursor: pointer;
}

.step2 h5 {
  margin: 0.5em 0;
}
.step2 /deep/ h4 {
  margin-top: 0;
  display: inline-block;
}
/* .submit /deep/ .el-button {

      } */
/* .test /deep/ ul,li{
                                                              list-style:none ;
                                                              padding:0
                                                            } */
.test /deep/ .el-menu-item {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}
.test /deep/ .el-menu-item:not(.is-active) {
  color: #777;
}
.dropdownDisabled /deep/ .el-button {
  background-color: #92beec;
  border-color: #92beec;
  cursor: not-allowed;
  background-image: none;
  pointer-events: none;
}
.el-notification /deep/ .el-progress-bar {
  width: 90%;
}
.el-pagination {
  display: inline-block;
}
.labdiaClass /deep/ .el-dialog__body {
  padding: 15px 20px;
}
.submit /deep/ .el-button span {
  width: 45px;
  display: inline-block;
}
</style>
