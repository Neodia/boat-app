using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boat_app.Entities
{
    public class User
    {
        private int id;
        private string username;
        private string password;

        public User() { }

        public User(int uId, string uUsername, string uPassword)
        {
            id = uId;
            username = uUsername;
            password = uPassword;
        }
        public int Id
        {
            get { return id; }
            set { id = value; }
        }
        public string Username
        {
            get { return username; }
            set { username = value; }
        }
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        public override bool Equals(object obj)
        {
            User item = obj as User;
            if (item == null)
                return false;
            return Id.Equals(item.Id) && this.EqualsForLogin(item);
        }

        public bool EqualsForLogin(User obj)
        {
            return Username.Equals(obj.Username) && Password.Equals(obj.Password);
        }
    }
}
