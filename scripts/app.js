var vue = new Vue({
    el: "#app",
    data: {
        title: "用户管理",
        users: [],
        editUser: {},
        loading:false
    },
    ready: function () {
        this.getData()
    },
    methods: {
        getData: function () {
            this.loading=true;
            wildDogHelper.get("users", function (data) {
                vue.$set("users", data);
                vue.$set("loading", false);
                  
            })
        },
        addUser: function () {
            var user = { firstName: this.firstName, lastName: this.lastName,userName:this.userName,birthDate:this.birthDate,age:this.age };
            wildDogHelper.create("users", user, function (result) {
                $("#createUser").modal("hide");
            })

        },
        deleteUser: function (key) {
            wildDogHelper.delete("users/" + key)
        },
        updateUser: function () {
            wildDogHelper.update("users/" + this.key, {userName:this.editUser.userName,firstName: this.editUser.firstName, lastName: this.editUser.lastName,birthDate:this.editUser.birthDate,age:this.editUser.age }, function (error) {
                $("#editUser").modal("hide");
            });
        },
        showEditModal: function (key, user) {
            this.editUser = user;
            this.key = key;
            $("#editUser").modal("show");
        }
    }
});