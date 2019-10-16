import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import './App.css';
import { getRequest } from './services/request';

function App() {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    getMovies();

    // 这是一个异步方法，请求接口数据
    async function getMovies() {
      const res = await getRequest('/api/second-box');
      const data = get(res, 'data');
      const list = get(data, 'list', []);
      setMovies(list);
      setData(data);
    }
  }, []);

  return (
    <div id="app">
      <div className="dashboard-page">
        <div className="dashboard">
          <div className="dashboard-title">
            <span className="dashboard-nav">
              <span className="active">综合票房</span>
              <span className="">分账票房</span>
            </span>
            <div className="dashboard-title-clock">
              <span className="sprite sprite-logo"></span>
              <span className="clock">
                <span>
                  <span>{get(data, 'serverTime')}</span>&nbsp;<span>22:07</span>
                </span>
              </span>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-left">
              <div className="dashboard-detail bg">
                <div className="detail-part-name">
                  <p className="detail-title">
                    <span className="sprite sprite-star"></span>
                    <span>打过长江去</span>
                  </p>
                  <p className="detail-releaseinfo">上映首日&nbsp;232.2万</p>
                </div>
                <div className="detail-part-box">
                  <div className="detail-box">
                    <p className="detail-realtime-desc">综合票房</p>
                    <p className="detail-realtime">232.23万</p>
                    <p className="detail-realtime-ratio">票房占比2.4%</p>
                  </div>
                </div>
                <div className="detail-part-extra">
                  <div className="detail-item">
                    <p className="detail-item-title">排片场次</p>
                    <p className="detail-item-num">5648</p>
                    <p className="detail-item-ratio">排片占比1.7%</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-item-title">场均人次</p>
                    <p className="detail-item-num">13</p>
                    <p className="detail-item-ratio">上座率11.6%</p>
                  </div>
                </div>
              </div>
              <div className="dashboard-push"></div>
              <div className="dashboard-calendar-container bg">
                <div className="dashboard-calendar">
                  <div className="cal-box">
                    <span>今日实时</span>
                    <span className="cal-box-num">9334.9万</span>
                  </div>
                  <p className="cal-update-time">
                    <span>北京时间 22:09:38</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="dashboard-list bg">
              <table className="dashboard-table dashboard-table-header">
                <thead>
                  <tr>
                    <th className="moviename-th">
                      <div>
                        <span>影片</span>
                        <span className="mn">
                          (点击
                          <span className="sprite sprite-tiny-star"></span>
                          优先展示)
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className="theader">综合票房(万)</div>
                    </th>
                    <th>
                      <div className="theader">票房占比</div>
                    </th>
                    <th>
                      <div className="theader">排片场次</div>
                    </th>
                    <th>
                      <div className="theader">排片占比</div>
                    </th>
                    <th>
                      <div className="theader">场均人次</div>
                    </th>
                    <th>
                      <div className="theader">上座率</div>
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="movielist-container">
                <div className="movielist">
                  <table className="dashboard-table">
                    <tbody>
                      <tr className="selected-movie">
                        <td className="moviename-td" title="打过长江去">
                          <div>
                            <div className="moviename-num">
                              <p className="moviename-index">05</p>
                              <p className="moviename-star">
                                <span className="sprite sprite-star"></span>
                              </p>
                            </div>
                            <div className="moviename-desc">
                              <p className="moviename-name">打过长江去</p>
                              <p className="moviename-info">
                                <span>上映首日</span>&nbsp;&nbsp;
                                <span>232.7万</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="realtime">232.74</td>
                        <td>2.4%</td>
                        <td>5640</td>
                        <td>1.7%</td>
                        <td>13</td>
                        <td>11.6%</td>
                      </tr>

                      {movies.map((item, index) => (
                        <tr className="" key={item.movieId}>
                          <td className="moviename-td" title={item.movieName}>
                            <div>
                              <div className="moviename-num">
                                <p className="moviename-index">{index + 1}</p>
                                <p className="moviename-star">
                                  <span className="sprite sprite-star-gray"></span>
                                </p>
                              </div>
                              <div className="moviename-desc">
                                <p className="moviename-name">
                                  {item.movieName}
                                </p>
                                <p className="moviename-info">
                                  <span>{item.releaseInfo}</span>&nbsp;&nbsp;
                                  <span>{item.sumBoxInfo}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="realtime">{item.boxInfo}</td>
                          <td>&lt;{item.boxRate}</td>
                          <td>{item.showInfo}</td>
                          <td>&lt;{item.showRate}</td>
                          <td>{item.avgShowView}</td>
                          <td>{item.seatRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
