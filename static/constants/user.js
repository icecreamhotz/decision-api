const ROLE = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
}

const MENU = [
  {
    icon: 'mdi-shield-account',
    text: 'จัดการข้อมูลส่วนตัว',
    route: '/me',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-account-cog-outline',
    text: 'จัดการผู้ใช้งานระบบ',
    route: '/user',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-file',
    text: 'จัดการเอกสารแก้ไขปัญหา',
    route: '/document-problem',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
]

module.exports = {
  ROLE,
  MENU
}