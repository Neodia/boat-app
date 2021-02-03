using boat_app.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace boat_app.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BoatController : Controller
    {
        Boat[] bs = new Boat[]
        {
            new Boat(0, "MyBoat1", "MyModel1"),
            new Boat(1, "MyBoat2", "MyModel2"),
            new Boat(2, "MyBoat3", "MyModel3"),
            new Boat(3, "MyBoat4", "MyModel4"),
            new Boat(4, "MyBoat5", "MyModel5"),
            new Boat(5, "MyBoat6", "MyModel6"),
            new Boat(6, "MyBoat7", "MyModel7"),
            new Boat(7, "MyBoat8", "MyModel8"),
        };

        [HttpGet]
        public IEnumerable<Boat> Get()
        {
            return bs;
        }

        [HttpGet("{id}")]
        public ActionResult<Boat> GetBoat(string id)
        {
            Boat ret = bs.FirstOrDefault(b => b.Id.ToString() == id);
            if (ret == null)
                return Json(new { status = 404, message = "No user with given ID." });
            else return Json(new { status = 200, message = "", obj = ret });
        }
    }
}
