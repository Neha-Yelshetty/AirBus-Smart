using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;

namespace Shmart.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ProductReport()
        {
            //log.Info("Booking");
            return View("~/Views/Report/ProductReport.cshtml");
        }

        public ActionResult ProductData(string ProductCategory)
        {
            //DataSet userLoginInfo = null;
            //userLoginInfo = Class.clsCommon.LogInValidate(LoginemailId, LoginPassword);
            string strErrMsg = "";
            string strResponse = "";
            try
            {
                strResponse = Shmart.Controllers.Utility.GetHttpResponse("ProductReportData", "ProductCategory=" + ProductCategory);
                JObject objResponse = JObject.Parse(strResponse);
                if (!objResponse["ProductReportDataResult"].ToString().Contains("Error:"))
                {
                    JObject objActualData = JObject.Parse(new CompressDecompress.CompressDecompress().DecompressData(objResponse["ProductReportDataResult"].ToString()));
                    return Json(new CompressDecompress.CompressDecompress().DecompressData(objResponse["ProductReportDataResult"].ToString()));
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

        public ActionResult ProductInsert(string ProductName, string Productcategory,string Productdescription,int units)
        {
            //DataSet userLoginInfo = null;
            //userLoginInfo = Class.clsCommon.LogInValidate(LoginemailId, LoginPassword);
            string strErrMsg = "";
            string strResponse = "";
            try
            {
                strResponse = Shmart.Controllers.Utility.HttpPost("ProductInsert", "<RequestData xmlns='http://www.eysnap.com/mPlayer'><details>"
                    + ProductName + "|" + Productcategory + "|" + Productdescription + "|" + units + "</details></RequestData>") ;
                //JObject objResponse = JObject.Parse(strResponse);
                //var data = new CompressDecompress.CompressDecompress().DecompressData(objResponse["strResponse"].ToString());
                //if (!objResponse["ProductInsertResult"].ToString().Contains("Error:"))
                //{
                //    JObject objActualData = JObject.Parse(new CompressDecompress.CompressDecompress().DecompressData(objResponse["ProductInsertResult"].ToString()));
                //    return Json(new CompressDecompress.CompressDecompress().DecompressData(objResponse["ProductInsertResult"].ToString()));
                //    // return objActualData;
                //}
                //else
                //{
                //    return Json(objResponse);
                //}

            }
            catch (Exception)
            {
                throw;
            }


            return Json(strResponse);
        }

        public ActionResult ProductUpdate(int ProductId, string Productdescription, int units)
        {
            //DataSet userLoginInfo = null;
            //userLoginInfo = Class.clsCommon.LogInValidate(LoginemailId, LoginPassword);
            string strErrMsg = "";
            string strResponse = "";
            try
            {
                strResponse = Shmart.Controllers.Utility.Httput("ProductUpdate", "<RequestData xmlns='http://www.eysnap.com/mPlayer'><details>"
                    + ProductId + "|" + Productdescription +  "|" + units + "</details></RequestData>");
                //JObject objResponse = JObject.Parse(strResponse);
                //if (!objResponse["ProductUpdateResult"].ToString().Contains("Error:"))
                //{
                //    JObject objActualData = JObject.Parse(new CompressDecompress.CompressDecompress().DecompressData(objResponse["ProductUpdateResult"].ToString()));
                //    return Json(new CompressDecompress.CompressDecompress().DecompressData(objResponse["ProductUpdateResult"].ToString()));
                //    // return objActualData;
                //}
                //else
                //{
                //    return Json(objResponse);
                //}

            }
            catch (Exception)
            {
                throw;
            }


            return Json(strResponse);
        }
    }
}