import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import './App.css';
import { getRequest } from './services/request';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [data, setData] = useState({});

  // 票房类型：SUM_BOX -> 综合票房; SPLIT_SUM_BOX -> 分账票房
  const [selectedType, setSelectedType] = useState('SUM_BOX');

  useEffect(() => {
    getMovies();

    // 这是一个异步方法，请求接口数据
    async function getMovies() {
      const res = await getRequest('/api/second-box');
      const data = get(res, 'data');
      const list = get(data, 'list', []);
      setMovies(list);
      setSelectedMovie(get(list, '0', {}));
      setData(data);
    }
  }, []);

  return (
    <div id="app">
      <div className="dashboard-page">
        <div className="dashboard">
          <div className="dashboard-title">
            <span className="dashboard-nav">
              <span
                className={selectedType === 'SUM_BOX' ? 'active' : ''}
                onClick={() => {
                  setSelectedType('SUM_BOX');
                }}
              >
                综合票房
              </span>
              <span
                className={selectedType === 'SPLIT_SUM_BOX' ? 'active' : ''}
                onClick={() => {
                  setSelectedType('SPLIT_SUM_BOX');
                }}
              >
                分账票房
              </span>
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
                    <span>{selectedMovie.movieName}</span>
                  </p>
                  <p className="detail-releaseinfo">
                    {selectedMovie.releaseInfo}&nbsp;{selectedMovie.sumBoxInfo}
                  </p>
                </div>
                <div className="detail-part-box">
                  <div className="detail-box">
                    <p className="detail-realtime-desc">综合票房</p>
                    <p className="detail-realtime">
                      {selectedType === 'SUM_BOX'
                        ? selectedMovie.boxInfo
                        : selectedMovie.splitBoxInfo}
                      万
                    </p>
                    <p className="detail-realtime-ratio">
                      票房占比{selectedMovie.boxRate}
                    </p>
                  </div>
                </div>
                <div className="detail-part-extra">
                  <div className="detail-item">
                    <p className="detail-item-title">排片场次</p>
                    <p className="detail-item-num">{selectedMovie.showInfo}</p>
                    <p className="detail-item-ratio">
                      排片占比{selectedMovie.showRate}
                    </p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-item-title">场均人次</p>
                    <p className="detail-item-num">
                      {selectedMovie.avgShowView}
                    </p>
                    <p className="detail-item-ratio">
                      上座率{selectedMovie.seatRate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="dashboard-push"></div>
              <div className="dashboard-calendar-container bg">
                <div className="dashboard-calendar">
                  <div className="cal-box">
                    <span>今日实时</span>
                    <span className="cal-box-num">
                      {selectedType === 'SUM_BOX'
                        ? `${get(data, 'totalBox')}${get(data, 'totalBoxUnit')}`
                        : `${get(data, 'splitTotalBox')}${get(
                            data,
                            'splitTotalBoxUnit',
                          )}`}
                    </span>
                  </div>
                  <p className="cal-update-time">
                    <span>{get(data, 'updateInfo')}</span>
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
                      <div className="theader">
                        {selectedType === 'SUM_BOX' ? '综合票房' : '分账票房'}
                        (万)
                      </div>
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
                      {movies.map((item, index) => (
                        <tr
                          className={
                            item.movieId === selectedMovie.movieId
                              ? 'selected-movie'
                              : ''
                          }
                          key={item.movieId}
                          onClick={() => {
                            setSelectedMovie(item);
                          }}
                        >
                          <td className="moviename-td" title={item.movieName}>
                            <div>
                              <div className="moviename-num">
                                <p className="moviename-index">{index + 1}</p>
                                <p className="moviename-star">
                                  <span
                                    className={`sprite ${
                                      item.movieId === selectedMovie.movieId
                                        ? 'sprite-star'
                                        : 'sprite-star-gray'
                                    }`}
                                  ></span>
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
                          <td className="realtime">
                            {selectedType === 'SUM_BOX'
                              ? item.boxInfo
                              : item.splitBoxInfo}
                          </td>
                          <td>
                            {selectedType === 'SUM_BOX'
                              ? item.boxRate
                              : item.splitBoxRate}
                          </td>
                          <td>{item.showInfo}</td>
                          <td>{item.showRate}</td>
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
