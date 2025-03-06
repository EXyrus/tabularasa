import type React from "react"
import { Avatar, Typography, Space, Dropdown } from "antd"
import { UserOutlined, LogoutOutlined, BellOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"
import type { AppType } from "@/types"

const { Text } = Typography

type HeaderBarProps = {
  appType: AppType
  userName: string
  userAvatar?: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ appType, userName, userAvatar }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // Check if current route is dashboard
  const isDashboard = location.pathname === `/${appType}/dashboard`

  // Color based on app type
  const getAppColor = () => {
    switch (appType) {
      case "vendor":
        return "bg-sms-vendor"
      case "institution":
        return "bg-sms-institution"
      case "guardian":
        return "bg-sms-guardian"
      default:
        return "bg-sms-blue"
    }
  }

  const onLogout = () => {
    // Clear local storage
    localStorage.removeItem("sms_auth_token")
    localStorage.removeItem("sms_user_data")

    // Navigate to login page
    navigate(`/${appType}/login`)
  }

  const handleBack = () => {
    // Navigate back in history
    navigate(-1)
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm animate-slide-down`}
    >
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {!isDashboard && (
            <button
              onClick={handleBack}
              className={`mr-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors ${getAppColor()}`}
              aria-label="Go back"
            >
              <ArrowLeftOutlined style={{ fontSize: "16px" }} />
            </button>
          )}
          <Text className="text-lg font-medium capitalize">{appType}</Text>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-sms-darkGray">
            <BellOutlined style={{ fontSize: "20px" }} />
          </button>

          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Profile",
                  icon: <UserOutlined />,
                  onClick: () => navigate(`/${appType}/profile`),
                },
                {
                  key: "2",
                  label: "Logout",
                  icon: <LogoutOutlined />,
                  onClick: onLogout,
                },
              ],
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space className="cursor-pointer">
              <Text className="mr-2 hidden sm:inline">{userName}</Text>
              <Avatar
                src={userAvatar}
                icon={!userAvatar && <UserOutlined />}
                size="default"
                className="border-2 border-gray-100"
              />
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default HeaderBar

