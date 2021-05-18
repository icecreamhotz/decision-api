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
    roles: [ROLE.ADMIN]
  },
  // {
  //   icon: 'mdi-file',
  //   text: 'จัดการเอกสารแก้ไขปัญหา',
  //   route: '/document-problem',
  //   children: [],
  //   roles: [ROLE.ADMIN, ROLE.STAFF]
  // },
  {
    icon: 'mdi-newspaper-variant-outline',
    text: 'จัดการข่าวสาร',
    route: '/new',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-shape-outline',
    text: 'จัดการหมวดหมู่ปัญหาที่พบบ่อย',
    route: '/problem-category',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-chat-question-outline',
    text: 'จัดการปัญหาที่พบบ่อย',
    route: '/problem',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-account-question-outline',
    text: 'จัดการปัญหาที่เข้ามาใหม่',
    route: '/problem-draft',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-calendar-range-outline',
    text: 'จัดการปฏิทิน',
    route: '/event',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-cellphone-arrow-down',
    text: 'สถิติความพึงพอใจระบบ',
    route: '/system-stat',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-cellphone-arrow-down',
    text: 'สถิติวิธีการแก้ไขปัญหา',
    route: '/system-problem',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-cellphone-arrow-down',
    text: 'สถิติปัญหาที่พบบ่อย',
    route: '/system-popular',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
  {
    icon: 'mdi-logout',
    text: 'ออกจากระบบ',
    route: '/logout',
    children: [],
    roles: [ROLE.ADMIN, ROLE.STAFF]
  },
]

module.exports = {
  ROLE,
  MENU
}