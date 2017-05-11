import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var lexrank = require('lexrank');

class App extends Component {
  constructor(){
    super();

    this.state = {
      first : '',
      second : '',
      third : ''
    }
  }

  componentDidMount(){
    self = this;
    //컨텐츠 페이지를 대상으로 코드를 실행해주세요.
    window.chrome.tabs.executeScript({
      code: 'document.querySelector("body").innerText'
    }, function (result) {
      // 위의 코드가 실행된 후에 이 함수를 호출해주세요. 그 때 result에 담아주세요.

      //이 문서에서 body  태그 아래에 있는 모든 텍스를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
      var bodyText = result[0];
      lexrank.summarize(bodyText, 3, function (err, toplines, text) {
        console.log(text);
        self.setState({
          first : toplines[0].text,
          second : toplines[1].text,
          third: toplines[2].text
        })
      });

    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Secretary</h2>
        </div>
        <p className="App-intro">
          <p>{this.state.first}</p>
          <p>{this.state.second}</p>
          <p>{this.state.third}</p>
        </p>
      </div>
    );
  }
}

export default App;
