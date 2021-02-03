using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boat_app.Entities
{
    public class Boat
    {
        private int id;
        private string name;
        private string desc;

        public Boat() { }

        public Boat(int bId, string bName, string bDesc)
        {
            id = bId;
            name = bName;
            desc = bDesc;
        }

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Desc
        {
            get { return desc; }
            set { desc = value; }
        }

        public override string ToString()
        {
            return Name + " " + Desc;
        }

    }
}
