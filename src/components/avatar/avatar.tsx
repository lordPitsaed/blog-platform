import { Spin } from 'antd';
import React, { useState } from 'react';
import avatarPH from './avatar-ph.png';
import classes from './avatar.module.scss';

const Avatar: React.FC<{ url: string }> = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(url);
  return (
    <Spin spinning={loading}>
      <img src={src} className={classes.avatar} onLoad={() => setLoading(false)} onError={() => setSrc(avatarPH)}></img>
    </Spin>
  );
};

export default Avatar;
