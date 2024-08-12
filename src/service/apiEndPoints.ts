const baseURL = 'http://dev.softcodeq.com';

const apiUri = {
    auth:{
        login:'/Login'
    },
    employee:{
       addEmployee: "/SaveUser"
    },
    employeeList:{
        employeeList : "/GetUsers"
    },
    createTask:{
        createTask : "/api/Task/CreateTask"
    }
}
export { apiUri, baseURL };
