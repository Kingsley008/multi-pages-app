import React from 'react';
import {Link} from 'react-router';

const  liStyle = {
    'display':'inline-block',
    'listStyle':'none',
    'marginRight':'20px',
};

/**
 * 使用 Link组件 指定跳转的路由
 * **/
const nav = () => (
  <div>
      <ul>
          <li style={liStyle}><Link to = "/home">Home</Link></li>
          <li style={liStyle}><Link to = "/counter">Counter</Link></li>
          <li style={liStyle}><Link to = "/weather">Weather</Link></li>
      </ul>
  </div>
);

export {nav};