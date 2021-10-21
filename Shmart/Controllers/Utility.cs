using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Data;
using Newtonsoft.Json.Linq;
using System.Text;

namespace Shmart.Controllers
{
    public static class Utility
    {

        public static string HttpPost(string strMethod, string parameters, bool blnUseAlternateURL = true)
        {
            // parameters: name1=value1&name2=value2	
            string strResponse = "";
            string strURL = System.Web.Configuration.WebConfigurationManager.AppSettings["APIURL"];
    

            HttpWebRequest webRequest = (HttpWebRequest)(WebRequest.Create(strURL + "/" + strMethod));

            webRequest.ContentType = "text/xml";
            webRequest.Method = "POST";

            byte[] bytes = Encoding.UTF8.GetBytes(parameters);
            Stream os = null;
            try
            { // send the Post

                webRequest.MaximumResponseHeadersLength = -1;
                webRequest.ContentLength = bytes.Length;   //Count bytes to send
                os = webRequest.GetRequestStream();
                os.Write(bytes, 0, bytes.Length);         //Send it
            }
            catch (WebException ex)
            {
                strResponse = ex.Message;
            }
            finally
            {
                if (os != null)
                {
                    os.Close();
                }
            }

            try
            { // get the response
                HttpWebResponse webResponse = (HttpWebResponse)(webRequest.GetResponse());
                if (webResponse == null)
                { return null; }
                StreamReader sr = new StreamReader(webResponse.GetResponseStream());
                strResponse = sr.ReadToEnd().Trim();
            }
            catch (WebException ex)
            {
                strResponse = ex.Message;
            }
            return strResponse;
        }

        public static string Httput(string strMethod, string parameters, bool blnUseAlternateURL = true)
        {
            // parameters: name1=value1&name2=value2	
            string strResponse = "";
            string strURL = System.Web.Configuration.WebConfigurationManager.AppSettings["APIURL"];

            byte[] bytes = Encoding.UTF8.GetBytes(parameters);

            //  HttpWebRequest webRequest = (HttpWebRequest)(WebRequest.Create(strURL + "/" + strMethod + "?" + parameters);
            WebClient client = new WebClient();
            client.Headers["Content-type"] = "text/xml";
            byte[] response = client.UploadData(strURL + "/" + strMethod ,"PUT", bytes);

            strResponse = client.Encoding.GetString(response);

            //Stream os = null;
            //try
            //{ // send the Post

            //    webRequest.MaximumResponseHeadersLength = -1;
            //    webRequest.ContentLength = bytes.Length;   //Count bytes to send
            //    os = webRequest.GetRequestStream();
            //    os.Write(bytes, 0, bytes.Length);         //Send it
            //}
            //catch (WebException ex)
            //{
            //    strResponse = ex.Message;
            //}
            //finally
            //{
            //    if (os != null)
            //    {
            //        os.Close();
            //    }
            //}

            //try
            //{ // get the response
            //    HttpWebResponse webResponse = (HttpWebResponse)(client.g());
            //    if (webResponse == null)
            //    { return null; }
            //    StreamReader sr = new StreamReader(webResponse.GetResponseStream());
            //    strResponse = sr.ReadToEnd().Trim();
            //}
            //catch (WebException ex)
            //{
            //    strResponse = ex.Message;
            //}
            return strResponse;
        }
        public static string GetHttpResponse(string strMethod, string strPara, bool blnUseAlternateURL = true,bool IsGET = true)
        {
 
            string strURL = System.Web.Configuration.WebConfigurationManager.AppSettings["APIURL"];

            //strURL = "http://localhost:1796/service.svc";
            
          
            HttpWebRequest httpReq = (HttpWebRequest)WebRequest.Create(strURL + "/" + strMethod + "?" + strPara);

            httpReq.Timeout = -1;
            if(IsGET)
                httpReq.Method = "GET";
            else
                httpReq.Method = "PUT";
            string str = "",err="";
            try
            {
                HttpWebResponse httpresp = (HttpWebResponse)httpReq.GetResponse();
                StreamReader sr = new StreamReader(httpresp.GetResponseStream());
                 str = sr.ReadToEnd();
                httpresp.Close();
            }
            catch(WebException ex)
            {
                err = err + ex.ToString();
            }
            catch (Exception ec)
            {
                err = err + ec.ToString();
            }
            return str;
            //return "";

        }

        public static DataTable LINQToDataTable(JToken[] arr, string strTableName)
        {
            DataTable dt = new DataTable();
            foreach (JToken t in arr)
            {
                JToken[] jtArr = t.ToArray();

                if (dt.Columns.Count == 0)
                {
                    foreach (JProperty jp in jtArr)
                    {
                        dt.Columns.Add(new DataColumn(jp.Name, jp.Value.ToString().GetType()));
                    }
                }


                DataRow dr = dt.NewRow();
                foreach (JProperty jp in jtArr)
                {
                    //if (jp.Name == "ColumnNo" || jp.Name == "RowNo")
                    //    dr[jp.Name] = Convert.ToInt32(jp.Value.ToString());
                    //else
                    dr[jp.Name] = jp.Value.ToString();
                    //dt.Columns.Add(new DataColumn(jp.Name, jp.Value.GetType()));
                }
                dt.Rows.Add(dr);
            }
            dt.TableName = strTableName;
            return dt;
        }
    }
}