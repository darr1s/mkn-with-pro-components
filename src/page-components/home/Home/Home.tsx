import { Avatar, Col, Dropdown, Menu, Modal, Row } from 'antd';
import {
  CalendarOutlined,
  ContactsOutlined,
  DollarOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  LogoutOutlined,
  RiseOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  HiOutlineAnnotation,
  HiOutlineBell,
  HiOutlineGift,
  HiOutlineSearch,
} from 'react-icons/hi';
import { HtmlMeta, HugeIcon, PageContainer } from '@/components';

import { FiTriangle } from 'react-icons/fi';
import { IPageProps } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import styles from './styles.module.less';

interface IProps extends IPageProps {
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
});

export const Home: React.FC<IProps> = (props) => {
  const menuHeaderRender = (logo: React.ReactNode): React.ReactNode => (
    <Link prefetch href="/">
      <a>
        {logo}
        {/* eslint-disable-next-line react/prop-types */}
        {/* {!props?.collapsed && title} */}
      </a>
    </Link>
  );

  const menuItemRender = (
    options: MenuDataItem,
    element: React.ReactNode,
  ): React.ReactNode => (
    <Link prefetch href={options.path != undefined ? options.path : ''}>
      <a>{element}</a>
    </Link>
  );

  const menu = (
    <Menu className="profile-menu">
      <Menu.Item>
        <Link prefetch href="/profile">
          <a>
            <UserOutlined className="icon" />
            <span className="title">Profile</span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link prefetch href="/subscriptions">
          <a>
            <DollarOutlined className="icon" />
            <span className="title">Plans</span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={(): void => {
          shutdown();
          store.dispatch(setLogout());
        }}
      >
        <LogoutOutlined className="icon" />
        <span className="title">Logout</span>
      </Menu.Item>
    </Menu>
  );

  const headerContentRender = (): React.ReactNode => (
    <Row className="header-content-wrapper">
      <Col span={12}>
        <div className="search-wrapper">
          <input type="text" placeholder="Search..." className="search" />
          <button className="search-button">
            <HiOutlineSearch />
          </button>
        </div>
      </Col>
      <Col span={12}>
        <div className="notification-wrapper">
          <button className="notification-button">
            <HiOutlineBell />
          </button>
          <button className="notification-button">
            <HiOutlineAnnotation />
          </button>
          <button className="notification-button">
            <HiOutlineGift />
          </button>
        </div>
      </Col>
    </Row>
  );

  const rightContentRender = (): React.ReactNode => (
    <div className="profile">
      <Dropdown overlay={menu} placement="bottomLeft">
        <div>
          <Avatar size="small" icon={<UserOutlined />} />
          <span>My Name</span>
        </div>
      </Dropdown>
    </div>
  );

  return (
    <ProLayout
      navTheme="light"
      style={{ minHeight: '100vh' }}
      route={{
        path: '/businesscard',
        routes: [
          {
            path: '/',
            name: 'Home',
            icon: <HomeOutlined />,
          },
          {
            path: '/businesscard',
            name: 'Business Card',
            icon: <ContactsOutlined />,
          },
        ],
      }}
      title="Lead Monkey"
      logo="/monkey-logo.svg"
      menuHeaderRender={menuHeaderRender}
      menuItemRender={menuItemRender}
      rightContentRender={rightContentRender}
      headerContentRender={headerContentRender}
    >
      <PageContainer className={cx(styles['comp-wrapper'], props.className)}>
        <HtmlMeta title="Home" />

        <HugeIcon icon={<FiTriangle />} />
      </PageContainer>
    </ProLayout>
  );
};
