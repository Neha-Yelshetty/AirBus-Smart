using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace Shmart.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //  return View();
            return View("~/Views/Login/Login.cshtml");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult LogInValidate(string LoginemailId, string LoginPassword)
        {
            //DataSet userLoginInfo = null;
            //userLoginInfo = Class.clsCommon.LogInValidate(LoginemailId, LoginPassword);
            string strErrMsg = "";
            string strResponse = "";
            try
            {
                strResponse = Shmart.Controllers.Utility.GetHttpResponse("LogInValidate", "LoginemailId=" + LoginemailId + "&LoginPassword=" + LoginPassword );
                JObject objResponse = JObject.Parse(strResponse);
                if (!objResponse["LogInValidateResult"].ToString().Contains("Error:"))
                {
                    JObject objActualData = JObject.Parse(new CompressDecompress.CompressDecompress().DecompressData(objResponse["LogInValidateResult"].ToString()));
                      return Json(new CompressDecompress.CompressDecompress().DecompressData(objResponse["LogInValidateResult"].ToString()));
                   // return objActualData;
                }
                else
                {
                    return Json(objResponse);
                }

            }
            catch (Exception)
            {
                throw;
            }

            
            return Json(strResponse);
        }
    }
}