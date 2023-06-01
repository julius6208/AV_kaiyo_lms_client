export interface ITeacherInfo {
  teacher: {
    user: UserInfo
    userId: number
    birthday: string
    type: string
    postCode: string
    address: string
    phone1: string
    phone2: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }
  mealMaker: null
}

export interface IStudentInfo {
  student: {
    Club: {
      id: number
      name: string
    }
    Parent: {
      user: UserInfo
      userId: number
      Students: string | null
      address: string
      createdAt: string
      deletedAt: string | null
      isMum: boolean
      phone1: string
      phone2: string
      postCode: string
      updatedAt: string
    }
    user: UserInfo
    userId: number
    ParentID: number
    address: string
    attendanceNumber: number
    birthday: string
    curriculum: string
    dormitory: string
    enrolledSiblings: string
    grade: number
    learningG: number
    phone: string
    postCode: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }
  mealMaker: null
}

export interface IParentInfo {
  parent: {
    user: UserInfo
    userId: number
    Students: string | null
    address: string
    createdAt: string
    deletedAt: string | null
    isMum: boolean
    phone1: string
    phone2: string
    postCode: string
    updatedAt: string
  }
  mealMaker: null
}

export interface IMealMaker {
  mealMaker: {
    id: number
    email: string
    fullName: string
    fullNameKana: string
    role: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }
}

export interface UserInfo {
  id: number
  email: string
  fullName: string
  fullNameKana: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  role: string | null
}

export interface MealMaker {
  mealMaker: null
}
