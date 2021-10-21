using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data;
using Newtonsoft.Json.Converters;

namespace WcfService1
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.

    [DataContract(Namespace = "http://www.eysnap.com/mPlayer")]

    public class RequestData
    {
        [DataMember]
        public string details { get; set; }
    }
    public class Service1 : IService1
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

      
        public string LogInValidate(string LoginemailId, string LoginPassword)
        {

            string strResult = "";
            clsDB objDB = null;
            DataSet dstOutPut = null;
            string strErr = "";
            try
            {
                objDB = new clsDB();
                objDB.AddParameter("p_LoginemailId", LoginemailId, LoginemailId.Length);
                objDB.AddParameter("p_LoginPassword", LoginPassword, LoginPassword.Length);
                dstOutPut = objDB.ExecuteSelect("spLoginValidation", CommandType.StoredProcedure, 0, ref strErr, "p_ErrMsg");
                if (strErr != "")
                    strResult = "Error:" + strErr;
                if (dstOutPut != null && dstOutPut.Tables.Count > 0)
                {
                    strResult = new CompressDecompress.CompressDecompress().CompressData(Common.GetJSONString(dstOutPut));
                }

            }
            catch (Exception ex)
            {
                strResult = "Error:"+ ex.Message;
            }
            return strResult; // strResult;
        }

        public string ProductReportData(string ProductCategory)
        {

            string strResult = "";
            clsDB objDB = null;
            DataSet dstOutPut = null;
            string strErr = "";
            try
            {
                objDB = new clsDB();
                objDB.AddParameter("p_ProductCategory", ProductCategory, ProductCategory.Length);
                dstOutPut = objDB.ExecuteSelect("spProductView", CommandType.StoredProcedure, 0, ref strErr, "p_ErrMsg");
                if (strErr != "")
                    strResult = "Error:" + strErr;
                if (dstOutPut != null && dstOutPut.Tables.Count > 0)
                {
                    strResult = new CompressDecompress.CompressDecompress().CompressData(Common.GetJSONString(dstOutPut));
                }

            }
            catch (Exception ex)
            {
                strResult = "Error:" + ex.Message;
            }
            return strResult; // strResult;
        }

        public string ProductInsert(RequestData objData)
        {

            string strResult = "";
            clsDB objDB = null;
            DataSet dstOutPut = null;
            string strErr = "";
            string strInput = "";
            try
            {
                strInput = objData.details;
                string[] strInp = strInput.Split('|');

                objDB = new clsDB();
                objDB.AddParameter("p_productName", strInp[0], strInp[0].Length);
                objDB.AddParameter("p_productcategory", strInp[1], strInp[1].Length);
                objDB.AddParameter("p_productdescription", strInp[2], strInp[2].Length);
                objDB.AddParameter("p_units", Convert.ToInt32(strInp[3]));
                dstOutPut = objDB.ExecuteSelect("spProductInsert", CommandType.StoredProcedure, 0, ref strErr, "p_ErrMsg");
                if (strErr != "")
                    strResult = "Error:" + strErr;
                if (dstOutPut != null && dstOutPut.Tables.Count > 0)
                {
                    strResult = Common.GetJSONString(dstOutPut);
                }

            }
            catch (Exception ex)
            {
                strResult = "Error:" + ex.Message;
            }
            return strResult; // strResult;
        }

        public string ProductUpdate(RequestData objData)
        {

            string strResult = "";
            clsDB objDB = null;
            DataSet dstOutPut = null;
            string strErr = "";
            string strInput = "";
            try
            {
                strInput = objData.details;
                string[] strInp = strInput.Split('|');

                objDB = new clsDB();
                objDB.AddParameter("p_productId", Convert.ToInt32(strInp[0]));
                objDB.AddParameter("p_productdescription", strInp[1], strInp[1].Length);
                objDB.AddParameter("p_units", Convert.ToInt32(strInp[2]));
                dstOutPut = objDB.ExecuteSelect("spProductUpdate", CommandType.StoredProcedure, 0, ref strErr, "p_ErrMsg");
                if (strErr != "")
                    strResult = "Error:" + strErr;
                if (dstOutPut != null && dstOutPut.Tables.Count > 0)
                {
                    strResult = Common.GetJSONString(dstOutPut);
                }

            }
            catch (Exception ex)
            {
                strResult = "Error:" + ex.Message;
            }
            return strResult; // strResult;
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
    }
}
