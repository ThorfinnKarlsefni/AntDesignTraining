import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = "Life's little bit messy,we all make mistakes ";
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'cheung',
          title: '联系我们',
          href: '@mail:402832626@qq.com',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
