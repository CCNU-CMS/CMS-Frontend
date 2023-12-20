import { PageContainer } from '@ant-design/pro-components';
import { Card, theme } from 'antd';
import React from 'react';

// 创建一个单独的 InfoCard 组件
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div
      className="info-card"
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px',
        flex: '1 1 auto',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <PageContainer>
      <Card className="welcome-card">
        <div className="welcome-content">
          <div
            style={{
              flex: 1,
              backgroundImage:
                "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                color: token.colorTextHeading,
                padding: '20px',
              }}
            >
              欢迎使用：学海知舟——课程管理系统
            </div>
            <div
              style={{
                fontSize: '16px',
                color: token.colorText,
                padding: '20px',
              }}
            >
              管理您的课程、论坛和个人信息，轻松统计和报告课程进展。
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <InfoCard
              title="课程管理"
              index={1}
              desc="管理您的课程信息，包括课程计划、时间表和材料。"
              href="#"
            />
            <InfoCard
              title="论坛管理"
              index={2}
              desc="管理论坛信息，包括帖子、评论和用户。"
              href="#"
            />
            <InfoCard
              title="个人管理"
              index={3}
              desc="管理个人信息，包括用户帐户和个人设置。"
              href="#"
            />
          </div>
        </div>
      </Card>
      <div className="info-section"></div>
    </PageContainer>
  );
};

export default Welcome;
