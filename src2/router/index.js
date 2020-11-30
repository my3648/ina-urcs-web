import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('@/components/HelloWorld')
const Home = () => import('@/components/Home')
const Index = () => import('@/components/Index')
const Admin = () => import('@/components/Admin')
// const Admin2 = () => import('@/components/Admin2')
const Overview = () => import('@/components/Overview')
const Test = () => import('@/components/Test')
const Login = () => import('@/components/Login')
const Analytics = () => import('@/components/Analytics')
const Investigate = () => import('@/components/Investigate')
const Application_analysis = () => import('@/components/Application_analysis')
const Changepsw = () => import('@/components/Changepsw')
const ChangeEmail = () => import('@/components/ChangeEmail')
const UserList = () => import('@/components/UserList')
const Datamining = () => import('@/components/datamining/DataMining')
const Dashboard = () => import('@/components/datamining/Dashboard')
const Scheme = () => import('@/components/datamining/Scheme')
const D3 = () => import('@/components/D3')
const Go = () => import('@/components/Gojs')
const Svw = () => import('@/components/Svw')



Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/d3',
      component: D3,

    },
    {
      path: '/changepsw',
      component: Changepsw,

    },
    {
      path: '/changeemail',
      component: ChangeEmail,
    },
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/home',
      component: HelloWorld,
      children: [{
          path: '/home',
          component: Home,

        }, {
          path: '/index',
          component: Index,

        }, {
          path: '/admin',
          component: Admin,

        }, {
          path: '/overview',
          component: Overview,
          // meta: {
          //   keepAlive: true
          // }

        },

        {
          path: '/test',
          component: Test,

        },
        {
          path: '/analytics',
          component: Analytics,

        },
        // {
        //   path: '/admin2',
        //   component: Admin2,

        // },
        {
          path: '/investigate',
          component: Investigate,

        },
        {
          path: '/application/analysis',
          component: Application_analysis,

        },
        {
          path: '/userlist',
          component: UserList,

        },

        {
          path: '/datamining',
          component: Datamining,
          children: [{
            path: '/datamining/dashboard',
            component: Dashboard
          }, {
            path: '/datamining/scheme',
            component: Scheme
          }]

        },
        {
          path: '/go',
          component: Go,

        },
        {
          path: '/svw',
          component: Svw,
        }


      ]
    }, ,

  ]
})


router.beforeEach((to, from, next) => {
  var pathObj = {
    analytics_view: ['/analytics'],
    application_svw: ['/svw'],
    admin: ['/admin','userlist'],
    index: ['/index'],
    test: ['/test'],
    overview: ['/overview'],
    application_investigate: ['/investigate'],
    analytics_customize: ['/customize']
  }
  if (localStorage.getItem('urcs')) {
    var right = JSON.parse(localStorage.getItem('urcs'))
  } else {
    var right = {}
  }
  var allowPath = ['/home','/changeemail','/changepsw']
  for (var item in right) {
    
    if (right[item]) {
      allowPath=allowPath.concat(pathObj[item])
    }
  }
  console.log('allowPath', allowPath);

  if (to.path == '/login') {
    // 如果访问的是login页面，直接放行，也就是任何人不管有没有登录
    // 都可以访问登录页面
    // 直接调用 next() 方法，表示：访问的是哪个页面，就展示这个页面的内容

    next()
  } else if (!localStorage.getItem('token')) {
    next('/login')
  } else if (localStorage.getItem('userGroup') == 'svw' && to.path != '/svw') {
    next('/svw')
  } else if (allowPath.includes(to.path)) {
    next()
  } else {
    next('/')
  }

})
// if (to.path === '/login') {
  //   // 如果访问的是login页面，直接放行，也就是任何人不管有没有登录
  //   // 都可以访问登录页面
  //   // 直接调用 next() 方法，表示：访问的是哪个页面，就展示这个页面的内容

  //   next()
  // }else if(!localStorage.getItem('token')){
  //   next('/login')
  // } else if (JSON.parse(localStorage.getItem('urcs')).application_svw && to.path === '/svw') {
  //   next()
  // } else if (!(JSON.parse(localStorage.getItem('urcs')).application_svw) && to.path === '/svw') {
  //   next('/')
  // } else if (localStorage.getItem('userGroup') == 'svw' && to.path != '/svw') {
  //   next('/svw')
  // } else if (to.path === '/admin' || to.path === '/userlist') {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     next('/login')
  //   } else if (token && localStorage.getItem('username') == 'admin') {
  //     next()
  //   } else if (token && localStorage.getItem('username') != 'admin') {
  //     next('/')
  //   }
  // } else if (to.path === '/test') {
  //   const token = localStorage.getItem('token')
  //   if (!token) {
  //     next('/login')
  //   } else if (token && localStorage.getItem('username') == 'admin') {
  //     next('/')
  //   } else if (token && localStorage.getItem('username') != 'admin') {
  //     next()
  //   }
  // } else if (to.path === '/svw' || to.path === '/' || to.path === '/home' || to.path === '/overview' || to.path === '/index' || to.path == '/analytics' || to.path == '/application' || to.path == '/application/analysis' || to.path === '/changepsw' || to.path === '/changeemail' || to.path === '/datamining' || to.path === '/datamining/dashboard' || to.path === '/datamining/scheme' || to.path === '/d3' || to.path === '/go') {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // } else {
  //   const token = localStorage.getItem('token')
  //   if (token != '' && token != null) {
  //     next('/')

  //   } else {
  //     next('/login');
  //   }
  // }

export default router
