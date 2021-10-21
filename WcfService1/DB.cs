using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Serialization;
using System.Xml;
using System.IO;
using System.Xml.Serialization;
using System.Web.Configuration;
using System.Web.Security;
using System.Web.SessionState;
using System.Net;


namespace WcfService1
{
    public class clsDB : System.Web.HttpApplication
    {
        MySqlCommand cmd;
        string strConnString;
        string strConnStringSlave1;
        string strConnStringSlave2;
        string strConnStringSlave3;
        string strConnStringLogs;
        string strSlaveMode1;
        string strSlaveMode2;
        string strSlaveMode3;
        bool blnIsAllBlank = false;
        public static int intRanSlaves = 0;
        public static int intRanSlavesRepate = 1;

        public clsDB()
        {

            cmd = new MySqlCommand();
            strConnString = System.Web.Configuration.WebConfigurationManager.AppSettings["ConnectionString"];

            if ((strSlaveMode1 + strSlaveMode2 + strSlaveMode3).Trim() == "")
            {
                blnIsAllBlank = true;
            }
        }



       
        public void AddParameter(string strParamName, string strParamValue, int intParamSize, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.Parameters.Add(strParamName, MySqlDbType.VarChar, intParamSize).Value = strParamValue;
            cmd.Parameters[strParamName].Direction = direction;
        }
        public void AddParameter(string strParamName, int intParamValue, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.Parameters.Add(strParamName, MySqlDbType.Int32).Value = intParamValue;
            cmd.Parameters[strParamName].Direction = direction;
        }
        public void AddParameter(string strParamName, bool blnParamValue, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.Parameters.Add(strParamName, MySqlDbType.Bit).Value = blnParamValue;
            cmd.Parameters[strParamName].Direction = direction;
        }
        public void AddParameter(string strParamName, DateTime dtParamValue, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.Parameters.Add(strParamName, MySqlDbType.DateTime).Value = dtParamValue;
            cmd.Parameters[strParamName].Direction = direction;
        }
        public void AddParameter(string strParamName, decimal dclParamValue, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.Parameters.Add(strParamName, MySqlDbType.Decimal).Value = dclParamValue;
            cmd.Parameters[strParamName].Direction = direction;
        }
        public void AddParameter(string strParamName, double dblParamValue, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.Parameters.Add(strParamName, MySqlDbType.Decimal).Value = dblParamValue;
            cmd.Parameters[strParamName].Direction = direction;
        }
        public int ExecuteDML(string strSQL, CommandType cmdType, int intTimeout, ref string strErr)
        {
            int status = 0;
            MySqlConnection conn = new MySqlConnection(strConnString);
            strErr = "";
            try
            {
                cmd.CommandText = strSQL;
                cmd.CommandType = cmdType;
                cmd.CommandTimeout = intTimeout;
                conn.Open();
                cmd.Connection = conn;
                status = cmd.ExecuteNonQuery();

                try
                {
                    if (cmd.Parameters["p_ErrMsg"] != null && cmd.Parameters["p_ErrMsg"].Value != null)
                        strErr = cmd.Parameters["p_ErrMsg"].Value.ToString();
                }
                catch { }

                cmd.Parameters.Clear();
            }
            catch (System.Exception ex)
            {
                status = -1;
                strErr = ex.Message;

            }
            finally
            {
                cmd.Dispose();
                conn.Close();
                conn.Dispose();
                conn = null;
            }
            return status;
        }


        public DataSet ExecuteSelect(string strSQL, CommandType cmdType, int intTimeout, ref string strErr, string strOpt = "p_ErrMsg", bool IsMaster = true, string strSlaveMode = "", bool IsWrite = true, bool IsRedirectionToColdStorage = false)
        {
            if (IsMaster == false)
                IsWrite = false;

            DataSet ds = new DataSet();
            MySqlDataAdapter adp = new MySqlDataAdapter();

            MySqlConnection conn = new MySqlConnection(strConnString);


            strErr = "";
            try
            {
                cmd.CommandText = strSQL;
                cmd.CommandType = cmdType;
                cmd.CommandTimeout = intTimeout;
                conn.Open();
                cmd.Connection = conn;
                adp.SelectCommand = cmd;
                adp.Fill(ds);

                try
                {
                    if (cmd.Parameters[strOpt] != null && cmd.Parameters[strOpt].Value != null)
                        strErr = cmd.Parameters[strOpt].Value.ToString();
                }
                catch { }

                cmd.Parameters.Clear();
                //conn.Close();
            }
            catch (System.Exception ex)
            {
                ds = null;
                strErr = ex.Message;
            }
            finally
            {
                adp.Dispose();
                cmd.Dispose();
                conn.Close();
                conn.Dispose();
                conn = null;
            }
            return ds;
        }
    }


    public static class Common
    {
        public static string GetJSONString(DataSet data)
        {

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 500000000;
            return serializer.Serialize(data.ToDictionary());
        }

        public static string GetXML(DataSet data)
        {
            System.Xml.XmlElement xE = (System.Xml.XmlElement)Serialize(data);
            string strXml = xE.OuterXml.ToString();
            return strXml;
        }

        public static XmlElement Serialize(DataSet transformObject)
        {
            XmlElement serializedElement = null;
            try
            {
                MemoryStream memStream = new MemoryStream();
                XmlSerializer serializer = new XmlSerializer(transformObject.GetType());
                serializer.Serialize(memStream, transformObject);
                memStream.Position = 0;
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(memStream);
                serializedElement = xmlDoc.DocumentElement;
            }
            catch (Exception SerializeException)
            {

            }
            return serializedElement;
        }

        static Dictionary<string, object> ToDictionary(this DataSet data)
        {

            return data.Tables.Cast<DataTable>().ToDictionary(t => t.TableName, t => t.RowsToDictionary());

        }

        static Dictionary<string, object> ToDictionary(this DataTable table)
        {

            return new Dictionary<string, object> { { table.TableName, table.RowsToDictionary() } };
        }

        static object RowsToDictionary(this DataTable table)
        {
            var columns = table.Columns.Cast<DataColumn>().ToArray();
            return table.Rows.Cast<DataRow>().Select(r => columns.ToDictionary(c => c.ColumnName, c => r[c]));
        }

        static public string MD5(string value)
        {
            byte[] textBytes = System.Text.Encoding.Default.GetBytes(value);
            try
            {
                System.Security.Cryptography.MD5CryptoServiceProvider cryptHandler;
                cryptHandler = new System.Security.Cryptography.MD5CryptoServiceProvider();
                byte[] hash = cryptHandler.ComputeHash(textBytes);
                string ret = "";
                foreach (byte a in hash)
                {
                    if (a < 16)
                        ret += "0" + a.ToString("x");
                    else
                        ret += a.ToString("x");
                }
                return ret;
            }
            catch
            {
                throw;
            }
        }

        public static string HttpPost(string strURL, string strMethod, string strData)
        {
            bool boolUseProxy = false;
            string proxy = "";
            HttpWebRequest httpReq = (HttpWebRequest)WebRequest.Create(strURL);
            httpReq.Method = strMethod;
            if (boolUseProxy)
            {
                WebProxy myProxy = new WebProxy();
                myProxy.Address = new Uri(proxy);
                httpReq.Proxy = myProxy;
            }
            httpReq.ContentType = "Application/JSON";
            httpReq.Timeout = -1;
            byte[] btBytes = null;
            if (strMethod == "POST")
            {
                btBytes = System.Text.Encoding.ASCII.GetBytes(strData); //new byte[strData.Length * sizeof(char)];
                                                                        //Buffer.BlockCopy(strData.ToCharArray(), 0, btBytes, 0, btBytes.Length);
                httpReq.ContentLength = btBytes.Length;
                Stream dataStream = httpReq.GetRequestStream();
                dataStream.Write(btBytes, 0, btBytes.Length);
                dataStream.Flush();
                dataStream.Close();
            }
            HttpWebResponse httpResp = (HttpWebResponse)httpReq.GetResponse();
            StreamReader sr = new StreamReader(httpResp.GetResponseStream());
            string strResp = sr.ReadToEnd();
            httpResp.Close();
            return strResp;
        }
    }
}