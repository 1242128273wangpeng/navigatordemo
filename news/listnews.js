import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ListView
} from 'react-native';

export default class ListNews extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });
    this.state = {
      showAnimated: true,
      dataSource: ds,
      data: [],
      text: "http://op.juhe.cn/onebox/news/words?key=19d0a7111f4b61d4124f148dfd5a3a7f",
      result: ''
    }
  }

  requestData(url) {
    fetch(url, {method: "POST"}).then((response) => response.json()).then((responseData) => {
      console.log(responseData.result instanceof Array);
      console.log(responseData instanceof Array);
      responseData.result.map(x => {
        console.log("x-->" + x);
      });
      this.setState({data: responseData.result});
      console.log(responseData);
    }).catch((error) => {
      ToastAndroid.show("error:" + error, ToastAndroid.SHORT);
    })
  }

  itemPress(msg) {
    ToastAndroid.show('msg：' + msg, ToastAndroid.SHORT);
  }

  renderItemRow(rowData, rowId) {
    return (
      <View style={{
        height: 50,
        width: 320,
        backgroundColor: '#cc1111',
        alignItems: 'center',
        marginTop: 4
      }}>
        <TouchableOpacity onPress={() => this.itemPress(rowData)}>
          <Text style={{
            color: '#cccccc',
            fontSize: 18,
            paddingTop: 14
          }}>{rowData + ' -- ' + rowId}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 该函数在组件的声明周期中只执行一次，它在初始化渲染完成之后执行。并且setState有效
   */
  componentDidMount() {
    this.requestData(this.state.text);
    console.log('componentDidMount');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          width: '100%',
          height: 2,
          backgroundColor: '#000000'
        }}></View>
        {this.state.showAnimated === true
          ? <Text>显示</Text>
          : <Text>隐藏</Text>}

        {console.log(this.state.showAnimated)}

        <ListView style={{
          marginBottom: 10
        }} enableEmptySections={true} dataSource={this.state.dataSource.cloneWithRows(this.state.data)} showsVerticalScrollIndicator={false} renderRow={(rowDa, sectionId, rowId) => this.renderItemRow(rowDa, rowId)}></ListView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    textAlign: 'left',
    fontSize: 18,
    color: 'black',
    width: '80%',
    height: 48
  },
  button: {
    marginTop: 10,
    width: 120,
    height: 48,
    backgroundColor: '#ccaa11'
  }
});
