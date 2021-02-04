using boat_app.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace boat_app.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BoatController : Controller
    {
        private static int boatId = 0;
        private static List<Boat> bs = new List<Boat>(new Boat[]{
            new Boat(boatId++, "MyBoat1", "MyModel1"),
            new Boat(boatId++, "MyBoat2", "MyModel2"),
            new Boat(boatId++, "MyBoat3", "MyModel3"),
            new Boat(boatId++, "MyBoat4", "MyModel4"),
            new Boat(boatId++, "MyBoat5", "MyModel5"),
            new Boat(boatId++, "MyBoat6", "MyModel6"),
            new Boat(boatId++, "MyBoat7", "MyModel7"),
            new Boat(boatId++, "MyBoat8", "MyModel8")
        });

        [HttpGet]
        public IEnumerable<Boat> Get()
        {
            return bs;
        }

        public JsonResult ReturnErr(HttpStatusCode code, string msg)
        {
            HttpContext.Response.StatusCode = (int)code;
            return Json(new { message = msg });
        }

        [HttpGet("{id}")]
        public ActionResult<Boat> GetBoat(string id)
        {
            Boat ret = bs.FirstOrDefault(b => b.Id.ToString() == id);
            if (ret == null)
                return ReturnErr(HttpStatusCode.NotFound, "No boat with this ID");
            else return Json(new { status = 200, message = "", obj = ret });
        }

        [HttpPost]
        public JsonResult PostBoat([FromBody] Boat boat)
        {
            boat.Id = boatId++;
            bs.Add(boat);
            return Json(new { status = 200, message = "", obj = boat });
        }

        [HttpPut("{id}")]
        public JsonResult PutBoat(string id, [FromBody] Boat boat)
        {
            int index = bs.IndexOf(bs.FirstOrDefault<Boat>(b => b.Id.ToString() == id));
            if (index == -1)
                return ReturnErr(HttpStatusCode.NotFound, "No boat with this ID");
            bs[index] = boat;
            return Json(new { status = 200, message = "", obj = boat });
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteBoat(string id)
        {
            Boat b = bs.FirstOrDefault(b => b.Id.ToString() == id);
            if ( !bs.Remove(b))
                return ReturnErr(HttpStatusCode.NotFound, "No boat with this id");
            return Json(new { status = 200, message = "", obj = b });
        }
    }
}
