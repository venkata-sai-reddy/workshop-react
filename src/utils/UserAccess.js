const userAccess = {
    'Student' : [
        '/home',
        '/workshop',
        '/view-workshop',
        '/view-registered-workshops',
        '/profile'
    ],
    'Instructor':[
        '/home',
        '/workshop',
        '/view-workshop',
        '/create-workshop',
        '/update-workshop',
        '/delete-workshop',
        '/view-registered-workshops',
        '/profile'
    ],
    'Admin':[
        '/home',
        '/workshop',
        '/view-workshop',
        '/create-workshop',
        '/update-workshop',
        '/delete-workshop',
        '/view-registered-workshops',
        '/all-workshops',
        '/profile',
        '/all-profiles'
    ]
}

export const userNavLeftPages = {
    'Student': {
        Workshop: {
            View: '/workshop',
            Registered: '/view-registered-workshops'            
        }
    },
    'Instructor': {
        Home: '/home',
        Workshop: {
            View: '/workshop',
            Create: '/create-workshop',
            Registered: '/view-registered-workshops'
        }
    }
}

export const userNavMenu = {
    'Student': {
        Home: '/home',
        View: '/workshop',
        Registered: '/view-registered-workshops'
    },
    'Instructor': {
        Home: '/home',
        View: '/workshop',
        Create: '/create-workshop',
        Registered: '/view-registered-workshops'
    }
}

export const userNavRightPages = {
    Profile: '/profile',
    Logout: '/logout'
}