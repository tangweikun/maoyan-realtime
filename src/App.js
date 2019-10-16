import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import logo from './logo.svg';
import './App.css';
import { getRequest } from './services/request';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();

    // 这是一个异步方法，请求接口数据
    async function getMovies() {
      const res = await getRequest('/api/second-box');
      const data = get(res, 'data');
      const list = get(data, 'list', []);
      setMovies(list);
      console.log(list, data);
    }
  }, []);

  return (
    <div id="app">
      <div className="dashboard-page">
        <div className="dashboard">
          <div className="dashboard-title">
            <span class="dashboard-nav">
              <span class="active">综合票房</span>
              <span class="">分账票房</span>
            </span>
            <div class="dashboard-title-clock">
              <span class="sprite sprite-logo"></span>
              <span class="clock">
                <span>
                  <span>2019年10月16日</span>&nbsp;<span>22:07</span>
                </span>
              </span>
            </div>
            <div class="dashboard-title-group">
              <div class="dashboard-title-togglefullscreen button">全屏</div>
              <div class="dashboard-title-link button">
                <a href="/?ver=normal">
                  返回常规版<span class="sprite sprite-arrow"></span>
                </a>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div class="dashboard-left">
              <div class="dashboard-detail bg">
                <div class="detail-part-name">
                  <p class="detail-title">
                    <span class="sprite sprite-star"></span>
                    <span>打过长江去</span>
                  </p>
                  <p class="detail-releaseinfo">上映首日&nbsp;232.2万</p>
                </div>
                <div class="detail-part-box">
                  <div class="detail-box">
                    <p class="detail-realtime-desc">综合票房</p>
                    <p class="detail-realtime">232.23万</p>
                    <p class="detail-realtime-ratio">票房占比2.4%</p>
                  </div>
                </div>
                <div class="detail-part-extra">
                  <div class="detail-item">
                    <p class="detail-item-title">排片场次</p>
                    <p class="detail-item-num">5648</p>
                    <p class="detail-item-ratio">排片占比1.7%</p>
                  </div>
                  <div class="detail-item">
                    <p class="detail-item-title">场均人次</p>
                    <p class="detail-item-num">13</p>
                    <p class="detail-item-ratio">上座率11.6%</p>
                  </div>
                </div>
              </div>
              <div class="dashboard-push"></div>
              <div class="dashboard-calendar-container bg">
                <div class="dashboard-calendar">
                  <div class="cal-current">
                    2019.10.16<span class="traingle"></span>
                  </div>
                  <div class="cal-box">
                    <span>今日实时</span>
                    <span class="cal-box-num">9334.9万</span>
                  </div>
                  <p class="cal-update-time">
                    <span>北京时间 22:09:38</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
