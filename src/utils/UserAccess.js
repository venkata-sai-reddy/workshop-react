const userAccess = {
    'Student': [
        '/home',
        '/workshop',
        '/view-workshop',
        '/request-workshop',
        '/view-registered-workshops',
        '/view-requested-workshops',
        '/profile'
    ],
    'Instructor': [
        '/home',
        '/workshop',
        '/view-workshop',
        '/request-workshop',
        '/create-workshop',
        '/update-workshop',
        '/delete-workshop',
        '/view-registered-workshops',
        '/view-requested-workshops',
        '/profile'
    ],
    'Admin': [
        '/home',
        '/workshop',
        '/view-workshop',
        '/create-workshop',
        '/request-workshop',
        '/update-workshop',
        '/delete-workshop',
        '/view-registered-workshops',
        '/view-requested-workshops',
        '/all-workshops',
        '/create-user',
        '/profile',
        '/all-profiles'
    ]
}

export const userNavLeftPages = {
    'Student': {
        Home: '/home',
        Workshop: {
            View: '/workshop',
            Request_Workshop: '/request-workshop',
        },
        Activity: {
            Enrolled_Workshops: '/view-registered-workshops',
            Requested_Skills: '/view-requested-workshops'
        }
    },
    'Instructor': {
        Home: '/home',
        Workshop: {
            View: '/workshop',
            Create: '/create-workshop',
            Request_Workshop: '/request-workshop',
        },
        Activity: {
            Enrolled_Workshops: '/view-registered-workshops',
            Requested_Skills: '/view-requested-workshops'
        }
    },
    'ADMIN': {
        Home: '/home',
        Workshop: {
            View: '/workshop',
            Create: '/create-workshop',
        },
        Users: {
            View_Users: '/view-users',
            Create_Users: '/create-user'
        },
        Skills: {
            All_Skills: '/all-skills',
            Approve_Skills: '/approve-skills'
        }
    }
}

export const userNavMenu = {
    'Student': {
        Home: '/home',
        Search: '/workshop',
        Enrolled_Workshops: '/view-registered-workshops',
        Request_Workshop: '/request-workshop',
        Requested_Skills: '/view-requested-workshops'
    },
    'Instructor': {
        Home: '/home',
        Search: '/workshop',
        Create: '/create-workshop',
        Enrolled_Workshops: '/view-registered-workshops',
        Request_Workshop: '/request-workshop',
        Requested_Skills: '/view-requested-workshops'
    },
    'ADMIN': {
        Home: '/home',
        Search: '/workshop',
        Create: '/create-workshop',
        View_Users: '/view-users',
        Create_Users: '/create-user',
        Approve_Skills: '/approve-skills',
        All_Skills: '/all-skills'
    }
}

export const userNavRightPages = {
    Profile: '/profile',
    Logout: '/logout'
}