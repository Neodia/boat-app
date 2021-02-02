using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boat_app.Entities
{
    public class Boat
    {

        private string name;
        private string model;

        public Boat() { }

        public Boat(string bName, string bModel)
        {
            name = bName;
            model = bModel;
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Model
        {
            get { return model; }
            set { model = value; }
        }

        public override string ToString()
        {
            return Name + " " + Model;
        }

    }
}
