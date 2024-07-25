import Image from 'next/image';
import { ConfigProvider, Menu, type MenuProps } from 'antd';

import { planFeatureOptions } from '@/app/utils/plans.utils';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { SettingIcon } from '@/app/svgs/component-icons/SettingIcon';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { resetPostProjectAction } from '@/redux/post-project/post-project.slice';
import { usePathname } from 'next/navigation';
import { Key } from 'react';
import { IUserInterface } from '@/app/interfaces/user.interface';

type Props = {
  isOpened: boolean;
  toggleCollapsed: () => void;
};

const HOVERED_WIDTH = 'w-[240px]';
const UNHOVERED_WIDTH = 'w-[80px]';

function collectKeys(items: MenuProps['items']) {
  let keys: Key[] = [];
  if (items && items.length) {
    items.forEach((item) => {
      if (item?.key) {
        keys.push(item.key);
      }
      if (item && 'children' in item) {
        keys = keys.concat(collectKeys(item.children));
      }
    });
  }

  return keys;
}

function filterMenuItemsByPermissions(
  items: MenuProps['items'],
  permissions: string[]
): MenuProps['items'] {
  return permissions.map((permission) => {
    const item = items!.find((item) => {
      if (item && 'key' in item && item.key?.toString().includes(permission)) {
        return item;
      }
    });

    return item
      ? item
      : {
          key: permission,
          label: undefined,
        };
  });
}

export const AppSidebar = (props: Props) => {
  const { isOpened, toggleCollapsed } = props;
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const router = useRouterHook();
  const authenticatedUser = useSelector(
    (state: RootState) => state.auth.user as { user?: IUserInterface }
  );
  function resetPostProjectState(canCall: boolean) {
    if (canCall) {
      dispatch(resetPostProjectAction());
    }
  }

  const isCompanyEmployee =
    authenticatedUser?.user && authenticatedUser.user.associatedCompany;
  // employee links to show on sidebar
  const companyEmployeePermissions =
    authenticatedUser?.user &&
    authenticatedUser.user.associatedCompany &&
    authenticatedUser.user.roles
      ? authenticatedUser.user.roles
          .map((role) => (typeof role !== 'string' ? role.permissions : ''))
          .flat()
      : [];

  let menuItems: MenuProps['items'] = [
    {
      label: 'Dashboard',
      key: '/dashboard',
      icon: <HomeOutlined className="!text-2xl" />,
      onClick() {
        router.push('/dashboard');
      },
    },
    ...planFeatureOptions.map((feature) => {
      if (feature.options) {
        return {
          label: feature.label,
          key: feature.value ? feature.value : feature.label,
          icon: <feature.Icon />,

          children: feature.options?.map((option) => {
            return {
              label: option.label,
              key: option.value,
              onClick() {
                if (option.value) {
                  router.push(option.value);
                }
                if ('isAction'! in option) {
                  resetPostProjectState(Boolean(option.isAction));
                }
              },
              children:
                'children' in option
                  ? option.children?.map((item) => {
                      return {
                        key: item.value,
                        label: item.label,
                        onClick() {
                          router.push(item.value);
                        },
                      };
                    })
                  : undefined,
            };
          }),
        };
      }

      return {
        label: feature.label,
        key: feature.value,
        icon: <feature.Icon />,
        onClick() {
          router.push(feature.value);
        },
      };
    }),
    {
      type: 'divider',
      style: {
        borderColor: 'white',
        margin: '10px 0',
      },
    },
    {
      label: 'Settings',
      key: '/settings',
      icon: <SettingIcon />,
      onClick() {
        router.push('/settings/general');
      },
    },
  ];

  if (isCompanyEmployee) {
    // company employee links to show on sidebar
    // exclude menu if the key is not in menuItems

    menuItems = filterMenuItemsByPermissions(
      menuItems,
      companyEmployeePermissions
    )?.filter((item) => item && 'label' in item && item.label !== undefined);
  }

  // set activeKey if menuItems key includes in pathname
  const allKeys = collectKeys(menuItems);
  const activeKeys = allKeys
    .map((key) => key.toString())
    .filter((key) => {
      return pathname.includes(key.toString());
    });

  return (
    <div
      className={`fixed h-full bg-schestiPrimary transition-all duration-300 ease-in-out ${isOpened ? HOVERED_WIDTH : UNHOVERED_WIDTH}`}
    >
      {/* Logo */}
      <div className="flex justify-center mt-4">
        <Image
          src={'/schest-logo.svg'}
          alt="Schest Logo"
          width={79}
          height={20}
          className={'px-1'}
        />
      </div>

      {/* Toggle Button */}
      <div
        onClick={toggleCollapsed}
        className="absolute border bg-white rounded-full px-3 py-2 top-12 -right-3 cursor-pointer"
      >
        {isOpened ? (
          <MenuUnfoldOutlined className=" text-lg text-schestiPrimary" />
        ) : (
          <MenuFoldOutlined className=" text-lg text-schestiPrimary" />
        )}
      </div>

      {/* Navigation */}
      <div className="mt-14 w-full">
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemBg: '#007AB6',
                itemColor: 'white',
                fontWeightStrong: 600,

                itemSelectedBg: 'white',
                itemHoverBg: '#FFFFFF17',
                itemHoverColor: 'white',

                itemSelectedColor: '#007AB6',
                itemActiveBg: '#FFFFFF',

                popupBg: '#007AB6',

                // colorItemBgSelected: "#fff",
                // controlItemBgActive: "#fff",
              },
            },
          }}
        >
          <Menu
            inlineCollapsed={!isOpened}
            mode="vertical"
            // if user not authenticated then don't show sidebar
            items={!authenticatedUser ? [] : menuItems}
            triggerSubMenuAction="click"
            selectedKeys={activeKeys}
          />
        </ConfigProvider>
      </div>

      {/* <div className="mt-6 flex flex-col space-y-3">
            <NavItem
                icon={{
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH,
                    name: "home"
                }}
                iconName=""
                isParentHovered={isHovering}
                label="Dashboard"
                value="/dashboard"
                isActive={pathname.includes("dashboard")}
            />

            {planFeatureOptions.map(feature => {

                return <NavItem
                    key={feature.title}
                    isParentHovered={isHovering}
                    isActive={
                        feature.value ? pathname.includes(feature.value) : Boolean(feature.options?.find((option) =>
                            option.children?.find(child => child.value.includes(pathname)) || option.value.includes(pathname)
                        ))
                    }
                    icon={{
                        name: feature.iconName as any,
                        height: ICON_HEIGHT,
                        width: ICON_WIDTH
                    }}
                    {...feature}
                />
            })}


            <Divider className="border-white" />
            <NavItem
                isParentHovered={isHovering}
                label="Settings"
                value="/settings/general"
                icon={{
                    name: "setting",
                    height: ICON_HEIGHT,
                    width: ICON_WIDTH
                }}
                iconName=""
                isActive={pathname.includes("settings")}
            />
        </div> */}
    </div>
  );
};
