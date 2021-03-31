const ROLE = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
}

const MENU = [
  {
    icon: 'mdi-account-cog-outline',
    text: 'จัดการข้อมูลส่วนตัว',
    route: '/me',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-account-cog-outline',
    text: 'จัดการผู้ใช้',
    route: '/user',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
]

module.exports = {
  ROLE,
  MENU
}