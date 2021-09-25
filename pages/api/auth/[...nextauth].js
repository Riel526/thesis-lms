import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Student from '../../../models/student'
import Teacher from '../../../models/teacher'
import { dbConnect } from '../../../utils/db'
import { verifyPassword } from '../../../utils/auth'


dbConnect()

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {

        let user = null

        if (credentials.type == 'student') {
          user = await Student.findOne({
            email: credentials.email
          })
        } else if (credentials.type == 'teacher') {
          user = await Teacher.findOne({
            email: credentials.email
          })
        }

        if (!user) {
          throw new Error('No User Found!')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid Password')
        }

        if (credentials.type == 'student') {
          return {
            _id: user._id,
            name: user.firstName,
            email: user.email,
            image: user.image,
            section: user.section,
            role: user.role,
          }
        } else if (credentials.type == 'teacher') {
          return {
            _id: user._id,
            name: user.firstName,
            email: user.email,
            image: user.image,
            section: user.advisorySection,
            subjects: user.subjects,
            role: user.role,
          }
        }

      }
    })
  ],
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      user && (token.user = user)
      return token // ...hee
    },
    session: async (session, user, sessionToken) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = user.user
      return session
    }
  }
})
