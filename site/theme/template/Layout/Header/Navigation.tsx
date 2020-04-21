import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getEcosystemGroup } from './More';
import * as utils from '../../utils';
import { SharedProps } from './interface';

import './Navigation.less';

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  pathname: string;
  responsive: null | 'narrow' | 'crowded';
  location: { pathname: string };
  directionText: string;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

export default ({
  isZhCN,
  isMobile,
  pathname,
  responsive,
  location,
  directionText,
  onLangChange,
  onDirectionChange,
}: NavigationProps) => {
  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname.split('/').slice(0, -1).join('/');
  let activeMenuItem = module || 'home';
  if (location.pathname === 'changelog' || location.pathname === 'changelog-cn') {
    activeMenuItem = 'docs/react';
  } else if (location.pathname === 'docs/resources' || location.pathname === 'docs/resources-cn') {
    activeMenuItem = 'docs/resources';
  }

  let additional: React.ReactNode = null;
  const additionalItems = [
    <Menu.Item key="github">
      <a href="https://github.com/ant-design/ant-design" target="_blank" rel="noopener noreferrer">
        Github
      </a>
    </Menu.Item>,
    <Menu.Item key="switch-lang" onClick={onLangChange}>
      <FormattedMessage id="app.header.lang" />
    </Menu.Item>,
    <Menu.Item key="switch-direction" onClick={onDirectionChange}>
      {directionText}
    </Menu.Item>,
    getEcosystemGroup({ isZhCN }),
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = (
      <Menu.SubMenu key="additional" title={<UnorderedListOutlined />}>
        {additionalItems}
      </Menu.SubMenu>
    );
  }

  return (
    <Menu
      className={classNames('menu-site')}
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      id="nav"
    >
      <Menu.Item key="docs/react">
        <Link to={utils.getLocalizedPathname('{{root}}/docs/micro/introduce', isZhCN)}>
          <FormattedMessage id="app.header.menu.documentation" />
        </Link>
      </Menu.Item>
      <Menu.Item key="components">
        <Link to={utils.getLocalizedPathname('/components/button/', isZhCN)}>
          <FormattedMessage id="app.header.menu.plugins" />
        </Link>
      </Menu.Item>
      <Menu.Item key="docs/resources">
        <Link to={utils.getLocalizedPathname('/docs/resources', isZhCN)}>
          <FormattedMessage id="app.header.menu.resource" />
        </Link>
      </Menu.Item>
      {additional}
    </Menu>
  );
};
