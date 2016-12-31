import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView,
  AsyncStorage,
  StyleSheet,
  Button,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Storage from 'react-native-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import Style from '../stylesheet/style';

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync : {}
});

const KEY_TODOS = 'todos';

export default class TodoListView extends Component {

  constructor(props) {
    super(props);
    this.dataSource = [];
    this.state = {
      'list': [],
      'submit': false,
      'text': '',
      'filter': 0
    };
    this._asyncData();
  }
  
  render() {
    let val = this.state.submit ? '' : this.state.text; // 提交后清空输入框
    let add = this.state.submit && this.state.text;
    let self = this;
    
    return (
      <View>
        <TextInput
          style={Style.inputBox}
          clearButtonMode = 'always'
          placeholder = '我该干点嘛呢?'
          onSubmitEditing = {(event) => this._addTask(event)}
          onChangeText = {(text) => this.setState({'text': text, 'submit': false})} 
          value = {val}
        />
        <UserSwipeListView 
          data = {this.state.list}
          callbackParent = {this.removeTask.bind(self)}
          callbackComplete = {this.toggleTask.bind(self)}
        />
        <View style={Style.ft}>
          <Text 
            onPress={() => this._filterData(0)}
            style={this.state.filter === 0 ? Style.actived : Style.normal}>全部
          </Text>
          <Text
            onPress={() => this._filterData(1)}
            style={this.state.filter === 1 ? Style.actived : Style.normal}>
            待办
          </Text>
          <Text
            onPress={() => this._filterData(2)}
            style={this.state.filter === 2 ? Style.actived : Style.normal}>
            已完成
          </Text>
        </View>
      </View>
    )
  }
  
  toggleTask(data) {
    var done = !data.done;
    data.done = done;
    storage.save({
      key: KEY_TODOS,
      id: data.id,
      rawData: data,
      expires: null
    });
    this._asyncData();
  }
  
  removeTask(itemId) {
    storage.remove({
      key: KEY_TODOS,
      id: itemId
    });
    this._asyncData();
  }
  
  _addTask(event) {
    let curVal = event.nativeEvent.text,
        timestamp = +new Date()
        newItem = {'id': timestamp,'item': curVal, 'done': false};
    //this.data.unshift(newItem);
    this.setState({'submit': true});
    storage.save({
      key: KEY_TODOS,
      id: timestamp,
      rawData: newItem,
      expires: null
    });
    this._asyncData();
  }
  
  _filterData(type) {
    var data = this.dataSource,
        _data = [];
    if (type === 0) {
      _data = data;
    } else {
      data.forEach((val, index) => {
        (type === 1 ? !val.done : val.done) && _data.push(val);
      });
    }
    this.setState({'filter': type});
    this.setState({'list': _data});
  }
  
  _asyncData() {
    storage.getAllDataForKey('todos').then(ret => {
      this.dataSource = ret.reverse();
      this._filterData(this.state.filter);
    });
  }
  
}

class UserSwipeListView extends Component {
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <SwipeListView
        disableRightSwipe = {true}          
        style={Style.listBox}
        enableEmptySections = {true}
        dataSource={ds.cloneWithRows(this.props.data)}
        renderRow={ data => (
          <View style={styles.rowFront}>
              <Icon
                name="ios-checkmark-circle-outline"
                size={20}
                color={data.done ? '#59c3af' : '#dee0de'}
                style={{marginRight: 10}}
                onPress = {() => this.props.callbackComplete(data)}
              />
              <Text>{data.item}</Text>
          </View>
        )}
        renderHiddenRow={ (data, secId, rowId, rowMap) => (
          <View style={styles.rowBack}>
              <Text>完成</Text>
              <Text onPress={_ => this.deleteRow(data, secId, rowId, rowMap)} style={styles.backRightBtnRight}>移除</Text>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-67} />
    )
  }
  
  deleteRow(data, secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		this.props.callbackParent(data.id);
		//const newData = [...this.state.listViewData];
		//newData.splice(rowId, 1);
		//this.setState({listViewData: newData});
	}
	
}

class ItemListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }
  render() {
    let that = this;
    this.state = {
      dataSource: that.ds.cloneWithRows(this.props.data)
    };
    
    return (
      <View>
      <ListView
        enableEmptySections = {true}
        style = {Style.listBox}
        dataSource={this.state.dataSource}
        renderRow={(data) => (
          <View style={Style.rowItem}>
            <Icon
              name="ios-checkmark-circle-outline"
              size={20}
              color={data.done ? '#59c3af' : '#dee0de'}
              style={{marginRight: 10}}
              onPress = {() => this.props.callbackComplete(data)}
            />
            <Text>{data.item}</Text>
          </View>)
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderBottomColor: '#ededed',
		borderBottomWidth: 1,
    justifyContent: 'flex-start',
		height: 40,
		paddingLeft: 3,
		flex: 1,
		flexDirection: 'row'
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#f1f1f1',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: '#f9a52d',
		right: 15,
		padding: 5,
		color: '#ffffff',
		padding: 5,
		borderRadius: 4,
		fontSize: 12,
		overflow: 'hidden'
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: 100,
	}
});
